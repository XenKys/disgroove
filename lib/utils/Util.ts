import type {
  JSONActionRow,
  JSONApplicationCommand,
  JSONAttachment,
  JSONChannel,
  JSONEmbed,
  JSONEmoji,
  JSONRole,
  JSONUser,
  PresenceUpdateEventFields,
  RawActionRow,
  RawApplicationCommand,
  RawAttachment,
  RawChannel,
  RawEmbed,
  RawEmoji,
  RawPresenceUpdateEventFields,
  RawRole,
  RawUser,
} from "../types";
import { ComponentTypes } from "../constants";
import { User } from "../structures";
import type { Client } from "../Client";

export class Util {
  applicationCommandToRaw(
    command: Partial<JSONApplicationCommand>
  ): Partial<RawApplicationCommand> {
    return {
      id: command.id,
      type: command.type,
      application_id: command.applicationId,
      guild_id: command.guildId,
      name: command.name,
      name_localizations: command.nameLocalizations,
      description: command.description,
      description_localizations: command.descriptionLocalizations,
      options: command.options?.map((option) => ({
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
      default_member_permissions: command.defaultMemberPermissions,
      dm_permission: command.dmPermission,
      default_permission: command.defaultPermission,
      nsfw: command.nsfw,
      version: command.version,
    };
  }

  attachmentToJSON(attachment: RawAttachment): JSONAttachment {
    return {
      id: attachment.id,
      filename: attachment.filename,
      description: attachment.description,
      contentType: attachment.content_type,
      size: attachment.size,
      url: attachment.url,
      proxyURL: attachment.proxy_url,
      height: attachment.height,
      width: attachment.width,
      ephemeral: attachment.ephemeral,
      durationSecs: attachment.duration_secs,
      waveform: attachment.waveform,
      flags: attachment.flags,
    };
  }

  channelToRaw(channel: JSONChannel): RawChannel {
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

  embedsToJSON(embeds: Array<RawEmbed>): Array<JSONEmbed> {
    return embeds.map((embed) => ({
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
              iconURL: embed.footer.icon_url,
              proxyIconURL: embed.footer.proxy_icon_url,
            }
          : undefined,
      image:
        embed.image !== undefined
          ? {
              url: embed.image.url,
              proxyURL: embed.image.proxy_url,
              height: embed.image.height,
              width: embed.image.width,
            }
          : undefined,
      thumbnail:
        embed.thumbnail !== undefined
          ? {
              url: embed.thumbnail.url,
              proxyURL: embed.thumbnail.proxy_url,
              height: embed.thumbnail.height,
              width: embed.thumbnail.width,
            }
          : undefined,
      video: {
        url: embed.video?.url,
        proxyURL: embed.video?.proxy_url,
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
              iconURL: embed.author.icon_url,
              proxyIconURL: embed.author.proxy_icon_url,
            }
          : undefined,
      fields: embed.fields?.map((field) => ({
        name: field.name,
        value: field.value,
        inline: field.inline,
      })),
    }));
  }

  embedsToRaw(embeds: Array<JSONEmbed>): Array<RawEmbed> {
    return embeds.map((embed) => ({
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
              icon_url: embed.footer.iconURL,
              proxy_icon_url: embed.footer.proxyIconURL,
            }
          : undefined,
      image:
        embed.image !== undefined
          ? {
              url: embed.image.url,
              proxy_url: embed.image.proxyURL,
              height: embed.image.height,
              width: embed.image.width,
            }
          : undefined,
      thumbnail:
        embed.thumbnail !== undefined
          ? {
              url: embed.thumbnail.url,
              proxy_url: embed.thumbnail.proxyURL,
              height: embed.thumbnail.height,
              width: embed.thumbnail.width,
            }
          : undefined,
      video: {
        url: embed.video?.url,
        proxy_url: embed.video?.proxyURL,
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
              icon_url: embed.author.iconURL,
              proxy_icon_url: embed.author.proxyIconURL,
            }
          : undefined,
      fields: embed.fields?.map((field) => ({
        name: field.name,
        value: field.value,
        inline: field.inline,
      })),
    }));
  }

  emojiToRaw(emoji: JSONEmoji): RawEmoji {
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

  messageComponentsToJSON(
    components: Array<RawActionRow>
  ): Array<JSONActionRow> {
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

  messageComponentsToRaw(
    components: Array<JSONActionRow>
  ): Array<RawActionRow> {
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

  presenceToREST(
    presence: RawPresenceUpdateEventFields,
    client: Client
  ): PresenceUpdateEventFields {
    return {
      user: new User(presence.user, client),
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

  roleToRaw(role: JSONRole | Partial<JSONRole>): RawRole | Partial<RawRole> {
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
      tags: {
        bot_id: role.tags?.botId,
        integration_id: role.tags?.integrationId,
        premium_subscriber: role.tags?.premiumSubscriber,
        subscription_listing_id: role.tags?.subscriptionListingId,
        available_for_purchase: role.tags?.availableForPurchase,
        guild_connections: role.tags?.guildConnections,
      },
      flags: role.flags,
    };
  }

  toCamelCase<T>(obj: Record<string, any>): T {
    if (obj !== null && typeof obj === "object") {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.toCamelCase(item)) as T;
      } else {
        const newObj: Record<string, any> = {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/_([a-z])/g, (match, letter) =>
              letter.toUpperCase()
            );

            newObj[newKey] = this.toCamelCase(obj[key]);
          }
        }

        return newObj as T;
      }
    } else {
      return obj;
    }
  }

  toSnakeCase<T>(obj: Record<string, any>): T {
    if (obj !== null && typeof obj === "object") {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.toSnakeCase(item)) as T;
      } else {
        const newObj: Record<string, any> = {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(
              /[A-Z]/g,
              (match) => `_${match.toLowerCase()}`
            );

            newObj[newKey] = this.toSnakeCase(obj[key]);
          }
        }

        return newObj as T;
      }
    } else {
      return obj;
    }
  }

  userToRaw(user: JSONUser): RawUser {
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
}
