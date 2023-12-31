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
  JSONActionRow,
  JSONAllowedMentions,
  JSONAttachment,
  JSONChannelMention,
  JSONEmbed,
  JSONMessage,
  JSONMessageActivity,
  JSONMessageCreateEventExtraFields,
  JSONMessageInteraction,
  JSONMessageReference,
  JSONReaction,
  JSONRoleSubscriptionData,
  JSONStickerItem,
  RawChannel,
  RawMessage,
  RawMessageCreateEventExtraFields,
  RawUser,
} from "../types";
import { ComponentTypes, MessageFlags } from "../constants";

/** https://discord.com/developers/docs/resources/channel */
export class Message extends Base {
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
  type: number;
  activity?: JSONMessageActivity;
  application?: Application;
  applicationId?: string;
  messageReference?: JSONMessageReference;
  flags?: number;
  referencedMessage?: Message | null;
  interaction?: JSONMessageInteraction;
  thread?: Channel;
  components?: Array<JSONActionRow>;
  stickerItems?: Array<JSONStickerItem>;
  stickers?: Array<Sticker>;
  position?: number;
  roleSubscriptionData?: JSONRoleSubscriptionData;
  guildId?: string;
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
    this.editedTimestamp = null;
    this.mentions = data.mentions.map((user) => new User(user, this.client));
    this.mentionRoles = data.mention_roles;
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
    this.tts = data.tts;
    this.mentionEveryone = data.mention_everyone;
    this.pinned = data.pinned;
    this.type = data.type;

    this.patch(data);
  }

  protected override patch(
    data: RawMessage & Partial<RawMessageCreateEventExtraFields>
  ): void {
    this.editedTimestamp =
      data.edited_timestamp !== null ? data.edited_timestamp : null;
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
    if (data.components !== undefined)
      this.components = data.components.map((component) => ({
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
                minValues: c.min_values,
                maxValues: c.max_values,
                disabled: c.disabled,
              };
            }
          }
        }),
      }));
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
  async crosspost(): Promise<Message> {
    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.channelMessageCrosspost(this.channelId, this.id)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  createReaction(emoji: string): void {
    this.client.rest.put(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  deleteReaction(emoji: string, userId?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageReaction(this.channelId, this.id, emoji, userId)
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

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  deleteAllReactions(emoji?: string): void {
    this.client.rest.delete(
      Endpoints.channelMessageAllReactions(this.channelId, this.id, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message */
  async edit(options: {
    content?: string | null;
    embeds?: Array<JSONEmbed> | null;
    flags?: MessageFlags | null;
    allowedMentions?: JSONAllowedMentions | null;
    components?: Array<JSONActionRow> | null;
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
  delete(reason?: string): void {
    this.client.rest.delete(Endpoints.channelMessage(this.channelId, this.id), {
      reason,
    });
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

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  async startThread(
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

  override toRaw(): RawMessage & Partial<RawMessageCreateEventExtraFields> {
    return this.raw;
  }

  override toJSON(): JSONMessage & Partial<JSONMessageCreateEventExtraFields> {
    return {
      id: this.id,
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
