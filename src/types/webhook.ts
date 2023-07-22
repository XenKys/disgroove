import type { WebhookTypes } from "../utils/constants";
import type { RawChannel, RawGuild, RawUser } from ".";
import type { Channel, Guild, User } from "../structures";

/* https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
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
  user?: User;
  name: string | null;
  avatar: string | null;
  token?: string;
  applicationId: string | null;
  sourceGuild?: Guild;
  sourceChannel?: Channel;
  url?: string;
}
