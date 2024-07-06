import type {
  ActivityFlags,
  ActivityType,
  GatewayIntents,
  GatewayOPCodes,
  GuildMemberFlags,
  InviteTargetTypes,
  ReactionTypes,
  StatusTypes,
  TriggerTypes,
} from "../constants";
import type { RawApplication, Application } from "./application";
import type {
  RawAutoModerationAction,
  AutoModerationAction,
} from "./auto-moderation";
import type {
  RawChannel,
  RawThreadMember,
  Channel,
  ThreadMember,
} from "./channel";
import type { snowflake, timestamp } from "./common";
import type { RawEmoji, Emoji } from "./emoji";
import type { RawGuildMember, GuildMember } from "./guild";
import type {
  RawGuildScheduledEvent,
  GuildScheduledEvent,
} from "./guild-scheduled-event";
import type { RawStageInstance, StageInstance } from "./stage-instance";
import type {
  RawUser,
  RawAvatarDecorationData,
  User,
  AvatarDecorationData,
} from "./user";
import type { RawVoiceState, VoiceState } from "./voice";

/** https://discord.com/developers/docs/topics/gateway-events#payload-structure */
export interface RawPayload {
  op: number;
  d: any | null;
  s: number | null;
  t: string | null;
}

/** https://discord.com/developers/docs/topics/gateway-events#identify-identify-structure */
export interface RawIdentify {
  token: string;
  properties: RawIdentifyConnectionProperties;
  compress?: boolean;
  large_threshold?: number;
  shard?: [number, number];
  presence?: RawGatewayPresenceUpdate;
  intents: GatewayIntents;
}

/** https://discord.com/developers/docs/topics/gateway-events#identify-identify-connection-properties */
export interface RawIdentifyConnectionProperties {
  os: string;
  browser: string;
  device: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#resume-resume-structure */
export interface RawResume {
  token: string;
  session_id: string;
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway-events#request-guild-members-request-guild-members-structure */
export interface RawRequestGuildMembers {
  guild_id: snowflake;
  query?: string;
  limit?: number;
  presences?: boolean;
  user_ids?: snowflake | Array<snowflake>;
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#update-presence-gateway-presence-update-structure */
export interface RawGatewayPresenceUpdate {
  since: number | null;
  activities: Array<Pick<RawActivity, "name" | "type" | "url" | "state">>;
  status: StatusTypes;
  afk: boolean;
}

/** https://discord.com/developers/docs/topics/gateway-events#update-voice-state-gateway-voice-state-update-structure */
export interface RawGatewayVoiceStateUpdate {
  guild_id: snowflake;
  channel_id: snowflake | null;
  self_mute: boolean;
  self_deaf: boolean;
}

/** https://discord.com/developers/docs/topics/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface RawAutoModerationActionExecutionEventFields {
  guild_id: snowflake;
  action: RawAutoModerationAction;
  rule_id: snowflake;
  rule_trigger_type: TriggerTypes;
  user_id: snowflake;
  channel_id?: snowflake;
  message_id?: snowflake;
  alert_system_message_id?: snowflake;
  content: string;
  matched_keyword: string | null;
  matched_content: string | null;
}

/** https://discord.com/developers/docs/topics/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface RawThreadListSyncEventFields {
  guild_id: snowflake;
  channel_ids?: Array<snowflake>;
  threads: Array<RawChannel>;
  members: Array<RawThreadMember>;
}

/** https://discord.com/developers/docs/topics/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface RawThreadMemberUpdateEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface RawThreadMembersUpdateEventFields {
  id: snowflake;
  guild_id: snowflake;
  member_count: number;
  added_members?: Array<RawThreadMember>;
  removed_member_ids?: Array<snowflake>;
}

/** https://discord.com/developers/docs/topics/gateway-events#channel-pins-update-channel-pins-update-event-fields */
export interface RawChannelPinsUpdateEventFields {
  guild_id?: snowflake;
  channel_id: snowflake;
  last_pin_timestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-create-guild-create-extra-fields */
export interface RawGuildCreateEventExtraFields {
  joined_at?: timestamp;
  large?: boolean;
  unavailable?: boolean;
  member_count?: number;
  voice_states?: Array<RawVoiceState>;
  members?: Array<RawGuildMember>;
  channels?: Array<RawChannel>;
  threads?: Array<RawChannel>;
  presences?: Array<RawPresenceUpdateEventFields>;
  stage_instances?: Array<RawStageInstance>;
  guild_scheduled_events?: Array<RawGuildScheduledEvent>;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-extra-fields */
export interface RawGuildAuditLogEntryCreateExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface RawGuildBanAddEventFields {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface RawGuildBanRemoveEventFields {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface RawGuildIntegrationsUpdateEventFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface RawGuildMemberAddEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface RawGuildMemberRemoveEventFields {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface RawGuildMemberUpdateEventFields {
  guild_id: snowflake;
  roles: Array<snowflake>;
  user: RawUser;
  nick?: string | null;
  avatar: string | null;
  joined_at?: timestamp | null;
  premium_since?: number | null;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communication_disabled_until?: number | null;
  flags?: GuildMemberFlags;
  avatar_decoration_data?: RawAvatarDecorationData | null;
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface RawGuildMembersChunkEventFields {
  guild_id: snowflake;
  members: Array<RawGuildMember>;
  chunk_index: number;
  chunk_count: number;
  not_found?: Array<string>;
  presences?: Array<RawPresenceUpdateEventFields>;
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#integration-create-integration-create-event-additional-fields */
export interface RawIntegrationCreateEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#integration-update-integration-update-event-additional-fields */
export interface RawIntegrationUpdateEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#integration-delete-integration-delete-event-fields */
export interface RawIntegrationDeleteEventFields {
  id: snowflake;
  guild_id: snowflake;
  application_id?: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#invite-create-invite-create-event-fields */
export interface RawInviteCreateEventFields {
  channel_id: snowflake;
  code: string;
  created_at: timestamp;
  guild_id?: snowflake;
  inviter?: RawUser;
  max_age: number;
  max_uses: number;
  target_type?: InviteTargetTypes;
  target_user?: RawUser;
  target_application?: RawApplication;
  temporary: boolean;
  uses: number;
}

/** https://discord.com/developers/docs/topics/gateway-events#invite-delete-invite-delete-event-fields */
export interface RawInviteDeleteEventFields {
  channel_id: snowflake;
  guild_id?: snowflake;
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-create-message-create-extra-fields */
export interface RawMessageCreateEventExtraFields {
  guild_id?: snowflake;
  member?: RawGuildMember;
  mentions: Array<RawUser>;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-delete-message-delete-event-fields */
export interface RawMessageDeleteEventFields {
  id: snowflake;
  channel_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface RawMessageDeleteBulkEventFields {
  ids: Array<snowflake>;
  channel_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-reaction-add-message-reaction-add-event-fields */
export interface RawMessageReactionAddEventFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  member?: RawGuildMember;
  emoji: RawEmoji;
  message_author_id?: snowflake;
  burst: boolean;
  burst_colors?: Array<string>;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-message-reaction-remove-event-fields */
export interface RawMessageReactionRemoveEventFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  emoji: RawEmoji;
  burst: boolean;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface RawMessageReactionRemoveAllEventFields {
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface RawMessageReactionRemoveEmojiEventFields {
  channel_id: snowflake;
  guild_id?: snowflake;
  message_id: snowflake;
  emoji: RawEmoji;
}

/** https://discord.com/developers/docs/topics/gateway-events#presence-update-presence-update-event-fields */
export interface RawPresenceUpdateEventFields {
  user: Pick<RawUser, "id"> & Partial<RawUser>;
  guild_id: snowflake;
  status: StatusTypes;
  activities: Array<RawActivity>;
  client_status: RawClientStatus;
}

/** https://discord.com/developers/docs/topics/gateway-events#client-status-object */
export interface RawClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-structure */
export interface RawActivity {
  name: string;
  type: ActivityType;
  url?: string | null;
  created_at: timestamp;
  timestamps?: RawActivityTimestamps;
  application_id?: snowflake;
  details?: string | null;
  state?: string | null;
  emoji?: RawActivityEmoji | null;
  party?: RawActivityParty;
  assets?: RawActivityAssets;
  secrets?: RawActivitySecrets;
  instance?: boolean;
  flags?: ActivityFlags;
  buttons?: Array<RawActivityButton>;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-timestamps */
export interface RawActivityTimestamps {
  start?: number;
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-emoji */
export interface RawActivityEmoji {
  name: string;
  id?: snowflake;
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-party */
export interface RawActivityParty {
  id?: string;
  size?: Array<number>;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-assets */
export interface RawActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-secrets */
export interface RawActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-buttons */
export interface RawActivityButton {
  label: string;
  url: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#typing-start-typing-start-event-fields */
export interface RawTypingStartEventFields {
  channel_id: snowflake;
  guild_id?: snowflake;
  user_id: snowflake;
  timestamp: timestamp;
  member?: RawGuildMember;
}

/** https://discord.com/developers/docs/topics/gateway-events#voice-server-update-voice-server-update-event-fields */
export interface RawVoiceServerUpdateEventFields {
  token: string;
  guild_id: snowflake;
  endpoint: string | null;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
export interface RawMessagePollVoteAddFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  answer_id: number;
}

/** https://discord.com/developers/docs/topics/gateway-events#message-poll-vote-remove */
export interface RawMessagePollVoteRemoveFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  answer_id: number;
}

export interface Payload {
  op: GatewayOPCodes;
  d: any | null;
  s: number | null;
  t: string | null;
}

export interface Identify {
  token: string;
  properties: IdentifyConnectionProperties;
  compress?: boolean;
  largeThreshold?: number;
  shard?: [number, number];
  presence?: Partial<
    Pick<GatewayPresenceUpdate, "since" | "activities" | "status" | "afk">
  >;
  intents: GatewayIntents;
}

export interface IdentifyConnectionProperties {
  os: string;
  browser: string;
  device: string;
}

export interface Resume {
  token: string;
  sessionID: string;
  seq: number;
}

export interface RequestGuildMembers {
  guildID: snowflake;
  query?: string;
  limit?: number;
  presences?: boolean;
  userIDs?: snowflake | Array<snowflake>;
  nonce?: string;
}

export interface GatewayPresenceUpdate {
  since: number | null;
  activities: Array<Pick<Activity, "name" | "type" | "url" | "state">>;
  status: StatusTypes;
  afk: boolean;
}

export interface GatewayVoiceStateUpdate {
  guildID: snowflake;
  channelID: snowflake | null;
  selfMute: boolean;
  selfDeaf: boolean;
}

export interface AutoModerationActionExecutionEventFields {
  guildID: snowflake;
  action: AutoModerationAction;
  ruleID: snowflake;
  ruleTriggerType: TriggerTypes;
  userID: snowflake;
  channelID?: snowflake;
  messageID?: snowflake;
  alertSystemMessageID?: snowflake;
  content: string;
  matchedKeyword: string | null;
  matchedContent: string | null;
}

export interface ThreadListSyncEventFields {
  guildID: snowflake;
  channelIDs?: Array<snowflake>;
  threads: Array<Channel>;
  members: Array<ThreadMember>;
}

export interface ThreadMemberUpdateEventExtraFields {
  guildID: snowflake;
}

export interface ThreadMembersUpdateEventFields {
  id: snowflake;
  guildID: snowflake;
  memberCount: number;
  addedMembers?: Array<ThreadMember>;
  removedMemberIDs?: Array<snowflake>;
}

export interface ChannelPinsUpdateEventFields {
  guildID?: snowflake;
  channelID: snowflake;
  lastPinTimestamp?: timestamp | null;
}

export interface GuildCreateEventExtraFields {
  joinedAt?: timestamp;
  large?: boolean;
  unavailable?: boolean;
  memberCount?: number;
  voiceStates?: Array<VoiceState>;
  members?: Array<GuildMember>;
  channels?: Array<Channel>;
  threads?: Array<Channel>;
  presences?: Array<PresenceUpdateEventFields>;
  stageInstances?: Array<StageInstance>;
  guildScheduledEvents?: Array<GuildScheduledEvent>;
}

export interface GuildAuditLogEntryCreateExtraFields {
  guildID: snowflake;
}

export interface GuildBanAddEventFields {
  guildID: snowflake;
  user: User;
}

export interface GuildBanRemoveEventFields {
  guildID: snowflake;
  user: User;
}

export interface GuildIntegrationsUpdateEventFields {
  guildID: snowflake;
}

export interface GuildMemberAddEventExtraFields {
  guildID: snowflake;
}

export interface GuildMemberRemoveEventFields {
  guildID: snowflake;
  user: User;
}

export interface GuildMemberUpdateEventFields {
  guildID: snowflake;
  roles: Array<snowflake>;
  user: User;
  nick?: string | null;
  avatar: string | null;
  joinedAt?: timestamp | null;
  premiumSince?: number | null;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communicationDisabledUntil?: number | null;
  flags?: GuildMemberFlags;
  avatarDecorationData?: AvatarDecorationData | null;
}

export interface GuildMembersChunkEventFields {
  guildID: snowflake;
  members: Array<GuildMember>;
  chunkIndex: number;
  chunkCount: number;
  notFound?: Array<string>;
  presences?: Array<PresenceUpdateEventFields>;
  nonce?: string;
}

export interface IntegrationCreateEventExtraFields {
  guildID: snowflake;
}

export interface IntegrationUpdateEventExtraFields {
  guildID: snowflake;
}

export interface IntegrationDeleteEventFields {
  id: snowflake;
  guildID: snowflake;
  applicationID?: snowflake;
}

export interface InviteCreateEventFields {
  channelID: snowflake;
  code: string;
  createdAt: timestamp;
  guildID?: snowflake;
  inviter?: User;
  maxAge: number;
  maxUses: number;
  targetType?: InviteTargetTypes;
  targetUser?: User;
  targetApplication?: Application;
  temporary: boolean;
  uses: number;
}

export interface InviteDeleteEventFields {
  channelID: snowflake;
  guildID?: snowflake;
  code: string;
}

export interface MessageCreateEventExtraFields {
  guildID?: snowflake;
  member?: GuildMember;
  mentions: Array<User>;
}

export interface MessageDeleteEventFields {
  id: snowflake;
  channelID: snowflake;
  guildID?: snowflake;
}

export interface MessageDeleteBulkEventFields {
  ids: Array<snowflake>;
  channelID: snowflake;
  guildID?: snowflake;
}

export interface MessageReactionAddEventFields {
  userID: snowflake;
  channelID: snowflake;
  messageID: snowflake;
  guildID?: snowflake;
  member?: GuildMember;
  emoji: Emoji;
  messageAuthorID?: snowflake;
  burst: boolean;
  burstColors?: Array<string>;
  type: ReactionTypes;
}

export interface MessageReactionRemoveEventFields {
  userID: snowflake;
  channelID: snowflake;
  messageID: snowflake;
  guildID?: snowflake;
  emoji: Emoji;
  burst: boolean;
  type: ReactionTypes;
}

export interface MessageReactionRemoveAllEventFields {
  channelID: snowflake;
  messageID: snowflake;
  guildID?: snowflake;
}

export interface MessageReactionRemoveEmojiEventFields {
  channelID: snowflake;
  guildID?: snowflake;
  messageID: snowflake;
  emoji: Emoji;
}

export interface PresenceUpdateEventFields {
  user: Pick<User, "id"> & Partial<User>;
  guildID: snowflake;
  status: StatusTypes;
  activities: Array<Activity>;
  clientStatus: ClientStatus;
}

export interface ClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

export interface Activity {
  name: string;
  type: ActivityType;
  url?: string | null;
  createdAt: timestamp;
  timestamps?: ActivityTimestamps;
  applicationID?: snowflake;
  details?: string | null;
  state?: string | null;
  emoji?: ActivityEmoji | null;
  party?: ActivityParty;
  assets?: ActivityAssets;
  secrets?: ActivitySecrets;
  instance?: boolean;
  flags?: ActivityFlags;
  buttons?: Array<ActivityButton>;
}

export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

export interface ActivityEmoji {
  name: string;
  id?: snowflake;
  animated?: boolean;
}

export interface ActivityParty {
  id?: string;
  size?: Array<number>;
}

export interface ActivityAssets {
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
}

export interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

export interface ActivityButton {
  label: string;
  url: string;
}

export interface TypingStartEventFields {
  channelID: snowflake;
  guildID?: snowflake;
  userID: snowflake;
  timestamp: timestamp;
  member?: GuildMember;
}

export interface VoiceServerUpdateEventFields {
  token: string;
  guildID: snowflake;
  endpoint: string | null;
}

export interface MessagePollVoteAddFields {
  userID: snowflake;
  channelID: snowflake;
  messageID: snowflake;
  guildID?: snowflake;
  answerID: number;
}

export interface MessagePollVoteRemoveFields {
  userID: snowflake;
  channelID: snowflake;
  messageID: snowflake;
  guildID?: snowflake;
  answerID: number;
}
