import type { RawAuditLogEntry, RawEmbed } from "../types";

export function embedToJSON(embeds: Array<RawEmbed>) {
  return embeds.map((embed) => ({
    title: embed.title,
    type: embed.type,
    description: embed.description,
    url: embed.url,
    timestamp: embed.timestamp,
    color: embed.color,
    footer: embed.footer
      ? {
          text: embed.footer.text,
          iconUrl: embed.footer.icon_url,
          proxyIconUrl: embed.footer.proxy_icon_url,
        }
      : undefined,
    image: embed.image
      ? {
          url: embed.image.url,
          proxyUrl: embed.image.proxy_url,
          height: embed.image.height,
          width: embed.image.width,
        }
      : undefined,
    thumbnail: embed.thumbnail
      ? {
          url: embed.thumbnail.url,
          proxyUrl: embed.thumbnail.proxy_url,
          height: embed.thumbnail.height,
          width: embed.thumbnail.width,
        }
      : undefined,
    video: {
      url: embed.video?.url,
      proxyUrl: embed.video?.proxy_url,
      height: embed.video?.height,
      width: embed.video?.width,
    },
    provider: {
      name: embed.provider?.name,
      url: embed.provider?.url,
    },
    author: embed.author
      ? {
          name: embed.author.name,
          url: embed.author.url,
          iconUrl: embed.author.icon_url,
          proxyIconUrl: embed.author.proxy_icon_url,
        }
      : undefined,
    fields: embed.fields?.map((field) => ({
      name: field.name,
      value: field.value,
      inline: field.inline,
    })),
  }));
}

export function auditLogEntryToJSON(auditLogEntry: RawAuditLogEntry) {
  return {
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
          }
        : undefined,
    reason: auditLogEntry.reason,
  };
}
