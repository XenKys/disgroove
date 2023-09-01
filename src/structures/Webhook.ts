import { Base, Channel, Guild, Message, User } from ".";
import type { Client } from "../Client";
import { Endpoints, type File } from "../rest";
import type {
  JSONAllowedMentions,
  JSONAttachment,
  JSONEmbed,
  JSONEmoji,
  JSONSelectOption,
  JSONWebhook,
  RawMessage,
  RawWebhook,
} from "../types";
import type {
  ChannelTypes,
  ComponentTypes,
  MessageFlags,
  WebhookTypes,
} from "../constants";

/** https://discord.com/developers/docs/resources/webhook */
export class Webhook extends Base {
  protected override raw: RawWebhook;
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
    super(data.id, client);

    this.raw = data;
    this.type = data.type;
    this.channelId = data.channel_id;
    this.name = data.name;
    this.avatar = data.avatar;
    this.applicationId = data.application_id;

    this.patch(data);
  }

  protected override patch(data: RawWebhook): void {
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.token !== undefined) this.token = data.token;
    if (data.source_guild !== undefined)
      this.sourceGuild = new Guild(data.source_guild, this.client);
    if (data.source_channel !== undefined)
      this.sourceChannel = new Channel(data.source_channel, this.client);
    if (data.url !== undefined) this.url = data.url;
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook */
  public async edit(
    options: {
      name?: string;
      avatar?: string | null;
      channelId?: string;
    },
    reason?: string
  ): Promise<Webhook> {
    return new Webhook(
      await this.client.rest.patch<RawWebhook>(
        Endpoints.webhook(this.id),
        null,
        true,
        {
          json: {
            name: options.name,
            avatar: options.avatar,
            channel_id: options.channelId,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  public async editWithToken(
    options: {
      name?: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Webhook(
      await this.client.rest.patch<RawWebhook>(
        Endpoints.webhook(this.id, this.token),
        null,
        false,
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

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook */
  public delete(reason?: string): void {
    this.client.rest.delete(Endpoints.webhook(this.id), null, true, {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  public deleteWithToken(reason?: string): void {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    this.client.rest.delete(
      Endpoints.webhook(this.id, this.token),
      null,
      false,
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-webhook */
  public async execute(options: {
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
    flags?: MessageFlags | null;
    threadName?: string;
  }): Promise<Message | void> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    if (options.wait) {
      return new Message(
        await this.client.rest.post<RawMessage>(
          Endpoints.webhook(this.id, this.token),
          {
            wait: options.wait,
            thread_id: options.threadId,
            username: options.username,
            avatarURL: options.avatarURL,
          },
          true,
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
    } else {
      this.client.rest.post(
        Endpoints.webhook(this.id, this.token),
        {
          wait: options.wait,
          thread_id: options.threadId,
          username: options.username,
          avatarURL: options.avatarURL,
        },
        true,
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
      );
    }
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook */
  public async executeSlackCompatible(options: {
    threadId?: string;
    wait?: boolean;
  }): Promise<Message> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.webhookPlatform(this.id, this.token, "slack"),
        {
          thread_id: options.threadId,
          wait: options.wait,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook */
  public async executeGitHubCompatible(options: {
    threadId?: string;
    wait?: boolean;
  }): Promise<Message> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Message(
      await this.client.rest.post<RawMessage>(
        Endpoints.webhookPlatform(this.id, this.token, "github"),
        {
          thread_id: options.threadId,
          wait: options.wait,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#get-webhook-message */
  public async getMessage(
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<Message> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Message(
      await this.client.rest.get<RawMessage>(
        Endpoints.webhookMessage(this.id, this.token, messageId),
        {
          thread_id: options?.threadId,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
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
    }
  ): Promise<Message> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Message(
      await this.client.rest.patch<RawMessage>(
        Endpoints.webhookMessage(this.id, this.token, messageId),
        {
          thread_id: options.threadId,
        },
        true,
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
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
  public deleteMessage(
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): void {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    this.client.rest.delete(
      Endpoints.webhookMessage(this.id, this.token, messageId),
      {
        thread_id: options?.threadId,
      }
    );
  }

  public override toRaw(): RawWebhook {
    return this.raw;
  }

  public override toJSON(): JSONWebhook {
    return {
      id: this.id,
      type: this.type,
      guildId: this.guildId,
      channelId: this.channelId,
      user: this.user?.toJSON(),
      name: this.name,
      avatar: this.avatar,
      token: this.token,
      applicationId: this.applicationId,
      sourceGuild: this.sourceGuild?.toJSON(),
      sourceChannel: this.sourceChannel?.toJSON(),
      url: this.url,
    };
  }
}
