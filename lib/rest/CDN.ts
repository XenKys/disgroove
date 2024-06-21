import type { snowflake } from "../types";

export const achievementIcon = (
  applicationId: snowflake,
  achievementId: snowflake,
  iconHash: string
) =>
  `https://cdn.discordapp.com/app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}.png` as const;
export const applicationAsset = (
  applicationId: snowflake,
  assetId: snowflake
) =>
  `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png` as const;
export const applicationCover = (
  applicationId: snowflake,
  coverImage: string
) =>
  `https://cdn.discordapp.com/app-icons/${applicationId}/${coverImage}.png` as const;
export const applicationIcon = (applicationId: snowflake, icon: string) =>
  `https://cdn.discordapp.com/app-icons/${applicationId}/${icon}.png` as const;
export const customEmoji = (emojiId: snowflake) =>
  `https://cdn.discordapp.com/emojis/${emojiId}.png` as const;
export const defaultUserAvatar = (index: string) =>
  `https://cdn.discordapp.com/embed/avatars/${index}.png` as const;
export const guildBanner = (guildId: snowflake, banner: string) =>
  `https://cdn.discordapp.com/banners/${guildId}/${banner}.png` as const;
export const guildDiscoverySplash = (guildId: snowflake, splash: string) =>
  `https://cdn.discordapp.com/discovery-splashes/${guildId}/${splash}.png` as const;
export const guildIcon = (guildId: snowflake, icon: string) =>
  `https://cdn.discordapp.com/icons/${guildId}/${icon}.png` as const;
export const guildMemberAvatar = (
  guildId: snowflake,
  userId: snowflake,
  avatar: string
) =>
  `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/avatars/${avatar}.png` as const;
export const guildMemberBanner = (
  guildId: snowflake,
  userId: snowflake,
  banner: string
) =>
  `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/banners/${banner}.png` as const;
export const guildScheduledEventCover = (
  scheduledEventId: snowflake,
  coverImage: string
) =>
  `https://cdn.discordapp.com/guild-events/${scheduledEventId}/${coverImage}.png` as const;
export const guildSplash = (guildId: snowflake, splash: string) =>
  `https://cdn.discordapp.com/splashes/${guildId}/${splash}.png` as const;
export const roleIcon = (roleId: snowflake, icon: string) =>
  `https://cdn.discordapp.com/role-icons/${roleId}/${icon}.png` as const;
export const stickerPackBanner = (assetId: snowflake) =>
  `https://cdn.discordapp.com/app-assets/710982414301790216/store/${assetId}.png` as const;
export const sticker = (stickerId: snowflake) =>
  `https://cdn.discordapp.com/stickers/${stickerId}.png` as const;
export const storePageAsset = (applicationId: snowflake, assetId: snowflake) =>
  `https://cdn.discordapp.com/app-assets/${applicationId}/store/${assetId}` as const;
export const teamIcon = (teamId: snowflake, icon: string) =>
  `https://cdn.discordapp.com/team-icons/${teamId}/${icon}.png` as const;
export const userAvatar = (userId: snowflake, avatar: string) =>
  `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png` as const;
export const userAvatarDecoration = (
  userId: snowflake,
  avatarDecoration: string
) =>
  `https://cdn.discordapp.com/avatar-decorations/${userId}/${avatarDecoration}.png` as const;
export const userBanner = (userId: snowflake, banner: string) =>
  `https://cdn.discordapp.com/banners/${userId}/${banner}.png` as const;
