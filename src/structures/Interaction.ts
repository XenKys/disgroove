import { Base, Channel, GuildMember, Message, Role, User } from ".";
import type { Client } from "../Client";
import { Endpoints, type File } from "../rest";
import type {
  JSONActionRow,
  JSONAllowedMentions,
  JSONApplicationCommandData,
  JSONApplicationCommandOptionChoice,
  JSONAttachment,
  JSONEmbed,
  JSONEntitlement,
  JSONInteraction,
  JSONMessageComponentData,
  JSONModalSubmitData,
  RawInteraction,
  RawMessage,
} from "../types";
import {
  ComponentTypes,
  InteractionCallbackType,
  type InteractionType,
  type MessageFlags,
} from "../constants";

/** https://discord.com/developers/docs/interactions/receiving-and-responding */
export class Interaction extends Base {
  protected override raw: RawInteraction;
  public applicationId: string;
  public type: InteractionType;
  public data?: JSONApplicationCommandData &
    JSONMessageComponentData &
    JSONModalSubmitData;
  public guildId?: string;
  public channel?: Channel;
  public channelId?: string;
  public member?: GuildMember;
  public user?: User;
  public token: string;
  public version: number;
  public message?: Message;
  public appPermissions?: string;
  public locale?: string;
  public guildLocale?: string;
  public entitlements: Array<JSONEntitlement>;

  constructor(data: RawInteraction, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.applicationId = data.application_id;
    this.type = data.type;
    this.token = data.token;
    this.version = data.version;
    this.entitlements = data.entitlements.map((entitlement) => ({
      id: entitlement.id,
      skuId: entitlement.sku_id,
      applicationId: entitlement.application_id,
      userId: entitlement.user_id,
      promotionId: entitlement.promotion_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      giftCodeFlags: entitlement.gift_code_flags,
      consumed: entitlement.consumed,
      startsAt: entitlement.starts_at,
      endsAt: entitlement.ends_at,
      guildId: entitlement.guild_id,
      subscriptionId: entitlement.subscription_id,
    }));

    this.patch(data);
  }

  protected override patch(data: RawInteraction): void {
    if (data.data !== undefined)
      this.data = {
        id: data.data.id,
        name: data.data.name,
        type: data.data.type,
        resolved: {
          users:
            data.data.resolved?.users !== undefined
              ? Object.values(data.data.resolved?.users).map(
                  (user) => new User(user, this.client)
                )
              : undefined,
          members:
            data.data.resolved?.members !== undefined
              ? Object.values(data.data.resolved?.members).map(
                  (member) => new GuildMember(member, this.client)
                )
              : undefined,
          roles:
            data.data.resolved?.roles !== undefined
              ? Object.values(data.data.resolved?.roles).map(
                  (role) => new Role(role, this.client)
                )
              : undefined,
          channels:
            data.data.resolved?.channels !== undefined
              ? Object.values(data.data.resolved?.channels).map(
                  (channel) => new Channel(channel, this.client)
                )
              : undefined,
          messages:
            data.data.resolved?.messages !== undefined
              ? Object.values(data.data.resolved?.messages).map(
                  (message) => new Message(message, this.client)
                )
              : undefined,
          attachments:
            data.data.resolved?.attachments !== undefined
              ? Object.values(data.data.resolved?.attachments).map(
                  (attachment) => ({
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
                  })
                )
              : undefined,
        },
        options: data.data.options,
        guildId: data.data.guild_id,
        targetId: data.data.target_id,
        customId: data.data.custom_id,
        componentType: data.data.component_type,
        values: data.data.values,
        components: data.data.components?.map((component) => ({
          type: component.type,
          components: component.components?.map((c) => ({
            type: c.type,
            customId: c.custom_id,
            style: c.style,
            label: c.label,
            minLength: c.min_length,
            maxLength: c.max_length,
            required: c.required,
            value: c.value,
            placeholder: c.placeholder,
          })),
        })),
      };
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.channel !== undefined)
      this.channel = new Channel(data.channel, this.client);
    if (data.channel_id !== undefined) this.channelId = data.channel_id;
    if (data.member !== undefined)
      this.member = new GuildMember(data.member, this.client);
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.message !== undefined)
      this.message = new Message(data.message, this.client);
    if (data.app_permissions !== undefined)
      this.appPermissions = data.app_permissions;
    if (data.locale !== undefined) this.locale = data.locale;
    if (data.guild_locale !== undefined) this.guildLocale = data.guild_locale;
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
  public createResponse(options: {
    type: InteractionCallbackType;
    data: {
      tts?: boolean;
      content?: string;
      embeds?: Array<JSONEmbed>;
      allowedMentions?: JSONAllowedMentions;
      flags?: MessageFlags;
      components?: Array<JSONActionRow>;
      attachments?: Array<JSONAttachment>;
      choices?: Array<JSONApplicationCommandOptionChoice>;
      customId?: string;
      title?: string;
    };
  }): void {
    switch (options.type) {
      case InteractionCallbackType.ChannelMessageWithSource:
      case InteractionCallbackType.UpdateMessage:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
                data: {
                  content: options.data.content,
                  embeds:
                    options.data.embeds !== undefined
                      ? this.client.util.embedsToRaw(options.data.embeds)
                      : undefined,
                  allowed_mentions: {
                    parse: options.data.allowedMentions?.parse,
                    roles: options.data.allowedMentions?.roles,
                    users: options.data.allowedMentions?.users,
                    replied_user: options.data.allowedMentions?.repliedUser,
                  },
                  flags: options.data.flags,
                  components:
                    options.data.components !== undefined
                      ? this.client.util.messageComponentToRaw(
                          options.data.components
                        )
                      : undefined,
                  attachments: options.data.attachments,
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.DeferredChannelMessageWithSource:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
                data: {
                  flags: options.data.flags,
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.DeferredUpdateMessage:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
              },
            }
          );
        }
        break;
      case InteractionCallbackType.ApplicationCommandAutocompleteResult:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
                data: {
                  choices: options.data.choices?.map((choice) => ({
                    name: choice.name,
                    name_localizations: choice.nameLocalizations,
                    value: choice.value,
                  })),
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.Modal:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
                data: {
                  custom_id: options.data.customId,
                  components:
                    options.data.components !== undefined
                      ? options.data.components.map((component) => ({
                          type: component.type,
                          components: component.components.map((c) => {
                            switch (c.type) {
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
                            }
                          }),
                        }))
                      : undefined,
                  title: options.data.title,
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.PremiumRequired:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
              },
            }
          );
        }
        break;
    }
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
  public async getResponse(options?: { threadId?: string }): Promise<Message> {
    return new Message(
      await this.client.rest.get<RawMessage>(
        Endpoints.webhookMessage(this.applicationId, this.token),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
  public async editResponse(options: {
    threadId?: string;
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
        Endpoints.webhookMessage(this.applicationId, this.token),

        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? this.client.util.embedsToRaw(options.embeds)
                  : null
                : undefined,
            allowed_mentions: {
              parse: options.allowedMentions?.parse,
              roles: options.allowedMentions?.roles,
              users: options.allowedMentions?.users,
              replied_user: options.allowedMentions?.repliedUser,
            },
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
          query: {
            thread_id: options.threadId,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
  public deleteResponse(): void {
    this.client.rest.delete(
      Endpoints.webhookMessage(this.applicationId, this.token)
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
  public async createFollowupMessage(options: {
    content?: string | null;
    tts?: boolean;
    embeds?: Array<JSONEmbed> | null;
    allowedMentions?: JSONAllowedMentions | null;
    components?: Array<JSONActionRow> | null;
    files?: Array<File> | null;
    attachments?: Array<JSONAttachment> | null;
    flags?: MessageFlags | null;
    threadName?: string;
  }): Promise<Message> {
    return new Message(
      await this.client.rest.post(
        Endpoints.webhook(this.applicationId, this.token),
        {
          json: {
            content: options.content,
            tts: options.tts,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? this.client.util.embedsToRaw(options.embeds)
                  : null
                : undefined,
            allowed_mentions: {
              parse: options.allowedMentions?.parse,
              roles: options.allowedMentions?.roles,
              users: options.allowedMentions?.users,
              replied_user: options.allowedMentions?.repliedUser,
            },
            components:
              options.components !== undefined
                ? options.components !== null
                  ? this.client.util.messageComponentToRaw(options.components)
                  : null
                : undefined,
            attachments: options.attachments,
            flags: options.flags,
            thread_name: options.threadName,
          },
          files: options.files,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
  public async getFollowupMessage(
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.get<RawMessage>(
        Endpoints.webhookMessage(this.applicationId, this.token, messageId),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
  public async editFollowupMessage(
    messageId: string,
    options: {
      threadId?: string;
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
      await this.client.rest.post<RawMessage>(
        Endpoints.webhookMessage(this.applicationId, this.token, messageId),

        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? this.client.util.embedsToRaw(options.embeds)
                  : null
                : undefined,
            allowed_mentions: {
              parse: options.allowedMentions?.parse,
              roles: options.allowedMentions?.roles,
              users: options.allowedMentions?.users,
              replied_user: options.allowedMentions?.repliedUser,
            },
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
          query: {
            thread_id: options.threadId,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
  public deleteFollowupMessage(messageId: string): void {
    this.client.rest.delete(
      Endpoints.webhookMessage(this.applicationId, this.token, messageId)
    );
  }

  public override toRaw(): RawInteraction {
    return this.raw;
  }

  public override toJSON(): JSONInteraction {
    return {
      id: this.id,
      applicationId: this.applicationId,
      type: this.type,
      data: this.data,
      guildId: this.guildId,
      channel: this.channel?.toJSON(),
      channelId: this.channelId,
      member: this.member?.toJSON(),
      user: this.user?.toJSON(),
      token: this.token,
      version: this.version,
      message: this.message?.toJSON(),
      appPermissions: this.appPermissions,
      locale: this.locale,
      guildLocale: this.guildLocale,
      entitlements: this.entitlements,
    };
  }
}
