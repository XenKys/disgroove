import type { StickerTypes, StickerFormatTypes } from "../constants";
import type { snowflake } from "./common";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface RawSticker {
  id: snowflake;
  pack_id?: snowflake;
  name: string;
  description: string | null;
  tags: string;
  type: StickerTypes;
  format_type: StickerFormatTypes;
  available?: boolean;
  guild_id?: snowflake;
  user?: RawUser;
  sort_value?: number;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface RawStickerItem {
  id: snowflake;
  name: string;
  format_type: StickerFormatTypes;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface RawStickerPack {
  id: snowflake;
  stickers: Array<RawSticker>;
  name: string;
  sku_id: snowflake;
  cover_sticker_id?: snowflake;
  description: string;
  banner_asset_id?: snowflake;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface Sticker {
  id: snowflake;
  packId?: snowflake;
  name: string;
  description: string | null;
  tags: string;
  type: StickerTypes;
  formatType: StickerFormatTypes;
  available?: boolean;
  guildId?: snowflake;
  user?: User;
  sortValue?: number;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface StickerItem {
  id: snowflake;
  name: string;
  formatType: StickerFormatTypes;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface StickerPack {
  id: snowflake;
  stickers: Array<Sticker>;
  name: string;
  skuId: snowflake;
  coverStickerId?: snowflake;
  description: string;
  bannerAssetId?: snowflake;
}
