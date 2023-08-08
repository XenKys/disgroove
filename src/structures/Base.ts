import type { Client } from "../Client";

export abstract class Base {
  protected client: Client;
  public id: string;

  constructor(id: string, client: Client) {
    this.client = client;
    this.id = id;
  }

  protected patch(data: unknown): void {}

  public toString(): string {
    return `[${this.constructor.name}]`;
  }

  public toJSON(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }
}
