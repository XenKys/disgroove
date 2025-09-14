import type {
  KeywordPresetTypes,
  ActionTypes,
  EventTypes,
  TriggerTypes,
} from "../constants";
import type { snowflake } from "./common";

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface RawAutoModerationRule {
  id: snowflake;
  guild_id: snowflake;
  name: string;
  creator_id: snowflake;
  event_type: EventTypes;
  trigger_type: TriggerTypes;
  trigger_metadata: RawTriggerMetadata;
  actions: Array<RawAutoModerationAction>;
  enabled: boolean;
  exempt_roles: Array<snowflake>;
  exempt_channels: Array<snowflake>;
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
  channel_id: snowflake;
  duration_seconds: number;
  custom_message?: string;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface AutoModerationRule {
  id: snowflake;
  guildId: snowflake;
  name: string;
  creatorId: snowflake;
  eventType: EventTypes;
  triggerType: TriggerTypes;
  triggerMetadata: TriggerMetadata;
  actions: Array<AutoModerationAction>;
  enabled: boolean;
  exemptRoles: Array<snowflake>;
  exemptChannels: Array<snowflake>;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata */
export interface TriggerMetadata {
  keywordFilter: Array<string>;
  regexPatterns: Array<string>;
  presets: KeywordPresetTypes;
  allowList: Array<string>;
  mentionTotalLimit: number;
  mentionRaidProtection: boolean;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface AutoModerationAction {
  type: ActionTypes;
  metadata: ActionMetadata;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface ActionMetadata {
  channelId: snowflake;
  durationSeconds: number;
  customMessage?: string;
}
