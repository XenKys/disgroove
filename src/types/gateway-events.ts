import type {
  Application,
  Channel,
  GuildMember,
  Role,
  User,
} from "../structures";
import type {
  ActivityFlags,
  ActivityType,
  InviteTargetTypes,
  StatusTypes,
  TriggerTypes,
} from "../utils";
import {
  RawApplication,
  RawAutoModerationAction,
  RawChannel,
  RawEmoji,
  RawGuildMember,
  RawRole,
  RawSticker,
  RawThreadMember,
  RawUser,
  JSONAutoModerationAction,
  JSONEmoji,
  JSONSticker,
  JSONThreadMember,
} from ".";

/* https://discord.com/developers/docs/topics/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
export interface RawAutoModerationActionExectionEventFields {
  guild_id: string;
  action: RawAutoModerationAction;
  rule_id: string;
  rule_trigger_type: TriggerTypes;
  user_id: string;
  channel_id?: string;
  message_id?: string;
  alert_system_message_id?: string;
  content: string;
  matched_keyword: string | null;
  matched_content: string | null;
}

/* https://discord.com/developers/docs/topics/gateway-events#thread-list-sync-thread-list-sync-event-fields */
export interface RawThreadListSyncEventFields {
  guild_id: string;
  channel_ids?: Array<string>;
  threads: Array<RawChannel>;
  members: Array<RawThreadMember>;
}

/* https://discord.com/developers/docs/topics/gateway-events#thread-members-update-thread-members-update-event-fields */
export interface RawThreadMembersUpdateEventFields {
  id: string;
  guild_id: string;
  member_count: number;
  added_members?: Array<RawThreadMember>;
  removed_member_ids?: Array<string>;
}

/* https://discord.com/developers/docs/topics/gateway-events#channel-pins-update-channel-pins-update-event-fields */
export interface RawChannelPinsUpdateEventFields {
  guild_id?: string;
  channel_id: string;
  last_pin_timestamp: number | null;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-delete */
export interface RawGuildDeleteEventFields {
  id: string;
  unavailable: boolean;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-ban-add-guild-ban-add-event-fields */
export interface RawGuildBanAddEventFields {
  guild_id: string;
  user: RawUser;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
export interface RawGuildBanRemoveEventFields {
  guild_id: string;
  user: RawUser;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-emojis-update-guild-emojis-update-event-fields */
export interface RawGuildEmojisUpdateEventFields {
  guild_id: string;
  emojis: Array<RawEmoji>;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-stickers-update-guild-stickers-update-event-fields */
export interface RawGuildStickersUpdateEventFields {
  guild_id: string;
  stickers: Array<RawSticker>;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
export interface RawGuildIntegrationsUpdateEventFields {
  guild_id: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-member-remove-guild-member-remove-event-fields */
export interface RawGuildMemberRemoveEventFields {
  guild_id: string;
  user: RawUser;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-member-update-guild-member-update-event-fields */
export interface RawGuildMemberUpdateEventFields {
  guild_id: string;
  roles: Array<string>;
  user: RawUser;
  nick?: string | null;
  avatar: string | null;
  joined_at?: number | null;
  premium_since?: number | null;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communication_disabled_until?: number | null;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
export interface RawGuildMembersChunkEventFields {
  guild_id: string;
  members: Array<RawGuildMember>;
  chunk_index: number;
  chunk_count: number;
  not_found?: Array<string>;
  presences?: Array<RawPresenceUpdateEventFields>;
  nonce?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-role-create-guild-role-create-event-fields */
export interface RawGuildRoleCreateEventFields {
  guild_id: string;
  role: RawRole;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-role-update-guild-role-update-event-fields */
export interface RawGuildRoleUpdateEventFields {
  guild_id: string;
  role: RawRole;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-role-delete-guild-role-delete-event-fields */
export interface RawGuildRoleDeleteEventFields {
  guild_id: string;
  role_id: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-user-add-guild-scheduled-event-user-add-event-fields */
export interface RawGuildScheduledEventUserAddEventFields {
  guild_scheduled_event_id: string;
  user_id: string;
  guild_id: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-user-remove-guild-scheduled-event-user-remove-event-fields */
export interface RawGuildScheduledEventUserRemoveEventFields {
  guild_scheduled_event_id: string;
  user_id: string;
  guild_id: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#integration-delete-integration-delete-event-fields */
export interface RawIntegrationDeleteEventFields {
  id: string;
  guild_id: string;
  application_id?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#invite-create-invite-create-event-fields */
export interface RawInviteCreateEventFields {
  channel_id: string;
  code: string;
  created_at: number;
  guild_id?: string;
  inviter?: RawUser;
  max_age: number;
  max_uses: number;
  target_type?: InviteTargetTypes;
  target_user?: RawUser;
  target_application?: RawApplication;
  temporary: boolean;
  uses: number;
}

/* https://discord.com/developers/docs/topics/gateway-events#invite-delete-invite-delete-event-fields */
export interface RawInviteDeleteEventFields {
  channel_id: string;
  guild_id?: string;
  code: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#message-delete-message-delete-event-fields */
export interface RawMessageDeleteEventFields {
  id: string;
  channel_id: string;
  guild_id?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
export interface RawMessageDeleteBulkEventFields {
  ids: Array<string>;
  channel_id: string;
  guild_id?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#message-reaction-add-message-reaction-add-event-fields */
export interface RawMessageReactionAddEventFields {
  user_id: string;
  channel_id: string;
  messagei_id: string;
  guild_id?: string;
  member?: RawGuildMember;
  emoji: RawEmoji;
  message_author_id?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-message-reaction-remove-event-fields */
export interface RawMessageReactionRemoveEventFields {
  user_id: string;
  channel_id: string;
  messagei_id: string;
  guild_id?: string;
  emoji: RawEmoji;
}

/* https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
export interface RawMessageReactionRemoveAllEventFields {
  channel_id: string;
  messagei_id: string;
  guild_id?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
export interface RawMessageReactionRemoveEmojiEventFields {
  channel_id: string;
  guild_id?: string;
  messagei_id: string;
  emoji: RawEmoji;
}

/* https://discord.com/developers/docs/topics/gateway-events#presence-update-presence-update-event-fields */
export interface RawPresenceUpdateEventFields {
  user: RawUser;
  guild_id: string;
  status: StatusTypes;
  activities: Array<RawActivity>;
  client_status: RawClientStatus;
}

/* https://discord.com/developers/docs/topics/gateway-events#client-status-object */
export interface RawClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-structure */
export interface RawActivity {
  name: string;
  type: ActivityType;
  url?: string | null;
  created_at: number;
  timestamps?: RawActivityTimestamps;
  application_id?: string;
  details?: string | null;
  state?: string | null;
  party?: RawActivityParty;
  assets?: RawActivityAssets;
  secrets?: RawActivitySecrets;
  instance?: boolean;
  flags?: ActivityFlags;
  buttons?: Array<RawActivityButton>;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-timestamps */
export interface RawActivityTimestamps {
  start?: number;
  end?: number;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-party */
export interface RawActivityParty {
  id?: string;
  size?: Array<number>;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-assets */
export interface RawActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-secrets */
export interface RawActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-buttons */
export interface RawActivityButton {
  label: string;
  url: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#typing-start-typing-start-event-fields */
export interface RawTypingStartEventFields {
  channel_id: string;
  guild_id?: string;
  user_id: string;
  timestamp: number;
  member?: RawGuildMember;
}

/* https://discord.com/developers/docs/topics/gateway-events#voice-server-update-voice-server-update-event-fields */
export interface RawVoiceServerUpdateEventFields {
  token: string;
  guild_id: string;
  endpoint: string | null;
}

/* https://discord.com/developers/docs/topics/gateway-events#webhooks-update-webhooks-update-event-fields */
export interface RawWebhooksUpdateEventFields {
  guild_id: string;
  channel_id: string;
}

export interface JSONAutoModerationActionExectionEventFields {
  guildId: string;
  action: JSONAutoModerationAction;
  ruleId: string;
  ruleTriggerType: TriggerTypes;
  userId: string;
  channelId?: string;
  messageId?: string;
  alertSystemMessageId?: string;
  content: string;
  matchedKeyword: string | null;
  matchedContent: string | null;
}

export interface JSONThreadListSyncEventFields {
  guildId: string;
  channelIds?: Array<string>;
  threads: Array<Channel>;
  members: Array<JSONThreadMember>;
}

export interface JSONThreadMembersUpdateEventFields {
  id: string;
  guildId: string;
  memberCount: number;
  addedMembers?: Array<JSONThreadMember>;
  removedMemberIds?: Array<string>;
}

export interface JSONChannelPinsUpdateEventFields {
  guildId?: string;
  channelId: string;
  lastPinTimestamp: number | null;
}

export interface JSONGuildDeleteEventFields {
  id: string;
  unavailable: boolean;
}

export interface JSONGuildBanAddEventFields {
  guildId: string;
  user: User;
}

export interface JSONGuildBanRemoveEventFields {
  guildId: string;
  user: User;
}

export interface JSONGuildEmojisUpdateEventFields {
  guildId: string;
  emojis: Array<JSONEmoji>;
}

export interface JSONGuildStickersUpdateEventFields {
  guildId: string;
  stickers: Array<JSONSticker>;
}

export interface JSONGuildIntegrationsUpdateEventFields {
  guildId: string;
}

export interface JSONGuildMemberRemoveEventFields {
  guildId: string;
  user: User;
}

export interface JSONGuildMemberUpdateEventFields {
  guildId: string;
  roles: Array<string>;
  user: User;
  nick?: string | null;
  avatar: string | null;
  joinedAt?: number | null;
  premiumSince?: number | null;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communicationDisabledUntil?: number | null;
}

export interface JSONGuildMembersChunkEventFields {
  guildId: string;
  members: Array<GuildMember>;
  chunkIndex: number;
  chunkCount: number;
  notFound?: Array<string>;
  presences?: Array<JSONPresenceUpdateEventFields>;
  nonce?: string;
}

export interface JSONGuildRoleCreateEventFields {
  guildId: string;
  role: Role;
}

export interface JSONGuildRoleUpdateEventFields {
  guildId: string;
  role: Role;
}

export interface JSONGuildRoleDeleteEventFields {
  guildId: string;
  roleId: string;
}

export interface JSONGuildScheduledEventUserAddEventFields {
  guildScheduledEventId: string;
  userId: string;
  guildId: string;
}

export interface JSONGuildScheduledEventUserRemoveEventFields {
  guildScheduledEventId: string;
  userId: string;
  guildId: string;
}

export interface JSONIntegrationDeleteEventFields {
  id: string;
  guildId: string;
  applicationId?: string;
}

export interface JSONInviteCreateEventFields {
  channelId: string;
  code: string;
  createdAt: number;
  guildId?: string;
  inviter?: User;
  maxAge: number;
  maxUses: number;
  targetType?: InviteTargetTypes;
  targetUser?: User;
  targetApplication?: Application;
  temporary: boolean;
  uses: number;
}

export interface JSONInviteDeleteEventFields {
  channelId: string;
  guildId?: string;
  code: string;
}

export interface JSONMessageDeleteEventFields {
  id: string;
  channelId: string;
  guildId?: string;
}

export interface JSONMessageDeleteBulkEventFields {
  ids: Array<string>;
  channelId: string;
  guildId?: string;
}

export interface JSONMessageReactionAddEventFields {
  userId: string;
  channelId: string;
  messageId: string;
  guildId?: string;
  member?: GuildMember;
  emoji: JSONEmoji;
  messageAuthorId?: string;
}

export interface JSONMessageReactionRemoveEventFields {
  userId: string;
  channelId: string;
  messageId: string;
  guildId?: string;
  emoji: JSONEmoji;
}

export interface JSONMessageReactionRemoveAllEventFields {
  channelId: string;
  messageId: string;
  guildId?: string;
}

export interface JSONMessageReactionRemoveEmojiEventFields {
  channelId: string;
  guildId?: string;
  messageId: string;
  emoji: JSONEmoji;
}

export interface JSONPresenceUpdateEventFields {
  user: User;
  guildId: string;
  status: StatusTypes;
  activities: Array<JSONActivity>;
  clientStatus: JSONClientStatus;
}

export interface JSONClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

export interface JSONActivity {
  name: string;
  type: ActivityType;
  url?: string | null;
  createdAt: number;
  timestamps?: JSONActivityTimestamps;
  applicationId?: string;
  details?: string | null;
  state?: string | null;
  party?: JSONActivityParty;
  assets?: JSONActivityAssets;
  secrets?: JSONActivitySecrets;
  instance?: boolean;
  flags?: ActivityFlags;
  buttons?: Array<JSONActivityButton>;
}

export interface JSONActivityTimestamps {
  start?: number;
  end?: number;
}

export interface JSONActivityParty {
  id?: string;
  size?: Array<number>;
}

export interface JSONActivityAssets {
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
}

export interface JSONActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

export interface JSONActivityButton {
  label: string;
  url: string;
}

export interface JSONTypingStartEventFields {
  channelId: string;
  guildId?: string;
  userId: string;
  timestamp: number;
  member?: GuildMember;
}

export interface JSONVoiceServerUpdateEventFields {
  token: string;
  guildId: string;
  endpoint: string | null;
}

export interface JSONWebhooksUpdateEventFields {
  guildId: string;
  channelId: string;
}
