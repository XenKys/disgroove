/* https://discord.com/developers/docs/reference#image-formatting-image-formats */
export enum ImageFormats {
  JPG = "JPG",
  JPEG = "jpeg",
  PNG = "png",
  WebP = "webp",
  GIF = "gif",
  Lottie = "json",
}

/* https://discord.com/developers/docs/reference#locales */
export enum Locale {
  Indonesian = "id",
  EnglishUS = "en-US",
  EnglishGB = "en-GB",
  Bulgarian = "bg",
  ChineseCN = "zh-CN",
  ChineseTW = "zh-TW",
  Croatian = "hr",
  Czech = "cs",
  Danish = "da",
  Dutch = "nl",
  Finnish = "fi",
  French = "fr",
  German = "de",
  Greek = "el",
  Hindi = "hi",
  Hungarian = "hu",
  Italian = "it",
  Japanese = "ja",
  Korean = "ko",
  Lithuanian = "lt",
  Norwegian = "no",
  Polish = "pl",
  PortugueseBR = "pt-BR",
  Romanian = "ro",
  Russian = "ru",
  SpanishES = "es-ES",
  Swedish = "sv-SE",
  Thai = "th",
  Turkish = "tr",
  Ukrainian = "uk",
  Vietnamese = "vi",
}

/* https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types */
export enum ApplicationCommandTypes {
  ChatInput = 1,
  User = 2,
  Message = 3,
}

/* https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11,
}

/* https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type */
export enum ApplicationCommandPermissionType {
  Role = 1,
  User = 2,
  Channel = 3,
}

/* https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type */
export enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

/* https://discord.com/developers/docs/interactions/message-components#component-object-component-types */
export enum ComponentTypes {
  ActionRow = 1,
  Button = 2,
  StringSelect = 3,
  TextInput = 4,
  UserSelect = 5,
  RoleSelect = 6,
  MentionableSelect = 7,
  ChannelSelect = 8,
}

/* https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type */
export enum InteractionCallbackType {
  Pong = 1,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource,
  DeferredUpdateMessage,
  UpdateMessage,
  ApplicationCommandAutocompleteResult,
  Modal,
}

/* https://discord.com/developers/docs/interactions/message-components#button-object-button-styles */
export enum ButtonStyles {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5,
}

/* https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles */
export enum TextInputStyles {
  Short = 1,
  Paragraph = 2,
}

/* https://discord.com/developers/docs/resources/application#application-object-application-flags */
export enum ApplicationFlags {
  GatewayPresence = 1 << 12,
  GatewayPresenceLimited = 1 << 13,
  GatewayGuildMembers = 1 << 14,
  GatewayGuildMembersLimited = 1 << 15,
  VerificationPendingGuildLimit = 1 << 16,
  Embedded = 1 << 17,
  GatewayMessageContent = 1 << 18,
  GatewayMessageContentLimited = 1 << 19,
  ApplicationCommandBadge = 1 << 23,
}

/* https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type */
export enum ApplicationRoleConnectionMetadataType {
  IntegerLessThanOrEqual = 1,
  IntegerGreaterThanOrEqual = 2,
  IntegerEqual = 3,
  IntegerNotEqual = 4,
  DatetimeLessThanOrEqual = 5,
  DatetimeGreaterThanOrEqual = 6,
  BooleanEqual = 7,
  BooleanNotEqual = 8,
}

/* https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum AuditLogEvents {
  GuildUpdate = 1,
  ChannelCreate = 10,
  ChannelUpdate = 11,
  ChannelDelete = 12,
  ChannelOverwriteCreate = 13,
  ChannelOverwriteUpdate = 14,
  ChannelOverwriteDelete = 15,
  MemberKick = 20,
  MemberPrune = 21,
  MemberBanAdd = 22,
  MemberBanRemove = 23,
  MemberUpdate = 24,
  MemberRoleUpdate = 25,
  MemberMove = 26,
  MemberDisconnect = 27,
  BotAdd = 28,
  RoleCreate = 30,
  RoleUpdate = 31,
  RoleDelete = 32,
  InviteCreate = 40,
  InviteUpdate = 41,
  InviteDelete = 42,
  WebhookCreate = 50,
  WebhookUpdate = 51,
  WebhookDelete = 52,
  EmojiCreate = 60,
  EmojiUpdate = 61,
  EmojiDelete = 62,
  MessageDelete = 72,
  MessageBulkDelete = 73,
  MessagePin = 74,
  MessageUnpin = 75,
  IntegrationCreate = 80,
  IntegrationUpdate = 81,
  IntegrationDelete = 82,
  StageInstanceCreate = 83,
  StageInstanceUpdate = 84,
  StageInstanceDelete = 85,
  StickerCreate = 90,
  StickerUpdate = 91,
  StickerDelete = 92,
  GuildScheduledEventCreate = 100,
  GuildScheduledEventUpdate = 101,
  GuildScheduledEventDelete = 102,
  ThreadCreate = 110,
  ThreadUpdate = 111,
  ThreadDelete = 112,
  ApplicationCommandPermissionUpdate = 121,
  AutoModerationRuleCreate = 140,
  AutoModerationRuleUpdate = 141,
  AutoModerationRuleDelete = 142,
  AutoModerationBlockMessage = 143,
  AutoModerationFlagToChannel = 144,
  AutoModerationUserCommunicationDisabled = 145,
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types */
export enum TriggerTypes {
  Keyword = 1,
  Spam = 3,
  KeywordPreset = 4,
  MentionSpam = 5,
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types */
export enum KeywordPresetTypes {
  Profanity = 1,
  SexualContent = 2,
  Slurs = 3,
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types */
export enum EventTypes {
  MessageSend = 1,
}

/* https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types */
export enum ActionTypes {
  BlockMessage = 1,
  SendAlertMessage = 2,
  Timeout = 3,
}

/* https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum ChannelTypes {
  GuildText = 0,
  DM = 1,
  GuildVoice = 2,
  GroupDM = 3,
  GuildCategory = 4,
  GuildAnnouncement = 5,
  AnnouncementThread = 10,
  PublicThread = 11,
  PrivateThread = 12,
  GuildStageVoice = 13,
  GuildDirectory = 14,
  GuildForum = 15,
}

/* https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes */
export enum VideoQualityModes {
  Auto = 1,
  Full = 2,
}

/* https://discord.com/developers/docs/resources/channel#channel-object-channel-flags */
export enum ChannelFlags {
  Pinned = 1 << 1,
  RequiredTag = 1 << 4,
}

/* https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types */
export enum SortOrderTypes {
  LatestActivity = 0,
  CreationDate = 1,
}

/* https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types */
export enum ForumLayoutTypes {
  NotSet = 0,
  ListView = 1,
  GalleryView = 2,
}

/* https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum MessageTypes {
  Default = 0,
  RecipientAdd = 1,
  RecipientRemove = 2,
  Call = 3,
  ChannelNameChange = 4,
  ChannelIconChange = 5,
  ChannelPinnedMessage = 6,
  UserJoin = 7,
  GuildBoost = 8,
  GuildBoostTier1 = 9,
  GuildBoostTier2 = 10,
  GuildBoostTier3 = 11,
  ChannelFollowAdd = 12,
  GuildDiscoveryDisqualified = 14,
  GuildDiscoveryRequalified = 15,
  GuildDiscoveryGracePeriodInitialWarning = 16,
  GuildDiscoveryGracePeriodFinalWarning = 17,
  ThreadCreated = 18,
  Reply = 19,
  ChatInputCommand = 20,
  ThreadStarterMessage = 21,
  GuildInviteReminder = 22,
  ContextMenuCommand = 23,
  AutoModerationAction = 24,
  RoleSubscriptionPurchase = 25,
  InteractionPremiumUpsell = 26,
  StageStart = 27,
  StageEnd = 28,
  StageSpeaker = 29,
  StageTopic = 31,
  GuildApplicationPremiumSubscription = 32,
}

/* https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate = 2,
  Listen = 3,
  JoinRequest = 5,
}

/* https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum MessageFlags {
  Crossposted = 1 << 0,
  IsCrosspost = 1 << 1,
  SuppressEmbeds = 1 << 2,
  SourceMessageDeleted = 1 << 3,
  Urgent = 1 << 4,
  HasThread = 1 << 5,
  Ephemeral = 1 << 6,
  Loading = 1 << 7,
  FailedToMentionSomeRolesInThread = 1 << 8,
  SuppressNotifications = 1 << 12,
}

/* https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionTypes {
  RoleMentions = "roles",
  UserMentions = "users",
  EveryoneMentions = "everyone",
}

/* https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export enum DefaultMessageNotificationLevel {
  AllMessages = 0,
  OnlyMentions = 1,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export enum ExplicitContentFilterLevel {
  Disabled = 0,
  MembersWithoutRoles = 1,
  AllMembers = 2,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export enum MFALevel {
  None = 0,
  Elevated = 1,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export enum VerificationLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  VeryHigh = 4,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level */
export enum GuildNSFWLevel {
  Default = 0,
  Explicit = 1,
  Safe = 2,
  AgeRestricted = 3,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-premium-tier */
export enum PremiumTier {
  None = 0,
  Tier_1 = 1,
  Tier_2 = 2,
  Tier_3 = 3,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export enum SystemChannelFlags {
  SuppressJoinNotifications = 1 << 0,
  SuppressPremiumSubscriptions = 1 << 1,
  SuppressGuildReminderNotifications = 1 << 2,
  SuppressJoinNotificationReplies = 1 << 3,
  SuppressRoleSubscriptionPurchaseNotifications = 1 << 4,
  SuppressRoleSubscriptionPurchaseNotificationReplies = 1 << 5,
}

/* https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export enum GuildFeatures {
  AnimatedBanner = "ANIMATED_BANNER",
  AnimatedIcon = "ANIMATED_ICON",
  ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
  AutoModeration = "AUTO_MODERATION",
  Banner = "BANNER",
  Community = "COMMUNITY",
  CreatorMonetizableProvisional = "CREATOR_MONETIZABLE_PROVISIONAL",
  CreatorStorePage = "CREATOR_STORE_PAGE",
  DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
  Discoverable = "DISCOVERABLE",
  Featurable = "FEATURABLE",
  InvitesDisabled = "INVITES_DISABLED",
  InviteSplash = "INVITE_SPLASH",
  MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
  MoreStickers = "MORE_STICKERS",
  News = "NEWS",
  Partnered = "PARTNERED",
  PreviewEnabled = "PREVIEW_ENABLED",
  RaidAlertsDisabled = "RaidAlertsDisabled",
  RoleIcons = "ROLE_ICONS",
  RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
  RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
  TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
  VanityURL = "VANITY_URL",
  Verified = "VERIFIED",
  VipRegions = "VIP_REGIONS",
  WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED",
}

/* https://discord.com/developers/docs/resources/guild#guild-object-mutable-guild-features */
export enum MutableGuildFeatures {
  Community = "COMMUNITY",
  InvitesDisabled = "INVITES_DISABLED",
  Discoverable = "DISCOVERABLE",
}

/* https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags */
export enum GuildMemberFlags {
  DidRejoin = 1 << 0,
  CompletedOnboarding = 1 << 1,
  BypassesVerification = 1 << 2,
  StartedOnboarding = 1 << 3,
}

/* https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehaviors {
  RemoveRole = 0,
  Kick = 1,
}

/* https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode */
export enum OnboardingMode {
  OnboardingDefault = 0,
  OnboardingAdvanced = 1,
}

/* https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types */
export enum PromptTypes {
  MultipleChoice = 0,
  Dropdown = 1,
}

/* https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options */
export enum ImageWidgetStyleOptions {
  Shield = "shield",
  Banner1 = "banner1",
  Banner2 = "banner2",
  Banner3 = "banner3",
  Banner4 = "banner4",
}

/* https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level */
export enum GuildScheduledEventPrivacyLevel {
  GuildOnly = 2,
}

/* https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types */
export enum GuildScheduledEventEntityTypes {
  StageIstance = 1,
  Voice = 2,
  External = 3,
}

/* https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status */
export enum GuildScheduledEventStatus {
  Scheduled = 1,
  Active = 2,
  Completed = 3,
  Canceled = 4,
}

/* https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types */
export enum InviteTargetTypes {
  Stream = 1,
  EmbeddedApplication = 2,
}

/* https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level */
export enum PrivacyLevel {
  Public = 1,
  GuildOnly = 2,
}

/* https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
export enum StickerTypes {
  Standard = 1,
  Guild = 2,
}

/* https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
export enum StickerFormatTypes {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3,
  GIF = 4,
}

/* https://discord.com/developers/docs/resources/user#user-object-user-flags */
export enum UserFlags {
  Staff = 1 << 0,
  Partner = 1 << 1,
  Hypesquad = 1 << 2,
  BugHunterLevel_1 = 1 << 3,
  HypesquadOnlineHouse_1 = 1 << 6,
  HypesquadOnlineHouse_2 = 1 << 7,
  HypesquadOnlineHouse_3 = 1 << 8,
  PremiumEarlySupporter = 1 << 9,
  TeamPseudoUser = 1 << 10,
  BugHunterLevel_2 = 1 << 14,
  VerifiedBot = 1 << 16,
  VerifiedDeveloper = 1 << 17,
  CertifiedModerator = 1 << 18,
  BotHTTPInteractions = 1 << 19,
  ActiveDeveloper = 1 << 22,
}

/* https://discord.com/developers/docs/resources/user#user-object-premium-types */
export enum PremiumTypes {
  None = 0,
  NitroClassic = 1,
  Nitro = 2,
  NitroBasic = 3,
}

/* https://discord.com/developers/docs/resources/user#connection-object-services */
export enum Services {
  BattleNet = "battlenet",
  Ebay = "ebay",
  EpicGames = "epicgames",
  Facebook = "facebook",
  GitHub = "github",
  Instagram = "instagram",
  LeagueOfLegends = "leagueoflegends",
  PayPal = "paypal",
  Playstation = "playstation",
  Reddit = "reddit",
  RiotGames = "riotgames",
  Spotify = "spotify",
  Skype = "skype",
  Steam = "steam",
  TikTok = "tiktok",
  Twitch = "twitch",
  Twitter = "twitter",
  Xbox = "xbox",
  YouTube = "youtube",
}

/* https://discord.com/developers/docs/resources/user#connection-object-visibility-types */
export enum VisibilityTypes {
  None = 0,
  Everyone = 1,
}

/* https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
export enum WebhookTypes {
  Incoming = 1,
  ChannelFollower = 2,
  Application = 3,
}

/* https://discord.com/developers/docs/topics/certified-devices#models-device-type */
export enum DeviceType {
  AudioInput = "audioinput",
  AudioOutput = "audiooutput",
  VideoInput = "videoinput",
}

/* https://discord.com/developers/docs/topics/gateway#list-of-intents */
export enum GatewayIntents {
  Guilds = 1 << 0,
  GuildMembers = 1 << 1,
  GuildModeration = 1 << 2,
  GuildEmojisAndStickers = 1 << 3,
  GuildIntegrations = 1 << 4,
  GuildWebhooks = 1 << 5,
  GuildInvites = 1 << 6,
  GuildVoiceStates = 1 << 7,
  GuildPresences = 1 << 8,
  GuildMessages = 1 << 9,
  GuildMessageReactions = 1 << 10,
  GuildMessageTyping = 1 << 11,
  DirectMessages = 1 << 12,
  DirectMessageReactions = 1 << 13,
  DirectMessageTyping = 1 << 14,
  MessageContent = 1 << 15,
  GuildScheduledEvents = 1 << 16,
  AutoModerationConfiguration = 1 << 20,
  AutoModerationActionExecution = 1 << 21,
  AllNonPrivileged = Guilds |
    GuildModeration |
    GuildEmojisAndStickers |
    GuildIntegrations |
    GuildWebhooks |
    GuildInvites |
    GuildVoiceStates |
    GuildMessages |
    GuildMessageReactions |
    GuildMessageTyping |
    DirectMessages |
    DirectMessageReactions |
    DirectMessageTyping |
    GuildScheduledEvents |
    AutoModerationConfiguration |
    AutoModerationActionExecution,
  AllPrivileged = GuildMembers | GuildPresences | MessageContent,
  All = AllNonPrivileged | AllPrivileged,
}

/* https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types */
export enum StatusTypes {
  Online = "online",
  DoNotDisturb = "dnd",
  Idle = "idle",
  Invisible = "invisible",
  Offline = "offline",
}

/* https://discord.com/developers/docs/topics/gateway-events#receive-events */
export enum GatewayEvents {
  Hello = "hello",
  Ready = "ready",
  Resumed = "resumed",
  Reconnect = "reconnect",
  InvalidSession = "invalidSession",
  ApplicationCommandPermissionsUpdate = "applicationCommandPermissionsUpdate",
  AutoModerationRuleCreate = "autoModerationRuleCreate",
  AutoModerationRuleUpdate = "autoModerationRuleUpdate",
  AutoModerationRuleDelete = "autoModerationRuleDelete",
  AutoModerationActionExecution = "autoModerationActionExecution",
  ChannelCreate = "channelCreate",
  ChannelUpdate = "channelUpdate",
  ChannelDelete = "channelDelete",
  ChannelPinsUpdate = "channelPinsUpdate",
  ThreadCreate = "threadCreate",
  ThreadUpdate = "threadUpdate",
  ThreadDelete = "threadDelete",
  ThreadListSync = "threadListSync",
  ThreadMemberUpdate = "threadMemberUpdate",
  ThreadMembersUpdate = "threadMembersUpdate",
  GuildCreate = "guildCreate",
  GuildUpdate = "guildUpdate",
  GuildDelete = "guildDelete",
  GuildAuditLogEntryCreate = "guildAuditLogEntryCreate",
  GuildBanAdd = "guildBanAdd",
  GuildBanRemove = "guildBanRemove",
  GuildEmojisUpdate = "guildEmojisUpdate",
  GuildStickersUpdate = "guildStickersUpdate",
  GuildIntegrationsUpdate = "guildIntegrationsUpdate",
  GuildMemberAdd = "guildMemberAdd",
  GuildMemberRemove = "guildMemberRemove",
  GuildMemberUpdate = "guildMemberUpdate",
  GuildMembersChunk = "guildMembersChunk",
  GuildRoleCreate = "guildRoleCreate",
  GuildRoleUpdate = "guildRoleUpdate",
  GuildRoleDelete = "guildRoleDelete",
  GuildScheduledEventCreate = "guildScheduledEventCreate",
  GuildScheduledEventUpdate = "guildScheduledEventUpdate",
  GuildScheduledEventDelete = "guildScheduledEventDelete",
  GuildScheduledEventUserAdd = "guildScheduledEventUserAdd",
  GuildScheduledEventUserRemove = "guildScheduledEventUserRemove",
  IntegrationCreate = "integrationCreate",
  IntegrationUpdate = "integrationUpdate",
  IntegrationDelete = "integrationDelete",
  InteractionCreate = "interactionCreate",
  InviteCreate = "inviteCreate",
  InviteDelete = "inviteDelete",
  MessageCreate = "messageCreate",
  MessageUpdate = "messageUpdate",
  MessageDelete = "messageDelete",
  MessageDeleteBulk = "messageDeleteBulk",
  MessageReactionAdd = "messageReactionAdd",
  MessageReactionRemove = "messageReactionRemove",
  MessageReactionRemoveAll = "messageReactionRemoveAll",
  MessageReactionRemoveEmoji = "messageReactionRemoveEmoji",
  PresenceUpdate = "presenceUpdate",
  StageInstanceCreate = "stageInstanceCreate",
  StageInstanceUpdate = "stageInstanceUpdate",
  StageInstanceDelete = "stageInstanceDelete",
  TypingStart = "typingStart",
  UserUpdate = "userUpdate",
  VoiceStateUpdate = "voiceStateUpdate",
  VoiceServerUpdate = "voiceServerUpdate",
  WebhooksUpdate = "webhooksUpdate",
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types */
export enum ActivityType {
  Game,
  Streaming,
  Listening,
  Watching,
  Custom,
  Competing,
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags */
export enum ActivityFlags {
  Instance = 1 << 0,
  Join = 1 << 1,
  Spectate = 1 << 2,
  JoinRequest = 1 << 3,
  Sync = 1 << 4,
  Play = 1 << 5,
  PartyPrivacyFriends = 1 << 6,
  PartyPrivacyVoiceChannel = 1 << 7,
  Embedded = 1 << 8,
}

/* https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes */
export enum OAuth2Scopes {
  ActivitiesRead = "activities.read",
  ActivitiesWrite = "activities.write",
  ApplicationsBuildsRead = "applications.builds.read",
  ApplicationsBuildsUpload = "applications.builds.upload",
  ApplicationsCommands = "applications.commands",
  ApplicationsCommandsUpdate = "applications.commands.update",
  ApplicationsCommandsPermissionsUpdate = "applications.commands.permissions.update",
  ApplicationsEntitlements = "applications.entitlements",
  ApplicationsStoreUpdate = "applications.store.update",
  Bot = "bot",
  Connections = "connections",
  DMChannelsRead = "dm_channels.read",
  Email = "email",
  GDMJoin = "gdm.join",
  Guilds = "guilds",
  GuildsJoin = "guilds.join",
  GuildsMembersRead = "guilds.members.read",
  Identify = "identify",
  MessagesRead = "messages.read",
  RelationShipsRead = "relationships.read",
  RoleConnectionsWrite = "role_connections.write",
  RPC = "rpc",
  RPCActivitiesWrite = "rpc.activities.write",
  RPCNotificationsRead = "rpc.notifications.read",
  RPCVoiceRead = "rpc.voice.read",
  RPCVoiceWrite = "rpc.voice.write",
  Voice = "voice",
  WebhookIncoming = "webhook.incoming",
}

/* https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters */
export enum BotAuthParameters {
  ClientId = "client_id",
  Scope = "scope",
  Permissions = "permissions",
  GuildId = "guild_id",
  DisabledGuildSelect = "disable_guild_select",
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes */
export enum GatewayOPCodes {
  Dispatch = 0,
  Heartbeat = 1,
  Identify = 2,
  PresenceUpdate = 3,
  VoiceStateUpdate = 4,
  Resume = 6,
  Reconnect = 7,
  RequestGuildMembers = 8,
  InvalidSession = 9,
  Hello = 10,
  HeartbeatACK = 11,
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes */
export enum GatewayCloseEventCodes {
  UnknownError = 4000,
  UnknownOPCode = 4001,
  DecodeError = 4002,
  NotAuthenticated = 4003,
  AuthenticationFailed = 4004,
  AlreadyAuthenticated = 4005,
  InvalidSequence = 4007,
  RateLimited = 4008,
  SessionTimedOut = 4009,
  InvalidShard = 4010,
  ShardingRequired = 4011,
  InvalidAPIVersion = 4012,
  InvalidIntents = 4013,
  DisallowedIntents = 4014,
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes */
export enum VoiceOPCodes {
  Identify = 0,
  SelectProtocol = 1,
  Ready = 2,
  Heartbeat = 3,
  SessionDescription = 4,
  Speaking = 5,
  HeartbeatACK = 6,
  Resume = 7,
  Hello = 8,
  Resumed = 9,
  ClientDisconnect = 13,
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes */
export enum VoiceCloseEventCodes {
  UnknownOPCode = 4001,
  FailedToDecodePayload = 4002,
  NotAuthenticated = 4003,
  AuthenticationFailed = 4004,
  AlreadyAuthenticated = 4005,
  SessionNoLongerValid = 4006,
  SessionTimeout = 4009,
  ServerNotFound = 4011,
  UnknownProtocol = 4012,
  Disconnect = 4014,
  VoiceServerCrashed = 4015,
  UnknownEncryptionMode = 4016,
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes */
export enum HTTPResponseCodes {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  NotModified = 304,
  BadRequest = 400,
  Unathorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  TooManyRequests = 429,
  GatewayUnavailable = 502,
  ServerError = "5xx",
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
export enum JSONErrorCodes {
  GeneralError,
  UnknownAccount = 10001,
  UnknownApplication,
  UnknownChannel,
  UnknownGuild,
  UnknownIntegration,
  UnknownInvite,
  UnknownMember,
  UnknownMessage,
  UnknownPermissionOverwrite,
  UnknownProvider,
  UnknownRole,
  UnknownToken,
  UnknownUser,
  UnknownEmoji,
  UnknownWebhook,
  UnknownWebhookService,
  UnknownSession = 10020,
  UnknownBan = 10026,
  UnknownSKU,
  UnknownStoreListing,
  UnknownEntitlement,
  UnknownBuild,
  UnknownLobby,
  UnknownBranch,
  UnknownStoreDirectoryLayout,
  UnknownRedistributable = 10036,
  UnknownGiftCode = 10038,
  UnknownStream = 10049,
  UnknownPremiumServerSubscribeCooldown,
  UnknownGuildTemplate = 10057,
  UnknownDiscoverableServerCategory = 10059,
  UnknownSticker,
  UnknownInteraction = 10062,
  UnknownApplicationCommand,
  UnknownVoiceState = 10065,
  UnknownApplicationCommandPermissions,
  UnknownStageInstance,
  UnknownGuildMemberVerificationForm,
  UnknownGuildWelcomeScreen,
  UnknownGuildScheduledEvent,
  UnknownGuildScheduledEventUser,
  UnknownTag = 10087,
  BotsCannotUseThisEndpoint = 20001,
  OnlyBotsCanUseThisEndpoint,
  ExplicitContentCannotBeSentToTheDesiredRecipient = 20009,
  NotAuthorizedToPerformThisActionOnThisApplication = 20012,
  ActionCannotBePerformedDueToSlowmodeRateLimit = 20016,
  TheMazeIsntMeantForYou,
  OnlyTheOwnerOfThisAccountCanPerformThisAction,
  AnnouncementEditLimitExceeded = 20022,
  UnderMinimumAge = 20024,
  ChannelSendRateLimit = 20028,
  ServerSendRateLimit,
  StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords = 20031,
  GuildPremiumSubscriptionLevelTooLow = 20035,
  MaximumNumberOfGuildsReached = 30001,
  MaximumNumberOfFriendsReached,
  MaximumNumberOfPinsReachedForTheChannel,
  MaximumNumberOfRecipientsReached,
  MaximumNumberOfGuildRolesReached,
  MaximumNumberOfWebhooksReached = 30007,
  MaximumNumberOfEmojisReached,
  MaximumNumberOfReactionsReached = 30010,
  MaximumNumberOfGroupDMsReached,
  MaximumNumberOfGuildChannelsReached = 30013,
  MaximumNumberOfAttachmentsInAMessageReached = 30015,
  MaximumNumberOfInvitesReached,
  MaximumNumberOfAnimatedEmojisReached = 30018,
  MaximumNumberOfServerMembersReached,
  MaximumNumberOfServerCategoriesReached = 30030,
  GuildAlreadyHasTemplate = 30031,
  MaximumNumberOfApplicationCommandsReached,
  MaximumThreadParticipantsReached,
  MaximumDailyApplicationCommandCreatesReached,
  MaximumNumberOfNonGuildMemberBansHasBeenExceeded,
  MaximumNumberOfBanFetchesHasBeenReached = 30037,
  MaximumNumberOfUncompletedGuildScheduledEventsReached,
  MaximumNumberOfStickersReached = 30039,
  MaximumNumberOfPruneRequestsHasBeenReached,
  MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached = 30042,
  MaximumNumberOfEditsToMessagesOlderThanOneHourReached = 30046,
  MaximumNumberOfPinnedThreadsInForumHasBeenReached,
  MaximumNumberOfTagsInForumHasBeenReached,
  BitrateIsTooHighForChannelOfThisType = 30052,
  MaximumNumberOfPremiumEmojisReached = 30056,
  MaximumNumberOfWebhooksPerGuildReached = 30058,
  MaximumNumberOfChannelPermissionOverwritesReached = 30060,
  TheChannelsForThisGuildAreTooLarge,
  Unauthorized = 40001,
  VerifyYourAccount,
  OpeningDirectMessagesTooFast,
  SendMessagesHasBeenTemporarilyDisabled,
  RequestEntityTooLarge,
  FeatureTemporarilyDisabledServerSide,
  UserBannedFromThisGuild,
  ConnectionHasBeenRevoked = 40012,
  TargetUserIsNotConnectedToVoice = 40032,
  ThisMessageWasAlreadyCrossposted,
  ApplicationCommandWithThatNameAlreadyExists = 40041,
  ApplicationInteractionFailedToSend = 40043,
  CannotSendAMessageInAForumChannel = 40058,
  InteractionHasAlreadyBeenAcknowledged = 40060,
  TagNamesMustBeUnique,
  ServiceResourceIsBeingRateLimited,
  ThereAreNoTagsAvailableThatCanBeSetByNonModerators = 40066,
  TagRequiredToCreateAForumPostInThisChannel,
  MissingAccess = 50001,
  InvalidAccountType,
  CannotExecuteActionOnDMChannel,
  GuildWidgetDisabled,
  CannotEditMessageAuthoredByAnotherUser,
  CannotSendAnEmptyMessage,
  CannotSendMessagesToThisUser,
  CannotSendMessagesInNonTextChannel,
  ChannelVerificationLevelTooHighForYouToGainAccess,
  OAuth2ApplicationDoesNotHaveBot,
  OAuth2ApplicationLimitReached,
  InvalidOAuth2State,
  MissingPermissions,
  InvalidToken,
  NoteWasTooLong,
  ProvidedTooFewOrTooManyMessagesToDelete,
  InvalidMFALevel,
  MessageCanOnlyBePinnedInTheChannelItWasSentIn = 50019,
  InviteCodeInvalidOrTaken,
  CannotExecuteActionOnSystemMessage,
  CannotExecuteActionOnThisChannelType = 50024,
  InvalidOAuth2AccessToken,
  MissingRequiredOAuth2Scope,
  InvalidWebhookToken = 50027,
  InvalidRole,
  InvalidRecipients = 50033,
  OneOfTheMessagesProvidedWasTooOldForBulkDelete,
  InvalidFormBodyOrContentType,
  InviteAcceptedToGuildWithoutTheBotBeingIn,
  InvalidActivityAction = 50039,
  InvalidAPIVersion = 50041,
  FileUploadedExceedsMaximumSize = 50045,
  InvalidFileUploaded,
  CannotSelfRedeemThisGift = 50054,
  InvalidGuild,
  InvalidRequestOrigin = 50067,
  InvalidMessageType,
  PaymentSourceRequiredToRedeemGift = 50070,
  CannotModifyASystemWebhook = 50073,
  CannotDeleteChannelRequiredForCommunityGuilds,
  CannotEditStickersWithinMessage = 50080,
  InvalidStickerSent,
  InvalidActionOnArchivedThread = 50083,
  InvalidThreadNotificationSettings,
  ParameterEarlierThanCreation,
  CommunityServerChannelsMustBeTextChannels,
  TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor = 50091,
  ServerNotAvailableInYourLocation = 50095,
  ServerNeedsMonetizationEnabledToPerformThisAction = 50097,
  ServerNeedsMoreBoostsToPerformThisAction = 50101,
  RequestBodyContainsInvalidJSON = 50109,
  OwnershipCannotBeMovedToABotUser = 50132,
  FailedToResizeAssetBelowTheMinimumSize = 50138,
  CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji = 50144,
  CannotConvertBetweenPremiumEmojiAndNormalEmoji,
  UploadedFileNotFound,
  YouDoNotHavePermissionToSendThisSticker = 50600,
  TwoFactorAuthenticationIsRequired = 60003,
  NoUsersWithDiscordTagExist = 80004,
  ReactionWasBlocked = 90001,
  ApplicationNotYetAvailable = 110001,
  APIResourceOverloaded = 130000,
  TheStageIsAlreadyOpen = 150006,
  CannotReplyWithoutPermissionToReadMessageHistory = 160002,
  ThreadAlreadyCreatedForMessage = 160004,
  ThreadLocked,
  MaximumActiveThreads,
  MaximumActiveAnnouncementThreads,
  InvalidJSONForUploadedLottieFile = 170001,
  UploadedLottiesCannotContainRasterizedImages,
  StickerMaximumFramerateExceeded,
  StickerFrameCountExceedsMaximumOf1000Frames,
  LottieAnimationMaximumDimensionsExceeded,
  StickerFramerateIsTooSmallOrTooLarge,
  StickerAnimationDurationExceedsMaximumOf5Seconds,
  CannotUpdateAFinishedEvent = 180000,
  FailedToCreateStageNeededForStageEvent = 180002,
  MessageWasBlockedByAutomaticModeration = 200000,
  TitleWasBlockedByAutomaticModeration,
  WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId = 220001,
  WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId,
  WebhooksCanOnlyCreateThreadsInForumChannels,
  WebhookServicesCannotBeUsedInForumChannels,
  MessageBlockedByHarmfulLinksFilter = 240000,
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes */
export enum RPCErrorCodes {
  UnknownError = 1000,
  InvalidPayload = 4000,
  InvalidCommand = 4002,
  InvalidGuild,
  InvalidEvent,
  InvalidChannel,
  InvalidPermissions,
  InvalidClientId,
  InvalidOrigin,
  InvalidToken,
  InvalidUser,
  OAuth2Error = 5000,
  SelectChannelTimedOut,
  GetGuildTimedOut,
  SelectVoiceForceRequired,
  CaptureShortcutAlreadyListening,
}

/* https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes */
export enum RPCCloseEventCodes {
  InvalidClientId = 4000,
  InvalidOrigin,
  RateLimited,
  TokenRevoked,
  InvalidVersion,
  InvalidEncoding,
}

/* https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export const BitwisePermissionFlags = {
  CreateInstantInvite: 1n << 0n,
  KickMembers: 1n << 1n,
  BanMembers: 1n << 2n,
  Administrator: 1n << 3n,
  ManageChannels: 1n << 4n,
  ManageGuild: 1n << 5n,
  AddReactions: 1n << 6n,
  ViewAuditLog: 1n << 7n,
  PrioritySpeaker: 1n << 8n,
  Stream: 1n << 9n,
  ViewChannel: 1n << 10n,
  SendMessages: 1n << 11n,
  SendTTSMessages: 1n << 12n,
  ManageMessages: 1n << 13n,
  EmbedLinks: 1n << 14n,
  AttachFiles: 1n << 15n,
  ReadMessageHistory: 1n << 16n,
  MentionEveryone: 1n << 17n,
  UseExternalEmojis: 1n << 18n,
  ViewGuildInsights: 1n << 19n,
  Connect: 1n << 20n,
  Speak: 1n << 21n,
  MuteMembers: 1n << 22n,
  DeafenMembers: 1n << 23n,
  MoveMembers: 1n << 24n,
  UseVAD: 1n << 25n,
  ChangeNickname: 1n << 26n,
  ManageNicknames: 1n << 27n,
  ManageRoles: 1n << 28n,
  ManageWebhooks: 1n << 29n,
  ManageEmojisAndStickers: 1n << 30n,
  UseApplicationCommands: 1n << 31n,
  RequestToSpeak: 1n << 32n,
  ManageEvents: 1n << 33n,
  ManageThreads: 1n << 34n,
  CreatePublicThreads: 1n << 35n,
  CreatePrivateThreads: 1n << 36n,
  UseExternalStickers: 1n << 37n,
  SendMessagesInThreads: 1n << 38n,
  UseEmbeddedActivities: 1n << 39n,
  ModerateMembers: 1n << 40n,
  All:
    (1n << 0n) +
    (1n << 1n) +
    (1n << 2n) +
    (1n << 3n) +
    (1n << 4n) +
    (1n << 5n) +
    (1n << 6n) +
    (1n << 7n) +
    (1n << 8n) +
    (1n << 9n) +
    (1n << 10n) +
    (1n << 11n) +
    (1n << 12n) +
    (1n << 13n) +
    (1n << 14n) +
    (1n << 15n) +
    (1n << 16n) +
    (1n << 17n) +
    (1n << 18n) +
    (1n << 19n) +
    (1n << 20n) +
    (1n << 21n) +
    (1n << 22n) +
    (1n << 23n) +
    (1n << 24n) +
    (1n << 25n) +
    (1n << 26n) +
    (1n << 27n) +
    (1n << 28n) +
    (1n << 29n) +
    (1n << 30n) +
    (1n << 31n) +
    (1n << 32n) +
    (1n << 33n) +
    (1n << 34n) +
    (1n << 35n) +
    (1n << 36n) +
    (1n << 37n) +
    (1n << 38n) +
    (1n << 39n) +
    (1n << 40n),
} as const;

/* https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum MembershipState {
  Invited = 1,
  Accepted = 2,
}
