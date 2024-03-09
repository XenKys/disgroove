import type { PrivacyLevel } from "../constants";

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure */
export interface RawStageInstance {
  id: string;
  guild_id: string;
  channel_id: string;
  topic: string;
  privacy_level: PrivacyLevel;
  discoverable_disabled: boolean;
  guild_scheduled_event_id: string | null;
}

export interface StageInstance {
  id: string;
  guildId: string;
  channelId: string;
  topic: string;
  privacyLevel: PrivacyLevel;
  discoverableDisabled: boolean;
  guildScheduledEventId: string | null;
}

export interface CreateStageInstanceParams {
  channelId: string;
  topic: string;
  privacyLevel?: PrivacyLevel;
  sendStartNotifications?: boolean;
  guildScheduledEventId?: string;
}

export interface EditStageInstanceParams {
  topic?: string;
  privacyLevel?: PrivacyLevel;
}
