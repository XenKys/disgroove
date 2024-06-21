import type { MessageFlags, WebhookTypes } from "../constants";
import type {
  ActionRow,
  AllowedMentions,
  Attachment,
  Channel,
  Embed,
  Guild,
  User,
  RawChannel,
  RawGuild,
  RawUser,
  PollCreateParams,
  snowflake,
} from ".";
import type { File } from "../rest";

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export interface RawWebhook {
  id: snowflake;
  type: WebhookTypes;
  guild_id?: snowflake | null;
  channel_id: snowflake | null;
  user?: RawUser;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: snowflake | null;
  source_guild?: RawGuild;
  source_channel?: RawChannel;
  url?: string;
}

export interface Webhook {
  id: snowflake;
  type: WebhookTypes;
  guildId?: snowflake | null;
  channelId: snowflake | null;
  user?: User;
  name: string | null;
  avatar: string | null;
  token?: string;
  applicationId: snowflake | null;
  sourceGuild?: Guild;
  sourceChannel?: Channel;
  url?: string;
}

export interface CreateWebhookParams {
  name: string;
  avatar?: string | null;
}

export interface EditWebhookParams {
  name?: string;
  avatar?: string | null;
  channelId?: snowflake;
}

export interface ExecuteWebhookParams {
  content?: string | null;
  username?: string;
  avatarUrl?: string;
  tts?: boolean;
  embeds?: Array<Embed> | null;
  allowedMentions?: AllowedMentions | null;
  components?: Array<ActionRow> | null;
  files?: Array<File> | null;
  attachments?: Array<Attachment> | null;
  flags?: MessageFlags | null;
  threadName?: string;
  appliedTags?: Array<string>;
  poll?: PollCreateParams;
}

export interface EditWebhookMessageParams {
  content?: string | null;
  embeds?: Array<Embed> | null;
  flags?: MessageFlags | null;
  allowedMentions?: AllowedMentions | null;
  components?: Array<ActionRow> | null;
  files?: Array<File> | null;
  attachments?: Array<Attachment> | null;
}
