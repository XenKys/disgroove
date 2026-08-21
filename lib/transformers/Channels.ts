import type {
  RawChannel,
  Channel,
  RawThreadMember,
  ThreadMember,
} from "../types/channel";
import { AttachmentRequest, RawAttachmentRequest } from "../types/message";
import { Guilds } from "./Guilds";
import { Users } from "./Users";

export class Channels {
  static channelFromRaw(channel: RawChannel): Channel {
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
        Users.userFromRaw(recipient)
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
          ? Channels.threadMemberFromRaw(channel.member)
          : undefined,
      defaultAutoArchiveDuration: channel.default_auto_archive_duration,
      permissions: channel.permissions,
      appPermissions: channel.app_permissions,
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

  static channelToRaw(channel: Channel): RawChannel {
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
        Users.userToRaw(recipient)
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
          ? Channels.threadMemberToRaw(channel.member)
          : undefined,
      default_auto_archive_duration: channel.defaultAutoArchiveDuration,
      permissions: channel.permissions,
      app_permissions: channel.appPermissions,
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

  static threadMemberFromRaw(threadMember: RawThreadMember): ThreadMember {
    return {
      id: threadMember.id,
      userId: threadMember.user_id,
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
      user_id: threadMember.userId,
      join_timestamp: threadMember.joinTimestamp,
      flags: threadMember.flags,
      member:
        threadMember.member !== undefined
          ? Guilds.guildMemberToRaw(threadMember.member)
          : undefined,
    };
  }

  static attachmentRequestFromRaw(
    attachmentRequest: RawAttachmentRequest
  ): AttachmentRequest {
    return {
      id: attachmentRequest.id,
      filename: attachmentRequest.filename,
      title: attachmentRequest.title,
      description: attachmentRequest.description,
      durationSecs: attachmentRequest.duration_secs,
      waveform: attachmentRequest.waveform,
      isSpoiler: attachmentRequest.is_spoiler,
    };
  }

  static attachmentRequestToRaw(
    attachmentRequest: AttachmentRequest
  ): RawAttachmentRequest {
    return {
      id: attachmentRequest.id,
      filename: attachmentRequest.filename,
      title: attachmentRequest.title,
      description: attachmentRequest.description,
      duration_secs: attachmentRequest.durationSecs,
      waveform: attachmentRequest.waveform,
      is_spoiler: attachmentRequest.isSpoiler,
    };
  }
}
