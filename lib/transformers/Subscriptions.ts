import type { RawSubscription, Subscription } from "../types/subscription";

export class Subscriptions {
  static subscriptionFromRaw(subscription: RawSubscription): Subscription {
    return {
      id: subscription.id,
      userID: subscription.user_id,
      skuIDs: subscription.sku_ids,
      entitlementIDs: subscription.entitlement_ids,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
      status: subscription.status,
      canceledAt: subscription.canceled_at,
      country: subscription.country,
    };
  }

  static subscriptionToRaw(subscription: Subscription): RawSubscription {
    return {
      id: subscription.id,
      user_id: subscription.userID,
      sku_ids: subscription.skuIDs,
      entitlement_ids: subscription.entitlementIDs,
      current_period_start: subscription.currentPeriodStart,
      current_period_end: subscription.currentPeriodEnd,
      status: subscription.status,
      canceled_at: subscription.canceledAt,
      country: subscription.country,
    };
  }
}
