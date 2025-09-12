import { ComponentTypes } from "../constants";
import {
  RawAttachment,
  Attachment,
  RawEmbed,
  Embed,
  RawMessage,
  Message,
} from "../types/message";
import { Applications } from "./Applications";
import { Channels } from "./Channels";
import { Components } from "./Components.js";
import { Emojis } from "./Emojis";
import { Guilds } from "./Guilds";
import { Interactions } from "./Interactions";
import { Polls } from "./Polls";
import { Stickers } from "./Stickers";
import { Users } from "./Users";
import type {
  ActionRow,
  Container,
  File,
  MediaGallery,
  RawActionRow,
  RawContainer,
  RawFile,
  RawMediaGallery,
  RawSection,
  RawSeparator,
  RawTextDisplay,
  Section,
  Separator,
  TextDisplay,
} from "../types/components";

export class Messages {
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

  static componentsFromRaw(
    components: Array<
      | RawActionRow
      | RawSection
      | RawTextDisplay
      | RawMediaGallery
      | RawFile
      | RawSeparator
      | RawContainer
    >
  ): Array<
    | ActionRow
    | Section
    | TextDisplay
    | MediaGallery
    | File
    | Separator
    | Container
  > {
    return components.map((component) => {
      switch (component.type) {
        case ComponentTypes.ActionRow:
          return Components.actionRowFromRaw(component);
        case ComponentTypes.Section:
          return Components.sectionFromRaw(component);
        case ComponentTypes.TextDisplay:
          return Components.textDisplayFromRaw(component);
        case ComponentTypes.MediaGallery:
          return Components.mediaGalleryFromRaw(component);
        case ComponentTypes.File:
          return Components.fileFromRaw(component);
        case ComponentTypes.Separator:
          return Components.separatorFromRaw(component);
        case ComponentTypes.Container:
          return Components.containerFromRaw(component);
      }
    });
  }

  static componentsToRaw(
    components: Array<
      | ActionRow
      | Section
      | TextDisplay
      | MediaGallery
      | File
      | Separator
      | Container
    >
  ): Array<
    | RawActionRow
    | RawSection
    | RawTextDisplay
    | RawMediaGallery
    | RawFile
    | RawSeparator
    | RawContainer
  > {
    return components.map((component) => {
      switch (component.type) {
        case ComponentTypes.ActionRow:
          return Components.actionRowToRaw(component);
        case ComponentTypes.Section:
          return Components.sectionToRaw(component);
        case ComponentTypes.TextDisplay:
          return Components.textDisplayToRaw(component);
        case ComponentTypes.MediaGallery:
          return Components.mediaGalleryToRaw(component);
        case ComponentTypes.File:
          return Components.fileToRaw(component);
        case ComponentTypes.Separator:
          return Components.separatorToRaw(component);
        case ComponentTypes.Container:
          return Components.containerToRaw(component);
      }
    });
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
      fields: embed.fields,
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
      fields: embed.fields,
    };
  }

  static messageFromRaw(message: RawMessage): Message {
    return {
      id: message.id,
      channelId: message.channel_id,
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
        guildId: channelMention.guild_id,
        type: channelMention.type,
        name: channelMention.name,
      })),
      attachments: message.attachments.map((attachment) =>
        Messages.attachmentFromRaw(attachment)
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
      webhookId: message.webhook_id,
      type: message.type,
      activity: message.activity,
      application:
        message.application !== undefined
          ? Applications.applicationFromRaw(message.application)
          : undefined,
      applicationId: message.application_id,
      flags: message.flags,
      messageReference:
        message.message_reference !== undefined
          ? {
              messageId: message.message_reference.message_id,
              channelId: message.message_reference.channel_id,
              guildId: message.message_reference.guild_id,
              failIfNotExists: message.message_reference.fail_if_not_exists,
            }
          : undefined,
      messageSnapshots: message.message_snapshots?.map((messageSnapshot) => ({
        message: {
          type: messageSnapshot.message.type,
          content: messageSnapshot.message.content,
          embeds: messageSnapshot.message.embeds.map((embed) =>
            this.embedFromRaw(embed)
          ),
          attachments: messageSnapshot.message.attachments.map((attachment) =>
            this.attachmentFromRaw(attachment)
          ),
          timestamp: messageSnapshot.message.timestamp,
          editedTimestamp: messageSnapshot.message.edited_timestamp,
          flags: messageSnapshot.message.flags,
          mentions: messageSnapshot.message.mentions.map((user) =>
            Users.userFromRaw(user)
          ),
          mentionRoles: messageSnapshot.message.mention_roles,
        },
      })),
      referencedMessage:
        message.referenced_message !== undefined
          ? message.referenced_message !== null
            ? Messages.messageFromRaw(message.referenced_message)
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
          ? Messages.componentsFromRaw(message.components)
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
      channel_id: message.channelId,
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
        guild_id: channelMention.guildId,
        type: channelMention.type,
        name: channelMention.name,
      })),
      attachments: message.attachments.map((attachment) =>
        Messages.attachmentToRaw(attachment)
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
      webhook_id: message.webhookId,
      type: message.type,
      activity: message.activity,
      application:
        message.application !== undefined
          ? Applications.applicationToRaw(message.application)
          : undefined,
      application_id: message.applicationId,
      flags: message.flags,
      message_reference:
        message.messageReference !== undefined
          ? {
              message_id: message.messageReference.messageId,
              channel_id: message.messageReference.channelId,
              guild_id: message.messageReference.guildId,
              fail_if_not_exists: message.messageReference.failIfNotExists,
            }
          : undefined,
      message_snapshots: message.messageSnapshots?.map((messageSnapshot) => ({
        message: {
          type: messageSnapshot.message.type,
          content: messageSnapshot.message.content,
          embeds: messageSnapshot.message.embeds.map((embed) =>
            this.embedToRaw(embed)
          ),
          attachments: messageSnapshot.message.attachments.map((attachment) =>
            this.attachmentToRaw(attachment)
          ),
          timestamp: messageSnapshot.message.timestamp,
          edited_timestamp: messageSnapshot.message.editedTimestamp,
          flags: messageSnapshot.message.flags,
          mentions: messageSnapshot.message.mentions.map((user) =>
            Users.userToRaw(user)
          ),
          mention_roles: messageSnapshot.message.mentionRoles,
        },
      })),
      referenced_message:
        message.referencedMessage !== undefined
          ? message.referencedMessage !== null
            ? Messages.messageToRaw(message.referencedMessage)
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
          ? Messages.componentsToRaw(message.components)
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
                message.roleSubscriptionData.roleSubscriptionListingId,
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
}
