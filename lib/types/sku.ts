import type { SKUFlags, SKUTypes } from "../constants";
import type { snowflake } from "./common";

/** https://discord.com/developers/docs/resources/sku#sku-object-sku-structure */
export interface RawSKU {
  id: snowflake;
  type: SKUTypes;
  application_id: snowflake;
  name: string;
  slug: string;
  flags: SKUFlags;
}

export interface SKU {
  id: snowflake;
  type: SKUTypes;
  applicationID: snowflake;
  name: string;
  slug: string;
  flags: SKUFlags;
}
