import type { GuildMember, RawGuildMember } from ".";

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface RawVoiceState {
  guild_id?: string;
  channel_id: string | null;
  user_id: string;
  member?: RawGuildMember;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp: string | null;
}

/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export interface RawVoiceRegion {
  id: string;
  name: string;
  optimal: boolean;
  deprecated: boolean;
  custom: boolean;
}

export interface VoiceState {
  guildId?: string;
  channelId: string | null;
  userId: string;
  member?: GuildMember;
  sessionId: string;
  deaf: boolean;
  mute: boolean;
  selfDeaf: boolean;
  selfMute: boolean;
  selfStream?: boolean;
  selfVideo: boolean;
  suppress: boolean;
  requestToSpeakTimestamp: string | null;
}

export interface VoiceRegion {
  id: string;
  name: string;
  optimal: boolean;
  deprecated: boolean;
  custom: boolean;
}
