import { Client } from "../class";

export abstract class Base {
  protected client!: Client;
  public id: string;

  constructor(id: string, client: Client) {
    this.client = client;
    this.id = id;
  }

  protected update(data: unknown): void {}

  protected toJSON(): {
    id: string;
  } {
    return {
      id: this.id,
    };
  }
}
