import type {
  RawGuildScheduledEvent,
  GuildScheduledEvent,
} from "../types/guild-scheduled-event";
import { Users } from "./Users";

export class GuildScheduledEvents {
  static guildScheduledEventFromRaw(
    guildScheduledEvent: RawGuildScheduledEvent
  ): GuildScheduledEvent {
    return {
      id: guildScheduledEvent.id,
      guildID: guildScheduledEvent.guild_id,
      channelID: guildScheduledEvent.channel_id,
      creatorID: guildScheduledEvent.creator_id,
      name: guildScheduledEvent.name,
      description: guildScheduledEvent.description,
      scheduledStartTime: guildScheduledEvent.scheduled_start_time,
      scheduledEndTime: guildScheduledEvent.scheduled_end_time,
      privacyLevel: guildScheduledEvent.privacy_level,
      status: guildScheduledEvent.status,
      entityType: guildScheduledEvent.entity_type,
      entityID: guildScheduledEvent.entity_id,
      entityMetadata: guildScheduledEvent.entity_metadata,
      creator:
        guildScheduledEvent.creator !== undefined
          ? Users.userFromRaw(guildScheduledEvent.creator)
          : undefined,
      userCount: guildScheduledEvent.user_count,
      image: guildScheduledEvent.image,
    };
  }

  static guildScheduledEventToRaw(
    guildScheduledEvent: GuildScheduledEvent
  ): RawGuildScheduledEvent {
    return {
      id: guildScheduledEvent.id,
      guild_id: guildScheduledEvent.guildID,
      channel_id: guildScheduledEvent.channelID,
      creator_id: guildScheduledEvent.creatorID,
      name: guildScheduledEvent.name,
      description: guildScheduledEvent.description,
      scheduled_start_time: guildScheduledEvent.scheduledStartTime,
      scheduled_end_time: guildScheduledEvent.scheduledEndTime,
      privacy_level: guildScheduledEvent.privacyLevel,
      status: guildScheduledEvent.status,
      entity_type: guildScheduledEvent.entityType,
      entity_id: guildScheduledEvent.entityID,
      entity_metadata: guildScheduledEvent.entityMetadata,
      creator:
        guildScheduledEvent.creator !== undefined
          ? Users.userToRaw(guildScheduledEvent.creator)
          : undefined,
      user_count: guildScheduledEvent.userCount,
      image: guildScheduledEvent.image,
    };
  }
}
