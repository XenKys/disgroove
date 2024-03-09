import type { EntitlementTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-structure */
export interface RawEntitlement {
  id: string;
  sku_id: string;
  application_id: string;
  user_id?: string;
  promotion_id?: string | null; // Undocumented
  type: EntitlementTypes;
  deleted: boolean;
  gift_code_flags?: number; // Undocumented
  consumed?: boolean; // Undocumented
  starts_at?: string;
  ends_at?: string;
  guild_id?: string;
  subscription_id?: string; // Undocumented
}

export interface Entitlement {
  id: string;
  skuId: string;
  applicationId: string;
  userId?: string;
  promotionId?: string | null; // Undocumented
  type: EntitlementTypes;
  deleted: boolean;
  giftCodeFlags?: number; // Undocumented
  consumed?: boolean; // Undocumented
  startsAt?: string;
  endsAt?: string;
  guildId?: string;
  subscriptionId?: string; // Undocumented
}

export interface CreateTestEntitlementParams {
  skuId: string;
  ownerId: string;
  ownerType: number;
}
