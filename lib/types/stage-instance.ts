import type { PrivacyLevel } from "../constants";
import type { snowflake } from "./common";

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure */
export interface RawStageInstance {
  id: snowflake;
  guild_id: snowflake;
  channel_id: snowflake;
  topic: string;
  privacy_level: PrivacyLevel;
  discoverable_disabled: boolean;
  guild_scheduled_event_id: snowflake | null;
}

export interface StageInstance {
  id: snowflake;
  guildID: snowflake;
  channelID: snowflake;
  topic: string;
  privacyLevel: PrivacyLevel;
  discoverableDisabled: boolean;
  guildScheduledEventID: snowflake | null;
}
