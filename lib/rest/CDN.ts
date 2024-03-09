export const achievementIcon = (
  applicationId: string,
  achievementId: string,
  iconHash: string
) =>
  `https://cdn.discordapp.com/app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}.png` as const;
export const applicationAsset = (applicationId: string, assetId: string) =>
  `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png` as const;
export const applicationCover = (applicationId: string, coverImage: string) =>
  `https://cdn.discordapp.com/app-icons/${applicationId}/${coverImage}.png` as const;
export const applicationIcon = (applicationId: string, icon: string) =>
  `https://cdn.discordapp.com/app-icons/${applicationId}/${icon}.png` as const;
export const customEmoji = (emojiId: string) =>
  `https://cdn.discordapp.com/emojis/${emojiId}.png` as const;
export const defaultUserAvatar = (index: string) =>
  `https://cdn.discordapp.com/embed/avatars/${index}.png` as const;
export const guildBanner = (guildId: string, banner: string) =>
  `https://cdn.discordapp.com/banners/${guildId}/${banner}.png` as const;
export const guildDiscoverySplash = (guildId: string, splash: string) =>
  `https://cdn.discordapp.com/discovery-splashes/${guildId}/${splash}.png` as const;
export const guildIcon = (guildId: string, icon: string) =>
  `https://cdn.discordapp.com/icons/${guildId}/${icon}.png` as const;
export const guildMemberAvatar = (
  guildId: string,
  userId: string,
  avatar: string
) =>
  `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/avatars/${avatar}.png` as const;
export const guildMemberBanner = (
  guildId: string,
  userId: string,
  banner: string
) =>
  `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/banners/${banner}.png` as const;
export const guildScheduledEventCover = (
  scheduledEventId: string,
  coverImage: string
) =>
  `https://cdn.discordapp.com/guild-events/${scheduledEventId}/${coverImage}.png` as const;
export const guildSplash = (guildId: string, splash: string) =>
  `https://cdn.discordapp.com/splashes/${guildId}/${splash}.png` as const;
export const roleIcon = (roleId: string, icon: string) =>
  `https://cdn.discordapp.com/role-icons/${roleId}/${icon}.png` as const;
export const stickerPackBanner = (assetId: string) =>
  `https://cdn.discordapp.com/app-assets/710982414301790216/store/${assetId}.png` as const;
export const sticker = (stickerId: string) =>
  `https://cdn.discordapp.com/stickers/${stickerId}.png` as const;
export const storePageAsset = (applicationId: string, assetId: string) =>
  `https://cdn.discordapp.com/app-assets/${applicationId}/store/${assetId}` as const;
export const teamIcon = (teamId: string, icon: string) =>
  `https://cdn.discordapp.com/team-icons/${teamId}/${icon}.png` as const;
export const userAvatar = (userId: string, avatar: string) =>
  `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png` as const;
export const userAvatarDecoration = (
  userId: string,
  avatarDecoration: string
) =>
  `https://cdn.discordapp.com/avatar-decorations/${userId}/${avatarDecoration}.png` as const;
export const userBanner = (userId: string, banner: string) =>
  `https://cdn.discordapp.com/banners/${userId}/${banner}.png` as const;
