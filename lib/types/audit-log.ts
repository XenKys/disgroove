import type {
  RawApplicationCommand,
  RawGuildScheduledEvent,
  RawAutoModerationRule,
  RawIntegration,
  RawChannel,
  RawUser,
  RawWebhook,
  User,
  ApplicationCommand,
  AutoModerationRule,
  GuildScheduledEvent,
  Integration,
  Channel,
  Webhook,
} from ".";
import type { AuditLogEvents } from "../constants";

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
  user_id: string | null;
  id: string;
  action_type: AuditLogEvents;
  options?: RawOptionalAuditLogEntryInfo;
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
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
  integration_type: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface RawAuditLogChange {
  new_value?: any;
  old_value?: any;
  key: string;
}

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

export interface AuditLogEntry {
  targetId: string | null;
  changes?: Array<AuditLogChange>;
  userId: string | null;
  id: string;
  actionType: AuditLogEvents;
  options?: OptionalAuditLogEntryInfo;
  reason?: string;
}

export interface OptionalAuditLogEntryInfo {
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
  integrationType: string;
}

export interface AuditLogChange {
  newValue?: any;
  oldValue?: any;
  key: string;
}
