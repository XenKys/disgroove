import type { KeywordPresetTypes, ActionTypes } from "../utils";

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface RawAutoModerationRule {
  id: string;
  guild_id: string;
  name: string;
  creator_id: string;
  event_type: number;
  trigger_type: number;
  trigger_metadata: object;
  actions: Array<RawAutoModerationAction>;
  enabled: boolean;
  exempt_roles: Array<string>;
  exempt_channels: Array<string>;
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata */
export interface RawTriggerMetadata {
  keyword_filter: Array<string>;
  regex_patterns: Array<string>;
  presets: KeywordPresetTypes;
  allow_list: Array<string>;
  mention_total_limit: number;
  mention_raid_protection: boolean;
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface RawAutoModerationAction {
  type: ActionTypes;
  metadata: RawActionMetadata;
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface RawActionMetadata {
  channel_id: string;
  duration_seconds: number;
  custom_message?: string;
}

export interface JSONAutoModerationRule {
  id: string;
  guildId: string;
  name: string;
  creatorId: string;
  eventType: number;
  triggerType: number;
  triggerMetadata: object;
  actions: Array<JSONAutoModerationAction>;
  enabled: boolean;
  exemptRoles: Array<string>;
  exemptChannels: Array<string>;
}

export interface JSONTriggerMetadata {
  keywordFilter: Array<string>;
  regexPatterns: Array<string>;
  presets: KeywordPresetTypes;
  allowList: Array<string>;
  mentionTotalLimit: number;
  mentionRaidProtection: boolean;
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface JSONAutoModerationAction {
  type: ActionTypes;
  metadata: JSONActionMetadata;
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface JSONActionMetadata {
  channelId: string;
  durationSeconds: number;
  customMessage?: string;
}
