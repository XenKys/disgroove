import { Base, User } from ".";
import type { Client } from "../Client";
import type { StickerFormatTypes, StickerTypes } from "../constants";
import { Endpoints } from "../rest";
import type { JSONSticker, RawSticker } from "../types";

/** https://discord.com/developers/docs/resources/sticker */
export class Sticker extends Base {
  protected override raw: RawSticker;
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

  /** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
  async edit(
    options: {
      name?: string;
      description?: string | null;
      tags?: string;
    },
    reason?: string
  ): Promise<Sticker> {
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    return new Sticker(
      await this.client.rest.patch<RawSticker>(
        Endpoints.guildSticker(this.guildId, this.id),
        {
          json: {
            name: options.name,
            description: options.description,
            tags: options.tags,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
  delete(reason?: string): void {
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.delete(Endpoints.guildSticker(this.guildId, this.id), {
      reason,
    });
  }

  override toRaw(): RawSticker {
    return this.raw;
  }

  override toJSON(): JSONSticker {
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
