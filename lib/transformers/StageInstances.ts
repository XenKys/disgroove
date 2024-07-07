import type { RawStageInstance, StageInstance } from "../types/stage-instance";

export class StageInstances {
  static stageInstanceFromRaw(stageInstance: RawStageInstance): StageInstance {
    return {
      id: stageInstance.id,
      guildID: stageInstance.guild_id,
      channelID: stageInstance.channel_id,
      topic: stageInstance.topic,
      privacyLevel: stageInstance.privacy_level,
      discoverableDisabled: stageInstance.discoverable_disabled,
      guildScheduledEventID: stageInstance.guild_scheduled_event_id,
    };
  }

  static stageInstanceToRaw(stageInstance: StageInstance): RawStageInstance {
    return {
      id: stageInstance.id,
      guild_id: stageInstance.guildID,
      channel_id: stageInstance.channelID,
      topic: stageInstance.topic,
      privacy_level: stageInstance.privacyLevel,
      discoverable_disabled: stageInstance.discoverableDisabled,
      guild_scheduled_event_id: stageInstance.guildScheduledEventID,
    };
  }
}
