/* https://discord.com/developers/docs/reference#image-formatting */

import { ImageFormats } from "../constants";
import type { snowflake } from "../types/common";

export const cdnURL = (
  cdnEndpoint: string,
  imageFormat: ImageFormats = ImageFormats.PNG
) => `https://cdn.discordapp.com/${cdnEndpoint}.${imageFormat}` as const;

export const achievementIcon = (
  applicationId: snowflake,
  achievementId: snowflake,
  iconHash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) =>
  cdnURL(
    `app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}`,
    imageFormat
  );
export const applicationAsset = (
  applicationId: snowflake,
  assetId: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-assets/${applicationId}/${assetId}`, imageFormat);
export const applicationCover = (
  applicationId: snowflake,
  coverImage: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-icons/${applicationId}/${coverImage}`, imageFormat);
export const applicationIcon = (
  applicationId: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-icons/${applicationId}/${icon}`, imageFormat);
export const customEmoji = (
  emojiId: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`emojis/${emojiId}`, imageFormat);
export const defaultUserAvatar = (index: string) =>
  cdnURL(`embed/avatars/${index}`);
export const guildBanner = (
  guildId: snowflake,
  banner: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`banners/${guildId}/${banner}`, imageFormat);
export const guildDiscoverySplash = (
  guildId: snowflake,
  splash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`discovery-splashes/${guildId}/${splash}`, imageFormat);
export const guildIcon = (
  guildId: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`icons/${guildId}/${icon}`, imageFormat);
export const guildMemberAvatar = (
  guildId: snowflake,
  userId: snowflake,
  avatar: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`guilds/${guildId}/users/${userId}/avatars/${avatar}`, imageFormat);
export const guildMemberBanner = (
  guildId: snowflake,
  userId: snowflake,
  banner: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`guilds/${guildId}/users/${userId}/banners/${banner}`, imageFormat);
export const guildScheduledEventCover = (
  scheduledEventId: snowflake,
  coverImage: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`guild-events/${scheduledEventId}/${coverImage}`, imageFormat);
export const guildSplash = (
  guildId: snowflake,
  splash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`splashes/${guildId}/${splash}`, imageFormat);
export const guildTagBadge = (
  guildId: snowflake,
  hash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`guild-tag-badges/${guildId}/${hash}`, imageFormat);
export const roleIcon = (
  roleId: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`role-icons/${roleId}/${icon}`, imageFormat);
export const stickerPackBanner = (
  assetId: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-assets/710982414301790216/store/${assetId}`, imageFormat);
export const sticker = (
  stickerId: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.Lottie
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`stickers/${stickerId}`, imageFormat);
export const storePageAsset = (
  applicationId: snowflake,
  assetId: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-assets/${applicationId}/store/${assetId}`, imageFormat);
export const soundboardSound = (soundId: snowflake) =>
  cdnURL(`soundboard-sounds/${soundId}`);
export const teamIcon = (
  teamId: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`team-icons/${teamId}/${icon}`, imageFormat);
export const userAvatar = (
  userId: snowflake,
  avatar: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`avatars/${userId}/${avatar}`, imageFormat);
export const userAvatarDecoration = (
  userId: snowflake,
  avatarDecoration: string
) => cdnURL(`avatar-decorations/${userId}/${avatarDecoration}`);
export const userBanner = (
  userId: snowflake,
  banner: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`banners/${userId}/${banner}`, imageFormat);
