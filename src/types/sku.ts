import type { SKUTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure */
export interface RawSKU {
  id: string;
  type: SKUTypes;
  application_id: string;
  name: string;
  slug: string;
}

export interface JSONSKU {
  id: string;
  type: SKUTypes;
  applicationId: string;
  name: string;
  slug: string;
}
