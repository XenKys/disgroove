import { Shard } from ".";

export class ShardsManager extends Map<number, Shard> {
  connect(): void {
    this.forEach((shard) => shard.connect());
  }

  disconnect(): void {
    this.forEach((shard) => shard.disconnect());
  }
}
