import type { StickerTypes, StickerFormatTypes } from "../constants";
import type { User, RawUser } from ".";
import type { File } from "../rest";

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface RawSticker {
  id: string;
  pack_id?: string;
  name: string;
  description: string | null;
  tags: string;
  asset?: string;
  type: StickerTypes;
  format_type: StickerFormatTypes;
  available?: boolean;
  guild_id?: string;
  user?: RawUser;
  sort_value?: number;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface RawStickerItem {
  id: string;
  name: string;
  format_type: StickerFormatTypes;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface RawStickerPack {
  id: string;
  stickers: Array<RawSticker>;
  name: string;
  sku_id: string;
  cover_sticker_id?: string;
  description: string;
  banner_asset_id?: string;
}

export interface Sticker {
  id: string;
  packId?: string;
  name: string;
  description: string | null;
  tags: string;
  asset?: string;
  type: StickerTypes;
  formatType: StickerFormatTypes;
  available?: boolean;
  guildId?: string;
  user?: User;
  sortValue?: number;
}

export interface StickerItem {
  id: string;
  name: string;
  formatType: StickerFormatTypes;
}

export interface StickerPack {
  id: string;
  stickers: Array<Sticker>;
  name: string;
  skuId: string;
  coverStickerId?: string;
  description: string;
  bannerAssetId?: string;
}

export interface CreateGuildStickerParams {
  name: string;
  description: string;
  tags: string;
  file: File;
}

export interface EditGuildStickerParams {
  name?: string;
  description?: string | null;
  tags?: string;
}
