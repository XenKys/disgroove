import type {
  AllowedMentionTypes,
  ApplicationIntegrationTypes,
  AttachmentFlags,
  ChannelFlags,
  ChannelTypes,
  ForumLayoutTypes,
  InteractionType,
  InviteTargetTypes,
  MessageActivityTypes,
  MessageFlags,
  MessageTypes,
  SortOrderTypes,
  VideoQualityModes,
} from "../constants";
import type {
  RawApplication,
  RawGuildMember,
  RawUser,
  RawEmoji,
  RawSticker,
  RawStickerItem,
  RawMessageInteraction,
  MessageInteraction,
  StickerItem,
  Sticker,
  Emoji,
  User,
  Application,
  GuildMember,
  RawActionRow,
  ActionRow,
  RawResolvedData,
  ResolvedData,
  PollCreateParams,
  Poll,
  RawPoll,
  snowflake,
  timestamp,
} from ".";
import type { File } from "../rest";

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-structure */
export interface RawChannel {
  id: snowflake;
  type: ChannelTypes;
  guild_id?: snowflake;
  position?: number;
  permission_overwrites?: Array<RawOverwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: snowflake | null;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: Array<RawUser>;
  icon?: string | null;
  owner_id?: snowflake;
  application_id?: snowflake;
  managed?: boolean;
  parent_id?: snowflake | null;
  last_pin_timestamp?: timestamp | null;
  rtc_region?: string | null;
  video_quality_mode?: VideoQualityModes;
  message_count?: number;
  member_count?: number;
  thread_metadata?: RawThreadMetadata;
  member?: RawThreadMember;
  default_auto_archive_duration?: number;
  permissions?: string;
  flags?: ChannelFlags;
  total_message_sent?: number;
  available_tags?: Array<RawForumTag>;
  applied_tags?: Array<string>;
  default_reaction_emoji?: RawDefaultReaction | null;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: SortOrderTypes | null;
  default_forum_layout?: ForumLayoutTypes;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-structure */
export interface RawMessage {
  id: snowflake;
  channel_id: snowflake;
  author: RawUser;
  content: string;
  timestamp: timestamp;
  edited_timestamp: timestamp | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: Array<RawUser>;
  mention_roles: Array<snowflake>;
  mention_channels?: Array<RawChannelMention>;
  attachments: Array<RawAttachment>;
  embeds: Array<RawEmbed>;
  reactions?: Array<RawReaction>;
  nonce?: number | string;
  pinned: boolean;
  webhook_id?: snowflake;
  type: MessageTypes;
  activity?: RawMessageActivity;
  application?: RawApplication;
  application_id?: snowflake;
  message_reference?: RawMessageReference;
  flags?: MessageFlags;
  referenced_message?: RawMessage | null;
  interaction_metadata?: RawMessageInteractionMetadata;
  interaction?: RawMessageInteraction;
  thread?: RawChannel;
  components?: Array<RawActionRow>;
  sticker_items?: Array<RawStickerItem>;
  stickers?: Array<RawSticker>;
  position?: number;
  role_subscription_data?: RawRoleSubscriptionData;
  resolved?: RawResolvedData;
  poll?: RawPoll;
  call?: RawMessageCall;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface RawMessageActivity {
  type: MessageActivityTypes;
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-interaction-metadata-object-message-interaction-metadata-structure */
export interface RawMessageInteractionMetadata {
  id: snowflake;
  type: InteractionType;
  user: RawUser;
  authorizing_integration_owners: Record<ApplicationIntegrationTypes, string>;
  original_response_message_id?: snowflake;
  interacted_message_id?: snowflake;
  triggering_interaction_metadata?: RawMessageInteractionMetadata;
}

/** https://discord.com/developers/docs/resources/channel#message-call-object-message-call-object-structure */
export interface RawMessageCall {
  partecipants: Array<snowflake>;
  ended_timestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure */
export interface RawMessageReference {
  message_id?: snowflake;
  channel_id?: snowflake;
  guild_id?: snowflake;
  fail_if_not_exists?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
export interface RawFollowedChannel {
  channel_id: snowflake;
  webhook_id: snowflake;
}

/** https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure */
export interface RawReaction {
  count: number;
  count_details: RawReactionCountDetails;
  me: boolean;
  me_burst: boolean;
  emoji: RawEmoji;
  burst_colors: Array<string>;
}

/** https://discord.com/developers/docs/resources/channel#reaction-count-details-object-reaction-count-details-structure */
export interface RawReactionCountDetails {
  burst: number;
  normal: number;
}

/** https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure */
export interface RawOverwrite {
  id: snowflake;
  type: number;
  allow: string;
  deny: string;
}

/** https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure */
export interface RawThreadMetadata {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: timestamp;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure */
export interface RawThreadMember {
  id?: snowflake;
  user_id?: snowflake;
  join_timestamp: timestamp;
  flags: number;
  member?: RawGuildMember;
}

/** https://discord.com/developers/docs/resources/channel#default-reaction-object-default-reaction-structure */
export interface RawDefaultReaction {
  emoji_id: snowflake | null;
  emoji_name: string | null;
}

/** https://discord.com/developers/docs/resources/channel#forum-tag-object-forum-tag-structure */
export interface RawForumTag {
  id: snowflake;
  name: string;
  moderated: boolean;
  emoji_id?: snowflake;
  emoji_name?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-structure */
export interface RawEmbed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: timestamp;
  color?: number;
  footer?: RawEmbedFooter;
  image?: RawEmbedImage;
  thumbnail?: RawEmbedThumbnail;
  video?: RawEmbedVideo;
  provider?: RawEmbedProvider;
  author?: RawEmbedAuthor;
  fields?: Array<RawEmbedField>;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface RawEmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface RawEmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface RawEmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
export interface RawEmbedProvider {
  name?: string;
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface RawEmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface RawEmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface RawEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure */
export interface RawAttachment {
  id: snowflake;
  filename: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
  duration_secs?: number;
  waveform?: boolean;
  flags?: AttachmentFlags;
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure */
export interface RawChannelMention {
  id: snowflake;
  guild_id: snowflake;
  type: ChannelTypes;
  name: string;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure */
export interface RawAllowedMentions {
  parse: Array<AllowedMentionTypes>;
  roles: Array<snowflake>;
  users: Array<snowflake>;
  replied_user: boolean;
}

/** https://discord.com/developers/docs/resources/channel#role-subscription-data-object-role-subscription-data-object-structure */
export interface RawRoleSubscriptionData {
  role_subscription_listing_id: snowflake;
  tier_name: string;
  total_months_subscribed: number;
  is_renewal: boolean;
}

export interface Channel {
  id: snowflake;
  type: ChannelTypes;
  guildId?: snowflake;
  position?: number;
  permissionOverwrites?: Array<Overwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  lastMessageId?: snowflake | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  recipients?: Array<User>;
  icon?: string | null;
  ownerId?: snowflake;
  applicationId?: snowflake;
  managed?: boolean;
  parentId?: snowflake | null;
  lastPinTimestamp?: timestamp | null;
  rtcRegion?: string | null;
  videoQualityMode?: VideoQualityModes;
  messageCount?: number;
  memberCount?: number;
  threadMetadata?: ThreadMetadata;
  member?: ThreadMember;
  defaultAutoArchiveDuration?: number;
  permissions?: string;
  flags?: ChannelFlags;
  totalMessageSent?: number;
  availableTags?: Array<ForumTag>;
  appliedTags?: Array<string>;
  defaultReactionEmoji?: DefaultReaction | null;
  defaultThreadRateLimitPerUser?: number;
  defaultSortOrder?: SortOrderTypes | null;
  defaultForumLayout?: ForumLayoutTypes;
}

export interface Message {
  id: snowflake;
  channelId: snowflake;
  author: User;
  content: string;
  timestamp: timestamp;
  editedTimestamp: timestamp | null;
  tts: boolean;
  mentionEveryone: boolean;
  mentions: Array<User>;
  mentionRoles: Array<snowflake>;
  mentionChannels?: Array<ChannelMention>;
  attachments: Array<Attachment>;
  embeds: Array<Embed>;
  reactions?: Array<Reaction>;
  nonce?: number | string;
  pinned: boolean;
  webhookId?: snowflake;
  type: MessageTypes;
  activity?: MessageActivity;
  application?: Application;
  applicationId?: snowflake;
  messageReference?: MessageReference;
  flags?: MessageFlags;
  referencedMessage?: Message | null;
  interactionMetadata?: MessageInteractionMetadata;
  interaction?: MessageInteraction;
  thread?: Channel;
  components?: Array<ActionRow>;
  stickerItems?: Array<StickerItem>;
  stickers?: Array<Sticker>;
  position?: number;
  roleSubscriptionData?: RoleSubscriptionData;
  resolved?: ResolvedData;
  poll?: Poll;
  call?: MessageCall;
}

export interface MessageActivity {
  type: MessageActivityTypes;
  partyId?: string;
}

export interface MessageInteractionMetadata {
  id: snowflake;
  type: InteractionType;
  user: User;
  authorizingIntegrationOwners: Record<ApplicationIntegrationTypes, string>;
  originalResponseMessageId?: snowflake;
  interactedMessageId?: snowflake;
  triggeringInteractionMetadata?: MessageInteractionMetadata;
}

export interface MessageCall {
  partecipants: Array<snowflake>;
  endedTimestamp?: timestamp | null;
}

export interface MessageReference {
  messageId?: snowflake;
  channelId?: snowflake;
  guildId?: snowflake;
  failIfNotExists?: boolean;
}

export interface FollowedChannel {
  channelId: snowflake;
  webhookId: snowflake;
}

export interface Reaction {
  count: number;
  countDetails: ReactionCountDetails;
  me: boolean;
  meBurst: boolean;
  emoji: Emoji;
  burstColors: Array<string>;
}

export interface ReactionCountDetails {
  burst: number;
  normal: number;
}

export interface Overwrite {
  id: snowflake;
  type: number;
  allow: string;
  deny: string;
}

export interface ThreadMetadata {
  archived: boolean;
  autoArchiveDuration: number;
  archiveTimestamp: timestamp;
  locked: boolean;
  invitable?: boolean;
  createTimestamp?: timestamp | null;
}

export interface ThreadMember {
  id?: snowflake;
  userId?: snowflake;
  joinTimestamp: timestamp;
  flags: number;
  member?: GuildMember;
}

export interface DefaultReaction {
  emojiId: snowflake | null;
  emojiName: string | null;
}

export interface ForumTag {
  id: snowflake;
  name: string;
  moderated: boolean;
  emojiId?: snowflake;
  emojiName?: string;
}

export interface Embed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: timestamp;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: Array<EmbedField>;
}

export interface EmbedThumbnail {
  url: string;
  proxyUrl?: string;
  height?: number;
  width?: number;
}

export interface EmbedVideo {
  url?: string;
  proxyUrl?: string;
  height?: number;
  width?: number;
}

export interface EmbedImage {
  url: string;
  proxyUrl?: string;
  height?: number;
  width?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export interface EmbedAuthor {
  name: string;
  url?: string;
  iconUrl?: string;
  proxyIconUrl?: string;
}

export interface EmbedFooter {
  text: string;
  iconUrl?: string;
  proxyIconUrl?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface Attachment {
  id: snowflake;
  filename: string;
  description?: string;
  contentType?: string;
  size: number;
  url: string;
  proxyUrl: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
  durationSecs?: number;
  waveform?: boolean;
  flags?: AttachmentFlags;
}

export interface ChannelMention {
  id: snowflake;
  guildId: snowflake;
  type: ChannelTypes;
  name: string;
}

export interface AllowedMentions {
  parse: Array<AllowedMentionTypes>;
  roles: Array<snowflake>;
  users: Array<snowflake>;
  repliedUser: boolean;
}

export interface RoleSubscriptionData {
  roleSubscriptionListingId: snowflake;
  tierName: string;
  totalMonthsSubscribed: number;
  isRenewal: boolean;
}

export interface EditChannelParams {
  name?: string;
  icon?: string;

  type?: ChannelTypes;
  position?: number | null;
  topic?: string | null;
  nsfw?: boolean | null;
  rateLimitPerUser?: number | null;
  bitrate?: number | null;
  userLimit?: number | null;
  permissionOverwrites?: Array<Overwrite> | null;
  parentId?: snowflake | null;
  rtcRegion?: string | null;
  videoQualityMode?: VideoQualityModes | null;
  defaultAutoArchiveDuration?: number | null;
  flags?: ChannelFlags;
  availableTags?: Array<ForumTag>;
  defaultReactionEmoji?: DefaultReaction | null;
  defaultThreadRateLimitPerUser?: number;
  defaultSortOrder?: SortOrderTypes | null;
  defaultForumLayout?: ForumLayoutTypes;

  archived?: boolean;
  autoArchiveDuration?: number;
  locked?: boolean;
  invitable?: boolean;
  appliedTags?: Array<string>;
}

export interface CreateMessageParams {
  content?: string;
  nonce?: string | number;
  tts?: boolean;
  embeds?: Array<Embed>;
  allowedMentions?: AllowedMentions;
  messageReference?: MessageReference;
  components?: Array<ActionRow>;
  stickersIds?: Array<snowflake>;
  files?: Array<File>;
  attachments?: Array<Attachment>;
  flags?: MessageFlags;
  enforceNonce?: boolean;
  poll?: PollCreateParams;
}

export interface EditMessageParams {
  content?: string | null;
  embeds?: Array<Embed> | null;
  flags?: MessageFlags | null;
  allowedMentions?: AllowedMentions | null;
  components?: Array<ActionRow> | null;
  files?: Array<File> | null;
  attachments?: Array<Attachment> | null;
}

export interface BulkDeleteMessagesParams {
  messages: Array<snowflake>;
}

export interface EditChannelPermissionsParams {
  allow?: string | null;
  deny?: string | null;
  type: number;
}

export interface CreateChannelInviteParams {
  maxAge?: number;
  maxUses?: number;
  temporary?: boolean;
  unique?: boolean;
  targetType?: InviteTargetTypes;
  targetUserId?: snowflake;
  targetApplicationId?: snowflake;
}

export interface FollowAnnouncementChannelParams {
  webhookChannelId: snowflake;
}

export interface AddChannelRecipientParams {
  accessToken: string;
  nick: string;
}

export interface CreateThreadFromMessageParams {
  name: string;
  autoArchiveDuration?: number;
  rateLimitPerUser?: number | null;
}

export interface CreateThreadWithoutMessageParams {
  name: string;
  autoArchiveDuration?: number;
  type?: ChannelTypes;
  invitable?: boolean;
  rateLimitPerUser?: number | null;
}

export interface CreateThreadParams {
  name: string;
  autoArchiveDuration?: number;
  rateLimitPerUser?: number | null;
  message: {
    content?: string | null;
    embeds?: Array<Embed> | null;
    allowedMentions?: AllowedMentions | null;
    components?: Array<ActionRow> | null;
    attachments?: Array<Attachment> | null;
    flags?: MessageFlags | null;
  };
  appliedTags?: Array<string>;
  files?: Array<File> | null;
}
