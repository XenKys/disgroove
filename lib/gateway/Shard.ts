import WebSocket, { type RawData } from "ws";
import { GatewayEvents, GatewayOPCodes, StatusTypes } from "../constants";
import { GatewayError } from "../utils";
import type {
  Activity,
  RawEmoji,
  RawSticker,
  VoiceServerUpdateEventFields,
  VoiceState,
  Role,
  User,
  TypingStartEventFields,
  StageInstance,
  PresenceUpdateEventFields,
  MessageReactionRemoveEmojiEventFields,
  GuildApplicationCommandPermissions,
  AutoModerationRule,
  AutoModerationActionExecutionEventFields,
  Channel,
  ChannelPinsUpdateEventFields,
  ThreadListSyncEventFields,
  ThreadMember,
  ThreadMembersUpdateEventFields,
  Entitlement,
  Guild,
  UnavailableGuild,
  AuditLogEntry,
  GuildBanAddEventFields,
  GuildBanRemoveEventFields,
  Emoji,
  Sticker,
  GuildMember,
  GuildMemberAddEventExtraFields,
  GuildMemberRemoveEventFields,
  GuildMemberUpdateEventFields,
  GuildMembersChunkEventFields,
  GuildScheduledEvent,
  Integration,
  IntegrationCreateEventExtraFields,
  IntegrationUpdateEventExtraFields,
  IntegrationDeleteEventFields,
  Interaction,
  InviteCreateEventFields,
  InviteDeleteEventFields,
  MessageCreateEventExtraFields,
  Message,
  MessageDeleteEventFields,
  MessageDeleteBulkEventFields,
  MessageReactionAddEventFields,
  MessageReactionRemoveEventFields,
  MessageReactionRemoveAllEventFields,
  ThreadMemberUpdateEventExtraFields,
  MessagePollVoteAddFields,
  MessagePollVoteRemoveFields,
} from "../types";
import { Client } from "../Client";
import * as pkg from "../../package.json";

export class Shard {
  id: number;
  private heartbeatInterval!: NodeJS.Timeout | null;
  client: Client;
  ws: WebSocket;

  constructor(id: number, client: Client) {
    this.id = id;
    this.client = client;
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  setPresence(options: {
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
  connect(): void {
    this.ws.on("open", () => this.onWebSocketOpen());
    this.ws.on("message", (data) => this.onWebSocketMessage(data));
    this.ws.on("error", (err) => this.onWebSocketError(err));
    this.ws.on("close", (code, reason) => this.onWebSocketClose(code, reason));
  }

  disconnect(): void {
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
            browser: pkg.name,
            device: pkg.name,
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
          this.client.user = this.client.util.toCamelCase<User>(packet.d.user);
          this.client.guilds = new Map();
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
          this.client.util.toCamelCase<GuildApplicationCommandPermissions>(
            packet.d
          )
        );
        break;
      case "AUTO_MODERATION_RULE_CREATE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleCreate,
          this.client.util.toCamelCase<AutoModerationRule>(packet.d)
        );
        break;
      case "AUTO_MODERATION_RULE_UPDATE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleUpdate,
          this.client.util.toCamelCase<AutoModerationRule>(packet.d)
        );
        break;
      case "AUTO_MODERATION_RULE_DELETE":
        this.client.emit(
          GatewayEvents.AutoModerationRuleDelete,
          this.client.util.toCamelCase<AutoModerationRule>(packet.d)
        );
        break;
      case "AUTO_MODERATION_ACTION_EXECUTION":
        this.client.emit(
          GatewayEvents.AutoModerationActionExecution,
          this.client.util.toCamelCase<AutoModerationActionExecutionEventFields>(
            packet.d
          )
        );
        break;
      case "CHANNEL_CREATE":
        this.client.emit(
          GatewayEvents.ChannelCreate,
          this.client.util.toCamelCase<Channel>(packet.d)
        );
        break;
      case "CHANNEL_UPDATE":
        this.client.emit(
          GatewayEvents.ChannelUpdate,
          this.client.util.toCamelCase<Channel>(packet.d)
        );
        break;
      case "CHANNEL_DELETE":
        this.client.emit(
          GatewayEvents.ChannelDelete,
          this.client.util.toCamelCase<Channel>(packet.d)
        );
        break;
      case "CHANNEL_PINS_UPDATE":
        this.client.emit(
          GatewayEvents.ChannelPinsUpdate,
          this.client.util.toCamelCase<ChannelPinsUpdateEventFields>(packet.d)
        );
        break;
      case "THREAD_CREATE":
        this.client.emit(
          GatewayEvents.ThreadCreate,
          this.client.util.toCamelCase<Channel>(packet.d)
        );
        break;
      case "THREAD_UPDATE":
        this.client.emit(
          GatewayEvents.ThreadUpdate,
          this.client.util.toCamelCase<Channel>(packet.d)
        );
        break;
      case "THREAD_DELETE":
        this.client.emit(
          GatewayEvents.ThreadDelete,
          this.client.util.toCamelCase<Channel>(packet.d)
        );
        break;
      case "THREAD_LIST_SYNC":
        this.client.emit(
          GatewayEvents.ThreadListSync,
          this.client.util.toCamelCase<ThreadListSyncEventFields>(packet.d)
        );
        break;
      case "THREAD_MEMBER_UPDATE":
        this.client.emit(
          GatewayEvents.ThreadMemberUpdate,
          this.client.util.toCamelCase<
            ThreadMember & ThreadMemberUpdateEventExtraFields
          >(packet.d)
        );
        break;
      case "THREAD_MEMBERS_UPDATE":
        this.client.emit(
          GatewayEvents.ThreadMembersUpdate,
          this.client.util.toCamelCase<ThreadMembersUpdateEventFields>(packet.d)
        );
        break;
      case "ENTITLEMENT_CREATE":
        this.client.emit(
          GatewayEvents.EntitlementCreate,
          this.client.util.toCamelCase<Entitlement>(packet.d)
        );
        break;
      case "ENTITLEMENT_UPDATE":
        this.client.emit(
          GatewayEvents.EntitlementUpdate,
          this.client.util.toCamelCase<Entitlement>(packet.d)
        );
        break;
      case "ENTITLEMENT_DELETE":
        this.client.emit(
          GatewayEvents.EntitlementDelete,
          this.client.util.toCamelCase<Entitlement>(packet.d)
        );
        break;
      case "GUILD_CREATE":
        {
          this.client.guildShardMap[packet.d.id] = this.id;

          this.client.guilds.set(
            packet.d.id,
            this.client.util.toCamelCase<Guild>(packet.d)
          );

          this.client.emit(
            GatewayEvents.GuildCreate,
            this.client.util.toCamelCase<Guild>(packet.d)
          );
        }
        break;
      case "GUILD_UPDATE":
        {
          this.client.guilds.set(
            packet.d.id,
            this.client.util.toCamelCase<Guild>(packet.d)
          );
          this.client.emit(
            GatewayEvents.GuildUpdate,
            this.client.util.toCamelCase<Guild>(packet.d)
          );
        }
        break;
      case "GUILD_DELETE":
        {
          delete this.client.guildShardMap[packet.d.id];

          this.client.guilds.delete(packet.d.id);

          this.client.emit(
            GatewayEvents.GuildDelete,
            this.client.util.toCamelCase<UnavailableGuild>(packet.d)
          );
        }
        break;
      case "GUILD_AUDIT_LOG_ENTRY_CREATE":
        this.client.emit(
          GatewayEvents.GuildAuditLogEntryCreate,
          this.client.util.toCamelCase<AuditLogEntry>(packet.d)
        );
        break;
      case "GUILD_BAN_ADD":
        this.client.emit(
          GatewayEvents.GuildBanAdd,
          this.client.util.toCamelCase<GuildBanAddEventFields>(packet.d)
        );
        break;
      case "GUILD_BAN_REMOVE":
        this.client.emit(
          GatewayEvents.GuildBanRemove,
          this.client.util.toCamelCase<GuildBanRemoveEventFields>(packet.d)
        );
        break;
      case "GUILD_EMOJIS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildEmojisUpdate,
          packet.d.emojis.map((emoji: RawEmoji) =>
            this.client.util.toCamelCase<Emoji>(emoji)
          ),
          packet.d.guild_id
        );
        break;
      case "GUILD_STICKERS_UPDATE":
        this.client.emit(
          GatewayEvents.GuildStickersUpdate,
          packet.d.stickers.map((sticker: RawSticker) =>
            this.client.util.toCamelCase<Sticker>(sticker)
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
        this.client.emit(
          GatewayEvents.GuildMemberAdd,
          this.client.util.toCamelCase<
            GuildMember & GuildMemberAddEventExtraFields
          >(packet.d)
        );
        break;
      case "GUILD_MEMBER_REMOVE":
        this.client.emit(
          GatewayEvents.GuildMemberRemove,
          this.client.util.toCamelCase<GuildMemberRemoveEventFields>(packet.d)
        );
        break;
      case "GUILD_MEMBER_UPDATE":
        this.client.emit(
          GatewayEvents.GuildMemberUpdate,
          this.client.util.toCamelCase<GuildMemberUpdateEventFields>(packet.d)
        );
        break;
      case "GUILD_MEMBERS_CHUNK":
        this.client.emit(
          GatewayEvents.GuildMembersChunk,
          this.client.util.toCamelCase<GuildMembersChunkEventFields>(packet.d)
        );
        break;
      case "GUILD_ROLE_CREATE":
        this.client.emit(
          GatewayEvents.GuildRoleCreate,
          this.client.util.toCamelCase<Role>(packet.d.role),
          packet.d.guild_id
        );
        break;
      case "GUILD_ROLE_UPDATE":
        this.client.emit(
          GatewayEvents.GuildRoleUpdate,
          this.client.util.toCamelCase<Role>(packet.d.role),
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
          this.client.util.toCamelCase<GuildScheduledEvent>(packet.d)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_UPDATE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventUpdate,
          this.client.util.toCamelCase<GuildScheduledEvent>(packet.d)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_DELETE":
        this.client.emit(
          GatewayEvents.GuildScheduledEventDelete,
          this.client.util.toCamelCase<GuildScheduledEvent>(packet.d)
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
        this.client.emit(
          GatewayEvents.IntegrationCreate,
          this.client.util.toCamelCase<
            Integration & IntegrationCreateEventExtraFields
          >(packet.d)
        );
        break;
      case "INTEGRATION_UPDATE":
        this.client.emit(
          GatewayEvents.IntegrationUpdate,
          this.client.util.toCamelCase<
            Integration & IntegrationUpdateEventExtraFields
          >(packet.d)
        );
        break;
      case "INTEGRATION_DELETE":
        this.client.emit(
          GatewayEvents.IntegrationDelete,
          this.client.util.toCamelCase<IntegrationDeleteEventFields>(packet.d)
        );
        break;
      case "INTERACTION_CREATE":
        this.client.emit(
          GatewayEvents.InteractionCreate,
          this.client.util.toCamelCase<Interaction>(packet.d)
        );
        break;
      case "INVITE_CREATE":
        this.client.emit(
          GatewayEvents.InviteCreate,
          this.client.util.toCamelCase<InviteCreateEventFields>(packet.d)
        );
        break;
      case "INVITE_DELETE":
        this.client.emit(
          GatewayEvents.InviteDelete,
          this.client.util.toCamelCase<InviteDeleteEventFields>(packet.d)
        );
        break;
      case "MESSAGE_CREATE":
        this.client.emit(
          GatewayEvents.MessageCreate,
          this.client.util.toCamelCase<Message & MessageCreateEventExtraFields>(
            packet.d
          )
        );
        break;
      case "MESSAGE_UPDATE":
        this.client.emit(
          GatewayEvents.MessageUpdate,
          this.client.util.toCamelCase<Message>(packet.d)
        );
        break;
      case "MESSAGE_DELETE":
        this.client.emit(
          GatewayEvents.MessageDelete,
          this.client.util.toCamelCase<MessageDeleteEventFields>(packet.d)
        );
        break;
      case "MESSAGE_DELETE_BULK":
        this.client.emit(
          GatewayEvents.MessageDeleteBulk,
          this.client.util.toCamelCase<MessageDeleteBulkEventFields>(packet.d)
        );
        break;
      case "MESSAGE_REACTION_ADD":
        this.client.emit(
          GatewayEvents.MessageReactionAdd,
          this.client.util.toCamelCase<MessageReactionAddEventFields>(packet.d)
        );
        break;
      case "MESSAGE_REACTION_REMOVE":
        this.client.emit(
          GatewayEvents.MessageReactionRemove,
          this.client.util.toCamelCase<MessageReactionRemoveEventFields>(
            packet.d
          )
        );
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        this.client.emit(
          GatewayEvents.MessageReactionRemoveAll,
          this.client.util.toCamelCase<MessageReactionRemoveAllEventFields>(
            packet.d
          )
        );
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        this.client.emit(
          GatewayEvents.MessageReactionRemoveEmoji,
          this.client.util.toCamelCase<MessageReactionRemoveEmojiEventFields>(
            packet.d
          )
        );
        break;
      case "PRESENCE_UPDATE":
        this.client.emit(
          GatewayEvents.PresenceUpdate,
          this.client.util.toCamelCase<PresenceUpdateEventFields>(packet.d)
        );
        break;
      case "STAGE_INSTANCE_CREATE":
        this.client.emit(
          GatewayEvents.StageInstanceCreate,
          this.client.util.toCamelCase<StageInstance>(packet.d)
        );
        break;
      case "STAGE_INSTANCE_UPDATE":
        this.client.emit(
          GatewayEvents.StageInstanceUpdate,
          this.client.util.toCamelCase<StageInstance>(packet.d)
        );
        break;
      case "STAGE_INSTANCE_DELETE":
        this.client.emit(
          GatewayEvents.StageInstanceDelete,
          this.client.util.toCamelCase<StageInstance>(packet.d)
        );
        break;
      case "TYPING_START":
        this.client.emit(
          GatewayEvents.TypingStart,
          this.client.util.toCamelCase<TypingStartEventFields>(packet.d)
        );
        break;
      case "USER_UPDATE":
        this.client.emit(
          GatewayEvents.UserUpdate,
          this.client.util.toCamelCase<User>(packet.d)
        );
        break;
      case "VOICE_STATE_UPDATE":
        this.client.emit(
          GatewayEvents.VoiceStateUpdate,
          this.client.util.toCamelCase<VoiceState>(packet.d)
        );
        break;
      case "VOICE_SERVER_UPDATE":
        this.client.emit(
          GatewayEvents.VoiceServerUpdate,
          this.client.util.toCamelCase<VoiceServerUpdateEventFields>(packet.d)
        );
        break;
      case "WEBHOOKS_UPDATE":
        this.client.emit(
          GatewayEvents.WebhooksUpdate,
          packet.d.channel_id,
          packet.d.guild_id
        );
        break;
      case "MESSAGE_POLL_VOTE_ADD":
        this.client.emit(
          GatewayEvents.MessagePollVoteAdd,
          this.client.util.toCamelCase<MessagePollVoteAddFields>(packet.d)
        );
        break;
      case "MESSAGE_POLL_VOTE_REMOVE":
        this.client.emit(
          GatewayEvents.MessagePollVoteRemove,
          this.client.util.toCamelCase<MessagePollVoteRemoveFields>(packet.d)
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
