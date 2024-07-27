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
} from "../constants";
import type { Application, RawApplication } from "./application";
import type {
  Channel,
  RawChannel,
  RawRoleSubscriptionData,
  RoleSubscriptionData,
} from "./channel";
import type { snowflake, timestamp } from "./common";
import type { Emoji, RawEmoji } from "./emoji";
import type {
  MessageInteraction,
  RawMessageInteraction,
  RawResolvedData,
  ResolvedData,
} from "./interaction";
import type { ActionRow, RawActionRow } from "./message-components";
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
  application?: RawApplication;
  application_id?: snowflake;
  flags?: MessageFlags;
  message_reference?: RawMessageReference;
  message_snapshots?: Array<RawMessageSnapshot>;
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
}

/** https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure */
export interface RawEmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
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
  parse: Array<AllowedMentionTypes>;
  roles: Array<snowflake>;
  users: Array<snowflake>;
  replied_user: boolean;
}

export interface Message {
  id: snowflake;
  channelID: snowflake;
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
  webhookID?: snowflake;
  type: MessageTypes;
  activity?: MessageActivity;
  application?: Application;
  applicationID?: snowflake;
  flags?: MessageFlags;
  messageReference?: MessageReference;
  messageSnapshots?: Array<MessageSnapshot>;
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
  partyID?: string;
}

export interface MessageInteractionMetadata {
  id: snowflake;
  type: InteractionType;
  user: User;
  authorizingIntegrationOwners: Record<ApplicationIntegrationTypes, string>;
  originalResponseMessageID?: snowflake;
  interactedMessageID?: snowflake;
  triggeringInteractionMetadata?: MessageInteractionMetadata;
}

export interface MessageCall {
  partecipants: Array<snowflake>;
  endedTimestamp?: timestamp | null;
}

export interface MessageReference {
  type?: MessageReferenceTypes;
  messageID?: snowflake;
  channelID?: snowflake;
  guildID?: snowflake;
  failIfNotExists?: boolean;
}

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
  >;
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
  proxyURL?: string;
  height?: number;
  width?: number;
}

export interface EmbedVideo {
  url?: string;
  proxyURL?: string;
  height?: number;
  width?: number;
}

export interface EmbedImage {
  url: string;
  proxyURL?: string;
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
  iconURL?: string;
  proxyIconURL?: string;
}

export interface EmbedFooter {
  text: string;
  iconURL?: string;
  proxyIconURL?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

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
}

export interface ChannelMention {
  id: snowflake;
  guildID: snowflake;
  type: ChannelTypes;
  name: string;
}

export interface AllowedMentions {
  parse: Array<AllowedMentionTypes>;
  roles: Array<snowflake>;
  users: Array<snowflake>;
  repliedUser: boolean;
}
