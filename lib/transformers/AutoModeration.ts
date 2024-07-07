import type {
  AutoModerationRule,
  RawAutoModerationRule,
} from "../types/auto-moderation";

export class AutoModeration {
  static autoModerationRuleFromRaw(
    autoModerationRule: RawAutoModerationRule
  ): AutoModerationRule {
    return {
      id: autoModerationRule.id,
      guildID: autoModerationRule.guild_id,
      name: autoModerationRule.name,
      creatorID: autoModerationRule.creator_id,
      eventType: autoModerationRule.event_type,
      triggerType: autoModerationRule.trigger_type,
      triggerMetadata: {
        keywordFilter: autoModerationRule.trigger_metadata.keyword_filter,
        regexPatterns: autoModerationRule.trigger_metadata.regex_patterns,
        presets: autoModerationRule.trigger_metadata.presets,
        allowList: autoModerationRule.trigger_metadata.allow_list,
        mentionTotalLimit:
          autoModerationRule.trigger_metadata.mention_total_limit,
        mentionRaidProtection:
          autoModerationRule.trigger_metadata.mention_raid_protection,
      },
      actions: autoModerationRule.actions.map((action) => ({
        type: action.type,
        metadata: {
          channelID: action.metadata.channel_id,
          durationSeconds: action.metadata.duration_seconds,
          customMessage: action.metadata.custom_message,
        },
      })),
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
      guild_id: autoModerationRule.guildID,
      name: autoModerationRule.name,
      creator_id: autoModerationRule.creatorID,
      event_type: autoModerationRule.eventType,
      trigger_type: autoModerationRule.triggerType,
      trigger_metadata: {
        keyword_filter: autoModerationRule.triggerMetadata.keywordFilter,
        regex_patterns: autoModerationRule.triggerMetadata.regexPatterns,
        presets: autoModerationRule.triggerMetadata.presets,
        allow_list: autoModerationRule.triggerMetadata.allowList,
        mention_total_limit:
          autoModerationRule.triggerMetadata.mentionTotalLimit,
        mention_raid_protection:
          autoModerationRule.triggerMetadata.mentionRaidProtection,
      },
      actions: autoModerationRule.actions.map((action) => ({
        type: action.type,
        metadata: {
          channel_id: action.metadata.channelID,
          duration_seconds: action.metadata.durationSeconds,
          custom_message: action.metadata.customMessage,
        },
      })),
      enabled: autoModerationRule.enabled,
      exempt_roles: autoModerationRule.exemptRoles,
      exempt_channels: autoModerationRule.exemptChannels,
    };
  }
}
