import { Shard } from ".";

export class ShardsManager extends Map<number, Shard> {
  public connect(): void {
    this.forEach((shard) => shard.connect());
  }

  public disconnect(): void {
    this.forEach((shard) => shard.disconnect());
  }
}
