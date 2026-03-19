import type {
  Collectibles,
  Nameplate,
  RawCollectibles,
  RawNameplate,
  RawUser,
  User,
} from "../types/user";

export class Users {
  static collectiblesFromRaw(collectibles: RawCollectibles): Collectibles {
    return {
      nameplate:
        collectibles.nameplate !== undefined
          ? this.nameplateFromRaw(collectibles.nameplate)
          : undefined,
    };
  }

  static collectiblesToRaw(collectibles: Collectibles): RawCollectibles {
    return {
      nameplate:
        collectibles.nameplate !== undefined
          ? this.nameplateToRaw(collectibles.nameplate)
          : undefined,
    };
  }

  static nameplateFromRaw(nameplate: RawNameplate): Nameplate {
    return {
      skuId: nameplate.sku_id,
      asset: nameplate.asset,
      label: nameplate.label,
      palette: nameplate.palette,
    };
  }

  static nameplateToRaw(nameplate: Nameplate): RawNameplate {
    return {
      sku_id: nameplate.skuId,
      asset: nameplate.asset,
      label: nameplate.label,
      palette: nameplate.palette,
    };
  }

  static userFromRaw(user: RawUser): User {
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
      avatarDecorationData:
        user.avatar_decoration_data !== undefined
          ? user.avatar_decoration_data !== null
            ? {
                asset: user.avatar_decoration_data.asset,
                skuId: user.avatar_decoration_data.sku_id,
              }
            : null
          : undefined,
      collectibles:
        user.collectibles !== undefined
          ? user.collectibles !== null
            ? this.collectiblesFromRaw(user.collectibles)
            : null
          : undefined,
      primaryGuild:
        user.primary_guild !== undefined
          ? user.primary_guild !== null
            ? {
                identityGuildId: user.primary_guild.identity_guild_id,
                identityEnabled: user.primary_guild.identity_enabled,
                tag: user.primary_guild.tag,
                badge: user.primary_guild.badge,
              }
            : null
          : undefined,
    };
  }

  static userToRaw(user: User): RawUser {
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
      avatar_decoration_data:
        user.avatarDecorationData !== undefined
          ? user.avatarDecorationData !== null
            ? {
                asset: user.avatarDecorationData.asset,
                sku_id: user.avatarDecorationData.skuId,
              }
            : null
          : undefined,
      collectibles:
        user.collectibles !== undefined
          ? user.collectibles !== null
            ? this.collectiblesToRaw(user.collectibles)
            : null
          : undefined,
      primary_guild:
        user.primaryGuild !== undefined
          ? user.primaryGuild !== null
            ? {
                identity_guild_id: user.primaryGuild.identityGuildId,
                identity_enabled: user.primaryGuild.identityEnabled,
                tag: user.primaryGuild.tag,
                badge: user.primaryGuild.badge,
              }
            : null
          : undefined,
    };
  }
}
