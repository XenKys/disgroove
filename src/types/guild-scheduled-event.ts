import type {
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
  GuildScheduledEventEntityTypes,
} from "../utils";
import type { RawGuildMember, RawUser } from ".";
import type { GuildMember, User } from "../structures";

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
  creator?: User;
  userCount?: number;
  image?: string;
}

export interface JSONGuildScheduledEventEntityMetadata {
  location?: string;
}

export interface JSONGuildScheduledEventUser {
  guildScheduledEventId: string;
  user: User;
  member?: GuildMember;
}
