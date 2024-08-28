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
  starts_at?: timestamp;
  ends_at?: timestamp;
  guild_id?: snowflake;
}

export interface Entitlement {
  id: snowflake;
  skuID: snowflake;
  applicationID: snowflake;
  userID?: snowflake;
  type: EntitlementTypes;
  deleted: boolean;
  consumed?: boolean;
  startsAt?: timestamp;
  endsAt?: timestamp;
  guildID?: snowflake;
}
