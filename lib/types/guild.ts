import type {
  VerificationLevel,
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  GuildFeatures,
  MFALevel,
  PremiumTier,
  GuildNSFWLevel,
  GuildMemberFlags,
  IntegrationExpireBehaviors,
  OAuth2Scopes,
  SystemChannelFlags,
  OnboardingMode,
  PromptTypes,
  ChannelTypes,
  VideoQualityModes,
  SortOrderTypes,
  ForumLayoutTypes,
} from "../constants";
import type {
  RawChannel,
  RawEmoji,
  RawSticker,
  RawUser,
  RawRole,
  Emoji,
  Sticker,
  User,
  Role,
  Channel,
  Overwrite,
  DefaultReaction,
  ForumTag,
} from ".";

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-structure */
export interface RawGuild {
  id: string;
  name: string;
  icon: string | null;
  icon_hash?: string | null;
  splash: string | null;
  discovery_splash: string | null;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  region?: string | null;
  afk_channel_id: string | null;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: string | null;
  verification_level: VerificationLevel;
  default_message_notifications: DefaultMessageNotificationLevel;
  explicit_content_filter: ExplicitContentFilterLevel;
  roles: Array<RawRole>;
  emojis: Array<RawEmoji>;
  features: Array<GuildFeatures>;
  mfa_level: MFALevel;
  application_id: string | null;
  system_channel_id: string | null;
  system_channel_flags: SystemChannelFlags;
  rules_channel_id: string | null;
  max_presences?: number | null;
  max_members?: number;
  vanity_url_code: string | null;
  description: string | null;
  banner: string | null;
  premium_tier: PremiumTier;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id: string | null;
  max_video_channel_users?: number;
  max_stage_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: RawWelcomeScreen;
  nsfw_level: GuildNSFWLevel;
  stickers?: Array<RawSticker>;
  premium_progress_bar_enabled: boolean;
  safety_alerts_channel_id: string | null;
}

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export interface RawUnavailableGuild {
  id: string;
  unavailable: boolean;
}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure */
export interface RawGuildPreview {
  id: string;
  name: string;
  icon: string | null;
  splash: string | null;
  discovery_splash: string | null;
  emojis: Array<RawEmoji>;
  features: Array<GuildFeatures>;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  description: string | null;
  stickers?: Array<RawSticker>;
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-settings-object-guild-widget-settings-structure */
export interface RawGuildWidgetSettings {
  enabled: boolean;
  channel_id: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export interface RawGuildWidget {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: Array<RawChannel>;
  members: Array<RawUser>;
  presence_count: number;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface RawGuildMember {
  user?: RawUser;
  nick?: string | null;
  avatar?: string | null;
  roles: Array<string>;
  joined_at: string;
  premium_since?: number | null;
  deaf: boolean;
  mute: boolean;
  flags: GuildMemberFlags;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface RawIntegration {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  syncing?: boolean;
  role_id?: string;
  enable_emoticons?: boolean;
  expire_behavior?: IntegrationExpireBehaviors;
  expire_grace_period?: number;
  user?: RawUser;
  account: RawIntegrationAccount;
  synced_at?: string;
  subscriber_count?: number;
  revoked?: boolean;
  application?: RawIntegrationApplication;
  scopes?: Array<OAuth2Scopes>;
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
export interface RawIntegrationAccount {
  id: string;
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export interface RawIntegrationApplication {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  bot?: RawUser;
}

/** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
export interface RawBan {
  reason: string | null;
  user: RawUser;
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
export interface RawWelcomeScreen {
  description: string | null;
  welcome_channels: Array<RawWelcomeScreenChannel>;
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface RawWelcomeScreenChannel {
  channel_id: string;
  description: string;
  emoji_id: string | null;
  emoji_name: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-guild-onboarding-structure */
export interface RawGuildOnboarding {
  guild_id: string;
  prompts: Array<RawOnboardingPrompt>;
  default_channel_ids: Array<string>;
  enabled: boolean;
  mode: OnboardingMode;
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure */
export interface RawOnboardingPrompt {
  id: string;
  type: PromptTypes;
  options: Array<RawPromptOption>;
  title: string;
  single_select: boolean;
  required: boolean;
  in_onboarding: boolean;
}

/** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-option-structure */
export interface RawPromptOption {
  id: string;
  channel_ids: Array<string>;
  role_ids: Array<string>;
  emoji?: RawEmoji;
  emoji_id?: string;
  emoji_name?: string;
  emoji_animated?: boolean;
  title: string;
  description: string | null;
}

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  iconHash?: string | null;
  splash: string | null;
  discoverySplash: string | null;
  owner?: boolean;
  ownerId: string;
  permissions?: string;
  region?: string | null;
  afkChannelId: string | null;
  afkTimeout: number;
  widgetEnabled?: boolean;
  widgetChannelId?: string | null;
  verificationLevel: VerificationLevel;
  defaultMessageNotifications: DefaultMessageNotificationLevel;
  explicitContentFilter: ExplicitContentFilterLevel;
  roles: Array<Role>;
  emojis: Array<Emoji>;
  features: Array<GuildFeatures>;
  mfaLevel: MFALevel;
  applicationId: string | null;
  systemChannelId: string | null;
  systemChannelFlags: SystemChannelFlags;
  rulesChannelId: string | null;
  maxPresences?: number | null;
  maxMembers?: number;
  vanityUrlCode: string | null;
  description: string | null;
  banner: string | null;
  premiumTier: PremiumTier;
  premiumSubscriptionCount?: number;
  preferredLocale: string;
  publicUpdatesChannelId: string | null;
  maxVideoChannelUsers?: number;
  maxStageVideoChannelUsers?: number;
  approximateMemberCount?: number;
  approximatePresenceCount?: number;
  welcomeScreen?: WelcomeScreen;
  nsfwLevel: GuildNSFWLevel;
  stickers?: Array<Sticker>;
  premiumProgressBarEnabled: boolean;
  safetyAlertsChannelId: string | null;
}

export interface UnavailableGuild {
  id: string;
  unavailable: boolean;
}

export interface GuildPreview {
  id: string;
  name: string;
  icon: string | null;
  splash: string | null;
  discoverySplash: string | null;
  emojis: Array<Emoji>;
  features: Array<GuildFeatures>;
  approximateMemberCount?: number;
  approximatePresenceCount?: number;
  description: string | null;
  stickers?: Array<Sticker>;
}

export interface GuildWidgetSettings {
  enabled: boolean;
  channelId: string | null;
}

export interface GuildWidget {
  id: string;
  name: string;
  instantInvite: string | null;
  channels: Array<Channel>;
  members: Array<User>;
  presenceCount: number;
}

export interface GuildMember {
  user?: User;
  nick?: string | null;
  avatar?: string | null;
  roles: Array<string>;
  joinedAt: string;
  premiumSince?: number | null;
  deaf: boolean;
  mute: boolean;
  flags: GuildMemberFlags;
  pending?: boolean;
  permissions?: string;
  communicationDisabledUntil?: number | null;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  syncing?: boolean;
  roleId?: string;
  enableEmoticons?: boolean;
  expireBehavior?: IntegrationExpireBehaviors;
  expireGracePeriod?: number;
  user?: User;
  account: IntegrationAccount;
  syncedAt?: string;
  subscriberCount?: number;
  revoked?: boolean;
  application?: IntegrationApplication;
  scopes?: Array<OAuth2Scopes>;
}

export interface IntegrationAccount {
  id: string;
  name: string;
}

export interface IntegrationApplication {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  bot?: User;
}

export interface Ban {
  reason: string | null;
  user: User;
}

export interface WelcomeScreen {
  description: string | null;
  welcomeChannels: Array<WelcomeScreenChannel>;
}

export interface WelcomeScreenChannel {
  channelId: string;
  description: string;
  emojiId: string | null;
  emojiName: string | null;
}

export interface GuildOnboarding {
  guildId: string;
  prompts: Array<OnboardingPrompt>;
  defaultChannelIds: Array<string>;
  enabled: boolean;
  mode: OnboardingMode;
}

export interface OnboardingPrompt {
  id: string;
  type: PromptTypes;
  options: Array<PromptOption>;
  title: string;
  singleSelect: boolean;
  required: boolean;
  inOnboarding: boolean;
}

export interface PromptOption {
  id: string;
  channelIds: Array<string>;
  roleIds: Array<string>;
  emoji?: Emoji;
  emojiId?: string;
  emojiName?: string;
  emojiAnimated?: boolean;
  title: string;
  description: string | null;
}

export interface CreateGuildParams {
  name: string;
  region?: string | null;
  icon?: string;
  verificationLevel?: VerificationLevel;
  defaultMessageNotifications?: DefaultMessageNotificationLevel;
  explicitContentFilter?: ExplicitContentFilterLevel;
  roles?: Array<{
    name?: string;
    permissions?: string;
    color?: number;
    hoist?: boolean;
    icon?: string | null;
    unicodeEmoji?: string | null;
    mentionable?: boolean;
  }>;
  channels?: Array<{
    name: string;
    type: ChannelTypes;
    id?: number;
    parentId?: number;
  }>;
  afkChannelId?: string;
  afkTimeout?: number;
  systemChannelId?: string;
  systemChannelFlags?: SystemChannelFlags;
}

export interface EditGuildParams {
  name?: string;
  region?: string | null;
  verificationLevel?: VerificationLevel;
  defaultMessageNotifications?: DefaultMessageNotificationLevel;
  explicitContentFilter?: ExplicitContentFilterLevel;
  afkChannelId?: string | null;
  afkTimeout?: number;
  icon?: string | null;
  ownerId?: string;
  splash?: string | null;
  discoverySplash?: string | null;
  banner?: string | null;
  systemChannelId?: string | null;
  systemChannelFlags?: SystemChannelFlags;
  rulesChannelId?: string | null;
  publicUpdatesChannelId?: string | null;
  preferredLocale?: string;
  features?: Array<GuildFeatures>;
  description?: string | null;
  premiumProgressBarEnabled?: boolean;
  safetyAlertsChannelId?: string | null;
}

export interface CreateGuildChannelParams {
  name: string | null;
  type?: ChannelTypes;
  topic?: string | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  position?: number;
  permissionOverwrites?: Array<Overwrite>;
  parentId?: string | null;
  nsfw?: boolean;
  rtcRegion?: string | null;
  videoQualityMode?: VideoQualityModes;
  defaultAutoArchiveDuration?: number;
  defaultReactionEmoji?: DefaultReaction | null;
  availableTags?: Array<ForumTag>;
  defaultSortOrder?: SortOrderTypes | null;
  defaultForumLayout?: ForumLayoutTypes;
  defaultThreadRateLimitPerUser?: number;
}

export type EditGuildChannelPositionsParams = Array<{
  id: string;
  position?: number | null;
  lockPermissions?: boolean | null;
  parentId?: string | null;
}>;

export interface AddGuildMemberParams {
  accessToken: string;
  nick?: string;
  roles?: Array<string>;
  mute?: boolean;
  deaf?: boolean;
}

export interface EditCurrentGuildMemberParams {
  nick?: string;
}

export interface EditGuildMemberParams {
  nick?: string | null;
  roles?: Array<string> | null;
  mute?: boolean | null;
  deaf?: boolean | null;
  channelId?: string | null;
  communicationDisabledUntil?: number | null;
  flags?: GuildMemberFlags;
}

export interface EditGuildMemberParams {
  nick?: string | null;
}

export interface CreateGuildBanParams {
  deleteMessageDays?: number;
  deleteMessageSeconds?: number;
}

export interface CreateGuildRoleParams {
  name?: string;
  permissions?: string;
  color?: number;
  hoist?: boolean;
  icon?: string | null;
  unicodeEmoji?: string | null;
  mentionable?: boolean;
}

export type EditGuildRolePositionsParams = Array<{
  id: string;
  position?: number | null;
}>;

export interface EditGuildRoleParams {
  name?: string | null;
  permissions?: string | null;
  color?: number | null;
  hoist?: boolean | null;
  icon?: string | null;
  unicodeEmoji?: string | null;
  mentionable?: boolean | null;
}

export interface EditGuildMFALevelParams {
  level: MFALevel;
}

export interface BeginGuildPruneParams {
  days: number;
  computePruneCount: boolean;
  includeRoles: Array<string>;
  reason?: string;
}

export interface EditGuildWelcomeScreenParams {
  enabled?: boolean | null;
  welcomeChannels?: Array<WelcomeScreenChannel> | null;
  description?: string | null;
}

export interface EditGuildOnboardingParams {
  prompts: Array<OnboardingPrompt>;
  defaultChannelIds: Array<string>;
  enabled: boolean;
  mode: OnboardingMode;
}

export interface EditCurrentUserVoiceStateParams {
  channelId?: string;
  suppress?: boolean;
  requestToSpeakTimestamp?: string | null;
}

export interface EditUserVoiceStateParams {
  channelId?: string;
  suppress?: boolean;
  requestToSpeakTimestamp?: string | null;
}
