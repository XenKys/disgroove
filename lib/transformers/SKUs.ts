import type { RawSKU, SKU } from "../types/sku";

export class SKUs {
  static skuFromRaw(sku: RawSKU): SKU {
    return {
      id: sku.id,
      type: sku.type,
      applicationID: sku.application_id,
      name: sku.name,
      slug: sku.slug,
      flags: sku.flags,
    };
  }

  static skuToRaw(sku: SKU): RawSKU {
    return {
      id: sku.id,
      type: sku.type,
      application_id: sku.applicationID,
      name: sku.name,
      slug: sku.slug,
      flags: sku.flags,
    };
  }
}
