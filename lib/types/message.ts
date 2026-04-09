import type {
  MessageTypes,
  MessageFlags,
  MessageActivityTypes,
  InteractionType,
  ApplicationIntegrationTypes,
  MessageReferenceTypes,
  AttachmentFlags,
  ChannelTypes,
  AllowedMentionTypes,
  EmbedTypes,
  BaseThemeTypes,
  EmbedFlags,
  EmbedMediaFlags,
} from "../constants";
import type { Application, RawApplication } from "./application";
import type { Channel, RawChannel } from "./channel";
import type { snowflake, timestamp } from "./common";
import type { Emoji, RawEmoji } from "./emoji";
import type {
  MessageInteraction,
  RawMessageInteraction,
  RawResolvedData,
  ResolvedData,
} from "./interaction";
import type {
  ActionRow,
  Container,
  File,
  MediaGallery,
  RawActionRow,
  RawContainer,
  RawFile,
  RawMediaGallery,
  RawSection,
  RawSeparator,
  RawTextDisplay,
  Section,
  Separator,
  TextDisplay,
} from "./components";
import type { Poll, RawPoll } from "./poll";
import type {
  RawStickerItem,
  RawSticker,
  Sticker,
  StickerItem,
} from "./sticker";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/message#message-object-message-structure */
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
  application?: Partial<RawApplication>;
  application_id?: snowflake;
  flags?: MessageFlags;
  message_reference?: RawMessageReference;
  message_snapshots?: Array<RawMessageSnapshot>;
  referenced_message?: RawMessage | null;
  interaction_metadata?: RawMessageInteractionMetadata;
  interaction?: RawMessageInteraction;
  thread?: RawChannel;
  components?: Array<
    | RawActionRow
    | RawSection
    | RawTextDisplay
    | RawMediaGallery
    | RawFile
    | RawSeparator
    | RawContainer
  >;
  sticker_items?: Array<RawStickerItem>;
  stickers?: Array<RawSticker>;
  position?: number;
  role_subscription_data?: RawRoleSubscriptionData;
  resolved?: RawResolvedData;
  poll?: RawPoll;
  call?: RawMessageCall;
  shared_client_theme?: RawSharedClientTheme;
}

/** https://discord.com/developers/docs/resources/message#message-object-message-activity-structure */
export interface RawMessageActivity {
  type: MessageActivityTypes;
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-message-interaction-metadata-structure */
export interface RawMessageInteractionMetadata {
  id: snowflake;
  type: InteractionType;
  user: RawUser;
  authorizing_integration_owners: Record<ApplicationIntegrationTypes, string>;
  original_response_message_id?: snowflake;
  interacted_message_id?: snowflake;
  triggering_interaction_metadata?: RawMessageInteractionMetadata;
}

/** https://discord.com/developers/docs/resources/message#message-call-object-message-call-object-structure */
export interface RawMessageCall {
  partecipants: Array<snowflake>;
  ended_timestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/resources/message#message-reference-object-message-reference-structure */
export interface RawMessageReference {
  type?: MessageReferenceTypes;
  message_id?: snowflake;
  channel_id?: snowflake;
  guild_id?: snowflake;
  fail_if_not_exists?: boolean;
}

/** https://discord.com/developers/docs/resources/message#message-snapshot-object-message-snapshot-structure */
export interface RawMessageSnapshot {
  message: Pick<
    RawMessage,
    | "type"
    | "content"
    | "embeds"
    | "attachments"
    | "timestamp"
    | "edited_timestamp"
    | "flags"
    | "mentions"
    | "mention_roles"
    | "stickers"
    | "sticker_items"
    | "components"
  >;
}

/** https://discord.com/developers/docs/resources/message#reaction-object-reaction-structure */
export interface RawReaction {
  count: number;
  count_details: RawReactionCountDetails;
  me: boolean;
  me_burst: boolean;
  emoji: RawEmoji;
  burst_colors: Array<string>;
}

/** https://discord.com/developers/docs/resources/message#reaction-count-details-object-reaction-count-details-structure */
export interface RawReactionCountDetails {
  burst: number;
  normal: number;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-structure */
export interface RawEmbed {
  title?: string;
  type?: EmbedTypes;
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
  flags?: EmbedFlags;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-thumbnail-structure */
export interface RawEmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-video-structure */
export interface RawEmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
  content_type?: string;
  placeholder?: string;
  placeholder_version?: number;
  description?: string;
  flags?: EmbedMediaFlags;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure */
export interface RawEmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
  content_type?: string;
  placeholder?: string;
  placeholder_version?: number;
  description?: string;
  flags?: EmbedMediaFlags;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-provider-structure */
export interface RawEmbedProvider {
  name?: string;
  url?: string;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-author-structure */
export interface RawEmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-footer-structure */
export interface RawEmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-field-structure */
export interface RawEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/message#embed-fields-by-embed-type-poll-result-embed-fields */
export interface RawPollResultEmbedFields {
  poll_question_text: string;
  victor_answer_votes: Array<number>;
  total_votes: number;
  victor_answer_id?: snowflake;
  victor_answer_text?: string;
  victor_answer_emoji_id?: snowflake;
  victor_answer_emoji_name?: string;
  victor_answer_emoji_animated?: boolean;
}

/** https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure */
export interface RawAttachment {
  id: snowflake;
  filename: string;
  title?: string;
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
  clip_participants?: Array<RawUser>;
  clip_created_at?: timestamp;
  application?: RawApplication | null;
}

/** https://discord.com/developers/docs/resources/message#channel-mention-object-channel-mention-structure */
export interface RawChannelMention {
  id: snowflake;
  guild_id: snowflake;
  type: ChannelTypes;
  name: string;
}

/** https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mentions-structure */
export interface RawAllowedMentions {
  parse?: Array<AllowedMentionTypes>;
  roles?: Array<snowflake>;
  users?: Array<snowflake>;
  replied_user?: boolean;
}

/** https://discord.com/developers/docs/resources/message#role-subscription-data-object-role-subscription-data-object-structure */
export interface RawRoleSubscriptionData {
  role_subscription_listing_id: snowflake;
  tier_name: string;
  total_months_subscribed: number;
  is_renewal: boolean;
}

/** https://discord.com/developers/docs/resources/message#message-pin-object-message-pin-structure */
export interface RawMessagePin {
  pinnet_at: timestamp;
  message: RawMessage;
}

/** https://docs.discord.com/developers/resources/message#shared-client-theme-object */
export interface RawSharedClientTheme {
  colors: Array<string>;
  gradient_angle: number;
  base_mix: number;
  base_theme?: BaseThemeTypes | null;
}

/** https://discord.com/developers/docs/resources/message#message-object-message-structure */
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
  application?: Partial<Application>;
  applicationId?: snowflake;
  flags?: MessageFlags;
  messageReference?: MessageReference;
  messageSnapshots?: Array<MessageSnapshot>;
  referencedMessage?: Message | null;
  interactionMetadata?: MessageInteractionMetadata;
  interaction?: MessageInteraction;
  thread?: Channel;
  components?: Array<
    | ActionRow
    | Section
    | TextDisplay
    | MediaGallery
    | File
    | Separator
    | Container
  >;
  stickerItems?: Array<StickerItem>;
  stickers?: Array<Sticker>;
  position?: number;
  roleSubscriptionData?: RoleSubscriptionData;
  resolved?: ResolvedData;
  poll?: Poll;
  call?: MessageCall;
  sharedClientTheme?: SharedClientTheme;
}

/** https://discord.com/developers/docs/resources/message#message-object-message-activity-structure */
export interface MessageActivity {
  type: MessageActivityTypes;
  partyId?: string;
}

/** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-message-interaction-metadata-structure */
export interface MessageInteractionMetadata {
  id: snowflake;
  type: InteractionType;
  user: User;
  authorizingIntegrationOwners: Record<ApplicationIntegrationTypes, string>;
  originalResponseMessageId?: snowflake;
  interactedMessageId?: snowflake;
  triggeringInteractionMetadata?: MessageInteractionMetadata;
}

/** https://discord.com/developers/docs/resources/message#message-call-object-message-call-object-structure */
export interface MessageCall {
  partecipants: Array<snowflake>;
  endedTimestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/resources/message#message-reference-object-message-reference-structure */
export interface MessageReference {
  type?: MessageReferenceTypes;
  messageId?: snowflake;
  channelId?: snowflake;
  guildId?: snowflake;
  failIfNotExists?: boolean;
}

/** https://discord.com/developers/docs/resources/message#message-snapshot-object-message-snapshot-structure */
export interface MessageSnapshot {
  message: Pick<
    Message,
    | "type"
    | "content"
    | "embeds"
    | "attachments"
    | "timestamp"
    | "editedTimestamp"
    | "flags"
    | "mentions"
    | "mentionRoles"
    | "stickers"
    | "stickerItems"
    | "components"
  >;
}

/** https://discord.com/developers/docs/resources/message#reaction-object-reaction-structure */
export interface Reaction {
  count: number;
  countDetails: ReactionCountDetails;
  me: boolean;
  meBurst: boolean;
  emoji: Emoji;
  burstColors: Array<string>;
}

/** https://discord.com/developers/docs/resources/message#reaction-count-details-object-reaction-count-details-structure */
export interface ReactionCountDetails {
  burst: number;
  normal: number;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-structure */
export interface Embed {
  title?: string;
  type?: EmbedTypes;
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
  flags?: EmbedFlags;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-thumbnail-structure */
export interface EmbedThumbnail {
  url: string;
  proxyURL?: string;
  height?: number;
  width?: number;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-video-structure */
export interface EmbedVideo {
  url?: string;
  proxyURL?: string;
  height?: number;
  width?: number;
  contentType?: string;
  placeholder?: string;
  placeholderVersion?: number;
  description?: string;
  flags?: EmbedMediaFlags;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure */
export interface EmbedImage {
  url: string;
  proxyURL?: string;
  height?: number;
  width?: number;
  contentType?: string;
  placeholder?: string;
  placeholderVersion?: number;
  description?: string;
  flags?: EmbedMediaFlags;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-provider-structure */
export interface EmbedProvider {
  name?: string;
  url?: string;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-author-structure */
export interface EmbedAuthor {
  name: string;
  url?: string;
  iconURL?: string;
  proxyIconURL?: string;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-footer-structure */
export interface EmbedFooter {
  text: string;
  iconURL?: string;
  proxyIconURL?: string;
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-field-structure */
export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/message#embed-fields-by-embed-type-poll-result-embed-fields */
export interface PollResultEmbedFields {
  pollQuestionText: string;
  victorAnswerVotes: Array<number>;
  totalVotes: number;
  victorAnswerId?: snowflake;
  victorAnswerText?: string;
  victorAnswerEmojiId?: snowflake;
  victorAnswerEmojiName?: string;
  victorAnswerEmojiAnimated?: boolean;
}

/** https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure */
export interface Attachment {
  id: snowflake;
  filename: string;
  title?: string;
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
  clipParticipants?: Array<User>;
  clipCreatedAt?: timestamp;
  application?: Application | null;
}

/** https://discord.com/developers/docs/resources/message#channel-mention-object-channel-mention-structure */
export interface ChannelMention {
  id: snowflake;
  guildId: snowflake;
  type: ChannelTypes;
  name: string;
}

/** https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mentions-structure */
export interface AllowedMentions {
  parse?: Array<AllowedMentionTypes>;
  roles?: Array<snowflake>;
  users?: Array<snowflake>;
  repliedUser?: boolean;
}

/** https://discord.com/developers/docs/resources/message#role-subscription-data-object-role-subscription-data-object-structure */
export interface RoleSubscriptionData {
  roleSubscriptionListingId: snowflake;
  tierName: string;
  totalMonthsSubscribed: number;
  isRenewal: boolean;
}

/** https://discord.com/developers/docs/resources/message#message-pin-object-message-pin-structure */
export interface MessagePin {
  pinnetAt: timestamp;
  message: Message;
}

/** https://docs.discord.com/developers/resources/message#shared-client-theme-object */
export interface SharedClientTheme {
  colors: Array<string>;
  gradientAngle: number;
  baseMix: number;
  baseTheme?: BaseThemeTypes | null;
}
