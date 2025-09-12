import type {
  RawAuditLogEntry,
  AuditLogEntry,
  RawAuditLog,
  AuditLog,
} from "../types/audit-log";
import { ApplicationCommands } from "./ApplicationCommands";
import { AutoModeration } from "./AutoModeration";
import { Channels } from "./Channels";
import { Guilds } from "./Guilds";
import { GuildScheduledEvents } from "./GuildScheduledEvents";
import { Users } from "./Users";
import { Webhooks } from "./Webhooks";

export class AuditLogs {
  static auditLogEntryFromRaw(auditLogEntry: RawAuditLogEntry): AuditLogEntry {
    return {
      targetId: auditLogEntry.target_id,
      changes: auditLogEntry.changes?.map((auditLogChange) => ({
        newValue: auditLogChange.new_value,
        oldValue: auditLogChange.old_value,
        key: auditLogChange.key,
      })),
      userId: auditLogEntry.user_id,
      id: auditLogEntry.id,
      actionType: auditLogEntry.action_type,
      options:
        auditLogEntry.options !== undefined
          ? {
              applicationId: auditLogEntry.options.application_id,
              autoModerationRuleName:
                auditLogEntry.options.auto_moderation_rule_name,
              autoModerationRuleTriggerType:
                auditLogEntry.options.auto_moderation_rule_trigger_type,
              channelId: auditLogEntry.options.channel_id,
              count: auditLogEntry.options.count,
              deleteMemberDays: auditLogEntry.options.delete_member_days,
              id: auditLogEntry.options.id,
              membersRemoved: auditLogEntry.options.members_removed,
              messageId: auditLogEntry.options.message_id,
              roleName: auditLogEntry.options.role_name,
              type: auditLogEntry.options.type,
              integrationType: auditLogEntry.options.integration_type,
            }
          : undefined,
      reason: auditLogEntry.reason,
    };
  }

  static auditLogEntryToRaw(auditLogEntry: AuditLogEntry): RawAuditLogEntry {
    return {
      target_id: auditLogEntry.targetId,
      changes: auditLogEntry.changes?.map((auditLogChange) => ({
        new_value: auditLogChange.newValue,
        old_value: auditLogChange.oldValue,
        key: auditLogChange.key,
      })),
      user_id: auditLogEntry.userId,
      id: auditLogEntry.id,
      action_type: auditLogEntry.actionType,
      options:
        auditLogEntry.options !== undefined
          ? {
              application_id: auditLogEntry.options.applicationId,
              auto_moderation_rule_name:
                auditLogEntry.options.autoModerationRuleName,
              auto_moderation_rule_trigger_type:
                auditLogEntry.options.autoModerationRuleTriggerType,
              channel_id: auditLogEntry.options.channelId,
              count: auditLogEntry.options.count,
              delete_member_days: auditLogEntry.options.deleteMemberDays,
              id: auditLogEntry.options.id,
              members_removed: auditLogEntry.options.membersRemoved,
              message_id: auditLogEntry.options.messageId,
              role_name: auditLogEntry.options.roleName,
              type: auditLogEntry.options.type,
              integration_type: auditLogEntry.options.integrationType,
            }
          : undefined,
      reason: auditLogEntry.reason,
    };
  }

  static auditLogFromRaw(auditLog: RawAuditLog): AuditLog {
    return {
      applicationCommands: auditLog.application_commands.map(
        (applicationCommand) =>
          ApplicationCommands.applicationCommandFromRaw(applicationCommand)
      ),
      auditLogEntries: auditLog.audit_log_entries.map((auditLogEntry) =>
        AuditLogs.auditLogEntryFromRaw(auditLogEntry)
      ),
      autoModerationRules: auditLog.auto_moderation_rules.map(
        (autoModerationRule) =>
          AutoModeration.autoModerationRuleFromRaw(autoModerationRule)
      ),
      guildScheduledEvents: auditLog.guild_scheduled_events.map(
        (guildScheduledEvent) =>
          GuildScheduledEvents.guildScheduledEventFromRaw(guildScheduledEvent)
      ),
      integrations: auditLog.integrations.map((integration) =>
        Guilds.integrationFromRaw(integration)
      ),
      threads: auditLog.threads.map((thread) =>
        Channels.channelFromRaw(thread)
      ),
      users: auditLog.users.map((user) => Users.userFromRaw(user)),
      webhooks: auditLog.webhooks.map((webhook) =>
        Webhooks.webhookFromRaw(webhook)
      ),
    };
  }

  static auditLogToRaw(auditLog: AuditLog): RawAuditLog {
    return {
      application_commands: auditLog.applicationCommands.map(
        (applicationCommand) =>
          ApplicationCommands.applicationCommandToRaw(applicationCommand)
      ),
      audit_log_entries: auditLog.auditLogEntries.map((auditLogEntry) =>
        AuditLogs.auditLogEntryToRaw(auditLogEntry)
      ),
      auto_moderation_rules: auditLog.autoModerationRules.map(
        (autoModerationRule) =>
          AutoModeration.autoModerationRuleToRaw(autoModerationRule)
      ),
      guild_scheduled_events: auditLog.guildScheduledEvents.map(
        (guildScheduledEvent) =>
          GuildScheduledEvents.guildScheduledEventToRaw(guildScheduledEvent)
      ),
      integrations: auditLog.integrations.map((integration) =>
        Guilds.integrationToRaw(integration)
      ),
      threads: auditLog.threads.map((thread) => Channels.channelToRaw(thread)),
      users: auditLog.users.map((user) => Users.userToRaw(user)),
      webhooks: auditLog.webhooks.map((webhook) =>
        Webhooks.webhookToRaw(webhook)
      ),
    };
  }
}
