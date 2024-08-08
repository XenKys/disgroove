import type {
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
  GuildScheduledEventEntityTypes,
  GuildScheduledEventRecurrenceRuleFrequency,
  GuildScheduledEventRecurrenceRuleMonth,
  GuildScheduledEventRecurrenceRuleWeekday,
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
  reccurence_rule: RawGuildScheduledEventRecurrenceRule | null;
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

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-structure */
export interface RawGuildScheduledEventRecurrenceRule {
  start: timestamp;
  end: timestamp | null;
  frequency: GuildScheduledEventRecurrenceRuleFrequency;
  interval: number;
  by_weekday: GuildScheduledEventRecurrenceRuleWeekday | null;
  by_n_weekday: RawGuildScheduledEventRecurrenceRuleNWeekday | null;
  by_month: GuildScheduledEventRecurrenceRuleMonth | null;
  by_month_day: Array<number>;
  by_year_day: Array<number>;
  count: number | null;
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-nweekday-structure */
export interface RawGuildScheduledEventRecurrenceRuleNWeekday {
  n: number;
  day: GuildScheduledEventRecurrenceRuleWeekday;
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
  recurrenceRule: GuildScheduledEventRecurrenceRule | null;
}

export interface GuildScheduledEventEntityMetadata {
  location?: string;
}

export interface GuildScheduledEventUser {
  guildScheduledEventID: snowflake;
  user: User;
  member?: GuildMember;
}

export interface GuildScheduledEventRecurrenceRule {
  start: timestamp;
  end: timestamp | null;
  frequency: GuildScheduledEventRecurrenceRuleFrequency;
  interval: number;
  byWeekday: GuildScheduledEventRecurrenceRuleWeekday | null;
  byNWeekday: GuildScheduledEventRecurrenceRuleNWeekday | null;
  byMonth: GuildScheduledEventRecurrenceRuleMonth | null;
  byMonthDay: Array<number>;
  byYearDay: Array<number>;
  count: number | null;
}

export interface GuildScheduledEventRecurrenceRuleNWeekday {
  n: number;
  day: GuildScheduledEventRecurrenceRuleWeekday;
}
