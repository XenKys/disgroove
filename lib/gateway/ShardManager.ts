import { Shard } from ".";
import { Collection } from "../utils";

export class ShardManager extends Collection<number, Shard> {
  connect(): void {
    this.forEach((shard) => shard.connect());
  }

  disconnect(): void {
    this.forEach((shard) => shard.disconnect());
  }
}
