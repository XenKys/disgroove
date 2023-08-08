import type { Client } from "../Client";

export abstract class Base {
  protected client: Client;
  protected raw: {
    id: string;
  };
  public id: string;

  constructor(id: string, client: Client) {
    this.client = client;
    this.raw = {
      id,
    };
    this.id = id;
  }

  protected patch(data: unknown): void {}

  public toString(): string {
    return `[${this.constructor.name}]`;
  }

  public toRaw(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }

  public toJSON(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }
}
