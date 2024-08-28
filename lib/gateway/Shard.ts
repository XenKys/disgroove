import WebSocket, { type RawData } from "ws";
import {
  ActivityType,
  GatewayEvents,
  GatewayOPCodes,
  StatusTypes,
} from "../constants";
import { GatewayError } from "../utils";
import { Client } from "../Client";
import * as pkg from "../../package.json";
import type { RawChannel, RawThreadMember } from "../types/channel";
import type { RawEmoji } from "../types/emoji";
import type {
  GatewayPresenceUpdate,
  GatewayVoiceStateUpdate,
  Identify,
  RawPayload,
  RawPresenceUpdateEventFields,
  RequestGuildMembers,
  Resume,
} from "../types/gateway-events";
import type { RawGuildMember } from "../types/guild";
import type { RawSticker } from "../types/sticker";
import type { RawUser } from "../types/user";
import {
  Applications,
  AuditLogs,
  AutoModeration,
  Channels,
  Emojis,
  Entitlements,
  Guilds,
  GuildScheduledEvents,
  Interactions,
  Messages,
  Presences,
  Roles,
  StageInstances,
  Stickers,
  Subscriptions,
  Users,
  Voice,
} from "../transformers";

export class Shard {
  id: number;
  private heartbeatInterval: NodeJS.Timeout | null;
  client: Client;
  ws: WebSocket;
  sessionID: string | null;
  resumeGatewayURL: string | null;

  constructor(id: number, client: Client) {
    this.id = id;
    this.heartbeatInterval = null;
    this.client = client;
    this.ws = new WebSocket(
      "wss://gateway.discord.gg/?v=10&encoding=json",
      client.ws
    );
    this.sessionID = null;
    this.resumeGatewayURL = null;
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
    this.client.emit("dispatch", packet, this.id);

    switch (packet.t) {
      case GatewayEvents.Ready:
        {
          this.sessionID = packet.d.session_id;
          this.resumeGatewayURL = packet.d.resume_gateway_url;
          this.client.user = Users.userFromRaw(packet.d.user);
          this.client.application = packet.d.application;

          this.client.emit("ready");
        }
        break;
      case GatewayEvents.Resumed:
        this.client.emit("resumed");
        break;
      case GatewayEvents.ApplicationCommandPermissionsUpdate:
        this.client.emit(
          "applicationCommandPermissionsUpdate",
          Guilds.guildApplicationCommandPermissionsFromRaw(packet.d)
        );
        break;
      case GatewayEvents.AutoModerationRuleCreate:
        this.client.emit(
          "autoModerationRuleCreate",
          AutoModeration.autoModerationRuleFromRaw(packet.d)
        );
        break;
      case GatewayEvents.AutoModerationRuleUpdate:
        this.client.emit(
          "autoModerationRuleUpdate",
          AutoModeration.autoModerationRuleFromRaw(packet.d)
        );
        break;
      case GatewayEvents.AutoModerationRuleDelete:
        this.client.emit(
          "autoModerationRuleDelete",
          AutoModeration.autoModerationRuleFromRaw(packet.d)
        );
        break;
      case GatewayEvents.AutoModerationActionExecution:
        this.client.emit("autoModerationActionExecution", {
          guildID: packet.d.guild_id,
          action: {
            type: packet.d.action.type,
            metadata: {
              channelID: packet.d.action.metadata.channel_id,
              durationSeconds: packet.d.action.metadata.duration_seconds,
              customMessage: packet.d.action.metadata.custom_message,
            },
          },
          ruleID: packet.d.rule_id,
          ruleTriggerType: packet.d.rule_trigger_type,
          userID: packet.d.user_id,
          channelID: packet.d.channel_id,
          messageID: packet.d.message_id,
          alertSystemMessageID: packet.d.alert_system_message_id,
          content: packet.d.content,
          matchedKeyword: packet.d.matched_keyword,
          matchedContent: packet.d.matched_content,
        });
        break;
      case GatewayEvents.ChannelCreate:
        this.client.emit("channelCreate", Channels.channelFromRaw(packet.d));
        break;
      case GatewayEvents.ChannelUpdate:
        this.client.emit("channelUpdate", Channels.channelFromRaw(packet.d));
        break;
      case GatewayEvents.ChannelDelete:
        this.client.emit("channelDelete", Channels.channelFromRaw(packet.d));
        break;
      case GatewayEvents.ChannelPinsUpdate:
        this.client.emit("channelPinsUpdate", {
          guildID: packet.d.guild_id,
          channelID: packet.d.channel_id,
          lastPinTimestamp: packet.d.last_pin_timestamp,
        });
        break;
      case GatewayEvents.ThreadCreate:
        this.client.emit("threadCreate", Channels.channelFromRaw(packet.d));
        break;
      case GatewayEvents.ThreadUpdate:
        this.client.emit("threadUpdate", Channels.channelFromRaw(packet.d));
        break;
      case GatewayEvents.ThreadDelete:
        this.client.emit("threadDelete", Channels.channelFromRaw(packet.d));
        break;
      case GatewayEvents.ThreadListSync:
        this.client.emit("threadListSync", {
          guildID: packet.d.guild_id,
          channelIDs: packet.d.channel_ids,
          threads: packet.d.threads.map((thread: RawChannel) =>
            Channels.channelFromRaw(thread)
          ),
          members: packet.d.members.map((threadMember: RawThreadMember) =>
            Channels.threadMemberFromRaw(threadMember)
          ),
        });
        break;
      case GatewayEvents.ThreadMemberUpdate:
        this.client.emit("threadMemberUpdate", {
          id: packet.d.id,
          userID: packet.d.user_id,
          joinTimestamp: packet.d.join_timestamp,
          flags: packet.d.flags,
          member:
            packet.d.member !== undefined
              ? Guilds.guildMemberFromRaw(packet.d.member)
              : undefined,

          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.ThreadMembersUpdate:
        this.client.emit("threadMembersUpdate", {
          id: packet.d.id,
          guildID: packet.d.guild_id,
          memberCount: packet.d.member_count,
          addedMembers: packet.d.members.map((threadMember: RawThreadMember) =>
            Channels.threadMemberFromRaw(threadMember)
          ),
          removedMemberIDs: packet.d.removed_member_ids,
        });
        break;
      case GatewayEvents.EntitlementCreate:
        this.client.emit(
          "entitlementCreate",
          Entitlements.entitlementFromRaw(packet.d)
        );
        break;
      case GatewayEvents.EntitlementUpdate:
        this.client.emit(
          "entitlementUpdate",
          Entitlements.entitlementFromRaw(packet.d)
        );
        break;
      case GatewayEvents.EntitlementDelete:
        this.client.emit(
          "entitlementDelete",
          Entitlements.entitlementFromRaw(packet.d)
        );
        break;
      case GatewayEvents.GuildCreate:
        {
          this.client.guildShardMap[packet.d.id] = this.id;

          this.client.guilds.set(packet.d.id, Guilds.guildFromRaw(packet.d));

          this.client.emit("guildCreate", Guilds.guildFromRaw(packet.d));
        }
        break;
      case GatewayEvents.GuildUpdate:
        {
          this.client.guilds.set(packet.d.id, Guilds.guildFromRaw(packet.d));
          this.client.emit("guildUpdate", Guilds.guildFromRaw(packet.d));
        }
        break;
      case GatewayEvents.GuildDelete:
        {
          delete this.client.guildShardMap[packet.d.id];

          this.client.guilds.delete(packet.d.id);

          this.client.emit("guildDelete", {
            id: packet.d.id,
            unavailable: packet.d.unavailable,
          });
        }
        break;
      case GatewayEvents.GuildAuditLogEntryCreate:
        this.client.emit("guildAuditLogEntryCreate", {
          ...AuditLogs.auditLogEntryFromRaw(packet.d),

          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.GuildBanAdd:
        this.client.emit("guildBanAdd", {
          guildID: packet.d.guild_id,
          user: Users.userFromRaw(packet.d.user),
        });
        break;
      case GatewayEvents.GuildBanRemove:
        this.client.emit("guildBanRemove", {
          guildID: packet.d.guild_id,
          user: Users.userFromRaw(packet.d.user),
        });
        break;
      case GatewayEvents.GuildEmojisUpdate:
        this.client.emit(
          "guildEmojisUpdate",
          packet.d.emojis.map((emoji: RawEmoji) => Emojis.emojiFromRaw(emoji)),
          packet.d.guild_id
        );
        break;
      case GatewayEvents.GuildStickersUpdate:
        this.client.emit(
          "guildStickersUpdate",
          packet.d.stickers.map((sticker: RawSticker) =>
            Stickers.stickerFromRaw(sticker)
          ),
          packet.d.guild_id
        );
        break;
      case GatewayEvents.GuildIntegrationsUpdate:
        this.client.emit("guildIntegrationsUpdate", packet.d.guild_id);
        break;
      case GatewayEvents.GuildMemberAdd:
        this.client.emit("guildMemberAdd", {
          ...Guilds.guildMemberFromRaw(packet.d),

          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.GuildMemberRemove:
        this.client.emit("guildMemberRemove", {
          guildID: packet.d.guild_id,
          user: Users.userFromRaw(packet.d.user),
        });
        break;
      case GatewayEvents.GuildMemberUpdate:
        this.client.emit("guildMemberUpdate", {
          guildID: packet.d.guild_id,
          roles: packet.d.roles,
          user: Users.userFromRaw(packet.d.user),
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
                  skuID: packet.d.sku_id,
                }
              : undefined,
        });
        break;
      case GatewayEvents.GuildMembersChunk:
        this.client.emit("guildMembersChunk", {
          guildID: packet.d.guild_id,
          members: packet.d.members.map((guildMember: RawGuildMember) =>
            Guilds.guildMemberFromRaw(guildMember)
          ),
          chunkIndex: packet.d.chunk_index,
          chunkCount: packet.d.chunk_count,
          notFound: packet.d.not_found,
          presences: packet.d.presences?.map(
            (presence: RawPresenceUpdateEventFields) =>
              Presences.presenceFromRaw(presence)
          ),
          nonce: packet.d.nonce,
        });
        break;
      case GatewayEvents.GuildRoleCreate:
        this.client.emit(
          "guildRoleCreate",
          Roles.roleFromRaw(packet.d.role),
          packet.d.guild_id
        );
        break;
      case GatewayEvents.GuildRoleUpdate:
        this.client.emit(
          "guildRoleUpdate",
          Roles.roleFromRaw(packet.d.role),
          packet.d.guild_id
        );
        break;
      case GatewayEvents.GuildRoleDelete:
        this.client.emit(
          "guildRoleDelete",
          packet.d.role_id,
          packet.d.guild_id
        );
        break;
      case GatewayEvents.GuildScheduledEventCreate:
        this.client.emit(
          "guildScheduledEventCreate",
          GuildScheduledEvents.guildScheduledEventFromRaw(packet.d)
        );
        break;
      case GatewayEvents.GuildScheduledEventUpdate:
        this.client.emit(
          "guildScheduledEventUpdate",
          GuildScheduledEvents.guildScheduledEventFromRaw(packet.d)
        );
        break;
      case GatewayEvents.GuildScheduledEventDelete:
        this.client.emit(
          "guildScheduledEventDelete",
          GuildScheduledEvents.guildScheduledEventFromRaw(packet.d)
        );
        break;
      case GatewayEvents.GuildScheduledEventUserAdd:
        this.client.emit(
          "guildScheduledEventUserAdd",
          packet.d.user_id,
          packet.d.guild_scheduled_event_id,
          packet.d.guild_id
        );
        break;
      case GatewayEvents.GuildScheduledEventUserRemove:
        this.client.emit(
          "guildScheduledEventUserRemove",
          packet.d.user_id,
          packet.d.guild_scheduled_event_id,
          packet.d.guild_id
        );
        break;
      case GatewayEvents.IntegrationCreate:
        this.client.emit("integrationCreate", {
          ...Guilds.integrationFromRaw(packet.d),

          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.IntegrationUpdate:
        this.client.emit("integrationUpdate", {
          ...Guilds.integrationFromRaw(packet.d),

          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.IntegrationDelete:
        this.client.emit("integrationDelete", {
          id: packet.d.id,
          guildID: packet.d.guild_id,
          applicationID: packet.d.application_id,
        });
        break;
      case GatewayEvents.InteractionCreate:
        this.client.emit(
          "interactionCreate",
          Interactions.interactionFromRaw(packet.d)
        );
        break;
      case GatewayEvents.InviteCreate:
        this.client.emit("inviteCreate", {
          channelID: packet.d.channel_id,
          code: packet.d.code,
          createdAt: packet.d.created_at,
          guildID: packet.d.guild_id,
          inviter:
            packet.d.inviter !== undefined
              ? Users.userFromRaw(packet.d.inviter)
              : undefined,
          maxAge: packet.d.max_age,
          maxUses: packet.d.max_uses,
          targetType: packet.d.target_type,
          targetUser:
            packet.d.target_user !== undefined
              ? Users.userFromRaw(packet.d.target_user)
              : undefined,
          targetApplication:
            packet.d.target_application !== undefined
              ? Applications.applicationFromRaw(packet.d.target_application)
              : undefined,
          temporary: packet.d.temporary,
          uses: packet.d.uses,
        });
        break;
      case GatewayEvents.InviteDelete:
        this.client.emit("inviteDelete", {
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
          code: packet.d.code,
        });
        break;
      case GatewayEvents.MessageCreate:
        this.client.emit("messageCreate", {
          ...Messages.messageFromRaw(packet.d),

          guildID: packet.d.guild_id,
          member:
            packet.d.member !== undefined
              ? Guilds.guildMemberFromRaw(packet.d.member)
              : undefined,
          mentions: packet.d.mentions.map((mention: RawUser) =>
            Users.userFromRaw(mention)
          ),
        });
        break;
      case GatewayEvents.MessageUpdate:
        this.client.emit("messageUpdate", Messages.messageFromRaw(packet.d));
        break;
      case GatewayEvents.MessageDelete:
        this.client.emit("messageDelete", {
          id: packet.d.id,
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.MessageDeleteBulk:
        this.client.emit("messageDeleteBulk", {
          ids: packet.d.ids,
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.MessageReactionAdd:
        this.client.emit("messageReactionAdd", {
          userID: packet.d.user_id,
          channelID: packet.d.user_id,
          messageID: packet.d.user_id,
          guildID: packet.d.user_id,
          member:
            packet.d.member !== undefined
              ? Guilds.guildMemberFromRaw(packet.d.member)
              : undefined,
          emoji: Emojis.emojiFromRaw(packet.d.emoji),
          messageAuthorID: packet.d.message_author_id,
          burst: packet.d.burst,
          burstColors: packet.d.burst_colors,
          type: packet.d.type,
        });
        break;
      case GatewayEvents.MessageReactionRemove:
        this.client.emit("messageReactionRemove", {
          userID: packet.d.user_id,
          channelID: packet.d.user_id,
          messageID: packet.d.user_id,
          guildID: packet.d.user_id,
          emoji: Emojis.emojiFromRaw(packet.d.emoji),
          burst: packet.d.burst,
          type: packet.d.type,
        });
        break;
      case GatewayEvents.MessageReactionRemoveAll:
        this.client.emit("messageReactionRemoveAll", {
          channelID: packet.d.channel_id,
          messageID: packet.d.message_id,
          guildID: packet.d.guild_id,
        });
        break;
      case GatewayEvents.MessageReactionRemoveEmoji:
        this.client.emit("messageReactionRemoveEmoji", {
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
          messageID: packet.d.message_id,
          emoji: Emojis.emojiFromRaw(packet.d.emoji),
        });
        break;
      case GatewayEvents.PresenceUpdate:
        this.client.emit("presenceUpdate", Presences.presenceFromRaw(packet.d));
        break;
      case GatewayEvents.StageInstanceCreate:
        this.client.emit(
          "stageInstanceCreate",
          StageInstances.stageInstanceFromRaw(packet.d)
        );
        break;
      case GatewayEvents.StageInstanceUpdate:
        this.client.emit(
          "stageInstanceUpdate",
          StageInstances.stageInstanceFromRaw(packet.d)
        );
        break;
      case GatewayEvents.StageInstanceDelete:
        this.client.emit(
          "stageInstanceDelete",
          StageInstances.stageInstanceFromRaw(packet.d)
        );
        break;
      case GatewayEvents.TypingStart:
        this.client.emit("typingStart", {
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
          userID: packet.d.user_id,
          timestamp: packet.d.timestamp,
          member:
            packet.d.member !== undefined
              ? Guilds.guildMemberFromRaw(packet.d.member)
              : undefined,
        });
        break;
      case GatewayEvents.UserUpdate:
        this.client.emit("userUpdate", Users.userFromRaw(packet.d));
        break;
      case GatewayEvents.VoiceChannelEffectSend:
        this.client.emit("voiceChannelEffectSend", {
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
          userID: packet.d.user_id,
          emoji:
            packet.d.emoji !== null
              ? Emojis.emojiFromRaw(packet.d.emoji)
              : null,
          animationType: packet.d.animation_type,
          animationID: packet.d.animation_id,
          soundID: packet.d.sound_id,
          soundVolume: packet.d.sound_volume,
        });
        break;
      case GatewayEvents.VoiceStateUpdate:
        this.client.emit("voiceStateUpdate", Voice.voiceStateFromRaw(packet.d));
        break;
      case GatewayEvents.VoiceServerUpdate:
        {
          this.client.emit("voiceServerUpdate", {
            token: packet.d.token,
            guildID: packet.d.guild_id,
            endpoint: packet.d.endpoint,
          });
        }
        break;
      case GatewayEvents.WebhooksUpdate:
        this.client.emit(
          "webhooksUpdate",
          packet.d.channel_id,
          packet.d.guild_id
        );
        break;
      case GatewayEvents.SubscriptionCreate:
        this.client.emit(
          "subscriptionCreate",
          Subscriptions.subscriptionFromRaw(packet.d)
        );
        break;
      case GatewayEvents.SubscriptionUpdate:
        this.client.emit(
          "subscriptionUpdate",
          Subscriptions.subscriptionFromRaw(packet.d)
        );
        break;
      case GatewayEvents.SubscriptionDelete:
        this.client.emit(
          "subscriptionDelete",
          Subscriptions.subscriptionFromRaw(packet.d)
        );
        break;
      case GatewayEvents.MessagePollVoteAdd:
        this.client.emit("messagePollVoteAdd", {
          userID: packet.d.user_id,
          channelID: packet.d.channel_id,
          messageID: packet.d.message_id,
          guildID: packet.d.guild_id,
          answerID: packet.d.answer_id,
        });
        break;
      case GatewayEvents.MessagePollVoteRemove:
        this.client.emit("messagePollVoteRemove", {
          userID: packet.d.user_id,
          channelID: packet.d.channel_id,
          messageID: packet.d.message_id,
          guildID: packet.d.guild_id,
          answerID: packet.d.answer_id,
        });
        break;
    }
  }

  private onWebSocketOpen(): void {
    this.identify({
      token: this.client.token,
      properties: {
        os: this.client.properties?.os ?? process.platform,
        browser: this.client.properties?.browser ?? pkg.name,
        device: this.client.properties?.device ?? pkg.name,
      },
      compress: this.client.compress,
      largeThreshold: this.client.largeThreshold,
      shard: [this.id, this.client.shardsCount as number],
      presence:
        this.client.presence !== undefined
          ? {
              since:
                this.client.presence.status === StatusTypes.Idle
                  ? Date.now()
                  : null,
              activities: this.client.presence.activities?.map((activity) => ({
                name:
                  activity.type === ActivityType.Custom
                    ? "Custom Status"
                    : activity.name,
                type: activity.type,
                url: activity.url,
                state: activity.state,
              })),
              status: this.client.presence.status ?? StatusTypes.Online,
              afk: !!this.client.presence.afk,
            }
          : undefined,
      intents: this.client.intents,
    });
  }

  private onWebSocketMessage(data: RawData): void {
    const packet: RawPayload = JSON.parse(data.toString());

    switch (packet.op) {
      case GatewayOPCodes.Dispatch:
        this.onDispatch(packet);
        break;
      case GatewayOPCodes.Reconnect:
        this.client.emit("reconnect");
        break;
      case GatewayOPCodes.InvalidSession:
        this.client.emit("invalidSession");
        break;
      case GatewayOPCodes.Hello:
        {
          this.heartbeatInterval = setInterval(
            () => this.heartbeat(null),
            packet.d.heartbeat_interval
          );

          this.client.emit("hello", packet.d.heartbeat_interval, this.id);
        }
        break;
      case GatewayOPCodes.HeartbeatACK:
        this.client.emit("heartbeatACK", this.id);
        break;
    }
  }

  private onWebSocketError(err: Error): void {
    throw err;
  }

  private onWebSocketClose(code: number, reason: Buffer): void {
    if (code === 1000) return;

    throw new GatewayError(code, reason.toString());
  }

  /** https://discord.com/developers/docs/topics/gateway-events#request-guild-members */
  requestGuildMembers(options: RequestGuildMembers): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.RequestGuildMembers,
        d: {
          guild_id: options.guildID,
          query: options.query,
          limit: options.limit,
          presences: options.presences,
          user_ids: options.userIDs,
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
          session_id: options.sessionID,
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
          activities: options.activities?.map((activity) => ({
            name:
              activity.type === ActivityType.Custom
                ? "Custom Status"
                : activity.name,
            type: activity.type,
            url: activity.url,
            state: activity.state,
          })),
          status: options.status ?? StatusTypes.Online,
          afk: !!options.afk,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  updateVoiceState(options: GatewayVoiceStateUpdate): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.VoiceStateUpdate,
        d: {
          guild_id: options.guildID,
          channel_id: options.channelID,
          self_mute: options.selfMute,
          self_deaf: options.selfDeaf,
        },
      })
    );
  }
}
