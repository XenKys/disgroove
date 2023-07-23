import { Base, GuildMember, Invite, Message, User, Webhook } from ".";
import type { Client } from "../class";
import { Endpoints, File } from "../rest";
import type {
  JSONAllowedMentions,
  JSONAttachment,
  JSONChannel,
  JSONDefaultReaction,
  JSONEmbed,
  JSONEmoji,
  JSONFollowedChannel,
  JSONForumTag,
  JSONMessageReference,
  JSONOverwrite,
  JSONSelectOption,
  JSONThreadMember,
  JSONThreadMetadata,
  RawChannel,
  RawInvite,
  RawMessage,
  RawThreadMember,
  RawUser,
  RawWebhook,
} from "../types";
import {
  ChannelTypes,
  ComponentTypes,
  InviteTargetTypes,
  MessageFlags,
  messageComponentToRaw,
} from "../utils";

export class Channel extends Base {
  public type: ChannelTypes;
  public guildId?: string;
  public position?: number;
  public permissionOverwrites?: Array<JSONOverwrite>;
  public name?: string | null;
  public topic?: string | null;
  public nsfw?: boolean;
  public lastMessageId?: string | null;
  public bitrate?: number;
  public userLimit?: number;
  public rateLimitPerUser?: number;
  public recipients?: Array<User>;
  public icon?: string | null;
  public ownerId?: string;
  public applicationId?: string;
  public managed?: boolean;
  public parentId?: string | null;
  public lastPinTimestamp?: number | null;
  public rtcRegion?: string | null;
  public videoQualityMode?: number;
  public messageCount?: number;
  public memberCount?: number;
  public threadMetadata?: JSONThreadMetadata;
  public member?: JSONThreadMember;
  public defaultAutoArchiveDuration?: number;
  public permissions?: string;
  public flags?: number;
  public totalMessageSent?: number;
  public availableTags?: Array<JSONForumTag>;
  public appliedTags?: Array<string>;
  public defaultReactionEmoji?: JSONDefaultReaction | null;
  public defaultThreadRateLimitPerUser?: number;
  public defaultSortOrder?: number | null;
  public defaultForumLayout?: number;

  constructor(data: RawChannel, client: Client) {
    super(data.id, client);

    this.type = data.type;

    this.update(data);
  }

  protected override update(data: RawChannel): void {
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.position !== undefined) this.position = data.position;
    if (data.permission_overwrites !== undefined)
      this.permissionOverwrites = data.permission_overwrites;
    if (data.name !== undefined) this.name = data.name;
    if (data.topic !== undefined) this.topic = data.topic;
    if (data.nsfw !== undefined) this.nsfw = data.nsfw;
    if (data.last_message_id !== undefined)
      this.lastMessageId = data.last_message_id;
    if (data.bitrate !== undefined) this.bitrate = data.bitrate;
    if (data.user_limit !== undefined) this.userLimit = data.user_limit;
    if (data.rate_limit_per_user !== undefined)
      this.rateLimitPerUser = data.rate_limit_per_user;
    if (data.recipients !== undefined)
      this.recipients = data.recipients.map(
        (user) => new User(user, this.client)
      );
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.owner_id !== undefined) this.ownerId = data.owner_id;
    if (data.application_id !== undefined)
      this.applicationId = data.application_id;
    if (data.managed !== undefined) this.managed = data.managed;
    if (data.parent_id !== undefined) this.parentId = data.parent_id;
    if (data.last_pin_timestamp !== undefined)
      this.lastPinTimestamp = data.last_pin_timestamp;
    if (data.rtc_region !== undefined) this.rtcRegion = data.rtc_region;
    if (data.video_quality_mode !== undefined)
      this.videoQualityMode = data.video_quality_mode;
    if (data.message_count !== undefined)
      this.messageCount = data.message_count;
    if (data.member_count !== undefined) this.memberCount = data.member_count;
    if (data.thread_metadata !== undefined)
      this.threadMetadata = {
        archived: data.thread_metadata.archived,
        autoArchiveDuration: data.thread_metadata.auto_archive_duration,
        archiveTimestamp: data.thread_metadata.archive_timestamp,
        locked: data.thread_metadata.locked,
        invitable: data.thread_metadata?.invitable,
        createTimestamp: data.thread_metadata?.create_timestamp,
      };
    if (data.member !== undefined)
      this.member = {
        id: data.member?.id,
        userId: data.member?.user_id,
        joinTimestamp: data.member?.join_timestamp,
        flags: data.member?.flags,
        member:
          data.member?.member !== undefined
            ? new GuildMember(data.member?.member, this.client)
            : undefined,
      };
    if (data.default_auto_archive_duration !== undefined)
      this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    if (data.permissions !== undefined) this.permissions = data.permissions;
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.total_message_sent !== undefined)
      this.totalMessageSent = data.total_message_sent;
    if (data.available_tags !== undefined)
      this.availableTags = data.available_tags;
    if (data.applied_tags !== undefined) this.appliedTags = data.applied_tags;
    if (data.default_reaction_emoji !== undefined)
      this.defaultReactionEmoji = {
        emojiId: data.default_reaction_emoji?.emoji_id,
        emojiName: data.default_reaction_emoji?.emoji_name,
      } as JSONDefaultReaction;
    if (data.default_thread_rate_limit_per_user !== undefined)
      this.defaultThreadRateLimitPerUser =
        data.default_thread_rate_limit_per_user;
    if (data.default_sort_order !== undefined)
      this.defaultSortOrder = data.default_sort_order;
    if (data.default_forum_layout !== undefined)
      this.defaultForumLayout = data.default_forum_layout;
  }

  /* https://discord.com/developers/docs/resources/channel#modify-channel */
  public async modify(
    options: {
      name?: string | null;
      type?: ChannelTypes;
      position?: number;
      topic?: string | null;
      nsfw?: boolean;
      rateLimitPerUser?: number;
      icon?: string | null;
      bitrate?: number;
      userLimit?: number;
      permissionOverwrites?: Array<JSONOverwrite>;
      parentId?: string | null;
      rtcRegion?: string | null;
      videoQualityMode?: number;
      defaultAutoArchiveDuration?: number;
      flags?: number;
      availableTags?: Array<JSONForumTag>;
      defaultReactionEmoji?: JSONDefaultReaction | null;
      defaultThreadRateLimitPerUser?: number;
      defaultSortOrder?: number | null;
      defaultForumLayout?: number;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.request("PATCH", Endpoints.channel(this.id), {
        json: {
          name: options?.name,
          type: options?.type,
          position: options?.position,
          topic: options?.topic,
          nsfw: options?.nsfw,
          rate_limit_per_user: options?.rateLimitPerUser,
          bitrate: options?.bitrate,
          permission_overwrites: options?.permissionOverwrites,
          parent_id: options?.parentId,
          rtc_region: options?.rtcRegion,
          video_quality_mode: options?.videoQualityMode,
          default_auto_archive_duration: options?.defaultAutoArchiveDuration,
          flags: options?.flags,
          available_tags: options?.availableTags,
          default_reaction_emoji: options?.defaultReactionEmoji,
          default_thread_rate_limit_per_user:
            options?.defaultThreadRateLimitPerUser,
          default_sort_order: options?.defaultSortOrder,
          default_forum_layout: options?.defaultForumLayout,
        },
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#deleteclose-channel */
  public async delete(reason?: string): Promise<JSONChannel> {
    return new Channel(
      await this.client.rest.request("DELETE", Endpoints.channel(this.id), {
        reason,
      }),
      this.client
    ).toJSON();
  }

  /* https://discord.com/developers/docs/resources/channel#get-channel-messages */
  public async getMessages(options: {
    around?: string;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<Array<Message>> {
    return this.client.rest
      .request("GET", Endpoints.channelMessages(this.id), {
        query: {
          around: options?.around,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
        },
      })
      .then((response) =>
        response.map((data: RawMessage) => new Message(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/channel#get-channel-message */
  public async getMessage(): Promise<Message> {
    return new Message(
      await this.client.rest.request("GET", Endpoints.channelMessages(this.id)),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#create-message */
  public async createMessage(options: {
    content?: string;
    nonce?: string | number;
    tts?: boolean;
    embeds?: Array<JSONEmbed>;
    allowedMentions?: JSONAllowedMentions;
    messageReference?: JSONMessageReference;
    components?: Array<{
      type: ComponentTypes.ActionRow;
      components: Array<
        | {
            type: ComponentTypes.Button;
            style: number;
            label?: string;
            emoji?: JSONEmoji;
            customId?: string;
            url?: string;
            disabled?: boolean;
          }
        | {
            type:
              | ComponentTypes.SelectMenu
              | ComponentTypes.ChannelSelect
              | ComponentTypes.MentionableSelect
              | ComponentTypes.RoleSelect
              | ComponentTypes.UserSelect;
            customId: string;
            options?: Array<JSONSelectOption>;
            channelTypes?: Array<ChannelTypes>;
            placeholder?: string;
            minValues?: number;
            maxValues?: number;
            disabled?: boolean;
          }
        | {
            type: ComponentTypes.TextInput;
            customId: string;
            style: number;
            label: string;
            minLength?: number;
            maxLength?: number;
            required?: boolean;
            value?: string;
            placeholder?: string;
          }
      >;
    }>;
    stickersIds?: Array<string>;
    files?: Array<File>;
    attachments?: Array<JSONAttachment>;
    flags?: MessageFlags;
  }): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "POST",
        Endpoints.channelMessages(this.id),
        {
          json: {
            content: options?.content,
            nonce: options?.nonce,
            tts: options?.tts,
            embeds: options?.embeds,
            allowed_mentions: {
              parse: options.allowedMentions?.parse,
              roles: options.allowedMentions?.roles,
              users: options.allowedMentions?.users,
              replied_user: options.allowedMentions?.repliedUser,
            },
            message_reference: options?.messageReference,
            components:
              options?.components !== undefined
                ? messageComponentToRaw(options.components)
                : undefined,
            stickers_ids: options?.stickersIds,
            attachments: options?.attachments,
            flags: options?.flags,
          },
          files: options.files,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#crosspost-message */
  public async crosspostMessage(messageId: string): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "POST",
        Endpoints.channelMessage(this.id, messageId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#create-reaction */
  public async createReaction(messageId: string, emoji: string): Promise<void> {
    await this.client.rest.request(
      "PUT",
      Endpoints.channelMessageOwnReaction(this.id, messageId, emoji)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#delete-own-reaction */
  public async deleteOwnReaction(
    messageId: string,
    emoji: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelMessageOwnReaction(this.id, messageId, emoji)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#delete-user-reaction */
  public async deleteUserReaction(
    messageId: string,
    emoji: string,
    userId: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelMessageUserReaction(this.id, messageId, emoji, userId)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#get-reactions */
  public async getReactions(
    messageId: string,
    emoji: string,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<Array<User>> {
    return this.client.rest
      .request(
        "GET",
        Endpoints.channelMessageReaction(this.id, messageId, emoji),
        {
          query: {
            after: options?.after,
            limit: options?.limit,
          },
        }
      )
      .then((response) =>
        response.map((data: RawUser) => new User(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  public async deleteAllReactions(messageId: string): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelMessageAllReactions(this.id, messageId)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji */
  public async deleteAllReactionsForEmoji(
    messageId: string,
    emoji: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelMessageReaction(this.id, messageId, emoji)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#edit-message */
  public async editMessage(
    messageId: string,
    options: {
      content?: string | null;
      embeds?: Array<JSONEmbed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: JSONAllowedMentions | null;
      components?: Array<{
        type: ComponentTypes.ActionRow;
        components: Array<
          | {
              type: ComponentTypes.Button;
              style: number;
              label?: string;
              emoji?: JSONEmoji;
              customId?: string;
              url?: string;
              disabled?: boolean;
            }
          | {
              type:
                | ComponentTypes.SelectMenu
                | ComponentTypes.ChannelSelect
                | ComponentTypes.MentionableSelect
                | ComponentTypes.RoleSelect
                | ComponentTypes.UserSelect;
              customId: string;
              options?: Array<JSONSelectOption>;
              channelTypes?: Array<ChannelTypes>;
              placeholder?: string;
              minValues?: number;
              maxValues?: number;
              disabled?: boolean;
            }
          | {
              type: ComponentTypes.TextInput;
              customId: string;
              style: number;
              label: string;
              minLength?: number;
              maxLength?: number;
              required?: boolean;
              value?: string;
              placeholder?: string;
            }
        >;
      }> | null;
      files?: Array<File> | null;
      attachments?: Array<JSONAttachment> | null;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "PATCH",
        Endpoints.channelMessage(this.id, messageId),
        {
          json: {
            content: options?.content,
            embeds: options?.embeds,
            allowed_mentions: options?.allowedMentions,
            components:
              options?.components !== undefined
                ? options.components !== null
                  ? messageComponentToRaw(options.components)
                  : null
                : undefined,
            attachments: options?.attachments,
            flags: options?.flags,
          },
          files: options.files,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#delete-message */
  public async deleteMessage(
    messageId: string,
    reason?: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelMessage(this.id, messageId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
  public async bulkDeleteMessages(messagesIds: Array<string>): Promise<void> {
    await this.client.rest.request("POST", Endpoints.channelMessages(this.id), {
      json: {
        messages: messagesIds,
      },
    });
  }

  /* https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
  public async editChannelPermissions(
    overwriteId: string,
    options: {
      allow?: string | null;
      deny?: string | null;
      type: number;
    },
    reason?: string
  ): Promise<void> {
    await this.client.rest.request(
      "PUT",
      Endpoints.channelPermission(this.id, overwriteId),
      {
        json: options,
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#get-channel-invites */
  public async getChannelInvites(): Promise<Array<Invite>> {
    return this.client.rest
      .request("GET", Endpoints.channelInvites(this.id))
      .then((response) =>
        response.map((data: RawInvite) => new Invite(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/channel#create-channel-invite */
  public async createChannelInvite(
    options: {
      maxAge?: number;
      maxUses?: number;
      temporary?: boolean;
      unique?: boolean;
      targetType?: InviteTargetTypes;
      targetUserId?: string;
      targetApplicationId?: string;
    },
    reason?: string
  ): Promise<Invite> {
    return new Invite(
      await this.client.rest.request(
        "POST",
        Endpoints.channelInvites(this.id),
        {
          json: {
            max_age: options?.maxAge,
            max_uses: options?.maxUses,
            temporary: options?.temporary,
            unique: options?.unique,
            target_type: options?.targetType,
            target_user_id: options?.targetUserId,
            target_application_id: options?.targetApplicationId,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#delete-channel-permission */
  public async deleteChannelPermission(
    overwriteId: string,
    reason?: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelPermission(this.id, overwriteId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#follow-announcement-channel */
  public async followAnnouncementChannel(options: {
    webhookChannelId: string;
  }): Promise<JSONFollowedChannel> {
    const data = await this.client.rest.request(
      "POST",
      Endpoints.channelFollowers(this.id),
      {
        json: {
          webhook_channel_id: options.webhookChannelId,
        },
      }
    );

    return {
      channelId: data.id,
      webhookId: data.webhook_id,
    };
  }

  /* https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
  public async triggerTypingIndicator(): Promise<void> {
    await this.client.rest.request("POST", Endpoints.channelTyping(this.id));
  }

  /* https://discord.com/developers/docs/resources/channel#get-pinned-messages */
  public async getPinnedMessages(): Promise<Array<Message>> {
    return this.client.rest
      .request("GET", Endpoints.channelPins(this.id))
      .then((response) =>
        response.map((data: RawMessage) => new Message(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/channel#pin-message */
  public async pinMessage(messageId: string, reason?: string): Promise<void> {
    await this.client.rest.request(
      "PUT",
      Endpoints.channelPin(this.id, messageId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#unpin-message */
  public async unpinMessage(messageId: string, reason?: string): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelPin(this.id, messageId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
  public async groupDMAddRecipient(
    userId: string,
    options: {
      accessToken: string;
      nick: string;
    }
  ): Promise<void> {
    await this.client.rest.request(
      "PUT",
      Endpoints.channelRecipient(this.id, userId),
      {
        json: {
          access_token: options.accessToken,
          nick: options.nick,
        },
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
  public async groupDMRemoveRecipient(userId: string): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.channelRecipient(this.id, userId)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  public async startThreadFromMessage(
    messageId: string,
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.request(
        "POST",
        Endpoints.threads(this.id, messageId),
        {
          json: {
            name: options.name,
            auto_archive_duration: options?.autoArchiveDuration,
            rate_limit_per_user: options?.rateLimitPerUser,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#start-thread-without-message */
  public async startThreadWithoutMessage(
    options: {
      name: string;
      autoArchiveDuration: number;
      type?: ChannelTypes;
      invitable?: boolean;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.request("POST", Endpoints.threads(this.id), {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          type: options?.type,
          invitable: options?.invitable,
          rate_limit_per_user: options?.rateLimitPerUser,
        },
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel */
  public async startThreadInForumChannel(
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
      message: {
        content?: string | null;
        embeds?: Array<JSONEmbed> | null;
        allowedMentions?: JSONAllowedMentions | null;
        components?: Array<{
          type: ComponentTypes.ActionRow;
          components: Array<
            | {
                type: ComponentTypes.Button;
                style: number;
                label?: string;
                emoji?: JSONEmoji;
                customId?: string;
                url?: string;
                disabled?: boolean;
              }
            | {
                type:
                  | ComponentTypes.SelectMenu
                  | ComponentTypes.ChannelSelect
                  | ComponentTypes.MentionableSelect
                  | ComponentTypes.RoleSelect
                  | ComponentTypes.UserSelect;
                customId: string;
                options?: Array<JSONSelectOption>;
                channelTypes?: Array<ChannelTypes>;
                placeholder?: string;
                minValues?: number;
                maxValues?: number;
                disabled?: boolean;
              }
            | {
                type: ComponentTypes.TextInput;
                customId: string;
                style: number;
                label: string;
                minLength?: number;
                maxLength?: number;
                required?: boolean;
                value?: string;
                placeholder?: string;
              }
          >;
        }> | null;
        files?: Array<File> | null;
        attachments?: Array<JSONAttachment> | null;
        flags?: MessageFlags | null;
      };
      appliedTags?: Array<string>;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.request("POST", Endpoints.threads(this.id), {
        json: {
          name: options.name,
          auto_archive_duration: options?.autoArchiveDuration,
          rate_limit_per_user: options?.rateLimitPerUser,
          message: {
            content: options.message?.content,
            embeds: options.message?.embeds,
            flags: options.message?.flags,
            allowed_mentions: {
              parse: options.message?.allowedMentions?.parse,
              roles: options.message?.allowedMentions?.roles,
              users: options.message?.allowedMentions?.users,
              replied_user: options.message?.allowedMentions?.repliedUser,
            },
            components:
              options?.message.components !== undefined
                ? options.message.components !== null
                  ? messageComponentToRaw(options.message.components)
                  : null
                : undefined,
            attachments: options.message?.attachments,
          },
          applied_tags: options?.appliedTags,
        },
        files: options.message?.files,
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/channel#join-thread */
  public async joinThread(): Promise<void> {
    await this.client.rest.request(
      "PUT",
      Endpoints.threadMembers(this.id, "@me")
    );
  }

  /* https://discord.com/developers/docs/resources/channel#add-thread-member */
  public async addThreadMember(userId: string): Promise<void> {
    await this.client.rest.request(
      "PUT",
      Endpoints.threadMembers(this.id, userId)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#leave-thread */
  public async leaveThread(): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.threadMembers(this.id, "@me")
    );
  }

  /* https://discord.com/developers/docs/resources/channel#remove-thread-member */
  public async removeThreadMember(userId: string): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.threadMembers(this.id, userId)
    );
  }

  /* https://discord.com/developers/docs/resources/channel#get-thread-member */
  public async getThreadMember(
    userId: string,
    options?: {
      withMembers?: boolean;
    }
  ): Promise<JSONThreadMember> {
    const data: RawThreadMember = await this.client.rest.request(
      "GET",
      Endpoints.threadMembers(this.id, userId),
      {
        query: {
          with_members: options?.withMembers,
        },
      }
    );

    return {
      id: data?.id,
      userId: data?.user_id,
      joinTimestamp: data?.join_timestamp,
      flags: data?.flags,
      member:
        data?.member !== undefined
          ? new GuildMember(data?.member, this.client)
          : undefined,
    };
  }

  /* https://discord.com/developers/docs/resources/channel#list-thread-members */
  public async listThreadMembers(options?: {
    withMembers?: boolean;
    after?: string;
    limit?: number;
  }): Promise<Array<JSONThreadMember>> {
    return await this.client.rest.request(
      "GET",
      Endpoints.threadMembers(this.id),
      {
        query: {
          with_member: options?.withMembers,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );
  }

  /* https://discord.com/developers/docs/resources/channel#list-public-archived-threads */
  public async listPublicArchivedThreads(options?: {
    before?: number;
    limit?: number;
  }): Promise<{
    threads: Array<Channel>;
    members: Array<JSONThreadMember>;
    hasMore: boolean;
  }> {
    const data = await this.client.rest.request(
      "GET",
      Endpoints.channelPublicArchivedThreads(this.id),
      {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      }
    );

    return {
      threads: data.threads.map(
        (data: RawChannel) => new Channel(data, this.client)
      ),
      members: data.members.map((data: RawThreadMember) => ({
        id: data?.id,
        userId: data?.user_id,
        joinTimestamp: data?.join_timestamp,
        flags: data?.flags,
        member:
          data?.member !== undefined
            ? new GuildMember(data?.member, this.client)
            : undefined,
      })),
      hasMore: data.has_more,
    };
  }

  /* https://discord.com/developers/docs/resources/channel#list-public-archived-threads */
  public async listPrivateArchivedThreads(options?: {
    before?: number;
    limit?: number;
  }): Promise<{
    threads: Array<Channel>;
    members: Array<JSONThreadMember>;
    hasMore: boolean;
  }> {
    const data = await this.client.rest.request(
      "GET",
      Endpoints.channelPrivateArchivedThreads(this.id),
      {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      }
    );

    return {
      threads: data.threads.map(
        (data: RawChannel) => new Channel(data, this.client)
      ),
      members: data.members.map((data: RawThreadMember) => ({
        id: data?.id,
        userId: data?.user_id,
        joinTimestamp: data?.join_timestamp,
        flags: data?.flags,
        member:
          data?.member !== undefined
            ? new GuildMember(data?.member, this.client)
            : undefined,
      })),
      hasMore: data.has_more,
    };
  }

  /* https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads */
  public async listJoinedPrivateArchivedThreads(options?: {
    before?: number;
    limit?: number;
  }): Promise<{
    threads: Array<Channel>;
    members: Array<JSONThreadMember>;
    hasMore: boolean;
  }> {
    const data = await this.client.rest.request(
      "GET",
      Endpoints.channelJoinedPrivateArchivedThreads(this.id),
      {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      }
    );

    return {
      threads: data.threads.map(
        (data: RawChannel) => new Channel(data, this.client)
      ),
      members: data.members.map((data: RawThreadMember) => ({
        id: data?.id,
        userId: data?.user_id,
        joinTimestamp: data?.join_timestamp,
        flags: data?.flags,
        member:
          data?.member !== undefined
            ? new GuildMember(data?.member, this.client)
            : undefined,
      })),
      hasMore: data.has_more,
    };
  }

  /* https://discord.com/developers/docs/resources/webhook#create-webhook */
  public async createWebhook(
    options: {
      name: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    return new Webhook(
      await this.client.rest.request(
        "POST",
        Endpoints.channelWebhooks(this.id),
        {
          json: {
            name: options.name,
            avatar: options?.avatar,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
  public async getWebhooks(): Promise<Array<Webhook>> {
    return this.client.rest
      .request("GET", Endpoints.channelWebhooks(this.id))
      .then((response) =>
        response.map((data: RawWebhook) => new Webhook(data, this.client))
      );
  }

  public override toJSON(): JSONChannel {
    return {
      id: this.id,
      type: this.type,
      guildId: this.guildId,
      position: this.position,
      permissionOverwrites: this.permissionOverwrites,
      name: this.name,
      topic: this.topic,
      nsfw: this.nsfw,
      lastMessageId: this.lastMessageId,
      bitrate: this.bitrate,
      userLimit: this.userLimit,
      rateLimitPerUser: this.rateLimitPerUser,
      recipients: this.recipients,
      icon: this.icon,
      ownerId: this.ownerId,
      applicationId: this.applicationId,
      managed: this.managed,
      parentId: this.parentId,
      lastPinTimestamp: this.lastPinTimestamp,
      rtcRegion: this.rtcRegion,
      videoQualityMode: this.videoQualityMode,
      messageCount: this.messageCount,
      memberCount: this.memberCount,
      threadMetadata: this.threadMetadata,
      member: this.member,
      defaultAutoArchiveDuration: this.defaultAutoArchiveDuration,
      permissions: this.permissions,
      flags: this.flags,
      totalMessageSent: this.totalMessageSent,
      availableTags: this.availableTags,
      appliedTags: this.appliedTags,
      defaultReactionEmoji: this.defaultReactionEmoji,
      defaultThreadRateLimitPerUser: this.defaultThreadRateLimitPerUser,
      defaultSortOrder: this.defaultSortOrder,
      defaultForumLayout: this.defaultForumLayout,
    };
  }
}
