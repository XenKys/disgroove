import WebSocket, { type RawData } from "ws";
import {
  type DefaultMessageNotificationLevel,
  type ExplicitContentFilterLevel,
  GatewayEvents,
  GatewayIntents,
  GatewayOPCodes,
  type OAuth2Scopes,
  type PrivacyLevel,
  StatusTypes,
  type SystemChannelFlags,
  type VerificationLevel,
} from "./constants";
import { GatewayError, Util } from "./utils";
import { Endpoints, REST } from "./rest";
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
  Invite,
  Message,
  Role,
  StageInstance,
  User,
  VoiceState,
  PartialApplication,
  UnavailableGuild,
} from "./structures";
import type {
  Activity,
  JSONAuditLogEntry,
  AutoModerationActionExecutionEventFields,
  JSONAutoModerationRule,
  JSONChannel,
  ChannelPinsUpdateEventFields,
  JSONGuildApplicationCommandPermissions,
  GuildBanAddEventFields,
  GuildBanRemoveEventFields,
  GuildDeleteEventFields,
  GuildEmojisUpdateEventFields,
  GuildIntegrationsUpdateEventFields,
  GuildMemberRemoveEventFields,
  GuildMemberUpdateEventFields,
  GuildMembersChunkEventFields,
  GuildRoleCreateEventFields,
  GuildRoleDeleteEventFields,
  GuildRoleUpdateEventFields,
  JSONGuildScheduledEvent,
  GuildScheduledEventUserAddEventFields,
  GuildScheduledEventUserRemoveEventFields,
  GuildStickersUpdateEventFields,
  IntegrationDeleteEventFields,
  JSONInvite,
  InviteCreateEventFields,
  InviteDeleteEventFields,
  MessageDeleteBulkEventFields,
  MessageDeleteEventFields,
  MessageReactionAddEventFields,
  MessageReactionRemoveAllEventFields,
  MessageReactionRemoveEmojiEventFields,
  MessageReactionRemoveEventFields,
  PresenceUpdateEventFields,
  JSONRole,
  JSONStageInstance,
  JSONStickerPack,
  ThreadListSyncEventFields,
  JSONThreadMember,
  ThreadMembersUpdateEventFields,
  TypingStartEventFields,
  JSONVoiceRegion,
  VoiceServerUpdateEventFields,
  WebhooksUpdateEventFields,
  RawActivity,
  RawApplication,
  RawApplicationCommandPermission,
  RawChannel,
  RawEmoji,
  RawGuild,
  RawGuildMember,
  RawInvite,
  RawStageInstance,
  RawSticker,
  RawStickerPack,
  RawThreadMember,
  RawUser,
  RawVoiceRegion,
  HelloEventFields,
  RawAuditLogChange,
  ReadyEventFields,
  RawUnavailableGuild,
} from "./types";
import EventEmitter from "node:events";

export interface ClientEvents {
  hello: [listener: HelloEventFields];
  ready: [listener: ReadyEventFields];
  resumed: [];
  reconnect: [];
  invalidSession: [];
  applicationCommandPermissionsUpdate: [
    listener: JSONGuildApplicationCommandPermissions
  ];
  autoModerationRuleCreate: [listener: AutoModerationRule];
  autoModerationRuleUpdate: [listener: AutoModerationRule];
  autoModerationRuleDelete: [listener: JSONAutoModerationRule];
  autoModerationActionExecution: [
    listener: AutoModerationActionExecutionEventFields
  ];
  channelCreate: [listener: Channel];
  channelUpdate: [listener: Channel];
  channelDelete: [listener: JSONChannel];
  threadCreate: [listener: Channel];
  threadUpdate: [listener: Channel];
  threadDelete: [listener: JSONChannel];
  threadListSync: [listener: ThreadListSyncEventFields];
  threadMemberUpdate: [
    listener: JSONThreadMember & {
      guildId: string;
    }
  ];
  threadMembersUpdate: [listener: ThreadMembersUpdateEventFields];
  channelPinsUpdate: [listener: ChannelPinsUpdateEventFields];
  guildCreate: [listener: Guild];
  guildUpdate: [listener: Guild];
  guildDelete: [listener: GuildDeleteEventFields];
  guildAuditLogEntryCreate: [listener: JSONAuditLogEntry];
  guildBanAdd: [listener: GuildBanAddEventFields];
  guildBanRemove: [listener: GuildBanRemoveEventFields];
  guildEmojisUpdate: [listener: GuildEmojisUpdateEventFields];
  guildStickersUpdate: [listener: GuildStickersUpdateEventFields];
  guildIntegrationsUpdate: [listener: GuildIntegrationsUpdateEventFields];
  guildMemberAdd: [listener: GuildMember];
  guildMemberRemove: [listener: GuildMemberRemoveEventFields];
  guildMemberUpdate: [listener: GuildMemberUpdateEventFields];
  guildMembersChunk: [listener: GuildMembersChunkEventFields];
  guildRoleCreate: [listener: GuildRoleCreateEventFields];
  guildRoleUpdate: [listener: GuildRoleUpdateEventFields];
  guildRoleDelete: [listener: GuildRoleDeleteEventFields];
  guildScheduledEventCreate: [listener: GuildScheduledEvent];
  guildScheduledEventUpdate: [listener: GuildScheduledEvent];
  guildScheduledEventDelete: [listener: JSONGuildScheduledEvent];
  guildScheduledEventUserAdd: [listener: GuildScheduledEventUserAddEventFields];
  guildScheduledEventUserRemove: [
    listener: GuildScheduledEventUserRemoveEventFields
  ];
  integrationCreate: [listener: Integration];
  integrationUpdate: [listener: Integration];
  integrationDelete: [listener: IntegrationDeleteEventFields];
  inviteCreate: [listener: InviteCreateEventFields];
  inviteDelete: [listener: InviteDeleteEventFields];
  messageCreate: [listener: Message];
  messageUpdate: [listener: Message];
  messageDelete: [listener: MessageDeleteEventFields];
  messageDeleteBulk: [listener: MessageDeleteBulkEventFields];
  messageReactionAdd: [listener: MessageReactionAddEventFields];
  messageReactionRemove: [listener: MessageReactionRemoveEventFields];
  messageReactionRemoveAll: [listener: MessageReactionRemoveAllEventFields];
  messageReactionRemoveEmoji: [listener: MessageReactionRemoveEmojiEventFields];
  presenceUpdate: [listener: PresenceUpdateEventFields];
  typingStart: [listener: TypingStartEventFields];
  userUpdate: [listener: User];
  voiceStateUpdate: [listener: VoiceState];
  voiceServerUpdate: [listener: VoiceServerUpdateEventFields];
  webhooksUpdate: [listener: WebhooksUpdateEventFields];
  interactionCreate: [listener: Interaction];
  stageInstanceCreate: [listener: StageInstance];
  stageInstanceUpdate: [listener: StageInstance];
  stageInstanceDelete: [listener: JSONStageInstance];
}

export declare interface Client extends EventEmitter {
  addListener<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
  emit<K extends keyof ClientEvents>(
    eventName: K,
    ...args: ClientEvents[K]
  ): boolean;
  listenerCount(eventName: keyof ClientEvents): number;
  listeners(eventName: keyof ClientEvents): Array<Function>;
  off<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
  on<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
  once<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
  prependListener<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
  prependOnceListener<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
  rawListeners(eventName: keyof ClientEvents): Array<Function>;
  removeAllListeners(event?: keyof ClientEvents): this;
  removeListener<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this;
}

export interface ClientOptions {
  intents?: number | Array<number>;
  shards?: number | "auto";
  auth?: "Bot" | "Bearer";
}

export class Client extends EventEmitter {
  private heartbeatInterval!: NodeJS.Timeout | null;
  public token: string;
  public intents: GatewayIntents | number;
  public shards: number | "auto";
  public auth: "Bot" | "Bearer";
  public rest: REST;
  public ws: WebSocket;
  public util: Util;
  public user!: User;
  public application!: PartialApplication;

  constructor(token: string, options?: ClientOptions) {
    super();

    this.token = token;
    this.intents =
      options?.intents !== undefined
        ? Array.isArray(options.intents)
          ? options.intents.reduce((sum, num) => sum + num, 0)
          : options.intents
        : GatewayIntents.AllNonPrivileged;
    this.shards = options?.shards ?? "auto";
    this.auth = options?.auth ?? "Bot";
    this.rest = new REST(token, this.auth);
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
    this.util = new Util();
  }

  /** https://discord.com/developers/docs/resources/application#get-current-application */
  public async getApplication(): Promise<Application> {
    return new Application(
      await this.rest.get<RawApplication>(Endpoints.applicationCurrentUser()),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel */
  public async getChannel(channelId: string): Promise<Channel> {
    return new Channel(
      await this.rest.get<RawChannel>(Endpoints.channel(channelId)),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild */
  public async createGuild(options: {
    name: string;
    region?: string | null;
    icon?: string;
    verificationLevel?: VerificationLevel;
    defaultMessageNotifications?: DefaultMessageNotificationLevel;
    explicitContentFilter?: ExplicitContentFilterLevel;
    roles?: Array<JSONRole>;
    channels?: Array<JSONChannel>;
    afkChannelId?: string;
    afkTimeout?: number;
    systemChannelId?: string;
    systemChannelFlags?: SystemChannelFlags;
  }): Promise<Guild> {
    return new Guild(
      await this.rest.post<RawGuild>(Endpoints.guilds(), {
        json: {
          name: options.name,
          region: options.region,
          icon: options.icon,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          roles: options.roles?.map((role) => this.util.roleToRaw(role)),
          channels: options.channels?.map((channel) =>
            this.util.channelToRaw(channel)
          ),
          afk_channel_id: options.afkChannelId,
          afk_timeout: options.afkTimeout,
          system_channel_id: options.systemChannelId,
          system_channel_flags: options.systemChannelFlags,
        },
      }),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild */
  public async getGuild(
    guildId: string,
    options?: {
      withCounts?: boolean;
    }
  ): Promise<Guild> {
    return new Guild(
      await this.rest.get<RawGuild>(Endpoints.guild(guildId), {
        query: {
          with_counts: options?.withCounts,
        },
      }),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template */
  public async createGuildFromTemplate(
    code: string,
    options: {
      name: string;
      icon?: string;
    }
  ): Promise<Guild> {
    return new Guild(
      await this.rest.post<RawGuild>(Endpoints.template(code), {
        json: {
          name: options.name,
          icon: options.icon,
        },
      }),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/invite#get-invite */
  public async getInvite(
    code: string,
    options?: {
      withCounts?: boolean;
      withExpiration?: boolean;
      guildScheduledEventId?: string;
    }
  ): Promise<Invite> {
    return new Invite(
      await this.rest.get<RawInvite>(Endpoints.invite(code), {
        query: {
          with_counts: options?.withCounts,
          with_expiration: options?.withExpiration,
          guild_scheduled_event_id: options?.guildScheduledEventId,
        },
      }),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/invite#delete-invite */
  public async deleteInvite(
    code: string,
    reason?: string
  ): Promise<JSONInvite> {
    return new Invite(
      await this.rest.delete<RawInvite>(Endpoints.invite(code), {
        reason,
      }),
      this
    ).toJSON();
  }

  /** https://discord.com/developers/docs/resources/stage-instance#create-stage-instance */
  public async createStageInstance(
    options: {
      channelId: string;
      topic: string;
      privacyLevel?: PrivacyLevel;
      sendStartNotifications?: boolean;
    },
    reason?: string
  ): Promise<StageInstance> {
    return new StageInstance(
      await this.rest.post<RawStageInstance>(Endpoints.stageInstances(), {
        json: {
          channel_id: options.channelId,
          topic: options.topic,
          privacy_level: options.privacyLevel,
          send_start_notifications: options.sendStartNotifications,
        },
        reason,
      }),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#get-stage-instance */
  public async getStageInstance(channelId: string): Promise<StageInstance> {
    return new StageInstance(
      await this.rest.get<RawStageInstance>(Endpoints.stageInstance(channelId)),
      this
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs */
  public async getNitroStickerPacks(): Promise<{
    stickerPacks: Array<JSONStickerPack>;
  }> {
    return this.rest
      .get<{
        sticker_packs: Array<RawStickerPack>;
      }>(Endpoints.nitroStickerPacks())
      .then((response) => ({
        stickerPacks: response.sticker_packs.map((stickerPack) => ({
          id: stickerPack.id,
          stickers: stickerPack.stickers.map((sticker) => ({
            id: sticker.id,
            packId: sticker.pack_id,
            name: sticker.name,
            description: sticker.description,
            tags: sticker.tags,
            asset: sticker.asset,
            type: sticker.type,
            formatType: sticker.format_type,
            available: sticker.available,
            guildId: sticker.guild_id,
            user:
              sticker.user !== undefined
                ? new User(sticker.user, this)
                : undefined,
            sortValue: sticker.sort_value,
          })),
          name: stickerPack.name,
          skuId: stickerPack.sku_id,
          coverStickerId: stickerPack.cover_sticker_id,
          description: stickerPack.description,
          bannerAssetId: stickerPack.banner_asset_id,
        })),
      }));
  }

  /** https://discord.com/developers/docs/resources/user#get-user */
  public async getUser(userId?: string): Promise<User> {
    return new User(await this.rest.get<RawUser>(Endpoints.user(userId)), this);
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
  public async getGuilds(options?: {
    before?: string;
    after?: string;
    limit?: number;
    withCounts?: boolean;
  }): Promise<Array<Guild>> {
    return this.rest
      .get<Array<RawGuild>>(Endpoints.userGuilds(), {
        query: {
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          with_counts: options?.withCounts,
        },
      })
      .then((response) => response.map((data) => new Guild(data, this)));
  }

  /** https://discord.com/developers/docs/resources/voice#list-voice-regions */
  public async getVoiceRegions(): Promise<Array<JSONVoiceRegion>> {
    return this.rest
      .get<Array<RawVoiceRegion>>(Endpoints.voiceRegions())
      .then((response) =>
        response.map((data) => ({
          id: data.id,
          name: data.name,
          optimal: data.optimal,
          deprecated: data.deprecated,
          custom: data.custom,
        }))
      );
  }

  /** https://discord.com/developers/docs/topics/gateway#get-gateway */
  public async getGateway(): Promise<{ url: string }> {
    return this.rest.get<{ url: string }>(Endpoints.gateway());
  }

  /** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
  public async getGatewayBot(): Promise<{
    url: string;
    shards: number;
    sessionStartLimit: {
      total: number;
      remaining: number;
      resetAfter: number;
      maxConcurrency: number;
    };
  }> {
    return this.rest
      .get<{
        url: string;
        shards: number;
        session_start_limit: {
          total: number;
          remaining: number;
          reset_after: number;
          max_concurrency: number;
        };
      }>(Endpoints.gatewayBot())
      .then((response) => ({
        url: response.url,
        shards: response.shards,
        sessionStartLimit: {
          total: response.session_start_limit.total,
          remaining: response.session_start_limit.remaining,
          resetAfter: response.session_start_limit.reset_after,
          maxConcurrency: response.session_start_limit.max_concurrency,
        },
      }));
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

  /** https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information */
  public async getOAuth2Application(): Promise<Application> {
    return new Application(
      await this.rest.get<RawApplication>(Endpoints.oauth2CurrentApplication()),
      this
    );
  }

  /** https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information */
  public async getOAuth2Authorization(): Promise<{
    application: Application;
    scopes: Array<OAuth2Scopes>;
    expires: number;
    user?: User;
  }> {
    return this.rest
      .get<{
        application: RawApplication;
        scopes: Array<OAuth2Scopes>;
        expires: number;
        user?: RawUser;
      }>(Endpoints.oauth2Authorization())
      .then((response) => ({
        application: new Application(response.application, this),
        scopes: response.scopes,
        expires: response.expires,
        user:
          response.user !== undefined
            ? new User(response.user, this)
            : undefined,
      }));
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

  private async onWebSocketOpen(): Promise<void> {
    const shards =
      this.shards !== "auto"
        ? this.shards
        : (await this.getGatewayBot()).shards;

    for (let i = 0; i < shards; i++) {
      this.ws.send(
        JSON.stringify({
          op: GatewayOPCodes.Identify,
          d: {
            token: this.token,
            shard: [i, shards],
            intents: this.intents,
            properties: {
              os: process.platform,
              browser: "disgroove",
              device: "disgroove",
            },
          },
        })
      );
    }
  }

  private onWebSocketMessage(data: RawData): void {
    const packet = JSON.parse(data.toString());

    switch (packet.op) {
      case GatewayOPCodes.Reconnect:
        super.emit(GatewayEvents.Reconnect);
        break;
      case GatewayOPCodes.InvalidSession:
        super.emit(GatewayEvents.InvalidSession);
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

          super.emit(GatewayEvents.Hello, {
            heartbeatInterval: packet.d.heartbeat_interval,
          });
        }
        break;
    }

    switch (packet.t) {
      case "READY":
        {
          this.user = new User(packet.d.user, this);
          this.application = new PartialApplication(packet.d.application, this);

          super.emit(GatewayEvents.Ready, {
            v: packet.d.v,
            guilds: packet.d.guilds.map(
              (guild: RawUnavailableGuild) => new UnavailableGuild(guild, this)
            ),
            sessionId: packet.d.session_id,
            resumeGatewayURL: packet.d.resume_gateway_url,
            shard: packet.d.shard,
          });
        }
        break;
      case "RESUMED":
        super.emit(GatewayEvents.Resumed);
        break;
      case "APPLICATION_COMMAND_PERMISSIONS_UPDATE":
        super.emit(GatewayEvents.ApplicationCommandPermissionsUpdate, {
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
        super.emit(
          GatewayEvents.AutoModerationRuleCreate,
          new AutoModerationRule(packet.d, this)
        );
        break;
      case "AUTO_MODERATION_RULE_UPDATE":
        super.emit(
          GatewayEvents.AutoModerationRuleUpdate,
          new AutoModerationRule(packet.d, this)
        );
        break;
      case "AUTO_MODERATION_RULE_DELETE":
        super.emit(
          GatewayEvents.AutoModerationRuleDelete,
          new AutoModerationRule(packet.d, this).toJSON()
        );
        break;
      case "AUTO_MODERATION_ACTION_EXECUTION":
        super.emit(GatewayEvents.AutoModerationActionExecution, {
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
        super.emit(GatewayEvents.ChannelCreate, new Channel(packet.d, this));
        break;
      case "CHANNEL_UPDATE":
        super.emit(GatewayEvents.ChannelUpdate, new Channel(packet.d, this));
        break;
      case "CHANNEL_DELETE":
        super.emit(
          GatewayEvents.ChannelDelete,
          new Channel(packet.d, this).toJSON()
        );
        break;
      case "CHANNEL_PINS_UPDATE":
        super.emit(GatewayEvents.ChannelPinsUpdate, {
          guildId: packet.d.guild_id,
          channelId: packet.d.channel_id,
          lastPinTimestamp: packet.d.last_pin_timestamp,
        });
        break;
      case "THREAD_CREATE":
        super.emit(GatewayEvents.ThreadCreate, new Channel(packet.d, this));
        break;
      case "THREAD_UPDATE":
        super.emit(GatewayEvents.ThreadUpdate, new Channel(packet.d, this));
        break;
      case "THREAD_DELETE":
        super.emit(
          GatewayEvents.ThreadDelete,
          new Channel(packet.d, this).toJSON()
        );
        break;
      case "THREAD_LIST_SYNC":
        super.emit(GatewayEvents.ThreadListSync, {
          guildId: packet.d.guild_id,
          channelIds: packet.d.channel_ids,
          threads: packet.d.threads.map(
            (channel: RawChannel) => new Channel(channel, this)
          ),
          members: packet.d.members.map((member: RawThreadMember) => ({
            id: member.id,
            userId: member.user_id,
            joinTimestamp: member.join_timestamp,
            flags: member.flags,
            member:
              member.member !== undefined
                ? new GuildMember(member.member, this)
                : undefined,
          })),
        });
        break;
      case "THREAD_MEMBER_UPDATE":
        super.emit(GatewayEvents.ThreadMemberUpdate, {
          id: packet.d.id,
          userId: packet.d.user_id,
          joinTimestamp: packet.d.join_timestamp,
          flags: packet.d.flags,
          member:
            packet.d.member !== undefined
              ? new GuildMember(packet.d.member, this)
              : undefined,
          guildId: packet.d.guild_id,
        });
        break;
      case "THREAD_MEMBERS_UPDATE":
        super.emit(GatewayEvents.ThreadMembersUpdate, {
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
                  ? new GuildMember(member.member, this)
                  : undefined,
            })
          ),
          removedMemberIds: packet.d.removed_member_ids,
        });
        break;
      case "GUILD_CREATE":
        super.emit(GatewayEvents.GuildCreate, new Guild(packet.d, this));
        break;
      case "GUILD_UPDATE":
        super.emit(GatewayEvents.GuildUpdate, new Guild(packet.d, this));
        break;
      case "GUILD_DELETE":
        super.emit(GatewayEvents.GuildDelete, {
          id: packet.d.id,
          unavailable: packet.d.unavailable,
        });
        break;
      case "GUILD_AUDIT_LOG_ENTRY_CREATE":
        super.emit(GatewayEvents.GuildAuditLogEntryCreate, {
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
        super.emit(GatewayEvents.GuildBanAdd, {
          guildId: packet.d.guild_id,
          user: new User(packet.d.user, this),
        });
        break;
      case "GUILD_BAN_REMOVE":
        super.emit(GatewayEvents.GuildBanRemove, {
          guildId: packet.d.guild_id,
          user: new User(packet.d.user, this),
        });
        break;
      case "GUILD_EMOJIS_UPDATE":
        super.emit(GatewayEvents.GuildEmojisUpdate, {
          guildId: packet.d.guild_id,
          emojis: packet.d.emojis.map((emoji: RawEmoji) =>
            new Emoji(emoji, this).toJSON()
          ),
        });
        break;
      case "GUILD_STICKERS_UPDATE":
        super.emit(GatewayEvents.GuildStickersUpdate, {
          guildId: packet.d.guild_id,
          stickers: packet.d.stickers.map((sticker: RawSticker) => ({
            id: sticker.id,
            packId: sticker.pack_id,
            name: sticker.name,
            description: sticker.description,
            tags: sticker.tags,
            asset: sticker.asset,
            type: sticker.type,
            formatType: sticker.format_type,
            available: sticker.available,
            guildId: sticker.guild_id,
            user:
              sticker.user !== undefined
                ? new User(sticker.user, this)
                : undefined,
            sortValue: sticker.sort_value,
          })),
        });
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        super.emit(GatewayEvents.GuildIntegrationsUpdate, {
          guildId: packet.d.guild_id,
        });
        break;
      case "GUILD_MEMBER_ADD":
        super.emit(
          GatewayEvents.GuildMemberAdd,
          new GuildMember(packet.d, this)
        );
        break;
      case "GUILD_MEMBER_REMOVE":
        super.emit(GatewayEvents.GuildMemberRemove, {
          guildId: packet.d.guild_id,
          user: new User(packet.d.user, this),
        });
        break;
      case "GUILD_MEMBER_UPDATE":
        super.emit(GatewayEvents.GuildMemberUpdate, {
          guildId: packet.d.guild_id,
          roles: packet.d.roles,
          user: new User(packet.d.user, this),
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
        super.emit(GatewayEvents.GuildMembersChunk, {
          guildId: packet.d.guild_id,
          members: packet.d.members.map(
            (member: RawGuildMember) => new GuildMember(member, this)
          ),
          chunkIndex: packet.d.chunk_index,
          chunkCount: packet.d.chunk_count,
          notFound: packet.d.not_found,
          presences: packet.d.presences,
          nonce: packet.d.nonce,
        });
        break;
      case "GUILD_ROLE_CREATE":
        super.emit(GatewayEvents.GuildRoleCreate, {
          guildId: packet.d.guild_id,
          role: new Role(packet.d.role, this),
        });
        break;
      case "GUILD_ROLE_UPDATE":
        super.emit(GatewayEvents.GuildRoleUpdate, {
          guildId: packet.d.guild_id,
          role: new Role(packet.d.role, this),
        });
        break;
      case "GUILD_ROLE_DELETE":
        super.emit(GatewayEvents.GuildRoleDelete, {
          guildId: packet.d.guild_id,
          roleId: packet.d.role_id,
        });
        break;
      case "GUILD_SCHEDULED_EVENT_CREATE":
        super.emit(
          GatewayEvents.GuildScheduledEventCreate,
          new GuildScheduledEvent(packet.d, this)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_UPDATE":
        super.emit(
          GatewayEvents.GuildScheduledEventUpdate,
          new GuildScheduledEvent(packet.d, this)
        );
        break;
      case "GUILD_SCHEDULED_EVENT_DELETE":
        super.emit(
          GatewayEvents.GuildScheduledEventDelete,
          new GuildScheduledEvent(packet.d, this).toJSON()
        );
        break;
      case "GUILD_SCHEDULED_EVENT_USER_ADD":
        super.emit(GatewayEvents.GuildScheduledEventUserAdd, {
          guildScheduledEventId: packet.d.guild_scheduled_event_id,
          userId: packet.d.user_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
        super.emit(GatewayEvents.GuildScheduledEventUserRemove, {
          guildScheduledEventId: packet.d.guild_scheduled_event_id,
          userId: packet.d.user_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "INTEGRATION_CREATE":
        super.emit(
          GatewayEvents.IntegrationCreate,
          new Integration(packet.d, this)
        );
        break;
      case "INTEGRATION_UPDATE":
        super.emit(
          GatewayEvents.IntegrationUpdate,
          new Integration(packet.d, this)
        );
        break;
      case "INTEGRATION_DELETE":
        super.emit(GatewayEvents.IntegrationDelete, {
          id: packet.d.id,
          guildId: packet.d.guild_id,
          applicationId: packet.d.application_id,
        });
        break;
      case "INTERACTION_CREATE":
        super.emit(
          GatewayEvents.InteractionCreate,
          new Interaction(packet.d, this)
        );
        break;
      case "INVITE_CREATE":
        super.emit(GatewayEvents.InviteCreate, {
          channelId: packet.d.channel_id,
          code: packet.d.code,
          createdAt: packet.d.created_at,
          guildId: packet.d.guild_id,
          inviter:
            packet.d.inviter !== undefined
              ? new User(packet.d.inviter, this)
              : undefined,
          maxAge: packet.d.max_age,
          maxUses: packet.d.max_uses,
          targetType: packet.d.target_type,
          targetUser:
            packet.d.target_user !== undefined
              ? new User(packet.d.target_user, this)
              : undefined,
          targetApplication:
            packet.d.target_application !== undefined
              ? new Application(packet.d.target_application, this)
              : undefined,
          temporary: packet.d.temporary,
          uses: packet.d.uses,
        });
        break;
      case "INVITE_DELETE":
        super.emit(GatewayEvents.InviteDelete, {
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
          code: packet.d.code,
        });
        break;
      case "MESSAGE_CREATE":
        super.emit(GatewayEvents.MessageCreate, new Message(packet.d, this));
        break;
      case "MESSAGE_UPDATE":
        super.emit(GatewayEvents.MessageUpdate, new Message(packet.d, this));
        break;
      case "MESSAGE_DELETE":
        super.emit(
          GatewayEvents.MessageDelete,
          new Message(packet.d, this).toJSON()
        );
        break;
      case "MESSAGE_DELETE_BULK":
        super.emit(GatewayEvents.MessageDeleteBulk, {
          ids: packet.d.ids,
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "MESSAGE_REACTION_ADD":
        super.emit(GatewayEvents.MessageReactionAdd, {
          userId: packet.d.user_id,
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
          member:
            packet.d.member !== undefined
              ? new GuildMember(packet.d.member, this)
              : undefined,
          emoji: new Emoji(packet.d.emoji, this),
          messageAuthorId: packet.d.message_author_id,
        });
        break;
      case "MESSAGE_REACTION_REMOVE":
        super.emit(GatewayEvents.MessageReactionRemove, {
          userId: packet.d.user_id,
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
          emoji: new Emoji(packet.d.emoji, this),
        });
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        super.emit(GatewayEvents.MessageReactionRemoveAll, {
          channelId: packet.d.channel_id,
          messageId: packet.d.message_id,
          guildId: packet.d.guild_id,
        });
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        super.emit(GatewayEvents.MessageReactionRemoveEmoji, {
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
          messageId: packet.d.message_id,
          emoji: new Emoji(packet.d.emoji, this),
        });
        break;
      case "PRESENCE_UPDATE":
        super.emit(GatewayEvents.PresenceUpdate, {
          user: new User(packet.d.user, this),
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
        super.emit(
          GatewayEvents.StageInstanceCreate,
          new StageInstance(packet.d, this)
        );
        break;
      case "STAGE_INSTANCE_UPDATE":
        super.emit(
          GatewayEvents.StageInstanceUpdate,
          new StageInstance(packet.d, this)
        );
        break;
      case "STAGE_INSTANCE_DELETE":
        super.emit(
          GatewayEvents.StageInstanceDelete,
          new StageInstance(packet.d, this).toJSON()
        );
        break;
      case "TYPING_START":
        super.emit(GatewayEvents.TypingStart, {
          channelId: packet.d.channel_id,
          guildId: packet.d.guild_id,
          userId: packet.d.user_id,
          timestamp: packet.d.timestamp,
          member:
            packet.d.member !== undefined
              ? new GuildMember(packet.d.member, this)
              : undefined,
        });
        break;
      case "USER_UPDATE":
        super.emit(GatewayEvents.UserUpdate, new User(packet.d, this));
        break;
      case "VOICE_STATE_UPDATE":
        super.emit(GatewayEvents.VoiceStateUpdate, {
          guildId: packet.d.guild_id,
          channelId: packet.d.channel_id,
          userId: packet.d.user_id,
          member:
            packet.d.member !== undefined
              ? new GuildMember(packet.d.member, this)
              : undefined,
          sessionId: packet.d.session_id,
          deaf: packet.d.deaf,
          mute: packet.d.mute,
          selfDeaf: packet.d.self_deaf,
          selfMute: packet.d.self_mute,
          selfStream: packet.d.self_stream,
          selfVideo: packet.d.self_video,
          suppress: packet.d.suppress,
          requestToSpeakTimestamp: packet.d.request_to_speak_timestamp,
        });
        break;
      case "VOICE_SERVER_UPDATE":
        super.emit(GatewayEvents.VoiceServerUpdate, {
          token: packet.d.token,
          guildId: packet.d.guild_id,
          endpoint: packet.d.endpoint,
        });
        break;
      case "WEBHOOKS_UPDATE":
        super.emit(GatewayEvents.WebhooksUpdate, {
          guildId: packet.d.guild_id,
          channelId: packet.d.channel_id,
        });
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
