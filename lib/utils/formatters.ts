import { GuildNavigationTypes, type TimestampStyles } from "../constants";
import type { snowflake } from "../types/common";

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function userMention(userID: snowflake): string {
  return `<@${userID}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function channelMention(channelID: snowflake): string {
  return `<#${channelID}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function roleMention(roleID: snowflake): string {
  return `<@&${roleID}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function slashCommandMention(
  commandName: string,
  commandID: snowflake,
  subCommandName?: string,
  subCommandGroupName?: string
): string {
  return subCommandName
    ? subCommandGroupName
      ? `</${commandName} ${subCommandGroupName} ${subCommandName}:${commandID}>`
      : `</${commandName} ${subCommandName}:${commandID}>`
    : `</${commandName}:${commandID}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function customEmoji(
  emojiName: string,
  emojiID: snowflake,
  animated?: boolean
): string {
  return animated
    ? `<a:${emojiName}:${emojiID}>`
    : `<:${emojiName}:${emojiID}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function unixTimestamp(time: number, style?: TimestampStyles): string {
  return style ? `<t:${time}:${style}>` : `<t:${time}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function guildNavigation(
  guildID: snowflake,
  type: GuildNavigationTypes,
  roleID?: snowflake
): string {
  return roleID && type === GuildNavigationTypes.LinkedRoles
    ? `<${guildID}:${type}:${roleID}>`
    : `<${guildID}:${type}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function email(username: string, domain: string) {
  return `<${username}:${domain}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function phoneNumber(number: number) {
  return `<+${phoneNumber}>`;
}
