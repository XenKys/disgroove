import type { Client } from "../Client";

export abstract class Base {
  protected client: Client;
  protected raw: unknown;

  constructor(client: Client) {
    this.client = client;
    this.raw = {};
  }

  protected patch(data: unknown): void {}

  toString(): string {
    return `[${this.constructor.name}]`;
  }

  toRaw(): unknown {
    return this.raw;
  }

  toJSON(): unknown {
    return {};
  }
}
