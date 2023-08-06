import type { Client } from "..";

export abstract class Base {
  protected client: Client;
  public id: string;

  constructor(id: string, client: Client) {
    this.client = client;
    this.id = id;
  }

  protected update(data: unknown): void {}

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
