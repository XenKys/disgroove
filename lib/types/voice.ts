import type { snowflake, timestamp } from "./common";
import type { RawGuildMember, GuildMember } from "./guild";

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface RawVoiceState {
  guild_id?: snowflake;
  channel_id: snowflake | null;
  user_id: snowflake;
  member?: RawGuildMember;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp: timestamp | null;
}

/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export interface RawVoiceRegion {
  id: snowflake;
  name: string;
  optimal: boolean;
  deprecated: boolean;
  custom: boolean;
}

export interface VoiceState {
  guildId?: snowflake;
  channelId: snowflake | null;
  userId: snowflake;
  member?: GuildMember;
  sessionId: string;
  deaf: boolean;
  mute: boolean;
  selfDeaf: boolean;
  selfMute: boolean;
  selfStream?: boolean;
  selfVideo: boolean;
  suppress: boolean;
  requestToSpeakTimestamp: timestamp | null;
}

export interface VoiceRegion {
  id: snowflake;
  name: string;
  optimal: boolean;
  deprecated: boolean;
  custom: boolean;
}
