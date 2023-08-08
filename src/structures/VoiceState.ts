import { GuildMember } from ".";
import type { Client } from "../Client";
import type { JSONVoiceState, RawVoiceState } from "../types";

export class VoiceState {
  private client: Client;
  public guildId?: string;
  public channelId: string | null;
  public userId: string;
  public member?: GuildMember;
  public sessionId: string;
  public deaf: boolean;
  public mute: boolean;
  public selfDeaf: boolean;
  public selfMute: boolean;
  public selfStream?: boolean;
  public selfVideo: boolean;
  public suppress: boolean;
  public requestToSpeakTimestamp: string | null;

  constructor(data: RawVoiceState, client: Client) {
    this.client = client;
    this.channelId = data.channel_id;
    this.userId = data.user_id;
    this.sessionId = data.session_id;
    this.deaf = data.deaf;
    this.mute = data.mute;
    this.selfDeaf = data.self_deaf;
    this.selfMute = data.self_mute;
    this.selfVideo = data.self_video;
    this.suppress = data.suppress;
    this.requestToSpeakTimestamp = data.request_to_speak_timestamp;

    this.patch(data);
  }

  private patch(data: RawVoiceState) {
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.member !== undefined)
      this.member = new GuildMember(data.member, this.client);
    if (data.self_stream !== undefined) this.selfStream = data.self_stream;
  }

  public toString(): string {
    return `[${this.constructor.name}]`;
  }

  public toJSON(): JSONVoiceState {
    return {
      guildId: this.guildId,
      channelId: this.channelId,
      userId: this.userId,
      member: this.member?.toJSON(),
      sessionId: this.sessionId,
      deaf: this.deaf,
      mute: this.mute,
      selfDeaf: this.selfDeaf,
      selfMute: this.selfMute,
      selfStream: this.selfStream,
      selfVideo: this.selfVideo,
      suppress: this.suppress,
      requestToSpeakTimestamp: this.requestToSpeakTimestamp,
    };
  }
}
