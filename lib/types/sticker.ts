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

export interface Sticker {
  id: snowflake;
  packID?: snowflake;
  name: string;
  description: string | null;
  tags: string;
  type: StickerTypes;
  formatType: StickerFormatTypes;
  available?: boolean;
  guildID?: snowflake;
  user?: User;
  sortValue?: number;
}

export interface StickerItem {
  id: snowflake;
  name: string;
  formatType: StickerFormatTypes;
}

export interface StickerPack {
  id: snowflake;
  stickers: Array<Sticker>;
  name: string;
  skuID: snowflake;
  coverStickerID?: snowflake;
  description: string;
  bannerAssetID?: snowflake;
}
