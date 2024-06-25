import type {
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
  GuildScheduledEventEntityTypes,
} from "../constants";
import type { snowflake, timestamp } from "./common";
import type { RawGuildMember, GuildMember } from "./guild";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure */
export interface RawGuildScheduledEvent {
  id: snowflake;
  guild_id: snowflake;
  channel_id: snowflake | null;
  creator_id?: snowflake | null;
  name: string;
  description?: string | null;
  scheduled_start_time: timestamp;
  scheduled_end_time: timestamp | null;
  privacy_level: GuildScheduledEventPrivacyLevel;
  status: GuildScheduledEventStatus;
  entity_type: GuildScheduledEventEntityTypes;
  entity_id: snowflake | null;
  entity_metadata: RawGuildScheduledEventEntityMetadata | null;
  creator?: RawUser;
  user_count?: number;
  image?: string;
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata */
export interface RawGuildScheduledEventEntityMetadata {
  location?: string;
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-user-object-guild-scheduled-event-user-structure */
export interface RawGuildScheduledEventUser {
  guild_scheduled_event_id: snowflake;
  user: RawUser;
  member?: RawGuildMember;
}

export interface GuildScheduledEvent {
  id: snowflake;
  guildID: snowflake;
  channelID: snowflake | null;
  creatorID?: snowflake | null;
  name: string;
  description?: string | null;
  scheduledStartTime: timestamp;
  scheduledEndTime: timestamp | null;
  privacyLevel: GuildScheduledEventPrivacyLevel;
  status: GuildScheduledEventStatus;
  entityType: GuildScheduledEventEntityTypes;
  entityID: snowflake | null;
  entityMetadata: GuildScheduledEventEntityMetadata | null;
  creator?: User;
  userCount?: number;
  image?: string;
}

export interface GuildScheduledEventEntityMetadata {
  location?: string;
}

export interface GuildScheduledEventUser {
  guildScheduledEventID: snowflake;
  user: User;
  member?: GuildMember;
}
