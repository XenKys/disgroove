import type { MessageFlags, WebhookTypes } from "../constants";
import type {
  JSONActionRow,
  JSONAllowedMentions,
  JSONAttachment,
  JSONChannel,
  JSONEmbed,
  JSONGuild,
  JSONUser,
  RawChannel,
  RawGuild,
  RawUser,
} from ".";
import type { File } from "../rest";

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export interface RawWebhook {
  id: string;
  type: WebhookTypes;
  guild_id?: string | null;
  channel_id: string | null;
  user?: RawUser;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: string | null;
  source_guild?: RawGuild;
  source_channel?: RawChannel;
  url?: string;
}

export interface JSONWebhook {
  id: string;
  type: WebhookTypes;
  guildId?: string | null;
  channelId: string | null;
  user?: JSONUser;
  name: string | null;
  avatar: string | null;
  token?: string;
  applicationId: string | null;
  sourceGuild?: JSONGuild;
  sourceChannel?: JSONChannel;
  url?: string;
}

export interface CreateWebhookParams {
  name: string;
  avatar?: string | null;
}

export interface EditWebhookParams {
  name?: string;
  avatar?: string | null;
  channelId?: string;
}

export interface ExecuteWebhookParams {
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
}

export interface EditWebhookMessageParams {
  content?: string | null;
  embeds?: Array<JSONEmbed> | null;
  flags?: MessageFlags | null;
  allowedMentions?: JSONAllowedMentions | null;
  components?: Array<JSONActionRow> | null;
  files?: Array<File> | null;
  attachments?: Array<JSONAttachment> | null;
}
