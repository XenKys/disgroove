import type { SKUFlags, SKUTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure */
export interface RawSKU {
  id: string;
  type: SKUTypes;
  dependent_sku_id?: string | null; // Undocumented
  application_id: string;
  manifest_labels?: null; // Undocumented
  access_type?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  release_date?: null; // Undocumented
  slug: string;
  flags: SKUFlags;
  show_age_gate?: boolean; // Undocumented
}

export interface JSONSKU {
  id: string;
  type: SKUTypes;
  dependentSkuId?: string | null; // Undocumented
  applicationId: string;
  manifestLabels?: null; // Undocumented
  accessType?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  releaseDate?: null; // Undocumented
  slug: string;
  flags: SKUFlags;
  showAgeGate?: boolean; // Undocumented
}
