import type { snowflake } from "../types";

// Guilds
export const bulkGuildBan = (guildId: snowflake) =>
  `guilds/${guildId}/bulk-ban` as const;
export const guild = (guildId: snowflake) => `guilds/${guildId}` as const;
export const guilds = () => "guilds" as const;
export const guildActiveThreads = (guildId: snowflake) =>
  `guilds/${guildId}/threads/active` as const;
export const guildAuditLog = (guildId: snowflake) =>
  `guilds/${guildId}/audit-logs` as const;
export const guildAutoModerationRule = (
  guildId: snowflake,
  ruleId: snowflake
) => `guilds/${guildId}/auto-moderation/rules/${ruleId}` as const;
export const guildAutoModerationRules = (guildId: snowflake) =>
  `guilds/${guildId}/auto-moderation/rules` as const;
export const guildBan = (guildId: snowflake, userId: snowflake) =>
  `guilds/${guildId}/bans/${userId}` as const;
export const guildBans = (guildId: snowflake) =>
  `guilds/${guildId}/bans` as const;
export const guildChannels = (guildId: snowflake) =>
  `guilds/${guildId}/channels` as const;
export const guildCurrentMemberNickname = (guildId: snowflake) =>
  `guilds/${guildId}/members/@me/nick` as const;
export const guildEmoji = (guildId: snowflake, emojiId: snowflake) =>
  `guilds/${guildId}/emojis/${emojiId}` as const;
export const guildEmojis = (guildId: snowflake) =>
  `guilds/${guildId}/emojis` as const;
export const guildIntegration = (
  guildId: snowflake,
  integrationId: snowflake
) => `guilds/${guildId}/integrations/${integrationId}` as const;
export const guildIntegrations = (guildId: snowflake) =>
  `guilds/${guildId}/integrations` as const;
export const guildInvites = (guildId: snowflake) =>
  `guilds/${guildId}/invites` as const;
export const guildMFA = (guildId: snowflake) =>
  `guilds/${guildId}/mfa` as const;
export const guildMember = (
  guildId: snowflake,
  userId: snowflake | "@me" = "@me"
) => `guilds/${guildId}/members/${userId}` as const;
export const guildMemberRole = (
  guildId: snowflake,
  memberId: snowflake,
  roleId: snowflake
) => `guilds/${guildId}/members/${memberId}/roles/${roleId}` as const;
export const guildMembers = (guildId: snowflake) =>
  `guilds/${guildId}/members` as const;
export const guildMembersSearch = (guildId: snowflake) =>
  `guilds/${guildId}/members/search` as const;
export const guildMemberVerification = (guildId: snowflake) =>
  `guilds/${guildId}/member-verification` as const;
export const guildOnboarding = (guildId: snowflake) =>
  `guilds/${guildId}/onboarding` as const;
export const guildPreview = (guildId: snowflake) =>
  `guilds/${guildId}/preview` as const;
export const guildPrune = (guildId: snowflake) =>
  `guilds/${guildId}/prune` as const;
export const guildRole = (guildId: snowflake, roleId: snowflake) =>
  `guilds/${guildId}/roles/${roleId}` as const;
export const guildRoles = (guildId: snowflake) =>
  `guilds/${guildId}/roles` as const;
export const guildScheduledEvent = (
  guildId: snowflake,
  guildScheduledEventId: snowflake
) => `guilds/${guildId}/scheduled-events/${guildScheduledEventId}` as const;
export const guildScheduledEvents = (guildId: snowflake) =>
  `guilds/${guildId}/scheduled-events` as const;
export const guildScheduledEventUsers = (
  guildId: snowflake,
  guildScheduledEventId: snowflake
) =>
  `guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users` as const;
export const guildSticker = (guildId: snowflake, stickerId: snowflake) =>
  `guilds/${guildId}/stickers/${stickerId}` as const;
export const guildStickers = (guildId: snowflake) =>
  `guilds/${guildId}/stickers` as const;
export const guildTemplate = (guildId: snowflake, code: string) =>
  `guilds/${guildId}/templates/${code}` as const;
export const guildTemplates = (guildId: snowflake) =>
  `guilds/${guildId}/templates` as const;
export const guildVanityUrl = (guildId: snowflake) =>
  `guilds/${guildId}/vanity-url` as const;
export const guildVoiceRegions = (guildId: snowflake) =>
  `guilds/${guildId}/regions` as const;
export const guildVoiceState = (
  guildId: snowflake,
  userId: snowflake | "@me" = "@me"
) => `guilds/${guildId}/voice-states/${userId}` as const;
export const guildWebhooks = (guildId: snowflake) =>
  `guilds/${guildId}/webhooks` as const;
export const guildWelcomeScreen = (guildId: snowflake) =>
  `guilds/${guildId}/welcome-screen` as const;
export const guildWidgetImage = (guildId: snowflake) =>
  `guilds/${guildId}/widget.png` as const;

export const guildWidgetJSON = (guildId: snowflake) =>
  `guilds/${guildId}/widget.json` as const;
export const guildWidgetSettings = (guildId: snowflake) =>
  `guilds/${guildId}/widget` as const;
export const template = (code: string) => `guilds/templates/${code}` as const;

// Channels
export const channel = (channelId: snowflake) =>
  `channels/${channelId}` as const;
export const channelBulkDelete = (channelId: snowflake) =>
  `channels/${channelId}/messages/bulk-delete` as const;
export const channelFollowers = (channelId: snowflake) =>
  `channels/${channelId}/followers` as const;
export const channelInvites = (channelId: snowflake) =>
  `channels/${channelId}/invites` as const;
export const channelMessage = (channelId: snowflake, messageId: snowflake) =>
  `channels/${channelId}/messages/${messageId}` as const;
export const channelMessageAllReactions = (
  channelId: snowflake,
  messageId: snowflake,
  emoji?: string
) =>
  emoji
    ? (`channels/${channelId}/messages/${messageId}/reactions/${emoji}` as const)
    : (`channels/${channelId}/messages/${messageId}/reactions` as const);
export const channelMessageCrosspost = (
  channelId: snowflake,
  messageId: snowflake
) => `channels/${channelId}/messages/${messageId}/crosspost` as const;
export const channelMessageReaction = (
  channelId: snowflake,
  messageId: snowflake,
  emoji: string,
  userId: snowflake | "@me" = "@me"
) =>
  `channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}` as const;
export const channelMessages = (channelId: snowflake) =>
  `channels/${channelId}/messages` as const;
export const channelPermission = (
  channelId: snowflake,
  overwriteId: snowflake
) => `channels/${channelId}/permissions/${overwriteId}` as const;
export const channelPin = (channelId: snowflake, messageId: snowflake) =>
  `channels/${channelId}/pins/${messageId}` as const;
export const channelPins = (channelId: snowflake) =>
  `channels/${channelId}/pins` as const;
export const channelRecipient = (channelId: snowflake, userId: snowflake) =>
  `channels/${channelId}/recipients/${userId}` as const;
export const channelThreads = (
  channelId: snowflake,
  archivedStatus: "public" | "private",
  joined: boolean
) =>
  joined
    ? (`channels/${channelId}/users/@me/threads/archived/${archivedStatus}` as const)
    : (`channels/${channelId}/threads/archived/${archivedStatus}` as const);
export const channelTyping = (channelId: snowflake) =>
  `channels/${channelId}/typing` as const;
export const channelWebhooks = (channelId: snowflake) =>
  `channels/${channelId}/webhooks` as const;
export const threads = (channelId: snowflake, messageId?: snowflake) =>
  messageId
    ? (`channels/${channelId}/messages/${messageId}/threads` as const)
    : (`channels/${channelId}/threads` as const);
export const threadMembers = (
  threadId: snowflake,
  userId?: snowflake | "@me"
) =>
  userId
    ? (`channels/${threadId}/thread-members` as const)
    : (`channels/${threadId}/thread-members/${userId}` as const);
export const pollAnswerVoters = (
  channelId: snowflake,
  messageId: snowflake,
  answerId: snowflake
) => `channels/${channelId}/polls/${messageId}/answers/${answerId}` as const;
export const pollExpire = (channelId: snowflake, messageId: snowflake) =>
  `channels/${channelId}/polls/${messageId}/expire` as const;

// Users
export const user = (userId: snowflake | "@me" = "@me") =>
  `users/${userId}` as const;
export const userApplicationRoleConnection = (applicationId: snowflake) =>
  `users/@me/applications/${applicationId}/role-connection` as const;
export const userChannels = () => "users/@me/channels" as const;
export const userConnections = () => "users/@me/connections" as const;
export const userGuild = (guildId: snowflake) =>
  `users/@me/guilds/${guildId}` as const;
export const userGuilds = () => "users/@me/guilds" as const;

// Applications
export const applicationCommand = (
  applicationId: snowflake,
  commandId: snowflake
) => `applications/${applicationId}/commands/${commandId}` as const;
export const applicationCommands = (applicationId: snowflake) =>
  `applications/${applicationId}/commands` as const;
export const applicationCommandPermissions = (
  applicationId: snowflake,
  guildId: snowflake,
  commandId: snowflake
) =>
  `applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions` as const;
export const applicationCurrentUser = () => "applications/@me" as const;
export const applicationEntitlement = (
  applicationId: snowflake,
  entitlementId: snowflake
) => `applications/${applicationId}/entitlements/${entitlementId}` as const;
export const applicationEntitlementConsume = (
  applicationId: snowflake,
  entitlementId: snowflake
) =>
  `applications/${applicationId}/entitlements/${entitlementId}/consume` as const;
export const applicationEntitlements = (applicationId: snowflake) =>
  `applications/${applicationId}/entitlements` as const;
export const applicationGuildCommand = (
  applicationId: snowflake,
  guildId: snowflake,
  commandId: snowflake
) =>
  `applications/${applicationId}/guilds/${guildId}/commands/${commandId}` as const;
export const applicationGuildCommands = (
  applicationId: snowflake,
  guildId: snowflake
) => `applications/${applicationId}/guilds/${guildId}/commands` as const;
export const applicationRoleConnectionMetadata = (applicationId: snowflake) =>
  `applications/${applicationId}/role-connections/metadata` as const;
export const applicationSkus = (applicationId: snowflake) =>
  `applications/${applicationId}/skus` as const;
export const guildApplicationCommandsPermissions = (
  applicationId: snowflake,
  guildId: snowflake
) =>
  `applications/${applicationId}/guilds/${guildId}/commands/permissions` as const;

// Webhooks
export const webhook = (webhookId: snowflake, webhookToken?: string) =>
  webhookToken
    ? (`webhooks/${webhookId}/${webhookToken}` as const)
    : (`webhooks/${webhookId}` as const);
export const webhookMessage = (
  webhookId: snowflake,
  webhookToken: string,
  messageId: snowflake | "@original" = "@original"
) => `webhooks/${webhookId}/${webhookToken}/messages/${messageId}` as const;
export const webhookPlatform = (
  webhookId: snowflake,
  webhookToken: string,
  platform: "github" | "slack"
) => `webhooks/${webhookId}/${webhookToken}/${platform}` as const;

// Gateway
export const gateway = () => "gateway" as const;
export const gatewayBot = () => "gateway/bot" as const;

// OAuth2
export const oauth2Authorization = () => "oauth2/authorize" as const;
export const oauth2CurrentApplication = () =>
  `oauth2/applications/@me` as const;
export const oauth2CurrentAuthorization = () => "oauth2/@me" as const;
export const oauth2TokenExchange = () => "oauth2/token" as const;
export const oauth2TokenRevocation = () => "oauth2/token/revoke" as const;

// Misc
export const interactionCallback = (
  interactionId: snowflake,
  interactionToken: string
) => `interactions/${interactionId}/${interactionToken}/callback` as const;
export const invite = (code: string) => `invites/${code}` as const;
export const stageInstance = (channelId: snowflake) =>
  `stage-instances/${channelId}` as const;
export const stageInstances = () => "stage-instances" as const;
export const sticker = (stickerId: snowflake) =>
  `stickers/${stickerId}` as const;
export const stickerPacks = () => "sticker-packs" as const;
export const voiceRegions = () => "voice/regions" as const;
