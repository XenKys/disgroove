import { Base, User } from ".";
import type { Client } from "../Client";
import type { StickerFormatTypes, StickerTypes } from "../utils";
import type { JSONSticker, RawSticker } from "../types";

export class Sticker extends Base {
  protected override raw: RawSticker;
  public packId?: string;
  public name: string;
  public description: string | null;
  public tags: string;
  public asset?: string;
  public type: StickerTypes;
  public formatType: StickerFormatTypes;
  public available?: boolean;
  public guildId?: string;
  public user?: User;
  public sortValue?: number;

  constructor(data: RawSticker, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.name = data.name;
    this.description = data.description;
    this.tags = data.tags;
    this.type = data.type;
    this.formatType = data.format_type;

    this.patch(data);
  }

  protected override patch(data: RawSticker) {
    if (data.pack_id !== undefined) this.packId = data.pack_id;
    if (data.asset != undefined) this.asset = data.asset;
    if (data.available !== undefined) this.available = data.available;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.sort_value !== undefined) this.sortValue = data.sort_value;
  }

  public override toRaw(): RawSticker {
    return this.raw;
  }

  public override toJSON(): JSONSticker {
    return {
      id: this.id,
      packId: this.packId,
      name: this.name,
      description: this.description,
      tags: this.tags,
      asset: this.asset,
      type: this.type,
      formatType: this.formatType,
      available: this.available,
      guildId: this.guildId,
      user: this.user?.toJSON(),
      sortValue: this.sortValue,
    };
  }
}
