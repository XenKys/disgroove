import type {
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
  GuildScheduledEventEntityTypes,
} from "../constants";
import type { JSONGuildMember, JSONUser, RawGuildMember, RawUser } from ".";

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure */
export interface RawGuildScheduledEvent {
  id: string;
  guild_id: string;
  channel_id: string | null;
  creator_id?: string | null;
  name: string;
  description?: string | null;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  privacy_level: GuildScheduledEventPrivacyLevel;
  status: GuildScheduledEventStatus;
  entity_type: GuildScheduledEventEntityTypes;
  entity_id?: string;
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
  guild_scheduled_event_id: string;
  user: RawUser;
  member?: RawGuildMember;
}

export interface JSONGuildScheduledEvent {
  id: string;
  guildId: string;
  channelId: string | null;
  creatorId?: string | null;
  name: string;
  description?: string | null;
  scheduledStartTime: string;
  scheduledEndTime: string | null;
  privacyLevel: GuildScheduledEventPrivacyLevel;
  status: GuildScheduledEventStatus;
  entityType: GuildScheduledEventEntityTypes;
  entityId?: string;
  entityMetadata: JSONGuildScheduledEventEntityMetadata | null;
  creator?: JSONUser;
  userCount?: number;
  image?: string;
}

export interface JSONGuildScheduledEventEntityMetadata {
  location?: string;
}

export interface JSONGuildScheduledEventUser {
  guildScheduledEventId: string;
  user: JSONUser;
  member?: JSONGuildMember;
}

export interface CreateGuildScheduledEventParams {
  channelId?: string | null;
  entityMetadata?: JSONGuildScheduledEventEntityMetadata | null;
  name: string;
  privacyLevel: GuildScheduledEventPrivacyLevel;
  scheduledStartTime: string;
  scheduledEndTime?: string | null;
  description?: string | null;
  entityType: GuildScheduledEventEntityTypes;
  image?: string;
}

export interface EditGuildScheduledEventParams {
  channelId?: string | null;
  entityMetadata?: JSONGuildScheduledEventEntityMetadata | null;
  name?: string;
  privacyLevel?: GuildScheduledEventPrivacyLevel;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  description?: string | null;
  entityType?: GuildScheduledEventEntityTypes;
  status?: GuildScheduledEventStatus;
  image?: string;
}
