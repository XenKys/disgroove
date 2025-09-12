import type {
  RawGuildScheduledEvent,
  GuildScheduledEvent,
  RawGuildScheduledEventRecurrenceRule,
  GuildScheduledEventRecurrenceRule,
} from "../types/guild-scheduled-event";
import { Users } from "./Users";

export class GuildScheduledEvents {
  static guildScheduledEventRecurrenceRuleFromRaw(
    guildScheduledEventRecurrenceRule: RawGuildScheduledEventRecurrenceRule
  ): GuildScheduledEventRecurrenceRule {
    return {
      start: guildScheduledEventRecurrenceRule.start,
      end: guildScheduledEventRecurrenceRule.end,
      frequency: guildScheduledEventRecurrenceRule.frequency,
      interval: guildScheduledEventRecurrenceRule.interval,
      byWeekday: guildScheduledEventRecurrenceRule.by_weekday,
      byNWeekday: guildScheduledEventRecurrenceRule.by_n_weekday,
      byMonth: guildScheduledEventRecurrenceRule.by_month,
      byMonthDay: guildScheduledEventRecurrenceRule.by_month_day,
      byYearDay: guildScheduledEventRecurrenceRule.by_year_day,
      count: guildScheduledEventRecurrenceRule.count,
    };
  }

  static guildScheduledEventRecurrenceRuleToRaw(
    guildScheduledEventRecurrenceRule: GuildScheduledEventRecurrenceRule
  ): RawGuildScheduledEventRecurrenceRule {
    return {
      start: guildScheduledEventRecurrenceRule.start,
      end: guildScheduledEventRecurrenceRule.end,
      frequency: guildScheduledEventRecurrenceRule.frequency,
      interval: guildScheduledEventRecurrenceRule.interval,
      by_weekday: guildScheduledEventRecurrenceRule.byWeekday,
      by_n_weekday: guildScheduledEventRecurrenceRule.byNWeekday,
      by_month: guildScheduledEventRecurrenceRule.byMonth,
      by_month_day: guildScheduledEventRecurrenceRule.byMonthDay,
      by_year_day: guildScheduledEventRecurrenceRule.byYearDay,
      count: guildScheduledEventRecurrenceRule.count,
    };
  }

  static guildScheduledEventFromRaw(
    guildScheduledEvent: RawGuildScheduledEvent
  ): GuildScheduledEvent {
    return {
      id: guildScheduledEvent.id,
      guildId: guildScheduledEvent.guild_id,
      channelId: guildScheduledEvent.channel_id,
      creatorId: guildScheduledEvent.creator_id,
      name: guildScheduledEvent.name,
      description: guildScheduledEvent.description,
      scheduledStartTime: guildScheduledEvent.scheduled_start_time,
      scheduledEndTime: guildScheduledEvent.scheduled_end_time,
      privacyLevel: guildScheduledEvent.privacy_level,
      status: guildScheduledEvent.status,
      entityType: guildScheduledEvent.entity_type,
      entityId: guildScheduledEvent.entity_id,
      entityMetadata: guildScheduledEvent.entity_metadata,
      creator:
        guildScheduledEvent.creator !== undefined
          ? Users.userFromRaw(guildScheduledEvent.creator)
          : undefined,
      userCount: guildScheduledEvent.user_count,
      image: guildScheduledEvent.image,
      recurrenceRule:
        guildScheduledEvent.reccurence_rule !== null
          ? GuildScheduledEvents.guildScheduledEventRecurrenceRuleFromRaw(
              guildScheduledEvent.reccurence_rule
            )
          : null,
    };
  }

  static guildScheduledEventToRaw(
    guildScheduledEvent: GuildScheduledEvent
  ): RawGuildScheduledEvent {
    return {
      id: guildScheduledEvent.id,
      guild_id: guildScheduledEvent.guildId,
      channel_id: guildScheduledEvent.channelId,
      creator_id: guildScheduledEvent.creatorId,
      name: guildScheduledEvent.name,
      description: guildScheduledEvent.description,
      scheduled_start_time: guildScheduledEvent.scheduledStartTime,
      scheduled_end_time: guildScheduledEvent.scheduledEndTime,
      privacy_level: guildScheduledEvent.privacyLevel,
      status: guildScheduledEvent.status,
      entity_type: guildScheduledEvent.entityType,
      entity_id: guildScheduledEvent.entityId,
      entity_metadata: guildScheduledEvent.entityMetadata,
      creator:
        guildScheduledEvent.creator !== undefined
          ? Users.userToRaw(guildScheduledEvent.creator)
          : undefined,
      user_count: guildScheduledEvent.userCount,
      image: guildScheduledEvent.image,
      reccurence_rule:
        guildScheduledEvent.recurrenceRule !== null
          ? GuildScheduledEvents.guildScheduledEventRecurrenceRuleToRaw(
              guildScheduledEvent.recurrenceRule
            )
          : null,
    };
  }
}
