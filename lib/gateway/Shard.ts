import WebSocket, { type RawData } from "ws";
import { GatewayEvents, GatewayOPCodes, StatusTypes } from "../constants";
import { GatewayError } from "../utils";
import { Client } from "../Client";
import * as pkg from "../../package.json";
import type { RawChannel, RawThreadMember } from "../types/channel";
import type { RawEmoji } from "../types/emoji";
import type {
  GatewayPresenceUpdate,
  Identify,
  RawPayload,
  RawPresenceUpdateEventFields,
  RequestGuildMembers,
  Resume,
} from "../types/gateway-events";
import type { RawGuildMember } from "../types/guild";
import type { RawSticker } from "../types/sticker";
import type { RawUser } from "../types/user";

export class Shard {
  id: number;
  private heartbeatInterval!: NodeJS.Timeout | null;
  client: Client;
  ws: WebSocket;
  sessionId!: string;

  constructor(id: number, client: Client) {
    this.id = id;
    this.client = client;
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  connect(): void {
    this.ws.on("open", () => this.onWebSocketOpen());
    this.ws.on("message", (data) => this.onWebSocketMessage(data));
    this.ws.on("error", (err) => this.onWebSocketError(err));
    this.ws.on("close", (code, reason) => this.onWebSocketClose(code, reason));
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  disconnect(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);

      this.heartbeatInterval = null;
    }
  }

  /** https://discord.com/developers/docs/topics/gateway-events#heartbeat */
  heartbeat(lastSequence: number | null): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.Heartbeat,
        d: lastSequence,
      })
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#identify */
  identify(options: Identify): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.Identify,
        d: {
          token: options.token,
          properties: {
            os: options.properties.os,
            browser: options.properties.browser,
            device: options.properties.device,
          },
          compress: options.compress,
          large_threshold: options.largeThreshold,
          shard: options.shard,
          presence: options.presence,
          intents: options.intents,
        },
      })
    );
  }

  private onDispatch(packet: RawPayload): void {
    switch (packet.t) {
      case "READY":
        {
          this.sessionId = packet.d.session_id;
          this.client.user = this.client.util.userFromRaw(packet.d.user);
          this.client.application = packet.d.application;

          this.client.emit(GatewayEvents.Ready);
        }
        break;
      case "RESUMED":
        this.client.emit(GatewayEvents.Resumed);
        break;
      case "APPLICATION_COMMAND_PERMISSIONS_UPDATE":
        this.client.emit(
          GatewayEvents.ApplicationCommandPermissionsUpdate,
          this.client.util.guildApplicationCommandPermissionsFromRaw(packet.d)
        );
        break;
      case "AUTO_MODERATION_RULE_CREATE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleCreate,
          this.client.util.autoModerationRuleFromRaw(packet.d)
        );
        break;
      case "AUTO_MODERATION_RULE_UPDATE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleUpdate,
          this.client.util.autoModerationRuleFromRaw(packet.d)
        );
        break;
      case "AUTO_MODERATION_RULE_DELETE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleDelete,
          this.client.util.autoModerationRuleFromRaw(packet.d)
        );
        break;
      case "AUTO_MODERATION_ACTION_EXECUTION":
        this.client.emit(GatewayEvents.AutoModerationActionExecution, {
          guildId: packet.d.guild_id,
          action: {
            type: packet.d.action.type,
            metadata: {
              channelId: packet.d.action.metadata.channel_id,
              durationSeconds: packet.d.action.metadata.duration_seconds,
              customMessage: packet.d.action.metadata.custom_message,
            },
          },
          ruleId: packet.d.rule_id,
          ruleTriggerType: packet.d.rule_trigger_type,
          userId: packet.d.user_id,
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          alertSystemMessageId: packet.d.alert_system_message_id,
          content: packet.d.content,
          matchedKeyword: packet.d.matched_keyword,
          matchedContent: packet.d.matched_content,
        });
        break;
      case "CHANNEL_CREATE":
        this.client.emit(
          GatewayEvents.ChannelCreate,
          this.client.util.channelFromRaw(packet.d)
        );
        break;
      case "CHANNEL_UPDATE":
        this.client.emit(
          GatewayEvents.ChannelUpdate,
          this.client.util.channelFromRaw(packet.d)
        );
        break;
      case "CHANNEL_DELETE":
        this.client.emit(
          GatewayEvents.ChannelDelete,
          this.client.util.channelFromRaw(packet.d)
        );
        break;
      case "CHANNEL_PINS_UPDATE":
        this.client.emit(GatewayEvents.ChannelPinsUpdate, {
          guildId: packet.d.guild_id,
          channelId: packet.d.channel_id,
          lastPinTimestamp: packet.d.last_pin_timestamp,
        });
        break;
      case "THREAD_CREATE":
        this.client.emit(
          GatewayEvents.ThreadCreate,
          this.client.util.channelFromRaw(packet.d)
        );
        break;
      case "THREAD_UPDATE":
        this.client.emit(
          GatewayEvents.ThreadUpdate,
          this.client.util.channelFromRaw(packet.d)
        );
        break;
      case "THREAD_DELETE":
        this.client.emit(
          GatewayEvents.ThreadDelete,
          this.client.util.channelFromRaw(packet.d)
        );
        break;
      case "THREAD_LIST_SYNC":
        this.client.emit(GatewayEvents.ThreadListSync, {
          guildId: packet.d.guild_id,
          channelIds: packet.d.channel_ids,
          threads: packet.d.threads.map((thread: RawChannel) =>
            this.client.util.channelFromRaw(thread)
          ),
          members: packet.d.members.map((threadMember: RawThreadMember) =>
            this.client.util.threadMemberFromRaw(threadMember)
          ),
        });
        break;
      case "THREAD_MEMBER_UPDATE":
        this.client.emit(GatewayEvents.ThreadMemberUpdate, {
          id: packet.d.id,
          userId: packet.d.user_id,
          joinTimestamp: packet.d.join_timestamp,
          flags: packet.d.flags,
          member:
            packet.d.member !== undefined
              ? this.client.util.guildMemberFromRaw(packet.d.member)
              : undefined,

          guildId: packet.d.guild_id,
        });
        break;
      case "THREAD_MEMBERS_UPDATE":
        this.client.emit(GatewayEvents.ThreadMembersUpdate, {
          id: packet.d.id,
          guildId: packet.d.guild_id,
          memberCount: packet.d.member_count,
          addedMembers: packet.d.members.map((threadMember: RawThreadMember) =>
            this.client.util.threadMemberFromRaw(threadMember)
          ),
          removedMemberIds: packet.d.removed_member_ids,
        });
        break;
      case "ENTITLEMENT_CREATE":
        this.client.emit(
          GatewayEvents.EntitlementCreate,
          this.client.util.entitlementFromRaw(packet.d)
        );
        break;
      case "ENTITLEMENT_UPDATE":
        this.client.emit(
          GatewayEvents.EntitlementUpdate,
          this.client.util.entitlementFromRaw(packet.d)
        );
        break;
      case "ENTITLEMENT_DELETE":
        this.client.emit(
          GatewayEvents.EntitlementDelete,
          this.client.util.entitlementFromRaw(packet.d)
        );
        break;
      case "GUILD_CREATE":
        {
          this.client.guildShardMap[packet.d.id] = this.id;

          this.client.guilds.set(
            packet.d.id,
            this.client.util.guildFromRaw(packet.d)
          );

          this.client.emit(
            GatewayEvents.GuildCreate,
            this.client.util.guildFromRaw(packet.d)
          );
        }
        break;
      case "GUILD_UPDATE":
        {
          this.client.guilds.set(
            packet.d.id,
            this.client.util.guildFromRaw(packet.d)
          );
          this.client.emit(
            GatewayEvents.GuildUpdate,
            this.client.util.guildFromRaw(packet.d)
          );
        }
        break;
      case "GUILD_DELETE":
        {
          delete this.client.guildShardMap[packet.d.id];

          this.client.guilds.delete(packet.d.id);

          this.client.emit(GatewayEvents.GuildDelete, {
            id: packet.d.id,
            unavailable: packet.d.unavailable,
          });
        }
        break;
      case "GUILD_AUDIT_LOG_ENTRY_CREATE":
        this.client.emit(GatewayEvents.GuildAuditLogEntryCreate, {
          ...this.client.util.auditLogEntryFromRaw(packet.d),

          guildId: packet.d.guild_id,
        });
        break;
      case "GUILD_BAN_ADD":
        this.client.emit(GatewayEvents.GuildBanAdd, {
          guildId: packet.d.guild_id,
          user: this.client.util.userFromRaw(packet.d.user),
        });
        break;
      case "GUILD_BAN_REMOVE":
        this.client.emit(GatewayEvents.GuildBanRemove, {
          guildId: packet.d.guild_id,
          user: this.client.util.userFromRaw(packet.d.user),
        });
        break;
      case "GUILD_EMOJIS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildEmojisUpdate,
          packet.d.emojis.map((emoji: RawEmoji) =>
            this.client.util.emojiFromRaw(emoji)
          ),
          packet.d.guild_id
        );
        break;
      case "GUILD_STICKERS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildStickersUpdate,
          packet.d.stickers.map((sticker: RawSticker) =>
            this.client.util.stickerFromRaw(sticker)
          ),
          packet.d.guild_id
        );
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildIntegrationsUpdate,
          packet.d.guild_id
        );
        break;
      case "GUILD_MEMBER_ADD":
        this.client.emit(GatewayEvents.GuildMemberAdd, {
          ...this.client.util.guildMemberFromRaw(packet.d),

          guildId: packet.d.guild_id,
        });
        break;
      case "GUILD_MEMBER_REMOVE":
        this.client.emit(GatewayEvents.GuildMemberRemove, {
          guildId: packet.d.guild_id,
          user: this.client.util.userFromRaw(packet.d.user),
        });
        break;
      case "GUILD_MEMBER_UPDATE":
        this.client.emit(GatewayEvents.GuildMemberUpdate, {
          guildId: packet.d.guild_id,
          roles: packet.d.roles,
          user: this.client.util.userFromRaw(packet.d.user),
          nick: packet.d.nick,
          avatar: packet.d.avatar,
          joinedAt: packet.d.joined_at,
          premiumSince: packet.d.premium_since,
          deaf: packet.d.deaf,
          mute: packet.d.mute,
          pending: packet.d.pending,
          communicationDisabledUntil: packet.d.communication_disabled_until,
          flags: packet.d.flags,
          avatarDecorationData:
            packet.d.avatar_decoration_data !== undefined
              ? {
                  asset: packet.d.asset,
                  skuId: packet.d.sku_id,
                }
              : undefined,
        });
        break;
      case "GUILD_MEMBERS_CHUNK":
        this.client.emit(GatewayEvents.GuildMembersChunk, {
          guildId: packet.d.guild_id,
          members: packet.d.members.map((guildMember: RawGuildMember) =>
            this.client.util.guildMemberFromRaw(guildMember)
          ),
          chunkIndex: packet.d.chunk_index,
          chunkCount: packet.d.chunk_count,
          notFound: packet.d.not_found,
          presences: packet.d.presences?.map(
            (presence: RawPresenceUpdateEventFields) =>
              this.client.util.presenceFromRaw(presence)
          ),
          nonce: packet.d.nonce,
        });
        break;
      case "GUILD_ROLE_CREATE":
        this.client.emit(
          GatewayEvents.GuildRoleCreate,
          this.client.util.roleFromRaw(packet.d.role),
          packet.d.guild_id
        );
        break;
      case "GUILD_ROLE_UPDATE":
        this.client.emit(
          GatewayEvents.GuildRoleUpdate,
          this.client.util.roleFromRaw(packet.d.role),
          packet.d.guild_id
        );
        break;
      case "GUILD_ROLE_DELETE":
        this.client.emit(
          GatewayEvents.GuildRoleDelete,
          packet.d.role_id,
          packet.d.guild_id
        );
        break;
      case "GUILD_SCHEDULED_EVENT_CREATE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventCreate,
          this.client.util.guildScheduledEventFromRaw(packet.d)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_UPDATE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUpdate,
          this.client.util.guildScheduledEventFromRaw(packet.d)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_DELETE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventDelete,
          this.client.util.guildScheduledEventFromRaw(packet.d)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_USER_ADD":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUserAdd,
          packet.d.user_id,
          packet.d.guild_scheduled_event_id,
          packet.d.guild_id
        );
        break;
      case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUserRemove,
          packet.d.user_id,
          packet.d.guild_scheduled_event_id,
          packet.d.guild_id
        );
        break;
      case "INTEGRATION_CREATE":
        this.client.emit(GatewayEvents.IntegrationCreate, {
          ...this.client.util.integrationFromRaw(packet.d),

          guildId: packet.d.guild_id,
        });
        break;
      case "INTEGRATION_UPDATE":
        this.client.emit(GatewayEvents.IntegrationUpdate, {
          ...this.client.util.integrationFromRaw(packet.d),

          guildId: packet.d.guild_id,
        });
        break;
      case "INTEGRATION_DELETE":
        this.client.emit(GatewayEvents.IntegrationDelete, {
          id: packet.d.id,
          guildId: packet.d.guild_id,
          applicationId: packet.d.application_id,
        });
        break;
      case "INTERACTION_CREATE":
        this.client.emit(
          GatewayEvents.InteractionCreate,
          this.client.util.interactionFromRaw(packet.d)
        );
        break;
      case "INVITE_CREATE":
        this.client.emit(GatewayEvents.InviteCreate, {
          channelId: packet.d.channel_id,
          code: packet.d.code,
          createdAt: packet.d.created_at,
          guildId: packet.d.guild_id,
          inviter:
            packet.d.inviter !== undefined
              ? this.client.util.userFromRaw(packet.d.inviter)
              : undefined,
          maxAge: packet.d.max_age,
          maxUses: packet.d.max_uses,
          targetType: packet.d.target_type,
          targetUser:
            packet.d.target_user !== undefined
              ? this.client.util.userFromRaw(packet.d.target_user)
              : undefined,
          targetApplication:
            packet.d.target_application !== undefined
              ? this.client.util.applicationFromRaw(packet.d.target_application)
              : undefined,
          temporary: packet.d.temporary,
          uses: packet.d.uses,
        });
        break;
      case "INVITE_DELETE":
        this.client.emit(GatewayEvents.InviteDelete, {
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
          code: packet.d.code,
        });
        break;
      case "MESSAGE_CREATE":
        this.client.emit(GatewayEvents.MessageCreate, {
          ...this.client.util.messageFromRaw(packet.d),

          guildId: packet.d.guild_id,
          member:
            packet.d.member !== undefined
              ? this.client.util.guildMemberFromRaw(packet.d.member)
              : undefined,
          mentions: packet.d.mentions.map((mention: RawUser) =>
            this.client.util.userFromRaw(mention)
          ),
        });
        break;
      case "MESSAGE_UPDATE":
        this.client.emit(
          GatewayEvents.MessageUpdate,
          this.client.util.messageFromRaw(packet.d)
        );
        break;
      case "MESSAGE_DELETE":
        this.client.emit(GatewayEvents.MessageDelete, {
          id: packet.d.id,
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "MESSAGE_DELETE_BULK":
        this.client.emit(GatewayEvents.MessageDeleteBulk, {
          ids: packet.d.ids,
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "MESSAGE_REACTION_ADD":
        this.client.emit(GatewayEvents.MessageReactionAdd, {
          userId: packet.d.user_id,
          channelId: packet.d.user_id,
          messageId: packet.d.user_id,
          guildId: packet.d.user_id,
          member:
            packet.d.member !== undefined
              ? this.client.util.guildMemberFromRaw(packet.d.member)
              : undefined,
          emoji: this.client.util.emojiFromRaw(packet.d.emoji),
          messageAuthorId: packet.d.message_author_id,
          burst: packet.d.burst,
          burstColors: packet.d.burst_colors,
          type: packet.d.type,
        });
        break;
      case "MESSAGE_REACTION_REMOVE":
        this.client.emit(GatewayEvents.MessageReactionRemove, {
          userId: packet.d.user_id,
          channelId: packet.d.user_id,
          messageId: packet.d.user_id,
          guildId: packet.d.user_id,
          emoji: this.client.util.emojiFromRaw(packet.d.emoji),
          burst: packet.d.burst,
          type: packet.d.type,
        });
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        this.client.emit(GatewayEvents.MessageReactionRemoveAll, {
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        this.client.emit(GatewayEvents.MessageReactionRemoveEmoji, {
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
          messageId: packet.d.message_id,
          emoji: this.client.util.emojiFromRaw(packet.d.emoji),
        });
        break;
      case "PRESENCE_UPDATE":
        this.client.emit(
          GatewayEvents.PresenceUpdate,
          this.client.util.presenceFromRaw(packet.d)
        );
        break;
      case "STAGE_INSTANCE_CREATE":
        this.client.emit(
          GatewayEvents.StageInstanceCreate,
          this.client.util.stageInstanceFromRaw(packet.d)
        );
        break;
      case "STAGE_INSTANCE_UPDATE":
        this.client.emit(
          GatewayEvents.StageInstanceUpdate,
          this.client.util.stageInstanceFromRaw(packet.d)
        );
        break;
      case "STAGE_INSTANCE_DELETE":
        this.client.emit(
          GatewayEvents.StageInstanceDelete,
          this.client.util.stageInstanceFromRaw(packet.d)
        );
        break;
      case "TYPING_START":
        this.client.emit(GatewayEvents.TypingStart, {
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
          userId: packet.d.user_id,
          timestamp: packet.d.timestamp,
          member:
            packet.d.member !== undefined
              ? this.client.util.guildMemberFromRaw(packet.d.member)
              : undefined,
        });
        break;
      case "USER_UPDATE":
        this.client.emit(
          GatewayEvents.UserUpdate,
          this.client.util.userFromRaw(packet.d)
        );
        break;
      case "VOICE_STATE_UPDATE":
        this.client.emit(
          GatewayEvents.VoiceStateUpdate,
          this.client.util.voiceStateFromRaw(packet.d)
        );
        break;
      case "VOICE_SERVER_UPDATE":
        this.client.emit(GatewayEvents.VoiceServerUpdate, {
          token: packet.d.token,
          guildId: packet.d.guild_id,
          endpoint: packet.d.endpoint,
        });
        break;
      case "WEBHOOKS_UPDATE":
        this.client.emit(
          GatewayEvents.WebhooksUpdate,
          packet.d.channel_id,
          packet.d.guild_id
        );
        break;
      case "MESSAGE_POLL_VOTE_ADD":
        this.client.emit(GatewayEvents.MessagePollVoteAdd, {
          userId: packet.d.user_id,
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
          answerId: packet.d.answer_id,
        });
        break;
      case "MESSAGE_POLL_VOTE_REMOVE":
        this.client.emit(GatewayEvents.MessagePollVoteRemove, {
          userId: packet.d.user_id,
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
          answerId: packet.d.answer_id,
        });
        break;
    }
  }

  private onWebSocketOpen(): void {
    this.identify({
      token: this.client.token,
      shard: [this.id, this.client.shardsCount as number],
      intents: this.client.intents,
      properties: {
        os: process.platform,
        browser: pkg.name,
        device: pkg.name,
      },
    });
  }

  private onWebSocketMessage(data: RawData): void {
    const packet: RawPayload = JSON.parse(data.toString());

    switch (packet.op) {
      case GatewayOPCodes.Dispatch:
        this.client.emit(GatewayEvents.Dispatch, packet);
        this.onDispatch(packet);
        break;
      case GatewayOPCodes.Reconnect:
        this.client.emit(GatewayEvents.Reconnect);
        break;
      case GatewayOPCodes.InvalidSession:
        this.client.emit(GatewayEvents.InvalidSession);
        break;
      case GatewayOPCodes.Hello:
        {
          this.heartbeatInterval = setInterval(
            () => this.heartbeat(null),
            packet.d.heartbeat_interval
          );

          this.client.emit(GatewayEvents.Hello);
        }
        break;
    }
  }

  private onWebSocketError(err: Error): void {
    throw err;
  }

  private onWebSocketClose(code: number, reason: Buffer): void {
    if (code === 1000) return;

    throw new GatewayError(`[${code}] ${reason}`);
  }

  /** https://discord.com/developers/docs/topics/gateway-events#request-guild-members */
  requestGuildMembers(options: RequestGuildMembers): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.RequestGuildMembers,
        d: {
          guild_id: options.guildId,
          query: options.query,
          limit: options.limit,
          presences: options.presences,
          user_ids: options.userIds,
          nonce: options.nonce,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#resume */
  resume(options: Resume): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.Resume,
        d: {
          token: options.token,
          session_id: options.sessionId,
          seq: options.seq,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  updatePresence(
    options: Partial<
      Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
    >
  ): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.PresenceUpdate,
        d: {
          since: options.status === StatusTypes.Idle ? Date.now() : null,
          activities: options.activities,
          status: options.status ?? StatusTypes.Online,
          afk: !!options.afk,
        },
      })
    );
  }
}
