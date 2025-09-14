import type { EntitlementTypes } from "../constants";
import type { snowflake, timestamp } from "./common";

/** https://discord.com/developers/docs/resources/entitlement#entitlement-object-entitlement-structure */
export interface RawEntitlement {
  id: snowflake;
  sku_id: snowflake;
  application_id: snowflake;
  user_id?: snowflake;
  type: EntitlementTypes;
  deleted: boolean;
  consumed?: boolean;
  starts_at: timestamp | null;
  ends_at: timestamp | null;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/resources/entitlement#entitlement-object-entitlement-structure */
export interface Entitlement {
  id: snowflake;
  skuId: snowflake;
  applicationId: snowflake;
  userId?: snowflake;
  type: EntitlementTypes;
  deleted: boolean;
  consumed?: boolean;
  startsAt: timestamp | null;
  endsAt: timestamp | null;
  guildId?: snowflake;
}
