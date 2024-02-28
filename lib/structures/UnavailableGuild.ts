import { IdentifiableBase } from ".";
import type { Client } from "../Client";
import type { RawUnavailableGuild, JSONUnavailableGuild } from "../types";

/** https://discord.com/developers/docs/resources/guild */
export class UnavailableGuild extends IdentifiableBase {
  protected override raw: RawUnavailableGuild;

  unavailable: boolean;

  constructor(data: RawUnavailableGuild, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.unavailable = data.unavailable;
  }

  override toRaw(): RawUnavailableGuild {
    return this.raw;
  }

  override toJSON(): JSONUnavailableGuild {
    return {
      ...super.toJSON(),
      unavailable: this.unavailable,
    };
  }
}
