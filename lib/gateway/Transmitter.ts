import WebSocket from "ws";
import { ActivityType, GatewayOPCodes, StatusTypes } from "../constants";
import type {
  GatewayPresenceUpdate,
  GatewayVoiceStateUpdate,
  Identify,
  RequestGuildMembers,
  RequestSoundboardSounds,
  Resume,
} from "../types/gateway-events";

export class Transmitter {
  private ws: WebSocket | null;

  constructor(ws: WebSocket | null) {
    this.ws = ws;
  }

  send(op: GatewayOPCodes, data: unknown): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          op,
          d: data,
        })
      );
    }
  }

  /** https://discord.com/developers/docs/topics/gateway-events#heartbeat */
  heartbeat(lastSequence: number | null): void {
    this.send(GatewayOPCodes.Heartbeat, lastSequence);
  }

  /** https://discord.com/developers/docs/topics/gateway-events#identify */
  identify(options: Identify): void {
    this.send(GatewayOPCodes.Identify, {
      token: options.token,
      properties: {
        os: options.properties.os,
        browser: options.properties.browser,
        device: options.properties.device,
      },
      compress: options.compress,
      large_threshold: options.largeThreshold,
      shard: options.shard,
      presence: options.presence,
      intents: options.intents,
    });
  }

  /** https://discord.com/developers/docs/topics/gateway-events#request-guild-members */
  requestGuildMembers(options: RequestGuildMembers): void {
    this.send(GatewayOPCodes.RequestGuildMembers, {
      guild_id: options.guildId,
      query: options.query,
      limit: options.limit,
      presences: options.presences,
      user_ids: options.userIds,
      nonce: options.nonce,
    });
  }

  /** https://discord.com/developers/docs/topics/gateway-events#request-soundboard-sounds */
  requestSoundboardSounds(options: RequestSoundboardSounds): void {
    this.send(GatewayOPCodes.RequestSoundboardSounds, {
      guild_ids: options.guildIds,
    });
  }

  /** https://discord.com/developers/docs/topics/gateway-events#resume */
  resume(options: Resume): void {
    this.send(GatewayOPCodes.Resume, {
      token: options.token,
      session_id: options.sessionId,
      seq: options.seq,
    });
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  updatePresence(
    options: Partial<
      Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
    >
  ): void {
    this.send(GatewayOPCodes.PresenceUpdate, {
      since: options.status === StatusTypes.Idle ? Date.now() : null,
      activities: options.activities?.map((activity) => ({
        name:
          activity.type === ActivityType.Custom
            ? "Custom Status"
            : activity.name,
        type: activity.type,
        url: activity.url,
        state: activity.state,
      })),
      status: options.status ?? StatusTypes.Online,
      afk: !!options.afk,
    });
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  updateVoiceState(options: GatewayVoiceStateUpdate): void {
    this.send(GatewayOPCodes.VoiceStateUpdate, {
      guild_id: options.guildId,
      channel_id: options.channelId,
      self_mute: options.selfMute,
      self_deaf: options.selfDeaf,
    });
  }
}
