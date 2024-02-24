export const achievementIcon = (
  applicationId: string,
  achievementId: string,
  iconHash: string
) =>
  `app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}.png` as const;
export const applicationAsset = (applicationId: string, assetId: string) =>
  `app-assets/${applicationId}/${assetId}.png` as const;
export const applicationCover = (applicationId: string, coverImage: string) =>
  `app-icons/${applicationId}/${coverImage}.png` as const;
export const applicationIcon = (applicationId: string, icon: string) =>
  `app-icons/${applicationId}/${icon}.png` as const;
export const customEmoji = (emojiId: string) =>
  `emojis/${emojiId}.png` as const;
export const defaultUserAvatar = (index: string) =>
  `embed/avatars/${index}.png` as const;
export const guildBanner = (guildId: string, banner: string) =>
  `banners/${guildId}/${banner}.png` as const;
export const guildDiscoverySplash = (guildId: string, splash: string) =>
  `discovery-splashes/${guildId}/${splash}.png` as const;
export const guildIcon = (guildId: string, icon: string) =>
  `icons/${guildId}/${icon}.png` as const;
export const guildMemberAvatar = (
  guildId: string,
  userId: string,
  avatar: string
) => `guilds/${guildId}/users/${userId}/avatars/${avatar}.png` as const;
export const guildMemberBanner = (
  guildId: string,
  userId: string,
  banner: string
) => `guilds/${guildId}/users/${userId}/banners/${banner}.png` as const;
export const guildScheduledEventCover = (
  scheduledEventId: string,
  coverImage: string
) => `guild-events/${scheduledEventId}/${coverImage}.png` as const;
export const guildSplash = (guildId: string, splash: string) =>
  `splashes/${guildId}/${splash}.png` as const;
export const roleIcon = (roleId: string, icon: string) =>
  `role-icons/${roleId}/${icon}.png` as const;
export const stickerPackBanner = (assetId: string) =>
  `app-assets/710982414301790216/store/${assetId}.png` as const;
export const sticker = (stickerId: string) =>
  `stickers/${stickerId}.png` as const;
export const storePageAsset = (applicationId: string, assetId: string) =>
  `app-assets/${applicationId}/store/${assetId}` as const;
export const teamIcon = (teamId: string, icon: string) =>
  `team-icons/${teamId}/${icon}.png` as const;
export const userAvatar = (userId: string, avatar: string) =>
  `avatars/${userId}/${avatar}.png` as const;
export const userAvatarDecoration = (
  userId: string,
  avatarDecoration: string
) => `avatar-decorations/${userId}/${avatarDecoration}.png` as const;
export const userBanner = (userId: string, banner: string) =>
  `banners/${userId}/${banner}.png` as const;
