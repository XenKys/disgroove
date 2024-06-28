import type { Shard } from ".";
import type { GatewayPresenceUpdate } from "../types/gateway-events";

export class ShardManager extends Map<number, Shard> {
  /** https://discord.com/developers/docs/topics/gateway#connections */
  connect(): void {
    this.forEach((shard) => shard.connect());
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  disconnect(): void {
    this.forEach((shard) => shard.disconnect());
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  updatePresence(
    options: Partial<
      Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
    >
  ): void {
    this.forEach((shard) => shard.updatePresence(options));
  }
}
