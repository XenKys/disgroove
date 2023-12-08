import { Base, Channel, Guild, Message, User } from ".";
import type { Client } from "../Client";
import { Endpoints, type File } from "../rest";
import type {
  JSONActionRow,
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
      await this.client.rest.patch<RawWebhook>(Endpoints.webhook(this.id), {
        json: {
          name: options.name,
          avatar: options.avatar,
          channel_id: options.channelId,
        },
        reason,
      }),
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
    this.client.rest.delete(Endpoints.webhook(this.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  public deleteWithToken(reason?: string): void {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    this.client.rest.delete(Endpoints.webhook(this.id, this.token), {
      reason,
    });
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
    components?: Array<JSONActionRow> | null;
    files?: Array<File> | null;
    attachments?: Array<JSONAttachment> | null;
    flags?: MessageFlags | null;
    threadName?: string;
  }): Promise<Message | void> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    if (options.wait || options.wait === undefined) {
      return new Message(
        await this.client.rest.post<RawMessage>(
          Endpoints.webhook(this.id, this.token),
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
            query: {
              wait: options.wait,
              thread_id: options.threadId,
              username: options.username,
              avatarURL: options.avatarURL,
            },
          }
        ),
        this.client
      );
    } else {
      this.client.rest.post(Endpoints.webhook(this.id, this.token), {
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
        query: {
          wait: options.wait,
          thread_id: options.threadId,
          username: options.username,
          avatarURL: options.avatarURL,
        },
      });
    }
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook */
  public async executeSlackCompatible(options: {
    threadId?: string;
    wait?: boolean;
  }): Promise<Message | void> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    if (options.wait || options.wait === undefined) {
      return new Message(
        await this.client.rest.post<RawMessage>(
          Endpoints.webhookPlatform(this.id, this.token, "slack"),
          {
            query: {
              thread_id: options.threadId,
              wait: options.wait,
            },
          }
        ),
        this.client
      );
    } else {
      this.client.rest.post<RawMessage>(
        Endpoints.webhookPlatform(this.id, this.token, "slack"),
        {
          query: {
            thread_id: options.threadId,
            wait: options.wait,
          },
        }
      );
    }
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook */
  public async executeGitHubCompatible(options: {
    threadId?: string;
    wait?: boolean;
  }): Promise<Message | void> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    if (options.wait || options.wait === undefined) {
      return new Message(
        await this.client.rest.post<RawMessage>(
          Endpoints.webhookPlatform(this.id, this.token, "github"),
          {
            query: {
              thread_id: options.threadId,
              wait: options.wait,
            },
          }
        ),
        this.client
      );
    } else {
      this.client.rest.post<RawMessage>(
        Endpoints.webhookPlatform(this.id, this.token, "github"),
        {
          query: {
            thread_id: options.threadId,
            wait: options.wait,
          },
        }
      );
    }
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
          query: {
            thread_id: options?.threadId,
          },
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
      components?: Array<JSONActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<JSONAttachment> | null;
    }
  ): Promise<Message> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return new Message(
      await this.client.rest.patch<RawMessage>(
        Endpoints.webhookMessage(this.id, this.token, messageId),

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
        query: {
          thread_id: options?.threadId,
        },
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
