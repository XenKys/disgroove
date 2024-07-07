import type { RawSticker, Sticker } from "../types/sticker";
import { Users } from "./Users";

export class Stickers {
  static stickerFromRaw(sticker: RawSticker): Sticker {
    return {
      id: sticker.id,
      packID: sticker.pack_id,
      name: sticker.name,
      description: sticker.description,
      tags: sticker.tags,
      asset: sticker.asset,
      type: sticker.type,
      formatType: sticker.format_type,
      available: sticker.available,
      guildID: sticker.id,
      user:
        sticker.user !== undefined
          ? Users.userFromRaw(sticker.user)
          : undefined,
      sortValue: sticker.sort_value,
    };
  }

  static stickerToRaw(sticker: Sticker): RawSticker {
    return {
      id: sticker.id,
      pack_id: sticker.packID,
      name: sticker.name,
      description: sticker.description,
      tags: sticker.tags,
      asset: sticker.asset,
      type: sticker.type,
      format_type: sticker.formatType,
      available: sticker.available,
      guild_id: sticker.id,
      user:
        sticker.user !== undefined ? Users.userToRaw(sticker.user) : undefined,
      sort_value: sticker.sortValue,
    };
  }
}
