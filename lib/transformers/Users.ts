import type { RawUser, User } from "../types/user";

export class Users {
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
      avatarDecoration: user.avatar_decoration,
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
      avatar_decoration: user.avatarDecoration,
    };
  }
}
