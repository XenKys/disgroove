import type { SKUFlags, SKUTypes } from "../constants";
import type { snowflake } from "./common";

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure */
export interface RawSKU {
  id: snowflake;
  type: SKUTypes;
  dependent_sku_id?: string | null; // Undocumented
  application_id: snowflake;
  manifest_labels?: null; // Undocumented
  access_type?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  release_date?: null; // Undocumented
  slug: string;
  flags: SKUFlags;
  show_age_gate?: boolean; // Undocumented
}

export interface SKU {
  id: snowflake;
  type: SKUTypes;
  dependentSKUId?: string | null; // Undocumented
  applicationId: snowflake;
  manifestLabels?: null; // Undocumented
  accessType?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  releaseDate?: null; // Undocumented
  slug: string;
  flags: SKUFlags;
  showAgeGate?: boolean; // Undocumented
}
