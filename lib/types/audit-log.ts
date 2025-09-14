import type { AuditLogEvents } from "../constants";
import type {
  RawApplicationCommand,
  ApplicationCommand,
} from "./application-command";
import type {
  RawAutoModerationRule,
  AutoModerationRule,
} from "./auto-moderation";
import type { RawChannel, Channel } from "./channel";
import type { snowflake } from "./common";
import type { RawIntegration, Integration } from "./guild";
import type {
  RawGuildScheduledEvent,
  GuildScheduledEvent,
} from "./guild-scheduled-event";
import type { RawUser, User } from "./user";
import type { RawWebhook, Webhook } from "./webhook";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface RawAuditLog {
  application_commands: Array<RawApplicationCommand>;
  audit_log_entries: Array<RawAuditLogEntry>;
  auto_moderation_rules: Array<RawAutoModerationRule>;
  guild_scheduled_events: Array<RawGuildScheduledEvent>;
  integrations: Array<RawIntegration>;
  threads: Array<RawChannel>;
  users: Array<RawUser>;
  webhooks: Array<RawWebhook>;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface RawAuditLogEntry {
  target_id: string | null;
  changes?: Array<RawAuditLogChange>;
  user_id: snowflake | null;
  id: snowflake;
  action_type: AuditLogEvents;
  options?: RawOptionalAuditLogEntryInfo;
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface RawOptionalAuditLogEntryInfo {
  application_id: snowflake;
  auto_moderation_rule_name: string;
  auto_moderation_rule_trigger_type: string;
  channel_id: snowflake;
  count: string;
  delete_member_days: string;
  id: snowflake;
  members_removed: string;
  message_id: snowflake;
  role_name: string;
  type: string;
  integration_type: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface RawAuditLogChange {
  new_value?: any;
  old_value?: any;
  key: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface AuditLog {
  applicationCommands: Array<ApplicationCommand>;
  auditLogEntries: Array<AuditLogEntry>;
  autoModerationRules: Array<AutoModerationRule>;
  guildScheduledEvents: Array<GuildScheduledEvent>;
  integrations: Array<Integration>;
  threads: Array<Channel>;
  users: Array<User>;
  webhooks: Array<Webhook>;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface AuditLogEntry {
  targetId: snowflake | null;
  changes?: Array<AuditLogChange>;
  userId: snowflake | null;
  id: snowflake;
  actionType: AuditLogEvents;
  options?: OptionalAuditLogEntryInfo;
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface OptionalAuditLogEntryInfo {
  applicationId: snowflake;
  autoModerationRuleName: string;
  autoModerationRuleTriggerType: string;
  channelId: snowflake;
  count: string;
  deleteMemberDays: string;
  id: snowflake;
  membersRemoved: string;
  messageId: snowflake;
  roleName: string;
  type: string;
  integrationType: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface AuditLogChange {
  newValue?: any;
  oldValue?: any;
  key: string;
}
