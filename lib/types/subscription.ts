import type { SubscriptionStatuses } from "../constants";
import type { snowflake, timestamp } from "./common";

/** https://discord.com/developers/docs/resources/subscription#subscription-object */
export interface RawSubscription {
  id: snowflake;
  user_id: snowflake;
  sku_ids: Array<snowflake>;
  entitlement_ids: Array<snowflake>;
  renewal_sku_ids: Array<snowflake>;
  current_period_start: timestamp;
  current_period_end: timestamp;
  status: SubscriptionStatuses;
  canceled_at: timestamp | null;
  country?: string;
}

export interface Subscription {
  id: snowflake;
  userId: snowflake;
  skuIds: Array<snowflake>;
  entitlementIds: Array<snowflake>;
  renewalSKUIds: Array<snowflake>;
  currentPeriodStart: timestamp;
  currentPeriodEnd: timestamp;
  status: SubscriptionStatuses;
  canceledAt: timestamp | null;
  country?: string;
}
