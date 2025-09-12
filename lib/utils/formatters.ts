import { GuildNavigationTypes, type TimestampStyles } from "../constants";
import type { snowflake } from "../types/common";

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function userMention(userId: snowflake): string {
  return `<@${userId}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function channelMention(channelId: snowflake): string {
  return `<#${channelId}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function roleMention(roleId: snowflake): string {
  return `<@&${roleId}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function slashCommandMention(
  commandName: string,
  commandId: snowflake,
  subCommandName?: string,
  subCommandGroupName?: string
): string {
  return subCommandName
    ? subCommandGroupName
      ? `</${commandName} ${subCommandGroupName} ${subCommandName}:${commandId}>`
      : `</${commandName} ${subCommandName}:${commandId}>`
    : `</${commandName}:${commandId}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function customEmoji(
  emojiName: string,
  emojiId: snowflake,
  animated?: boolean
): string {
  return animated
    ? `<a:${emojiName}:${emojiId}>`
    : `<:${emojiName}:${emojiId}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function unixTimestamp(time: number, style?: TimestampStyles): string {
  return style ? `<t:${time}:${style}>` : `<t:${time}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function guildNavigation(
  guildId: snowflake,
  type: GuildNavigationTypes,
  roleId?: snowflake
): string {
  return roleId && type === GuildNavigationTypes.LinkedRoles
    ? `<${guildId}:${type}:${roleId}>`
    : `<${guildId}:${type}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function email(username: string, domain: string) {
  return `<${username}:${domain}>`;
}

/** https://discord.com/developers/docs/reference#message-formatting-formats */
export function phoneNumber(number: number) {
  return `<+${number}>`;
}
