import type {
  RawGuildApplicationCommandPermissions,
  GuildApplicationCommandPermissions,
} from "../types/application-command";
import type {
  RawGuild,
  Guild,
  RawGuildMember,
  GuildMember,
  RawIntegration,
  Integration,
} from "../types/guild";
import { Emojis } from "./Emojis";
import { Roles } from "./Roles";
import { Stickers } from "./Stickers";
import { Users } from "./Users";

export class Guilds {
  static guildApplicationCommandPermissionsFromRaw(
    guildApplicationCommandPermissions: RawGuildApplicationCommandPermissions
  ): GuildApplicationCommandPermissions {
    return {
      id: guildApplicationCommandPermissions.id,
      applicationID: guildApplicationCommandPermissions.application_id,
      guildID: guildApplicationCommandPermissions.guild_id,
      permissions: guildApplicationCommandPermissions.permissions.map(
        (permission) => ({
          id: permission.id,
          type: permission.type,
          permission: permission.permission,
        })
      ),
    };
  }

  static guildApplicationCommandPermissionsToRaw(
    guildApplicationCommandPermissions: GuildApplicationCommandPermissions
  ): RawGuildApplicationCommandPermissions {
    return {
      id: guildApplicationCommandPermissions.id,
      application_id: guildApplicationCommandPermissions.applicationID,
      guild_id: guildApplicationCommandPermissions.guildID,
      permissions: guildApplicationCommandPermissions.permissions.map(
        (permission) => ({
          id: permission.id,
          type: permission.type,
          permission: permission.permission,
        })
      ),
    };
  }

  static guildFromRaw(guild: RawGuild): Guild {
    return {
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      iconHash: guild.icon,
      splash: guild.splash,
      discoverySplash: guild.discovery_splash,
      owner: guild.owner,
      ownerID: guild.owner_id,
      permissions: guild.permissions,
      region: guild.region,
      afkChannelID: guild.afk_channel_id,
      afkTimeout: guild.afk_timeout,
      widgetEnabled: guild.widget_enabled,
      widgetChannelID: guild.widget_channel_id,
      verificationLevel: guild.verification_level,
      defaultMessageNotifications: guild.default_message_notifications,
      explicitContentFilter: guild.explicit_content_filter,
      roles: guild.roles.map((role) => Roles.roleFromRaw(role)),
      emojis: guild.emojis.map((emoji) => Emojis.emojiFromRaw(emoji)),
      features: guild.features,
      mfaLevel: guild.mfa_level,
      applicationID: guild.application_id,
      systemChannelID: guild.system_channel_id,
      systemChannelFlags: guild.system_channel_flags,
      rulesChannelID: guild.rules_channel_id,
      maxPresences: guild.max_presences,
      maxMembers: guild.max_members,
      vanityURLCode: guild.vanity_url_code,
      description: guild.description,
      banner: guild.banner,
      premiumTier: guild.premium_tier,
      premiumSubscriptionCount: guild.premium_subscription_count,
      preferredLocale: guild.preferred_locale,
      publicUpdatesChannelID: guild.public_updates_channel_id,
      maxVideoChannelUsers: guild.max_video_channel_users,
      maxStageVideoChannelUsers: guild.max_stage_video_channel_users,
      approximateMemberCount: guild.approximate_member_count,
      approximatePresenceCount: guild.approximate_presence_count,
      welcomeScreen:
        guild.welcome_screen !== undefined
          ? {
              description: guild.welcome_screen.description,
              welcomeChannels: guild.welcome_screen.welcome_channels.map(
                (welcomeScreenChannel) => ({
                  channelID: welcomeScreenChannel.channel_id,
                  description: welcomeScreenChannel.description,
                  emojiID: welcomeScreenChannel.emoji_id,
                  emojiName: welcomeScreenChannel.emoji_name,
                })
              ),
            }
          : undefined,
      nsfwLevel: guild.nsfw_level,
      stickers: guild.stickers?.map((sticker) =>
        Stickers.stickerFromRaw(sticker)
      ),
      premiumProgressBarEnabled: guild.premium_progress_bar_enabled,
      safetyAlertsChannelID: guild.safety_alerts_channel_id,
    };
  }

  static guildMemberFromRaw(guildMember: RawGuildMember): GuildMember {
    return {
      user:
        guildMember.user !== undefined
          ? Users.userFromRaw(guildMember.user)
          : undefined,
      nick: guildMember.nick,
      avatar: guildMember.avatar,
      roles: guildMember.roles,
      joinedAt: guildMember.joined_at,
      premiumSince: guildMember.premium_since,
      deaf: guildMember.deaf,
      mute: guildMember.mute,
      flags: guildMember.flags,
      pending: guildMember.pending,
      permissions: guildMember.permissions,
      communicationDisabledUntil: guildMember.communication_disabled_until,
    };
  }

  static guildMemberToRaw(guildMember: GuildMember): RawGuildMember {
    return {
      user:
        guildMember.user !== undefined
          ? Users.userToRaw(guildMember.user)
          : undefined,
      nick: guildMember.nick,
      avatar: guildMember.avatar,
      roles: guildMember.roles,
      joined_at: guildMember.joinedAt,
      premium_since: guildMember.premiumSince,
      deaf: guildMember.deaf,
      mute: guildMember.mute,
      flags: guildMember.flags,
      pending: guildMember.pending,
      permissions: guildMember.permissions,
      communication_disabled_until: guildMember.communicationDisabledUntil,
    };
  }

  static guildToRaw(guild: Guild): RawGuild {
    return {
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      icon_hash: guild.icon,
      splash: guild.splash,
      discovery_splash: guild.discoverySplash,
      owner: guild.owner,
      owner_id: guild.ownerID,
      permissions: guild.permissions,
      region: guild.region,
      afk_channel_id: guild.afkChannelID,
      afk_timeout: guild.afkTimeout,
      widget_enabled: guild.widgetEnabled,
      widget_channel_id: guild.widgetChannelID,
      verification_level: guild.verificationLevel,
      default_message_notifications: guild.defaultMessageNotifications,
      explicit_content_filter: guild.explicitContentFilter,
      roles: guild.roles.map((role) => Roles.roleToRaw(role)),
      emojis: guild.emojis.map((emoji) => Emojis.emojiToRaw(emoji)),
      features: guild.features,
      mfa_level: guild.mfaLevel,
      application_id: guild.applicationID,
      system_channel_id: guild.systemChannelID,
      system_channel_flags: guild.systemChannelFlags,
      rules_channel_id: guild.rulesChannelID,
      max_presences: guild.maxPresences,
      max_members: guild.maxMembers,
      vanity_url_code: guild.vanityURLCode,
      description: guild.description,
      banner: guild.banner,
      premium_tier: guild.premiumTier,
      premium_subscription_count: guild.premiumSubscriptionCount,
      preferred_locale: guild.preferredLocale,
      public_updates_channel_id: guild.publicUpdatesChannelID,
      max_video_channel_users: guild.maxVideoChannelUsers,
      max_stage_video_channel_users: guild.maxStageVideoChannelUsers,
      approximate_member_count: guild.approximateMemberCount,
      approximate_presence_count: guild.approximatePresenceCount,
      welcome_screen:
        guild.welcomeScreen !== undefined
          ? {
              description: guild.welcomeScreen.description,
              welcome_channels: guild.welcomeScreen.welcomeChannels.map(
                (welcomeScreenChannel) => ({
                  channel_id: welcomeScreenChannel.channelID,
                  description: welcomeScreenChannel.description,
                  emoji_id: welcomeScreenChannel.emojiID,
                  emoji_name: welcomeScreenChannel.emojiName,
                })
              ),
            }
          : undefined,
      nsfw_level: guild.nsfwLevel,
      stickers: guild.stickers?.map((sticker) =>
        Stickers.stickerToRaw(sticker)
      ),
      premium_progress_bar_enabled: guild.premiumProgressBarEnabled,
      safety_alerts_channel_id: guild.safetyAlertsChannelID,
    };
  }

  static integrationFromRaw(integration: RawIntegration): Integration {
    return {
      id: integration.id,
      name: integration.name,
      type: integration.type,
      enabled: integration.enabled,
      syncing: integration.syncing,
      roleID: integration.role_id,
      enableEmoticons: integration.enable_emoticons,
      expireBehavior: integration.expire_behavior,
      expireGracePeriod: integration.expire_grace_period,
      user:
        integration.user !== undefined
          ? Users.userFromRaw(integration.user)
          : undefined,
      account: integration.account,
      syncedAt: integration.synced_at,
      subscriberCount: integration.subscriber_count,
      revoked: integration.revoked,
      application:
        integration.application !== undefined
          ? {
              id: integration.application.id,
              name: integration.application.name,
              icon: integration.application.icon,
              description: integration.application.description,
              bot:
                integration.application.bot !== undefined
                  ? Users.userFromRaw(integration.application.bot)
                  : undefined,
            }
          : undefined,
      scopes: integration.scopes,
    };
  }

  static integrationToRaw(integration: Integration): RawIntegration {
    return {
      id: integration.id,
      name: integration.name,
      type: integration.type,
      enabled: integration.enabled,
      syncing: integration.syncing,
      role_id: integration.roleID,
      enable_emoticons: integration.enableEmoticons,
      expire_behavior: integration.expireBehavior,
      expire_grace_period: integration.expireGracePeriod,
      user:
        integration.user !== undefined
          ? Users.userToRaw(integration.user)
          : undefined,
      account: integration.account,
      synced_at: integration.syncedAt,
      subscriber_count: integration.subscriberCount,
      revoked: integration.revoked,
      application:
        integration.application !== undefined
          ? {
              id: integration.application.id,
              name: integration.application.name,
              icon: integration.application.icon,
              description: integration.application.description,
              bot:
                integration.application.bot !== undefined
                  ? Users.userToRaw(integration.application.bot)
                  : undefined,
            }
          : undefined,
      scopes: integration.scopes,
    };
  }
}
