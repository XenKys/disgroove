import { IdentifiableBase, Channel, Guild, Message, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  EditWebhookMessageParams,
  EditWebhookParams,
  ExecuteWebhookParams,
  JSONWebhook,
  RawMessage,
  RawWebhook,
} from "../types";
import type { WebhookTypes } from "../constants";

/** https://discord.com/developers/docs/resources/webhook */
export class Webhook extends IdentifiableBase {
  protected override raw: RawWebhook;

  type: WebhookTypes;
  guildId?: string | null;
  channelId: string | null;
  user?: User;
  name: string | null;
  avatar: string | null;
  token?: string;
  applicationId: string | null;
  sourceGuild?: Guild;
  sourceChannel?: Channel;
  url?: string;

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

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook */
  delete(reason?: string): void {
    this.client.rest.delete(Endpoints.webhook(this.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
  deleteMessage(
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

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  deleteWithToken(reason?: string): void {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    this.client.rest.delete(Endpoints.webhook(this.id, this.token), {
      reason,
      authorization: false,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook */
  async edit(options: EditWebhookParams, reason?: string): Promise<Webhook> {
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

  /** https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
  async editMessage(
    messageId: string,
    options: EditWebhookMessageParams & {
      threadId: string;
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

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  async editWithToken(
    options: Omit<EditWebhookParams, "channelId">,
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
          authorization: false,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-webhook */
  async execute(
    options: ExecuteWebhookParams & { wait: boolean; threadId: string }
  ): Promise<Message | null> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return this.client.rest
      .post<RawMessage | null>(Endpoints.webhook(this.id, this.token), {
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
        query: {
          wait: options.wait,
          thread_id: options.threadId,
          username: options.username,
          avatarURL: options.avatarURL,
        },
      })
      .then((response) =>
        response !== null ? new Message(response, this.client) : null
      );
  }

  /**
   * https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook
   * https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook
   */
  async executePlatform(
    platform: "github" | "slack",
    options: Record<string, unknown> & {
      threadId?: string;
      wait?: boolean;
    }
  ): Promise<Message | null> {
    if (!this.token) throw new Error("[disgroove] Webhook token not found");

    return this.client.rest
      .post<RawMessage | null>(
        Endpoints.webhookPlatform(this.id, this.token, platform),
        {
          query: {
            thread_id: options.threadId,
            wait: options.wait,
          },
          json: options,
        }
      )
      .then((response) =>
        response !== null ? new Message(response, this.client) : null
      );
  }

  /** https://discord.com/developers/docs/resources/webhook#get-webhook-message */
  async getMessage(
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

  override toRaw(): RawWebhook {
    return this.raw;
  }

  override toJSON(): JSONWebhook {
    return {
      ...super.toJSON(),
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
