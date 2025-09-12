import type { RawEntitlement, Entitlement } from "../types/entitlements";

export class Entitlements {
  static entitlementFromRaw(entitlement: RawEntitlement): Entitlement {
    return {
      id: entitlement.id,
      skuId: entitlement.sku_id,
      applicationId: entitlement.application_id,
      userId: entitlement.user_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      startsAt: entitlement.starts_at,
      endsAt: entitlement.ends_at,
      guildId: entitlement.guild_id,
    };
  }

  static entitlementToRaw(entitlement: Entitlement): RawEntitlement {
    return {
      id: entitlement.id,
      sku_id: entitlement.skuId,
      application_id: entitlement.applicationId,
      user_id: entitlement.userId,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      starts_at: entitlement.startsAt,
      ends_at: entitlement.endsAt,
      guild_id: entitlement.guildId,
    };
  }

  static testEntitlementFromRaw(
    entitlement: Omit<
      RawEntitlement,
      "starts_at" | "ends_at" | "subscription_id"
    >
  ): Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId"> {
    return {
      id: entitlement.id,
      skuId: entitlement.sku_id,
      applicationId: entitlement.application_id,
      userId: entitlement.user_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      guildId: entitlement.guild_id,
    };
  }

  static testEntitlementToRaw(
    entitlement: Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId">
  ): Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id"> {
    return {
      id: entitlement.id,
      sku_id: entitlement.skuId,
      application_id: entitlement.applicationId,
      user_id: entitlement.userId,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      guild_id: entitlement.guildId,
    };
  }
}
