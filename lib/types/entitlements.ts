import type { EntitlementTypes } from "../constants";
import type { snowflake, timestamp } from "./common";

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-structure */
export interface RawEntitlement {
  id: snowflake;
  sku_id: snowflake;
  application_id: snowflake;
  user_id?: snowflake;
  promotion_id?: snowflake | null; // Undocumented
  type: EntitlementTypes;
  deleted: boolean;
  gift_code_flags?: number; // Undocumented
  consumed?: boolean;
  starts_at?: timestamp;
  ends_at?: timestamp;
  guild_id?: snowflake;
  subscription_id?: string; // Undocumented
}

export interface Entitlement {
  id: snowflake;
  skuId: snowflake;
  applicationId: snowflake;
  userId?: snowflake;
  promotionId?: snowflake | null; // Undocumented
  type: EntitlementTypes;
  deleted: boolean;
  giftCodeFlags?: number; // Undocumented
  consumed?: boolean;
  startsAt?: timestamp;
  endsAt?: timestamp;
  guildId?: snowflake;
  subscriptionId?: string; // Undocumented
}

export interface CreateTestEntitlementParams {
  skuId: snowflake;
  ownerId: snowflake;
  ownerType: number;
}
