import type { snowflake } from "../types/common";
import type {
  ResumeConnectionPayload,
  SelectProtocolPayload,
  VoiceIdentifyPayload,
} from "../types/voice-connections";
import { VoiceConnection } from ".";

export class VoiceConnectionManager extends Map<snowflake, VoiceConnection> {
  /** https://discord.com/developers/docs/topics/voice-connections#connecting-to-voice */
  connect(endpoint: string, options: VoiceIdentifyPayload): VoiceConnection {
    let voiceConnection = new VoiceConnection(endpoint, options);

    if (!this.has(options.serverID)) {
      this.set(options.serverID, voiceConnection);

      voiceConnection.connect();
    } else {
      this.disconnect(options.serverID);

      this.set(options.serverID, voiceConnection);
    }

    return voiceConnection;
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  disconnect(guildID: snowflake): void {
    if (this.has(guildID)) {
      this.get(guildID)!.disconnect();

      this.delete(guildID);
    }
  }

  /** https://discord.com/developers/docs/topics/voice-connections#heartbeating */
  heartbeat(guildID: snowflake): void {
    if (this.has(guildID)) {
      this.get(guildID)!.heartbeat();
    }
  }

  /** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-identify-payload */
  identify(guildID: snowflake, options: VoiceIdentifyPayload): void {
    if (this.has(guildID)) {
      this.get(guildID)!.identify({
        serverID: options.serverID,
        userID: options.userID,
        sessionID: options.sessionID,
        token: options.token,
      });
    }
  }

  /** https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection */
  resume(guildID: snowflake, options: ResumeConnectionPayload): void {
    if (this.has(guildID)) {
      this.get(guildID)!.resume({
        serverID: options.serverID,
        sessionID: options.sessionID,
        token: options.token,
      });
    }
  }

  /** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection */
  selectProtocol(guildID: snowflake, options: SelectProtocolPayload): void {
    if (this.has(guildID)) {
      this.get(guildID)!.selectProtocol(options);
    }
  }

  /** https://discord.com/developers/docs/topics/voice-connections#speaking */
  speaking(guildID: snowflake, speaking: number): void {
    if (this.has(guildID)) {
      this.get(guildID)!.speaking(speaking);
    }
  }
}
