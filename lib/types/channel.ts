import type {
  AllowedMentionTypes,
  AttachmentFlags,
  ChannelFlags,
  ChannelTypes,
  ForumLayoutTypes,
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
  JSONMessageInteraction,
  JSONStickerItem,
  JSONSticker,
  JSONEmoji,
  JSONUser,
  JSONApplication,
  JSONGuildMember,
  RawActionRow,
  JSONActionRow,
  RawResolvedData,
  JSONResolvedData,
} from ".";

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-structure */
export interface RawChannel {
  id: string;
  type: ChannelTypes;
  guild_id?: string;
  position?: number;
  permission_overwrites?: Array<RawOverwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: string | null;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: Array<RawUser>;
  icon?: string | null;
  owner_id?: string;
  application_id?: string;
  managed?: boolean;
  parent_id?: string | null;
  last_pin_timestamp?: string | null;
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
  id: string;
  channel_id: string;
  author: RawUser;
  content: string;
  timestamp: string;
  edited_timestamp: string | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: Array<RawUser>;
  mention_roles: Array<string>;
  mention_channels?: Array<RawChannelMention>;
  attachments: Array<RawAttachment>;
  embeds: Array<RawEmbed>;
  reactions?: Array<RawReaction>;
  nonce?: number | string;
  pinned: boolean;
  webhook_id?: string;
  type: MessageTypes;
  activity?: RawMessageActivity;
  application?: RawApplication;
  application_id?: string;
  message_reference?: RawMessageReference;
  flags?: MessageFlags;
  referenced_message?: RawMessage | null;
  interaction?: RawMessageInteraction;
  thread?: RawChannel;
  components?: Array<RawActionRow>;
  sticker_items?: Array<RawStickerItem>;
  stickers?: Array<RawSticker>;
  position?: number;
  role_subscription_data?: RawRoleSubscriptionData;
  resolved?: RawResolvedData;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface RawMessageActivity {
  type: MessageActivityTypes;
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure */
export interface RawMessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exists?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
export interface RawFollowedChannel {
  channel_id: string;
  webhook_id: string;
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
  id: string;
  type: number;
  allow: string;
  deny: string;
}

/** https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure */
export interface RawThreadMetadata {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: string;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: string | null;
}

/** https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure */
export interface RawThreadMember {
  id?: string;
  user_id?: string;
  join_timestamp: string;
  flags: number;
  member?: RawGuildMember;
}

/** https://discord.com/developers/docs/resources/channel#default-reaction-object-default-reaction-structure */
export interface RawDefaultReaction {
  emoji_id: string | null;
  emoji_name: string | null;
}

/** https://discord.com/developers/docs/resources/channel#forum-tag-object-forum-tag-structure */
export interface RawForumTag {
  id: string;
  name: string;
  moderated: boolean;
  emoji_id?: string;
  emoji_name?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-structure */
export interface RawEmbed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
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
  id: string;
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
  id: string;
  guild_id: string;
  type: ChannelTypes;
  name: string;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure */
export interface RawAllowedMentions {
  parse: Array<AllowedMentionTypes>;
  roles: Array<string>;
  users: Array<string>;
  replied_user: boolean;
}

/** https://discord.com/developers/docs/resources/channel#role-subscription-data-object-role-subscription-data-object-structure */
export interface RawRoleSubscriptionData {
  role_subscription_listing_id: string;
  tier_name: string;
  total_months_subscribed: number;
  is_renewal: boolean;
}

export interface JSONChannel {
  id: string;
  type: ChannelTypes;
  guildId?: string;
  position?: number;
  permissionOverwrites?: Array<JSONOverwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  lastMessageId?: string | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  recipients?: Array<JSONUser>;
  icon?: string | null;
  ownerId?: string;
  applicationId?: string;
  managed?: boolean;
  parentId?: string | null;
  lastPinTimestamp?: string | null;
  rtcRegion?: string | null;
  videoQualityMode?: VideoQualityModes;
  messageCount?: number;
  memberCount?: number;
  threadMetadata?: JSONThreadMetadata;
  member?: JSONThreadMember;
  defaultAutoArchiveDuration?: number;
  permissions?: string;
  flags?: ChannelFlags;
  totalMessageSent?: number;
  availableTags?: Array<JSONForumTag>;
  appliedTags?: Array<string>;
  defaultReactionEmoji?: JSONDefaultReaction | null;
  defaultThreadRateLimitPerUser?: number;
  defaultSortOrder?: SortOrderTypes | null;
  defaultForumLayout?: ForumLayoutTypes;
}

export interface JSONMessage {
  id: string;
  channelId: string;
  author: JSONUser;
  content: string;
  timestamp: string;
  editedTimestamp: string | null;
  tts: boolean;
  mentionEveryone: boolean;
  mentions: Array<JSONUser>;
  mentionRoles: Array<string>;
  mentionChannels?: Array<JSONChannelMention>;
  attachments: Array<JSONAttachment>;
  embeds: Array<JSONEmbed>;
  reactions?: Array<JSONReaction>;
  nonce?: number | string;
  pinned: boolean;
  webhookId?: string;
  type: MessageTypes;
  activity?: JSONMessageActivity;
  application?: JSONApplication;
  applicationId?: string;
  messageReference?: JSONMessageReference;
  flags?: MessageFlags;
  referencedMessage?: JSONMessage | null;
  interaction?: JSONMessageInteraction;
  thread?: JSONChannel;
  components?: Array<JSONActionRow>;
  stickerItems?: Array<JSONStickerItem>;
  stickers?: Array<JSONSticker>;
  position?: number;
  roleSubscriptionData?: JSONRoleSubscriptionData;
  resolved?: JSONResolvedData;
}

export interface JSONMessageActivity {
  type: MessageActivityTypes;
  partyId?: string;
}

export interface JSONMessageReference {
  messageId?: string;
  channelId?: string;
  guildId?: string;
  failIfNotExists?: boolean;
}

export interface JSONFollowedChannel {
  channelId: string;
  webhookId: string;
}

export interface JSONReaction {
  count: number;
  countDetails: JSONReactionCountDetails;
  me: boolean;
  meBurst: boolean;
  emoji: JSONEmoji;
  burstColors: Array<string>;
}

export interface JSONReactionCountDetails {
  burst: number;
  normal: number;
}

export interface JSONOverwrite {
  id: string;
  type: number;
  allow: string;
  deny: string;
}

export interface JSONThreadMetadata {
  archived: boolean;
  autoArchiveDuration: number;
  archiveTimestamp: string;
  locked: boolean;
  invitable?: boolean;
  createTimestamp?: string | null;
}

export interface JSONThreadMember {
  id?: string;
  userId?: string;
  joinTimestamp: string;
  flags: number;
  member?: JSONGuildMember;
}

export interface JSONDefaultReaction {
  emojiId: string | null;
  emojiName: string | null;
}

export interface JSONForumTag {
  id: string;
  name: string;
  moderated: boolean;
  emojiId?: string;
  emojiName?: string;
}

export interface JSONEmbed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: JSONEmbedFooter;
  image?: JSONEmbedImage;
  thumbnail?: JSONEmbedThumbnail;
  video?: JSONEmbedVideo;
  provider?: JSONEmbedProvider;
  author?: JSONEmbedAuthor;
  fields?: Array<JSONEmbedField>;
}

export interface JSONEmbedThumbnail {
  url: string;
  proxyURL?: string;
  height?: number;
  width?: number;
}

export interface JSONEmbedVideo {
  url?: string;
  proxyURL?: string;
  height?: number;
  width?: number;
}

export interface JSONEmbedImage {
  url: string;
  proxyURL?: string;
  height?: number;
  width?: number;
}

export interface JSONEmbedProvider {
  name?: string;
  url?: string;
}

export interface JSONEmbedAuthor {
  name: string;
  url?: string;
  iconURL?: string;
  proxyIconURL?: string;
}

export interface JSONEmbedFooter {
  text: string;
  iconURL?: string;
  proxyIconURL?: string;
}

export interface JSONEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface JSONAttachment {
  id: string;
  filename: string;
  description?: string;
  contentType?: string;
  size: number;
  url: string;
  proxyURL: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
  durationSecs?: number;
  waveform?: boolean;
  flags?: AttachmentFlags;
}

export interface JSONChannelMention {
  id: string;
  guildId: string;
  type: ChannelTypes;
  name: string;
}

export interface JSONAllowedMentions {
  parse: Array<AllowedMentionTypes>;
  roles: Array<string>;
  users: Array<string>;
  repliedUser: boolean;
}

export interface JSONRoleSubscriptionData {
  roleSubscriptionListingId: string;
  tierName: string;
  totalMonthsSubscribed: number;
  isRenewal: boolean;
}
