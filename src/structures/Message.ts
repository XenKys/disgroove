import {
  Application,
  Base,
  Channel,
  Emoji,
  GuildMember,
  Sticker,
  User,
} from ".";
import type { Client } from "../Client";
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
  JSONStickerItem,
  RawChannel,
  RawGuildMember,
  RawMessage,
  RawUser,
} from "../types";
import type { ChannelTypes, ComponentTypes, MessageFlags } from "../constants";

/** https://discord.com/developers/docs/resources/channel */
export class Message extends Base {
  protected override raw: RawMessage & {
    guild_id?: string;
    member?: RawGuildMember;
  };
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
  public stickers?: Array<Sticker>;
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

    this.raw = data;
    this.channelId = data.channel_id;
    this.timestamp = data.timestamp;
    this.tts = data.tts;
    this.mentionEveryone = data.mention_everyone;
    this.pinned = data.pinned;
    this.type = data.type;

    this.patch(data);
  }

  protected override patch(
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
    if (data.embeds !== undefined)
      this.embeds = data.embeds.map((embed) => ({
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
    if (data.reactions !== undefined)
      this.reactions = data.reactions.map((reaction) => ({
        count: reaction.count,
        me: reaction.me,
        emoji: new Emoji(reaction.emoji, this.client),
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
    if (data.components !== undefined) this.components = data.components;
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
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.member !== undefined)
      this.member = new GuildMember(data.member, this.client);
  }

  /** https://discord.com/developers/docs/resources/channel#crosspost-message */
  public async crosspost(): Promise<Message> {
    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.channelMessageCrosspost(this.channelId, this.id)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  public createReaction(emoji: string): void {
    this.client.rest.put(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  public deleteReaction(emoji: string, userId?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji, userId)
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

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  public deleteAllReactions(emoji?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageAllReactions(this.channelId, this.id, emoji)
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

  /** https://discord.com/developers/docs/resources/channel#delete-message */
  public delete(reason?: string): void {
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

  public override toRaw(): RawMessage & {
    guild_id?: string;
    member?: RawGuildMember;
  } {
    return this.raw;
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
