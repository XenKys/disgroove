/* https://discord.com/developers/docs/reference#image-formatting */

import { ImageFormats } from "../constants";
import type { snowflake } from "../types/common";

export const cdnURL = (
  cdnEndpoint: string,
  imageFormat: ImageFormats = ImageFormats.PNG
) => `https://cdn.discordapp.com/${cdnEndpoint}.${imageFormat}` as const;

export const achievementIcon = (
  applicationID: snowflake,
  achievementID: snowflake,
  iconHash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) =>
  cdnURL(
    `app-assets/${applicationID}/achievements/${achievementID}/icons/${iconHash}`,
    imageFormat
  );
export const applicationAsset = (
  applicationID: snowflake,
  assetID: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-assets/${applicationID}/${assetID}`, imageFormat);
export const applicationCover = (
  applicationID: snowflake,
  coverImage: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-icons/${applicationID}/${coverImage}`, imageFormat);
export const applicationIcon = (
  applicationID: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-icons/${applicationID}/${icon}`, imageFormat);
export const customEmoji = (
  emojiID: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`emojis/${emojiID}`, imageFormat);
export const defaultUserAvatar = (index: string) =>
  cdnURL(`embed/avatars/${index}`);
export const guildBanner = (
  guildID: snowflake,
  banner: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`banners/${guildID}/${banner}`, imageFormat);
export const guildDiscoverySplash = (
  guildID: snowflake,
  splash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`discovery-splashes/${guildID}/${splash}`, imageFormat);
export const guildIcon = (
  guildID: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`icons/${guildID}/${icon}`, imageFormat);
export const guildMemberAvatar = (
  guildID: snowflake,
  userID: snowflake,
  avatar: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`guilds/${guildID}/users/${userID}/avatars/${avatar}`, imageFormat);
export const guildMemberBanner = (
  guildID: snowflake,
  userID: snowflake,
  banner: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`guilds/${guildID}/users/${userID}/banners/${banner}`, imageFormat);
export const guildScheduledEventCover = (
  scheduledEventID: snowflake,
  coverImage: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`guild-events/${scheduledEventID}/${coverImage}`, imageFormat);
export const guildSplash = (
  guildID: snowflake,
  splash: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`splashes/${guildID}/${splash}`, imageFormat);
export const roleIcon = (
  roleID: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`role-icons/${roleID}/${icon}`, imageFormat);
export const stickerPackBanner = (
  assetID: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-assets/710982414301790216/store/${assetID}`, imageFormat);
export const sticker = (
  stickerID: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.Lottie
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`stickers/${stickerID}`, imageFormat);
export const storePageAsset = (
  applicationID: snowflake,
  assetID: snowflake,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`app-assets/${applicationID}/store/${assetID}`, imageFormat);
export const teamIcon = (
  teamID: snowflake,
  icon: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP = ImageFormats.PNG
) => cdnURL(`team-icons/${teamID}/${icon}`, imageFormat);
export const userAvatar = (
  userID: snowflake,
  avatar: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`avatars/${userID}/${avatar}`, imageFormat);
export const userAvatarDecoration = (
  userID: snowflake,
  avatarDecoration: string
) => cdnURL(`avatar-decorations/${userID}/${avatarDecoration}`);
export const userBanner = (
  userID: snowflake,
  banner: string,
  imageFormat:
    | ImageFormats.PNG
    | ImageFormats.JPEG
    | ImageFormats.JPG
    | ImageFormats.WebP
    | ImageFormats.GIF = ImageFormats.PNG
) => cdnURL(`banners/${userID}/${banner}`, imageFormat);
