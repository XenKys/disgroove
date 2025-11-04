import type {
  RawPresenceUpdateEvent,
  PresenceUpdateEvent,
} from "../types/gateway-events";

export class Presences {
  static presenceFromRaw(
    presence: RawPresenceUpdateEvent
  ): PresenceUpdateEvent {
    return {
      user: {
        id: presence.user.id,
        username: presence.user.username,
        discriminator: presence.user.discriminator,
        globalName: presence.user.global_name,
        avatar: presence.user.avatar,
        bot: presence.user.bot,
        system: presence.user.system,
        mfaEnabled: presence.user.mfa_enabled,
        banner: presence.user.banner,
        accentColor: presence.user.accent_color,
        locale: presence.user.locale,
        verified: presence.user.verified,
        email: presence.user.email,
        flags: presence.user.flags,
        premiumType: presence.user.premium_type,
        publicFlags: presence.user.public_flags,
        avatarDecorationData:
          presence.user.avatar_decoration_data !== undefined
            ? presence.user.avatar_decoration_data !== null
              ? {
                  asset: presence.user.avatar_decoration_data.asset,
                  skuId: presence.user.avatar_decoration_data.sku_id,
                }
              : null
            : undefined,
      },
      guildId: presence.guild_id,
      status: presence.status,
      activities: presence.activities.map((activity) => ({
        name: activity.name,
        type: activity.type,
        url: activity.url,
        createdAt: activity.created_at,
        timestamps: activity.timestamps,
        applicationId: activity.application_id,
        details: activity.details,
        state: activity.state,
        emoji: activity.emoji,
        party: activity.party,
        assets: {
          largeImage: activity.assets?.large_image,
          largeText: activity.assets?.large_text,
          smallImage: activity.assets?.small_image,
          smallText: activity.assets?.small_text,
        },
        secrets: activity.secrets,
        instance: activity.instance,
        flags: activity.flags,
        buttons: activity.buttons,
      })),
      clientStatus: presence.client_status,
    };
  }

  static presenceToRaw(
    presence: PresenceUpdateEvent
  ): RawPresenceUpdateEvent {
    return {
      user: {
        id: presence.user.id,
        username: presence.user.username,
        discriminator: presence.user.discriminator,
        global_name: presence.user.globalName,
        avatar: presence.user.avatar,
        bot: presence.user.bot,
        system: presence.user.system,
        mfa_enabled: presence.user.mfaEnabled,
        banner: presence.user.banner,
        accent_color: presence.user.accentColor,
        locale: presence.user.locale,
        verified: presence.user.verified,
        email: presence.user.email,
        flags: presence.user.flags,
        premium_type: presence.user.premiumType,
        public_flags: presence.user.publicFlags,
        avatar_decoration_data:
          presence.user.avatarDecorationData !== undefined
            ? presence.user.avatarDecorationData !== null
              ? {
                  asset: presence.user.avatarDecorationData.asset,
                  sku_id: presence.user.avatarDecorationData.skuId,
                }
              : null
            : undefined,
      },
      guild_id: presence.guildId,
      status: presence.status,
      activities: presence.activities.map((activity) => ({
        name: activity.name,
        type: activity.type,
        url: activity.url,
        created_at: activity.createdAt,
        timestamps: activity.timestamps,
        application_id: activity.applicationId,
        details: activity.details,
        state: activity.state,
        emoji: activity.emoji,
        party: activity.party,
        assets: {
          large_image: activity.assets?.largeImage,
          large_text: activity.assets?.largeText,
          small_image: activity.assets?.smallImage,
          small_text: activity.assets?.smallText,
        },
        secrets: activity.secrets,
        instance: activity.instance,
        flags: activity.flags,
        buttons: activity.buttons,
      })),
      client_status: presence.clientStatus,
    };
  }
}
