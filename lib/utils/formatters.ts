/* https://discord.com/developers/docs/reference#message-formatting */

import type { GuildNavigationTypes, TimestampStyles } from "../constants";
import type { snowflake } from "../types/common";

export function userMention(userID: snowflake): string {
  return `<@${userID}>`;
}

export function channelMention(channelID: snowflake): string {
  return `<#${channelID}>`;
}

export function roleMention(roleID: snowflake): string {
  return `<@&${roleID}>`;
}

export function slashCommandMention(
  commandName: string,
  commandID: snowflake,
  subCommandName: string,
  subCommandGroupName: string
): string {
  return subCommandName
    ? subCommandGroupName
      ? `</${commandName} ${subCommandGroupName}  ${subCommandName}:${commandID}>`
      : `</${commandName} ${subCommandName}:${commandID}>`
    : `</${commandName}:${commandID}>`;
}

export function customEmoji(
  emojiName: string,
  emojiID: snowflake,
  animated?: boolean
): string {
  return animated
    ? `<a:${emojiName}:${emojiID}>`
    : `<:${emojiName}:${emojiID}>`;
}

export function unixTimestamp(time: number, style?: TimestampStyles): string {
  return style ? `<t:${time}:${style}>` : `<t:${time}>`;
}

export function guildNavigation(
  guildID: snowflake,
  type: GuildNavigationTypes
): string {
  return `<${guildID}:${type}>`;
}
