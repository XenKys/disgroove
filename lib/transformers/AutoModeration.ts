import type {
  AutoModerationAction,
  AutoModerationRule,
  RawAutoModerationAction,
  RawAutoModerationRule,
  RawTriggerMetadata,
  TriggerMetadata,
} from "../types/auto-moderation";

export class AutoModeration {
  static actionFromRaw(action: RawAutoModerationAction): AutoModerationAction {
    return {
      type: action.type,
      metadata: {
        channelId: action.metadata.channel_id,
        durationSeconds: action.metadata.duration_seconds,
        customMessage: action.metadata.custom_message,
      },
    };
  }

  static actionToRaw(action: AutoModerationAction): RawAutoModerationAction {
    return {
      type: action.type,
      metadata: {
        channel_id: action.metadata.channelId,
        duration_seconds: action.metadata.durationSeconds,
        custom_message: action.metadata.customMessage,
      },
    };
  }

  static autoModerationRuleFromRaw(
    autoModerationRule: RawAutoModerationRule
  ): AutoModerationRule {
    return {
      id: autoModerationRule.id,
      guildId: autoModerationRule.guild_id,
      name: autoModerationRule.name,
      creatorId: autoModerationRule.creator_id,
      eventType: autoModerationRule.event_type,
      triggerType: autoModerationRule.trigger_type,
      triggerMetadata: this.triggerMetadataFromRaw(
        autoModerationRule.trigger_metadata
      ),
      actions: autoModerationRule.actions.map((action) =>
        this.actionFromRaw(action)
      ),
      enabled: autoModerationRule.enabled,
      exemptRoles: autoModerationRule.exempt_roles,
      exemptChannels: autoModerationRule.exempt_channels,
    };
  }

  static autoModerationRuleToRaw(
    autoModerationRule: AutoModerationRule
  ): RawAutoModerationRule {
    return {
      id: autoModerationRule.id,
      guild_id: autoModerationRule.guildId,
      name: autoModerationRule.name,
      creator_id: autoModerationRule.creatorId,
      event_type: autoModerationRule.eventType,
      trigger_type: autoModerationRule.triggerType,
      trigger_metadata: this.triggerMetadataToRaw(
        autoModerationRule.triggerMetadata
      ),
      actions: autoModerationRule.actions.map((action) =>
        this.actionToRaw(action)
      ),
      enabled: autoModerationRule.enabled,
      exempt_roles: autoModerationRule.exemptRoles,
      exempt_channels: autoModerationRule.exemptChannels,
    };
  }

  static triggerMetadataFromRaw(
    triggerMetadata: RawTriggerMetadata
  ): TriggerMetadata {
    return {
      keywordFilter: triggerMetadata.keyword_filter,
      regexPatterns: triggerMetadata.regex_patterns,
      presets: triggerMetadata.presets,
      allowList: triggerMetadata.allow_list,
      mentionTotalLimit: triggerMetadata.mention_total_limit,
      mentionRaidProtection: triggerMetadata.mention_raid_protection,
    };
  }

  static triggerMetadataToRaw(
    triggerMetadata: TriggerMetadata
  ): RawTriggerMetadata {
    return {
      keyword_filter: triggerMetadata.keywordFilter,
      regex_patterns: triggerMetadata.regexPatterns,
      presets: triggerMetadata.presets,
      allow_list: triggerMetadata.allowList,
      mention_total_limit: triggerMetadata.mentionTotalLimit,
      mention_raid_protection: triggerMetadata.mentionRaidProtection,
    };
  }
}
