import type {
  ChannelFlags,
  ChannelTypes,
  ForumLayoutTypes,
  SortOrderTypes,
  VideoQualityModes,
} from "../constants";
import type { snowflake, timestamp } from "./common";
import type { RawGuildMember, GuildMember } from "./guild";
import type { RawUser, User } from "./user";

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

/** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
export interface RawFollowedChannel {
  channel_id: snowflake;
  webhook_id: snowflake;
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
  guildID?: snowflake;
  position?: number;
  permissionOverwrites?: Array<Overwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  lastMessageID?: snowflake | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  recipients?: Array<User>;
  icon?: string | null;
  ownerID?: snowflake;
  applicationID?: snowflake;
  managed?: boolean;
  parentID?: snowflake | null;
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

export interface FollowedChannel {
  channelID: snowflake;
  webhookID: snowflake;
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
  userID?: snowflake;
  joinTimestamp: timestamp;
  flags: number;
  member?: GuildMember;
}

export interface DefaultReaction {
  emojiID: snowflake | null;
  emojiName: string | null;
}

export interface ForumTag {
  id: snowflake;
  name: string;
  moderated: boolean;
  emojiID?: snowflake;
  emojiName?: string;
}

export interface RoleSubscriptionData {
  roleSubscriptionListingID: snowflake;
  tierName: string;
  totalMonthsSubscribed: number;
  isRenewal: boolean;
}
