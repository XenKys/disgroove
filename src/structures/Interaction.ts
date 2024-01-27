import {
  Base,
  Channel,
  Entitlement,
  GuildMember,
  Message,
  Role,
  User,
} from ".";
import type { Client } from "../Client";
import { Endpoints, type File } from "../rest";
import type {
  JSONActionRow,
  JSONAllowedMentions,
  JSONApplicationCommandData,
  JSONAttachment,
  JSONEmbed,
  JSONInteraction,
  JSONInteractionResponse,
  JSONMessageComponentData,
  JSONModalSubmitData,
  RawInteraction,
  RawMessage,
} from "../types";
import {
  InteractionCallbackType,
  type InteractionType,
  type MessageFlags,
} from "../constants";

/** https://discord.com/developers/docs/interactions/receiving-and-responding */
export class Interaction extends Base {
  protected override raw: RawInteraction;
  applicationId: string;
  type: InteractionType;
  data?: JSONApplicationCommandData &
    JSONMessageComponentData &
    JSONModalSubmitData;
  guildId?: string;
  channel?: Channel;
  channelId?: string;
  member?: GuildMember;
  user?: User;
  token: string;
  version: number;
  message?: Message;
  appPermissions?: string;
  locale?: string;
  guildLocale?: string;
  entitlements: Array<Entitlement>;

  constructor(data: RawInteraction, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.applicationId = data.application_id;
    this.type = data.type;
    this.token = data.token;
    this.version = data.version;
    this.entitlements = data.entitlements.map(
      (entitlement) => new Entitlement(entitlement, this.client)
    );

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
              ? new Map(
                  Object.entries(data.data.resolved.users).map(([id, user]) => [
                    id,
                    new User(user, this.client).toJSON(),
                  ])
                )
              : undefined,
          members:
            data.data.resolved?.members !== undefined
              ? new Map(
                  Object.entries(data.data.resolved.members).map(
                    ([id, member]) => [
                      id,
                      new GuildMember(member, this.client).toJSON(),
                    ]
                  )
                )
              : undefined,
          roles:
            data.data.resolved?.roles !== undefined
              ? new Map(
                  Object.entries(data.data.resolved.roles).map(([id, role]) => [
                    id,
                    new Role(role, this.client).toJSON(),
                  ])
                )
              : undefined,
          channels:
            data.data.resolved?.channels !== undefined
              ? new Map(
                  Object.entries(data.data.resolved.channels).map(
                    ([id, channel]) => [
                      id,
                      new Channel(channel, this.client).toJSON(),
                    ]
                  )
                )
              : undefined,
          messages:
            data.data.resolved?.messages !== undefined
              ? new Map(
                  Object.entries(data.data.resolved.messages).map(
                    ([id, message]) => [
                      id,
                      new Message(message, this.client).toJSON(),
                    ]
                  )
                )
              : undefined,
          attachments:
            data.data.resolved?.attachments !== undefined
              ? new Map(
                  Object.entries(data.data.resolved.attachments).map(
                    ([id, attachment]) => [
                      id,
                      this.client.util.attachmentToJSON(attachment),
                    ]
                  )
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

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
  async createFollowupMessage(options: {
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
                  ? this.client.util.messageComponentsToRaw(options.components)
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

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
  createResponse(options: JSONInteractionResponse): void {
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
                  content: options.data?.content,
                  embeds:
                    options.data?.embeds !== undefined
                      ? this.client.util.embedsToRaw(options.data.embeds)
                      : undefined,
                  allowed_mentions: {
                    parse: options.data?.allowedMentions?.parse,
                    roles: options.data?.allowedMentions?.roles,
                    users: options.data?.allowedMentions?.users,
                    replied_user: options.data?.allowedMentions?.repliedUser,
                  },
                  flags: options.data?.flags,
                  components:
                    options.data?.components !== undefined
                      ? this.client.util.messageComponentsToRaw(
                          options.data.components
                        )
                      : undefined,
                  attachments: options.data?.attachments,
                },
              },
              files: options.data?.files,
            }
          );
        }
        break;
      case InteractionCallbackType.DeferredChannelMessageWithSource:
      case InteractionCallbackType.DeferredUpdateMessage:
        {
          this.client.rest.post(
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
                data: {
                  flags: options.data?.flags,
                },
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
                  choices: options.data?.choices?.map((choice) => ({
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
                  custom_id: options.data?.customId,
                  components:
                    options.data?.components !== undefined
                      ? this.client.util.messageComponentsToRaw(
                          options.data.components
                        )
                      : undefined,
                  title: options.data?.title,
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
                data: {},
              },
            }
          );
        }
        break;
    }
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
  deleteFollowupMessage(messageId: string): void {
    this.client.rest.delete(
      Endpoints.webhookMessage(this.applicationId, this.token, messageId)
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
  deleteResponse(): void {
    this.client.rest.delete(
      Endpoints.webhookMessage(this.applicationId, this.token)
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
  async editFollowupMessage(
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
                  ? this.client.util.messageComponentsToRaw(options.components)
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

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
  async editResponse(options: {
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
                  ? this.client.util.messageComponentsToRaw(options.components)
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

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
  async getFollowupMessage(
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

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
  async getResponse(options?: { threadId?: string }): Promise<Message> {
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

  override toRaw(): RawInteraction {
    return this.raw;
  }

  override toJSON(): JSONInteraction {
    return {
      ...super.toJSON(),
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
      entitlements: this.entitlements.map((entitlement) =>
        entitlement.toJSON()
      ),
    };
  }
}
