import type { RawRole, Role } from "../types/role";

export class Roles {
  static roleFromRaw(role: RawRole): Role {
    return {
      id: role.id,
      name: role.name,
      color: role.color,
      colors: {
        primaryColor: role.colors.primary_color,
        secondaryColor: role.colors.secondary_color,
        tertiaryColors: role.colors.tertiary_colors,
      },
      hoist: role.hoist,
      icon: role.icon,
      unicodeEmoji: role.unicode_emoji,
      position: role.position,
      permissions: role.permissions,
      managed: role.managed,
      mentionable: role.mentionable,
      tags:
        role.tags !== undefined
          ? {
              botID: role.tags.bot_id,
              integrationID: role.tags.integration_id,
              premiumSubscriber: role.tags.premium_subscriber,
              subscriptionListingID: role.tags.subscription_listing_id,
              availableForPurchase: role.tags.available_for_purchase,
              guildConnections: role.tags.guild_connections,
            }
          : undefined,
      flags: role.flags,
    };
  }

  static roleToRaw(role: Role): RawRole {
    return {
      id: role.id,
      name: role.name,
      color: role.color,
      colors: {
        primary_color: role.colors.primaryColor,
        secondary_color: role.colors.secondaryColor,
        tertiary_colors: role.colors.tertiaryColors,
      },
      hoist: role.hoist,
      icon: role.icon,
      unicode_emoji: role.unicodeEmoji,
      position: role.position,
      permissions: role.permissions,
      managed: role.managed,
      mentionable: role.mentionable,
      tags:
        role.tags !== undefined
          ? {
              bot_id: role.tags.botID,
              integration_id: role.tags.integrationID,
              premium_subscriber: role.tags.premiumSubscriber,
              subscription_listing_id: role.tags.subscriptionListingID,
              available_for_purchase: role.tags.availableForPurchase,
              guild_connections: role.tags.guildConnections,
            }
          : undefined,
      flags: role.flags,
    };
  }
}
