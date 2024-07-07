import type {
  RawPresenceUpdateEventFields,
  PresenceUpdateEventFields,
} from "../types/gateway-events";
import type { RawUser, User } from "../types/user";

export class Presences {
  static presenceFromRaw(
    presence: RawPresenceUpdateEventFields
  ): PresenceUpdateEventFields {
    return {
      user: Presences.presenceUserFromRaw(presence.user),
      guildID: presence.guild_id,
      status: presence.status,
      activities: presence.activities.map((activity) => ({
        name: activity.name,
        type: activity.type,
        url: activity.url,
        createdAt: activity.created_at,
        timestamps: activity.timestamps,
        applicationID: activity.application_id,
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
    presence: PresenceUpdateEventFields
  ): RawPresenceUpdateEventFields {
    return {
      user: Presences.presenceUserToRaw(presence.user),
      guild_id: presence.guildID,
      status: presence.status,
      activities: presence.activities.map((activity) => ({
        name: activity.name,
        type: activity.type,
        url: activity.url,
        created_at: activity.createdAt,
        timestamps: activity.timestamps,
        application_id: activity.applicationID,
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

  static presenceUserFromRaw(
    user: Pick<RawUser, "id"> & Partial<RawUser>
  ): Pick<User, "id"> & Partial<User> {
    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      globalName: user.global_name,
      avatar: user.avatar,
      bot: user.bot,
      system: user.system,
      mfaEnabled: user.mfa_enabled,
      banner: user.banner,
      accentColor: user.accent_color,
      locale: user.locale,
      verified: user.verified,
      email: user.email,
      flags: user.flags,
      premiumType: user.premium_type,
      publicFlags: user.public_flags,
      avatarDecoration: user.avatar_decoration,
    };
  }

  static presenceUserToRaw(
    user: Pick<User, "id"> & Partial<User>
  ): Pick<RawUser, "id"> & Partial<RawUser> {
    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      global_name: user.globalName,
      avatar: user.avatar,
      bot: user.bot,
      system: user.system,
      mfa_enabled: user.mfaEnabled,
      banner: user.banner,
      accent_color: user.accentColor,
      locale: user.locale,
      verified: user.verified,
      email: user.email,
      flags: user.flags,
      premium_type: user.premiumType,
      public_flags: user.publicFlags,
      avatar_decoration: user.avatarDecoration,
    };
  }
}
