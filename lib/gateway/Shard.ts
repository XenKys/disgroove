import WebSocket, { type RawData } from "ws";
import {
  ActivityType,
  GatewayCloseEventCodes,
  GatewayOPCodes,
  StatusTypes,
} from "../constants";
import { GatewayError } from "../utils";
import { Client } from "../Client";
import * as pkg from "../../package.json";
import type { RawPayload } from "../types/gateway-events";
import { Transmitter } from "./Transmitter";
import { Dispatcher } from "./Dispatcher";

export class Shard {
  id: number;
  client: Client;
  private heartbeatInterval: NodeJS.Timeout | null;
  sessionId: string | null;
  resumeGatewayURL: string | null;
  sequence: number | null;
  ws: WebSocket | null;
  transmitter: Transmitter;
  dispatcher: Dispatcher;

  constructor(id: number, client: Client) {
    this.id = id;
    this.client = client;
    this.heartbeatInterval = null;
    this.sessionId = null;
    this.resumeGatewayURL = null;
    this.sequence = null;
    this.ws = new WebSocket(
      "wss://gateway.discord.gg/?v=10&encoding=json",
      this.client.ws
    );
    this.transmitter = new Transmitter(this.ws);
    this.dispatcher = new Dispatcher(this.client);
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  connect(): void {
    if (this.ws) {
      this.ws.on("open", () => this.onWebSocketOpen());
      this.ws.on("message", (data) => this.onWebSocketMessage(data));
      this.ws.on("error", (err) => this.onWebSocketError(err));
      this.ws.on("close", (code, reason) =>
        this.onWebSocketClose(code, reason)
      );
    }
  }

  /** https://discord.com/developers/docs/events/gateway#initiating-a-disconnect */
  disconnect(reconnect: boolean): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);

      this.heartbeatInterval = null;
    }

    if (this.ws) {
      if (this.ws.readyState !== WebSocket.CLOSED) {
        this.ws.removeAllListeners();

        if (
          reconnect &&
          this.sessionId &&
          this.sequence &&
          this.resumeGatewayURL
        ) {
          if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.terminate();
          } else {
            this.ws.close(1000, "Resume Attempt - Reconnect");
          }
        } else {
          this.ws.close(1000, "Session Invalidated - Disconnect");
        }

        this.ws = null;
        this.transmitter = new Transmitter(null);
      }

      if (
        reconnect &&
        this.sessionId &&
        this.sequence &&
        this.resumeGatewayURL
      ) {
        this.ws = new WebSocket(this.resumeGatewayURL, this.client.ws);
        this.transmitter = new Transmitter(this.ws);

        this.connect();
      }
    }
  }

  identify(): void {
    this.transmitter.identify({
      token: this.client.token,
      properties: {
        os: this.client.properties?.os ?? process.platform,
        browser: this.client.properties?.browser ?? pkg.name,
        device: this.client.properties?.device ?? pkg.name,
      },
      compress: this.client.compress,
      largeThreshold: this.client.largeThreshold,
      shard: [this.id, this.client.shardsCount as number],
      presence:
        this.client.presence !== undefined
          ? {
              since:
                this.client.presence.status === StatusTypes.Idle
                  ? Date.now()
                  : null,
              activities: this.client.presence.activities?.map((activity) => ({
                name:
                  activity.type === ActivityType.Custom
                    ? "Custom Status"
                    : activity.name,
                type: activity.type,
                url: activity.url,
                state: activity.state,
              })),
              status: this.client.presence.status ?? StatusTypes.Online,
              afk: !!this.client.presence.afk,
            }
          : undefined,
      intents: this.client.intents,
    });
  }

  private onWebSocketOpen(): void {}

  private onWebSocketMessage(data: RawData): void {
    const packet: RawPayload = JSON.parse(data.toString());

    switch (packet.op) {
      case GatewayOPCodes.Dispatch:
        this.sequence = packet.s;

        this.client.emit("dispatch", packet, this.id);

        this.dispatcher.dispatch(packet.t!, packet.d, this.id);
        break;
      case GatewayOPCodes.Reconnect:
        {
          this.client.emit("reconnect");

          this.disconnect(this.client.reconnect);
        }
        break;
      case GatewayOPCodes.InvalidSession:
        {
          this.client.emit("invalidSession");

          if (packet.d) {
            this.resume();
          } else {
            this.sequence = null;
            this.sessionId = null;

            this.identify();
          }
        }
        break;
      case GatewayOPCodes.Hello:
        {
          this.heartbeatInterval = setInterval(
            () => this.transmitter.heartbeat(this.sequence),
            packet.d.heartbeat_interval
          );

          if (this.sessionId && this.sequence && this.resumeGatewayURL) {
            this.resume();
          } else {
            this.identify();
          }

          this.client.emit("hello", packet.d.heartbeat_interval, this.id);
        }
        break;
      case GatewayOPCodes.HeartbeatACK:
        this.client.emit("heartbeatACK", this.id);
        break;
    }
  }

  private onWebSocketError(err: Error): void {
    throw err;
  }

  private onWebSocketClose(code: number, reason: Buffer): void {
    let reconnect: boolean = false;

    switch (code) {
      case 1000:
        break;
      case GatewayCloseEventCodes.UnknownError:
      case GatewayCloseEventCodes.UnknownOPCode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.NotAuthenticated:
      case GatewayCloseEventCodes.AlreadyAuthenticated:
      case GatewayCloseEventCodes.InvalidSequence:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut:
        reconnect = this.client.reconnect;
        break;
      default:
        throw new GatewayError(code, reason.toString());
    }

    this.disconnect(reconnect);
  }

  resume(): void {
    this.transmitter.resume({
      token: this.client.token,
      sessionId: this.sessionId!,
      seq: this.sequence!,
    });
  }
}
