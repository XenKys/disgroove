export const applicationRoleConnectionMetadata = (applicationId: string) =>
  `applications/${applicationId}/role-connections/metadata` as const;
export const guildAutoModerationRules = (guildId: string) =>
  `guilds/${guildId}/auto-moderation/rules` as const;
export const guildAutoModerationRule = (guildId: string, ruleId: string) =>
  `guilds/${guildId}/auto-moderation/rules/${ruleId}` as const;
export const guildAuditLog = (guildId: string) =>
  `guilds/${guildId}/audit-logs` as const;
export const channel = (channelId: string) => `channels/${channelId}` as const;
export const channelMessages = (channelId: string) =>
  `channels/${channelId}/messages` as const;
export const channelMessage = (channelId: string, messageId: string) =>
  `channels/${channelId}/messages/${messageId}` as const;
export const channelMessageCrosspost = (channelId: string, messageId: string) =>
  `channels/${channelId}/messages/${messageId}/crosspost` as const;
export const channelMessageOwnReaction = (
  channelId: string,
  messageId: string,
  emoji: string
) =>
  `channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me` as const;
export const channelMessageUserReaction = (
  channelId: string,
  messageId: string,
  emoji: string,
  userId: string
) =>
  `channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}` as const;
export const channelMessageReaction = (
  channelId: string,
  messageId: string,
  emoji: string
) => `channels/${channelId}/messages/${messageId}/reactions/${emoji}` as const;
export const channelMessageAllReactions = (
  channelId: string,
  messageId: string
) => `channels/${channelId}/messages/${messageId}/reactions` as const;
export const channelBulkDelete = (channelId: string) =>
  `channels/${channelId}/messages/bulk-delete` as const;
export const channelPermission = (channelId: string, overwriteId: string) =>
  `channels/${channelId}/permissions/${overwriteId}` as const;
export const channelInvites = (channelId: string) =>
  `channels/${channelId}/invites` as const;
export const channelFollowers = (channelId: string) =>
  `channels/${channelId}/followers` as const;
export const channelTyping = (channelId: string) =>
  `channels/${channelId}/typing` as const;
export const channelPins = (channelId: string) =>
  `channels/${channelId}/pins` as const;
export const channelPin = (channelId: string, messageId: string) =>
  `channels/${channelId}/pins/${messageId}` as const;
export const channelRecipient = (channelId: string, userId: string) =>
  `channels/${channelId}/recipients/${userId}` as const;
export const guildEmojis = (guildId: string) =>
  `guilds/${guildId}/emojis` as const;
export const guildEmoji = (guildId: string, emojiId: string) =>
  `guilds/${guildId}/emojis/${emojiId}` as const;
export const guilds = () => "/guilds" as const;
export const guild = (guildId: string) => `guilds/${guildId}` as const;
export const guildPreview = (guildId: string) =>
  `guilds/${guildId}/preview` as const;
export const guildChannels = (guildId: string) =>
  `guilds/${guildId}/channels` as const;
export const guildMember = (guildId: string, userId: string | "@me" = "@me") =>
  `guilds/${guildId}/members/${userId}` as const;
export const guildMembers = (guildId: string) =>
  `guilds/${guildId}/members` as const;
export const guildMembersSearch = (guildId: string) =>
  `guilds/${guildId}/members/search` as const;
export const guildCurrentMemberNickname = (guildId: string) =>
  `guilds/${guildId}/members/@me/nick` as const;
export const guildMemberRole = (
  guildId: string,
  memberId: string,
  roleId: string
) => `guilds/${guildId}/members/${memberId}/roles/${roleId}` as const;
export const guildMFA = (guildId: string) => `guilds/${guildId}/mfa` as const;
export const guildBans = (guildId: string) => `guilds/${guildId}/bans` as const;
export const guildBan = (guildId: string, userId: string) =>
  `guilds/${guildId}/bans/${userId}` as const;
export const guildRoles = (guildId: string) =>
  `guilds/${guildId}/roles` as const;
export const guildRole = (guildId: string, roleId: string) =>
  `guilds/${guildId}/roles/${roleId}` as const;
export const guildPrune = (guildId: string) =>
  `guilds/${guildId}/prune` as const;
export const guildVoiceRegions = (guildId: string) =>
  `guilds/${guildId}/regions` as const;
export const guildInvites = (guildId: string) =>
  `guilds/${guildId}/invites` as const;
export const guildIntegrations = (guildId: string) =>
  `guilds/${guildId}/integrations` as const;
export const guildIntegration = (guildId: string, integrationId: string) =>
  `guilds/${guildId}/integrations/${integrationId}` as const;
export const guildWidgetSettings = (guildId: string) =>
  `guilds/${guildId}/widget` as const;
export const guildWidgetJSON = (guildId: string) =>
  `guilds/${guildId}/widget.json` as const;
export const guildVanityUrl = (guildId: string) =>
  `guilds/${guildId}/vanity-url` as const;
export const guildWidgetImage = (guildId: string) =>
  `guilds/${guildId}/widget.png` as const;
export const guildOnboarding = (guildId: string) =>
  `guilds/${guildId}/onboarding` as const;
export const invite = (code: string) => `invites/${code}` as const;
export const template = (code: string) => `guilds/templates/${code}` as const;
export const guildTemplates = (guildId: string) =>
  `guilds/${guildId}/templates` as const;
export const guildTemplate = (guildId: string, code: string) =>
  `guilds/${guildId}/templates/${code}` as const;
export const threads = (channelId: string, messageId?: string) =>
  messageId
    ? `channels/${channelId}/messages/${messageId}/threads`
    : (`channels/${channelId}/threads` as const);
export const guildActiveThreads = (guildId: string) =>
  `guilds/${guildId}/threads/active` as const;
export const channelThreads = (
  channelId: string,
  archivedStatus: "public" | "private"
) => `channels/${channelId}/threads/archived/${archivedStatus}` as const;
export const channelPublicArchivedThreads = (channelId: string) =>
  `channels/${channelId}/threads/archived/public` as const;
export const channelPrivateArchivedThreads = (channelId: string) =>
  `channels/${channelId}/threads/archived/private` as const;
export const channelJoinedPrivateArchivedThreads = (channelId: string) =>
  `channels/${channelId}/users/@me/threads/archived/private` as const;
export const threadMembers = (threadId: string, userId?: string | "@me") =>
  userId
    ? `channels/${threadId}/thread-members`
    : (`channels/${threadId}/thread-members/${userId}` as const);
export const user = (userId: string | "@me" = "@me") =>
  `users/${userId}` as const;
export const userApplicationRoleConnection = (applicationId: string) =>
  `users/@me/applications/${applicationId}/role-connection` as const;
export const userGuilds = () => `users/@me/guilds` as const;
export const userGuild = (guildId: string) =>
  `users/@me/guilds/${guildId}` as const;
export const userChannels = () => `users/@me/channels` as const;
export const userConnections = () => `users/@me/connections` as const;
export const voiceRegions = () => `voice/regions` as const;
export const channelWebhooks = (channelId: string) =>
  `channels/${channelId}/webhooks` as const;
export const guildWebhooks = (guildId: string) =>
  `guilds/${guildId}/webhooks` as const;
export const webhook = (webhookId: string, webhookToken?: string) =>
  webhookToken
    ? `webhooks/${webhookId}/${webhookToken}`
    : `webhooks/${webhookId}`;
export const webhookMessage = (
  webhookId: string,
  webhookToken: string,
  messageId: string | "@original" = "@original"
) => `webhooks/${webhookId}/${webhookToken}/messages/${messageId}` as const;
export const webhookPlatform = (
  webhookId: string,
  webhookToken: string,
  platform: "github" | "slack"
) => `webhooks/${webhookId}/${webhookToken}/${platform}` as const;
export const gateway = () => `gateway` as const;
export const gatewayBot = () => `gateway/bot` as const;
export const oauth2CurrentApplication = () =>
  `oauth2/applications/@me` as const;
export const oauth2CurrentAuthorization = () => `oauth2/@me` as const;
export const oauth2Authorization = () => `oauth2/authorize` as const;
export const oauth2TokenExchange = () => `oauth2/token` as const;
export const oauth2TokenRevocation = () => `oauth2/token/revoke` as const;
export const applicationCommands = (applicationId: string) =>
  `applications/${applicationId}/commands` as const;
export const applicationCommand = (applicationId: string, commandId: string) =>
  `applications/${applicationId}/commands/${commandId}` as const;
export const applicationGuildCommands = (
  applicationId: string,
  guildId: string
) => `applications/${applicationId}/guilds/${guildId}/commands` as const;
export const applicationGuildCommand = (
  applicationId: string,
  guildId: string,
  commandId: string
) =>
  `applications/${applicationId}/guilds/${guildId}/commands/${commandId}` as const;
export const interactionCallback = (
  interactionId: string,
  interactionToken: string
) => `interactions/${interactionId}/${interactionToken}/callback` as const;
export const interactionOriginalMessage = (
  interactionId: string,
  interactionToken: string
) =>
  `interactions/${interactionId}/${interactionToken}/messages/@original` as const;
export const guildMemberVerification = (guildId: string) =>
  `guilds/${guildId}/member-verification` as const;
export const guildVoiceState = (
  guildId: string,
  userId: string | "@me" = "@me"
) => `guilds/${guildId}/voice-states/${userId}` as const;
export const guildApplicationCommandsPermissions = (
  applicationId: string,
  guildId: string
) =>
  `applications/${applicationId}/guilds/${guildId}/commands/permissions` as const;
export const applicationCommandPermissions = (
  applicationId: string,
  guildId: string,
  commandId: string
) =>
  `applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions` as const;
export const applicationCurrentUser = () => `applications/@me` as const;
export const guildWelcomeScreen = (guildId: string) =>
  `guilds/${guildId}/welcome-screen` as const;
export const stageInstances = () => `stage-instances` as const;
export const stageInstance = (channelId: string) =>
  `stage-instances/${channelId}` as const;
export const sticker = (stickerId: string) => `stickers/${stickerId}` as const;
export const nitroStickerPacks = () => "/sticker-packs" as const;
export const guildStickers = (guildId: string) =>
  `guilds/${guildId}/stickers` as const;
export const guildSticker = (guildId: string, stickerId: string) =>
  `guilds/${guildId}/stickers/${stickerId}` as const;
export const guildScheduledEvents = (guildId: string) =>
  `guilds/${guildId}/scheduled-events` as const;
export const guildScheduledEvent = (
  guildId: string,
  guildScheduledEventId: string
) => `guilds/${guildId}/scheduled-events/${guildScheduledEventId}` as const;
export const guildScheduledEventUsers = (
  guildId: string,
  guildScheduledEventId: string
) =>
  `guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users` as const;
