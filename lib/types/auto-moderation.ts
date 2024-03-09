import type {
  KeywordPresetTypes,
  ActionTypes,
  EventTypes,
  TriggerTypes,
} from "../constants";

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface RawAutoModerationRule {
  id: string;
  guild_id: string;
  name: string;
  creator_id: string;
  event_type: EventTypes;
  trigger_type: TriggerTypes;
  trigger_metadata: RawTriggerMetadata;
  actions: Array<RawAutoModerationAction>;
  enabled: boolean;
  exempt_roles: Array<string>;
  exempt_channels: Array<string>;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata */
export interface RawTriggerMetadata {
  keyword_filter: Array<string>;
  regex_patterns: Array<string>;
  presets: KeywordPresetTypes;
  allow_list: Array<string>;
  mention_total_limit: number;
  mention_raid_protection: boolean;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface RawAutoModerationAction {
  type: ActionTypes;
  metadata: RawActionMetadata;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface RawActionMetadata {
  channel_id: string;
  duration_seconds: number;
  custom_message?: string;
}

export interface AutoModerationRule {
  id: string;
  guildId: string;
  name: string;
  creatorId: string;
  eventType: EventTypes;
  triggerType: TriggerTypes;
  triggerMetadata: TriggerMetadata;
  actions: Array<AutoModerationAction>;
  enabled: boolean;
  exemptRoles: Array<string>;
  exemptChannels: Array<string>;
}

export interface TriggerMetadata {
  keywordFilter: Array<string>;
  regexPatterns: Array<string>;
  presets: KeywordPresetTypes;
  allowList: Array<string>;
  mentionTotalLimit: number;
  mentionRaidProtection: boolean;
}

export interface AutoModerationAction {
  type: ActionTypes;
  metadata: ActionMetadata;
}

export interface ActionMetadata {
  channelId: string;
  durationSeconds: number;
  customMessage?: string;
}

export interface CreateAutoModerationRuleParams {
  name: string;
  eventType: EventTypes;
  triggerType: TriggerTypes;
  triggerMetadata?: TriggerMetadata;
  actions: Array<AutoModerationAction>;
  enabled?: boolean;
  exemptRoles?: Array<string>;
  exemptChannels?: Array<string>;
}

export interface EditAutoModerationRuleParams {
  name?: string;
  eventType?: EventTypes;
  triggerType?: TriggerTypes;
  triggerMetadata?: TriggerMetadata;
  actions?: Array<AutoModerationAction>;
  enabled?: boolean;
  exemptRoles?: Array<string>;
  exemptChannels?: Array<string>;
}
