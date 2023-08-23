import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { JSONRole, JSONRoleTags, RawRole } from "../types";
import { Base } from ".";
import { RoleFlags } from "../constants";

/** https://discord.com/developers/docs/topics/permissions */
export class Role extends Base {
  protected override raw: RawRole;
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
  public flags: RoleFlags;

  constructor(data: RawRole, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.name = data.name;
    this.color = data.color;
    this.hoist = data.hoist;
    this.position = data.position;
    this.permissions = data.permissions;
    this.managed = data.managed;
    this.mentionable = data.mentionable;
    this.flags = data.flags;

    this.patch(data);
  }

  protected override patch(data: RawRole): void {
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
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role */
  public async edit(
    guildId: string,
    options?: {
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
    return new Role(
      await this.client.rest.patch<RawRole>(
        Endpoints.guildRole(guildId, this.id),
        {
          json: {
            name: options?.name,
            permissions: options?.permissions,
            color: options?.color,
            hoist: options?.hoist,
            icon: options?.icon,
            unicode_emoji: options?.unicodeEmoji,
            mentionable: options?.mentionable,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-role */
  public delete(guildId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.guildRole(guildId, this.id), {
      reason,
    });
  }

  public override toRaw(): RawRole & {
    guild_id?: string;
  } {
    return this.raw;
  }

  public override toJSON(): JSONRole {
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
      flags: this.flags,
    };
  }
}
