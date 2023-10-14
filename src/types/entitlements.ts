import type { EntitlementTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-structure */
export interface RawEntitlement {
  id: string;
  sku_id: string;
  application_id: string;
  user_id?: string;
  type: EntitlementTypes;
  deleted: boolean;
  starts_at?: string;
  ends_at?: string;
  guild_id?: string;
}

export interface JSONEntitlement {
  id: string;
  skuId: string;
  applicationId: string;
  userId?: string;
  type: EntitlementTypes;
  deleted: boolean;
  startsAt?: string;
  endsAt?: string;
  guildId?: string;
}
