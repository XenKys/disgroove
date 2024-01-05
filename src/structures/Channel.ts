import { Base, GuildMember, Invite, Message, User, Webhook } from ".";
import type { Client } from "../Client";
import { Endpoints, type File } from "../rest";
import type {
  JSONActionRow,
  JSONAllowedMentions,
  JSONAttachment,
  JSONChannel,
  JSONDefaultReaction,
  JSONEmbed,
  JSONFollowedChannel,
  JSONForumTag,
  JSONMessageReference,
  JSONOverwrite,
  JSONThreadMember,
  JSONThreadMetadata,
  RawChannel,
  RawFollowedChannel,
  RawInvite,
  RawMessage,
  RawThreadMember,
  RawUser,
  RawWebhook,
} from "../types";
import {
  type ChannelTypes,
  type InviteTargetTypes,
  type MessageFlags,
  ChannelFlags,
} from "../constants";

/** https://discord.com/developers/docs/resources/channel */
export class Channel extends Base {
  protected override raw: RawChannel & {
    newly_created?: boolean;
  };
  type: ChannelTypes;
  guildId?: string;
  position?: number;
  permissionOverwrites?: Array<JSONOverwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  lastMessageId?: string | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  recipients?: Array<User>;
  icon?: string | null;
  ownerId?: string;
  applicationId?: string;
  managed?: boolean;
  parentId?: string | null;
  lastPinTimestamp?: string | null;
  rtcRegion?: string | null;
  videoQualityMode?: number;
  messageCount?: number;
  memberCount?: number;
  threadMetadata?: JSONThreadMetadata;
  member?: JSONThreadMember;
  defaultAutoArchiveDuration?: number;
  permissions?: string;
  flags?: number;
  totalMessageSent?: number;
  availableTags?: Array<JSONForumTag>;
  appliedTags?: Array<string>;
  defaultReactionEmoji?: JSONDefaultReaction | null;
  defaultThreadRateLimitPerUser?: number;
  defaultSortOrder?: number | null;
  defaultForumLayout?: number;
  newlyCreated?: boolean;

  constructor(
    data: RawChannel & {
      newly_created?: boolean;
    },
    client: Client
  ) {
    super(data.id, client);

    this.raw = data;
    this.type = data.type;

    this.patch(data);
  }

  protected override patch(
    data: RawChannel & {
      newly_created?: boolean;
    }
  ): void {
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
        invitable: data.thread_metadata.invitable,
        createTimestamp: data.thread_metadata.create_timestamp,
      };
    if (data.member !== undefined)
      this.member = {
        id: data.member.id,
        userId: data.member.user_id,
        joinTimestamp: data.member.join_timestamp,
        flags: data.member.flags,
        member:
          data.member.member !== undefined
            ? new GuildMember(data.member.member, this.client).toJSON()
            : undefined,
      };
    if (data.default_auto_archive_duration !== undefined)
      this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    if (data.permissions !== undefined) this.permissions = data.permissions;
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.total_message_sent !== undefined)
      this.totalMessageSent = data.total_message_sent;
    if (data.available_tags !== undefined)
      this.availableTags = data.available_tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        moderated: tag.moderated,
        emojiId: tag.emoji_id,
        emojiName: tag.emoji_name,
      }));
    if (data.applied_tags !== undefined) this.appliedTags = data.applied_tags;
    if (data.default_reaction_emoji !== undefined)
      this.defaultReactionEmoji =
        data.default_reaction_emoji !== null
          ? {
              emojiId: data.default_reaction_emoji.emoji_id,
              emojiName: data.default_reaction_emoji.emoji_name,
            }
          : null;
    if (data.default_thread_rate_limit_per_user !== undefined)
      this.defaultThreadRateLimitPerUser =
        data.default_thread_rate_limit_per_user;
    if (data.default_sort_order !== undefined)
      this.defaultSortOrder = data.default_sort_order;
    if (data.default_forum_layout !== undefined)
      this.defaultForumLayout = data.default_forum_layout;
    if (data.newly_created !== undefined)
      this.newlyCreated = data.newly_created;
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
  addRecipient(
    userId: string,
    options: {
      accessToken: string;
      nick: string;
    }
  ): void {
    this.client.rest.put(Endpoints.channelRecipient(this.id, userId), {
      json: {
        access_token: options.accessToken,
        nick: options.nick,
      },
    });
  }

  /** https://discord.com/developers/docs/resources/channel#add-thread-member */
  addThreadMember(userId: string): void {
    this.client.rest.put(Endpoints.threadMembers(this.id, userId));
  }

  /** https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
  bulkDeleteMessages(
    options?: {
      messagesIds?: Array<string>;
    },
    reason?: string
  ): void {
    this.client.rest.post(Endpoints.channelBulkDelete(this.id), {
      json: {
        messages: options?.messagesIds,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#create-channel-invite */
  async createInvite(
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
      await this.client.rest.post<RawInvite>(
        Endpoints.channelInvites(this.id),
        {
          json: {
            max_age: options.maxAge,
            max_uses: options.maxUses,
            temporary: options.temporary,
            unique: options.unique,
            target_type: options.targetType,
            target_user_id: options.targetUserId,
            target_application_id: options.targetApplicationId,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-message */
  async createMessage(options: {
    content?: string;
    nonce?: string | number;
    tts?: boolean;
    embeds?: Array<JSONEmbed>;
    allowedMentions?: JSONAllowedMentions;
    messageReference?: JSONMessageReference;
    components?: Array<JSONActionRow>;
    stickersIds?: Array<string>;
    files?: Array<File>;
    attachments?: Array<JSONAttachment>;
    flags?: MessageFlags;
  }): Promise<Message> {
    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.channelMessages(this.id),
        {
          json: {
            content: options.content,
            nonce: options.nonce,
            tts: options.tts,
            embeds:
              options.embeds !== undefined
                ? this.client.util.embedsToRaw(options.embeds)
                : undefined,
            allowed_mentions: {
              parse: options.allowedMentions?.parse,
              roles: options.allowedMentions?.roles,
              users: options.allowedMentions?.users,
              replied_user: options.allowedMentions?.repliedUser,
            },
            message_reference: options.messageReference,
            components:
              options.components !== undefined
                ? this.client.util.messageComponentToRaw(options.components)
                : undefined,
            stickers_ids: options.stickersIds,
            attachments: options.attachments,
            flags: options.flags,
          },
          files: options.files,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  createReaction(messageId: string, emoji: string): void {
    this.client.rest.put(
      Endpoints.channelMessageReaction(this.id, messageId, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  async createThreadFromMessage(
    messageId: string,
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(
        Endpoints.threads(this.id, messageId),
        {
          json: {
            name: options.name,
            auto_archive_duration: options.autoArchiveDuration,
            rate_limit_per_user: options.rateLimitPerUser,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel */
  async createThreadInForumOrMediaChannel(
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
      message: {
        content?: string | null;
        embeds?: Array<JSONEmbed> | null;
        allowedMentions?: JSONAllowedMentions | null;
        components?: Array<JSONActionRow> | null;
        attachments?: Array<JSONAttachment> | null;
        flags?: MessageFlags | null;
      };
      appliedTags?: Array<string>;
      files?: Array<File> | null;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(Endpoints.threads(this.id), {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          message: {
            content: options.message.content,
            embeds: options.message.embeds,
            flags: options.message.flags,
            allowed_mentions: {
              parse: options.message.allowedMentions?.parse,
              roles: options.message.allowedMentions?.roles,
              users: options.message.allowedMentions?.users,
              replied_user: options.message.allowedMentions?.repliedUser,
            },
            components:
              options.message.components !== undefined
                ? options.message.components !== null
                  ? this.client.util.messageComponentToRaw(
                      options.message.components
                    )
                  : null
                : undefined,
            attachments: options.message.attachments,
          },
          applied_tags: options.appliedTags,
        },
        files: options.files,
        reason,
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-without-message */
  async createThreadWithoutMessage(
    options: {
      name: string;
      autoArchiveDuration?: number;
      type?: ChannelTypes;
      invitable?: boolean;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(Endpoints.threads(this.id), {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          type: options.type,
          invitable: options.invitable,
          rate_limit_per_user: options.rateLimitPerUser,
        },
        reason,
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#create-webhook */
  async createWebhook(
    options: {
      name: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    return new Webhook(
      await this.client.rest.post<RawWebhook>(
        Endpoints.channelWebhooks(this.id),
        {
          json: {
            name: options.name,
            avatar: options.avatar,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#crosspost-message */
  async crosspostMessage(messageId: string): Promise<Message> {
    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.channelMessage(this.id, messageId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#deleteclose-channel */
  async delete(reason?: string): Promise<JSONChannel> {
    return new Channel(
      await this.client.rest.delete<RawChannel>(Endpoints.channel(this.id), {
        reason,
      }),
      this.client
    ).toJSON();
  }

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  deleteAllReactions(messageId: string, emoji?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageAllReactions(this.id, messageId, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-message */
  deleteMessage(messageId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.channelMessage(this.id, messageId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#delete-channel-permission */
  deletePermission(overwriteId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.channelPermission(this.id, overwriteId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#delete-user-reaction */
  deleteReaction(messageId: string, emoji: string, userId?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageReaction(this.id, messageId, emoji, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#modify-channel */
  async edit(
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
      flags?: ChannelFlags;
      availableTags?: Array<JSONForumTag>;
      defaultReactionEmoji?: JSONDefaultReaction | null;
      defaultThreadRateLimitPerUser?: number;
      defaultSortOrder?: number | null;
      defaultForumLayout?: number;
      archived?: boolean;
      autoArchiveDuration?: number;
      locked?: boolean;
      invitable?: boolean;
      appliedTags?: Array<string>;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.patch<RawChannel>(Endpoints.channel(this.id), {
        json: {
          name: options.name,
          type: options.type,
          position: options.position,
          topic: options.topic,
          nsfw: options.nsfw,
          rate_limit_per_user: options.rateLimitPerUser,
          bitrate: options.bitrate,
          permission_overwrites: options.permissionOverwrites,
          parent_id: options.parentId,
          rtc_region: options.rtcRegion,
          video_quality_mode: options.videoQualityMode,
          default_auto_archive_duration: options.defaultAutoArchiveDuration,
          flags: options.flags,
          available_tags: options.availableTags,
          default_reaction_emoji: options.defaultReactionEmoji,
          default_thread_rate_limit_per_user:
            options.defaultThreadRateLimitPerUser,
          default_sort_order: options.defaultSortOrder,
          default_forum_layout: options.defaultForumLayout,
          archived: options.archived,
          auto_archive_duration: options.autoArchiveDuration,
          locked: options.locked,
          invitable: options.invitable,
          applied_tags: options.appliedTags,
        },
        reason,
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message */
  async editMessage(
    messageId: string,
    options: {
      content?: string | null;
      embeds?: Array<JSONEmbed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: JSONAllowedMentions | null;
      components?: Array<JSONActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<JSONAttachment> | null;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.patch<RawMessage>(
        Endpoints.channelMessage(this.id, messageId),
        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? this.client.util.embedsToRaw(options.embeds)
                  : null
                : undefined,
            allowed_mentions: options.allowedMentions,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? this.client.util.messageComponentToRaw(options.components)
                  : null
                : undefined,
            attachments: options.attachments,
            flags: options.flags,
          },
          files: options.files,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
  editPermissions(
    overwriteId: string,
    options: {
      allow?: string | null;
      deny?: string | null;
      type: number;
    },
    reason?: string
  ): void {
    this.client.rest.put(Endpoints.channelPermission(this.id, overwriteId), {
      json: options,
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#follow-announcement-channel */
  async follow(options: {
    webhookChannelId: string;
  }): Promise<JSONFollowedChannel> {
    return this.client.rest
      .post<RawFollowedChannel>(Endpoints.channelFollowers(this.id), {
        json: {
          webhook_channel_id: options.webhookChannelId,
        },
      })
      .then((response) => ({
        channelId: response.channel_id,
        webhookId: response.webhook_id,
      }));
  }

  /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads */
  async getArchivedThreads(
    archivedStatus: "public" | "private",
    options?: {
      before?: string;
      limit?: number;
    }
  ): Promise<{
    threads: Array<Channel>;
    members: Array<JSONThreadMember>;
    hasMore: boolean;
  }> {
    return this.client.rest
      .get<{
        threads: Array<RawChannel>;
        members: Array<RawThreadMember>;
        has_more: boolean;
      }>(Endpoints.channelThreads(this.id, archivedStatus, false), {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      })
      .then((response) => ({
        threads: response.threads.map((data) => new Channel(data, this.client)),
        members: response.members.map((data) => ({
          id: data.id,
          userId: data.user_id,
          joinTimestamp: data.join_timestamp,
          flags: data.flags,
          member:
            data.member !== undefined
              ? new GuildMember(data.member, this.client)
              : undefined,
        })),
        hasMore: response.has_more,
      }));
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-invites */
  async getInvites(): Promise<Array<Invite>> {
    return this.client.rest
      .get<Array<RawInvite>>(Endpoints.channelInvites(this.id))
      .then((response) =>
        response.map((data) => new Invite(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads */
  async getJoinedPrivateArchivedThreads(options?: {
    before?: string;
    limit?: number;
  }): Promise<{
    threads: Array<Channel>;
    members: Array<JSONThreadMember>;
    hasMore: boolean;
  }> {
    return this.client.rest
      .get<{
        threads: Array<RawChannel>;
        members: Array<RawThreadMember>;
        has_more: boolean;
      }>(Endpoints.channelThreads(this.id, "private", true), {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      })
      .then((response) => ({
        threads: response.threads.map((data) => new Channel(data, this.client)),
        members: response.members.map((data) => ({
          id: data.id,
          userId: data.user_id,
          joinTimestamp: data.join_timestamp,
          flags: data.flags,
          member:
            data.member !== undefined
              ? new GuildMember(data.member, this.client)
              : undefined,
        })),
        hasMore: response.has_more,
      }));
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-message */
  async getMessage(messageId: string): Promise<Message> {
    return new Message(
      await this.client.rest.get<RawMessage>(
        Endpoints.channelMessage(this.id, messageId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-messages */
  async getMessages(options: {
    around?: string;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<Array<Message>> {
    return this.client.rest
      .get<Array<RawMessage>>(Endpoints.channelMessages(this.id), {
        query: {
          around: options.around,
          before: options.before,
          after: options.after,
          limit: options.limit,
        },
      })
      .then((response) =>
        response.map((data) => new Message(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-pinned-messages */
  async getPinnedMessages(): Promise<Array<Message>> {
    return this.client.rest
      .get<Array<RawMessage>>(Endpoints.channelPins(this.id))
      .then((response) =>
        response.map((data) => new Message(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-reactions */
  async getReactions(
    messageId: string,
    emoji: string,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<Array<User>> {
    return this.client.rest
      .get<Array<RawUser>>(
        Endpoints.channelMessageAllReactions(this.id, messageId, emoji),
        {
          query: {
            after: options?.after,
            limit: options?.limit,
          },
        }
      )
      .then((response) => response.map((data) => new User(data, this.client)));
  }

  /** https://discord.com/developers/docs/resources/channel#get-thread-member */
  async getThreadMember(
    userId: string,
    options?: {
      withMember?: boolean;
    }
  ): Promise<JSONThreadMember> {
    return this.client.rest
      .get<RawThreadMember>(Endpoints.threadMembers(this.id, userId), {
        query: {
          with_member: options?.withMember,
        },
      })
      .then((response) => ({
        id: response.id,
        userId: response.user_id,
        joinTimestamp: response.join_timestamp,
        flags: response.flags,
        member:
          response.member !== undefined
            ? new GuildMember(response.member, this.client)
            : undefined,
      }));
  }

  /** https://discord.com/developers/docs/resources/channel#list-thread-members */
  async getThreadMembers(options?: {
    withMember?: boolean;
    after?: string;
    limit?: number;
  }): Promise<Array<JSONThreadMember>> {
    return this.client.rest
      .get<Array<RawThreadMember>>(Endpoints.threadMembers(this.id), {
        query: {
          with_member: options?.withMember,
          after: options?.after,
          limit: options?.limit,
        },
      })
      .then((response) =>
        response.map((data) => ({
          id: data.id,
          userId: data.user_id,
          joinTimestamp: data.join_timestamp,
          flags: data.flags,
          member:
            data.member !== undefined
              ? new GuildMember(data.member, this.client)
              : undefined,
        }))
      );
  }

  /** https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
  async getWebhooks(): Promise<Array<Webhook>> {
    return this.client.rest
      .get<Array<RawWebhook>>(Endpoints.channelWebhooks(this.id))
      .then((response) =>
        response.map((data) => new Webhook(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#join-thread */
  joinThread(): void {
    this.client.rest.put(Endpoints.threadMembers(this.id, "@me"));
  }

  /** https://discord.com/developers/docs/resources/channel#leave-thread */
  leaveThread(): void {
    this.client.rest.delete(Endpoints.threadMembers(this.id, "@me"));
  }

  /** https://discord.com/developers/docs/resources/channel#pin-message */
  pinMessage(messageId: string, reason?: string): void {
    this.client.rest.put(Endpoints.channelPin(this.id, messageId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
  removeRecipient(userId: string): void {
    this.client.rest.delete(Endpoints.channelRecipient(this.id, userId));
  }

  /** https://discord.com/developers/docs/resources/channel#remove-thread-member */
  removeThreadMember(userId: string): void {
    this.client.rest.delete(Endpoints.threadMembers(this.id, userId));
  }

  /** https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
  triggerTypingIndicator(): void {
    this.client.rest.post(Endpoints.channelTyping(this.id));
  }

  /** https://discord.com/developers/docs/resources/channel#unpin-message */
  unpinMessage(messageId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.channelPin(this.id, messageId), {
      reason,
    });
  }

  override toRaw(): RawChannel & {
    newly_created?: boolean;
  } {
    return this.raw;
  }

  override toJSON(): JSONChannel & {
    newlyCreated?: boolean;
  } {
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
      newlyCreated: this.newlyCreated,
    };
  }
}
