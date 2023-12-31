import { User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { JSONEmoji, RawEmoji } from "../types";

/** https://discord.com/developers/docs/resources/emoji */
export class Emoji {
  private client: Client;
  private raw: RawEmoji;
  id: string | null;
  name: string | null;
  roles?: Array<string>;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(data: RawEmoji, client: Client) {
    this.client = client;
    this.raw = data;
    this.id = data.id;
    this.name = data.name;

    this.patch(data);
  }

  private patch(data: RawEmoji) {
    if (data.roles !== undefined) this.roles = data.roles;
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.require_colons !== undefined)
      this.requireColons = data.require_colons;
    if (data.managed !== undefined) this.managed = data.managed;
    if (data.animated !== undefined) this.animated = data.animated;
    if (data.available !== undefined) this.available = data.available;
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  async edit(
    guildId: string,
    options: {
      name?: string;
      roles?: Array<string> | null;
    },
    reason?: string
  ): Promise<Emoji> {
    if (!this.id) throw new Error("[disgroove] Emoji ID not found");

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

  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  delete(guildId: string, reason?: string): void {
    if (!this.id) throw new Error("[disgroove] Emoji ID not found");

    this.client.rest.delete(Endpoints.guildEmoji(guildId, this.id), {
      reason,
    });
  }

  toString(): string {
    return `[${this.constructor.name}]`;
  }

  toRaw(): RawEmoji {
    return this.raw;
  }

  toJSON(): JSONEmoji {
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
