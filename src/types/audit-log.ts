import type {
  RawApplicationCommand,
  RawGuildScheduledEvent,
  RawAutoModerationRule,
  RawIntegration,
  RawChannel,
  RawUser,
  RawWebhook,
} from ".";
import type {
  ApplicationCommand,
  AutoModerationRule,
  Channel,
  GuildScheduledEvent,
  Integration,
  User,
  Webhook,
} from "../structures";
import type { AuditLogEvents } from "../utils";

/* https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
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

/* https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface RawAuditLogEntry {
  target_id: string | null;
  changes?: Array<RawAuditLogChange>;
  user_id: string | null;
  id: string;
  action_type: AuditLogEvents;
  options?: RawOptionalAuditLogEntryInfo;
  reason?: string;
}

/* https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface RawOptionalAuditLogEntryInfo {
  application_id: string;
  auto_moderation_rule_name: string;
  auto_moderation_rule_trigger_type: string;
  channel_id: string;
  count: string;
  delete_member_days: string;
  id: string;
  members_removed: string;
  message_id: string;
  role_name: string;
  type: string;
}

/* https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface RawAuditLogChange {
  new_value?: any;
  old_value?: any;
  key: string;
}

export interface JSONAuditLog {
  applicationCommands: Array<ApplicationCommand>;
  auditLogEntries: Array<JSONAuditLogEntry>;
  autoModerationRules: Array<AutoModerationRule>;
  guildScheduledEvents: Array<GuildScheduledEvent>;
  integrations: Array<Integration>;
  threads: Array<Channel>;
  users: Array<User>;
  webhooks: Array<Webhook>;
}

export interface JSONAuditLogEntry {
  targetId: string | null;
  changes?: Array<JSONAuditLogChange>;
  userId: string | null;
  id: string;
  actionType: AuditLogEvents;
  options?: JSONOptionalAuditLogEntryInfo;
  reason?: string;
}

export interface JSONOptionalAuditLogEntryInfo {
  applicationId: string;
  autoModerationRuleName: string;
  autoModerationRuleTriggerType: string;
  channelId: string;
  count: string;
  deleteMemberDays: string;
  id: string;
  membersRemoved: string;
  messageId: string;
  roleName: string;
  type: string;
}

export interface JSONAuditLogChange {
  newValue?: any;
  oldValue?: any;
  key: string;
}
