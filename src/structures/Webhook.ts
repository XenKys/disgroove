import { Channel, Guild, Message, User } from ".";
import type { Client } from "../class";
import { Endpoints, File } from "../rest";
import type {
  JSONAllowedMentions,
  JSONAttachment,
  JSONEmbed,
  JSONEmoji,
  JSONSelectOption,
  JSONWebhook,
  RawWebhook,
} from "../types";
import {
  ChannelTypes,
  ComponentTypes,
  MessageFlags,
  WebhookTypes,
  rawMessageComponent,
} from "../utils";

export class Webhook {
  private client!: Client;
  public id: string;
  public type: WebhookTypes;
  public guildId?: string | null;
  public channelId: string | null;
  public user?: User;
  public name: string | null;
  public avatar: string | null;
  public token?: string;
  public applicationId: string | null;
  public sourceGuild?: Guild;
  public sourceChannel?: Channel;
  public url?: string;

  constructor(data: RawWebhook, client: Client) {
    this.client = client;
    this.id = data.id;
    this.type = data.type;
    this.channelId = data.channel_id;
    this.name = data.name;
    this.avatar = data.avatar;
    this.applicationId = data.application_id;

    this.update(data);
  }

  protected update(data: RawWebhook): void {
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.token !== undefined) this.token = data.token;
    if (data.source_guild !== undefined)
      this.sourceGuild = new Guild(data.source_guild, this.client);
    if (data.source_channel !== undefined)
      this.sourceChannel = new Channel(data.source_channel, this.client);
    if (data.url !== undefined) this.url = data.url;
  }

  /* https://discord.com/developers/docs/resources/webhook#modify-webhook */
  public async modifyWebhook(
    options: {
      name?: string;
      avatar?: string | null;
      channelId?: string;
    },
    reason?: string
  ): Promise<Webhook> {
    return new Webhook(
      await this.client.rest.request("PATCH", Endpoints.webhook(this.id), {
        json: {
          name: options?.name,
          avatar: options?.avatar,
          channel_id: options?.channelId,
        },
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  public async modifyWithToken(
    token: string,
    options: {
      name?: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    return new Webhook(
      await this.client.rest.request(
        "PATCH",
        Endpoints.webhook(this.id, token),
        {
          json: {
            name: options?.name,
            avatar: options?.avatar,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#delete-webhook */
  public async delete(reason?: string): Promise<void> {
    this.client.rest.request("DELETE", Endpoints.webhook(this.id), {
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  public async deleteWithToken(token: string, reason?: string): Promise<void> {
    this.client.rest.request("DELETE", Endpoints.webhook(this.id, token), {
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/webhook#execute-webhook */
  public async execute(
    token: string,
    options: {
      wait?: boolean;
      threadId?: string;
      content?: string | null;
      username?: string;
      avatarURL?: string;
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
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "POST",
        Endpoints.webhook(this.id, token),
        {
          query: {
            wait: options?.wait,
            thread_id: options?.threadId,
            username: options?.username,
            avatarURL: options?.avatarURL,
          },
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
                  ? rawMessageComponent(options.components)
                  : null
                : undefined,
            attachments: options?.attachments,
            flags: options?.flags,
            thread_name: options?.threadName,
          },
          files: options?.files,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook */
  public async executeSlackCompatible(
    token: string,
    options: {
      threadId?: string;
      wait?: boolean;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "POST",
        Endpoints.webhook(this.id, token),
        {
          query: {
            thread_id: options?.threadId,
            wait: options?.wait,
          },
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook */
  public async executeGitHubCompatible(
    token: string,
    options: {
      threadId?: string;
      wait?: boolean;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "POST",
        Endpoints.webhook(this.id, token),
        {
          query: {
            thread_id: options?.threadId,
            wait: options?.wait,
          },
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#get-webhook-message */
  public async getMessage(
    token: string,
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<Message> {
    return new Message(
      await this.client.rest.request(
        "GET",
        Endpoints.webhookMessage(this.id, token, messageId),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
  public async editMessage(
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
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Message(
      await this.client.rest.request(
        "POST",
        Endpoints.webhookMessage(this.id, this.token, messageId),
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
                  ? rawMessageComponent(options.components)
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

  /* https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
  public async deleteMessage(
    token: string,
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<void> {
    this.client.rest.request(
      "DELETE",
      Endpoints.webhookMessage(this.id, token, messageId),
      {
        query: {
          thread_id: options?.threadId,
        },
      }
    );
  }

  public toJSON(): JSONWebhook {
    return {
      id: this.id,
      type: this.type,
      guildId: this.guildId,
      channelId: this.channelId,
      user: this.user,
      name: this.name,
      avatar: this.avatar,
      token: this.token,
      applicationId: this.applicationId,
      sourceGuild: this.sourceGuild,
      sourceChannel: this.sourceChannel,
      url: this.url,
    };
  }
}
