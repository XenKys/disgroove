/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface RawRole {
  id: string;
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
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface RawRoleTags {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
  subscription_listing_id?: string;
  available_for_purchase?: null;
  guild_connections?: null;
}

export interface JSONRole {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicodeEmoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: JSONRoleTags;
}

export interface JSONRoleTags {
  botId?: string;
  integrationId?: string;
  premiumSubscriber?: null;
  subscriptionListingId?: string;
  availableForPurchase?: null;
  guildConnections?: null;
}
