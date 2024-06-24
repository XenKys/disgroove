import type { Application, RawApplication } from "../types/application";
import type {
  ApplicationCommand,
  GuildApplicationCommandPermissions,
  RawApplicationCommand,
  RawGuildApplicationCommandPermissions,
} from "../types/application-command";
import type {
  AutoModerationRule,
  RawAutoModerationRule,
} from "../types/auto-moderation";
import type {
  Attachment,
  Channel,
  Embed,
  Message,
  MessageInteractionMetadata,
  RawAttachment,
  RawChannel,
  RawEmbed,
  RawMessage,
  RawMessageInteractionMetadata,
  RawThreadMember,
  ThreadMember,
} from "../types/channel";
import type { Emoji, RawEmoji } from "../types/emoji";
import type {
  Guild,
  GuildMember,
  Integration,
  RawGuild,
  RawGuildMember,
  RawIntegration,
} from "../types/guild";
import type {
  GuildScheduledEvent,
  RawGuildScheduledEvent,
} from "../types/guild-scheduled-event";
import type { GuildTemplate, RawGuildTemplate } from "../types/guild-template";
import type { Invite, RawInvite } from "../types/invite";
import type { RawUser, User } from "../types/user";
import type { Poll, RawPoll } from "../types/poll";
import type { RawStageInstance, StageInstance } from "../types/stage-instance";
import type { RawSticker, Sticker } from "../types/sticker";
import type { RawVoiceState, VoiceState } from "../types/voice";
import type { RawWebhook, Webhook } from "../types/webhook";
import type { RawTeam, RawTeamMember, Team, TeamMember } from "../types/team";
import type { RawRole, Role } from "../types/role";
import type { ActionRow, RawActionRow } from "../types/message-components";
import { ComponentTypes } from "../constants";
import type {
  Interaction,
  RawInteraction,
  RawResolvedData,
  ResolvedData,
} from "../types/interaction";
import type { snowflake } from "../types/common";
import type { Entitlement, RawEntitlement } from "../types/entitlements";
import type {
  AuditLog,
  AuditLogEntry,
  RawAuditLog,
  RawAuditLogEntry,
} from "../types/audit-log";
import type { RawSku, Sku } from "../types/sku";
import type {
  PresenceUpdateEventFields,
  RawPresenceUpdateEventFields,
} from "../types/gateway-events";

export class Util {
  auditLogFromRaw(auditLog: RawAuditLog): AuditLog {
    return {
      applicationCommands: auditLog.application_commands.map(
        (applicationCommand) =>
          this.applicationCommandFromRaw(applicationCommand)
      ),
      auditLogEntries: auditLog.audit_log_entries.map((auditLogEntry) =>
        this.auditLogEntryFromRaw(auditLogEntry)
      ),
      autoModerationRules: auditLog.auto_moderation_rules.map(
        (autoModerationRule) =>
          this.autoModerationRuleFromRaw(autoModerationRule)
      ),
      guildScheduledEvents: auditLog.guild_scheduled_events.map(
        (guildScheduledEvent) =>
          this.guildScheduledEventFromRaw(guildScheduledEvent)
      ),
      integrations: auditLog.integrations.map((integration) =>
        this.integrationFromRaw(integration)
      ),
      threads: auditLog.threads.map((thread) => this.channelFromRaw(thread)),
      users: auditLog.users.map((user) => this.userFromRaw(user)),
      webhooks: auditLog.webhooks.map((webhook) =>
        this.webhookFromRaw(webhook)
      ),
    };
  }

  auditLogToRaw(auditLog: AuditLog): RawAuditLog {
    return {
      application_commands: auditLog.applicationCommands.map(
        (applicationCommand) => this.applicationCommandToRaw(applicationCommand)
      ),
      audit_log_entries: auditLog.auditLogEntries.map((auditLogEntry) =>
        this.auditLogEntryToRaw(auditLogEntry)
      ),
      auto_moderation_rules: auditLog.autoModerationRules.map(
        (autoModerationRule) => this.autoModerationRuleToRaw(autoModerationRule)
      ),
      guild_scheduled_events: auditLog.guildScheduledEvents.map(
        (guildScheduledEvent) =>
          this.guildScheduledEventToRaw(guildScheduledEvent)
      ),
      integrations: auditLog.integrations.map((integration) =>
        this.integrationToRaw(integration)
      ),
      threads: auditLog.threads.map((thread) => this.channelToRaw(thread)),
      users: auditLog.users.map((user) => this.userToRaw(user)),
      webhooks: auditLog.webhooks.map((webhook) => this.webhookToRaw(webhook)),
    };
  }

  auditLogEntryFromRaw(auditLogEntry: RawAuditLogEntry): AuditLogEntry {
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

  auditLogEntryToRaw(auditLogEntry: AuditLogEntry): RawAuditLogEntry {
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

  autoModerationRuleFromRaw(
    autoModerationRule: RawAutoModerationRule
  ): AutoModerationRule {
    return {
      id: autoModerationRule.id,
      guildId: autoModerationRule.guild_id,
      name: autoModerationRule.name,
      creatorId: autoModerationRule.creator_id,
      eventType: autoModerationRule.event_type,
      triggerType: autoModerationRule.trigger_type,
      triggerMetadata: {
        keywordFilter: autoModerationRule.trigger_metadata.keyword_filter,
        regexPatterns: autoModerationRule.trigger_metadata.regex_patterns,
        presets: autoModerationRule.trigger_metadata.presets,
        allowList: autoModerationRule.trigger_metadata.allow_list,
        mentionTotalLimit:
          autoModerationRule.trigger_metadata.mention_total_limit,
        mentionRaidProtection:
          autoModerationRule.trigger_metadata.mention_raid_protection,
      },
      actions: autoModerationRule.actions.map((action) => ({
        type: action.type,
        metadata: {
          channelId: action.metadata.channel_id,
          durationSeconds: action.metadata.duration_seconds,
          customMessage: action.metadata.custom_message,
        },
      })),
      enabled: autoModerationRule.enabled,
      exemptRoles: autoModerationRule.exempt_roles,
      exemptChannels: autoModerationRule.exempt_channels,
    };
  }

  autoModerationRuleToRaw(
    autoModerationRule: AutoModerationRule
  ): RawAutoModerationRule {
    return {
      id: autoModerationRule.id,
      guild_id: autoModerationRule.guildId,
      name: autoModerationRule.name,
      creator_id: autoModerationRule.creatorId,
      event_type: autoModerationRule.eventType,
      trigger_type: autoModerationRule.triggerType,
      trigger_metadata: {
        keyword_filter: autoModerationRule.triggerMetadata.keywordFilter,
        regex_patterns: autoModerationRule.triggerMetadata.regexPatterns,
        presets: autoModerationRule.triggerMetadata.presets,
        allow_list: autoModerationRule.triggerMetadata.allowList,
        mention_total_limit:
          autoModerationRule.triggerMetadata.mentionTotalLimit,
        mention_raid_protection:
          autoModerationRule.triggerMetadata.mentionRaidProtection,
      },
      actions: autoModerationRule.actions.map((action) => ({
        type: action.type,
        metadata: {
          channel_id: action.metadata.channelId,
          duration_seconds: action.metadata.durationSeconds,
          custom_message: action.metadata.customMessage,
        },
      })),
      enabled: autoModerationRule.enabled,
      exempt_roles: autoModerationRule.exemptRoles,
      exempt_channels: autoModerationRule.exemptChannels,
    };
  }

  attachmentFromRaw(attachment: RawAttachment): Attachment {
    return {
      id: attachment.id,
      filename: attachment.filename,
      description: attachment.description,
      contentType: attachment.content_type,
      size: attachment.size,
      url: attachment.url,
      proxyUrl: attachment.proxy_url,
      height: attachment.height,
      width: attachment.width,
      ephemeral: attachment.ephemeral,
      durationSecs: attachment.duration_secs,
      waveform: attachment.waveform,
      flags: attachment.flags,
    };
  }

  attachmentToRaw(attachment: Attachment): RawAttachment {
    return {
      id: attachment.id,
      filename: attachment.filename,
      description: attachment.description,
      content_type: attachment.contentType,
      size: attachment.size,
      url: attachment.url,
      proxy_url: attachment.proxyUrl,
      height: attachment.height,
      width: attachment.width,
      ephemeral: attachment.ephemeral,
      duration_secs: attachment.durationSecs,
      waveform: attachment.waveform,
      flags: attachment.flags,
    };
  }

  applicationFromRaw(application: RawApplication): Application {
    return {
      id: application.id,
      name: application.name,
      icon: application.icon,
      description: application.description,
      rpcOrigins: application.rpc_origins,
      botPublic: application.bot_public,
      botRequireCodeGrant: application.bot_require_code_grant,
      termsOfServiceUrl: application.terms_of_service_url,
      privacyPolicyUrl: application.privacy_policy_url,
      owner:
        application.owner !== undefined
          ? this.userFromRaw(application.owner)
          : undefined,
      verifyKey: application.verify_key,
      team:
        application.team !== null ? this.teamFromRaw(application.team) : null,
      guildId: application.guild_id,
      guild:
        application.guild !== undefined
          ? this.guildFromRaw(application.guild)
          : undefined,
      primarySkuId: application.primary_sku_id,
      slug: application.slug,
      coverImage: application.cover_image,
      flags: application.flags,
      approximateGuildCount: application.approximate_guild_count,
      redirectURIs: application.redirect_uris,
      interactionsEndpointUrl: application.interactions_endpoint_url,
      roleConnectionsVerificationUrl:
        application.role_connections_verification_url,
      tags: application.tags,
      installParams: application.install_params,
      integrationTypesConfig:
        application.integration_types_config !== undefined
          ? {
              "0": {
                oauth2InstallParams:
                  application.integration_types_config?.[0]
                    .oauth2_install_params,
              },
              "1": {
                oauth2InstallParams:
                  application.integration_types_config?.[1]
                    .oauth2_install_params,
              },
            }
          : undefined,
      customInstallUrl: application.custom_install_url,
    };
  }

  applicationToRaw(application: Application): RawApplication {
    return {
      id: application.id,
      name: application.name,
      icon: application.icon,
      description: application.description,
      rpc_origins: application.rpcOrigins,
      bot_public: application.botPublic,
      bot_require_code_grant: application.botRequireCodeGrant,
      terms_of_service_url: application.termsOfServiceUrl,
      privacy_policy_url: application.privacyPolicyUrl,
      owner:
        application.owner !== undefined
          ? this.userToRaw(application.owner)
          : undefined,
      verify_key: application.verifyKey,
      team: application.team !== null ? this.teamToRaw(application.team) : null,
      guild_id: application.guildId,
      guild:
        application.guild !== undefined
          ? this.guildToRaw(application.guild)
          : undefined,
      primary_sku_id: application.primarySkuId,
      slug: application.slug,
      cover_image: application.coverImage,
      flags: application.flags,
      approximate_guild_count: application.approximateGuildCount,
      redirect_uris: application.redirectURIs,
      interactions_endpoint_url: application.interactionsEndpointUrl,
      role_connections_verification_url:
        application.roleConnectionsVerificationUrl,
      tags: application.tags,
      install_params: application.installParams,
      integration_types_config:
        application.integrationTypesConfig !== undefined
          ? {
              "0": {
                oauth2_install_params:
                  application.integrationTypesConfig?.[0].oauth2InstallParams,
              },
              "1": {
                oauth2_install_params:
                  application.integrationTypesConfig?.[1].oauth2InstallParams,
              },
            }
          : undefined,
      custom_install_url: application.customInstallUrl,
    };
  }

  applicationCommandFromRaw(
    applicationCommand: RawApplicationCommand
  ): ApplicationCommand {
    return {
      id: applicationCommand.id,
      type: applicationCommand.type,
      applicationId: applicationCommand.application_id,
      guildId: applicationCommand.guild_id,
      name: applicationCommand.name,
      nameLocalizations: applicationCommand.name_localizations,
      description: applicationCommand.description,
      descriptionLocalizations: applicationCommand.description_localizations,
      options: applicationCommand.options?.map((option) => ({
        type: option.type,
        name: option.name,
        name_localizations: option.name_localizations,
        description: option.description,
        description_localizations: option.description_localizations,
        required: option.required,
        choices: option.choices?.map((choice) => ({
          name: choice.name,
          name_localizations: choice.name_localizations,
          value: choice.value,
        })),
        options: option.options?.map((o) => ({
          type: o.type,
          name: o.name,
          name_localizations: o.name_localizations,
          description: o.description,
          description_localizations: o.description_localizations,
          required: o.required,
          choices: o.choices?.map((choice) => ({
            name: choice.name,
            name_localizations: choice.name_localizations,
            value: choice.value,
          })),
          channel_types: o.channel_types,
          min_value: o.min_value,
          max_value: o.max_value,
          min_length: o.min_length,
          max_length: o.max_length,
          autocomplete: o.autocomplete,
        })),
        channel_types: option.channel_types,
        min_value: option.min_value,
        max_value: option.max_value,
        min_length: option.min_length,
        max_length: option.max_length,
        autocomplete: option.autocomplete,
      })),
      defaultMemberPermissions: applicationCommand.default_member_permissions,
      dmPermission: applicationCommand.dm_permission,
      defaultPermission: applicationCommand.default_permission,
      nsfw: applicationCommand.nsfw,
      version: applicationCommand.version,
    };
  }

  applicationCommandToRaw(
    applicationCommand: ApplicationCommand
  ): RawApplicationCommand {
    return {
      id: applicationCommand.id,
      type: applicationCommand.type,
      application_id: applicationCommand.applicationId,
      guild_id: applicationCommand.guildId,
      name: applicationCommand.name,
      name_localizations: applicationCommand.nameLocalizations,
      description: applicationCommand.description,
      description_localizations: applicationCommand.descriptionLocalizations,
      options: applicationCommand.options?.map((option) => ({
        type: option.type,
        name: option.name,
        name_localizations: option.nameLocalizations,
        description: option.description,
        description_localizations: option.descriptionLocalizations,
        required: option.required,
        choices: option.choices?.map((choice) => ({
          name: choice.name,
          name_localizations: choice.nameLocalizations,
          value: choice.value,
        })),
        options: option.options?.map((o) => ({
          type: o.type,
          name: o.name,
          name_localizations: o.nameLocalizations,
          description: o.description,
          description_localizations: o.descriptionLocalizations,
          required: o.required,
          choices: o.choices?.map((choice) => ({
            name: choice.name,
            name_localizations: choice.nameLocalizations,
            value: choice.value,
          })),
          channel_types: o.channelTypes,
          min_value: o.minValue,
          max_value: o.maxValue,
          min_length: o.minLength,
          max_length: o.maxLength,
          autocomplete: o.autocomplete,
        })),
        channel_types: option.channelTypes,
        min_value: option.minValue,
        max_value: option.maxValue,
        min_length: option.minLength,
        max_length: option.maxLength,
        autocomplete: option.autocomplete,
      })),
      default_member_permissions: applicationCommand.defaultMemberPermissions,
      dm_permission: applicationCommand.dmPermission,
      default_permission: applicationCommand.defaultPermission,
      nsfw: applicationCommand.nsfw,
      version: applicationCommand.version,
    };
  }

  channelFromRaw(channel: RawChannel): Channel {
    return {
      id: channel.id,
      type: channel.type,
      guildId: channel.guild_id,
      position: channel.position,
      permissionOverwrites: channel.permission_overwrites?.map((overwrite) => ({
        id: overwrite.id,
        type: overwrite.type,
        allow: overwrite.allow,
        deny: overwrite.deny,
      })),
      name: channel.name,
      topic: channel.topic,
      nsfw: channel.nsfw,
      lastMessageId: channel.last_message_id,
      bitrate: channel.bitrate,
      userLimit: channel.user_limit,
      rateLimitPerUser: channel.rate_limit_per_user,
      recipients: channel.recipients?.map((recipient) =>
        this.userFromRaw(recipient)
      ),
      icon: channel.icon,
      ownerId: channel.owner_id,
      applicationId: channel.application_id,
      managed: channel.managed,
      parentId: channel.parent_id,
      lastPinTimestamp: channel.last_pin_timestamp,
      rtcRegion: channel.rtc_region,
      videoQualityMode: channel.video_quality_mode,
      messageCount: channel.member_count,
      memberCount: channel.member_count,
      threadMetadata:
        channel.thread_metadata !== undefined
          ? {
              archived: channel.thread_metadata?.archived,
              autoArchiveDuration:
                channel.thread_metadata?.auto_archive_duration,
              archiveTimestamp: channel.thread_metadata?.archive_timestamp,
              locked: channel.thread_metadata?.locked,
              invitable: channel.thread_metadata?.invitable,
              createTimestamp: channel.thread_metadata?.create_timestamp,
            }
          : undefined,
      member:
        channel.member !== undefined
          ? {
              id: channel.member.id,
              userId: channel.member.user_id,
              joinTimestamp: channel.member.join_timestamp,
              flags: channel.member.flags,
              member:
                channel.member.member !== undefined
                  ? {
                      user:
                        channel.member.member.user !== undefined
                          ? this.userFromRaw(channel.member.member.user)
                          : undefined,
                      nick: channel.member.member.nick,
                      avatar: channel.member.member.avatar,
                      roles: channel.member.member.roles,
                      joinedAt: channel.member.member.joined_at,
                      premiumSince: channel.member.member.premium_since,
                      deaf: channel.member.member.deaf,
                      mute: channel.member.member.mute,
                      flags: channel.member.member.flags,
                      pending: channel.member.member.pending,
                      permissions: channel.member.member.permissions,
                      communicationDisabledUntil:
                        channel.member.member.communication_disabled_until,
                    }
                  : undefined,
            }
          : undefined,
      defaultAutoArchiveDuration: channel.default_auto_archive_duration,
      permissions: channel.permissions,
      flags: channel.flags,
      totalMessageSent: channel.total_message_sent,
      availableTags: channel.available_tags?.map((availableTag) => ({
        id: availableTag.id,
        name: availableTag.name,
        moderated: availableTag.moderated,
        emojiId: availableTag.emoji_id,
        emojiName: availableTag.emoji_name,
      })),
      appliedTags: channel.applied_tags,
      defaultReactionEmoji:
        channel.default_reaction_emoji !== undefined
          ? channel.default_reaction_emoji !== null
            ? {
                emojiId: channel.default_reaction_emoji.emoji_id,
                emojiName: channel.default_reaction_emoji.emoji_name,
              }
            : null
          : undefined,
      defaultThreadRateLimitPerUser: channel.default_thread_rate_limit_per_user,
      defaultSortOrder: channel.default_sort_order,
      defaultForumLayout: channel.default_forum_layout,
    };
  }

  channelToRaw(channel: Channel): RawChannel {
    return {
      id: channel.id,
      type: channel.type,
      guild_id: channel.guildId,
      position: channel.position,
      permission_overwrites: channel.permissionOverwrites?.map((overwrite) => ({
        id: overwrite.id,
        type: overwrite.type,
        allow: overwrite.allow,
        deny: overwrite.deny,
      })),
      name: channel.name,
      topic: channel.topic,
      nsfw: channel.nsfw,
      last_message_id: channel.lastMessageId,
      bitrate: channel.bitrate,
      user_limit: channel.userLimit,
      rate_limit_per_user: channel.rateLimitPerUser,
      recipients: channel.recipients?.map((recipient) =>
        this.userToRaw(recipient)
      ),
      icon: channel.icon,
      owner_id: channel.ownerId,
      application_id: channel.applicationId,
      managed: channel.managed,
      parent_id: channel.parentId,
      last_pin_timestamp: channel.lastPinTimestamp,
      rtc_region: channel.rtcRegion,
      video_quality_mode: channel.videoQualityMode,
      message_count: channel.messageCount,
      member_count: channel.memberCount,
      thread_metadata:
        channel.threadMetadata !== undefined
          ? {
              archived: channel.threadMetadata?.archived,
              auto_archive_duration:
                channel.threadMetadata?.autoArchiveDuration,
              archive_timestamp: channel.threadMetadata?.archiveTimestamp,
              locked: channel.threadMetadata?.locked,
              invitable: channel.threadMetadata?.invitable,
              create_timestamp: channel.threadMetadata?.createTimestamp,
            }
          : undefined,
      member:
        channel.member !== undefined
          ? {
              id: channel.member.id,
              user_id: channel.member.userId,
              join_timestamp: channel.member.joinTimestamp,
              flags: channel.member.flags,
              member:
                channel.member.member !== undefined
                  ? {
                      user:
                        channel.member.member.user !== undefined
                          ? this.userToRaw(channel.member.member.user)
                          : undefined,
                      nick: channel.member.member.nick,
                      avatar: channel.member.member.avatar,
                      roles: channel.member.member.roles,
                      joined_at: channel.member.member.joinedAt,
                      premium_since: channel.member.member.premiumSince,
                      deaf: channel.member.member.deaf,
                      mute: channel.member.member.mute,
                      flags: channel.member.member.flags,
                      pending: channel.member.member.pending,
                      permissions: channel.member.member.permissions,
                      communication_disabled_until:
                        channel.member.member.communicationDisabledUntil,
                    }
                  : undefined,
            }
          : undefined,
      default_auto_archive_duration: channel.defaultAutoArchiveDuration,
      permissions: channel.permissions,
      flags: channel.flags,
      total_message_sent: channel.totalMessageSent,
      available_tags: channel.availableTags?.map((availableTag) => ({
        id: availableTag.id,
        name: availableTag.name,
        moderated: availableTag.moderated,
        emoji_id: availableTag.emojiId,
        emoji_name: availableTag.emojiName,
      })),
      applied_tags: channel.appliedTags,
      default_reaction_emoji:
        channel.defaultReactionEmoji !== undefined
          ? channel.defaultReactionEmoji !== null
            ? {
                emoji_id: channel.defaultReactionEmoji.emojiId,
                emoji_name: channel.defaultReactionEmoji.emojiName,
              }
            : null
          : undefined,
      default_thread_rate_limit_per_user: channel.defaultThreadRateLimitPerUser,
      default_sort_order: channel.defaultSortOrder,
      default_forum_layout: channel.defaultForumLayout,
    };
  }

  embedFromRaw(embed: RawEmbed): Embed {
    return {
      title: embed.title,
      type: embed.type,
      description: embed.description,
      url: embed.url,
      timestamp: embed.timestamp,
      color: embed.color,
      footer:
        embed.footer !== undefined
          ? {
              text: embed.footer.text,
              iconUrl: embed.footer.icon_url,
              proxyIconUrl: embed.footer.proxy_icon_url,
            }
          : undefined,
      image:
        embed.image !== undefined
          ? {
              url: embed.image.url,
              proxyUrl: embed.image.proxy_url,
              height: embed.image.height,
              width: embed.image.width,
            }
          : undefined,
      thumbnail:
        embed.thumbnail !== undefined
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
      author:
        embed.author !== undefined
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
    };
  }

  embedToRaw(embed: Embed): RawEmbed {
    return {
      title: embed.title,
      type: embed.type,
      description: embed.description,
      url: embed.url,
      timestamp: embed.timestamp,
      color: embed.color,
      footer:
        embed.footer !== undefined
          ? {
              text: embed.footer.text,
              icon_url: embed.footer.iconUrl,
              proxy_icon_url: embed.footer.proxyIconUrl,
            }
          : undefined,
      image:
        embed.image !== undefined
          ? {
              url: embed.image.url,
              proxy_url: embed.image.proxyUrl,
              height: embed.image.height,
              width: embed.image.width,
            }
          : undefined,
      thumbnail:
        embed.thumbnail !== undefined
          ? {
              url: embed.thumbnail.url,
              proxy_url: embed.thumbnail.proxyUrl,
              height: embed.thumbnail.height,
              width: embed.thumbnail.width,
            }
          : undefined,
      video: {
        url: embed.video?.url,
        proxy_url: embed.video?.proxyUrl,
        height: embed.video?.height,
        width: embed.video?.width,
      },
      provider: {
        name: embed.provider?.name,
        url: embed.provider?.url,
      },
      author:
        embed.author !== undefined
          ? {
              name: embed.author.name,
              url: embed.author.url,
              icon_url: embed.author.iconUrl,
              proxy_icon_url: embed.author.proxyIconUrl,
            }
          : undefined,
      fields: embed.fields?.map((field) => ({
        name: field.name,
        value: field.value,
        inline: field.inline,
      })),
    };
  }

  emojiFromRaw(emoji: RawEmoji): Emoji {
    return {
      id: emoji.id,
      name: emoji.name,
      roles: emoji.roles,
      user: emoji.user !== undefined ? this.userFromRaw(emoji.user) : undefined,
      requireColons: emoji.require_colons,
      managed: emoji.managed,
      animated: emoji.animated,
      available: emoji.available,
    };
  }

  emojiToRaw(emoji: Emoji): RawEmoji {
    return {
      id: emoji.id,
      name: emoji.name,
      roles: emoji.roles,
      user: emoji.user !== undefined ? this.userToRaw(emoji.user) : undefined,
      require_colons: emoji.requireColons,
      managed: emoji.managed,
      animated: emoji.animated,
      available: emoji.available,
    };
  }

  entitlementFromRaw(entitlement: RawEntitlement): Entitlement {
    return {
      id: entitlement.id,
      skuId: entitlement.sku_id,
      applicationId: entitlement.application_id,
      userId: entitlement.user_id,
      promotionId: entitlement.promotion_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      giftCodeFlags: entitlement.gift_code_flags,
      consumed: entitlement.consumed,
      startsAt: entitlement.starts_at,
      endsAt: entitlement.ends_at,
      guildId: entitlement.guild_id,
      subscriptionId: entitlement.subscription_id,
    };
  }

  entitlementToRaw(entitlement: Entitlement): RawEntitlement {
    return {
      id: entitlement.id,
      sku_id: entitlement.skuId,
      application_id: entitlement.applicationId,
      user_id: entitlement.userId,
      promotion_id: entitlement.promotionId,
      type: entitlement.type,
      deleted: entitlement.deleted,
      gift_code_flags: entitlement.giftCodeFlags,
      consumed: entitlement.consumed,
      starts_at: entitlement.startsAt,
      ends_at: entitlement.endsAt,
      guild_id: entitlement.guildId,
      subscription_id: entitlement.subscriptionId,
    };
  }

  guildApplicationCommandPermissionsFromRaw(
    guildApplicationCommandPermissions: RawGuildApplicationCommandPermissions
  ): GuildApplicationCommandPermissions {
    return {
      id: guildApplicationCommandPermissions.id,
      applicationId: guildApplicationCommandPermissions.application_id,
      guildId: guildApplicationCommandPermissions.guild_id,
      permissions: guildApplicationCommandPermissions.permissions.map(
        (permission) => ({
          id: permission.id,
          type: permission.type,
          permission: permission.permission,
        })
      ),
    };
  }

  guildApplicationCommandPermissionsToRaw(
    guildApplicationCommandPermissions: GuildApplicationCommandPermissions
  ): RawGuildApplicationCommandPermissions {
    return {
      id: guildApplicationCommandPermissions.id,
      application_id: guildApplicationCommandPermissions.applicationId,
      guild_id: guildApplicationCommandPermissions.guildId,
      permissions: guildApplicationCommandPermissions.permissions.map(
        (permission) => ({
          id: permission.id,
          type: permission.type,
          permission: permission.permission,
        })
      ),
    };
  }

  guildFromRaw(guild: RawGuild): Guild {
    return {
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      iconHash: guild.icon,
      splash: guild.splash,
      discoverySplash: guild.discovery_splash,
      owner: guild.owner,
      ownerId: guild.owner_id,
      permissions: guild.permissions,
      region: guild.region,
      afkChannelId: guild.afk_channel_id,
      afkTimeout: guild.afk_timeout,
      widgetEnabled: guild.widget_enabled,
      widgetChannelId: guild.widget_channel_id,
      verificationLevel: guild.verification_level,
      defaultMessageNotifications: guild.default_message_notifications,
      explicitContentFilter: guild.explicit_content_filter,
      roles: guild.roles.map((role) => this.roleFromRaw(role)),
      emojis: guild.emojis.map((emoji) => this.emojiFromRaw(emoji)),
      features: guild.features,
      mfaLevel: guild.mfa_level,
      applicationId: guild.application_id,
      systemChannelId: guild.system_channel_id,
      systemChannelFlags: guild.system_channel_flags,
      rulesChannelId: guild.rules_channel_id,
      maxPresences: guild.max_presences,
      maxMembers: guild.max_members,
      vanityUrlCode: guild.vanity_url_code,
      description: guild.description,
      banner: guild.banner,
      premiumTier: guild.premium_tier,
      premiumSubscriptionCount: guild.premium_subscription_count,
      preferredLocale: guild.preferred_locale,
      publicUpdatesChannelId: guild.public_updates_channel_id,
      maxVideoChannelUsers: guild.max_video_channel_users,
      maxStageVideoChannelUsers: guild.max_stage_video_channel_users,
      approximateMemberCount: guild.approximate_member_count,
      approximatePresenceCount: guild.approximate_presence_count,
      welcomeScreen:
        guild.welcome_screen !== undefined
          ? {
              description: guild.welcome_screen.description,
              welcomeChannels: guild.welcome_screen.welcome_channels.map(
                (welcomeScreenChannel) => ({
                  channelId: welcomeScreenChannel.channel_id,
                  description: welcomeScreenChannel.description,
                  emojiId: welcomeScreenChannel.emoji_id,
                  emojiName: welcomeScreenChannel.emoji_name,
                })
              ),
            }
          : undefined,
      nsfwLevel: guild.nsfw_level,
      stickers: guild.stickers?.map((sticker) => this.stickerFromRaw(sticker)),
      premiumProgressBarEnabled: guild.premium_progress_bar_enabled,
      safetyAlertsChannelId: guild.safety_alerts_channel_id,
    };
  }

  guildToRaw(guild: Guild): RawGuild {
    return {
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      icon_hash: guild.icon,
      splash: guild.splash,
      discovery_splash: guild.discoverySplash,
      owner: guild.owner,
      owner_id: guild.ownerId,
      permissions: guild.permissions,
      region: guild.region,
      afk_channel_id: guild.afkChannelId,
      afk_timeout: guild.afkTimeout,
      widget_enabled: guild.widgetEnabled,
      widget_channel_id: guild.widgetChannelId,
      verification_level: guild.verificationLevel,
      default_message_notifications: guild.defaultMessageNotifications,
      explicit_content_filter: guild.explicitContentFilter,
      roles: guild.roles.map((role) => this.roleToRaw(role)),
      emojis: guild.emojis.map((emoji) => this.emojiToRaw(emoji)),
      features: guild.features,
      mfa_level: guild.mfaLevel,
      application_id: guild.applicationId,
      system_channel_id: guild.systemChannelId,
      system_channel_flags: guild.systemChannelFlags,
      rules_channel_id: guild.rulesChannelId,
      max_presences: guild.maxPresences,
      max_members: guild.maxMembers,
      vanity_url_code: guild.vanityUrlCode,
      description: guild.description,
      banner: guild.banner,
      premium_tier: guild.premiumTier,
      premium_subscription_count: guild.premiumSubscriptionCount,
      preferred_locale: guild.preferredLocale,
      public_updates_channel_id: guild.publicUpdatesChannelId,
      max_video_channel_users: guild.maxVideoChannelUsers,
      max_stage_video_channel_users: guild.maxStageVideoChannelUsers,
      approximate_member_count: guild.approximateMemberCount,
      approximate_presence_count: guild.approximatePresenceCount,
      welcome_screen:
        guild.welcomeScreen !== undefined
          ? {
              description: guild.welcomeScreen.description,
              welcome_channels: guild.welcomeScreen.welcomeChannels.map(
                (welcomeScreenChannel) => ({
                  channel_id: welcomeScreenChannel.channelId,
                  description: welcomeScreenChannel.description,
                  emoji_id: welcomeScreenChannel.emojiId,
                  emoji_name: welcomeScreenChannel.emojiName,
                })
              ),
            }
          : undefined,
      nsfw_level: guild.nsfwLevel,
      stickers: guild.stickers?.map((sticker) => this.stickerToRaw(sticker)),
      premium_progress_bar_enabled: guild.premiumProgressBarEnabled,
      safety_alerts_channel_id: guild.safetyAlertsChannelId,
    };
  }

  guildMemberFromRaw(guildMember: RawGuildMember): GuildMember {
    return {
      user:
        guildMember.user !== undefined
          ? this.userFromRaw(guildMember.user)
          : undefined,
      nick: guildMember.nick,
      avatar: guildMember.avatar,
      roles: guildMember.roles,
      joinedAt: guildMember.joined_at,
      premiumSince: guildMember.premium_since,
      deaf: guildMember.deaf,
      mute: guildMember.mute,
      flags: guildMember.flags,
      pending: guildMember.pending,
      permissions: guildMember.permissions,
      communicationDisabledUntil: guildMember.communication_disabled_until,
    };
  }

  guildMemberToRaw(guildMember: GuildMember): RawGuildMember {
    return {
      user:
        guildMember.user !== undefined
          ? this.userToRaw(guildMember.user)
          : undefined,
      nick: guildMember.nick,
      avatar: guildMember.avatar,
      roles: guildMember.roles,
      joined_at: guildMember.joinedAt,
      premium_since: guildMember.premiumSince,
      deaf: guildMember.deaf,
      mute: guildMember.mute,
      flags: guildMember.flags,
      pending: guildMember.pending,
      permissions: guildMember.permissions,
      communication_disabled_until: guildMember.communicationDisabledUntil,
    };
  }

  guildScheduledEventFromRaw(
    guildScheduledEvent: RawGuildScheduledEvent
  ): GuildScheduledEvent {
    return {
      id: guildScheduledEvent.id,
      guildId: guildScheduledEvent.guild_id,
      channelId: guildScheduledEvent.channel_id,
      creatorId: guildScheduledEvent.creator_id,
      name: guildScheduledEvent.name,
      description: guildScheduledEvent.description,
      scheduledStartTime: guildScheduledEvent.scheduled_start_time,
      scheduledEndTime: guildScheduledEvent.scheduled_end_time,
      privacyLevel: guildScheduledEvent.privacy_level,
      status: guildScheduledEvent.status,
      entityType: guildScheduledEvent.entity_type,
      entityId: guildScheduledEvent.entity_id,
      entityMetadata: guildScheduledEvent.entity_metadata,
      creator:
        guildScheduledEvent.creator !== undefined
          ? this.userFromRaw(guildScheduledEvent.creator)
          : undefined,
      userCount: guildScheduledEvent.user_count,
      image: guildScheduledEvent.image,
    };
  }

  guildScheduledEventToRaw(
    guildScheduledEvent: GuildScheduledEvent
  ): RawGuildScheduledEvent {
    return {
      id: guildScheduledEvent.id,
      guild_id: guildScheduledEvent.guildId,
      channel_id: guildScheduledEvent.channelId,
      creator_id: guildScheduledEvent.creatorId,
      name: guildScheduledEvent.name,
      description: guildScheduledEvent.description,
      scheduled_start_time: guildScheduledEvent.scheduledStartTime,
      scheduled_end_time: guildScheduledEvent.scheduledEndTime,
      privacy_level: guildScheduledEvent.privacyLevel,
      status: guildScheduledEvent.status,
      entity_type: guildScheduledEvent.entityType,
      entity_id: guildScheduledEvent.entityId,
      entity_metadata: guildScheduledEvent.entityMetadata,
      creator:
        guildScheduledEvent.creator !== undefined
          ? this.userToRaw(guildScheduledEvent.creator)
          : undefined,
      user_count: guildScheduledEvent.userCount,
      image: guildScheduledEvent.image,
    };
  }

  guildTemplateFromRaw(guildTemplate: RawGuildTemplate): GuildTemplate {
    return {
      code: guildTemplate.code,
      name: guildTemplate.name,
      description: guildTemplate.description,
      usageCount: guildTemplate.usage_count,
      creatorId: guildTemplate.creator_id,
      creator: this.userFromRaw(guildTemplate.creator),
      createdAt: guildTemplate.created_at,
      updatedAt: guildTemplate.updated_at,
      sourceGuildId: guildTemplate.source_guild_id,
      serializedSourceGuild: this.guildFromRaw(
        guildTemplate.serialized_source_guild
      ),
      isDirty: guildTemplate.is_dirty,
    };
  }

  guildTemplateToRaw(guildTemplate: GuildTemplate): RawGuildTemplate {
    return {
      code: guildTemplate.code,
      name: guildTemplate.name,
      description: guildTemplate.description,
      usage_count: guildTemplate.usageCount,
      creator_id: guildTemplate.creatorId,
      creator: this.userToRaw(guildTemplate.creator),
      created_at: guildTemplate.createdAt,
      updated_at: guildTemplate.updatedAt,
      source_guild_id: guildTemplate.sourceGuildId,
      serialized_source_guild: this.guildToRaw(
        guildTemplate.serializedSourceGuild
      ),
      is_dirty: guildTemplate.isDirty,
    };
  }

  integrationFromRaw(integration: RawIntegration): Integration {
    return {
      id: integration.id,
      name: integration.name,
      type: integration.type,
      enabled: integration.enabled,
      syncing: integration.syncing,
      roleId: integration.role_id,
      enableEmoticons: integration.enable_emoticons,
      expireBehavior: integration.expire_behavior,
      expireGracePeriod: integration.expire_grace_period,
      user:
        integration.user !== undefined
          ? this.userFromRaw(integration.user)
          : undefined,
      account: integration.account,
      syncedAt: integration.synced_at,
      subscriberCount: integration.subscriber_count,
      revoked: integration.revoked,
      application:
        integration.application !== undefined
          ? {
              id: integration.application.id,
              name: integration.application.name,
              icon: integration.application.icon,
              description: integration.application.description,
              bot:
                integration.application.bot !== undefined
                  ? this.userFromRaw(integration.application.bot)
                  : undefined,
            }
          : undefined,
      scopes: integration.scopes,
    };
  }

  integrationToRaw(integration: Integration): RawIntegration {
    return {
      id: integration.id,
      name: integration.name,
      type: integration.type,
      enabled: integration.enabled,
      syncing: integration.syncing,
      role_id: integration.roleId,
      enable_emoticons: integration.enableEmoticons,
      expire_behavior: integration.expireBehavior,
      expire_grace_period: integration.expireGracePeriod,
      user:
        integration.user !== undefined
          ? this.userToRaw(integration.user)
          : undefined,
      account: integration.account,
      synced_at: integration.syncedAt,
      subscriber_count: integration.subscriberCount,
      revoked: integration.revoked,
      application:
        integration.application !== undefined
          ? {
              id: integration.application.id,
              name: integration.application.name,
              icon: integration.application.icon,
              description: integration.application.description,
              bot:
                integration.application.bot !== undefined
                  ? this.userToRaw(integration.application.bot)
                  : undefined,
            }
          : undefined,
      scopes: integration.scopes,
    };
  }

  interactionFromRaw(interaction: RawInteraction): Interaction {
    return {
      id: interaction.id,
      applicationId: interaction.application_id,
      type: interaction.type,
      data:
        interaction.data !== undefined
          ? {
              id: interaction.data.id,
              name: interaction.data.name,
              type: interaction.data.type,
              resolved:
                interaction.data.resolved !== undefined
                  ? this.resolvedDataFromRaw(interaction.data.resolved)
                  : undefined,
              options: interaction.data.options,
              guildId: interaction.data.guild_id,
              targetId: interaction.data.target_id,
              customId: interaction.data.custom_id,
              componentType: interaction.data.component_type,
              values: interaction.data.values,
              components: interaction.data.components?.map((component) => ({
                type: component.type,
                components: component.components?.map((c) => ({
                  type: c.type,
                  customId: c.custom_id,
                  style: c.style,
                  label: c.label,
                  minLength: c.min_length,
                  maxLength: c.max_length,
                  required: c.required,
                  value: c.value,
                  placeholder: c.placeholder,
                })),
              })),
            }
          : undefined,
      guild:
        interaction.guild !== undefined
          ? this.guildFromRaw(interaction.guild)
          : undefined,
      guildId: interaction.guild_id,
      channel:
        interaction.channel !== undefined
          ? this.channelFromRaw(interaction.channel)
          : undefined,
      channelId: interaction.channel_id,
      member:
        interaction.member !== undefined
          ? this.guildMemberFromRaw(interaction.member)
          : undefined,
      user:
        interaction.user !== undefined
          ? this.userFromRaw(interaction.user)
          : undefined,
      token: interaction.token,
      version: interaction.version,
      message:
        interaction.message !== undefined
          ? this.messageFromRaw(interaction.message)
          : undefined,
      appPermissions: interaction.app_permissions,
      locale: interaction.locale,
      guildLocale: interaction.guild_locale,
      entitlements: interaction.entitlements.map((entitlement) =>
        this.entitlementFromRaw(entitlement)
      ),
      authorizingIntegrationOwners: {
        "0": interaction.authorizing_integration_owners[0],
        "1": interaction.authorizing_integration_owners[1],
      },
      context: interaction.context,
    };
  }

  interactionToRaw(interaction: Interaction): RawInteraction {
    return {
      id: interaction.id,
      application_id: interaction.applicationId,
      type: interaction.type,
      data:
        interaction.data !== undefined
          ? {
              id: interaction.data.id,
              name: interaction.data.name,
              type: interaction.data.type,
              resolved:
                interaction.data.resolved !== undefined
                  ? this.resolvedDataToRaw(interaction.data.resolved)
                  : undefined,
              options: interaction.data.options,
              guild_id: interaction.data.guildId,
              target_id: interaction.data.targetId,
              custom_id: interaction.data.customId,
              component_type: interaction.data.componentType,
              values: interaction.data.values,
              components: interaction.data.components?.map((component) => ({
                type: component.type,
                components: component.components?.map((c) => ({
                  type: c.type,
                  custom_id: c.customId,
                  style: c.style,
                  label: c.label,
                  min_length: c.minLength,
                  max_length: c.maxLength,
                  required: c.required,
                  value: c.value,
                  placeholder: c.placeholder,
                })),
              })),
            }
          : undefined,
      guild:
        interaction.guild !== undefined
          ? this.guildToRaw(interaction.guild)
          : undefined,
      guild_id: interaction.guildId,
      channel:
        interaction.channel !== undefined
          ? this.channelToRaw(interaction.channel)
          : undefined,
      channel_id: interaction.channelId,
      member:
        interaction.member !== undefined
          ? this.guildMemberToRaw(interaction.member)
          : undefined,
      user:
        interaction.user !== undefined
          ? this.userToRaw(interaction.user)
          : undefined,
      token: interaction.token,
      version: interaction.version,
      message:
        interaction.message !== undefined
          ? this.messageToRaw(interaction.message)
          : undefined,
      app_permissions: interaction.appPermissions,
      locale: interaction.locale,
      guild_locale: interaction.guildLocale,
      entitlements: interaction.entitlements.map((entitlement) =>
        this.entitlementToRaw(entitlement)
      ),
      authorizing_integration_owners: {
        "0": interaction.authorizingIntegrationOwners[0],
        "1": interaction.authorizingIntegrationOwners[1],
      },
      context: interaction.context,
    };
  }

  interactionMetadataFromRaw(
    interactionMetadata: RawMessageInteractionMetadata
  ): MessageInteractionMetadata {
    return {
      id: interactionMetadata.id,
      type: interactionMetadata.type,
      user: this.userFromRaw(interactionMetadata.user),
      authorizingIntegrationOwners: {
        "0": interactionMetadata.authorizing_integration_owners[0],
        "1": interactionMetadata.authorizing_integration_owners[1],
      },
      originalResponseMessageId:
        interactionMetadata.original_response_message_id,
      interactedMessageId: interactionMetadata.interacted_message_id,
      triggeringInteractionMetadata:
        interactionMetadata.triggering_interaction_metadata !== undefined
          ? this.interactionMetadataFromRaw(
              interactionMetadata.triggering_interaction_metadata
            )
          : undefined,
    };
  }

  interactionMetadataToRaw(
    interactionMetadata: MessageInteractionMetadata
  ): RawMessageInteractionMetadata {
    return {
      id: interactionMetadata.id,
      type: interactionMetadata.type,
      user: this.userToRaw(interactionMetadata.user),
      authorizing_integration_owners: {
        "0": interactionMetadata.authorizingIntegrationOwners[0],
        "1": interactionMetadata.authorizingIntegrationOwners[1],
      },
      original_response_message_id:
        interactionMetadata.originalResponseMessageId,
      interacted_message_id: interactionMetadata.interactedMessageId,
      triggering_interaction_metadata:
        interactionMetadata.triggeringInteractionMetadata !== undefined
          ? this.interactionMetadataToRaw(
              interactionMetadata.triggeringInteractionMetadata
            )
          : undefined,
    };
  }

  inviteFromRaw(invite: RawInvite): Invite {
    return {
      type: invite.type,
      code: invite.code,
      guild:
        invite.guild !== undefined
          ? this.guildFromRaw(invite.guild)
          : undefined,
      channel: this.channelFromRaw(invite.channel),
      inviter:
        invite.inviter !== undefined
          ? this.userFromRaw(invite.inviter)
          : undefined,
      targetType: invite.target_type,
      targetUser:
        invite.target_user !== undefined
          ? this.userFromRaw(invite.target_user)
          : undefined,
      targetApplication:
        invite.target_application !== undefined
          ? this.applicationFromRaw(invite.target_application)
          : undefined,
      approximatePresenceCount: invite.approximate_presence_count,
      approximateMemberCount: invite.approximate_member_count,
      expiresAt: invite.expires_at,
      stageInstance:
        invite.stage_instance !== undefined
          ? {
              members: invite.stage_instance.members.map((guildMember) =>
                this.guildMemberFromRaw(guildMember)
              ),
              participantCount: invite.stage_instance.participant_count,
              speakerCount: invite.stage_instance.speaker_count,
              topic: invite.stage_instance.topic,
            }
          : undefined,
      guildScheduledEvent:
        invite.guild_scheduled_event !== undefined
          ? this.guildScheduledEventFromRaw(invite.guild_scheduled_event)
          : undefined,
    };
  }

  inviteToRaw(invite: Invite): RawInvite {
    return {
      type: invite.type,
      code: invite.code,
      guild:
        invite.guild !== undefined ? this.guildToRaw(invite.guild) : undefined,
      channel: this.channelToRaw(invite.channel),
      inviter:
        invite.inviter !== undefined
          ? this.userToRaw(invite.inviter)
          : undefined,
      target_type: invite.targetType,
      target_user:
        invite.targetUser !== undefined
          ? this.userToRaw(invite.targetUser)
          : undefined,
      target_application:
        invite.targetApplication !== undefined
          ? this.applicationToRaw(invite.targetApplication)
          : undefined,
      approximate_presence_count: invite.approximatePresenceCount,
      approximate_member_count: invite.approximateMemberCount,
      expires_at: invite.expiresAt,
      stage_instance:
        invite.stageInstance !== undefined
          ? {
              members: invite.stageInstance.members.map((guildMember) =>
                this.guildMemberToRaw(guildMember)
              ),
              participant_count: invite.stageInstance.participantCount,
              speaker_count: invite.stageInstance.speakerCount,
              topic: invite.stageInstance.topic,
            }
          : undefined,
      guild_scheduled_event:
        invite.guildScheduledEvent !== undefined
          ? this.guildScheduledEventToRaw(invite.guildScheduledEvent)
          : undefined,
    };
  }

  messageComponentsFromRaw(components: Array<RawActionRow>): Array<ActionRow> {
    return components.map((component) => ({
      type: component.type,
      components: component.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.Button: {
            return {
              type: c.type,
              style: c.style,
              label: c.label,
              emoji:
                c.emoji !== undefined
                  ? {
                      name: c.emoji.name,
                      id: c.emoji.id,
                      animated: c.emoji.animated,
                    }
                  : undefined,
              customId: c.custom_id,
              url: c.url,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.TextInput: {
            return {
              type: c.type,
              customId: c.custom_id,
              style: c.style,
              label: c.label,
              minLength: c.min_length,
              maxLength: c.max_length,
              required: c.required,
              value: c.value,
              placeholder: c.placeholder,
            };
          }
          case ComponentTypes.ChannelSelect: {
            return {
              type: c.type,
              customId: c.custom_id,
              channelTypes: c.channel_types,
              placeholder: c.placeholder,
              defaultValues: c.default_values,
              minValues: c.min_values,
              maxValues: c.max_values,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.StringSelect: {
            return {
              type: c.type,
              customId: c.custom_id,
              placeholder: c.placeholder,
              options: c.options?.map((option) => ({
                label: option.label,
                value: option.value,
                description: option.description,
                emoji:
                  option.emoji !== undefined
                    ? {
                        name: option.emoji.name,
                        id: option.emoji.id,
                        animated: option.emoji.animated,
                      }
                    : undefined,
                default: option.default,
              })),
              minValues: c.min_values,
              maxValues: c.max_values,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.MentionableSelect:
          case ComponentTypes.RoleSelect:
          case ComponentTypes.UserSelect: {
            return {
              type: c.type,
              customId: c.custom_id,
              placeholder: c.placeholder,
              defaultValues: c.default_values,
              minValues: c.min_values,
              maxValues: c.max_values,
              disabled: c.disabled,
            };
          }
        }
      }),
    }));
  }

  messageComponentsToRaw(components: Array<ActionRow>): Array<RawActionRow> {
    return components.map((component) => ({
      type: component.type,
      components: component.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.Button: {
            return {
              type: c.type,
              style: c.style,
              label: c.label,
              emoji:
                c.emoji !== undefined
                  ? {
                      name: c.emoji.name,
                      id: c.emoji.id,
                      animated: c.emoji.animated,
                    }
                  : undefined,
              custom_id: c.customId,
              url: c.url,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.TextInput: {
            return {
              type: c.type,
              custom_id: c.customId,
              style: c.style,
              label: c.label,
              min_length: c.minLength,
              max_length: c.maxLength,
              required: c.required,
              value: c.value,
              placeholder: c.placeholder,
            };
          }
          case ComponentTypes.ChannelSelect: {
            return {
              type: c.type,
              custom_id: c.customId,
              channel_types: c.channelTypes,
              placeholder: c.placeholder,
              default_values: c.defaultValues,
              min_values: c.minValues,
              max_values: c.maxValues,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.StringSelect: {
            return {
              type: c.type,
              custom_id: c.customId,
              placeholder: c.placeholder,
              options: c.options?.map((option) => ({
                label: option.label,
                value: option.value,
                description: option.description,
                emoji:
                  option.emoji !== undefined
                    ? {
                        name: option.emoji.name,
                        id: option.emoji.id,
                        animated: option.emoji.animated,
                      }
                    : undefined,
                default: option.default,
              })),
              min_values: c.minValues,
              max_values: c.maxValues,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.MentionableSelect:
          case ComponentTypes.RoleSelect:
          case ComponentTypes.UserSelect: {
            return {
              type: c.type,
              custom_id: c.customId,
              placeholder: c.placeholder,
              default_values: c.defaultValues,
              min_values: c.minValues,
              max_values: c.maxValues,
              disabled: c.disabled,
            };
          }
        }
      }),
    }));
  }

  messageFromRaw(message: RawMessage): Message {
    return {
      id: message.id,
      channelId: message.channel_id,
      author: this.userFromRaw(message.author),
      content: message.content,
      timestamp: message.timestamp,
      editedTimestamp: message.edited_timestamp,
      tts: message.tts,
      mentionEveryone: message.mention_everyone,
      mentions: message.mentions.map((user) => this.userFromRaw(user)),
      mentionRoles: message.mention_roles,
      mentionChannels: message.mention_channels?.map((channelMention) => ({
        id: channelMention.id,
        guildId: channelMention.guild_id,
        type: channelMention.type,
        name: channelMention.name,
      })),
      attachments: message.attachments.map((attachment) =>
        this.attachmentFromRaw(attachment)
      ),
      embeds: message.embeds,
      reactions: message.reactions?.map((reaction) => ({
        count: reaction.count,
        countDetails: reaction.count_details,
        me: reaction.me,
        meBurst: reaction.me_burst,
        emoji: this.emojiFromRaw(reaction.emoji),
        burstColors: reaction.burst_colors,
      })),
      nonce: message.nonce,
      pinned: message.pinned,
      webhookId: message.webhook_id,
      type: message.type,
      activity: message.activity,
      application:
        message.application !== undefined
          ? this.applicationFromRaw(message.application)
          : undefined,
      applicationId: message.application_id,
      messageReference:
        message.message_reference !== undefined
          ? {
              messageId: message.message_reference.message_id,
              channelId: message.message_reference.channel_id,
              guildId: message.message_reference.guild_id,
              failIfNotExists: message.message_reference.fail_if_not_exists,
            }
          : undefined,
      flags: message.flags,
      referencedMessage:
        message.referenced_message !== undefined
          ? message.referenced_message !== null
            ? this.messageFromRaw(message.referenced_message)
            : null
          : undefined,
      interactionMetadata:
        message.interaction_metadata !== undefined
          ? this.interactionMetadataFromRaw(message.interaction_metadata)
          : undefined,
      interaction:
        message.interaction !== undefined
          ? {
              id: message.interaction.id,
              type: message.interaction.type,
              name: message.interaction.name,
              user: this.userFromRaw(message.interaction.user),
              member:
                message.interaction.member !== undefined
                  ? this.guildMemberFromRaw(message.interaction.member)
                  : undefined,
            }
          : undefined,
      thread:
        message.thread !== undefined
          ? this.channelFromRaw(message.thread)
          : undefined,
      components:
        message.components !== undefined
          ? this.messageComponentsFromRaw(message.components)
          : undefined,
      stickerItems: message.sticker_items?.map((stickerItem) => ({
        id: stickerItem.id,
        name: stickerItem.name,
        formatType: stickerItem.format_type,
      })),
      stickers: message.stickers?.map((sticker) =>
        this.stickerFromRaw(sticker)
      ),
      position: message.position,
      roleSubscriptionData:
        message.role_subscription_data !== undefined
          ? {
              roleSubscriptionListingId:
                message.role_subscription_data.role_subscription_listing_id,
              tierName: message.role_subscription_data.tier_name,
              totalMonthsSubscribed:
                message.role_subscription_data.total_months_subscribed,
              isRenewal: message.role_subscription_data.is_renewal,
            }
          : undefined,
      resolved:
        message.resolved !== undefined
          ? this.resolvedDataFromRaw(message.resolved)
          : undefined,
      poll:
        message.poll !== undefined ? this.pollFromRaw(message.poll) : undefined,
      call: message.call,
    };
  }

  messageToRaw(message: Message): RawMessage {
    return {
      id: message.id,
      channel_id: message.channelId,
      author: this.userToRaw(message.author),
      content: message.content,
      timestamp: message.timestamp,
      edited_timestamp: message.editedTimestamp,
      tts: message.tts,
      mention_everyone: message.mentionEveryone,
      mentions: message.mentions.map((user) => this.userToRaw(user)),
      mention_roles: message.mentionRoles,
      mention_channels: message.mentionChannels?.map((channelMention) => ({
        id: channelMention.id,
        guild_id: channelMention.guildId,
        type: channelMention.type,
        name: channelMention.name,
      })),
      attachments: message.attachments.map((attachment) =>
        this.attachmentToRaw(attachment)
      ),
      embeds: message.embeds,
      reactions: message.reactions?.map((reaction) => ({
        count: reaction.count,
        count_details: reaction.countDetails,
        me: reaction.me,
        me_burst: reaction.meBurst,
        emoji: this.emojiToRaw(reaction.emoji),
        burst_colors: reaction.burstColors,
      })),
      nonce: message.nonce,
      pinned: message.pinned,
      webhook_id: message.webhookId,
      type: message.type,
      activity: message.activity,
      application:
        message.application !== undefined
          ? this.applicationToRaw(message.application)
          : undefined,
      application_id: message.applicationId,
      message_reference:
        message.messageReference !== undefined
          ? {
              message_id: message.messageReference.messageId,
              channel_id: message.messageReference.channelId,
              guild_id: message.messageReference.guildId,
              fail_if_not_exists: message.messageReference.failIfNotExists,
            }
          : undefined,
      flags: message.flags,
      referenced_message:
        message.referencedMessage !== undefined
          ? message.referencedMessage !== null
            ? this.messageToRaw(message.referencedMessage)
            : null
          : undefined,
      interaction_metadata:
        message.interactionMetadata !== undefined
          ? this.interactionMetadataToRaw(message.interactionMetadata)
          : undefined,
      interaction:
        message.interaction !== undefined
          ? {
              id: message.interaction.id,
              type: message.interaction.type,
              name: message.interaction.name,
              user: this.userToRaw(message.interaction.user),
              member:
                message.interaction.member !== undefined
                  ? this.guildMemberToRaw(message.interaction.member)
                  : undefined,
            }
          : undefined,
      thread:
        message.thread !== undefined
          ? this.channelToRaw(message.thread)
          : undefined,
      components:
        message.components !== undefined
          ? this.messageComponentsToRaw(message.components)
          : undefined,
      sticker_items: message.stickerItems?.map((stickerItem) => ({
        id: stickerItem.id,
        name: stickerItem.name,
        format_type: stickerItem.formatType,
      })),
      stickers: message.stickers?.map((sticker) => this.stickerToRaw(sticker)),
      position: message.position,
      role_subscription_data:
        message.roleSubscriptionData !== undefined
          ? {
              role_subscription_listing_id:
                message.roleSubscriptionData.roleSubscriptionListingId,
              tier_name: message.roleSubscriptionData.tierName,
              total_months_subscribed:
                message.roleSubscriptionData.totalMonthsSubscribed,
              is_renewal: message.roleSubscriptionData.isRenewal,
            }
          : undefined,
      resolved:
        message.resolved !== undefined
          ? this.resolvedDataToRaw(message.resolved)
          : undefined,
      poll:
        message.poll !== undefined ? this.pollToRaw(message.poll) : undefined,
      call: message.call,
    };
  }

  partialApplicationCommandToRaw(
    applicationCommand: Partial<ApplicationCommand>
  ): Partial<RawApplicationCommand> {
    return {
      id: applicationCommand.id,
      type: applicationCommand.type,
      application_id: applicationCommand.applicationId,
      guild_id: applicationCommand.guildId,
      name: applicationCommand.name,
      name_localizations: applicationCommand.nameLocalizations,
      description: applicationCommand.description,
      description_localizations: applicationCommand.descriptionLocalizations,
      options: applicationCommand.options?.map((option) => ({
        type: option.type,
        name: option.name,
        name_localizations: option.nameLocalizations,
        description: option.description,
        description_localizations: option.descriptionLocalizations,
        required: option.required,
        choices: option.choices?.map((choice) => ({
          name: choice.name,
          name_localizations: choice.nameLocalizations,
          value: choice.value,
        })),
        options: option.options?.map((o) => ({
          type: o.type,
          name: o.name,
          name_localizations: o.nameLocalizations,
          description: o.description,
          description_localizations: o.descriptionLocalizations,
          required: o.required,
          choices: o.choices?.map((choice) => ({
            name: choice.name,
            name_localizations: choice.nameLocalizations,
            value: choice.value,
          })),
          channel_types: o.channelTypes,
          min_value: o.minValue,
          max_value: o.maxValue,
          min_length: o.minLength,
          max_length: o.maxLength,
          autocomplete: o.autocomplete,
        })),
        channel_types: option.channelTypes,
        min_value: option.minValue,
        max_value: option.maxValue,
        min_length: option.minLength,
        max_length: option.maxLength,
        autocomplete: option.autocomplete,
      })),
      default_member_permissions: applicationCommand.defaultMemberPermissions,
      dm_permission: applicationCommand.dmPermission,
      default_permission: applicationCommand.defaultPermission,
      nsfw: applicationCommand.nsfw,
      version: applicationCommand.version,
    };
  }

  presenceFromRaw(
    presence: RawPresenceUpdateEventFields
  ): PresenceUpdateEventFields {
    return {
      user: this.userFromRaw(presence.user),
      guildId: presence.guild_id,
      status: presence.status,
      activities: presence.activities.map((activity) => ({
        name: activity.name,
        type: activity.type,
        url: activity.url,
        createdAt: activity.created_at,
        timestamps: activity.timestamps,
        applicationId: activity.application_id,
        details: activity.details,
        state: activity.state,
        party: activity.party,
        assets: {
          largeImage: activity.assets?.large_image,
          largeText: activity.assets?.large_text,
          smallImage: activity.assets?.small_image,
          smallText: activity.assets?.small_text,
        },
        secrets: activity.secrets,
        instance: activity.instance,
        flags: activity.flags,
        buttons: activity.buttons,
      })),
      clientStatus: presence.client_status,
    };
  }

  presenceToRaw(
    presence: PresenceUpdateEventFields
  ): RawPresenceUpdateEventFields {
    return {
      user: this.userToRaw(presence.user),
      guild_id: presence.guildId,
      status: presence.status,
      activities: presence.activities.map((activity) => ({
        name: activity.name,
        type: activity.type,
        url: activity.url,
        created_at: activity.createdAt,
        timestamps: activity.timestamps,
        application_id: activity.applicationId,
        details: activity.details,
        state: activity.state,
        party: activity.party,
        assets: {
          large_image: activity.assets?.largeImage,
          large_text: activity.assets?.largeText,
          small_image: activity.assets?.smallImage,
          small_text: activity.assets?.smallText,
        },
        secrets: activity.secrets,
        instance: activity.instance,
        flags: activity.flags,
        buttons: activity.buttons,
      })),
      client_status: presence.clientStatus,
    };
  }

  resolvedDataFromRaw(resolvedData: RawResolvedData): ResolvedData {
    let users: Record<snowflake, User> = {};
    let members: Record<snowflake, GuildMember> = {};
    let roles: Record<snowflake, Role> = {};
    let channels: Record<snowflake, Channel> = {};
    let messages: Record<snowflake, Message> = {};
    let attachments: Record<snowflake, Attachment> = {};

    if (resolvedData.users !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.users)) {
        users[key] = this.userFromRaw(value);
      }
    }

    if (resolvedData.members !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.members)) {
        members[key] = this.guildMemberFromRaw(value);
      }
    }

    if (resolvedData.roles !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.roles)) {
        roles[key] = this.roleFromRaw(value);
      }
    }

    if (resolvedData.channels !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.channels)) {
        channels[key] = this.channelFromRaw(value);
      }
    }

    if (resolvedData.messages !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.messages)) {
        messages[key] = this.messageFromRaw(value);
      }
    }

    if (resolvedData.attachments !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.attachments)) {
        attachments[key] = this.attachmentFromRaw(value);
      }
    }

    return {
      users,
      members,
      roles,
      channels,
      messages,
      attachments,
    };
  }

  resolvedDataToRaw(resolvedData: ResolvedData): RawResolvedData {
    let users: Record<snowflake, RawUser> = {};
    let members: Record<snowflake, RawGuildMember> = {};
    let roles: Record<snowflake, RawRole> = {};
    let channels: Record<snowflake, RawChannel> = {};
    let messages: Record<snowflake, RawMessage> = {};
    let attachments: Record<snowflake, RawAttachment> = {};

    if (resolvedData.users !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.users)) {
        users[key] = this.userToRaw(value);
      }
    }

    if (resolvedData.members !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.members)) {
        members[key] = this.guildMemberToRaw(value);
      }
    }

    if (resolvedData.roles !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.roles)) {
        roles[key] = this.roleToRaw(value);
      }
    }

    if (resolvedData.channels !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.channels)) {
        channels[key] = this.channelToRaw(value);
      }
    }

    if (resolvedData.messages !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.messages)) {
        messages[key] = this.messageToRaw(value);
      }
    }

    if (resolvedData.attachments !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.attachments)) {
        attachments[key] = this.attachmentToRaw(value);
      }
    }

    return {
      users,
      members,
      roles,
      channels,
      messages,
      attachments,
    };
  }

  pollFromRaw(poll: RawPoll): Poll {
    return {
      question: poll.question,
      answers: poll.answers.map((answer) => ({
        answerId: answer.answer_id,
        pollMedia: answer.poll_media,
      })),
      expiry: poll.expiry,
      allowMultiselect: poll.allow_multiselect,
      layoutType: poll.layout_type,
      results:
        poll.results !== undefined
          ? {
              isFinalized: poll.results.is_finalized,
              answerCounts: poll.results.answer_counts.map((answerCount) => ({
                id: answerCount.id,
                count: answerCount.count,
                meVoted: answerCount.me_voted,
              })),
            }
          : undefined,
    };
  }

  pollToRaw(poll: Poll): RawPoll {
    return {
      question: poll.question,
      answers: poll.answers.map((answer) => ({
        answer_id: answer.answerId,
        poll_media: answer.pollMedia,
      })),
      expiry: poll.expiry,
      allow_multiselect: poll.allowMultiselect,
      layout_type: poll.layoutType,
      results:
        poll.results !== undefined
          ? {
              is_finalized: poll.results.isFinalized,
              answer_counts: poll.results.answerCounts.map((answerCount) => ({
                id: answerCount.id,
                count: answerCount.count,
                me_voted: answerCount.meVoted,
              })),
            }
          : undefined,
    };
  }

  roleFromRaw(role: RawRole): Role {
    return {
      id: role.id,
      name: role.name,
      color: role.color,
      hoist: role.hoist,
      icon: role.icon,
      unicodeEmoji: role.unicode_emoji,
      position: role.position,
      permissions: role.permissions,
      managed: role.managed,
      mentionable: role.mentionable,
      tags:
        role.tags !== undefined
          ? {
              botId: role.tags.bot_id,
              integrationId: role.tags.integration_id,
              premiumSubscriber: role.tags.premium_subscriber,
              subscriptionListingId: role.tags.subscription_listing_id,
              availableForPurchase: role.tags.available_for_purchase,
              guildConnections: role.tags.guild_connections,
            }
          : undefined,
      flags: role.flags,
    };
  }

  roleToRaw(role: Role): RawRole {
    return {
      id: role.id,
      name: role.name,
      color: role.color,
      hoist: role.hoist,
      icon: role.icon,
      unicode_emoji: role.unicodeEmoji,
      position: role.position,
      permissions: role.permissions,
      managed: role.managed,
      mentionable: role.mentionable,
      tags:
        role.tags !== undefined
          ? {
              bot_id: role.tags.botId,
              integration_id: role.tags.integrationId,
              premium_subscriber: role.tags.premiumSubscriber,
              subscription_listing_id: role.tags.subscriptionListingId,
              available_for_purchase: role.tags.availableForPurchase,
              guild_connections: role.tags.guildConnections,
            }
          : undefined,
      flags: role.flags,
    };
  }

  skuFromRaw(sku: RawSku): Sku {
    return {
      id: sku.id,
      type: sku.type,
      dependentSkuId: sku.dependent_sku_id,
      applicationId: sku.application_id,
      manifestLabels: sku.manifest_labels,
      accessType: sku.access_type,
      name: sku.name,
      features: sku.features,
      releaseDate: sku.release_date,
      slug: sku.slug,
      flags: sku.flags,
      showAgeGate: sku.show_age_gate,
    };
  }

  skuToRaw(sku: Sku): RawSku {
    return {
      id: sku.id,
      type: sku.type,
      dependent_sku_id: sku.dependentSkuId,
      application_id: sku.applicationId,
      manifest_labels: sku.manifestLabels,
      access_type: sku.accessType,
      name: sku.name,
      features: sku.features,
      release_date: sku.releaseDate,
      slug: sku.slug,
      flags: sku.flags,
      show_age_gate: sku.showAgeGate,
    };
  }

  stageInstanceFromRaw(stageInstance: RawStageInstance): StageInstance {
    return {
      id: stageInstance.id,
      guildId: stageInstance.guild_id,
      channelId: stageInstance.channel_id,
      topic: stageInstance.topic,
      privacyLevel: stageInstance.privacy_level,
      discoverableDisabled: stageInstance.discoverable_disabled,
      guildScheduledEventId: stageInstance.guild_scheduled_event_id,
    };
  }

  stageInstanceToRaw(stageInstance: StageInstance): RawStageInstance {
    return {
      id: stageInstance.id,
      guild_id: stageInstance.guildId,
      channel_id: stageInstance.channelId,
      topic: stageInstance.topic,
      privacy_level: stageInstance.privacyLevel,
      discoverable_disabled: stageInstance.discoverableDisabled,
      guild_scheduled_event_id: stageInstance.guildScheduledEventId,
    };
  }

  stickerFromRaw(sticker: RawSticker): Sticker {
    return {
      id: sticker.id,
      packId: sticker.pack_id,
      name: sticker.name,
      description: sticker.description,
      tags: sticker.tags,
      asset: sticker.asset,
      type: sticker.type,
      formatType: sticker.format_type,
      available: sticker.available,
      guildId: sticker.id,
      user:
        sticker.user !== undefined ? this.userFromRaw(sticker.user) : undefined,
      sortValue: sticker.sort_value,
    };
  }

  stickerToRaw(sticker: Sticker): RawSticker {
    return {
      id: sticker.id,
      pack_id: sticker.packId,
      name: sticker.name,
      description: sticker.description,
      tags: sticker.tags,
      asset: sticker.asset,
      type: sticker.type,
      format_type: sticker.formatType,
      available: sticker.available,
      guild_id: sticker.id,
      user:
        sticker.user !== undefined ? this.userToRaw(sticker.user) : undefined,
      sort_value: sticker.sortValue,
    };
  }

  teamFromRaw(team: RawTeam): Team {
    return {
      icon: team.icon,
      id: team.id,
      members: team.members.map((teamMember) => ({
        membershipState: teamMember.membership_state,
        teamId: teamMember.team_id,
        user: this.userFromRaw(teamMember.user),
        role: teamMember.role,
      })),
      name: team.name,
      ownerUserId: team.owner_user_id,
    };
  }

  teamToRaw(team: Team): RawTeam {
    return {
      icon: team.icon,
      id: team.id,
      members: team.members.map((teamMember) => ({
        membership_state: teamMember.membershipState,
        team_id: teamMember.teamId,
        user: this.userToRaw(teamMember.user),
        role: teamMember.role,
      })),
      name: team.name,
      owner_user_id: team.ownerUserId,
    };
  }

  threadMemberFromRaw(threadMember: RawThreadMember): ThreadMember {
    return {
      id: threadMember.id,
      userId: threadMember.user_id,
      joinTimestamp: threadMember.join_timestamp,
      flags: threadMember.flags,
      member:
        threadMember.member !== undefined
          ? this.guildMemberFromRaw(threadMember.member)
          : undefined,
    };
  }

  threadMemberToRaw(threadMember: ThreadMember): RawThreadMember {
    return {
      id: threadMember.id,
      user_id: threadMember.userId,
      join_timestamp: threadMember.joinTimestamp,
      flags: threadMember.flags,
      member:
        threadMember.member !== undefined
          ? this.guildMemberToRaw(threadMember.member)
          : undefined,
    };
  }

  testEntitlementFromRaw(
    entitlement: Omit<
      RawEntitlement,
      "starts_at" | "ends_at" | "subscription_id"
    >
  ): Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId"> {
    return {
      id: entitlement.id,
      skuId: entitlement.sku_id,
      applicationId: entitlement.application_id,
      userId: entitlement.user_id,
      promotionId: entitlement.promotion_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      giftCodeFlags: entitlement.gift_code_flags,
      consumed: entitlement.consumed,
      guildId: entitlement.guild_id,
    };
  }

  testEntitlementToRaw(
    entitlement: Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId">
  ): Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id"> {
    return {
      id: entitlement.id,
      sku_id: entitlement.skuId,
      application_id: entitlement.applicationId,
      user_id: entitlement.userId,
      promotion_id: entitlement.promotionId,
      type: entitlement.type,
      deleted: entitlement.deleted,
      gift_code_flags: entitlement.giftCodeFlags,
      consumed: entitlement.consumed,
      guild_id: entitlement.guildId,
    };
  }

  userFromRaw(user: RawUser): User {
    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      globalName: user.global_name,
      avatar: user.avatar,
      bot: user.bot,
      system: user.system,
      mfaEnabled: user.mfa_enabled,
      banner: user.banner,
      accentColor: user.accent_color,
      locale: user.locale,
      verified: user.verified,
      email: user.email,
      flags: user.flags,
      premiumType: user.premium_type,
      publicFlags: user.public_flags,
      avatarDecoration: user.avatar_decoration,
    };
  }

  userToRaw(user: User): RawUser {
    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      global_name: user.globalName,
      avatar: user.avatar,
      bot: user.bot,
      system: user.system,
      mfa_enabled: user.mfaEnabled,
      banner: user.banner,
      accent_color: user.accentColor,
      locale: user.locale,
      verified: user.verified,
      email: user.email,
      flags: user.flags,
      premium_type: user.premiumType,
      public_flags: user.publicFlags,
      avatar_decoration: user.avatarDecoration,
    };
  }

  voiceStateFromRaw(voiceState: RawVoiceState): VoiceState {
    return {
      guildId: voiceState.guild_id,
      channelId: voiceState.channel_id,
      userId: voiceState.user_id,
      member:
        voiceState.member !== undefined
          ? this.guildMemberFromRaw(voiceState.member)
          : undefined,
      sessionId: voiceState.session_id,
      deaf: voiceState.deaf,
      mute: voiceState.mute,
      selfDeaf: voiceState.self_deaf,
      selfMute: voiceState.self_mute,
      selfStream: voiceState.self_stream,
      selfVideo: voiceState.self_video,
      suppress: voiceState.suppress,
      requestToSpeakTimestamp: voiceState.request_to_speak_timestamp,
    };
  }

  voiceStateToRaw(voiceState: VoiceState): RawVoiceState {
    return {
      guild_id: voiceState.guildId,
      channel_id: voiceState.channelId,
      user_id: voiceState.userId,
      member:
        voiceState.member !== undefined
          ? this.guildMemberToRaw(voiceState.member)
          : undefined,
      session_id: voiceState.sessionId,
      deaf: voiceState.deaf,
      mute: voiceState.mute,
      self_deaf: voiceState.selfDeaf,
      self_mute: voiceState.selfMute,
      self_stream: voiceState.selfStream,
      self_video: voiceState.selfVideo,
      suppress: voiceState.suppress,
      request_to_speak_timestamp: voiceState.requestToSpeakTimestamp,
    };
  }

  webhookFromRaw(webhook: RawWebhook): Webhook {
    return {
      id: webhook.id,
      type: webhook.type,
      guildId: webhook.guild_id,
      channelId: webhook.channel_id,
      user:
        webhook.user !== undefined ? this.userFromRaw(webhook.user) : undefined,
      name: webhook.name,
      avatar: webhook.avatar,
      token: webhook.token,
      applicationId: webhook.application_id,
      sourceGuild:
        webhook.source_guild !== undefined
          ? this.guildFromRaw(webhook.source_guild)
          : undefined,
      sourceChannel:
        webhook.source_channel !== undefined
          ? this.channelFromRaw(webhook.source_channel)
          : undefined,
      url: webhook.url,
    };
  }

  webhookToRaw(webhook: Webhook): RawWebhook {
    return {
      id: webhook.id,
      type: webhook.type,
      guild_id: webhook.guildId,
      channel_id: webhook.channelId,
      user:
        webhook.user !== undefined ? this.userToRaw(webhook.user) : undefined,
      name: webhook.name,
      avatar: webhook.avatar,
      token: webhook.token,
      application_id: webhook.applicationId,
      source_guild:
        webhook.sourceGuild !== undefined
          ? this.guildToRaw(webhook.sourceGuild)
          : undefined,
      source_channel:
        webhook.sourceChannel !== undefined
          ? this.channelToRaw(webhook.sourceChannel)
          : undefined,
      url: webhook.url,
    };
  }
}
