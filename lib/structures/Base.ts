import type { Client } from "../Client";

export abstract class Base {
  protected client: Client;
  protected raw: {
    id: string;
  };
  id: string;

  constructor(id: string, client: Client) {
    this.client = client;
    this.raw = {
      id,
    };
    this.id = id;
  }

  protected patch(data: unknown): void {}

  toString(): string {
    return `[${this.constructor.name}]`;
  }

  toRaw(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }

  toJSON(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }
}
