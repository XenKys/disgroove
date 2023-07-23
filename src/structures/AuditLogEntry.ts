import type { Client } from "../class";
import type {
  JSONAuditLogChange,
  JSONAuditLogEntry,
  JSONOptionalAuditLogEntryInfo,
  RawAuditLogEntry,
} from "../types";
import type { AuditLogEvents } from "../utils";
import { Base } from ".";

export class AuditLogEntry extends Base {
  public targetId: string | null;
  public changes?: Array<JSONAuditLogChange>;
  public userId: string | null;
  public actionType: AuditLogEvents;
  public options?: JSONOptionalAuditLogEntryInfo;
  public reason?: string;

  constructor(data: RawAuditLogEntry, client: Client) {
    super(data.id, client);

    this.targetId = data.target_id;
    this.userId = data.user_id;
    this.actionType = data.action_type;

    this.update(data);
  }

  protected override update(data: RawAuditLogEntry): void {
    if (data.changes !== undefined) this.changes = data.changes;
    if (data.options !== undefined)
      this.options = {
        applicationId: data.options.application_id,
        autoModerationRuleName: data.options.auto_moderation_rule_name,
        autoModerationRuleTriggerType:
          data.options.auto_moderation_rule_trigger_type,
        channelId: data.options.channel_id,
        count: data.options.count,
        deleteMemberDays: data.options.delete_member_days,
        id: data.options.id,
        membersRemoved: data.options.members_removed,
        messageId: data.options.message_id,
        roleName: data.options.role_name,
        type: data.options.type,
      };
    if (data.reason !== undefined) this.reason = data.reason;
  }

  public override toJSON(): JSONAuditLogEntry {
    return {
      targetId: this.targetId,
      changes: this.changes,
      userId: this.userId,
      id: this.id,
      actionType: this.actionType,
      options: this.options,
      reason: this.reason,
    };
  }
}
