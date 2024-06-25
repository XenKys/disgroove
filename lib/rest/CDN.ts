import type { snowflake } from "../types/common";

export const achievementIcon = (
  applicationID: snowflake,
  achievementID: snowflake,
  iconHash: string
) =>
  `https://cdn.discordapp.com/app-assets/${applicationID}/achievements/${achievementID}/icons/${iconHash}.png` as const;
export const applicationAsset = (
  applicationID: snowflake,
  assetID: snowflake
) =>
  `https://cdn.discordapp.com/app-assets/${applicationID}/${assetID}.png` as const;
export const applicationCover = (
  applicationID: snowflake,
  coverImage: string
) =>
  `https://cdn.discordapp.com/app-icons/${applicationID}/${coverImage}.png` as const;
export const applicationIcon = (applicationID: snowflake, icon: string) =>
  `https://cdn.discordapp.com/app-icons/${applicationID}/${icon}.png` as const;
export const customEmoji = (emojiID: snowflake) =>
  `https://cdn.discordapp.com/emojis/${emojiID}.png` as const;
export const defaultUserAvatar = (index: string) =>
  `https://cdn.discordapp.com/embed/avatars/${index}.png` as const;
export const guildBanner = (guildID: snowflake, banner: string) =>
  `https://cdn.discordapp.com/banners/${guildID}/${banner}.png` as const;
export const guildDiscoverySplash = (guildID: snowflake, splash: string) =>
  `https://cdn.discordapp.com/discovery-splashes/${guildID}/${splash}.png` as const;
export const guildIcon = (guildID: snowflake, icon: string) =>
  `https://cdn.discordapp.com/icons/${guildID}/${icon}.png` as const;
export const guildMemberAvatar = (
  guildID: snowflake,
  userID: snowflake,
  avatar: string
) =>
  `https://cdn.discordapp.com/guilds/${guildID}/users/${userID}/avatars/${avatar}.png` as const;
export const guildMemberBanner = (
  guildID: snowflake,
  userID: snowflake,
  banner: string
) =>
  `https://cdn.discordapp.com/guilds/${guildID}/users/${userID}/banners/${banner}.png` as const;
export const guildScheduledEventCover = (
  scheduledEventID: snowflake,
  coverImage: string
) =>
  `https://cdn.discordapp.com/guild-events/${scheduledEventID}/${coverImage}.png` as const;
export const guildSplash = (guildID: snowflake, splash: string) =>
  `https://cdn.discordapp.com/splashes/${guildID}/${splash}.png` as const;
export const roleIcon = (roleID: snowflake, icon: string) =>
  `https://cdn.discordapp.com/role-icons/${roleID}/${icon}.png` as const;
export const stickerPackBanner = (assetID: snowflake) =>
  `https://cdn.discordapp.com/app-assets/710982414301790216/store/${assetID}.png` as const;
export const sticker = (stickerID: snowflake) =>
  `https://cdn.discordapp.com/stickers/${stickerID}.png` as const;
export const storePageAsset = (applicationID: snowflake, assetID: snowflake) =>
  `https://cdn.discordapp.com/app-assets/${applicationID}/store/${assetID}` as const;
export const teamIcon = (teamID: snowflake, icon: string) =>
  `https://cdn.discordapp.com/team-icons/${teamID}/${icon}.png` as const;
export const userAvatar = (userID: snowflake, avatar: string) =>
  `https://cdn.discordapp.com/avatars/${userID}/${avatar}.png` as const;
export const userAvatarDecoration = (
  userID: snowflake,
  avatarDecoration: string
) =>
  `https://cdn.discordapp.com/avatar-decorations/${userID}/${avatarDecoration}.png` as const;
export const userBanner = (userID: snowflake, banner: string) =>
  `https://cdn.discordapp.com/banners/${userID}/${banner}.png` as const;
