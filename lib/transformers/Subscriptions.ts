import type { RawSubscription, Subscription } from "../types/subscription";

export class Subscriptions {
  static subscriptionFromRaw(subscription: RawSubscription): Subscription {
    return {
      id: subscription.id,
      userId: subscription.user_id,
      skuIds: subscription.sku_ids,
      entitlementIds: subscription.entitlement_ids,
      renewalSKUIds: subscription.renewal_sku_ids,
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
      user_id: subscription.userId,
      sku_ids: subscription.skuIds,
      entitlement_ids: subscription.entitlementIds,
      renewal_sku_ids: subscription.renewalSKUIds,
      current_period_start: subscription.currentPeriodStart,
      current_period_end: subscription.currentPeriodEnd,
      status: subscription.status,
      canceled_at: subscription.canceledAt,
      country: subscription.country,
    };
  }
}
