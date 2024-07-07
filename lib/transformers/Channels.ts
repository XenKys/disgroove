import { ComponentTypes } from "../constants";
import type {
  RawAttachment,
  Attachment,
  RawChannel,
  Channel,
  RawEmbed,
  Embed,
  RawMessage,
  Message,
  RawThreadMember,
  ThreadMember,
} from "../types/channel";
import type { RawActionRow, ActionRow } from "../types/message-components";
import { Applications } from "./Applications";
import { Emojis } from "./Emojis";
import { Guilds } from "./Guilds";
import { Interactions } from "./Interactions";
import { Polls } from "./Polls";
import { Stickers } from "./Stickers";
import { Users } from "./Users";

export class Channels {
  static attachmentFromRaw(attachment: RawAttachment): Attachment {
    return {
      id: attachment.id,
      filename: attachment.filename,
      title: attachment.title,
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

  static attachmentToRaw(attachment: Attachment): RawAttachment {
    return {
      id: attachment.id,
      filename: attachment.filename,
      title: attachment.title,
      description: attachment.description,
      content_type: attachment.contentType,
      size: attachment.size,
      url: attachment.url,
      proxy_url: attachment.proxyURL,
      height: attachment.height,
      width: attachment.width,
      ephemeral: attachment.ephemeral,
      duration_secs: attachment.durationSecs,
      waveform: attachment.waveform,
      flags: attachment.flags,
    };
  }

  static channelFromRaw(channel: RawChannel): Channel {
    return {
      id: channel.id,
      type: channel.type,
      guildID: channel.guild_id,
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
      lastMessageID: channel.last_message_id,
      bitrate: channel.bitrate,
      userLimit: channel.user_limit,
      rateLimitPerUser: channel.rate_limit_per_user,
      recipients: channel.recipients?.map((recipient) =>
        Users.userFromRaw(recipient)
      ),
      icon: channel.icon,
      ownerID: channel.owner_id,
      applicationID: channel.application_id,
      managed: channel.managed,
      parentID: channel.parent_id,
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
          ? Channels.threadMemberFromRaw(channel.member)
          : undefined,
      defaultAutoArchiveDuration: channel.default_auto_archive_duration,
      permissions: channel.permissions,
      flags: channel.flags,
      totalMessageSent: channel.total_message_sent,
      availableTags: channel.available_tags?.map((availableTag) => ({
        id: availableTag.id,
        name: availableTag.name,
        moderated: availableTag.moderated,
        emojiID: availableTag.emoji_id,
        emojiName: availableTag.emoji_name,
      })),
      appliedTags: channel.applied_tags,
      defaultReactionEmoji:
        channel.default_reaction_emoji !== undefined
          ? channel.default_reaction_emoji !== null
            ? {
                emojiID: channel.default_reaction_emoji.emoji_id,
                emojiName: channel.default_reaction_emoji.emoji_name,
              }
            : null
          : undefined,
      defaultThreadRateLimitPerUser: channel.default_thread_rate_limit_per_user,
      defaultSortOrder: channel.default_sort_order,
      defaultForumLayout: channel.default_forum_layout,
    };
  }

  static channelToRaw(channel: Channel): RawChannel {
    return {
      id: channel.id,
      type: channel.type,
      guild_id: channel.guildID,
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
      last_message_id: channel.lastMessageID,
      bitrate: channel.bitrate,
      user_limit: channel.userLimit,
      rate_limit_per_user: channel.rateLimitPerUser,
      recipients: channel.recipients?.map((recipient) =>
        Users.userToRaw(recipient)
      ),
      icon: channel.icon,
      owner_id: channel.ownerID,
      application_id: channel.applicationID,
      managed: channel.managed,
      parent_id: channel.parentID,
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
          ? Channels.threadMemberToRaw(channel.member)
          : undefined,
      default_auto_archive_duration: channel.defaultAutoArchiveDuration,
      permissions: channel.permissions,
      flags: channel.flags,
      total_message_sent: channel.totalMessageSent,
      available_tags: channel.availableTags?.map((availableTag) => ({
        id: availableTag.id,
        name: availableTag.name,
        moderated: availableTag.moderated,
        emoji_id: availableTag.emojiID,
        emoji_name: availableTag.emojiName,
      })),
      applied_tags: channel.appliedTags,
      default_reaction_emoji:
        channel.defaultReactionEmoji !== undefined
          ? channel.defaultReactionEmoji !== null
            ? {
                emoji_id: channel.defaultReactionEmoji.emojiID,
                emoji_name: channel.defaultReactionEmoji.emojiName,
              }
            : null
          : undefined,
      default_thread_rate_limit_per_user: channel.defaultThreadRateLimitPerUser,
      default_sort_order: channel.defaultSortOrder,
      default_forum_layout: channel.defaultForumLayout,
    };
  }

  static embedFromRaw(embed: RawEmbed): Embed {
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
    };
  }

  static embedToRaw(embed: Embed): RawEmbed {
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
    };
  }

  static messageComponentsFromRaw(
    components: Array<RawActionRow>
  ): Array<ActionRow> {
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
              customID: c.custom_id,
              skuID: c.sku_id,
              url: c.url,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.TextInput: {
            return {
              type: c.type,
              customID: c.custom_id,
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
              customID: c.custom_id,
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
              customID: c.custom_id,
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
              customID: c.custom_id,
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

  static messageComponentsToRaw(
    components: Array<ActionRow>
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
              custom_id: c.customID,
              sku_id: c.skuID,
              url: c.url,
              disabled: c.disabled,
            };
          }
          case ComponentTypes.TextInput: {
            return {
              type: c.type,
              custom_id: c.customID,
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
              custom_id: c.customID,
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
              custom_id: c.customID,
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
              custom_id: c.customID,
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

  static messageFromRaw(message: RawMessage): Message {
    return {
      id: message.id,
      channelID: message.channel_id,
      author: Users.userFromRaw(message.author),
      content: message.content,
      timestamp: message.timestamp,
      editedTimestamp: message.edited_timestamp,
      tts: message.tts,
      mentionEveryone: message.mention_everyone,
      mentions: message.mentions.map((user) => Users.userFromRaw(user)),
      mentionRoles: message.mention_roles,
      mentionChannels: message.mention_channels?.map((channelMention) => ({
        id: channelMention.id,
        guildID: channelMention.guild_id,
        type: channelMention.type,
        name: channelMention.name,
      })),
      attachments: message.attachments.map((attachment) =>
        Channels.attachmentFromRaw(attachment)
      ),
      embeds: message.embeds,
      reactions: message.reactions?.map((reaction) => ({
        count: reaction.count,
        countDetails: reaction.count_details,
        me: reaction.me,
        meBurst: reaction.me_burst,
        emoji: Emojis.emojiFromRaw(reaction.emoji),
        burstColors: reaction.burst_colors,
      })),
      nonce: message.nonce,
      pinned: message.pinned,
      webhookID: message.webhook_id,
      type: message.type,
      activity: message.activity,
      application:
        message.application !== undefined
          ? Applications.applicationFromRaw(message.application)
          : undefined,
      applicationID: message.application_id,
      messageReference:
        message.message_reference !== undefined
          ? {
              messageID: message.message_reference.message_id,
              channelID: message.message_reference.channel_id,
              guildID: message.message_reference.guild_id,
              failIfNotExists: message.message_reference.fail_if_not_exists,
            }
          : undefined,
      flags: message.flags,
      referencedMessage:
        message.referenced_message !== undefined
          ? message.referenced_message !== null
            ? Channels.messageFromRaw(message.referenced_message)
            : null
          : undefined,
      interactionMetadata:
        message.interaction_metadata !== undefined
          ? Interactions.interactionMetadataFromRaw(
              message.interaction_metadata
            )
          : undefined,
      interaction:
        message.interaction !== undefined
          ? {
              id: message.interaction.id,
              type: message.interaction.type,
              name: message.interaction.name,
              user: Users.userFromRaw(message.interaction.user),
              member:
                message.interaction.member !== undefined
                  ? Guilds.guildMemberFromRaw(message.interaction.member)
                  : undefined,
            }
          : undefined,
      thread:
        message.thread !== undefined
          ? Channels.channelFromRaw(message.thread)
          : undefined,
      components:
        message.components !== undefined
          ? Channels.messageComponentsFromRaw(message.components)
          : undefined,
      stickerItems: message.sticker_items?.map((stickerItem) => ({
        id: stickerItem.id,
        name: stickerItem.name,
        formatType: stickerItem.format_type,
      })),
      stickers: message.stickers?.map((sticker) =>
        Stickers.stickerFromRaw(sticker)
      ),
      position: message.position,
      roleSubscriptionData:
        message.role_subscription_data !== undefined
          ? {
              roleSubscriptionListingID:
                message.role_subscription_data.role_subscription_listing_id,
              tierName: message.role_subscription_data.tier_name,
              totalMonthsSubscribed:
                message.role_subscription_data.total_months_subscribed,
              isRenewal: message.role_subscription_data.is_renewal,
            }
          : undefined,
      resolved:
        message.resolved !== undefined
          ? Interactions.resolvedDataFromRaw(message.resolved)
          : undefined,
      poll:
        message.poll !== undefined
          ? Polls.pollFromRaw(message.poll)
          : undefined,
      call: message.call,
    };
  }

  static messageToRaw(message: Message): RawMessage {
    return {
      id: message.id,
      channel_id: message.channelID,
      author: Users.userToRaw(message.author),
      content: message.content,
      timestamp: message.timestamp,
      edited_timestamp: message.editedTimestamp,
      tts: message.tts,
      mention_everyone: message.mentionEveryone,
      mentions: message.mentions.map((user) => Users.userToRaw(user)),
      mention_roles: message.mentionRoles,
      mention_channels: message.mentionChannels?.map((channelMention) => ({
        id: channelMention.id,
        guild_id: channelMention.guildID,
        type: channelMention.type,
        name: channelMention.name,
      })),
      attachments: message.attachments.map((attachment) =>
        Channels.attachmentToRaw(attachment)
      ),
      embeds: message.embeds,
      reactions: message.reactions?.map((reaction) => ({
        count: reaction.count,
        count_details: reaction.countDetails,
        me: reaction.me,
        me_burst: reaction.meBurst,
        emoji: Emojis.emojiToRaw(reaction.emoji),
        burst_colors: reaction.burstColors,
      })),
      nonce: message.nonce,
      pinned: message.pinned,
      webhook_id: message.webhookID,
      type: message.type,
      activity: message.activity,
      application:
        message.application !== undefined
          ? Applications.applicationToRaw(message.application)
          : undefined,
      application_id: message.applicationID,
      message_reference:
        message.messageReference !== undefined
          ? {
              message_id: message.messageReference.messageID,
              channel_id: message.messageReference.channelID,
              guild_id: message.messageReference.guildID,
              fail_if_not_exists: message.messageReference.failIfNotExists,
            }
          : undefined,
      flags: message.flags,
      referenced_message:
        message.referencedMessage !== undefined
          ? message.referencedMessage !== null
            ? Channels.messageToRaw(message.referencedMessage)
            : null
          : undefined,
      interaction_metadata:
        message.interactionMetadata !== undefined
          ? Interactions.interactionMetadataToRaw(message.interactionMetadata)
          : undefined,
      interaction:
        message.interaction !== undefined
          ? {
              id: message.interaction.id,
              type: message.interaction.type,
              name: message.interaction.name,
              user: Users.userToRaw(message.interaction.user),
              member:
                message.interaction.member !== undefined
                  ? Guilds.guildMemberToRaw(message.interaction.member)
                  : undefined,
            }
          : undefined,
      thread:
        message.thread !== undefined
          ? Channels.channelToRaw(message.thread)
          : undefined,
      components:
        message.components !== undefined
          ? Channels.messageComponentsToRaw(message.components)
          : undefined,
      sticker_items: message.stickerItems?.map((stickerItem) => ({
        id: stickerItem.id,
        name: stickerItem.name,
        format_type: stickerItem.formatType,
      })),
      stickers: message.stickers?.map((sticker) =>
        Stickers.stickerToRaw(sticker)
      ),
      position: message.position,
      role_subscription_data:
        message.roleSubscriptionData !== undefined
          ? {
              role_subscription_listing_id:
                message.roleSubscriptionData.roleSubscriptionListingID,
              tier_name: message.roleSubscriptionData.tierName,
              total_months_subscribed:
                message.roleSubscriptionData.totalMonthsSubscribed,
              is_renewal: message.roleSubscriptionData.isRenewal,
            }
          : undefined,
      resolved:
        message.resolved !== undefined
          ? Interactions.resolvedDataToRaw(message.resolved)
          : undefined,
      poll:
        message.poll !== undefined ? Polls.pollToRaw(message.poll) : undefined,
      call: message.call,
    };
  }

  static threadMemberFromRaw(threadMember: RawThreadMember): ThreadMember {
    return {
      id: threadMember.id,
      userID: threadMember.user_id,
      joinTimestamp: threadMember.join_timestamp,
      flags: threadMember.flags,
      member:
        threadMember.member !== undefined
          ? Guilds.guildMemberFromRaw(threadMember.member)
          : undefined,
    };
  }

  static threadMemberToRaw(threadMember: ThreadMember): RawThreadMember {
    return {
      id: threadMember.id,
      user_id: threadMember.userID,
      join_timestamp: threadMember.joinTimestamp,
      flags: threadMember.flags,
      member:
        threadMember.member !== undefined
          ? Guilds.guildMemberToRaw(threadMember.member)
          : undefined,
    };
  }
}
