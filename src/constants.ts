/** https://discord.com/developers/docs/reference#image-formatting-image-formats */
export enum ImageFormats {
  JPG = "JPG",
  JPEG = "jpeg",
  PNG = "png",
  WebP = "webp",
  GIF = "gif",
  Lottie = "json",
}

/** https://discord.com/developers/docs/reference#locales */
export enum Locale {
  Indonesian = "id",
  Danish = "da",
  German = "de",
  EnglishGB = "en-GB",
  EnglishUS = "en-US",
  SpanishES = "es-ES",
  SpanishLatam = "es-419",
  French = "fr",
  Croatian = "hr",
  Italian = "it",
  Lithuanian = "lt",
  Hungarian = "hu",
  Dutch = "nl",
  Norwegian = "no",
  Polish = "pl",
  PortugueseBR = "pt-BR",
  Romanian = "ro",
  Finnish = "fi",
  Swedish = "sv-SE",
  Vietnamese = "vi",
  Turkish = "tr",
  Czech = "cs",
  Greek = "el",
  Bulgarian = "bg",
  Russian = "ru",
  Ukrainian = "uk",
  Hindi = "hi",
  Thai = "th",
  ChineseCN = "zh-CN",
  Japanese = "ja",
  ChineseTW = "zh-TW",
  Korean = "ko",
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types */
export enum ApplicationCommandTypes {
  ChatInput = 1,
  User,
  Message,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup,
  String,
  Integer,
  Boolean,
  User,
  Channel,
  Role,
  Mentionable,
  Number,
  Attachment,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type */
export enum ApplicationCommandPermissionType {
  Role = 1,
  User,
  Channel,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type */
export enum InteractionType {
  Ping = 1,
  ApplicationCommand,
  MessageComponent,
  ApplicationCommandAutocomplete,
  ModalSubmit,
}

/** https://discord.com/developers/docs/interactions/message-components#component-object-component-types */
export enum ComponentTypes {
  ActionRow = 1,
  Button,
  StringSelect,
  TextInput,
  UserSelect,
  RoleSelect,
  MentionableSelect,
  ChannelSelect,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type */
export enum InteractionCallbackType {
  Pong = 1,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource,
  DeferredUpdateMessage,
  UpdateMessage,
  ApplicationCommandAutocompleteResult,
  Modal,
  PremiumRequired,
}

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-styles */
export enum ButtonStyles {
  Primary = 1,
  Secondary,
  Success,
  Danger,
  Link,
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles */
export enum TextInputStyles {
  Short = 1,
  Paragraph,
}

/** https://discord.com/developers/docs/resources/application#application-object-application-flags */
export enum ApplicationFlags {
  ApplicationAutoModerationRuleCreateBadge = 1 << 6,
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

/** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type */
export enum ApplicationRoleConnectionMetadataType {
  IntegerLessThanOrEqual = 1,
  IntegerGreaterThanOrEqual,
  IntegerEqual,
  IntegerNotEqual,
  DatetimeLessThanOrEqual,
  DatetimeGreaterThanOrEqual,
  BooleanEqual,
  BooleanNotEqual,
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum AuditLogEvents {
  GuildUpdate = 1,
  ChannelCreate = 10,
  ChannelUpdate,
  ChannelDelete,
  ChannelOverwriteCreate,
  ChannelOverwriteUpdate,
  ChannelOverwriteDelete,
  MemberKick = 20,
  MemberPrune,
  MemberBanAdd,
  MemberBanRemove,
  MemberUpdate,
  MemberRoleUpdate,
  MemberMove,
  MemberDisconnect,
  BotAdd,
  RoleCreate = 30,
  RoleUpdate,
  RoleDelete,
  InviteCreate = 40,
  InviteUpdate,
  InviteDelete,
  WebhookCreate = 50,
  WebhookUpdate,
  WebhookDelete,
  EmojiCreate = 60,
  EmojiUpdate,
  EmojiDelete,
  MessageDelete = 72,
  MessageBulkDelete,
  MessagePin,
  MessageUnpin,
  IntegrationCreate = 80,
  IntegrationUpdate,
  IntegrationDelete,
  StageInstanceCreate,
  StageInstanceUpdate,
  StageInstanceDelete,
  StickerCreate = 90,
  StickerUpdate,
  StickerDelete,
  GuildScheduledEventCreate = 100,
  GuildScheduledEventUpdate,
  GuildScheduledEventDelete,
  ThreadCreate = 110,
  ThreadUpdate,
  ThreadDelete,
  ApplicationCommandPermissionUpdate = 121,
  AutoModerationRuleCreate = 140,
  AutoModerationRuleUpdate,
  AutoModerationRuleDelete,
  AutoModerationBlockMessage,
  AutoModerationFlagToChannel,
  AutoModerationUserCommunicationDisabled,
  CreatorMonetizationRequestCreated = 150,
  CreatorMonetizationTermsAccepted,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types */
export enum TriggerTypes {
  Keyword = 1,
  Spam = 3,
  KeywordPreset,
  MentionSpam,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types */
export enum KeywordPresetTypes {
  Profanity = 1,
  SexualContent,
  Slurs,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types */
export enum EventTypes {
  MessageSend = 1,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types */
export enum ActionTypes {
  BlockMessage = 1,
  SendAlertMessage,
  Timeout,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum ChannelTypes {
  GuildText,
  DM,
  GuildVoice,
  GroupDM,
  GuildCategory,
  GuildAnnouncement,
  AnnouncementThread = 10,
  PublicThread,
  PrivateThread,
  GuildStageVoice,
  GuildDirectory,
  GuildForum,
  GuildMedia,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes */
export enum VideoQualityModes {
  Auto = 1,
  Full,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-flags */
export enum ChannelFlags {
  Pinned = 1 << 1,
  RequiredTag = 1 << 4,
  HideMediaDownloadOptions = 1 << 15,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types */
export enum SortOrderTypes {
  LatestActivity,
  CreationDate,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types */
export enum ForumLayoutTypes {
  NotSet,
  ListView,
  GalleryView,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum MessageTypes {
  Default,
  RecipientAdd,
  RecipientRemove,
  Call,
  ChannelNameChange,
  ChannelIconChange,
  ChannelPinnedMessage,
  UserJoin,
  GuildBoost,
  GuildBoostTier1,
  GuildBoostTier2,
  GuildBoostTier3,
  ChannelFollowAdd,
  GuildDiscoveryDisqualified = 14,
  GuildDiscoveryRequalified,
  GuildDiscoveryGracePeriodInitialWarning,
  GuildDiscoveryGracePeriodFinalWarning,
  ThreadCreated,
  Reply,
  ChatInputCommand,
  ThreadStarterMessage,
  GuildInviteReminder,
  ContextMenuCommand,
  AutoModerationAction,
  RoleSubscriptionPurchase,
  InteractionPremiumUpsell,
  StageStart,
  StageEnd,
  StageSpeaker,
  StageTopic = 31,
  GuildApplicationPremiumSubscription,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate,
  Listen,
  JoinRequest = 5,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
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
  IsVoiceMessage = 1 << 13,
}

/** https://discord.com/developers/docs/resources/channel#attachment-object-attachment-flags */
export enum AttachmentFlags {
  IsRemix = 1 << 2,
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionTypes {
  RoleMentions = "roles",
  UserMentions = "users",
  EveryoneMentions = "everyone",
}

/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export enum DefaultMessageNotificationLevel {
  AllMessages,
  OnlyMentions,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export enum ExplicitContentFilterLevel {
  Disabled,
  MembersWithoutRoles,
  AllMembers,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export enum MFALevel {
  None,
  Elevated,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export enum VerificationLevel {
  None,
  Low,
  Medium,
  High,
  VeryHigh,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level */
export enum GuildNSFWLevel {
  Default,
  Explicit,
  Safe,
  AgeRestricted,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-premium-tier */
export enum PremiumTier {
  None,
  Tier1,
  Tier2,
  Tier3,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export enum SystemChannelFlags {
  SuppressJoinNotifications = 1 << 0,
  SuppressPremiumSubscriptions = 1 << 1,
  SuppressGuildReminderNotifications = 1 << 2,
  SuppressJoinNotificationReplies = 1 << 3,
  SuppressRoleSubscriptionPurchaseNotifications = 1 << 4,
  SuppressRoleSubscriptionPurchaseNotificationReplies = 1 << 5,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
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
  RaidAlertsDisabled = "RAID_ALERTS_DISABLED",
  RoleIcons = "ROLE_ICONS",
  RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
  RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
  TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
  VanityURL = "VANITY_URL",
  Verified = "VERIFIED",
  VipRegions = "VIP_REGIONS",
  WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED",
}

/** https://discord.com/developers/docs/resources/guild#guild-object-mutable-guild-features */
export enum MutableGuildFeatures {
  Community = "COMMUNITY",
  InvitesDisabled = "INVITES_DISABLED",
  Discoverable = "DISCOVERABLE",
  RaidAlertsDisabled = "RAID_ALERTS_DISABLED",
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags */
export enum GuildMemberFlags {
  DidRejoin = 1 << 0,
  CompletedOnboarding = 1 << 1,
  BypassesVerification = 1 << 2,
  StartedOnboarding = 1 << 3,
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehaviors {
  RemoveRole,
  Kick,
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode */
export enum OnboardingMode {
  OnboardingDefault,
  OnboardingAdvanced,
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types */
export enum PromptTypes {
  MultipleChoice,
  Dropdown,
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options */
export enum ImageWidgetStyleOptions {
  Shield = "shield",
  Banner1 = "banner1",
  Banner2 = "banner2",
  Banner3 = "banner3",
  Banner4 = "banner4",
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level */
export enum GuildScheduledEventPrivacyLevel {
  GuildOnly = 2,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types */
export enum GuildScheduledEventEntityTypes {
  StageIstance = 1,
  Voice,
  External,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status */
export enum GuildScheduledEventStatus {
  Scheduled = 1,
  Active,
  Completed,
  Canceled,
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types */
export enum InviteTargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level */
export enum PrivacyLevel {
  Public = 1,
  GuildOnly,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
export enum StickerTypes {
  Standard = 1,
  Guild,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
export enum StickerFormatTypes {
  PNG = 1,
  APNG,
  LOTTIE,
  GIF,
}

/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export enum UserFlags {
  Staff = 1 << 0,
  Partner = 1 << 1,
  Hypesquad = 1 << 2,
  BugHunterLevel1 = 1 << 3,
  HypesquadOnlineHouse1 = 1 << 6,
  HypesquadOnlineHouse2 = 1 << 7,
  HypesquadOnlineHouse3 = 1 << 8,
  PremiumEarlySupporter = 1 << 9,
  TeamPseudoUser = 1 << 10,
  BugHunterLevel2 = 1 << 14,
  VerifiedBot = 1 << 16,
  VerifiedDeveloper = 1 << 17,
  CertifiedModerator = 1 << 18,
  BotHTTPInteractions = 1 << 19,
  ActiveDeveloper = 1 << 22,
}

/** https://discord.com/developers/docs/resources/user#user-object-premium-types */
export enum PremiumTypes {
  None,
  NitroClassic,
  Nitro,
  NitroBasic,
}

/** https://discord.com/developers/docs/resources/user#connection-object-services */
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

/** https://discord.com/developers/docs/resources/user#connection-object-visibility-types */
export enum VisibilityTypes {
  None,
  Everyone,
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
export enum WebhookTypes {
  Incoming = 1,
  ChannelFollower,
  Application,
}

/** https://discord.com/developers/docs/topics/certified-devices#models-device-type */
export enum DeviceType {
  AudioInput = "audioinput",
  AudioOutput = "audiooutput",
  VideoInput = "videoinput",
}

/** https://discord.com/developers/docs/topics/gateway#list-of-intents */
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

/** https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types */
export enum StatusTypes {
  Online = "online",
  DoNotDisturb = "dnd",
  Idle = "idle",
  Invisible = "invisible",
  Offline = "offline",
}

/** https://discord.com/developers/docs/topics/gateway-events#receive-events */
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
  EntitlementCreate = "entitlementCreate",
  EntitlementUpdate = "entitlementUpdate",
  EntitlementDelete = "entitlementDelete",
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

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types */
export enum ActivityType {
  Game,
  Streaming,
  Listening,
  Watching,
  Custom,
  Competing,
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags */
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

/** https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes */
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

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes */
export enum GatewayOPCodes {
  Dispatch,
  Heartbeat,
  Identify,
  PresenceUpdate,
  VoiceStateUpdate,
  Resume = 6,
  Reconnect,
  RequestGuildMembers,
  InvalidSession,
  Hello,
  HeartbeatACK,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes */
export enum GatewayCloseEventCodes {
  UnknownError = 4000,
  UnknownOPCode,
  DecodeError,
  NotAuthenticated,
  AuthenticationFailed,
  AlreadyAuthenticated,
  InvalidSequence = 4007,
  RateLimited,
  SessionTimedOut,
  InvalidShard,
  ShardingRequired,
  InvalidAPIVersion,
  InvalidIntents,
  DisallowedIntents,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes */
export enum VoiceOPCodes {
  Identify,
  SelectProtocol,
  Ready,
  Heartbeat,
  SessionDescription,
  Speaking,
  HeartbeatACK,
  Resume,
  Hello,
  Resumed,
  ClientDisconnect = 13,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes */
export enum VoiceCloseEventCodes {
  UnknownOPCode = 4001,
  FailedToDecodePayload,
  NotAuthenticated,
  AuthenticationFailed,
  AlreadyAuthenticated,
  SessionNoLongerValid,
  SessionTimeout = 4009,
  ServerNotFound = 4011,
  UnknownProtocol,
  Disconnect = 4014,
  VoiceServerCrashed,
  UnknownEncryptionMode,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes */
export enum HTTPResponseCodes {
  Ok = 200,
  Created,
  NoContent = 204,
  NotModified = 304,
  BadRequest = 400,
  Unathorized,
  Forbidden = 403,
  NotFound,
  MethodNotAllowed,
  TooManyRequests = 429,
  GatewayUnavailable = 502,
  ServerError = "5xx",
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
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
  AnEntitlementHasAlreadyBeenGrantedForThisResource = 40074,
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
  InvalidSKU = 50057,
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
  OwnerCannotBePendingMember = 50131,
  OwnershipCannotBeMovedToABotUser,
  FailedToResizeAssetBelowTheMinimumSize = 50138,
  CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji = 50144,
  CannotConvertBetweenPremiumEmojiAndNormalEmoji,
  UploadedFileNotFound,
  VoiceMessagesDoNotSupportAdditionalContent = 50159,
  VoiceMessagesMustHaveASingleAudioAttachment,
  VoiceMessagesMustHaveSupportingMetadata,
  VoiceMessagesCannotBeEdited,
  CannotDeleteGuildSubscriptionIntegration,
  YouCannotSendVoiceMessagesInThisChannel = 50173,
  TheUserAccountMustFirstBeVerified = 50178,
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
  CannotEnableOnboardingRequirementsAreNotMet = 350000,
  CannotUpdateOnboardingWhileBelowRequirements,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes */
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

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes */
export enum RPCCloseEventCodes {
  InvalidClientId = 4000,
  InvalidOrigin,
  RateLimited,
  TokenRevoked,
  InvalidVersion,
  InvalidEncoding,
}

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
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
  ManageGuildExpressions: 1n << 30n,
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
  ViewCreatorMonetizationAnalytics: 1n << 41n,
  UseSoundboard: 1n << 42n,
  CreateGuildExpressions: 1n << 43n,
  CreateEvents: 1n << 44n,
  UseExternalSounds: 1n << 45n,
  SendVoiceMessages: 1n << 46n,
} as const;

/** https://discord.com/developers/docs/topics/permissions#role-object-role-flags */
export enum RoleFlags {
  InPrompt = 1 << 0,
}

/** https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types */
export enum TeamMemberRoleTypes {
  Owner = "",
  Admin = "admin",
  Developer = "developer",
  ReadOnly = "read_only",
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum MembershipState {
  Invited = 1,
  Accepted,
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-types */
export enum SKUTypes {
  Subscription = 5,
  SubscriptionGroup,
}

/** https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags */
export enum SKUFlags {
  Available = 1 << 2,
  GuildSubscription = 1 << 7,
  UserSubscription = 1 << 8,
}

/** https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types */
export enum EntitlementTypes {
  ApplicationSubscription = 8,
}
