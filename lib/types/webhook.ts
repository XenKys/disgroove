import type { WebhookTypes } from "../constants";
import type { RawChannel, Channel } from "./channel";
import type { snowflake } from "./common";
import type { RawGuild, Guild } from "./guild";
import type { RawUser, User } from "./user";

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

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
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
