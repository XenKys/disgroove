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
import { Collection } from "../utils";

/** https://discord.com/developers/docs/resources/audit-log */
export class AuditLog extends Base {
  protected override raw: RawAuditLog;

  applicationCommands: Collection<string, ApplicationCommand>;
  auditLogEntries: Collection<string, JSONAuditLogEntry>;
  autoModerationRules: Collection<string, AutoModerationRule>;
  guildScheduledEvents: Collection<string, GuildScheduledEvent>;
  integrations: Collection<string, Integration>;
  threads: Collection<string, Channel>;
  users: Collection<string, User>;
  webhooks: Collection<string, Webhook>;

  constructor(data: RawAuditLog, client: Client) {
    super(client);

    this.raw = data;
    this.applicationCommands = new Collection();
    this.auditLogEntries = new Collection();
    this.autoModerationRules = new Collection();
    this.guildScheduledEvents = new Collection();
    this.integrations = new Collection();
    this.threads = new Collection();
    this.users = new Collection();
    this.webhooks = new Collection();

    for (const applicationCommand of data.application_commands)
      this.applicationCommands.set(
        applicationCommand.id,
        new ApplicationCommand(applicationCommand, this.client)
      );
    for (const auditLogEntry of data.audit_log_entries)
      this.auditLogEntries.set(auditLogEntry.id, {
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
      });
    for (const autoModerationRule of data.auto_moderation_rules)
      this.autoModerationRules.set(
        autoModerationRule.id,
        new AutoModerationRule(autoModerationRule, this.client)
      );
    for (const guildScheduledEvent of data.guild_scheduled_events)
      this.guildScheduledEvents.set(
        guildScheduledEvent.id,
        new GuildScheduledEvent(guildScheduledEvent, this.client)
      );
    for (const integration of data.integrations)
      this.integrations.set(
        integration.id,
        new Integration(integration, this.client)
      );
    for (const thread of data.threads)
      this.threads.set(thread.id, new Channel(thread, this.client));
    for (const user of data.users)
      this.users.set(user.id, new User(user, this.client));
    for (const webhook of data.webhooks)
      this.webhooks.set(webhook.id, new Webhook(webhook, this.client));
  }

  override toRaw(): RawAuditLog {
    return this.raw;
  }

  override toJSON(): JSONAuditLog {
    return {
      applicationCommands: new Collection(
        this.applicationCommands?.map((applicationCommand) => [
          applicationCommand.id,
          applicationCommand.toJSON(),
        ])
      ),
      auditLogEntries: this.auditLogEntries,
      autoModerationRules: new Collection(
        this.autoModerationRules?.map((autoModerationRule) => [
          autoModerationRule.id,
          autoModerationRule.toJSON(),
        ])
      ),
      guildScheduledEvents: new Collection(
        this.guildScheduledEvents?.map((guildScheduledEvent) => [
          guildScheduledEvent.id,
          guildScheduledEvent.toJSON(),
        ])
      ),
      integrations: new Collection(
        this.integrations?.map((integration) => [
          integration.id,
          integration.toJSON(),
        ])
      ),
      threads: new Collection(
        this.threads?.map((thread) => [thread.id, thread.toJSON()])
      ),
      users: new Collection(
        this.users?.map((user) => [user.id, user.toJSON()])
      ),
      webhooks: new Collection(
        this.webhooks?.map((webhook) => [webhook.id, webhook.toJSON()])
      ),
    };
  }
}
