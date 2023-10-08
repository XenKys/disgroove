import type { SKUFlags, SKUTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure */
export interface RawSKU {
  id: string;
  type: SKUTypes;
  application_id: string;
  name: string;
  slug: string;
  flags: SKUFlags;
}

export interface JSONSKU {
  id: string;
  type: SKUTypes;
  applicationId: string;
  name: string;
  slug: string;
  flags: SKUFlags;
}
