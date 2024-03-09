import { Shard } from ".";

export class ShardManager extends Map<number, Shard> {
  connect(): void {
    this.forEach((shard) => shard.connect());
  }

  disconnect(): void {
    this.forEach((shard) => shard.disconnect());
  }
}
