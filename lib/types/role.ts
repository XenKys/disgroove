import type { RoleFlags } from "../constants";
import type { snowflake } from "./common";

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface RawRole {
  id: snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicode_emoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: RawRoleTags;
  flags: RoleFlags;
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface RawRoleTags {
  bot_id?: snowflake;
  integration_id?: snowflake;
  premium_subscriber?: null;
  subscription_listing_id?: snowflake;
  available_for_purchase?: null;
  guild_connections?: null;
}

export interface Role {
  id: snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicodeEmoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: RoleTags;
  flags: RoleFlags;
}

export interface RoleTags {
  botId?: snowflake;
  integrationId?: snowflake;
  premiumSubscriber?: null;
  subscriptionListingId?: snowflake;
  availableForPurchase?: null;
  guildConnections?: null;
}
