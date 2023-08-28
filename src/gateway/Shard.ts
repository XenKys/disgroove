import WebSocket, { type RawData } from "ws";
import { GatewayEvents, GatewayOPCodes, StatusTypes } from "../constants";
import { GatewayError } from "../utils";
import {
  Application,
  AutoModerationRule,
  Channel,
  Emoji,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  Integration,
  Interaction,
  Message,
  Role,
  StageInstance,
  User,
  VoiceState,
  PartialApplication,
  Sticker,
} from "../structures";
import type {
  Activity,
  RawActivity,
  RawApplicationCommandPermission,
  RawChannel,
  RawEmoji,
  RawGuildMember,
  RawSticker,
  RawThreadMember,
  RawAuditLogChange,
} from "../types";
import { Client } from "../Client";

export class Shard {
  public id: number;
  private heartbeatInterval!: NodeJS.Timeout | null;
  public client: Client;
  public ws: WebSocket;

  constructor(id: number, client: Client) {
    this.id = id;
    this.client = client;
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  public updatePresence(options: {
    activity?: Pick<Activity, "name" | "type" | "url" | "state">;
    status?: StatusTypes;
    afk?: boolean;
  }): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.PresenceUpdate,
        d: {
          since: options.status === StatusTypes.Idle ? Date.now() : null,
          activities:
            options.activity !== undefined ? [options.activity] : null,
          status: options.status ?? StatusTypes.Online,
          afk: !!options.afk,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  public connect(): void {
    this.ws.on("open", () => this.onWebSocketOpen());
    this.ws.on("message", (data) => this.onWebSocketMessage(data));
    this.ws.on("error", (err) => this.onWebSocketError(err));
    this.ws.on("close", (code, reason) => this.onWebSocketClose(code, reason));
  }

  public disconnect(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private onWebSocketOpen(): void {
    this.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.Identify,
        d: {
          token: this.client.token,
          shard: [this.id, this.client.shardsCount],
          intents: this.client.intents,
          properties: {
            os: process.platform,
            browser: "disgroove",
            device: "disgroove",
          },
        },
      })
    );
  }

  private onWebSocketMessage(data: RawData): void {
    const packet = JSON.parse(data.toString());

    switch (packet.op) {
      case GatewayOPCodes.Reconnect:
        this.client.emit(GatewayEvents.Reconnect);
        break;
      case GatewayOPCodes.InvalidSession:
        this.client.emit(GatewayEvents.InvalidSession);
        break;
      case GatewayOPCodes.Hello:
        {
          this.heartbeatInterval = setInterval(() => {
            this.ws.send(
              JSON.stringify({
                op: GatewayOPCodes.Heartbeat,
                d: null,
              })
            );
          }, packet.d.heartbeat_interval);

          this.client.emit(GatewayEvents.Hello);
        }
        break;
    }

    switch (packet.t) {
      case "READY":
        {
          this.client.user = new User(packet.d.user, this.client);
          this.client.application = new PartialApplication(
            packet.d.application,
            this.client
          );

          this.client.emit(GatewayEvents.Ready);
        }
        break;
      case "RESUMED":
        this.client.emit(GatewayEvents.Resumed);
        break;
      case "APPLICATION_COMMAND_PERMISSIONS_UPDATE":
        this.client.emit(GatewayEvents.ApplicationCommandPermissionsUpdate, {
          id: packet.d.id,
          applicationId: packet.d.application_id,
          guildId: packet.d.guild_id,
          permissions: packet.d.permissions.map(
            (permission: RawApplicationCommandPermission) => ({
              id: permission.id,
              type: permission.type,
              permission: permission.permission,
            })
          ),
        });
        break;
      case "AUTO_MODERATION_RULE_CREATE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleCreate,
          new AutoModerationRule(packet.d, this.client)
        );
        break;
      case "AUTO_MODERATION_RULE_UPDATE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleUpdate,
          new AutoModerationRule(packet.d, this.client)
        );
        break;
      case "AUTO_MODERATION_RULE_DELETE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleDelete,
          new AutoModerationRule(packet.d, this.client).toJSON()
        );
        break;
      case "AUTO_MODERATION_ACTION_EXECUTION":
        this.client.emit(GatewayEvents.AutoModerationActionExecution, {
          guildId: packet.d.guild_id,
          action: {
            type: packet.d.action.type,
            metadata: packet.d.action.metadata,
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
          new Channel(packet.d, this.client)
        );
        break;
      case "CHANNEL_UPDATE":
        this.client.emit(
          GatewayEvents.ChannelUpdate,
          new Channel(packet.d, this.client)
        );
        break;
      case "CHANNEL_DELETE":
        this.client.emit(
          GatewayEvents.ChannelDelete,
          new Channel(packet.d, this.client).toJSON()
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
          new Channel(packet.d, this.client)
        );
        break;
      case "THREAD_UPDATE":
        this.client.emit(
          GatewayEvents.ThreadUpdate,
          new Channel(packet.d, this.client)
        );
        break;
      case "THREAD_DELETE":
        this.client.emit(
          GatewayEvents.ThreadDelete,
          new Channel(packet.d, this.client).toJSON()
        );
        break;
      case "THREAD_LIST_SYNC":
        this.client.emit(GatewayEvents.ThreadListSync, {
          guildId: packet.d.guild_id,
          channelIds: packet.d.channel_ids,
          threads: packet.d.threads.map(
            (channel: RawChannel) => new Channel(channel, this.client)
          ),
          members: packet.d.members.map((member: RawThreadMember) => ({
            id: member.id,
            userId: member.user_id,
            joinTimestamp: member.join_timestamp,
            flags: member.flags,
            member:
              member.member !== undefined
                ? new GuildMember(member.member, this.client)
                : undefined,
          })),
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
              ? new GuildMember(packet.d.member, this.client)
              : undefined,
          guildId: packet.d.guild_id,
        });
        break;
      case "THREAD_MEMBERS_UPDATE":
        this.client.emit(GatewayEvents.ThreadMembersUpdate, {
          id: packet.d.id,
          guildId: packet.d.guild_id,
          memberCount: packet.d.member_count,
          addedMembers: packet.d.added_members?.map(
            (member: RawThreadMember) => ({
              id: member.id,
              userId: member.user_id,
              joinTimestamp: member.join_timestamp,
              flags: member.flags,
              member:
                member.member !== undefined
                  ? new GuildMember(member.member, this.client)
                  : undefined,
            })
          ),
          removedMemberIds: packet.d.removed_member_ids,
        });
        break;
      case "GUILD_CREATE":
        this.client.emit(
          GatewayEvents.GuildCreate,
          new Guild(packet.d, this.client)
        );
        break;
      case "GUILD_UPDATE":
        this.client.emit(
          GatewayEvents.GuildUpdate,
          new Guild(packet.d, this.client)
        );
        break;
      case "GUILD_DELETE":
        this.client.emit(GatewayEvents.GuildDelete, {
          id: packet.d.id,
          unavailable: packet.d.unavailable,
        });
        break;
      case "GUILD_AUDIT_LOG_ENTRY_CREATE":
        this.client.emit(GatewayEvents.GuildAuditLogEntryCreate, {
          targetId: packet.d.target_id,
          changes: packet.d.changes?.map((change: RawAuditLogChange) => ({
            newValue: change.new_value,
            oldValue: change.old_value,
            key: change.key,
          })),
          userId: packet.d.user_id,
          id: packet.d.id,
          actionType: packet.d.action_type,
          options:
            packet.d.options !== undefined
              ? {
                  applicationId: packet.d.options.application_id,
                  autoModerationRuleName:
                    packet.d.options.auto_moderation_rule_name,
                  autoModerationRuleTriggerType:
                    packet.d.options.auto_moderation_rule_trigger_type,
                  channelId: packet.d.options.channel_id,
                  count: packet.d.options.count,
                  deleteMemberDays: packet.d.options.delete_member_days,
                  id: packet.d.options.id,
                  membersRemoved: packet.d.options.members_removed,
                  messageId: packet.d.options.message_id,
                  roleName: packet.d.options.role_name,
                  type: packet.d.options.type,
                }
              : undefined,
          reason: packet.d.reason,
        });
        break;
      case "GUILD_BAN_ADD":
        this.client.emit(GatewayEvents.GuildBanAdd, {
          guildId: packet.d.guild_id,
          user: new User(packet.d.user, this.client),
        });
        break;
      case "GUILD_BAN_REMOVE":
        this.client.emit(GatewayEvents.GuildBanRemove, {
          guildId: packet.d.guild_id,
          user: new User(packet.d.user, this.client),
        });
        break;
      case "GUILD_EMOJIS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildEmojisUpdate,
          packet.d.guild_id,
          packet.d.emojis.map(
            (emoji: RawEmoji) => new Emoji(emoji, this.client)
          )
        );
        break;
      case "GUILD_STICKERS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildStickersUpdate,
          packet.d.guild_id,
          packet.d.stickers.map(
            (sticker: RawSticker) => new Sticker(sticker, this.client)
          )
        );
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildIntegrationsUpdate,
          packet.d.guild_id
        );
        break;
      case "GUILD_MEMBER_ADD":
        this.client.emit(
          GatewayEvents.GuildMemberAdd,
          new GuildMember(packet.d, this.client)
        );
        break;
      case "GUILD_MEMBER_REMOVE":
        this.client.emit(GatewayEvents.GuildMemberRemove, {
          guildId: packet.d.guild_id,
          user: new User(packet.d.user, this.client),
        });
        break;
      case "GUILD_MEMBER_UPDATE":
        this.client.emit(GatewayEvents.GuildMemberUpdate, {
          guildId: packet.d.guild_id,
          roles: packet.d.roles,
          user: new User(packet.d.user, this.client),
          nick: packet.d.nick,
          avatar: packet.d.avatar,
          joinedAt: packet.d.joined_at,
          premiumSince: packet.d.premium_since,
          deaf: packet.d.deaf,
          mute: packet.d.mute,
          pending: packet.d.pending,
          communicationDisabledUntil: packet.d.communication_disabled_until,
        });
        break;
      case "GUILD_MEMBERS_CHUNK":
        this.client.emit(GatewayEvents.GuildMembersChunk, {
          guildId: packet.d.guild_id,
          members: packet.d.members.map(
            (member: RawGuildMember) => new GuildMember(member, this.client)
          ),
          chunkIndex: packet.d.chunk_index,
          chunkCount: packet.d.chunk_count,
          notFound: packet.d.not_found,
          presences: packet.d.presences,
          nonce: packet.d.nonce,
        });
        break;
      case "GUILD_ROLE_CREATE":
        this.client.emit(
          GatewayEvents.GuildRoleCreate,
          packet.d.guild_id,
          new Role(packet.d.role, this.client)
        );
        break;
      case "GUILD_ROLE_UPDATE":
        this.client.emit(
          GatewayEvents.GuildRoleUpdate,
          packet.d.guild_id,
          new Role(packet.d.role, this.client)
        );
        break;
      case "GUILD_ROLE_DELETE":
        this.client.emit(
          GatewayEvents.GuildRoleDelete,
          packet.d.guild_id,
          packet.d.role_id
        );
        break;
      case "GUILD_SCHEDULED_EVENT_CREATE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventCreate,
          new GuildScheduledEvent(packet.d, this.client)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_UPDATE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUpdate,
          new GuildScheduledEvent(packet.d, this.client)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_DELETE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventDelete,
          new GuildScheduledEvent(packet.d, this.client).toJSON()
        );
        break;
      case "GUILD_SCHEDULED_EVENT_USER_ADD":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUserAdd,
          packet.d.guild_scheduled_event_id,
          packet.d.user_id,
          packet.d.guild_id
        );
        break;
      case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUserRemove,
          packet.d.guild_scheduled_event_id,
          packet.d.user_id,
          packet.d.guild_id
        );
        break;
      case "INTEGRATION_CREATE":
        this.client.emit(
          GatewayEvents.IntegrationCreate,
          new Integration(packet.d, this.client)
        );
        break;
      case "INTEGRATION_UPDATE":
        this.client.emit(
          GatewayEvents.IntegrationUpdate,
          new Integration(packet.d, this.client)
        );
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
          new Interaction(packet.d, this.client)
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
              ? new User(packet.d.inviter, this.client)
              : undefined,
          maxAge: packet.d.max_age,
          maxUses: packet.d.max_uses,
          targetType: packet.d.target_type,
          targetUser:
            packet.d.target_user !== undefined
              ? new User(packet.d.target_user, this.client)
              : undefined,
          targetApplication:
            packet.d.target_application !== undefined
              ? new Application(packet.d.target_application, this.client)
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
        this.client.emit(
          GatewayEvents.MessageCreate,
          new Message(packet.d, this.client)
        );
        break;
      case "MESSAGE_UPDATE":
        this.client.emit(
          GatewayEvents.MessageUpdate,
          new Message(packet.d, this.client)
        );
        break;
      case "MESSAGE_DELETE":
        this.client.emit(
          GatewayEvents.MessageDelete,
          new Message(packet.d, this.client).toJSON()
        );
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
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
          member:
            packet.d.member !== undefined
              ? new GuildMember(packet.d.member, this.client)
              : undefined,
          emoji: new Emoji(packet.d.emoji, this.client),
          messageAuthorId: packet.d.message_author_id,
        });
        break;
      case "MESSAGE_REACTION_REMOVE":
        this.client.emit(GatewayEvents.MessageReactionRemove, {
          userId: packet.d.user_id,
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
          emoji: new Emoji(packet.d.emoji, this.client),
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
          emoji: new Emoji(packet.d.emoji, this.client),
        });
        break;
      case "PRESENCE_UPDATE":
        this.client.emit(GatewayEvents.PresenceUpdate, {
          user: new User(packet.d.user, this.client),
          guildId: packet.d.guild_id,
          status: packet.d.status,
          activities: packet.d.activities.map((activity: RawActivity) => ({
            name: activity.name,
            type: activity.type,
            url: activity.url,
            createdAt: activity.created_at,
            timestamps: {
              start: activity.timestamps?.start,
              end: activity.timestamps?.end,
            },
            applicationId: activity.application_id,
            details: activity.details,
            state: activity.state,
            party: activity.party,
            assets: {
              largeImage: activity.assets?.large_image,
              largeText: activity.assets?.large_text,
              smallImage: activity.assets?.small_image,
              smallText: activity.assets?.small_text,
            },
            secrets: activity.secrets,
            instance: activity.instance,
            flags: activity.flags,
            buttons: activity.buttons,
          })),
          clientStatus: {
            desktop: packet.d.client_status.desktop,
            mobile: packet.d.client_status.mobile,
            web: packet.d.client_status.web,
          },
        });
        break;
      case "STAGE_INSTANCE_CREATE":
        this.client.emit(
          GatewayEvents.StageInstanceCreate,
          new StageInstance(packet.d, this.client)
        );
        break;
      case "STAGE_INSTANCE_UPDATE":
        this.client.emit(
          GatewayEvents.StageInstanceUpdate,
          new StageInstance(packet.d, this.client)
        );
        break;
      case "STAGE_INSTANCE_DELETE":
        this.client.emit(
          GatewayEvents.StageInstanceDelete,
          new StageInstance(packet.d, this.client).toJSON()
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
              ? new GuildMember(packet.d.member, this.client)
              : undefined,
        });
        break;
      case "USER_UPDATE":
        this.client.emit(
          GatewayEvents.UserUpdate,
          new User(packet.d, this.client)
        );
        break;
      case "VOICE_STATE_UPDATE":
        this.client.emit(
          GatewayEvents.VoiceStateUpdate,
          new VoiceState(packet.d, this.client)
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
          packet.d.guild_id,
          packet.d.channel_id
        );
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
}
