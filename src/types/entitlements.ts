import type { EntitlementTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-structure */
export interface RawEntitlement {
  id: string;
  sku_id: string;
  user_id?: string;
  guild_id?: string;
  application_id: string;
  type: EntitlementTypes;
  consumed: boolean;
  starts_at?: string;
  ends_at?: string;
}

export interface JSONEntitlement {
  id: string;
  skuId: string;
  userId?: string;
  guildId?: string;
  applicationId: string;
  type: EntitlementTypes;
  consumed: boolean;
  startsAt?: string;
  endsAt?: string;
}
