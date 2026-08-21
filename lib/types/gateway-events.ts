import type {
  ActivityFlags,
  ActivityType,
  AnimationTypes,
  ChannelTypes,
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
import type {
  RawGuildMember,
  GuildMember,
  RawUnavailableGuild,
  UnavailableGuild,
} from "./guild";
import type {
  RawGuildScheduledEvent,
  GuildScheduledEvent,
} from "./guild-scheduled-event";
import { RawRole, Role } from "./role";
import type { RawSoundboardSound, SoundboardSound } from "./soundboard";
import type { RawStageInstance, StageInstance } from "./stage-instance";
import { RawSticker, Sticker } from "./sticker";
import type {
  RawUser,
  RawAvatarDecorationData,
  User,
  AvatarDecorationData,
  Collectibles,
  RawCollectibles,
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

/** https://discord.com/developers/docs/topics/gateway-events#request-channel-info */
export interface RawRequestChannelInfo {
  guild_id: snowflake;
  fields: Array<string>;
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

/** https://discord.com/developers/docs/events/gateway-events#ready-ready-event-fields */
export interface RawReadyEvent {
  v: number;
  user: RawUser;
  guilds: Array<RawUnavailableGuild>;
  session_id: string;
  resume_gateway_url: string;
  shard?: [number, number];
  application: Pick<RawApplication, "id" | "flags">;
}

/** https://discord.com/developers/docs/events/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface RawAutoModerationActionExecutionEvent {
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

/** https://docs.discord.com/developers/events/gateway-events#channel-info-channel-info-structure */
export interface RawChannelInfoEvent {
  guild_id: snowflake;
  channels: Array<RawChannelInfoChannel>;
}

/** https://docs.discord.com/developers/events/gateway-events#channel-info-channel-info-channel-structure */
export interface RawChannelInfoChannel {
  id: snowflake;
  status?: string | null;
  voice_start_time?: number | null;
}

/** https://docs.discord.com/developers/events/gateway-events#voice-channel-status-update */
export interface RawVoiceChannelStatusUpdateEvent {
  id: snowflake;
  guild_id: snowflake;
  status: string | null;
}

/** https://docs.discord.com/developers/events/gateway-events#voice-channel-start-time-update */
export interface RawVoiceChannelStartTimeUpdateEvent {
  id: snowflake;
  guild_id: snowflake;
  voice_start_time?: number | null;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface RawThreadListSyncEvent {
  guild_id: snowflake;
  channel_ids?: Array<snowflake>;
  threads: Array<RawChannel>;
  members: Array<RawThreadMember>;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface RawThreadMemberUpdateEventExtra {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface RawThreadMembersUpdateEvent {
  id: snowflake;
  guild_id: snowflake;
  member_count: number;
  added_members?: Array<RawThreadMember>;
  removed_member_ids?: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#channel-pins-update-channel-pins-update-event-fields */
export interface RawChannelPinsUpdateEvent {
  guild_id?: snowflake;
  channel_id: snowflake;
  last_pin_timestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-create-guild-create-extra-fields */
export interface RawGuildCreateEventExtra {
  joined_at?: timestamp;
  large?: boolean;
  unavailable?: boolean;
  member_count?: number;
  voice_states?: Array<RawVoiceState>;
  members?: Array<RawGuildMember>;
  channels?: Array<RawChannel>;
  threads?: Array<RawChannel>;
  presences?: Array<RawPresenceUpdateEvent>;
  stage_instances?: Array<RawStageInstance>;
  guild_scheduled_events?: Array<RawGuildScheduledEvent>;
  soundboard_sounds?: Array<RawSoundboardSound>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-extra-fields */
export interface RawGuildAuditLogEntryCreateExtra {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface RawGuildBanAddEvent {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface RawGuildBanRemoveEvent {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-emojis-update */
export interface RawGuildEmojisUpdateEvent {
  guild_id: snowflake;
  emojis: Array<RawEmoji>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-stickers-update */
export interface RawGuildStickersUpdateEvent {
  guild_id: snowflake;
  stickers: Array<RawSticker>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface RawGuildIntegrationsUpdateEvent {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface RawGuildMemberAddEventExtra {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface RawGuildMemberRemoveEvent {
  guild_id: snowflake;
  user: RawUser;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface RawGuildMemberUpdateEvent {
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
  collectibles?: RawCollectibles | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface RawGuildMembersChunkEvent {
  guild_id: snowflake;
  members: Array<RawGuildMember>;
  chunk_index: number;
  chunk_count: number;
  not_found?: Array<string>;
  presences?: Array<RawPresenceUpdateEvent>;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-create-guild-role-create-event-fields */
export interface RawGuildRoleCreateEvent {
  guild_id: snowflake;
  role: RawRole;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-update-guild-role-update-event-fields */
export interface RawGuildRoleUpdateEvent {
  guild_id: snowflake;
  role: RawRole;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-delete-guild-role-delete-event-fields */
export interface RawGuildRoleDeleteEvent {
  guild_id: snowflake;
  role_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-add-guild-scheduled-event-user-add-event-fields */
export interface RawGuildScheduledEventUserAddEvent {
  guild_scheduled_event_id: snowflake;
  user_id: snowflake;
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-remove-guild-scheduled-event-user-remove-event-fields */
export interface RawGuildScheduledEventUserRemoveEvent {
  guild_scheduled_event_id: snowflake;
  user_id: snowflake;
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sound-delete-guild-soundboard-sound-delete-event-fields */
export interface RawGuildSoundboardSoundDeleteEvent {
  sound_id: snowflake;
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sounds-update-guild-soundboard-sounds-update-event-fields */
export interface RawGuildSoundboardSoundsUpdateEvent {
  soundboard_sounds: Array<RawSoundboardSound>;
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#soundboard-sounds-soundboard-sounds-event-fields */
export interface RawGuildSoundboardSoundsEvent {
  soundboard_sounds: Array<RawSoundboardSound>;
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields */
export interface RawIntegrationCreateEventExtra {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields */
export interface RawIntegrationUpdateEventExtra {
  guild_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-delete-integration-delete-event-fields */
export interface RawIntegrationDeleteEvent {
  id: snowflake;
  guild_id: snowflake;
  application_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-create-invite-create-event-fields */
export interface RawInviteCreateEvent {
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
  roles_ids?: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-delete-invite-delete-event-fields */
export interface RawInviteDeleteEvent {
  channel_id: snowflake;
  guild_id?: snowflake;
  code: string;
}

/** https://discord.com/developers/docs/events/gateway-events#message-create-message-create-extra-fields */
export interface RawMessageCreateEventExtra {
  guild_id?: snowflake;
  member?: RawGuildMember;
  mentions: Array<RawUser>;
  channel_type?: ChannelTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-message-delete-event-fields */
export interface RawMessageDeleteEvent {
  id: snowflake;
  channel_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface RawMessageDeleteBulkEvent {
  ids: Array<snowflake>;
  channel_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-add-message-reaction-add-event-fields */
export interface RawMessageReactionAddEvent {
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
export interface RawMessageReactionRemoveEvent {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  emoji: RawEmoji;
  burst: boolean;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface RawMessageReactionRemoveAllEvent {
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface RawMessageReactionRemoveEmojiEvent {
  channel_id: snowflake;
  guild_id?: snowflake;
  message_id: snowflake;
  emoji: RawEmoji;
}

/** https://discord.com/developers/docs/events/gateway-events#presence-update-presence-update-event-fields */
export interface RawPresenceUpdateEvent {
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
  vr?: string;
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
export interface RawTypingStartEvent {
  channel_id: snowflake;
  guild_id?: snowflake;
  user_id: snowflake;
  timestamp: timestamp;
  member?: RawGuildMember;
}

/** https://discord.com/developers/docs/events/gateway-events#voice-channel-effetc-send-event-fields */
export interface RawVoiceChannelEffectSendEvent {
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
export interface RawVoiceServerUpdateEvent {
  token: string;
  guild_id: snowflake;
  endpoint: string | null;
}

/** https://discord.com/developers/docs/events/gateway-events#webhooks-update-webhooks-update-event-fields */
export interface RawWebhooksUpdateEvent {
  guild_id: snowflake;
  channel_id: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
export interface RawMessagePollVoteAddEvent {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  answer_id: number;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-remove */
export interface RawMessagePollVoteRemoveEvent {
  user_id: snowflake;
  channel_id: snowflake;
  message_id: snowflake;
  guild_id?: snowflake;
  answer_id: number;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limited-fields */
export interface RawRateLimitedEvent {
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

/** https://discord.com/developers/docs/topics/gateway-events#request-channel-info */
export interface RequestChannelInfo {
  guildId: snowflake;
  fields: Array<string>;
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

/** https://discord.com/developers/docs/events/gateway-events#ready-ready-event-fields */
export interface ReadyEvent {
  v: number;
  user: User;
  guilds: Array<UnavailableGuild>;
  sessionId: string;
  resumeGatewayURL: string;
  shard?: [number, number];
  application: Pick<Application, "id" | "flags">;
}

/** https://discord.com/developers/docs/events/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface AutoModerationActionExecutionEvent {
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

/** https://docs.discord.com/developers/events/gateway-events#channel-info-channel-info-structure */
export interface ChannelInfoEvent {
  guildId: snowflake;
  channels: Array<RawChannelInfoChannel>;
}

/** https://docs.discord.com/developers/events/gateway-events#channel-info-channel-info-channel-structure */
export interface ChannelInfoChannel {
  id: snowflake;
  status?: string | null;
  voiceStartTime?: number | null;
}

/** https://docs.discord.com/developers/events/gateway-events#voice-channel-status-update */
export interface VoiceChannelStatusUpdateEvent {
  id: snowflake;
  guildId: snowflake;
  status: string | null;
}

/** https://docs.discord.com/developers/events/gateway-events#voice-channel-start-time-update */
export interface VoiceChannelStartTimeUpdateEvent {
  id: snowflake;
  guildId: snowflake;
  voiceStartTime?: number | null;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface ThreadListSyncEvent {
  guildId: snowflake;
  channelIds?: Array<snowflake>;
  threads: Array<Channel>;
  members: Array<ThreadMember>;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
export interface ThreadMemberUpdateEventExtra {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface ThreadMembersUpdateEvent {
  id: snowflake;
  guildId: snowflake;
  memberCount: number;
  addedMembers?: Array<ThreadMember>;
  removedMemberIds?: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#channel-pins-update-channel-pins-update-event-fields */
export interface ChannelPinsUpdateEvent {
  guildId?: snowflake;
  channelId: snowflake;
  lastPinTimestamp?: timestamp | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-create-guild-create-extra-fields */
export interface GuildCreateEventExtra {
  joinedAt?: timestamp;
  large?: boolean;
  unavailable?: boolean;
  memberCount?: number;
  voiceStates?: Array<VoiceState>;
  members?: Array<GuildMember>;
  channels?: Array<Channel>;
  threads?: Array<Channel>;
  presences?: Array<PresenceUpdateEvent>;
  stageInstances?: Array<StageInstance>;
  guildScheduledEvents?: Array<GuildScheduledEvent>;
  soundboardSounds?: Array<SoundboardSound>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-extra-fields */
export interface GuildAuditLogEntryCreateExtra {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface GuildBanAddEvent {
  guildId: snowflake;
  user: User;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface GuildBanRemoveEvent {
  guildId: snowflake;
  user: User;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-emojis-update */
export interface GuildEmojisUpdateEvent {
  guildId: snowflake;
  emojis: Array<Emoji>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-stickers-update */
export interface GuildStickersUpdateEvent {
  guildId: snowflake;
  stickers: Array<Sticker>;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface GuildIntegrationsUpdateEvent {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
export interface GuildMemberAddEventExtra {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface GuildMemberRemoveEvent {
  guildId: snowflake;
  user: User;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface GuildMemberUpdateEvent {
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
  collectibles?: Collectibles | null;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface GuildMembersChunkEvent {
  guildId: snowflake;
  members: Array<GuildMember>;
  chunkIndex: number;
  chunkCount: number;
  notFound?: Array<string>;
  presences?: Array<PresenceUpdateEvent>;
  nonce?: string;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-create-guild-role-create-event-fields */
export interface GuildRoleCreateEvent {
  guildId: snowflake;
  role: Role;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-update-guild-role-update-event-fields */
export interface GuildRoleUpdateEvent {
  guildId: snowflake;
  role: Role;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-role-delete-guild-role-delete-event-fields */
export interface GuildRoleDeleteEvent {
  guildId: snowflake;
  roleId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-add-guild-scheduled-event-user-add-event-fields */
export interface GuildScheduledEventUserAddEvent {
  guildScheduledEventId: snowflake;
  userId: snowflake;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-remove-guild-scheduled-event-user-remove-event-fields */
export interface GuildScheduledEventUserRemoveEvent {
  guildScheduledEventId: snowflake;
  userId: snowflake;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sound-delete-guild-soundboard-sound-delete-event-fields */
export interface GuildSoundboardSoundDeleteEvent {
  soundId: snowflake;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sounds-update-guild-soundboard-sounds-update-event-fields */
export interface GuildSoundboardSoundsUpdateEvent {
  soundboardSounds: Array<SoundboardSound>;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#soundboard-sounds-soundboard-sounds-event-fields */
export interface GuildSoundboardSoundsEvent {
  soundboardSounds: Array<SoundboardSound>;
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields */
export interface IntegrationCreateEventExtra {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields */
export interface IntegrationUpdateEventExtra {
  guildId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#integration-delete-integration-delete-event-fields */
export interface IntegrationDeleteEvent {
  id: snowflake;
  guildId: snowflake;
  applicationId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-create-invite-create-event-fields */
export interface InviteCreateEvent {
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
  roleIds?: Array<snowflake>;
}

/** https://discord.com/developers/docs/events/gateway-events#invite-delete-invite-delete-event-fields */
export interface InviteDeleteEvent {
  channelId: snowflake;
  guildId?: snowflake;
  code: string;
}

/** https://discord.com/developers/docs/events/gateway-events#message-create-message-create-extra-fields */
export interface MessageCreateEventExtra {
  guildId?: snowflake;
  member?: GuildMember;
  mentions: Array<User>;
  channelType?: ChannelTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-message-delete-event-fields */
export interface MessageDeleteEvent {
  id: snowflake;
  channelId: snowflake;
  guildId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface MessageDeleteBulkEvent {
  ids: Array<snowflake>;
  channelId: snowflake;
  guildId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-add-message-reaction-add-event-fields */
export interface MessageReactionAddEvent {
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
export interface MessageReactionRemoveEvent {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  emoji: Emoji;
  burst: boolean;
  type: ReactionTypes;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface MessageReactionRemoveAllEvent {
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface MessageReactionRemoveEmojiEvent {
  channelId: snowflake;
  guildId?: snowflake;
  messageId: snowflake;
  emoji: Emoji;
}

/** https://discord.com/developers/docs/events/gateway-events#presence-update-presence-update-event-fields */
export interface PresenceUpdateEvent {
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
  vr?: string;
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
export interface TypingStartEvent {
  channelId: snowflake;
  guildId?: snowflake;
  userId: snowflake;
  timestamp: timestamp;
  member?: GuildMember;
}

/** https://discord.com/developers/docs/events/gateway-events#voice-channel-effetc-send-event-fields */
export interface VoiceChannelEffectSendEvent {
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
export interface VoiceServerUpdateEvent {
  token: string;
  guildId: snowflake;
  endpoint: string | null;
}

/** https://discord.com/developers/docs/events/gateway-events#webhooks-update-webhooks-update-event-fields */
export interface WebhooksUpdateEvent {
  guildId: snowflake;
  channelId: snowflake;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
export interface MessagePollVoteAddEvent {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  answerId: number;
}

/** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-remove */
export interface MessagePollVoteRemoveEvent {
  userId: snowflake;
  channelId: snowflake;
  messageId: snowflake;
  guildId?: snowflake;
  answerId: number;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limited-fields */
export interface RateLimitedEvent {
  opcode: GatewayOPCodes;
  retryAfter: number;
  meta: RequestGuildMembersRateLimitMetadata;
}

/** https://discord.com/developers/docs/events/gateway-events#rate-limited-rate-limit-metadata-for-opcode-structure */
export interface RequestGuildMembersRateLimitMetadata {
  guildId: snowflake;
  nonce?: string;
}
