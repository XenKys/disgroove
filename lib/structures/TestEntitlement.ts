import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { JSONEntitlement, RawEntitlement } from "../types";
import { IdentifiableBase } from ".";
import type { EntitlementTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/entitlements */
export class TestEntitlement extends IdentifiableBase {
  protected override raw: Omit<
    RawEntitlement,
    "starts_at" | "ends_at" | "subscription_id"
  >;

  skuId: string;
  applicationId: string;
  userId?: string;
  promotionId?: string | null; // Undocumented
  type: EntitlementTypes;
  deleted: boolean;
  giftCodeFlags?: number; // Undocumented
  consumed?: boolean; // Undocumented
  guildId?: string;

  constructor(
    data: Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id">,
    client: Client
  ) {
    super(data.id, client);

    this.raw = data;
    this.skuId = data.sku_id;
    this.applicationId = data.application_id;
    this.type = data.type;
    this.deleted = data.deleted;
  }

  protected override patch(
    data: Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id">
  ): void {
    if (data.user_id !== undefined) this.userId = data.user_id;
    if (data.promotion_id !== undefined) this.promotionId = data.promotion_id;
    if (data.gift_code_flags !== undefined)
      this.giftCodeFlags = data.gift_code_flags;
    if (data.consumed !== undefined) this.consumed = data.consumed;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
  }

  /** https://discord.com/developers/docs/monetization/entitlements */
  delete(): void {
    this.client.rest.delete(
      Endpoints.applicationEntitlement(this.applicationId, this.id)
    );
  }

  override toRaw(): Omit<
    RawEntitlement,
    "starts_at" | "ends_at" | "subscription_id"
  > {
    return this.raw;
  }

  override toJSON(): Omit<
    JSONEntitlement,
    "startsAt" | "endsAt" | "subscriptionId"
  > {
    return {
      id: this.id,
      skuId: this.skuId,
      applicationId: this.applicationId,
      userId: this.userId,
      promotionId: this.promotionId,
      type: this.type,
      deleted: this.deleted,
      giftCodeFlags: this.giftCodeFlags,
      consumed: this.consumed,
      guildId: this.guildId,
    };
  }
}
