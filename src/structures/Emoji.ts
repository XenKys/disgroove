import { User } from ".";
import type { Client } from "../Client";
import type { JSONEmoji, RawEmoji } from "../types";

export class Emoji {
  private client: Client;
  private raw: RawEmoji;
  public id: string | null;
  public name: string | null;
  public roles?: Array<string>;
  public user?: User;
  public requireColons?: boolean;
  public managed?: boolean;
  public animated?: boolean;
  public available?: boolean;

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

  public toString(): string {
    return `[${this.constructor.name}]`;
  }

  public toRaw(): RawEmoji {
    return this.raw;
  }

  public toJSON(): JSONEmoji {
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
