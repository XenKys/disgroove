import {
  Application,
  IdentifiableBase,
  Channel,
  Emoji,
  GuildMember,
  Role,
  Sticker,
  User,
} from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  CreateThreadFromMessageParams,
  EditMessageParams,
  JSONActionRow,
  JSONAttachment,
  JSONChannelMention,
  JSONEmbed,
  JSONMessage,
  JSONMessageActivity,
  JSONMessageCreateEventExtraFields,
  JSONMessageInteraction,
  JSONMessageReference,
  JSONReaction,
  JSONResolvedData,
  JSONRoleSubscriptionData,
  JSONStickerItem,
  RawChannel,
  RawMessage,
  RawMessageCreateEventExtraFields,
  RawUser,
} from "../types";
import { MessageFlags, MessageTypes } from "../constants";
import { Collection } from "../utils";

/** https://discord.com/developers/docs/resources/channel */
export class Message extends IdentifiableBase {
  protected override raw: RawMessage &
    Partial<RawMessageCreateEventExtraFields>;

  channelId: string;
  author: User;
  content: string;
  timestamp: string;
  editedTimestamp: string | null;
  tts: boolean;
  mentionEveryone: boolean;
  mentions: Array<User>;
  mentionRoles: Array<string>;
  mentionChannels?: Array<JSONChannelMention>;
  attachments: Array<JSONAttachment>;
  embeds: Array<JSONEmbed>;
  reactions?: Array<JSONReaction>;
  nonce?: number | string;
  pinned: boolean;
  webhookId?: string;
  type: MessageTypes;
  activity?: JSONMessageActivity;
  application?: Application;
  applicationId?: string;
  messageReference?: JSONMessageReference;
  flags?: MessageFlags;
  referencedMessage?: Message | null;
  interaction?: JSONMessageInteraction;
  thread?: Channel;
  components?: Array<JSONActionRow>;
  stickerItems?: Array<JSONStickerItem>;
  stickers?: Array<Sticker>;
  position?: number;
  roleSubscriptionData?: JSONRoleSubscriptionData;
  resolved?: JSONResolvedData;

  /** Only for MESSAGE_CREATE and MESSAGE_UPDATE gateway event */
  guildId?: string;
  /** Only for MESSAGE_CREATE and MESSAGE_UPDATE gateway event */
  member?: GuildMember;

  constructor(
    data: RawMessage & Partial<RawMessageCreateEventExtraFields>,
    client: Client
  ) {
    super(data.id, client);

    this.raw = data;
    this.channelId = data.channel_id;
    this.author = new User(data.author, this.client);
    this.content = data.content;
    this.timestamp = data.timestamp;
    this.editedTimestamp =
      data.edited_timestamp !== null ? data.edited_timestamp : null;
    this.mentions = data.mentions.map((user) => new User(user, this.client));
    this.mentionRoles = data.mention_roles;
    this.attachments = data.attachments.map((attachment) =>
      this.client.util.attachmentToJSON(attachment)
    );
    this.embeds = this.client.util.embedsToJSON(data.embeds);
    this.tts = data.tts;
    this.mentionEveryone = data.mention_everyone;
    this.pinned = data.pinned;
    this.type = data.type;

    this.patch(data);
  }

  protected override patch(
    data: RawMessage & Partial<RawMessageCreateEventExtraFields>
  ): void {
    if (data.mention_channels !== undefined)
      this.mentionChannels = data.mention_channels.map((mentionChannel) => ({
        id: mentionChannel.id,
        guildId: mentionChannel.guild_id,
        type: mentionChannel.type,
        name: mentionChannel.name,
      }));
    if (data.reactions !== undefined)
      this.reactions = data.reactions.map((reaction) => ({
        count: reaction.count,
        countDetails: reaction.count_details,
        me: reaction.me,
        meBurst: reaction.me_burst,
        emoji: new Emoji(reaction.emoji, this.client).toJSON(),
        burstColors: reaction.burst_colors,
      }));
    if (data.nonce !== undefined) this.nonce = data.nonce;
    if (data.webhook_id !== undefined) this.webhookId = data.webhook_id;
    if (data.activity !== undefined) this.activity = data.activity;
    if (data.application !== undefined)
      this.application = new Application(data.application, this.client);
    if (data.application_id !== undefined)
      this.applicationId = data.application_id;
    if (data.message_reference !== undefined)
      this.messageReference = {
        messageId: data.message_reference.message_id,
        channelId: data.message_reference.channel_id,
        guildId: data.message_reference.guild_id,
        failIfNotExists: data.message_reference.fail_if_not_exists,
      };
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.referenced_message !== undefined)
      this.referencedMessage =
        data.referenced_message !== null
          ? new Message(data.referenced_message, this.client)
          : null;
    if (data.interaction !== undefined)
      this.interaction = {
        id: data.interaction.id,
        type: data.interaction.type,
        name: data.interaction.name,
        user: new User(data.interaction.user, this.client),
        member:
          data.interaction.member !== undefined
            ? new GuildMember(data.interaction.member, this.client)
            : undefined,
      };
    if (data.thread !== undefined)
      this.thread = new Channel(data.thread, this.client);
    if (data.components !== undefined)
      this.components = this.client.util.messageComponentsToJSON(
        data.components
      );
    if (data.sticker_items !== undefined)
      this.stickerItems = data.sticker_items.map((stickerItem) => ({
        id: stickerItem.id,
        name: stickerItem.name,
        formatType: stickerItem.format_type,
      }));
    if (data.stickers !== undefined)
      this.stickers = data.stickers.map(
        (sticker) => new Sticker(sticker, this.client)
      );
    if (data.position !== undefined) this.position = data.position;
    if (data.role_subscription_data !== undefined)
      this.roleSubscriptionData = {
        roleSubscriptionListingId:
          data.role_subscription_data.role_subscription_listing_id,
        tierName: data.role_subscription_data.tier_name,
        totalMonthsSubscribed:
          data.role_subscription_data.total_months_subscribed,
        isRenewal: data.role_subscription_data.is_renewal,
      };
    if (data.resolved !== undefined)
      this.resolved = {
        users:
          data.resolved?.users !== undefined
            ? new Collection(
                Object.entries(data.resolved.users).map(([id, user]) => [
                  id,
                  new User(user, this.client).toJSON(),
                ])
              )
            : undefined,
        members:
          data.resolved?.members !== undefined
            ? new Collection(
                Object.entries(data.resolved.members).map(([id, member]) => [
                  id,
                  new GuildMember(member, this.client).toJSON(),
                ])
              )
            : undefined,
        roles:
          data.resolved?.roles !== undefined
            ? new Collection(
                Object.entries(data.resolved.roles).map(([id, role]) => [
                  id,
                  new Role(role, this.client).toJSON(),
                ])
              )
            : undefined,
        channels:
          data.resolved?.channels !== undefined
            ? new Collection(
                Object.entries(data.resolved.channels).map(([id, channel]) => [
                  id,
                  new Channel(channel, this.client).toJSON(),
                ])
              )
            : undefined,
        messages:
          data.resolved?.messages !== undefined
            ? new Collection(
                Object.entries(data.resolved.messages).map(([id, message]) => [
                  id,
                  new Message(message, this.client).toJSON(),
                ])
              )
            : undefined,
        attachments:
          data.resolved?.attachments !== undefined
            ? new Collection(
                Object.entries(data.resolved.attachments).map(
                  ([id, attachment]) => [
                    id,
                    this.client.util.attachmentToJSON(attachment),
                  ]
                )
              )
            : undefined,
      };
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.member !== undefined)
      this.member = new GuildMember(data.member, this.client);
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  createReaction(emoji: string): void {
    this.client.rest.put(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  async createThread(
    options: CreateThreadFromMessageParams,
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(
        Endpoints.threads(this.channelId, this.id),
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

  /** https://discord.com/developers/docs/resources/channel#crosspost-message */
  async crosspost(): Promise<Message> {
    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.channelMessageCrosspost(this.channelId, this.id)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-message */
  delete(reason?: string): void {
    this.client.rest.delete(Endpoints.channelMessage(this.channelId, this.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  deleteAllReactions(emoji?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageAllReactions(this.channelId, this.id, emoji)
    );
  }

  /**
   * https://discord.com/developers/docs/resources/channel#delete-own-reaction
   * https://discord.com/developers/docs/resources/channel#delete-user-reaction
   */
  deleteReaction(emoji: string, userId?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message */
  async edit(options: EditMessageParams): Promise<Message> {
    return new Message(
      await this.client.rest.patch<RawMessage>(
        Endpoints.channelMessage(this.channelId, this.id),
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
                  ? this.client.util.messageComponentsToRaw(options.components)
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

  /** https://discord.com/developers/docs/resources/channel#get-reactions */
  async getReactions(
    emoji: string,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<Array<User>> {
    return this.client.rest
      .get<Array<RawUser>>(
        Endpoints.channelMessageAllReactions(this.channelId, this.id, emoji),
        {
          query: {
            after: options?.after,
            limit: options?.limit,
          },
        }
      )
      .then((response) => response.map((data) => new User(data, this.client)));
  }

  /** https://discord.com/developers/docs/resources/channel#pin-message */
  pin(reason?: string): void {
    this.client.rest.put(Endpoints.channelPin(this.channelId, this.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#unpin-message */
  unpin(reason?: string): void {
    this.client.rest.delete(Endpoints.channelPin(this.channelId, this.id), {
      reason,
    });
  }

  override toRaw(): RawMessage & Partial<RawMessageCreateEventExtraFields> {
    return this.raw;
  }

  override toJSON(): JSONMessage & Partial<JSONMessageCreateEventExtraFields> {
    return {
      ...super.toJSON(),
      channelId: this.channelId,
      author: this.author.toJSON(),
      content: this.content,
      timestamp: this.timestamp,
      editedTimestamp: this.editedTimestamp,
      tts: this.tts,
      mentionEveryone: this.mentionEveryone,
      mentions: this.mentions,
      mentionRoles: this.mentionRoles,
      mentionChannels: this.mentionChannels,
      attachments: this.attachments,
      embeds: this.embeds,
      reactions: this.reactions,
      nonce: this.nonce,
      pinned: this.pinned,
      webhookId: this.webhookId,
      type: this.type,
      activity: this.activity,
      application: this.application?.toJSON(),
      applicationId: this.applicationId,
      messageReference: this.messageReference,
      flags: this.flags,
      referencedMessage: this.referencedMessage?.toJSON(),
      interaction: this.interaction,
      thread: this.thread,
      components: this.components,
      stickerItems: this.stickerItems,
      stickers: this.stickers,
      position: this.position,
      roleSubscriptionData: this.roleSubscriptionData,
      guildId: this.guildId,
      member: this.member?.toJSON(),
    };
  }
}
