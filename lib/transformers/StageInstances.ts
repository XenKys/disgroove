import type { RawStageInstance, StageInstance } from "../types/stage-instance";

export class StageInstances {
  static stageInstanceFromRaw(stageInstance: RawStageInstance): StageInstance {
    return {
      id: stageInstance.id,
      guildId: stageInstance.guild_id,
      channelId: stageInstance.channel_id,
      topic: stageInstance.topic,
      privacyLevel: stageInstance.privacy_level,
      discoverableDisabled: stageInstance.discoverable_disabled,
      guildScheduledEventId: stageInstance.guild_scheduled_event_id,
    };
  }

  static stageInstanceToRaw(stageInstance: StageInstance): RawStageInstance {
    return {
      id: stageInstance.id,
      guild_id: stageInstance.guildId,
      channel_id: stageInstance.channelId,
      topic: stageInstance.topic,
      privacy_level: stageInstance.privacyLevel,
      discoverable_disabled: stageInstance.discoverableDisabled,
      guild_scheduled_event_id: stageInstance.guildScheduledEventId,
    };
  }
}
