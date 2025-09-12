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
        tertiaryColor: role.colors.tertiary_color,
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
              botId: role.tags.bot_id,
              integrationId: role.tags.integration_id,
              premiumSubscriber: role.tags.premium_subscriber,
              subscriptionListingId: role.tags.subscription_listing_id,
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
        tertiary_color: role.colors.tertiaryColor,
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
              bot_id: role.tags.botId,
              integration_id: role.tags.integrationId,
              premium_subscriber: role.tags.premiumSubscriber,
              subscription_listing_id: role.tags.subscriptionListingId,
              available_for_purchase: role.tags.availableForPurchase,
              guild_connections: role.tags.guildConnections,
            }
          : undefined,
      flags: role.flags,
    };
  }
}
