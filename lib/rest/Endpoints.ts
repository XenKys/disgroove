import type { snowflake } from "../types/common";

// Guilds
export const guild = (guildID: snowflake) => `guilds/${guildID}` as const;
export const guilds = () => "guilds" as const;
export const guildActiveThreads = (guildID: snowflake) =>
  `guilds/${guildID}/threads/active` as const;
export const guildAuditLog = (guildID: snowflake) =>
  `guilds/${guildID}/audit-logs` as const;
export const guildAutoModerationRule = (
  guildID: snowflake,
  ruleID: snowflake
) => `guilds/${guildID}/auto-moderation/rules/${ruleID}` as const;
export const guildAutoModerationRules = (guildID: snowflake) =>
  `guilds/${guildID}/auto-moderation/rules` as const;
export const guildBan = (guildID: snowflake, userID: snowflake) =>
  `guilds/${guildID}/bans/${userID}` as const;
export const guildBans = (guildID: snowflake) =>
  `guilds/${guildID}/bans` as const;
export const guildBulkBan = (guildID: snowflake) =>
  `guilds/${guildID}/bulk-ban` as const;
export const guildChannels = (guildID: snowflake) =>
  `guilds/${guildID}/channels` as const;
export const guildMemberNickname = (guildID: snowflake) =>
  `guilds/${guildID}/members/@me/nick` as const;
export const guildEmoji = (guildID: snowflake, emojiID: snowflake) =>
  `guilds/${guildID}/emojis/${emojiID}` as const;
export const guildEmojis = (guildID: snowflake) =>
  `guilds/${guildID}/emojis` as const;
export const guildIncidentsActions = (guildID: snowflake) =>
  `guilds/${guildID}/incidents-actions` as const;
export const guildIntegration = (
  guildID: snowflake,
  integrationID: snowflake
) => `guilds/${guildID}/integrations/${integrationID}` as const;
export const guildIntegrations = (guildID: snowflake) =>
  `guilds/${guildID}/integrations` as const;
export const guildInvites = (guildID: snowflake) =>
  `guilds/${guildID}/invites` as const;
export const guildMFA = (guildID: snowflake) =>
  `guilds/${guildID}/mfa` as const;
export const guildMember = (
  guildID: snowflake,
  userID: snowflake | "@me" = "@me"
) => `guilds/${guildID}/members/${userID}` as const;
export const guildMemberRole = (
  guildID: snowflake,
  memberID: snowflake,
  roleID: snowflake
) => `guilds/${guildID}/members/${memberID}/roles/${roleID}` as const;
export const guildMembers = (guildID: snowflake) =>
  `guilds/${guildID}/members` as const;
export const guildMembersSearch = (guildID: snowflake) =>
  `guilds/${guildID}/members/search` as const;
export const guildMemberVerification = (guildID: snowflake) =>
  `guilds/${guildID}/member-verification` as const;
export const guildOnboarding = (guildID: snowflake) =>
  `guilds/${guildID}/onboarding` as const;
export const guildPreview = (guildID: snowflake) =>
  `guilds/${guildID}/preview` as const;
export const guildPrune = (guildID: snowflake) =>
  `guilds/${guildID}/prune` as const;
export const guildRole = (guildID: snowflake, roleID: snowflake) =>
  `guilds/${guildID}/roles/${roleID}` as const;
export const guildRoles = (guildID: snowflake) =>
  `guilds/${guildID}/roles` as const;
export const guildScheduledEvent = (
  guildID: snowflake,
  guildScheduledEventID: snowflake
) => `guilds/${guildID}/scheduled-events/${guildScheduledEventID}` as const;
export const guildScheduledEvents = (guildID: snowflake) =>
  `guilds/${guildID}/scheduled-events` as const;
export const guildScheduledEventUsers = (
  guildID: snowflake,
  guildScheduledEventID: snowflake
) =>
  `guilds/${guildID}/scheduled-events/${guildScheduledEventID}/users` as const;
export const guildSoundboardSound = (guildID: snowflake, soundID: snowflake) =>
  `guilds/${guildID}/soundboard-sounds/${soundID}` as const;
export const guildSoundboardSounds = (guildID: snowflake) =>
  `guilds/${guildID}/soundboard-sounds` as const;
export const guildSticker = (guildID: snowflake, stickerID: snowflake) =>
  `guilds/${guildID}/stickers/${stickerID}` as const;
export const guildStickers = (guildID: snowflake) =>
  `guilds/${guildID}/stickers` as const;
export const guildTemplate = (guildID: snowflake, code: string) =>
  `guilds/${guildID}/templates/${code}` as const;
export const guildTemplates = (guildID: snowflake) =>
  `guilds/${guildID}/templates` as const;
export const guildVanityURL = (guildID: snowflake) =>
  `guilds/${guildID}/vanity-url` as const;
export const guildVoiceRegions = (guildID: snowflake) =>
  `guilds/${guildID}/regions` as const;
export const guildVoiceState = (
  guildID: snowflake,
  userID: snowflake | "@me" = "@me"
) => `guilds/${guildID}/voice-states/${userID}` as const;
export const guildWebhooks = (guildID: snowflake) =>
  `guilds/${guildID}/webhooks` as const;
export const guildWelcomeScreen = (guildID: snowflake) =>
  `guilds/${guildID}/welcome-screen` as const;
export const guildWidgetImage = (guildID: snowflake) =>
  `guilds/${guildID}/widget.png` as const;

export const guildWidgetJSON = (guildID: snowflake) =>
  `guilds/${guildID}/widget.json` as const;
export const guildWidgetSettings = (guildID: snowflake) =>
  `guilds/${guildID}/widget` as const;
export const template = (code: string) => `guilds/templates/${code}` as const;

// Channels
export const channel = (channelID: snowflake) =>
  `channels/${channelID}` as const;
export const channelBulkDelete = (channelID: snowflake) =>
  `channels/${channelID}/messages/bulk-delete` as const;
export const channelFollowers = (channelID: snowflake) =>
  `channels/${channelID}/followers` as const;
export const channelInvites = (channelID: snowflake) =>
  `channels/${channelID}/invites` as const;
export const channelMessage = (channelID: snowflake, messageID: snowflake) =>
  `channels/${channelID}/messages/${messageID}` as const;
export const channelMessageAllReactions = (
  channelID: snowflake,
  messageID: snowflake,
  emoji?: string
) =>
  emoji
    ? (`channels/${channelID}/messages/${messageID}/reactions/${emoji}` as const)
    : (`channels/${channelID}/messages/${messageID}/reactions` as const);
export const channelMessageCrosspost = (
  channelID: snowflake,
  messageID: snowflake
) => `channels/${channelID}/messages/${messageID}/crosspost` as const;
export const channelMessageReaction = (
  channelID: snowflake,
  messageID: snowflake,
  emoji: string,
  userID: snowflake | "@me" = "@me"
) =>
  `channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}` as const;
export const channelMessages = (channelID: snowflake) =>
  `channels/${channelID}/messages` as const;
export const channelPermission = (
  channelID: snowflake,
  overwriteID: snowflake
) => `channels/${channelID}/permissions/${overwriteID}` as const;
export const channelPin = (channelID: snowflake, messageID: snowflake) =>
  `channels/${channelID}/messages/pins/${messageID}` as const;
export const channelPins = (channelID: snowflake) =>
  `channels/${channelID}/messages/pins` as const;
export const channelRecipient = (channelID: snowflake, userID: snowflake) =>
  `channels/${channelID}/recipients/${userID}` as const;
export const channelThreads = (
  channelID: snowflake,
  archivedStatus: "public" | "private",
  joined: boolean
) =>
  joined
    ? (`channels/${channelID}/users/@me/threads/archived/${archivedStatus}` as const)
    : (`channels/${channelID}/threads/archived/${archivedStatus}` as const);
export const channelTyping = (channelID: snowflake) =>
  `channels/${channelID}/typing` as const;
export const channelWebhooks = (channelID: snowflake) =>
  `channels/${channelID}/webhooks` as const;
export const threads = (channelID: snowflake, messageID?: snowflake) =>
  messageID
    ? (`channels/${channelID}/messages/${messageID}/threads` as const)
    : (`channels/${channelID}/threads` as const);
export const threadMembers = (
  threadID: snowflake,
  userID?: snowflake | "@me"
) =>
  userID
    ? (`channels/${threadID}/thread-members` as const)
    : (`channels/${threadID}/thread-members/${userID}` as const);
export const pollAnswerVoters = (
  channelID: snowflake,
  messageID: snowflake,
  answerID: snowflake
) => `channels/${channelID}/polls/${messageID}/answers/${answerID}` as const;
export const pollExpire = (channelID: snowflake, messageID: snowflake) =>
  `channels/${channelID}/polls/${messageID}/expire` as const;

// Users
export const user = (userID: snowflake | "@me" = "@me") =>
  `users/${userID}` as const;
export const userApplicationRoleConnection = (applicationID: snowflake) =>
  `users/@me/applications/${applicationID}/role-connection` as const;
export const userChannels = () => "users/@me/channels" as const;
export const userConnections = () => "users/@me/connections" as const;
export const userGuild = (guildID: snowflake) =>
  `users/@me/guilds/${guildID}` as const;
export const userGuilds = () => "users/@me/guilds" as const;

// Applications
export const applicationActivityInstance = (
  applicationID: snowflake,
  instanceID: string
) => `applications/${applicationID}/activity-instances/${instanceID}`;
export const applicationCommand = (
  applicationID: snowflake,
  commandID: snowflake
) => `applications/${applicationID}/commands/${commandID}` as const;
export const applicationCommands = (applicationID: snowflake) =>
  `applications/${applicationID}/commands` as const;
export const applicationCommandPermissions = (
  applicationID: snowflake,
  guildID: snowflake,
  commandID: snowflake
) =>
  `applications/${applicationID}/guilds/${guildID}/commands/${commandID}/permissions` as const;
export const applicationUser = () => "applications/@me" as const;
export const applicationEmoji = (
  applicationID: snowflake,
  emojiID: snowflake
) => `applications/${applicationID}/emojis/${emojiID}` as const;
export const applicationEmojis = (applicationID: snowflake) =>
  `applications/${applicationID}/emojis` as const;
export const applicationEntitlement = (
  applicationID: snowflake,
  entitlementID: snowflake
) => `applications/${applicationID}/entitlements/${entitlementID}` as const;
export const applicationEntitlementConsume = (
  applicationID: snowflake,
  entitlementID: snowflake
) =>
  `applications/${applicationID}/entitlements/${entitlementID}/consume` as const;
export const applicationEntitlements = (applicationID: snowflake) =>
  `applications/${applicationID}/entitlements` as const;
export const applicationGuildCommand = (
  applicationID: snowflake,
  guildID: snowflake,
  commandID: snowflake
) =>
  `applications/${applicationID}/guilds/${guildID}/commands/${commandID}` as const;
export const applicationGuildCommands = (
  applicationID: snowflake,
  guildID: snowflake
) => `applications/${applicationID}/guilds/${guildID}/commands` as const;
export const applicationRoleConnectionMetadata = (applicationID: snowflake) =>
  `applications/${applicationID}/role-connections/metadata` as const;
export const applicationSKUs = (applicationID: snowflake) =>
  `applications/${applicationID}/skus` as const;
export const guildApplicationCommandsPermissions = (
  applicationID: snowflake,
  guildID: snowflake
) =>
  `applications/${applicationID}/guilds/${guildID}/commands/permissions` as const;

// Webhooks
export const webhook = (webhookID: snowflake, webhookToken?: string) =>
  webhookToken
    ? (`webhooks/${webhookID}/${webhookToken}` as const)
    : (`webhooks/${webhookID}` as const);
export const webhookMessage = (
  webhookID: snowflake,
  webhookToken: string,
  messageID: snowflake | "@original" = "@original"
) => `webhooks/${webhookID}/${webhookToken}/messages/${messageID}` as const;
export const webhookPlatform = (
  webhookID: snowflake,
  webhookToken: string,
  platform: "github" | "slack"
) => `webhooks/${webhookID}/${webhookToken}/${platform}` as const;

// Sticker packs
export const stickerPack = (packID: snowflake) =>
  `sticker-packs/${packID}` as const;
export const stickerPacks = () => "sticker-packs" as const;

// Subscriptions
export const skuSubscription = (skuID: snowflake, subscriptionID: snowflake) =>
  `skus/${skuID}/subscriptions/${subscriptionID}` as const;
export const skuSubscriptions = (skuID: snowflake) =>
  `skus/${skuID}/subscriptions` as const;

// Soundboards
export const sendSoundboardSound = (channelID: snowflake) =>
  `channels/${channelID}/send-soundboard-sound` as const;
export const soundboardDefaultSounds = () =>
  `soundboard-default-sounds` as const;

// Gateway
export const gateway = () => "gateway" as const;
export const gatewayBot = () => "gateway/bot" as const;

// OAuth2
export const oauth2Authorize = () => "oauth2/authorize" as const;
export const oauth2Application = () => `oauth2/applications/@me` as const;
export const oauth2Authorization = () => "oauth2/@me" as const;
export const oauth2TokenExchange = () => "oauth2/token" as const;
export const oauth2TokenRevocation = () => "oauth2/token/revoke" as const;

// Misc
export const interactionCallback = (
  interactionID: snowflake,
  interactionToken: string
) => `interactions/${interactionID}/${interactionToken}/callback` as const;
export const invite = (code: string) => `invites/${code}` as const;
export const stageInstance = (channelID: snowflake) =>
  `stage-instances/${channelID}` as const;
export const stageInstances = () => "stage-instances" as const;
export const sticker = (stickerID: snowflake) =>
  `stickers/${stickerID}` as const;
export const voiceRegions = () => "voice/regions" as const;
