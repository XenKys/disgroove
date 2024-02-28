import type { Client } from "../Client";
import { Base } from ".";

export abstract class IdentifiableBase extends Base {
  protected override raw: {
    id: string;
  };

  id: string;

  constructor(id: string, client: Client) {
    super(client);

    this.raw = {
      id,
    };
    this.id = id;
  }

  override toRaw(): {
    id: string;
  } {
    return this.raw;
  }

  override toJSON(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }
}
