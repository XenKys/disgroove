import { Application, Base, Channel, GuildMember, User } from ".";
import type { Client } from "..";
import { Endpoints, type File } from "../rest";
import type {
  JSONAllowedMentions,
  JSONAttachment,
  JSONChannelMention,
  JSONEmbed,
  JSONEmoji,
  JSONMessage,
  JSONMessageActivity,
  JSONMessageInteraction,
  JSONMessageReference,
  JSONReaction,
  JSONRoleSubscriptionData,
  JSONSelectOption,
  JSONSticker,
  JSONStickerItem,
  RawGuildMember,
  RawMessage,
  RawUser,
} from "../types";
import {
  type ChannelTypes,
  type ComponentTypes,
  type MessageFlags,
  embedToJSON,
  emojiToJSON,
  messageComponentToRaw,
  embedsToRaw,
} from "../utils";

export class Message extends Base {
  public channelId: string;
  public author?: User;
  public content?: string;
  public timestamp: string;
  public editedTimestamp?: string | null;
  public tts: boolean;
  public mentionEveryone: boolean;
  public mentions?: Array<User>;
  public mentionRoles?: Array<string>;
  public mentionChannels?: Array<JSONChannelMention>;
  public attachments?: Array<JSONAttachment>;
  public embeds?: Array<JSONEmbed>;
  public reactions?: Array<JSONReaction>;
  public nonce?: number | string;
  public pinned: boolean;
  public webhookId?: string;
  public type: number;
  public activity?: JSONMessageActivity;
  public application?: Application;
  public applicationId?: string;
  public messageReference?: JSONMessageReference;
  public flags?: number;
  public referencedMessage?: Message | null;
  public interaction?: JSONMessageInteraction;
  public thread?: Channel;
  public components?: Array<number>;
  public stickerItems?: Array<JSONStickerItem>;
  public stickers?: Array<JSONSticker>;
  public position?: number;
  public roleSubscriptionData?: JSONRoleSubscriptionData;
  public guildId?: string;
  public member?: GuildMember;

  constructor(
    data: RawMessage & {
      guild_id?: string;
      member?: RawGuildMember;
    },
    client: Client
  ) {
    super(data.id, client);

    this.channelId = data.channel_id;
    this.timestamp = data.timestamp;
    this.tts = data.tts;
    this.mentionEveryone = data.mention_everyone;
    this.pinned = data.pinned;
    this.type = data.type;

    this.update(data);
  }

  protected override update(
    data: RawMessage & {
      guild_id?: string;
      member?: RawGuildMember;
    }
  ): void {
    if (data.author !== undefined)
      this.author = new User(data.author, this.client);
    if (data.content !== undefined) this.content = data.content;
    if (data.edited_timestamp !== undefined)
      this.editedTimestamp = data.edited_timestamp;
    if (data.mentions !== undefined)
      this.mentions = data.mentions.map((user) => new User(user, this.client));
    if (data.mention_roles !== undefined)
      this.mentionRoles = data.mention_roles;
    if (data.mention_channels !== undefined)
      this.mentionChannels = data.mention_channels.map((mentionChannel) => ({
        id: mentionChannel.id,
        guildId: mentionChannel.guild_id,
        type: mentionChannel.type,
        name: mentionChannel.name,
      }));
    if (data.attachments !== undefined)
      this.attachments = data.attachments.map((attachment) => ({
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
      }));
    if (data.embeds !== undefined) this.embeds = embedToJSON(data.embeds);
    if (data.reactions !== undefined)
      this.reactions = data.reactions.map((reaction) => ({
        count: reaction.count,
        me: reaction.me,
        emoji: emojiToJSON(reaction.emoji, this.client),
      }));
    if (data.nonce !== undefined) this.nonce = data.nonce;
    if (data.webhook_id !== undefined) this.webhookId = data.webhook_id;
    if (data.activity !== undefined) this.activity = data.activity;
    if (data.application !== undefined)
      this.application = new Application(data.application, this.client);
    if (data.application_id !== undefined)
      this.applicationId = data.application_id;
    if (data.message_reference !== undefined) this.messageReference = {};
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
    if (data.components !== undefined) this.components = data.components;
    if (data.sticker_items !== undefined)
      this.stickerItems = data.sticker_items.map((stickerItem) => ({
        id: stickerItem.id,
        name: stickerItem.name,
        formatType: stickerItem.format_type,
      }));
    if (data.stickers !== undefined)
      this.stickers = data.stickers.map((sticker) => ({
        id: sticker.id,
        packId: sticker.pack_id,
        name: sticker.name,
        description: sticker.description,
        tags: sticker.tags,
        asset: sticker.asset,
        type: sticker.type,
        formatType: sticker.format_type,
        available: sticker.available,
        guildId: sticker.guild_id,
        user:
          sticker.user !== undefined
            ? new User(sticker.user, this.client)
            : undefined,
        sortValue: sticker.sort_value,
      }));
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
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.member !== undefined)
      this.member = new GuildMember(data.member, this.client);
  }

  /** https://discord.com/developers/docs/resources/channel#crosspost-message */
  public async crosspost(): Promise<Message> {
    return new Message(
      await this.client.rest.post(
        Endpoints.channelMessageCrosspost(this.channelId, this.id)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  public async createReaction(emoji: string): Promise<void> {
    this.client.rest.put(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  public async deleteOwnReaction(emoji: string): Promise<void> {
    this.client.rest.put(
      Endpoints.channelMessageOwnReaction(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  public async deleteUserReaction(
    emoji: string,
    userId: string
  ): Promise<void> {
    this.client.rest.put(
      Endpoints.channelMessageUserReaction(
        this.channelId,
        this.id,
        emoji,
        userId
      )
    );
  }

  /** https://discord.com/developers/docs/resources/channel#get-reactions */
  public async getReactions(
    emoji: string,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<Array<User>> {
    return this.client.rest
      .get(Endpoints.channelMessageReaction(this.channelId, this.id, emoji), {
        query: {
          after: options?.after,
          limit: options?.limit,
        },
      })
      .then((response) =>
        response.map((data: RawUser) => new User(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  public async deleteAllReactions(): Promise<void> {
    this.client.rest.delete(
      Endpoints.channelMessageAllReactions(this.channelId, this.id)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji */
  public async deleteAllReactionsForEmoji(emoji: string): Promise<void> {
    this.client.rest.delete(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message */
  public async edit(options: {
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
              | ComponentTypes.StringSelect
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
  }): Promise<Message> {
    return new Message(
      await this.client.rest.patch(
        Endpoints.channelMessage(this.channelId, this.id),
        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? embedsToRaw(options.embeds)
                  : null
                : undefined,
            allowed_mentions: options.allowedMentions,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? messageComponentToRaw(options.components)
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

  /** https://discord.com/developers/docs/resources/channel#delete-message */
  public async delete(reason?: string): Promise<void> {
    this.client.rest.delete(Endpoints.channelMessage(this.channelId, this.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  public async startThread(
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.post(Endpoints.threads(this.channelId, this.id), {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
        },
        reason,
      }),
      this.client
    );
  }

  public override toJSON(): JSONMessage & {
    guildId?: string;
    member?: GuildMember;
  } {
    return {
      id: this.id,
      channelId: this.channelId,
      author: this.author,
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
      application: this.application,
      applicationId: this.applicationId,
      messageReference: this.messageReference,
      flags: this.flags,
      referencedMessage: this.referencedMessage,
      interaction: this.interaction,
      thread: this.thread,
      components: this.components,
      stickerItems: this.stickerItems,
      stickers: this.stickers,
      position: this.position,
      roleSubscriptionData: this.roleSubscriptionData,
      guildId: this.guildId,
      member: this.member,
    };
  }
}
