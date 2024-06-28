import WebSocket, { type RawData } from "ws";
import type { snowflake } from "../types/common";
import { VoiceCloseEventCodes, VoiceOPCodes } from "../constants";
import { GatewayError } from "../utils";
import EventEmitter from "node:events";
import type {
  ResumeConnectionPayload,
  SelectProtocolPayload,
  SessionDescriptionPayload,
  VoiceIdentifyPayload,
  VoiceReadyPayload,
} from "../types/voice-connections";

export class VoiceConnection extends EventEmitter {
  ws: WebSocket;
  endpoint: string;
  serverID: snowflake;
  userID: snowflake;
  sessionID: string;
  token: string;
  private heartbeatInterval!: NodeJS.Timeout | null;
  ssrc!: number;

  constructor(endpoint: string, options: VoiceIdentifyPayload) {
    super();

    this.ws = new WebSocket(`wss://${endpoint}?v=4`);
    this.endpoint = endpoint;
    this.serverID = options.serverID;
    this.userID = options.userID;
    this.sessionID = options.sessionID;
    this.token = options.token;
  }

  /** https://discord.com/developers/docs/topics/voice-connections#connecting-to-voice */
  connect(): void {
    this.ws.on("open", () => this.onWebSocketOpen());
    this.ws.on("message", (data) => this.onWebSocketMessage(data));
    this.ws.on("error", (err) => this.onWebSocketError(err));
    this.ws.on("close", (code, reason) => this.onWebSocketClose(code, reason));
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  disconnect(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);

      this.heartbeatInterval = null;
    }
  }

  /** https://discord.com/developers/docs/topics/voice-connections#heartbeating */
  heartbeat(): void {
    this.ws.send(
      JSON.stringify({
        op: VoiceOPCodes.Heartbeat,
        d: Date.now(),
      })
    );
  }

  /** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-identify-payload */
  identify(options: VoiceIdentifyPayload): void {
    this.ws.send(
      JSON.stringify({
        op: VoiceOPCodes.Identify,
        d: {
          server_id: options.serverID,
          user_id: options.userID,
          session_id: options.sessionID,
          token: options.token,
        },
      })
    );
  }

  private onWebSocketOpen(): void {
    this.identify({
      serverID: this.serverID,
      userID: this.userID,
      sessionID: this.sessionID,
      token: this.token,
    });
  }

  private onWebSocketMessage(data: RawData): void {
    const packet = JSON.parse(data.toString());

    switch (packet.op) {
      case VoiceOPCodes.Ready:
        {
          this.ssrc = packet.d.ssrc;

          this.emit("ready", {
            ssrc: packet.d.ssrc,
            ip: packet.d.ip,
            port: packet.d.port,
            modes: packet.d.modes,
          });
        }
        break;
      case VoiceOPCodes.SessionDescription:
        this.emit("sessionDescription", {
          mode: packet.d.mode,
          secretKey: packet.d.secret_key,
        });
        break;
      case VoiceOPCodes.Speaking:
        this.emit("speaking", packet.d.speaking);
        break;
      case VoiceOPCodes.HeartbeatACK:
        this.emit("heartbeatACK", packet.d);
        break;
      case VoiceOPCodes.Hello:
        {
          this.heartbeatInterval = setInterval(
            () => this.heartbeat(),
            packet.d.heartbeat_interval
          );

          this.emit("hello");
        }
        break;
      case VoiceOPCodes.Resumed:
        this.emit("resumed");
        break;
      case VoiceOPCodes.ClientDisconnect:
        this.emit("clientDisconnect");
        break;
    }
  }

  private onWebSocketError(err: Error): void {
    throw err;
  }

  private onWebSocketClose(code: number, reason: Buffer): void {
    if (code === 1000) return;
    if (code === VoiceCloseEventCodes.Disconnect) return this.disconnect();

    throw new GatewayError(`[${code}] ${reason}`);
  }

  /** https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection */
  resume(options: ResumeConnectionPayload): void {
    this.ws.send(
      JSON.stringify({
        op: VoiceOPCodes.Resume,
        d: {
          server_id: options.serverID,
          session_id: options.sessionID,
          token: options.token,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection */
  selectProtocol(options: SelectProtocolPayload): void {
    this.ws.send(
      JSON.stringify({
        op: VoiceOPCodes.SelectProtocol,
        d: options,
      })
    );
  }

  /** https://discord.com/developers/docs/topics/voice-connections#speaking */
  speaking(speaking: number): void {
    this.ws.send(
      JSON.stringify({
        op: VoiceOPCodes.Speaking,
        d: {
          speaking,
          delay: 0,
          ssrc: this.ssrc,
        },
      })
    );
  }
}

export declare interface VoiceConnection extends EventEmitter {
  addListener<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
  emit<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    ...args: VoiceConnectionEvents[K]
  ): boolean;
  listenerCount(eventName: keyof VoiceConnectionEvents): number;
  listeners(eventName: keyof VoiceConnectionEvents): Array<Function>;
  off<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
  on<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
  once<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
  prependListener<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
  prependOnceListener<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
  rawListeners(eventName: keyof VoiceConnectionEvents): Array<Function>;
  removeAllListeners(event?: keyof VoiceConnectionEvents): this;
  removeListener<K extends keyof VoiceConnectionEvents>(
    eventName: K,
    listener: (...args: VoiceConnectionEvents[K]) => void
  ): this;
}

export interface VoiceConnectionEvents {
  ready: [voiceServer: VoiceReadyPayload];
  sessionDescription: [session: SessionDescriptionPayload];
  speaking: [speaking: number];
  heartbeatACK: [heartbeat: number];
  hello: [];
  resumed: [];
  clientDisconnect: [];
}
