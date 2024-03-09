import type { SkuFlags, SkuTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure */
export interface RawSku {
  id: string;
  type: SkuTypes;
  dependent_sku_id?: string | null; // Undocumented
  application_id: string;
  manifest_labels?: null; // Undocumented
  access_type?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  release_date?: null; // Undocumented
  slug: string;
  flags: SkuFlags;
  show_age_gate?: boolean; // Undocumented
}

export interface Sku {
  id: string;
  type: SkuTypes;
  dependentSkuId?: string | null; // Undocumented
  applicationId: string;
  manifestLabels?: null; // Undocumented
  accessType?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  releaseDate?: null; // Undocumented
  slug: string;
  flags: SkuFlags;
  showAgeGate?: boolean; // Undocumented
}
