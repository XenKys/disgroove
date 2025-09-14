import type {
  ActivityFlags,
  ActivityType,
  AnimationTypes,
  GatewayEvents,
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
import type { RawSoundboardSound, SoundboardSound } from "./soundboard";
import type { RawStageInstance, StageInstance } from "./stage-instance";
import type {
  RawUser,
  RawAvatarDecorationData,
  User,
  AvatarDecorationData,
} from "./user";
import type { RawVoiceState, VoiceState } from "./voice";

/** https://discord.com/developers/docs/events/gateway-events#payload-structure */
export interface RawPayload {
  op: GatewayOPCodes;
  d: any | null;
  s: number | null;
  t: GatewayEvents | null;
}

/** https://discord.com/developers/docs/events/gateway-events#identify-identify-structure */
export interface RawIdentify {
  token: string;
  properties: RawIdentifyConnectionProperties;
  compress?: boolean;
  large_threshold?: number;
  shard?: [number, number];
  presence?: Partial<
    Pick<RawGatewayPresenceUpdate, "since" | "activities" | "status" | "afk">
  >;
  intents: GatewayIntents;
}

/** https://discord.com/developers/docs/events/gateway-events#identify-identify-connection-properties */
export interface RawIdentifyConnectionProperties {
  os: string;
  browser: string;
  device: string;
}

/** https://discord.com/developers/docs/events/gateway-events#resume-resume-structure */
export interface RawResume {
  token: string;
  session_id: string;
  seq: number;
}

/** https://discord.com/developers/docs/events/gateway-events#request-guild-members-request-guild-members-structure */
export interface RawRequestGuildMembers {
  guild_id: snowflake;
  query?: string;
  limit?: number;
  presences?: boolean;
  user_ids?: snowflake | Array<snowflake>;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#request-soundboard-sounds-request-soundboard-sounds-structure */
export interface RawRequestSoundboardSounds {
  guild_ids: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#update-presence-gateway-presence-update-structure */
export interface RawGatewayPresenceUpdate {
  since: number | null;
  activities: Array<
    Partial<Pick<RawActivity, "name" | "type" | "url" | "state">>
  >;
  status: StatusTypes;
  afk: boolean;
}

/** https://discord.com/developers/docs/events/gateway-events#update-voice-state-gateway-voice-state-update-structure */
export interface RawGatewayVoiceStateUpdate {
  guild_id: snowflake;
  channel_id: snowflake | null;
  self_mute: boolean;
  self_deaf: boolean;
}

/** https://discord.com/developers/docs/events/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
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

/** https://discord.com/developers/docs/events/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface RawThreadListSyncEventFields {
  guild_id: snowflake;
  channel_ids?: Array<snowflake>;
  threads: Array<RawChannel>;
  members: Array<RawThreadMember>;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface RawThreadMemberUpdateEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface RawThreadMembersUpdateEventFields {
  id: snowflake;
  guild_id: snowflake;
  member_count: number;
  added_members?: Array<RawThreadMember>;
  removed_member_ids?: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#channel-pins-update-channel-pins-update-event-fields */
export interface RawChannelPinsUpdateEventFields {
  guild_id?: snowflake;
  channel_id: snowflake;
  last_pin_timestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-create-guild-create-extra-fields */
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
  soundboard_sounds?: Array<RawSoundboardSound>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-extra-fields */
export interface RawGuildAuditLogEntryCreateExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface RawGuildBanAddEventFields {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface RawGuildBanRemoveEventFields {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface RawGuildIntegrationsUpdateEventFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface RawGuildMemberAddEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface RawGuildMemberRemoveEventFields {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface RawGuildMemberUpdateEventFields {
  guild_id: snowflake;
  roles: Array<snowflake>;
  user: RawUser;
  nick?: string | null;
  avatar: string | null;
  banner: string | null;
  joined_at?: timestamp | null;
  premium_since?: number | null;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communication_disabled_until?: number | null;
  flags?: GuildMemberFlags;
  avatar_decoration_data?: RawAvatarDecorationData | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface RawGuildMembersChunkEventFields {
  guild_id: snowflake;
  members: Array<RawGuildMember>;
  chunk_index: number;
  chunk_count: number;
  not_found?: Array<string>;
  presences?: Array<RawPresenceUpdateEventFields>;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sound-delete-guild-soundboard-sound-delete-event-fields */
export interface RawGuildSoundboardSoundDeleteEventFields {
  soundId: snowflake;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields */
export interface RawIntegrationCreateEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields */
export interface RawIntegrationUpdateEventExtraFields {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-delete-integration-delete-event-fields */
export interface RawIntegrationDeleteEventFields {
  id: snowflake;
  guild_id: snowflake;
  application_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-create-invite-create-event-fields */
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
  expires_at: timestamp | null;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-delete-invite-delete-event-fields */
export interface RawInviteDeleteEventFields {
  channel_id: snowflake;
  guild_id?: snowflake;
  code: string;
}

/** https://discord.com/developers/docs/events/gateway-events#message-create-message-create-extra-fields */
export interface RawMessageCreateEventExtraFields {
  guild_id?: snowflake;
  member?: RawGuildMember;
  mentions: Array<RawUser>;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-message-delete-event-fields */
export interface RawMessageDeleteEventFields {
  id: snowflake;
  channel_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface RawMessageDeleteBulkEventFields {
  ids: Array<snowflake>;
  channel_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-add-message-reaction-add-event-fields */
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

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-message-reaction-remove-event-fields */
export interface RawMessageReactionRemoveEventFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  emoji: RawEmoji;
  burst: boolean;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface RawMessageReactionRemoveAllEventFields {
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface RawMessageReactionRemoveEmojiEventFields {
  channel_id: snowflake;
  guild_id?: snowflake;
  message_id: snowflake;
  emoji: RawEmoji;
}

/** https://discord.com/developers/docs/events/gateway-events#presence-update-presence-update-event-fields */
export interface RawPresenceUpdateEventFields {
  user: Pick<RawUser, "id"> & Partial<RawUser>;
  guild_id: snowflake;
  status: StatusTypes;
  activities: Array<RawActivity>;
  client_status: RawClientStatus;
}

/** https://discord.com/developers/docs/events/gateway-events#client-status-object */
export interface RawClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-structure */
export interface RawActivity {
  name: string;
  type: ActivityType;
  url?: string | null;
  created_at: number;
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

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-timestamps */
export interface RawActivityTimestamps {
  start?: number;
  end?: number;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-emoji */
export interface RawActivityEmoji {
  name: string;
  id?: snowflake;
  animated?: boolean;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-party */
export interface RawActivityParty {
  id?: string;
  size?: Array<number>;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-assets */
export interface RawActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-secrets */
export interface RawActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-buttons */
export interface RawActivityButton {
  label: string;
  url: string;
}

/** https://discord.com/developers/docs/events/gateway-events#typing-start-typing-start-event-fields */
export interface RawTypingStartEventFields {
  channel_id: snowflake;
  guild_id?: snowflake;
  user_id: snowflake;
  timestamp: timestamp;
  member?: RawGuildMember;
}

/** https://discord.com/developers/docs/events/gateway-events#voice-channel-effetc-send-event-fields */
export interface RawVoiceChannelEffectSendEventFields {
  channel_id: snowflake;
  guild_id: snowflake;
  user_id: snowflake;
  emoji?: RawEmoji | null;
  animation_type?: AnimationTypes | null;
  animation_id?: number;
  sound_id?: snowflake | number;
  sound_volume?: number;
}

/** https://discord.com/developers/docs/events/gateway-events#voice-server-update-voice-server-update-event-fields */
export interface RawVoiceServerUpdateEventFields {
  token: string;
  guild_id: snowflake;
  endpoint: string | null;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
export interface RawMessagePollVoteAddFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  answer_id: number;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-remove */
export interface RawMessagePollVoteRemoveFields {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  answer_id: number;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limited-fields */
export interface RawRateLimitedFields {
  opcode: GatewayOPCodes;
  retry_after: number;
  meta: RawRequestGuildMembersRateLimitMetadata;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limit-metadata-for-opcode-structure */
export interface RawRequestGuildMembersRateLimitMetadata {
  guild_id: snowflake;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#payload-structure */
export interface Payload {
  op: GatewayOPCodes;
  d: any | null;
  s: number | null;
  t: GatewayEvents | null;
}

/** https://discord.com/developers/docs/events/gateway-events#identify-identify-structure */
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

/** https://discord.com/developers/docs/events/gateway-events#identify-identify-connection-properties */
export interface IdentifyConnectionProperties {
  os: string;
  browser: string;
  device: string;
}

/** https://discord.com/developers/docs/events/gateway-events#resume-resume-structure */
export interface Resume {
  token: string;
  sessionId: string;
  seq: number;
}

/** https://discord.com/developers/docs/events/gateway-events#request-guild-members-request-guild-members-structure */
export interface RequestGuildMembers {
  guildId: snowflake;
  query?: string;
  limit?: number;
  presences?: boolean;
  userIds?: snowflake | Array<snowflake>;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#request-soundboard-sounds-request-soundboard-sounds-structure */
export interface RequestSoundboardSounds {
  guildIds: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#update-presence-gateway-presence-update-structure */
export interface GatewayPresenceUpdate {
  since: number | null;
  activities: Array<Partial<Pick<Activity, "name" | "type" | "url" | "state">>>;
  status: StatusTypes;
  afk: boolean;
}

/** https://discord.com/developers/docs/events/gateway-events#update-voice-state-gateway-voice-state-update-structure */
export interface GatewayVoiceStateUpdate {
  guildId: snowflake;
  channelId: snowflake | null;
  selfMute: boolean;
  selfDeaf: boolean;
}

/** https://discord.com/developers/docs/events/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface AutoModerationActionExecutionEventFields {
  guildId: snowflake;
  action: AutoModerationAction;
  ruleId: snowflake;
  ruleTriggerType: TriggerTypes;
  userId: snowflake;
  channelId?: snowflake;
  messageId?: snowflake;
  alertSystemMessageId?: snowflake;
  content: string;
  matchedKeyword: string | null;
  matchedContent: string | null;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface ThreadListSyncEventFields {
  guildId: snowflake;
  channelIds?: Array<snowflake>;
  threads: Array<Channel>;
  members: Array<ThreadMember>;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface ThreadMemberUpdateEventExtraFields {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface ThreadMembersUpdateEventFields {
  id: snowflake;
  guildId: snowflake;
  memberCount: number;
  addedMembers?: Array<ThreadMember>;
  removedMemberIds?: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#channel-pins-update-channel-pins-update-event-fields */
export interface ChannelPinsUpdateEventFields {
  guildId?: snowflake;
  channelId: snowflake;
  lastPinTimestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-create-guild-create-extra-fields */
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
  soundboardSounds?: Array<SoundboardSound>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-extra-fields */
export interface GuildAuditLogEntryCreateExtraFields {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface GuildBanAddEventFields {
  guildId: snowflake;
  user: User;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface GuildBanRemoveEventFields {
  guildId: snowflake;
  user: User;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface GuildIntegrationsUpdateEventFields {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface GuildMemberAddEventExtraFields {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface GuildMemberRemoveEventFields {
  guildId: snowflake;
  user: User;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface GuildMemberUpdateEventFields {
  guildId: snowflake;
  roles: Array<snowflake>;
  user: User;
  nick?: string | null;
  avatar: string | null;
  banner: string | null;
  joinedAt?: timestamp | null;
  premiumSince?: number | null;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communicationDisabledUntil?: number | null;
  flags?: GuildMemberFlags;
  avatarDecorationData?: AvatarDecorationData | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface GuildMembersChunkEventFields {
  guildId: snowflake;
  members: Array<GuildMember>;
  chunkIndex: number;
  chunkCount: number;
  notFound?: Array<string>;
  presences?: Array<PresenceUpdateEventFields>;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sound-delete-guild-soundboard-sound-delete-event-fields */
export interface GuildSoundboardSoundDeleteEventFields {
  soundId: snowflake;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields */
export interface IntegrationCreateEventExtraFields {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields */
export interface IntegrationUpdateEventExtraFields {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-delete-integration-delete-event-fields */
export interface IntegrationDeleteEventFields {
  id: snowflake;
  guildId: snowflake;
  applicationId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-create-invite-create-event-fields */
export interface InviteCreateEventFields {
  channelId: snowflake;
  code: string;
  createdAt: timestamp;
  guildId?: snowflake;
  inviter?: User;
  maxAge: number;
  maxUses: number;
  targetType?: InviteTargetTypes;
  targetUser?: User;
  targetApplication?: Application;
  temporary: boolean;
  uses: number;
  expiresAt: timestamp | null;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-delete-invite-delete-event-fields */
export interface InviteDeleteEventFields {
  channelId: snowflake;
  guildId?: snowflake;
  code: string;
}

/** https://discord.com/developers/docs/events/gateway-events#message-create-message-create-extra-fields */
export interface MessageCreateEventExtraFields {
  guildId?: snowflake;
  member?: GuildMember;
  mentions: Array<User>;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-message-delete-event-fields */
export interface MessageDeleteEventFields {
  id: snowflake;
  channelId: snowflake;
  guildId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface MessageDeleteBulkEventFields {
  ids: Array<snowflake>;
  channelId: snowflake;
  guildId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-add-message-reaction-add-event-fields */
export interface MessageReactionAddEventFields {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  member?: GuildMember;
  emoji: Emoji;
  messageAuthorId?: snowflake;
  burst: boolean;
  burstColors?: Array<string>;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-message-reaction-remove-event-fields */
export interface MessageReactionRemoveEventFields {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  emoji: Emoji;
  burst: boolean;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface MessageReactionRemoveAllEventFields {
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface MessageReactionRemoveEmojiEventFields {
  channelId: snowflake;
  guildId?: snowflake;
  messageId: snowflake;
  emoji: Emoji;
}

/** https://discord.com/developers/docs/events/gateway-events#presence-update-presence-update-event-fields */
export interface PresenceUpdateEventFields {
  user: Pick<User, "id"> & Partial<User>;
  guildId: snowflake;
  status: StatusTypes;
  activities: Array<Activity>;
  clientStatus: ClientStatus;
}

/** https://discord.com/developers/docs/events/gateway-events#client-status-object */
export interface ClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-structure */
export interface Activity {
  name: string;
  type: ActivityType;
  url?: string | null;
  createdAt: number;
  timestamps?: ActivityTimestamps;
  applicationId?: snowflake;
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

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-timestamps */
export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-emoji */
export interface ActivityEmoji {
  name: string;
  id?: snowflake;
  animated?: boolean;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-party */
export interface ActivityParty {
  id?: string;
  size?: Array<number>;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-assets */
export interface ActivityAssets {
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-secrets */
export interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-buttons */
export interface ActivityButton {
  label: string;
  url: string;
}

/** https://discord.com/developers/docs/events/gateway-events#typing-start-typing-start-event-fields */
export interface TypingStartEventFields {
  channelId: snowflake;
  guildId?: snowflake;
  userId: snowflake;
  timestamp: timestamp;
  member?: GuildMember;
}

/** https://discord.com/developers/docs/events/gateway-events#voice-channel-effetc-send-event-fields */
export interface VoiceChannelEffectSendEventFields {
  channelId: snowflake;
  guildId: snowflake;
  userId: snowflake;
  emoji?: Emoji | null;
  animationType?: AnimationTypes | null;
  animationId?: number;
  soundId?: snowflake | number;
  soundVolume?: number;
}

/** https://discord.com/developers/docs/events/gateway-events#voice-server-update-voice-server-update-event-fields */
export interface VoiceServerUpdateEventFields {
  token: string;
  guildId: snowflake;
  endpoint: string | null;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
export interface MessagePollVoteAddFields {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  answerId: number;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-remove */
export interface MessagePollVoteRemoveFields {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  answerId: number;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limited-fields */
export interface RateLimitedFields {
  opcode: GatewayOPCodes;
  retryAfter: number;
  meta: RequestGuildMembersRateLimitMetadata;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limit-metadata-for-opcode-structure */
export interface RequestGuildMembersRateLimitMetadata {
  guildId: snowflake;
  nonce?: string;
}
