import type { RawWebhook, Webhook } from "../types/webhook";
import { Channels } from "./Channels";
import { Guilds } from "./Guilds";
import { Users } from "./Users";

export class Webhooks {
  static webhookFromRaw(webhook: RawWebhook): Webhook {
    return {
      id: webhook.id,
      type: webhook.type,
      guildID: webhook.guild_id,
      channelID: webhook.channel_id,
      user:
        webhook.user !== undefined
          ? Users.userFromRaw(webhook.user)
          : undefined,
      name: webhook.name,
      avatar: webhook.avatar,
      token: webhook.token,
      applicationID: webhook.application_id,
      sourceGuild:
        webhook.source_guild !== undefined
          ? Guilds.guildFromRaw(webhook.source_guild)
          : undefined,
      sourceChannel:
        webhook.source_channel !== undefined
          ? Channels.channelFromRaw(webhook.source_channel)
          : undefined,
      url: webhook.url,
    };
  }

  static webhookToRaw(webhook: Webhook): RawWebhook {
    return {
      id: webhook.id,
      type: webhook.type,
      guild_id: webhook.guildID,
      channel_id: webhook.channelID,
      user:
        webhook.user !== undefined ? Users.userToRaw(webhook.user) : undefined,
      name: webhook.name,
      avatar: webhook.avatar,
      token: webhook.token,
      application_id: webhook.applicationID,
      source_guild:
        webhook.sourceGuild !== undefined
          ? Guilds.guildToRaw(webhook.sourceGuild)
          : undefined,
      source_channel:
        webhook.sourceChannel !== undefined
          ? Channels.channelToRaw(webhook.sourceChannel)
          : undefined,
      url: webhook.url,
    };
  }
}
