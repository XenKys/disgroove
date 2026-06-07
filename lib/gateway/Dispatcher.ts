import { GatewayEvents, GatewayOPCodes } from "../constants";
import {
  Users,
  Guilds,
  AutoModeration,
  Channels,
  Entitlements,
  AuditLogs,
  Emojis,
  Stickers,
  Presences,
  Roles,
  GuildScheduledEvents,
  Soundboards,
  Interactions,
  Applications,
  Messages,
  StageInstances,
  Voice,
  Subscriptions,
} from "../transformers";
import type { RawGuildApplicationCommandPermissions } from "../types/application-command";
import type { RawAuditLogEntry } from "../types/audit-log";
import type { RawAutoModerationRule } from "../types/auto-moderation";
import type { RawChannel, RawThreadMember } from "../types/channel";
import type { RawEmoji } from "../types/emoji";
import type { RawEntitlement } from "../types/entitlements";
import type {
  RawRateLimitedEvent,
  RawAutoModerationActionExecutionEvent,
  RawChannelPinsUpdateEvent,
  RawThreadListSyncEvent,
  RawThreadMemberUpdateEventExtra,
  RawThreadMembersUpdateEvent,
  RawGuildCreateEventExtra,
  RawGuildAuditLogEntryCreateExtra,
  RawGuildBanAddEvent,
  RawGuildBanRemoveEvent,
  RawGuildEmojisUpdateEvent,
  RawGuildStickersUpdateEvent,
  RawGuildIntegrationsUpdateEvent,
  RawGuildMemberAddEventExtra,
  RawGuildMemberRemoveEvent,
  RawGuildMemberUpdateEvent,
  RawGuildMembersChunkEvent,
  RawGuildRoleCreateEvent,
  RawGuildRoleUpdateEvent,
  RawGuildRoleDeleteEvent,
  RawGuildScheduledEventUserAddEvent,
  RawGuildScheduledEventUserRemoveEvent,
  RawGuildSoundboardSoundDeleteEvent,
  RawGuildSoundboardSoundsUpdateEvent,
  RawGuildSoundboardSoundsEvent,
  RawIntegrationCreateEventExtra,
  RawIntegrationUpdateEventExtra,
  RawIntegrationDeleteEvent,
  RawInviteCreateEvent,
  RawInviteDeleteEvent,
  RawMessageCreateEventExtra,
  RawMessageDeleteEvent,
  RawMessageDeleteBulkEvent,
  RawMessageReactionAddEvent,
  RawMessageReactionRemoveEvent,
  RawMessageReactionRemoveAllEvent,
  RawMessageReactionRemoveEmojiEvent,
  RawPresenceUpdateEvent,
  RawTypingStartEvent,
  RawVoiceChannelEffectSendEvent,
  RawVoiceServerUpdateEvent,
  RawWebhooksUpdateEvent,
  RawMessagePollVoteAddEvent,
  RawMessagePollVoteRemoveEvent,
  RawReadyEvent,
  RawChannelInfoEvent,
  RawVoiceChannelStatusUpdateEvent,
  RawVoiceChannelStartTimeUpdateEvent,
} from "../types/gateway-events";
import type {
  RawGuild,
  RawUnavailableGuild,
  RawGuildMember,
  RawIntegration,
} from "../types/guild";
import type { RawGuildScheduledEvent } from "../types/guild-scheduled-event";
import type { RawInteraction } from "../types/interaction";
import type { RawMessage } from "../types/message";
import type { RawSoundboardSound } from "../types/soundboard";
import type { RawStageInstance } from "../types/stage-instance";
import type { RawSticker } from "../types/sticker";
import type { RawSubscription } from "../types/subscription";
import type { RawUser } from "../types/user";
import type { RawVoiceState } from "../types/voice";
import { Shard } from "./Shard";

export type DispatchHandler<T extends GatewayEvents> = (
  shard: Shard,
  data: DispatchEvents[T]
) => void;

export class Dispatcher {
  private shard: Shard;

  constructor(shard: Shard) {
    this.shard = shard;
  }

  dispatch<T extends GatewayEvents>(event: T, data: DispatchEvents[T]) {
    const handler = Handlers[event] as DispatchHandler<T> | undefined;

    if (handler) handler(this.shard, data);
  }
}

export const Handlers: { [K in GatewayEvents]?: DispatchHandler<K> } = {
  [GatewayEvents.Ready]: (shard, data) => {
    shard.sessionId = data.session_id;
    shard.resumeGatewayURL = `${data.resume_gateway_url}?v=10&encoding=json`;

    shard.client.user = Users.userFromRaw(data.user);
    shard.client.application = data.application;
    shard.client.emit("ready", shard.id);
  },
  [GatewayEvents.Resumed]: (shard) => {
    shard.client.emit("resumed", shard.id);
  },
  [GatewayEvents.RateLimited]: (shard, data) => {
    if (data.opcode === GatewayOPCodes.RequestGuildMembers) {
      shard.client.emit(
        "rateLimited",
        {
          opcode: GatewayOPCodes.RequestGuildMembers,
          retryAfter: data.retry_after,
          meta: {
            guildId: data.meta.guild_id,
            nonce: data.meta.nonce,
          },
        },
        shard.id
      );
    }
  },
  [GatewayEvents.ApplicationCommandPermissionsUpdate]: (shard, data) => {
    shard.client.emit(
      "applicationCommandPermissionsUpdate",
      Guilds.guildApplicationCommandPermissionsFromRaw(data)
    );
  },
  [GatewayEvents.AutoModerationRuleCreate]: (shard, data) =>
    shard.client.emit(
      "autoModerationRuleCreate",
      AutoModeration.autoModerationRuleFromRaw(data)
    ),
  [GatewayEvents.AutoModerationRuleUpdate]: (shard, data) =>
    shard.client.emit(
      "autoModerationRuleUpdate",
      AutoModeration.autoModerationRuleFromRaw(data)
    ),
  [GatewayEvents.AutoModerationRuleDelete]: (shard, data) =>
    shard.client.emit(
      "autoModerationRuleDelete",
      AutoModeration.autoModerationRuleFromRaw(data)
    ),
  [GatewayEvents.AutoModerationActionExecution]: (shard, data) =>
    shard.client.emit("autoModerationActionExecution", {
      guildId: data.guild_id,
      action: {
        type: data.action.type,
        metadata: {
          channelId: data.action.metadata.channel_id,
          durationSeconds: data.action.metadata.duration_seconds,
          customMessage: data.action.metadata.custom_message,
        },
      },
      ruleId: data.rule_id,
      ruleTriggerType: data.rule_trigger_type,
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      alertSystemMessageId: data.alert_system_message_id,
      content: data.content,
      matchedKeyword: data.matched_keyword,
      matchedContent: data.matched_content,
    }),
  [GatewayEvents.ChannelCreate]: (shard, data) =>
    shard.client.emit("channelCreate", Channels.channelFromRaw(data)),
  [GatewayEvents.ChannelUpdate]: (shard, data) =>
    shard.client.emit("channelUpdate", Channels.channelFromRaw(data)),
  [GatewayEvents.ChannelDelete]: (shard, data) =>
    shard.client.emit("channelDelete", Channels.channelFromRaw(data)),
  [GatewayEvents.ChannelInfo]: (shard, data) =>
    shard.client.emit("channelInfo", {
      guildId: data.guild_id,
      channels: data.channels.map((channel) => ({
        id: channel.id,
        status: channel.status,
        voiceStartTime: channel.voice_start_time,
      })),
    }),
  [GatewayEvents.ChannelPinsUpdate]: (shard, data) =>
    shard.client.emit("channelPinsUpdate", {
      guildId: data.guild_id,
      channelId: data.channel_id,
      lastPinTimestamp: data.last_pin_timestamp,
    }),
  [GatewayEvents.ThreadCreate]: (shard, data) =>
    shard.client.emit("threadCreate", Channels.channelFromRaw(data)),
  [GatewayEvents.ThreadUpdate]: (shard, data) =>
    shard.client.emit("threadUpdate", Channels.channelFromRaw(data)),
  [GatewayEvents.ThreadDelete]: (shard, data) =>
    shard.client.emit("threadDelete", Channels.channelFromRaw(data)),
  [GatewayEvents.ThreadListSync]: (shard, data) =>
    shard.client.emit("threadListSync", {
      guildId: data.guild_id,
      channelIds: data.channel_ids,
      threads: data.threads.map((thread) => Channels.channelFromRaw(thread)),
      members: data.members.map((threadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
    }),
  [GatewayEvents.ThreadMemberUpdate]: (shard, data) => {
    shard.client.emit("threadMemberUpdate", {
      id: data.id,
      userId: data.user_id,
      joinTimestamp: data.join_timestamp,
      flags: data.flags,
      member:
        data.member !== undefined
          ? Guilds.guildMemberFromRaw(data.member)
          : undefined,

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.ThreadMembersUpdate]: (shard, data) => {
    shard.client.emit("threadMembersUpdate", {
      id: data.id,
      guildId: data.guild_id,
      memberCount: data.member_count,
      addedMembers: data.added_members?.map((threadMember: RawThreadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
      removedMemberIds: data.removed_member_ids,
    });
  },
  [GatewayEvents.EntitlementCreate]: (shard, data) => {
    shard.client.emit(
      "entitlementCreate",
      Entitlements.entitlementFromRaw(data)
    );
  },
  [GatewayEvents.EntitlementUpdate]: (shard, data) => {
    shard.client.emit(
      "entitlementUpdate",
      Entitlements.entitlementFromRaw(data)
    );
  },
  [GatewayEvents.EntitlementDelete]: (shard, data) => {
    shard.client.emit(
      "entitlementDelete",
      Entitlements.entitlementFromRaw(data)
    );
  },
  [GatewayEvents.GuildCreate]: (shard, data) => {
    shard.client.guildShardMap.set(data.id, shard.id);

    if (data.unavailable) {
      const unavailableGuild = data as RawUnavailableGuild;

      shard.client.emit("guildCreate", unavailableGuild);
    } else {
      const guild = data as RawGuild & RawGuildCreateEventExtra;

      shard.client.emit("guildCreate", {
        ...Guilds.guildFromRaw(guild),

        joinedAt: guild.joined_at,
        large: guild.large,
        unavailable: guild.unavailable,
        memberCount: guild.member_count,
        voiceStates: guild.voice_states?.map((voiceState) =>
          Voice.voiceStateFromRaw(voiceState)
        ),
        members: guild.members?.map((member) =>
          Guilds.guildMemberFromRaw(member)
        ),
        channels: guild.channels?.map((channel) =>
          Channels.channelFromRaw(channel)
        ),
        threads: guild.threads?.map((thread) =>
          Channels.channelFromRaw(thread)
        ),
        presences: guild.presences?.map((presence) =>
          Presences.presenceFromRaw(presence)
        ),
        stageInstances: guild.stage_instances?.map((stageInstance) =>
          StageInstances.stageInstanceFromRaw(stageInstance)
        ),
        guildScheduledEvents: guild.guild_scheduled_events?.map(
          (guildScheduledEvent) =>
            GuildScheduledEvents.guildScheduledEventFromRaw(guildScheduledEvent)
        ),
        soundboardSounds: guild.soundboard_sounds?.map((soundboardSound) =>
          Soundboards.soundboardSoundFromRaw(soundboardSound)
        ),
      });

      shard.client.guilds.set(data.id, Guilds.guildFromRaw(<RawGuild>data));
    }
  },
  [GatewayEvents.GuildUpdate]: (shard, data) => {
    shard.client.guilds.set(data.id, Guilds.guildFromRaw(data));
    shard.client.emit("guildUpdate", Guilds.guildFromRaw(data));
  },
  [GatewayEvents.GuildDelete]: (shard, data) => {
    shard.client.guildShardMap.delete(data.id);
    shard.client.guilds.delete(data.id);
    shard.client.emit("guildDelete", data);
  },
  [GatewayEvents.GuildAuditLogEntryCreate]: (shard, data) => {
    shard.client.emit("guildAuditLogEntryCreate", {
      ...AuditLogs.auditLogEntryFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.GuildBanAdd]: (shard, data) => {
    shard.client.emit("guildBanAdd", {
      guildId: data.guild_id,
      user: Users.userFromRaw(data.user),
    });
  },
  [GatewayEvents.GuildBanRemove]: (shard, data) => {
    shard.client.emit("guildBanRemove", {
      guildId: data.guild_id,
      user: Users.userFromRaw(data.user),
    });
  },
  [GatewayEvents.GuildEmojisUpdate]: (shard, data) => {
    shard.client.emit(
      "guildEmojisUpdate",
      data.emojis.map((emoji: RawEmoji) => Emojis.emojiFromRaw(emoji)),
      data.guild_id
    );
  },
  [GatewayEvents.GuildStickersUpdate]: (shard, data) => {
    shard.client.emit(
      "guildStickersUpdate",
      data.stickers.map((sticker: RawSticker) =>
        Stickers.stickerFromRaw(sticker)
      ),
      data.guild_id
    );
  },
  [GatewayEvents.GuildIntegrationsUpdate]: (shard, data) => {
    shard.client.emit("guildIntegrationsUpdate", data.guild_id);
  },
  [GatewayEvents.GuildMemberAdd]: (shard, data) => {
    shard.client.emit("guildMemberAdd", {
      ...Guilds.guildMemberFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.GuildMemberRemove]: (shard, data) => {
    shard.client.emit("guildMemberRemove", {
      guildId: data.guild_id,
      user: Users.userFromRaw(data.user),
    });
  },
  [GatewayEvents.GuildMemberUpdate]: (shard, data) => {
    shard.client.emit("guildMemberUpdate", {
      guildId: data.guild_id,
      roles: data.roles,
      user: Users.userFromRaw(data.user),
      nick: data.nick,
      avatar: data.avatar,
      banner: data.banner,
      joinedAt: data.joined_at,
      premiumSince: data.premium_since,
      deaf: data.deaf,
      mute: data.mute,
      pending: data.pending,
      communicationDisabledUntil: data.communication_disabled_until,
      flags: data.flags,
      avatarDecorationData:
        data.avatar_decoration_data !== undefined
          ? data.avatar_decoration_data !== null
            ? {
                asset: data.avatar_decoration_data.asset,
                skuId: data.avatar_decoration_data.sku_id,
              }
            : null
          : undefined,
      collectibles:
        data.collectibles !== undefined
          ? data.collectibles !== null
            ? Users.collectiblesFromRaw(data.collectibles)
            : null
          : undefined,
    });
  },
  [GatewayEvents.GuildMembersChunk]: (shard, data) => {
    shard.client.emit("guildMembersChunk", {
      guildId: data.guild_id,
      members: data.members.map((guildMember: RawGuildMember) =>
        Guilds.guildMemberFromRaw(guildMember)
      ),
      chunkIndex: data.chunk_index,
      chunkCount: data.chunk_count,
      notFound: data.not_found,
      presences: data.presences?.map((presence: RawPresenceUpdateEvent) =>
        Presences.presenceFromRaw(presence)
      ),
      nonce: data.nonce,
    });
  },
  [GatewayEvents.GuildRoleCreate]: (shard, data) => {
    shard.client.emit(
      "guildRoleCreate",
      Roles.roleFromRaw(data.role),
      data.guild_id
    );
  },
  [GatewayEvents.GuildRoleUpdate]: (shard, data) => {
    shard.client.emit(
      "guildRoleUpdate",
      Roles.roleFromRaw(data.role),
      data.guild_id
    );
  },
  [GatewayEvents.GuildRoleDelete]: (shard, data) => {
    shard.client.emit("guildRoleDelete", data.role_id, data.guild_id);
  },
  [GatewayEvents.GuildScheduledEventCreate]: (shard, data) => {
    shard.client.emit(
      "guildScheduledEventCreate",
      GuildScheduledEvents.guildScheduledEventFromRaw(data)
    );
  },
  [GatewayEvents.GuildScheduledEventUpdate]: (shard, data) => {
    shard.client.emit(
      "guildScheduledEventUpdate",
      GuildScheduledEvents.guildScheduledEventFromRaw(data)
    );
  },
  [GatewayEvents.GuildScheduledEventDelete]: (shard, data) => {
    shard.client.emit(
      "guildScheduledEventDelete",
      GuildScheduledEvents.guildScheduledEventFromRaw(data)
    );
  },
  [GatewayEvents.GuildScheduledEventUserAdd]: (shard, data) => {
    shard.client.emit(
      "guildScheduledEventUserAdd",
      data.user_id,
      data.guild_scheduled_event_id,
      data.guild_id
    );
  },
  [GatewayEvents.GuildScheduledEventUserRemove]: (shard, data) => {
    shard.client.emit(
      "guildScheduledEventUserRemove",
      data.user_id,
      data.guild_scheduled_event_id,
      data.guild_id
    );
  },
  [GatewayEvents.GuildSoundboardSoundCreate]: (shard, data) => {
    shard.client.emit(
      "guildSoundboardSoundCreate",
      Soundboards.soundboardSoundFromRaw(data)
    );
  },
  [GatewayEvents.GuildSoundboardSoundUpdate]: (shard, data) => {
    shard.client.emit(
      "guildSoundboardSoundUpdate",
      Soundboards.soundboardSoundFromRaw(data)
    );
  },
  [GatewayEvents.GuildSoundboardSoundDelete]: (shard, data) => {
    shard.client.emit("guildSoundboardSoundDelete", {
      soundId: data.sound_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.GuildSoundboardSoundsUpdate]: (shard, data) => {
    shard.client.emit(
      "guildSoundboardSoundsUpdate",
      data.soundboard_sounds.map((sound: RawSoundboardSound) =>
        Soundboards.soundboardSoundFromRaw(sound)
      ),
      data.guild_id
    );
  },
  [GatewayEvents.SoundboardSounds]: (shard, data) => {
    shard.client.emit(
      "soundboardSounds",
      data.soundboard_sounds.map((sound: RawSoundboardSound) =>
        Soundboards.soundboardSoundFromRaw(sound)
      ),
      data.guild_id
    );
  },
  [GatewayEvents.IntegrationCreate]: (shard, data) => {
    shard.client.emit("integrationCreate", {
      ...Guilds.integrationFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.IntegrationUpdate]: (shard, data) => {
    shard.client.emit("integrationUpdate", {
      ...Guilds.integrationFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.IntegrationDelete]: (shard, data) => {
    shard.client.emit("integrationDelete", {
      id: data.id,
      guildId: data.guild_id,
      applicationId: data.application_id,
    });
  },
  [GatewayEvents.InteractionCreate]: (shard, data) => {
    shard.client.emit(
      "interactionCreate",
      Interactions.interactionFromRaw(data)
    );
  },
  [GatewayEvents.InviteCreate]: (shard, data) => {
    shard.client.emit("inviteCreate", {
      channelId: data.channel_id,
      code: data.code,
      createdAt: data.created_at,
      guildId: data.guild_id,
      inviter:
        data.inviter !== undefined
          ? Users.userFromRaw(data.inviter)
          : undefined,
      maxAge: data.max_age,
      maxUses: data.max_uses,
      targetType: data.target_type,
      targetUser:
        data.target_user !== undefined
          ? Users.userFromRaw(data.target_user)
          : undefined,
      targetApplication:
        data.target_application !== undefined
          ? Applications.applicationFromRaw(data.target_application)
          : undefined,
      temporary: data.temporary,
      uses: data.uses,
      expiresAt: data.expires_at,
      roleIds: data.roles_ids,
    });
  },
  [GatewayEvents.InviteDelete]: (shard, data) => {
    shard.client.emit("inviteDelete", {
      channelId: data.channel_id,
      guildId: data.guild_id,
      code: data.code,
    });
  },
  [GatewayEvents.MessageCreate]: (shard, data) => {
    shard.client.emit("messageCreate", {
      ...Messages.messageFromRaw(data),

      guildId: data.guild_id,
      member:
        data.member !== undefined
          ? Guilds.guildMemberFromRaw(data.member)
          : undefined,
      mentions: data.mentions.map((mention: RawUser) =>
        Users.userFromRaw(mention)
      ),
      channelType: data.channel_type,
    });
  },
  [GatewayEvents.MessageUpdate]: (shard, data) => {
    shard.client.emit("messageUpdate", Messages.messageFromRaw(data));
  },
  [GatewayEvents.MessageDelete]: (shard, data) => {
    shard.client.emit("messageDelete", {
      id: data.id,
      channelId: data.channel_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.MessageDeleteBulk]: (shard, data) => {
    shard.client.emit("messageDeleteBulk", {
      ids: data.ids,
      channelId: data.channel_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.MessageReactionAdd]: (shard, data) => {
    shard.client.emit("messageReactionAdd", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      member:
        data.member !== undefined
          ? Guilds.guildMemberFromRaw(data.member)
          : undefined,
      emoji: Emojis.emojiFromRaw(data.emoji),
      messageAuthorId: data.message_author_id,
      burst: data.burst,
      burstColors: data.burst_colors,
      type: data.type,
    });
  },
  [GatewayEvents.MessageReactionRemove]: (shard, data) => {
    shard.client.emit("messageReactionRemove", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      emoji: Emojis.emojiFromRaw(data.emoji),
      burst: data.burst,
      type: data.type,
    });
  },
  [GatewayEvents.MessageReactionRemoveAll]: (shard, data) => {
    shard.client.emit("messageReactionRemoveAll", {
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.MessageReactionRemoveEmoji]: (shard, data) => {
    shard.client.emit("messageReactionRemoveEmoji", {
      channelId: data.channel_id,
      guildId: data.guild_id,
      messageId: data.message_id,
      emoji: Emojis.emojiFromRaw(data.emoji),
    });
  },
  [GatewayEvents.PresenceUpdate]: (shard, data) => {
    shard.client.emit("presenceUpdate", Presences.presenceFromRaw(data));
  },
  [GatewayEvents.StageInstanceCreate]: (shard, data) => {
    shard.client.emit(
      "stageInstanceCreate",
      StageInstances.stageInstanceFromRaw(data)
    );
  },
  [GatewayEvents.StageInstanceUpdate]: (shard, data) => {
    shard.client.emit(
      "stageInstanceUpdate",
      StageInstances.stageInstanceFromRaw(data)
    );
  },
  [GatewayEvents.StageInstanceDelete]: (shard, data) => {
    shard.client.emit(
      "stageInstanceDelete",
      StageInstances.stageInstanceFromRaw(data)
    );
  },
  [GatewayEvents.TypingStart]: (shard, data) => {
    shard.client.emit("typingStart", {
      channelId: data.channel_id,
      guildId: data.guild_id,
      userId: data.user_id,
      timestamp: data.timestamp,
      member:
        data.member !== undefined
          ? Guilds.guildMemberFromRaw(data.member)
          : undefined,
    });
  },
  [GatewayEvents.UserUpdate]: (shard, data) => {
    shard.client.emit("userUpdate", Users.userFromRaw(data));
  },
  [GatewayEvents.VoiceChannelEffectSend]: (shard, data) => {
    shard.client.emit("voiceChannelEffectSend", {
      channelId: data.channel_id,
      guildId: data.guild_id,
      userId: data.user_id,
      emoji:
        data.emoji !== undefined
          ? data.emoji !== null
            ? Emojis.emojiFromRaw(data.emoji)
            : null
          : undefined,
      animationType: data.animation_type,
      animationId: data.animation_id,
      soundId: data.sound_id,
      soundVolume: data.sound_volume,
    });
  },
  [GatewayEvents.VoiceChannelStatusUpdate]: (shard, data) =>
    shard.client.emit("voiceChannelStatusUpdate", {
      id: data.id,
      guildId: data.guild_id,
      status: data.status,
    }),
  [GatewayEvents.VoiceChannelStartTimeUpdate]: (shard, data) =>
    shard.client.emit("voiceChannelStartTimeUpdate", {
      id: data.id,
      guildId: data.guild_id,
      voiceStartTime: data.voice_start_time,
    }),
  [GatewayEvents.VoiceStateUpdate]: (shard, data) => {
    shard.client.emit("voiceStateUpdate", Voice.voiceStateFromRaw(data));
  },
  [GatewayEvents.VoiceServerUpdate]: (shard, data) => {
    {
      shard.client.emit("voiceServerUpdate", {
        token: data.token,
        guildId: data.guild_id,
        endpoint: data.endpoint,
      });
    }
  },
  [GatewayEvents.WebhooksUpdate]: (shard, data) => {
    shard.client.emit("webhooksUpdate", data.channel_id, data.guild_id);
  },
  [GatewayEvents.SubscriptionCreate]: (shard, data) => {
    shard.client.emit(
      "subscriptionCreate",
      Subscriptions.subscriptionFromRaw(data)
    );
  },
  [GatewayEvents.SubscriptionUpdate]: (shard, data) => {
    shard.client.emit(
      "subscriptionUpdate",
      Subscriptions.subscriptionFromRaw(data)
    );
  },
  [GatewayEvents.SubscriptionDelete]: (shard, data) => {
    shard.client.emit(
      "subscriptionDelete",
      Subscriptions.subscriptionFromRaw(data)
    );
  },
  [GatewayEvents.MessagePollVoteAdd]: (shard, data) => {
    shard.client.emit("messagePollVoteAdd", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      answerId: data.answer_id,
    });
  },
  [GatewayEvents.MessagePollVoteRemove]: (shard, data) => {
    shard.client.emit("messagePollVoteRemove", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      answerId: data.answer_id,
    });
  },
};

export interface DispatchEvents {
  [GatewayEvents.Ready]: RawReadyEvent;
  [GatewayEvents.Resumed]: [];
  [GatewayEvents.RateLimited]: RawRateLimitedEvent;
  [GatewayEvents.ApplicationCommandPermissionsUpdate]: RawGuildApplicationCommandPermissions;
  [GatewayEvents.AutoModerationRuleCreate]: RawAutoModerationRule;
  [GatewayEvents.AutoModerationRuleUpdate]: RawAutoModerationRule;
  [GatewayEvents.AutoModerationRuleDelete]: RawAutoModerationRule;
  [GatewayEvents.AutoModerationActionExecution]: RawAutoModerationActionExecutionEvent;
  [GatewayEvents.ChannelCreate]: RawChannel;
  [GatewayEvents.ChannelUpdate]: RawChannel;
  [GatewayEvents.ChannelDelete]: RawChannel;
  [GatewayEvents.ChannelInfo]: RawChannelInfoEvent;
  [GatewayEvents.ChannelPinsUpdate]: RawChannelPinsUpdateEvent;
  [GatewayEvents.ThreadCreate]: RawChannel;
  [GatewayEvents.ThreadUpdate]: RawChannel;
  [GatewayEvents.ThreadDelete]: RawChannel;
  [GatewayEvents.ThreadListSync]: RawThreadListSyncEvent;
  [GatewayEvents.ThreadMemberUpdate]: RawThreadMember &
    RawThreadMemberUpdateEventExtra;
  [GatewayEvents.ThreadMembersUpdate]: RawThreadMembersUpdateEvent;
  [GatewayEvents.EntitlementCreate]: RawEntitlement;
  [GatewayEvents.EntitlementUpdate]: RawEntitlement;
  [GatewayEvents.EntitlementDelete]: RawEntitlement;
  [GatewayEvents.GuildCreate]:
    | (RawGuild & RawGuildCreateEventExtra)
    | RawUnavailableGuild;
  [GatewayEvents.GuildUpdate]: RawGuild;
  [GatewayEvents.GuildDelete]: RawUnavailableGuild;
  [GatewayEvents.GuildAuditLogEntryCreate]: RawAuditLogEntry &
    RawGuildAuditLogEntryCreateExtra;
  [GatewayEvents.GuildBanAdd]: RawGuildBanAddEvent;
  [GatewayEvents.GuildBanRemove]: RawGuildBanRemoveEvent;
  [GatewayEvents.GuildEmojisUpdate]: RawGuildEmojisUpdateEvent;
  [GatewayEvents.GuildStickersUpdate]: RawGuildStickersUpdateEvent;
  [GatewayEvents.GuildIntegrationsUpdate]: RawGuildIntegrationsUpdateEvent;
  [GatewayEvents.GuildMemberAdd]: RawGuildMember & RawGuildMemberAddEventExtra;
  [GatewayEvents.GuildMemberRemove]: RawGuildMemberRemoveEvent;
  [GatewayEvents.GuildMemberUpdate]: RawGuildMemberUpdateEvent;
  [GatewayEvents.GuildMembersChunk]: RawGuildMembersChunkEvent;
  [GatewayEvents.GuildRoleCreate]: RawGuildRoleCreateEvent;
  [GatewayEvents.GuildRoleUpdate]: RawGuildRoleUpdateEvent;
  [GatewayEvents.GuildRoleDelete]: RawGuildRoleDeleteEvent;
  [GatewayEvents.GuildScheduledEventCreate]: RawGuildScheduledEvent;
  [GatewayEvents.GuildScheduledEventUpdate]: RawGuildScheduledEvent;
  [GatewayEvents.GuildScheduledEventDelete]: RawGuildScheduledEvent;
  [GatewayEvents.GuildScheduledEventUserAdd]: RawGuildScheduledEventUserAddEvent;
  [GatewayEvents.GuildScheduledEventUserRemove]: RawGuildScheduledEventUserRemoveEvent;
  [GatewayEvents.GuildSoundboardSoundCreate]: RawSoundboardSound;
  [GatewayEvents.GuildSoundboardSoundUpdate]: RawSoundboardSound;
  [GatewayEvents.GuildSoundboardSoundDelete]: RawGuildSoundboardSoundDeleteEvent;
  [GatewayEvents.GuildSoundboardSoundsUpdate]: RawGuildSoundboardSoundsUpdateEvent;
  [GatewayEvents.SoundboardSounds]: RawGuildSoundboardSoundsEvent;
  [GatewayEvents.IntegrationCreate]: RawIntegration &
    RawIntegrationCreateEventExtra;
  [GatewayEvents.IntegrationUpdate]: RawIntegration &
    RawIntegrationUpdateEventExtra;
  [GatewayEvents.IntegrationDelete]: RawIntegrationDeleteEvent;
  [GatewayEvents.InteractionCreate]: RawInteraction;
  [GatewayEvents.InviteCreate]: RawInviteCreateEvent;
  [GatewayEvents.InviteDelete]: RawInviteDeleteEvent;
  [GatewayEvents.MessageCreate]: RawMessage & RawMessageCreateEventExtra;
  [GatewayEvents.MessageUpdate]: RawMessage;
  [GatewayEvents.MessageDelete]: RawMessageDeleteEvent;
  [GatewayEvents.MessageDeleteBulk]: RawMessageDeleteBulkEvent;
  [GatewayEvents.MessageReactionAdd]: RawMessageReactionAddEvent;
  [GatewayEvents.MessageReactionRemove]: RawMessageReactionRemoveEvent;
  [GatewayEvents.MessageReactionRemoveAll]: RawMessageReactionRemoveAllEvent;
  [GatewayEvents.MessageReactionRemoveEmoji]: RawMessageReactionRemoveEmojiEvent;
  [GatewayEvents.PresenceUpdate]: RawPresenceUpdateEvent;
  [GatewayEvents.StageInstanceCreate]: RawStageInstance;
  [GatewayEvents.StageInstanceUpdate]: RawStageInstance;
  [GatewayEvents.StageInstanceDelete]: RawStageInstance;
  [GatewayEvents.SubscriptionCreate]: RawSubscription;
  [GatewayEvents.SubscriptionUpdate]: RawSubscription;
  [GatewayEvents.SubscriptionDelete]: RawSubscription;
  [GatewayEvents.TypingStart]: RawTypingStartEvent;
  [GatewayEvents.UserUpdate]: RawUser;
  [GatewayEvents.VoiceChannelEffectSend]: RawVoiceChannelEffectSendEvent;
  [GatewayEvents.VoiceChannelStatusUpdate]: RawVoiceChannelStatusUpdateEvent;
  [GatewayEvents.VoiceChannelStartTimeUpdate]: RawVoiceChannelStartTimeUpdateEvent;
  [GatewayEvents.VoiceStateUpdate]: RawVoiceState;
  [GatewayEvents.VoiceServerUpdate]: RawVoiceServerUpdateEvent;
  [GatewayEvents.WebhooksUpdate]: RawWebhooksUpdateEvent;
  [GatewayEvents.MessagePollVoteAdd]: RawMessagePollVoteAddEvent;
  [GatewayEvents.MessagePollVoteRemove]: RawMessagePollVoteRemoveEvent;
}
