import type { Client } from "../Client";
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
import { RawEmoji } from "../types/emoji";
import type { RawEntitlement } from "../types/entitlements";
import type {
  RawRateLimitedFields,
  RawAutoModerationActionExecutionEventFields,
  RawChannelPinsUpdateEventFields,
  RawThreadListSyncEventFields,
  RawThreadMemberUpdateEventExtraFields,
  RawThreadMembersUpdateEventFields,
  RawGuildCreateEventExtraFields,
  RawGuildAuditLogEntryCreateExtraFields,
  RawGuildBanAddEventFields,
  RawGuildBanRemoveEventFields,
  RawGuildEmojisUpdateEventFields,
  RawGuildStickersUpdateEventFields,
  RawGuildIntegrationsUpdateEventFields,
  RawGuildMemberAddEventExtraFields,
  RawGuildMemberRemoveEventFields,
  RawGuildMemberUpdateEventFields,
  RawGuildMembersChunkEventFields,
  RawGuildRoleCreateEventFields,
  RawGuildRoleUpdateEventFields,
  RawGuildRoleDeleteEventFields,
  RawGuildScheduledEventUserAddEventFields,
  RawGuildScheduledEventUserRemoveEventFields,
  RawGuildSoundboardSoundDeleteEventFields,
  RawGuildSoundboardSoundsUpdateEventFields,
  RawGuildSoundboardSoundsEventFields,
  RawIntegrationCreateEventExtraFields,
  RawIntegrationUpdateEventExtraFields,
  RawIntegrationDeleteEventFields,
  RawInviteCreateEventFields,
  RawInviteDeleteEventFields,
  RawMessageCreateEventExtraFields,
  RawMessageDeleteEventFields,
  RawMessageDeleteBulkEventFields,
  RawMessageReactionAddEventFields,
  RawMessageReactionRemoveEventFields,
  RawMessageReactionRemoveAllEventFields,
  RawMessageReactionRemoveEmojiEventFields,
  RawPresenceUpdateEventFields,
  RawTypingStartEventFields,
  RawVoiceChannelEffectSendEventFields,
  RawVoiceServerUpdateEventFields,
  RawWebhooksUpdateEventFields,
  RawMessagePollVoteAddFields,
  RawMessagePollVoteRemoveFields,
  RawReadyEventFields,
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
import { RawSticker } from "../types/sticker";
import type { RawSubscription } from "../types/subscription";
import type { RawUser } from "../types/user";
import type { RawVoiceState } from "../types/voice";
import { Shard } from "./Shard";

export type DispatchHandler<T extends GatewayEvents> = (
  client: Client,
  data: DispatchEvents[T],
  shardId: number
) => void;

export class Dispatcher {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  dispatch<T extends GatewayEvents>(
    event: T,
    data: DispatchEvents[T],
    shardId: number
  ) {
    const handler = Handlers[event] as DispatchHandler<T> | undefined;

    if (handler) handler(this.client, data, shardId);
  }
}

export const Handlers: { [K in GatewayEvents]?: DispatchHandler<K> } = {
  [GatewayEvents.Ready]: (client, data, shardId) => {
    const shard = new Shard(shardId, client);
    shard.sessionId = data.session_id;
    shard.resumeGatewayURL = `${data.resume_gateway_url}?v=10&encoding=json`;

    client.shards.set(shardId, shard);
    client.user = Users.userFromRaw(data.user);
    client.application = data.application;
    client.emit("ready");
  },
  [GatewayEvents.Resumed]: (client) => {
    client.emit("resumed");
  },
  [GatewayEvents.RateLimited]: (client, data) => {
    if (data.opcode === GatewayOPCodes.RequestGuildMembers) {
      client.emit("rateLimited", {
        opcode: GatewayOPCodes.RequestGuildMembers,
        retryAfter: data.retry_after,
        meta: {
          guildId: data.meta.guild_id,
          nonce: data.meta.nonce,
        },
      });
    }
  },
  [GatewayEvents.ApplicationCommandPermissionsUpdate]: (client, data) => {
    client.emit(
      "applicationCommandPermissionsUpdate",
      Guilds.guildApplicationCommandPermissionsFromRaw(data)
    );
  },
  [GatewayEvents.AutoModerationRuleCreate]: (client, data) =>
    client.emit(
      "autoModerationRuleCreate",
      AutoModeration.autoModerationRuleFromRaw(data)
    ),
  [GatewayEvents.AutoModerationRuleUpdate]: (client, data) =>
    client.emit(
      "autoModerationRuleUpdate",
      AutoModeration.autoModerationRuleFromRaw(data)
    ),
  [GatewayEvents.AutoModerationRuleDelete]: (client, data) =>
    client.emit(
      "autoModerationRuleDelete",
      AutoModeration.autoModerationRuleFromRaw(data)
    ),
  [GatewayEvents.AutoModerationActionExecution]: (client, data) =>
    client.emit("autoModerationActionExecution", {
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
  [GatewayEvents.ChannelCreate]: (client, data) =>
    client.emit("channelCreate", Channels.channelFromRaw(data)),
  [GatewayEvents.ChannelUpdate]: (client, data) =>
    client.emit("channelUpdate", Channels.channelFromRaw(data)),
  [GatewayEvents.ChannelDelete]: (client, data) =>
    client.emit("channelDelete", Channels.channelFromRaw(data)),
  [GatewayEvents.ChannelPinsUpdate]: (client, data) =>
    client.emit("channelPinsUpdate", {
      guildId: data.guild_id,
      channelId: data.channel_id,
      lastPinTimestamp: data.last_pin_timestamp,
    }),
  [GatewayEvents.ThreadCreate]: (client, data) =>
    client.emit("threadCreate", Channels.channelFromRaw(data)),
  [GatewayEvents.ThreadUpdate]: (client, data) =>
    client.emit("threadUpdate", Channels.channelFromRaw(data)),
  [GatewayEvents.ThreadDelete]: (client, data) =>
    client.emit("threadDelete", Channels.channelFromRaw(data)),
  [GatewayEvents.ThreadListSync]: (client, data) =>
    client.emit("threadListSync", {
      guildId: data.guild_id,
      channelIds: data.channel_ids,
      threads: data.threads.map((thread) => Channels.channelFromRaw(thread)),
      members: data.members.map((threadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
    }),
  [GatewayEvents.ThreadMemberUpdate]: (client, data) => {
    client.emit("threadMemberUpdate", {
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
  [GatewayEvents.ThreadMembersUpdate]: (client, data) => {
    client.emit("threadMembersUpdate", {
      id: data.id,
      guildId: data.guild_id,
      memberCount: data.member_count,
      addedMembers: data.added_members?.map((threadMember: RawThreadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
      removedMemberIds: data.removed_member_ids,
    });
  },
  [GatewayEvents.EntitlementCreate]: (client, data) => {
    client.emit("entitlementCreate", Entitlements.entitlementFromRaw(data));
  },
  [GatewayEvents.EntitlementUpdate]: (client, data) => {
    client.emit("entitlementUpdate", Entitlements.entitlementFromRaw(data));
  },
  [GatewayEvents.EntitlementDelete]: (client, data) => {
    client.emit("entitlementDelete", Entitlements.entitlementFromRaw(data));
  },
  [GatewayEvents.GuildCreate]: (client, data, shardId) => {
    client.guildShardMap.set(data.id, shardId);

    if (data.unavailable) {
      const unavailableGuild = data as RawUnavailableGuild;

      client.emit("guildCreate", unavailableGuild);
    } else {
      const guild = data as RawGuild & RawGuildCreateEventExtraFields;

      client.emit("guildCreate", {
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

      client.guilds.set(data.id, Guilds.guildFromRaw(<RawGuild>data));
    }
  },
  [GatewayEvents.GuildUpdate]: (client, data) => {
    client.guilds.set(data.id, Guilds.guildFromRaw(data));
    client.emit("guildUpdate", Guilds.guildFromRaw(data));
  },
  [GatewayEvents.GuildDelete]: (client, data) => {
    client.guildShardMap.delete(data.id);
    client.guilds.delete(data.id);
    client.emit("guildDelete", data);
  },
  [GatewayEvents.GuildAuditLogEntryCreate]: (client, data) => {
    client.emit("guildAuditLogEntryCreate", {
      ...AuditLogs.auditLogEntryFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.GuildBanAdd]: (client, data) => {
    client.emit("guildBanAdd", {
      guildId: data.guild_id,
      user: Users.userFromRaw(data.user),
    });
  },
  [GatewayEvents.GuildBanRemove]: (client, data) => {
    client.emit("guildBanRemove", {
      guildId: data.guild_id,
      user: Users.userFromRaw(data.user),
    });
  },
  [GatewayEvents.GuildEmojisUpdate]: (client, data) => {
    client.emit(
      "guildEmojisUpdate",
      data.emojis.map((emoji: RawEmoji) => Emojis.emojiFromRaw(emoji)),
      data.guild_id
    );
  },
  [GatewayEvents.GuildStickersUpdate]: (client, data) => {
    client.emit(
      "guildStickersUpdate",
      data.stickers.map((sticker: RawSticker) =>
        Stickers.stickerFromRaw(sticker)
      ),
      data.guild_id
    );
  },
  [GatewayEvents.GuildIntegrationsUpdate]: (client, data) => {
    client.emit("guildIntegrationsUpdate", data.guild_id);
  },
  [GatewayEvents.GuildMemberAdd]: (client, data) => {
    client.emit("guildMemberAdd", {
      ...Guilds.guildMemberFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.GuildMemberRemove]: (client, data) => {
    client.emit("guildMemberRemove", {
      guildId: data.guild_id,
      user: Users.userFromRaw(data.user),
    });
  },
  [GatewayEvents.GuildMemberUpdate]: (client, data) => {
    client.emit("guildMemberUpdate", {
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
    });
  },
  [GatewayEvents.GuildMembersChunk]: (client, data) => {
    client.emit("guildMembersChunk", {
      guildId: data.guild_id,
      members: data.members.map((guildMember: RawGuildMember) =>
        Guilds.guildMemberFromRaw(guildMember)
      ),
      chunkIndex: data.chunk_index,
      chunkCount: data.chunk_count,
      notFound: data.not_found,
      presences: data.presences?.map((presence: RawPresenceUpdateEventFields) =>
        Presences.presenceFromRaw(presence)
      ),
      nonce: data.nonce,
    });
  },
  [GatewayEvents.GuildRoleCreate]: (client, data) => {
    client.emit("guildRoleCreate", Roles.roleFromRaw(data.role), data.guild_id);
  },
  [GatewayEvents.GuildRoleUpdate]: (client, data) => {
    client.emit("guildRoleUpdate", Roles.roleFromRaw(data.role), data.guild_id);
  },
  [GatewayEvents.GuildRoleDelete]: (client, data) => {
    client.emit("guildRoleDelete", data.role_id, data.guild_id);
  },
  [GatewayEvents.GuildScheduledEventCreate]: (client, data) => {
    client.emit(
      "guildScheduledEventCreate",
      GuildScheduledEvents.guildScheduledEventFromRaw(data)
    );
  },
  [GatewayEvents.GuildScheduledEventUpdate]: (client, data) => {
    client.emit(
      "guildScheduledEventUpdate",
      GuildScheduledEvents.guildScheduledEventFromRaw(data)
    );
  },
  [GatewayEvents.GuildScheduledEventDelete]: (client, data) => {
    client.emit(
      "guildScheduledEventDelete",
      GuildScheduledEvents.guildScheduledEventFromRaw(data)
    );
  },
  [GatewayEvents.GuildScheduledEventUserAdd]: (client, data) => {
    client.emit(
      "guildScheduledEventUserAdd",
      data.user_id,
      data.guild_scheduled_event_id,
      data.guild_id
    );
  },
  [GatewayEvents.GuildScheduledEventUserRemove]: (client, data) => {
    client.emit(
      "guildScheduledEventUserRemove",
      data.user_id,
      data.guild_scheduled_event_id,
      data.guild_id
    );
  },
  [GatewayEvents.GuildSoundboardSoundCreate]: (client, data) => {
    client.emit(
      "guildSoundboardSoundCreate",
      Soundboards.soundboardSoundFromRaw(data)
    );
  },
  [GatewayEvents.GuildSoundboardSoundUpdate]: (client, data) => {
    client.emit(
      "guildSoundboardSoundUpdate",
      Soundboards.soundboardSoundFromRaw(data)
    );
  },
  [GatewayEvents.GuildSoundboardSoundDelete]: (client, data) => {
    client.emit("guildSoundboardSoundDelete", {
      soundId: data.sound_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.GuildSoundboardSoundsUpdate]: (client, data) => {
    client.emit(
      "guildSoundboardSoundsUpdate",
      data.soundboard_sounds.map((sound: RawSoundboardSound) =>
        Soundboards.soundboardSoundFromRaw(sound)
      ),
      data.guild_id
    );
  },
  [GatewayEvents.SoundboardSounds]: (client, data) => {
    client.emit(
      "soundboardSounds",
      data.soundboard_sounds.map((sound: RawSoundboardSound) =>
        Soundboards.soundboardSoundFromRaw(sound)
      ),
      data.guild_id
    );
  },
  [GatewayEvents.IntegrationCreate]: (client, data) => {
    client.emit("integrationCreate", {
      ...Guilds.integrationFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.IntegrationUpdate]: (client, data) => {
    client.emit("integrationUpdate", {
      ...Guilds.integrationFromRaw(data),

      guildId: data.guild_id,
    });
  },
  [GatewayEvents.IntegrationDelete]: (client, data) => {
    client.emit("integrationDelete", {
      id: data.id,
      guildId: data.guild_id,
      applicationId: data.application_id,
    });
  },
  [GatewayEvents.InteractionCreate]: (client, data) => {
    client.emit("interactionCreate", Interactions.interactionFromRaw(data));
  },
  [GatewayEvents.InviteCreate]: (client, data) => {
    client.emit("inviteCreate", {
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
    });
  },
  [GatewayEvents.InviteDelete]: (client, data) => {
    client.emit("inviteDelete", {
      channelId: data.channel_id,
      guildId: data.guild_id,
      code: data.code,
    });
  },
  [GatewayEvents.MessageCreate]: (client, data) => {
    client.emit("messageCreate", {
      ...Messages.messageFromRaw(data),

      guildId: data.guild_id,
      member:
        data.member !== undefined
          ? Guilds.guildMemberFromRaw(data.member)
          : undefined,
      mentions: data.mentions.map((mention: RawUser) =>
        Users.userFromRaw(mention)
      ),
    });
  },
  [GatewayEvents.MessageUpdate]: (client, data) => {
    client.emit("messageUpdate", Messages.messageFromRaw(data));
  },
  [GatewayEvents.MessageDelete]: (client, data) => {
    client.emit("messageDelete", {
      id: data.id,
      channelId: data.channel_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.MessageDeleteBulk]: (client, data) => {
    client.emit("messageDeleteBulk", {
      ids: data.ids,
      channelId: data.channel_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.MessageReactionAdd]: (client, data) => {
    client.emit("messageReactionAdd", {
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
  [GatewayEvents.MessageReactionRemove]: (client, data) => {
    client.emit("messageReactionRemove", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      emoji: Emojis.emojiFromRaw(data.emoji),
      burst: data.burst,
      type: data.type,
    });
  },
  [GatewayEvents.MessageReactionRemoveAll]: (client, data) => {
    client.emit("messageReactionRemoveAll", {
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
    });
  },
  [GatewayEvents.MessageReactionRemoveEmoji]: (client, data) => {
    client.emit("messageReactionRemoveEmoji", {
      channelId: data.channel_id,
      guildId: data.guild_id,
      messageId: data.message_id,
      emoji: Emojis.emojiFromRaw(data.emoji),
    });
  },
  [GatewayEvents.PresenceUpdate]: (client, data) => {
    client.emit("presenceUpdate", Presences.presenceFromRaw(data));
  },
  [GatewayEvents.StageInstanceCreate]: (client, data) => {
    client.emit(
      "stageInstanceCreate",
      StageInstances.stageInstanceFromRaw(data)
    );
  },
  [GatewayEvents.StageInstanceUpdate]: (client, data) => {
    client.emit(
      "stageInstanceUpdate",
      StageInstances.stageInstanceFromRaw(data)
    );
  },
  [GatewayEvents.StageInstanceDelete]: (client, data) => {
    client.emit(
      "stageInstanceDelete",
      StageInstances.stageInstanceFromRaw(data)
    );
  },
  [GatewayEvents.TypingStart]: (client, data) => {
    client.emit("typingStart", {
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
  [GatewayEvents.UserUpdate]: (client, data) => {
    client.emit("userUpdate", Users.userFromRaw(data));
  },
  [GatewayEvents.VoiceChannelEffectSend]: (client, data) => {
    client.emit("voiceChannelEffectSend", {
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
  [GatewayEvents.VoiceStateUpdate]: (client, data) => {
    client.emit("voiceStateUpdate", Voice.voiceStateFromRaw(data));
  },
  [GatewayEvents.VoiceServerUpdate]: (client, data) => {
    {
      client.emit("voiceServerUpdate", {
        token: data.token,
        guildId: data.guild_id,
        endpoint: data.endpoint,
      });
    }
  },
  [GatewayEvents.WebhooksUpdate]: (client, data) => {
    client.emit("webhooksUpdate", data.channel_id, data.guild_id);
  },
  [GatewayEvents.SubscriptionCreate]: (client, data) => {
    client.emit("subscriptionCreate", Subscriptions.subscriptionFromRaw(data));
  },
  [GatewayEvents.SubscriptionUpdate]: (client, data) => {
    client.emit("subscriptionUpdate", Subscriptions.subscriptionFromRaw(data));
  },
  [GatewayEvents.SubscriptionDelete]: (client, data) => {
    client.emit("subscriptionDelete", Subscriptions.subscriptionFromRaw(data));
  },
  [GatewayEvents.MessagePollVoteAdd]: (client, data) => {
    client.emit("messagePollVoteAdd", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      answerId: data.answer_id,
    });
  },
  [GatewayEvents.MessagePollVoteRemove]: (client, data) => {
    client.emit("messagePollVoteRemove", {
      userId: data.user_id,
      channelId: data.channel_id,
      messageId: data.message_id,
      guildId: data.guild_id,
      answerId: data.answer_id,
    });
  },
};

export interface DispatchEvents {
  [GatewayEvents.Ready]: RawReadyEventFields;
  [GatewayEvents.Resumed]: [];
  [GatewayEvents.RateLimited]: RawRateLimitedFields;
  [GatewayEvents.ApplicationCommandPermissionsUpdate]: RawGuildApplicationCommandPermissions;
  [GatewayEvents.AutoModerationRuleCreate]: RawAutoModerationRule;
  [GatewayEvents.AutoModerationRuleUpdate]: RawAutoModerationRule;
  [GatewayEvents.AutoModerationRuleDelete]: RawAutoModerationRule;
  [GatewayEvents.AutoModerationActionExecution]: RawAutoModerationActionExecutionEventFields;
  [GatewayEvents.ChannelCreate]: RawChannel;
  [GatewayEvents.ChannelUpdate]: RawChannel;
  [GatewayEvents.ChannelDelete]: RawChannel;
  [GatewayEvents.ChannelPinsUpdate]: RawChannelPinsUpdateEventFields;
  [GatewayEvents.ThreadCreate]: RawChannel;
  [GatewayEvents.ThreadUpdate]: RawChannel;
  [GatewayEvents.ThreadDelete]: RawChannel;
  [GatewayEvents.ThreadListSync]: RawThreadListSyncEventFields;
  [GatewayEvents.ThreadMemberUpdate]: RawThreadMember &
    RawThreadMemberUpdateEventExtraFields;
  [GatewayEvents.ThreadMembersUpdate]: RawThreadMembersUpdateEventFields;
  [GatewayEvents.EntitlementCreate]: RawEntitlement;
  [GatewayEvents.EntitlementUpdate]: RawEntitlement;
  [GatewayEvents.EntitlementDelete]: RawEntitlement;
  [GatewayEvents.GuildCreate]:
    | (RawGuild & RawGuildCreateEventExtraFields)
    | RawUnavailableGuild;
  [GatewayEvents.GuildUpdate]: RawGuild;
  [GatewayEvents.GuildDelete]: RawUnavailableGuild;
  [GatewayEvents.GuildAuditLogEntryCreate]: RawAuditLogEntry &
    RawGuildAuditLogEntryCreateExtraFields;
  [GatewayEvents.GuildBanAdd]: RawGuildBanAddEventFields;
  [GatewayEvents.GuildBanRemove]: RawGuildBanRemoveEventFields;
  [GatewayEvents.GuildEmojisUpdate]: RawGuildEmojisUpdateEventFields;
  [GatewayEvents.GuildStickersUpdate]: RawGuildStickersUpdateEventFields;
  [GatewayEvents.GuildIntegrationsUpdate]: RawGuildIntegrationsUpdateEventFields;
  [GatewayEvents.GuildMemberAdd]: RawGuildMember &
    RawGuildMemberAddEventExtraFields;
  [GatewayEvents.GuildMemberRemove]: RawGuildMemberRemoveEventFields;
  [GatewayEvents.GuildMemberUpdate]: RawGuildMemberUpdateEventFields;
  [GatewayEvents.GuildMembersChunk]: RawGuildMembersChunkEventFields;
  [GatewayEvents.GuildRoleCreate]: RawGuildRoleCreateEventFields;
  [GatewayEvents.GuildRoleUpdate]: RawGuildRoleUpdateEventFields;
  [GatewayEvents.GuildRoleDelete]: RawGuildRoleDeleteEventFields;
  [GatewayEvents.GuildScheduledEventCreate]: RawGuildScheduledEvent;
  [GatewayEvents.GuildScheduledEventUpdate]: RawGuildScheduledEvent;
  [GatewayEvents.GuildScheduledEventDelete]: RawGuildScheduledEvent;
  [GatewayEvents.GuildScheduledEventUserAdd]: RawGuildScheduledEventUserAddEventFields;
  [GatewayEvents.GuildScheduledEventUserRemove]: RawGuildScheduledEventUserRemoveEventFields;
  [GatewayEvents.GuildSoundboardSoundCreate]: RawSoundboardSound;
  [GatewayEvents.GuildSoundboardSoundUpdate]: RawSoundboardSound;
  [GatewayEvents.GuildSoundboardSoundDelete]: RawGuildSoundboardSoundDeleteEventFields;
  [GatewayEvents.GuildSoundboardSoundsUpdate]: RawGuildSoundboardSoundsUpdateEventFields;
  [GatewayEvents.SoundboardSounds]: RawGuildSoundboardSoundsEventFields;
  [GatewayEvents.IntegrationCreate]: RawIntegration &
    RawIntegrationCreateEventExtraFields;
  [GatewayEvents.IntegrationUpdate]: RawIntegration &
    RawIntegrationUpdateEventExtraFields;
  [GatewayEvents.IntegrationDelete]: RawIntegrationDeleteEventFields;
  [GatewayEvents.InteractionCreate]: RawInteraction;
  [GatewayEvents.InviteCreate]: RawInviteCreateEventFields;
  [GatewayEvents.InviteDelete]: RawInviteDeleteEventFields;
  [GatewayEvents.MessageCreate]: RawMessage & RawMessageCreateEventExtraFields;
  [GatewayEvents.MessageUpdate]: RawMessage;
  [GatewayEvents.MessageDelete]: RawMessageDeleteEventFields;
  [GatewayEvents.MessageDeleteBulk]: RawMessageDeleteBulkEventFields;
  [GatewayEvents.MessageReactionAdd]: RawMessageReactionAddEventFields;
  [GatewayEvents.MessageReactionRemove]: RawMessageReactionRemoveEventFields;
  [GatewayEvents.MessageReactionRemoveAll]: RawMessageReactionRemoveAllEventFields;
  [GatewayEvents.MessageReactionRemoveEmoji]: RawMessageReactionRemoveEmojiEventFields;
  [GatewayEvents.PresenceUpdate]: RawPresenceUpdateEventFields;
  [GatewayEvents.StageInstanceCreate]: RawStageInstance;
  [GatewayEvents.StageInstanceUpdate]: RawStageInstance;
  [GatewayEvents.StageInstanceDelete]: RawStageInstance;
  [GatewayEvents.SubscriptionCreate]: RawSubscription;
  [GatewayEvents.SubscriptionUpdate]: RawSubscription;
  [GatewayEvents.SubscriptionDelete]: RawSubscription;
  [GatewayEvents.TypingStart]: RawTypingStartEventFields;
  [GatewayEvents.UserUpdate]: RawUser;
  [GatewayEvents.VoiceChannelEffectSend]: RawVoiceChannelEffectSendEventFields;
  [GatewayEvents.VoiceStateUpdate]: RawVoiceState;
  [GatewayEvents.VoiceServerUpdate]: RawVoiceServerUpdateEventFields;
  [GatewayEvents.WebhooksUpdate]: RawWebhooksUpdateEventFields;
  [GatewayEvents.MessagePollVoteAdd]: RawMessagePollVoteAddFields;
  [GatewayEvents.MessagePollVoteRemove]: RawMessagePollVoteRemoveFields;
}
