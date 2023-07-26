import type { Client } from "../class";
import { Endpoints } from "../rest";
import type { JSONRole, JSONRoleTags, RawRole } from "../types";
import { Base } from ".";

export class Role extends Base {
  public name: string;
  public color: number;
  public hoist: boolean;
  public icon?: string | null;
  public unicodeEmoji?: string | null;
  public position: number;
  public permissions: string;
  public managed: boolean;
  public mentionable: boolean;
  public tags?: JSONRoleTags;
  public guildId?: string;

  constructor(data: RawRole & { guild_id?: string }, client: Client) {
    super(data.id, client);

    this.name = data.name;
    this.color = data.color;
    this.hoist = data.hoist;
    this.position = data.position;
    this.permissions = data.permissions;
    this.managed = data.managed;
    this.mentionable = data.mentionable;

    this.update(data);
  }

  protected override update(data: RawRole & { guild_id?: string }): void {
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.unicode_emoji !== undefined)
      this.unicodeEmoji = data.unicode_emoji;
    if (data.tags !== undefined)
      this.tags = {
        botId: data.tags.bot_id,
        integrationId: data.tags.integration_id,
        premiumSubscriber: data.tags.premium_subscriber,
        subscriptionListingId: data.tags.subscription_listing_id,
        availableForPurchase: data.tags.available_for_purchase,
        guildConnections: data.tags.guild_connections,
      };
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-role */
  public async modify(
    options: {
      name?: string | null;
      permissions?: string | null;
      color?: number | null;
      hoist?: boolean | null;
      icon?: string | null;
      unicodeEmoji?: string | null;
      mentionable?: boolean | null;
    },
    reason?: string
  ): Promise<Role> {
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    return new Role(
      await this.client.rest.request(
        "PATCH",
        Endpoints.guildRole(this.guildId, this.id),
        {
          json: {
            name: options.name,
            permissions: options.permissions,
            color: options.color,
            hoist: options.hoist,
            icon: options.icon,
            unicode_emoji: options.unicodeEmoji,
            mentionable: options.mentionable,
          },
          reason,
        }
      ),
      this.client
    );
  }

  public override toJSON(): JSONRole & { guildId?: string } {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      hoist: this.hoist,
      icon: this.icon,
      unicodeEmoji: this.unicodeEmoji,
      position: this.position,
      permissions: this.permissions,
      managed: this.managed,
      mentionable: this.mentionable,
      tags: this.tags,
      guildId: this.guildId,
    };
  }
}
