import { Base, Channel, GuildMember, Message, Role, User } from ".";
import type { Client } from "../class";
import { Endpoints, File } from "../rest";
import type {
  JSONAllowedMentions,
  JSONApplicationCommandData,
  JSONApplicationCommandOptionChoice,
  JSONAttachment,
  JSONEmbed,
  JSONEmoji,
  JSONInteraction,
  JSONMessageComponentData,
  JSONModalSubmitData,
  JSONSelectOption,
  RawInteraction,
} from "../types";
import {
  ChannelTypes,
  ComponentTypes,
  InteractionCallbackType,
  InteractionType,
  MessageFlags,
  emojiToJSON,
  messageComponentToRaw,
} from "../utils";

interface ActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<Button | SelectMenu | TextInput>;
}

interface Button {
  type: ComponentTypes.Button;
  style: number;
  label?: string;
  emoji?: JSONEmoji;
  customId?: string;
  url?: string;
  disabled?: boolean;
}

interface SelectMenu {
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

interface TextInput {
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

export class Interaction extends Base {
  public applicationId: string;
  public type: InteractionType;
  public data?: JSONApplicationCommandData &
    JSONMessageComponentData &
    JSONModalSubmitData;
  public guildId?: string;
  public channelId?: string;
  public member?: GuildMember;
  public user?: User;
  public token: string;
  public version: number;
  public message?: Message;
  public appPermissions?: string;
  public locale?: string;
  public guildLocale?: string;

  constructor(data: RawInteraction, client: Client) {
    super(data.id, client);

    this.applicationId = data.application_id;
    this.type = data.type;
    this.token = data.token;
    this.version = data.version;

    this.update(data);
  }

  protected override update(data: RawInteraction): void {
    if (data.data !== undefined)
      this.data = {
        id: data.data.id,
        name: data.data.name,
        type: data.data.type,
        resolved: {
          users: data.data.resolved?.users?.map(
            (user) => new User(user, this.client)
          ),
          members: data.data.resolved?.members?.map(
            (member) => new GuildMember(member, this.client)
          ),
          roles: data.data.resolved?.roles?.map(
            (roles) => new Role(roles, this.client)
          ),
          channels: data.data.resolved?.channels?.map(
            (channel) => new Channel(channel, this.client)
          ),
          messages: data.data.resolved?.messages?.map(
            (message) => new Message(message, this.client)
          ),
          attachments: data.data.resolved?.attachments?.map((attachment) => ({
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
          })),
        },
        options: data.data.options?.map((option) => ({
          name: option.name,
          type: option.type,
          value: option.value,
          options: option.options?.map((o) => ({
            name: o.name,
            type: o.type,
            value: o.value,
            focused: o.focused,
          })),
          focused: option.focused,
        })),
        guildId: data.data.guild_id,
        targetId: data.data.target_id,
        customId: data.data.custom_id,
        componentType: data.data.component_type,
        values: data.data.values?.map((value) => ({
          label: value.label,
          value: value.value,
          description: value.description,
          emoji:
            value.emoji !== undefined
              ? emojiToJSON(value.emoji, this.client)
              : undefined,
          default: value.default,
        })),
        components: data.data.components?.map((component) => ({
          type: component.type,
          components: component.components.map((c) => ({
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

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
  public async createResponse(options: {
    type: InteractionCallbackType;
    data: {
      tts?: boolean;
      content?: string;
      embeds?: Array<JSONEmbed>;
      allowedMentions?: JSONAllowedMentions;
      flags?: MessageFlags;
      components?: Array<ActionRow>;
      attachments?: Array<JSONAttachment>;
      choices?: Array<JSONApplicationCommandOptionChoice>;
      customId?: string;
      title?: string;
    };
  }): Promise<void> {
    switch (options.type) {
      case InteractionCallbackType.Pong:
        break;
      case InteractionCallbackType.ChannelMessageWithSource:
      case InteractionCallbackType.UpdateMessage:
        {
          await this.client.rest.request(
            "POST",
            Endpoints.interactionCallback(this.id, this.token),
            {
              json: {
                type: options.type,
                data: {
                  content: options.data.content,
                  embeds: options.data.embeds?.map((embed) => ({
                    title: embed.title,
                    type: embed.type,
                    description: embed.description,
                    url: embed.url,
                    timestamp: embed.timestamp,
                    color: embed.color,
                    footer: embed.footer,
                    image: {
                      url: embed.image?.url,
                      proxy_url: embed.image?.proxyUrl,
                      height: embed.image?.height,
                      width: embed.image?.width,
                    },
                    thumbnail: {
                      url: embed.thumbnail?.url,
                      proxy_url: embed.thumbnail?.proxyUrl,
                      height: embed.thumbnail?.height,
                      width: embed.thumbnail?.width,
                    },
                    video: {
                      url: embed.video?.url,
                      proxy_url: embed.video?.proxyUrl,
                      height: embed.video?.height,
                      width: embed.video?.width,
                    },
                    provider: {
                      name: embed.provider?.name,
                      url: embed.provider?.url,
                    },
                    author: {
                      name: embed.author?.name,
                      url: embed.author?.url,
                      icon_url: embed.author?.iconUrl,
                      proxy_icon_url: embed.author?.proxyIconUrl,
                    },
                    fields: embed.fields?.map((field) => ({
                      name: field.name,
                      value: field.value,
                      inline: field.inline,
                    })),
                  })),
                  allowed_mentions: {
                    parse: options.data.allowedMentions?.parse,
                    roles: options.data.allowedMentions?.roles,
                    users: options.data.allowedMentions?.users,
                    replied_user: options.data.allowedMentions?.repliedUser,
                  },
                  flags: options.data.flags,
                  components:
                    options.data.components !== undefined
                      ? messageComponentToRaw(options.data.components)
                      : undefined,
                  attachments: options.data.attachments,
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.ApplicationCommandAutocompleteResult:
        {
          await this.client.rest.request(
            "POST",
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
          await this.client.rest.request(
            "POST",
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
                            if (c.type === ComponentTypes.TextInput) {
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
    }
  }

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
  public async getOriginalResponse(options?: {
    threadId?: string;
  }): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "GET",
        Endpoints.interactionOriginalMessage(this.id, this.token),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
  public async editOriginalResponse(options: {
    threadId?: string;
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
  }): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "PATCH",
        Endpoints.interactionOriginalMessage(this.id, this.token),
        {
          query: {
            thread_id: options?.threadId,
          },
          json: {
            content: options?.content,
            embeds: options?.embeds,
            allowed_mentions: {
              parse: options?.allowedMentions?.parse,
              roles: options?.allowedMentions?.roles,
              users: options?.allowedMentions?.users,
              replied_user: options?.allowedMentions?.repliedUser,
            },
            components:
              options?.components !== undefined
                ? options.components !== null
                  ? messageComponentToRaw(options.components)
                  : null
                : undefined,
            attachments: options?.attachments,
            flags: options?.flags,
          },
          files: options?.files,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
  public async deleteOriginalResponse(): Promise<void> {
    this.client.rest.request(
      "DELETE",
      Endpoints.interactionOriginalMessage(this.id, this.token)
    );
  }

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
  public async createFollowupMessage(options: {
    content?: string | null;
    tts?: boolean;
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
    threadName?: string;
  }): Promise<void> {
    await this.client.rest.request(
      "POST",
      Endpoints.webhook(this.applicationId, this.token),
      {
        json: {
          content: options?.content,
          tts: options?.tts,
          embeds: options?.embeds,
          allowed_mentions: {
            parse: options?.allowedMentions?.parse,
            roles: options?.allowedMentions?.roles,
            users: options?.allowedMentions?.users,
            replied_user: options?.allowedMentions?.repliedUser,
          },
          components:
            options?.components !== undefined
              ? options.components !== null
                ? messageComponentToRaw(options.components)
                : null
              : undefined,
          attachments: options?.attachments,
          flags: options?.flags,
          thread_name: options?.threadName,
        },
        files: options?.files,
      }
    );
  }

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
  public async getFollowupMessage(
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "GET",
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

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
  public async editFollowupMessage(
    messageId: string,
    options: {
      threadId?: string;
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
        "POST",
        Endpoints.webhookMessage(this.applicationId, this.token, messageId),
        {
          query: {
            thread_id: options?.threadId,
          },
          json: {
            content: options?.content,
            embeds: options?.embeds,
            allowed_mentions: {
              parse: options?.allowedMentions?.parse,
              roles: options?.allowedMentions?.roles,
              users: options?.allowedMentions?.users,
              replied_user: options?.allowedMentions?.repliedUser,
            },
            components:
              options?.components !== undefined
                ? options.components !== null
                  ? messageComponentToRaw(options.components)
                  : null
                : undefined,
            attachments: options?.attachments,
            flags: options?.flags,
          },
          files: options?.files,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
  public async deleteFollowupMessage(messageId: string): Promise<void> {
    this.client.rest.request(
      "DELETE",
      Endpoints.webhookMessage(this.applicationId, this.token, messageId)
    );
  }

  public override toJSON(): JSONInteraction {
    return {
      id: this.id,
      applicationId: this.applicationId,
      type: this.type,
      data: this.data,
      guildId: this.guildId,
      channelId: this.channelId,
      member: this.member,
      user: this.user,
      token: this.token,
      version: this.version,
      message: this.message,
      appPermissions: this.appPermissions,
      locale: this.locale,
      guildLocale: this.guildLocale,
    };
  }
}
