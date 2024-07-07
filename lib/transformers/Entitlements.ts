import type { RawEntitlement, Entitlement } from "../types/entitlements";

export class Entitlements {
  static entitlementFromRaw(entitlement: RawEntitlement): Entitlement {
    return {
      id: entitlement.id,
      skuID: entitlement.sku_id,
      applicationID: entitlement.application_id,
      userID: entitlement.user_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      startsAt: entitlement.starts_at,
      endsAt: entitlement.ends_at,
      guildID: entitlement.guild_id,
    };
  }

  static entitlementToRaw(entitlement: Entitlement): RawEntitlement {
    return {
      id: entitlement.id,
      sku_id: entitlement.skuID,
      application_id: entitlement.applicationID,
      user_id: entitlement.userID,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      starts_at: entitlement.startsAt,
      ends_at: entitlement.endsAt,
      guild_id: entitlement.guildID,
    };
  }

  static testEntitlementFromRaw(
    entitlement: Omit<
      RawEntitlement,
      "starts_at" | "ends_at" | "subscription_id"
    >
  ): Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionID"> {
    return {
      id: entitlement.id,
      skuID: entitlement.sku_id,
      applicationID: entitlement.application_id,
      userID: entitlement.user_id,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      guildID: entitlement.guild_id,
    };
  }

  static testEntitlementToRaw(
    entitlement: Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionID">
  ): Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id"> {
    return {
      id: entitlement.id,
      sku_id: entitlement.skuID,
      application_id: entitlement.applicationID,
      user_id: entitlement.userID,
      type: entitlement.type,
      deleted: entitlement.deleted,
      consumed: entitlement.consumed,
      guild_id: entitlement.guildID,
    };
  }
}
