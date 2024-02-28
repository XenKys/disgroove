import {
  ApplicationCommand,
  AutoModerationRule,
  Base,
  Channel,
  GuildScheduledEvent,
  Integration,
  User,
  Webhook,
} from ".";
import type { Client } from "../Client";
import type { JSONAuditLog, JSONAuditLogEntry, RawAuditLog } from "../types";

/** https://discord.com/developers/docs/resources/audit-log */
export class AuditLog extends Base {
  protected override raw: RawAuditLog;

  applicationCommands: Array<ApplicationCommand>;
  auditLogEntries: Array<JSONAuditLogEntry>;
  autoModerationRules: Array<AutoModerationRule>;
  guildScheduledEvents: Array<GuildScheduledEvent>;
  integrations: Array<Integration>;
  threads: Array<Channel>;
  users: Array<User>;
  webhooks: Array<Webhook>;

  constructor(data: RawAuditLog, client: Client) {
    super(client);

    this.raw = data;
    this.applicationCommands = data.application_commands.map(
      (applicationCommand) =>
        new ApplicationCommand(applicationCommand, this.client)
    );
    this.auditLogEntries = data.audit_log_entries.map((auditLogEntry) => ({
      targetId: auditLogEntry.target_id,
      changes: auditLogEntry.changes?.map((change) => ({
        newValue: change.new_value,
        oldValue: change.old_value,
        key: change.key,
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
    }));
    this.autoModerationRules = data.auto_moderation_rules.map(
      (autoModerationRule) =>
        new AutoModerationRule(autoModerationRule, this.client)
    );
    this.guildScheduledEvents = data.guild_scheduled_events.map(
      (guildScheduledEvent) =>
        new GuildScheduledEvent(guildScheduledEvent, this.client)
    );
    this.integrations = data.integrations.map(
      (integration) => new Integration(integration, this.client)
    );
    this.threads = data.threads.map(
      (thread) => new Channel(thread, this.client)
    );
    this.users = data.users.map((user) => new User(user, this.client));
    this.webhooks = data.webhooks.map(
      (webhook) => new Webhook(webhook, this.client)
    );
  }

  override toRaw(): RawAuditLog {
    return this.raw;
  }

  override toJSON(): JSONAuditLog {
    return {
      applicationCommands: this.applicationCommands.map((applicationCommand) =>
        applicationCommand.toJSON()
      ),
      auditLogEntries: this.auditLogEntries,
      autoModerationRules: this.autoModerationRules.map((autoModerationRule) =>
        autoModerationRule.toJSON()
      ),
      guildScheduledEvents: this.guildScheduledEvents.map(
        (guildScheduledEvent) => guildScheduledEvent.toJSON()
      ),
      integrations: this.integrations.map((integration) =>
        integration.toJSON()
      ),
      threads: this.threads.map((thread) => thread.toJSON()),
      users: this.users.map((user) => user.toJSON()),
      webhooks: this.webhooks.map((webhook) => webhook.toJSON()),
    };
  }
}
