import type { Client } from "../Client";
import type { JSONSKU, RawSKU } from "../types";
import { Base } from ".";
import type { SKUFlags, SKUTypes } from "../constants";

/** https://discord.com/developers/docs/monetization/skus */
export class SKU extends Base {
  protected override raw: RawSKU;
  type: SKUTypes;
  dependentSKUId?: string | null; // Undocumented
  applicationId: string;
  manifestLabels?: null; // Undocumented
  accessType?: number; // Undocumented
  name: string;
  features?: []; // Undocumented
  releaseDate?: null; // Undocumented
  slug: string;
  flags: SKUFlags;
  showAgeGate?: boolean; // Undocumented

  constructor(data: RawSKU, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.type = data.type;
    this.applicationId = data.application_id;
    this.name = data.name;
    this.slug = data.slug;
    this.flags = data.flags;
  }

  protected override patch(data: RawSKU): void {
    if (data.dependent_sku_id !== undefined)
      this.dependentSKUId = data.dependent_sku_id;
    if (data.manifest_labels !== undefined)
      this.manifestLabels = data.manifest_labels;
    if (data.access_type !== undefined) this.accessType = data.access_type;
    if (data.features !== undefined) this.features = data.features;
    if (data.release_date !== undefined) this.releaseDate = data.release_date;
    if (data.show_age_gate !== undefined) this.showAgeGate = data.show_age_gate;
  }

  override toRaw(): RawSKU {
    return this.raw;
  }

  override toJSON(): JSONSKU {
    return {
      id: this.id,
      type: this.type,
      dependentSKUId: this.dependentSKUId,
      applicationId: this.applicationId,
      manifestLabels: this.manifestLabels,
      accessType: this.accessType,
      name: this.name,
      features: this.features,
      releaseDate: this.releaseDate,
      slug: this.slug,
      flags: this.flags,
      showAgeGate: this.showAgeGate,
    };
  }
}
