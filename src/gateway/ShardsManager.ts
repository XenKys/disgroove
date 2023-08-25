import { Shard } from ".";

export class ShardsManager extends Map<number, Shard> {
  public connect(): void {
    this.forEach((shard) => shard.connect());
  }
}
