import type { Client } from "../Client";
import type { JSONEntitlement, RawEntitlement } from "../types";
import { Base } from ".";
import type { EntitlementTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/entitlements */
export class Entitlement extends Base {
  protected override raw: RawEntitlement;
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

  constructor(data: RawEntitlement, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.skuId = data.sku_id;
    this.applicationId = data.application_id;
    this.type = data.type;
    this.deleted = data.deleted;
  }

  protected override patch(data: RawEntitlement): void {
    if (data.user_id !== undefined) this.userId = data.user_id;
    if (data.promotion_id !== undefined) this.promotionId = data.promotion_id;
    if (data.gift_code_flags !== undefined)
      this.giftCodeFlags = data.gift_code_flags;
    if (data.consumed !== undefined) this.consumed = data.consumed;
    if (data.starts_at !== undefined) this.startsAt = data.starts_at;
    if (data.ends_at !== undefined) this.endsAt = data.ends_at;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.subscription_id !== undefined) this.subscriptionId;
  }

  override toRaw(): RawEntitlement {
    return this.raw;
  }

  override toJSON(): JSONEntitlement {
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
      startsAt: this.startsAt,
      endsAt: this.endsAt,
      guildId: this.guildId,
      subscriptionId: this.subscriptionId,
    };
  }
}
