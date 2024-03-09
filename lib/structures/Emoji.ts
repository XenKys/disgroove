import { Base, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { EditGuildEmojiParams, JSONEmoji, RawEmoji } from "../types";

/** https://discord.com/developers/docs/resources/emoji */
export class Emoji extends Base {
  protected override raw: RawEmoji;

  id: string | null;
  name: string | null;
  roles?: Array<string>;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(data: RawEmoji, client: Client) {
    super(client);

    this.raw = data;
    this.id = data.id;
    this.name = data.name;

    this.patch(data);
  }

  protected override patch(data: RawEmoji) {
    if (data.roles !== undefined) this.roles = data.roles;
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.require_colons !== undefined)
      this.requireColons = data.require_colons;
    if (data.managed !== undefined) this.managed = data.managed;
    if (data.animated !== undefined) this.animated = data.animated;
    if (data.available !== undefined) this.available = data.available;
  }

  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  delete(guildId: string, reason?: string): void {
    if (!this.id)
      throw new Error("[disgroove] Cannot delete a default Discord emoji");

    this.client.rest.delete(Endpoints.guildEmoji(guildId, this.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  async edit(
    guildId: string,
    options: EditGuildEmojiParams,
    reason?: string
  ): Promise<Emoji> {
    if (!this.id)
      throw new Error("[disgroove] Cannot edit a default Discord emoji");

    return new Emoji(
      await this.client.rest.patch<RawEmoji>(
        Endpoints.guildEmoji(guildId, this.id),
        {
          json: {
            name: options.name,
            roles: options.roles,
          },
          reason,
        }
      ),
      this.client
    );
  }

  override toRaw(): RawEmoji {
    return this.raw;
  }

  override toJSON(): JSONEmoji {
    return {
      id: this.id,
      name: this.name,
      roles: this.roles,
      user: this.user?.toJSON(),
      requireColons: this.requireColons,
      managed: this.managed,
      animated: this.animated,
      available: this.available,
    };
  }
}
