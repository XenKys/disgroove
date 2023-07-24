import WebSocket from "ws";
import {
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  GatewayEvents,
  GatewayIntents,
  GatewayOPCodes,
  GuildFeatures,
  InviteTargetTypes,
  OAuth2Scopes,
  PrivacyLevel,
  SystemChannelFlags,
  TriggerTypes,
  VerificationLevel,
  channelToRaw,
  emojiToJSON,
  roleToRaw,
} from "../utils";
import { Endpoints, REST } from "../rest";
import {
  Application,
  AuditLogEntry,
  AutoModerationRule,
  Channel,
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
} from "../structures";
import type {
  JSONAutoModerationAction,
  JSONAutoModerationRule,
  JSONChannel,
  JSONEmoji,
  JSONGuildApplicationCommandPermissions,
  JSONGuildScheduledEvent,
  JSONInvite,
  JSONRole,
  JSONStageInstance,
  JSONSticker,
  JSONStickerPack,
  JSONThreadMember,
  JSONVoiceRegion,
  JSONVoiceState,
  PresenceUpdateEventFields,
  RawApplicationCommandPermission,
  RawChannel,
  RawEmoji,
  RawGuildMember,
  RawGuildScheduledEvent,
  RawStageInstance,
  RawSticker,
  RawStickerPack,
  RawThreadMember,
  RawVoiceRegion,
  RawVoiceState,
} from "../types";
import EventEmitter from "node:events";

export interface ClientOptions {
  intents?: GatewayIntents | number;
}

export declare interface Client extends EventEmitter {
  on(
    event: GatewayEvents.Hello,
    listener: (listener: { heartbeatInterval: number }) => void
  ): this;
  on(event: GatewayEvents.Ready, listener: () => void): this;
  on(event: GatewayEvents.Resumed, listener: () => void): this;
  on(event: GatewayEvents.Reconnect, listener: () => void): this;
  on(event: GatewayEvents.InvalidSession, listener: () => void): this;
  on(
    event: GatewayEvents.ApplicationCommandPermissionsUpdate,
    listener: (listener: JSONGuildApplicationCommandPermissions) => void
  ): this;
  on(
    event: GatewayEvents.AutoModerationRuleCreate,
    listener: (listener: AutoModerationRule) => void
  ): this;
  on(
    event: GatewayEvents.AutoModerationRuleUpdate,
    listener: (listener: AutoModerationRule) => void
  ): this;
  on(
    event: GatewayEvents.AutoModerationRuleDelete,
    listener: (listener: JSONAutoModerationRule) => void
  ): this;
  on(
    event: GatewayEvents.AutoModerationActionExecution,
    listener: (listener: {
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
    }) => void
  ): this;
  on(
    event: GatewayEvents.ChannelCreate,
    listener: (listener: Channel) => void
  ): this;
  on(
    event: GatewayEvents.ChannelUpdate,
    listener: (listener: Channel) => void
  ): this;
  on(
    event: GatewayEvents.ChannelDelete,
    listener: (listener: JSONChannel) => void
  ): this;
  on(
    event: GatewayEvents.ThreadCreate,
    listener: (listener: Channel) => void
  ): this;
  on(
    event: GatewayEvents.ThreadUpdate,
    listener: (listener: Channel) => void
  ): this;
  on(
    event: GatewayEvents.ThreadDelete,
    listener: (listener: JSONChannel) => void
  ): this;
  on(
    event: GatewayEvents.ThreadListSync,
    listener: (listener: {
      guildId: string;
      channelIds?: Array<string>;
      threads: Array<Channel>;
      members: Array<JSONThreadMember>;
    }) => void
  ): this;
  on(
    event: GatewayEvents.ThreadMemberUpdate,
    listener: (
      listener: JSONThreadMember & {
        guildId: string;
      }
    ) => void
  ): this;
  on(
    event: GatewayEvents.ThreadMembersUpdate,
    listener: (listener: {
      id: string;
      guildId: string;
      memberCount: number;
      addedMembers?: Array<JSONThreadMember>;
      removedMemberIds?: Array<string>;
    }) => void
  ): this;
  on(
    event: GatewayEvents.ChannelPinsUpdate,
    listener: (listener: {
      guildId?: string;
      channelId: string;
      lastPinTimestamp: number | null;
    }) => void
  ): this;
  on(
    event: GatewayEvents.GuildCreate,
    listener: (
      listener: Guild,
      extra: {
        joinedAt: number;
        large: boolean;
        unavailable?: boolean;
        memberCount: number;
        voiceStates: Array<JSONVoiceState>;
        members: Array<GuildMember>;
        channels: Array<Channel>;
        threads: Array<Channel>;
        presences: Array<PresenceUpdateEventFields>;
        stageInstances: Array<StageInstance>;
        guildScheduledEvents: Array<GuildScheduledEvent>;
      }
    ) => void
  ): this;
  on(
    event: GatewayEvents.GuildUpdate,
    listener: (listener: Guild) => void
  ): this;
  on(
    event: GatewayEvents.GuildDelete,
    listener: (listener: { id: string; unavailable: boolean }) => void
  ): this;
  on(
    event: GatewayEvents.GuildAuditLogEntryCreate,
    listener: (listener: AuditLogEntry) => void
  ): this;
  on(
    event: GatewayEvents.GuildBanAdd,
    listener: (listener: { guildId: string; user: User }) => void
  ): this;
  on(
    event: GatewayEvents.GuildBanRemove,
    listener: (listener: { guildId: string; user: User }) => void
  ): this;
  on(
    event: GatewayEvents.GuildEmojisUpdate,
    listener: (listener: { guildId: string; emojis: Array<JSONEmoji> }) => void
  ): this;
  on(
    event: GatewayEvents.GuildStickersUpdate,
    listener: (listener: {
      guildId: string;
      stickers: Array<JSONSticker>;
    }) => void
  ): this;
  on(
    event: GatewayEvents.GuildIntegrationsUpdate,
    listener: (listener: { guildId: string }) => void
  ): this;
  on(
    event: GatewayEvents.GuildMemberAdd,
    listener: (listener: GuildMember) => void
  ): this;
  on(
    event: GatewayEvents.GuildMemberRemove,
    listener: (listener: { guildId: string; user: User }) => void
  ): this;
  on(
    event: GatewayEvents.GuildMemberUpdate,
    listener: (listener: {
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
    }) => void
  ): this;
  on(
    event: GatewayEvents.GuildMembersChunk,
    listener: (listener: {
      guildId: string;
      members: Array<GuildMember>;
      chunkIndex: number;
      chunkCount: number;
      notFound?: Array<string>;
      presences?: Array<PresenceUpdateEventFields>;
      nonce?: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.GuildRoleCreate,
    listener: (listener: { guildId: string; role: Role }) => void
  ): this;
  on(
    event: GatewayEvents.GuildRoleUpdate,
    listener: (listener: { guildId: string; role: Role }) => void
  ): this;
  on(
    event: GatewayEvents.GuildRoleDelete,
    listener: (listener: { guildId: string; roleId: string }) => void
  ): this;
  on(
    event: GatewayEvents.GuildScheduledEventCreate,
    listener: (listener: GuildScheduledEvent) => void
  ): this;
  on(
    event: GatewayEvents.GuildScheduledEventUpdate,
    listener: (listener: GuildScheduledEvent) => void
  ): this;
  on(
    event: GatewayEvents.GuildScheduledEventDelete,
    listener: (listener: JSONGuildScheduledEvent) => void
  ): this;
  on(
    event: GatewayEvents.GuildScheduledEventUserAdd,
    listener: (listener: {
      guildScheduledEventId: string;
      userId: string;
      guildId: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.GuildScheduledEventUserRemove,
    listener: (listener: {
      guildScheduledEventId: string;
      userId: string;
      guildId: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.IntegrationCreate,
    listener: (listener: Integration) => void
  ): this;
  on(
    event: GatewayEvents.IntegrationUpdate,
    listener: (listener: Integration) => void
  ): this;
  on(
    event: GatewayEvents.IntegrationDelete,
    listener: (listener: {
      id: string;
      guildId: string;
      applicationId?: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.InviteCreate,
    listener: (listener: {
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
    }) => void
  ): this;
  on(
    event: GatewayEvents.InviteDelete,
    listener: (listener: {
      channelId: string;
      guildId?: string;
      code: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.MessageCreate,
    listener: (listener: Message) => void
  ): this;
  on(
    event: GatewayEvents.MessageUpdate,
    listener: (listener: Message) => void
  ): this;
  on(
    event: GatewayEvents.MessageDelete,
    listener: (listener: {
      id: string;
      channelId: string;
      guildId?: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.MessageDeleteBulk,
    listener: (listener: {
      ids: Array<string>;
      channelId: string;
      guildId?: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.MessageReactionAdd,
    listener: (listener: {
      userId: string;
      channelId: string;
      messageId: string;
      guildId?: string;
      member?: GuildMember;
      emoji: JSONEmoji;
      messageAuthorId?: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.MessageReactionRemove,
    listener: (listener: {
      userId: string;
      channelId: string;
      messageId: string;
      guildId?: string;
      emoji: JSONEmoji;
    }) => void
  ): this;
  on(
    event: GatewayEvents.MessageReactionRemoveAll,
    listener: (listener: {
      channelId: string;
      messageId: string;
      guildId?: string;
    }) => void
  ): this;
  on(
    event: GatewayEvents.MessageReactionRemoveEmoji,
    listener: (listener: {
      channelId: string;
      guildId?: string;
      messageId: string;
      emoji: JSONEmoji;
    }) => void
  ): this;
  on(
    event: GatewayEvents.PresenceUpdate,
    listener: (listener: PresenceUpdateEventFields) => void
  ): this;
  on(
    event: GatewayEvents.TypingStart,
    listener: (listener: {
      channelId: string;
      guildId?: string;
      userId: string;
      timestamp: number;
      member?: GuildMember;
    }) => void
  ): this;
  on(
    event: GatewayEvents.VoiceStateUpdate,
    listener: (listener: JSONVoiceState) => void
  ): this;
  on(
    event: GatewayEvents.VoiceServerUpdate,
    listener: (listener: {
      token: string;
      guildId: string;
      endpoint: string | null;
    }) => void
  ): this;
  on(
    event: GatewayEvents.WebhooksUpdate,
    listener: (listener: { guildId: string; channelId: string }) => void
  ): this;
  on(
    event: GatewayEvents.InteractionCreate,
    listener: (listener: Interaction) => void
  ): this;
  on(
    event: GatewayEvents.StageInstanceCreate,
    listener: (listener: StageInstance) => void
  ): this;
  on(
    event: GatewayEvents.StageInstanceUpdate,
    listener: (listener: StageInstance) => void
  ): this;
  on(
    event: GatewayEvents.StageInstanceDelete,
    listener: (listener: JSONStageInstance) => void
  ): this;
}

export class Client extends EventEmitter {
  private heartbeatInterval?: NodeJS.Timer | null;
  public token: string;
  public intents: GatewayIntents | number;
  public rest: REST;
  public ws: WebSocket;

  constructor(token: string, options?: ClientOptions) {
    super();

    this.token = token;
    this.intents = options?.intents || GatewayIntents.AllNonPrivileged;
    this.rest = new REST(token);
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
  }

  /* https://discord.com/developers/docs/resources/application#get-current-application */
  public async getApplication(): Promise<Application> {
    return new Application(
      await this.rest.request("GET", Endpoints.applicationCurrentUser()),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/channel#get-channel */
  public async getChannel(channelId: string): Promise<Channel> {
    return new Channel(
      await this.rest.request("GET", Endpoints.channel(channelId)),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/guild#create-guild */
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
      await this.rest.request("POST", Endpoints.guilds(), {
        json: {
          name: options.name,
          region: options.region,
          icon: options.icon,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          roles: options.roles?.map((role) => roleToRaw(role)),
          channels: options.channels?.map((channel) => channelToRaw(channel)),
          afk_channel_id: options.afkChannelId,
          afk_timeout: options.afkTimeout,
          system_channel_id: options.systemChannelId,
          system_channel_flags: options.systemChannelFlags,
        },
      }),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild */
  public async getGuild(
    guildId: string,
    options?: {
      withCounts?: boolean;
    }
  ): Promise<Guild> {
    return new Guild(
      await this.rest.request("GET", Endpoints.guild(guildId), {
        query: {
          with_counts: options?.withCounts,
        },
      }),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template */
  public async createGuildFromTemplate(code: string): Promise<Guild> {
    return new Guild(
      await this.rest.request("POST", Endpoints.template(code)),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/invite#get-invite */
  public async getInvite(
    code: string,
    options?: {
      withCounts?: boolean;
      withExpiration?: boolean;
      guildScheduledEventId?: string;
    }
  ): Promise<Invite> {
    return new Invite(
      await this.rest.request("GET", Endpoints.invite(code), {
        query: {
          with_counts: options?.withCounts,
          with_expiration: options?.withExpiration,
          guild_scheduled_event_id: options?.guildScheduledEventId,
        },
      }),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/invite#delete-invite */
  public async deleteInvite(
    code: string,
    reason?: string
  ): Promise<JSONInvite> {
    return new Invite(
      await this.rest.request("DELETE", Endpoints.invite(code), {
        reason,
      }),
      this
    ).toJSON();
  }

  /* https://discord.com/developers/docs/resources/stage-instance#create-stage-instance */
  public async createStageInstance(
    options: {
      channelId: string;
      topic: string;
      privacyLevel: PrivacyLevel;
      sendStartNotifications: boolean;
    },
    reason?: string
  ): Promise<StageInstance> {
    return new StageInstance(
      await this.rest.request("POST", Endpoints.stageInstances(), {
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

  /* https://discord.com/developers/docs/resources/stage-instance#get-stage-instance */
  public async getStageInstance(channelId: string): Promise<StageInstance> {
    return new StageInstance(
      await this.rest.request("GET", Endpoints.stageInstance(channelId)),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs */
  public async listNitroStickerPacks(): Promise<{
    stickerPacks: Array<JSONStickerPack>;
  }> {
    const data: {
      sticker_packs: Array<RawStickerPack>;
    } = await this.rest.request("GET", Endpoints.nitroStickerPacks());

    return {
      stickerPacks: data.sticker_packs.map((stickerPack) => ({
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
    };
  }

  /* https://discord.com/developers/docs/resources/user#get-user */
  public async getUser(userId?: string): Promise<User> {
    return new User(
      await this.rest.request("GET", Endpoints.user(userId ?? "@me")),
      this
    );
  }

  /* https://discord.com/developers/docs/resources/user#get-current-user-guilds */
  public async getGuilds(options?: {
    before?: string;
    after?: string;
    limit?: number;
    withCounts?: boolean;
  }): Promise<
    Array<{
      id: string;
      name: string;
      icon: string;
      owner: boolean;
      permissions: string;
      features: Array<GuildFeatures>;
      approximate_member_count: number;
      approximate_presence_count: number;
    }>
  > {
    return this.rest
      .request("GET", Endpoints.userGuilds(), {
        query: {
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          with_counts: options?.withCounts,
        },
      })
      .then((response) =>
        response.map(
          (data: {
            id: string;
            name: string;
            icon: string;
            owner: boolean;
            permissions: string;
            features: Array<GuildFeatures>;
            approximate_member_count: number;
            approximate_presence_count: number;
          }) => ({
            id: data.id,
            name: data.name,
            icon: data.icon,
            owner: data.owner,
            permissions: data.permissions,
            features: data.features,
            approximate_member_count: data.approximate_member_count,
            approximate_presence_count: data.approximate_presence_count,
          })
        )
      );
  }

  /* https://discord.com/developers/docs/resources/voice#list-voice-regions */
  public async listVoiceRegions(): Promise<Array<JSONVoiceRegion>> {
    return this.rest.request("GET", Endpoints.voiceRegions()).then((response) =>
      response.map((data: RawVoiceRegion) => ({
        id: data.id,
        name: data.name,
        optimal: data.optimal,
        deprecated: data.deprecated,
        custom: data.custom,
      }))
    );
  }

  /* https://discord.com/developers/docs/topics/gateway#get-gateway */
  public async getGateway(): Promise<{ url: string }> {
    return this.rest.request("GET", Endpoints.gateway());
  }

  /* https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
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
      .request("GET", Endpoints.gatewayBot())
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

  /* https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information */
  public async getOAuth2Application(): Promise<Application> {
    return new Application(
      await this.rest.request("GET", Endpoints.oauth2CurrentApplication()),
      this
    );
  }

  /* https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information */
  public async getOAuth2Authorization(): Promise<{
    application: Application;
    scopes: Array<OAuth2Scopes>;
    expires: number;
    user?: User;
  }> {
    return this.rest
      .request("GET", Endpoints.oauth2Authorization())
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

  public connect(): void {
    this.ws.on("open", () => {
      this.ws.send(
        JSON.stringify({
          op: GatewayOPCodes.Identify,
          d: {
            token: this.token,
            intents: this.intents,
            properties: {
              os: process.platform,
              browser: "disgroove",
              device: "disgroove",
            },
          },
        })
      );
    });

    this.ws.on("message", (data) => {
      const { t, op, d } = JSON.parse(data.toString());

      switch (op) {
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
            }, d.heartbeat_interval);

            super.emit(GatewayEvents.Hello, {
              heartbeatInterval: d.heartbeat_interval,
            });
          }
          break;
      }

      switch (t) {
        case "READY":
          super.emit(GatewayEvents.Ready);
          break;
        case "RESUMED":
          super.emit(GatewayEvents.Resumed);
          break;
        case "APPLICATION_COMMAND_PERMISSIONS_UPDATE":
          super.emit(GatewayEvents.ApplicationCommandPermissionsUpdate, {
            id: d.id,
            applicationId: d.application_id,
            guildId: d.guild_id,
            permissions: d.permissions.map(
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
            new AutoModerationRule(d, this)
          );
          break;
        case "AUTO_MODERATION_RULE_UPDATE":
          super.emit(
            GatewayEvents.AutoModerationRuleUpdate,
            new AutoModerationRule(d, this)
          );
          break;
        case "AUTO_MODERATION_RULE_DELETE":
          super.emit(
            GatewayEvents.AutoModerationRuleDelete,
            new AutoModerationRule(d, this).toJSON()
          );
          break;
        case "AUTO_MODERATION_ACTION_EXECUTION":
          super.emit(GatewayEvents.AutoModerationActionExecution, {
            guildId: d.guild_id,
            action: {
              type: d.action.type,
              metadata: d.action.metadata,
            },
            ruleId: d.rule_id,
            ruleTriggerType: d.rule_trigger_type,
            userId: d.user_id,
            channelId: d.channel_id,
            messageId: d.message_id,
            alertSystemMessageId: d.alert_system_message_id,
            content: d.content,
            matchedKeyword: d.matched_keyword,
            matchedContent: d.matched_content,
          });
          break;
        case "CHANNEL_CREATE":
          super.emit(GatewayEvents.ChannelCreate, new Channel(d, this));
          break;
        case "CHANNEL_UPDATE":
          super.emit(GatewayEvents.ChannelUpdate, new Channel(d, this));
          break;
        case "CHANNEL_DELETE":
          super.emit(
            GatewayEvents.ChannelDelete,
            new Channel(d, this).toJSON()
          );
          break;
        case "CHANNEL_PINS_UPDATE":
          super.emit(GatewayEvents.ChannelPinsUpdate, {
            guildId: d.guild_id,
            channelId: d.channel_id,
            lastPinTimestamp: d.last_pin_timestamp,
          });
          break;
        case "THREAD_CREATE":
          super.emit(GatewayEvents.ThreadCreate, new Channel(d, this));
          break;
        case "THREAD_UPDATE":
          super.emit(GatewayEvents.ThreadUpdate, new Channel(d, this));
          break;
        case "THREAD_DELETE":
          super.emit(GatewayEvents.ThreadDelete, new Channel(d, this).toJSON());
          break;
        case "THREAD_LIST_SYNC":
          super.emit(GatewayEvents.ThreadListSync, {
            guildId: d.guild_id,
            channelIds: d.channel_ids,
            threads: d.threads.map(
              (channel: RawChannel) => new Channel(channel, this)
            ),
            members: d.members.map((member: RawThreadMember) => ({
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
            id: d.id,
            userId: d.user_id,
            joinTimestamp: d.join_timestamp,
            flags: d.flags,
            member:
              d.member !== undefined
                ? new GuildMember(d.member, this)
                : undefined,
            guildId: d.guild_id,
          });
          break;
        case "THREAD_MEMBERS_UPDATE":
          super.emit(GatewayEvents.ThreadMembersUpdate, {
            id: d.id,
            guildId: d.guild_id,
            memberCount: d.member_count,
            addedMembers: d.added_members?.map((member: RawThreadMember) => ({
              id: member.id,
              userId: member.user_id,
              joinTimestamp: member.join_timestamp,
              flags: member.flags,
              member:
                member.member !== undefined
                  ? new GuildMember(member.member, this)
                  : undefined,
            })),
            removedMemberIds: d.removed_member_ids,
          });
          break;
        case "GUILD_CREATE":
          super.emit(GatewayEvents.GuildCreate, new Guild(d, this), {
            joinedAt: d.joined_at,
            large: d.large,
            unavailable: d.unavailable,
            memberCount: d.member_count,
            voiceStates: d.voice_states.map((voiceState: RawVoiceState) => ({
              guildId: voiceState.guild_id,
              channelId: voiceState.channel_id,
              userId: voiceState.user_id,
              member:
                voiceState.member !== undefined
                  ? new GuildMember(voiceState.member, this)
                  : undefined,
              sessionId: voiceState.session_id,
              deaf: voiceState.deaf,
              mute: voiceState.mute,
              selfDeaf: voiceState.self_deaf,
              selfMute: voiceState.self_mute,
              selfStream: voiceState.self_stream,
              selfVideo: voiceState.self_video,
              suppress: voiceState.suppress,
              requestToSpeakTimestamp: voiceState.request_to_speak_timestamp,
            })),
            members: d.members.map(
              (member: RawGuildMember) => new GuildMember(member, this)
            ),
            channels: d.channels.map(
              (channel: RawChannel) => new Channel(channel, this)
            ),
            threads: d.threads.map(
              (thread: RawChannel) => new Channel(thread, this)
            ),
            presences: d.presences.map((presence: any) => ({
              user: new User(presence.user, this),
              guildId: presence.guild_id,
              status: presence.status,
              activities: presence.activities.map((activity: any) => ({
                name: activity.name,
                type: activity.type,
                url: activity.url,
                createdAt: activity.created_at,
                timestamps: {
                  start: activity.timestamps?.start,
                  end: activity.timestamp.end,
                },
                applicationId: activity.application_id,
                details: activity.details,
                state: activity.state,
                party: {
                  id: activity.party?.id,
                  size: activity.party?.size,
                },
                assets: {
                  largeImage: activity.assets?.large_image,
                  largeText: activity.assets?.large_text,
                  smallImage: activity.assets?.small_image,
                  smallText: activity.assets?.small_text,
                },
                secrets: {
                  join: activity.secrets.join,
                  spectate: activity.secrets.spectate,
                  match: activity.secrets.match,
                },
                instance: activity.instance,
                flags: activity.flags,
                buttons: activity.buttons?.map((button: any) => ({
                  label: button.label,
                  url: button.url,
                })),
              })),
              clientStatus: {
                desktop: presence.client_status.desktop,
                mobile: presence.client_status.mobile,
                web: presence.client_status.web,
              },
            })),
            stageInstances: d.stage_instances.map(
              (stageInstance: RawStageInstance) =>
                new StageInstance(stageInstance, this)
            ),
            guildScheduledEvents: d.guild_scheduled_events.map(
              (guildScheduledEvent: RawGuildScheduledEvent) =>
                new GuildScheduledEvent(guildScheduledEvent, this)
            ),
          });
          break;
        case "GUILD_UPDATE":
          super.emit(GatewayEvents.GuildUpdate, new Guild(d, this));
          break;
        case "GUILD_DELETE":
          super.emit(GatewayEvents.GuildDelete, {
            id: d.id,
            unavailable: d.unavailable,
          });
          break;
        case "GUILD_AUDIT_LOG_ENTRY_CREATE":
          super.emit(
            GatewayEvents.GuildAuditLogEntryCreate,
            new AuditLogEntry(d, this)
          );
          break;
        case "GUILD_BAN_ADD":
          super.emit(GatewayEvents.GuildBanAdd, {
            guildId: d.guild_id,
            user: new User(d.user, this),
          });
          break;
        case "GUILD_BAN_REMOVE":
          super.emit(GatewayEvents.GuildBanRemove, {
            guildId: d.guild_id,
            user: new User(d.user, this),
          });
          break;
        case "GUILD_EMOJIS_UPDATE":
          super.emit(GatewayEvents.GuildEmojisUpdate, {
            guildId: d.guild_id,
            emojis: d.emojis.map((emoji: RawEmoji) => emojiToJSON(emoji, this)),
          });
          break;
        case "GUILD_STICKERS_UPDATE":
          super.emit(GatewayEvents.GuildStickersUpdate, {
            guildId: d.guild_id,
            stickers: d.stickers.map((sticker: RawSticker) => ({
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
            guildId: d.guild_id,
          });
          break;
        case "GUILD_MEMBER_ADD":
          super.emit(GatewayEvents.GuildMemberAdd, new GuildMember(d, this));
          break;
        case "GUILD_MEMBER_REMOVE":
          super.emit(GatewayEvents.GuildMemberRemove, {
            guildId: d.guild_id,
            user: new User(d.user, this),
          });
          break;
        case "GUILD_MEMBER_UPDATE":
          super.emit(GatewayEvents.GuildMemberUpdate, {
            guildId: d.guild_id,
            roles: d.roles,
            user: new User(d.user, this),
            nick: d.nick,
            avatar: d.avatar,
            joinedAt: d.joined_at,
            premiumSince: d.premium_since,
            deaf: d.deaf,
            mute: d.mute,
            pending: d.pending,
            communicationDisabledUntil: d.communication_disabled_until,
          });
          break;
        case "GUILD_MEMBERS_CHUNK":
          super.emit(GatewayEvents.GuildMembersChunk, {
            guildId: d.guild_id,
            members: d.members.map(
              (member: RawGuildMember) => new GuildMember(member, this)
            ),
            chunkIndex: d.chunk_index,
            chunkCount: d.chunk_count,
            notFound: d.not_found,
            presences: d.presences,
            nonce: d.nonce,
          });
          break;
        case "GUILD_ROLE_CREATE":
          super.emit(GatewayEvents.GuildRoleCreate, {
            guildId: d.guild_id,
            role: new Role(d.role, this),
          });
          break;
        case "GUILD_ROLE_UPDATE":
          super.emit(GatewayEvents.GuildRoleUpdate, {
            guildId: d.guild_id,
            role: new Role(d.role, this),
          });
          break;
        case "GUILD_ROLE_DELETE":
          super.emit(GatewayEvents.GuildRoleDelete, {
            guildId: d.guild_id,
            roleId: d.role_id,
          });
          break;
        case "GUILD_SCHEDULED_EVENT_CREATE":
          super.emit(
            GatewayEvents.GuildScheduledEventCreate,
            new GuildScheduledEvent(d, this)
          );
          break;
        case "GUILD_SCHEDULED_EVENT_UPDATE":
          super.emit(
            GatewayEvents.GuildScheduledEventUpdate,
            new GuildScheduledEvent(d, this)
          );
          break;
        case "GUILD_SCHEDULED_EVENT_DELETE":
          super.emit(
            GatewayEvents.GuildScheduledEventDelete,
            new GuildScheduledEvent(d, this).toJSON()
          );
          break;
        case "GUILD_SCHEDULED_EVENT_USER_ADD":
          super.emit(GatewayEvents.GuildScheduledEventUserAdd, {
            guildScheduledEventId: d.guild_scheduled_event_id,
            userId: d.user_id,
            guildId: d.guild_id,
          });
          break;
        case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
          super.emit(GatewayEvents.GuildScheduledEventUserRemove, {
            guildScheduledEventId: d.guild_scheduled_event_id,
            userId: d.user_id,
            guildId: d.guild_id,
          });
          break;
        case "INTEGRATION_CREATE":
          super.emit(GatewayEvents.IntegrationCreate, new Integration(d, this));
          break;
        case "INTEGRATION_UPDATE":
          super.emit(GatewayEvents.IntegrationUpdate, new Integration(d, this));
          break;
        case "INTEGRATION_DELETE":
          super.emit(GatewayEvents.IntegrationDelete, {
            id: d.id,
            guildId: d.guild_id,
            applicationId: d.application_id,
          });
          break;
        case "INTERACTION_CREATE":
          super.emit(GatewayEvents.InteractionCreate, new Interaction(d, this));
          break;
        case "INVITE_CREATE":
          super.emit(GatewayEvents.InviteCreate, {
            channelId: d.channel_id,
            code: d.code,
            createdAt: d.created_at,
            guildId: d.guild_id,
            inviter:
              d.inviter !== undefined ? new User(d.inviter, this) : undefined,
            maxAge: d.max_age,
            maxUses: d.max_uses,
            targetType: d.target_type,
            targetUser:
              d.target_user !== undefined
                ? new User(d.target_user, this)
                : undefined,
            targetApplication:
              d.target_application !== undefined
                ? new Application(d.target_application, this)
                : undefined,
            temporary: d.temporary,
            uses: d.uses,
          });
          break;
        case "INVITE_DELETE":
          super.emit(GatewayEvents.InviteDelete, {
            channelId: d.channel_id,
            guildId: d.guild_id,
            code: d.code,
          });
          break;
        case "MESSAGE_CREATE":
          super.emit(GatewayEvents.MessageCreate, new Message(d, this));
          break;
        case "MESSAGE_UPDATE":
          super.emit(GatewayEvents.MessageUpdate, new Message(d, this));
          break;
        case "MESSAGE_DELETE":
          super.emit(
            GatewayEvents.MessageDelete,
            new Message(d, this).toJSON()
          );
          break;
        case "MESSAGE_DELETE_BULK":
          super.emit(GatewayEvents.MessageDeleteBulk, {
            ids: d.ids,
            channelId: d.channel_id,
            guildId: d.guild_id,
          });
          break;
        case "MESSAGE_REACTION_ADD":
          super.emit(GatewayEvents.MessageReactionAdd, {
            userId: d.user_id,
            channelId: d.channel_id,
            messageId: d.message_id,
            guildId: d.guild_id,
            member:
              d.member !== undefined
                ? new GuildMember(d.member, this)
                : undefined,
            emoji: emojiToJSON(d.emoji, this),
            messageAuthorId: d.message_author_id,
          });
          break;
        case "MESSAGE_REACTION_REMOVE":
          super.emit(GatewayEvents.MessageReactionRemove, {
            userId: d.user_id,
            channelId: d.channel_id,
            messageId: d.message_id,
            guildId: d.guild_id,
            emoji: emojiToJSON(d.emoji, this),
          });
          break;
        case "MESSAGE_REACTION_REMOVE_ALL":
          super.emit(GatewayEvents.MessageReactionRemoveAll, {
            channelId: d.channel_id,
            messageId: d.message_id,
            guildId: d.guild_id,
          });
          break;
        case "MESSAGE_REACTION_REMOVE_EMOJI":
          super.emit(GatewayEvents.MessageReactionRemoveEmoji, {
            channelId: d.channel_id,
            guildId: d.guild_id,
            messageId: d.message_id,
            emoji: emojiToJSON(d.emoji, this),
          });
          break;
        case "PRESENCE_UPDATE":
          super.emit(GatewayEvents.PresenceUpdate, {
            user: new User(d.user, this),
            guildId: d.guild_id,
            status: d.status,
            activities: d.activities.map((activity: any) => ({
              name: activity.name,
              type: activity.type,
              url: activity.url,
              createdAt: activity.created_at,
              timestamps: {
                start: activity.timestamps?.start,
                end: activity.timestamp.end,
              },
              applicationId: activity.application_id,
              details: activity.details,
              state: activity.state,
              party: {
                id: activity.party?.id,
                size: activity.party?.size,
              },
              assets: {
                largeImage: activity.assets?.large_image,
                largeText: activity.assets?.large_text,
                smallImage: activity.assets?.small_image,
                smallText: activity.assets?.small_text,
              },
              secrets: {
                join: activity.secrets.join,
                spectate: activity.secrets.spectate,
                match: activity.secrets.match,
              },
              instance: activity.instance,
              flags: activity.flags,
              buttons: activity.buttons?.map((button: any) => ({
                label: button.label,
                url: button.url,
              })),
            })),
            clientStatus: {
              desktop: d.client_status.desktop,
              mobile: d.client_status.mobile,
              web: d.client_status.web,
            },
          });
          break;
        case "STAGE_INSTANCE_CREATE":
          super.emit(
            GatewayEvents.StageInstanceCreate,
            new StageInstance(d, this)
          );
          break;
        case "STAGE_INSTANCE_UPDATE":
          super.emit(
            GatewayEvents.StageInstanceUpdate,
            new StageInstance(d, this)
          );
          break;
        case "STAGE_INSTANCE_DELETE":
          super.emit(
            GatewayEvents.StageInstanceDelete,
            new StageInstance(d, this).toJSON()
          );
          break;
        case "TYPING_START":
          super.emit(GatewayEvents.TypingStart, {
            channelId: d.channel_id,
            guildId: d.guild_id,
            userId: d.user_id,
            timestamp: d.timestamp,
            member:
              d.member !== undefined
                ? new GuildMember(d.member, this)
                : undefined,
          });
          break;
        case "USER_UPDATE":
          super.emit(GatewayEvents.UserUpdate, new User(d, this));
          break;
        case "VOICE_STATE_UPDATE":
          super.emit(GatewayEvents.VoiceStateUpdate, {
            guildId: d.guild_id,
            channelId: d.channel_id,
            userId: d.user_id,
            member:
              d.member !== undefined
                ? new GuildMember(d.member, this)
                : undefined,
            sessionId: d.session_id,
            deaf: d.deaf,
            mute: d.mute,
            selfDeaf: d.self_deaf,
            selfMute: d.self_mute,
            selfStream: d.self_stream,
            selfVideo: d.self_video,
            suppress: d.suppress,
            requestToSpeakTimestamp: d.request_to_speak_timestamp,
          });
          break;
        case "VOICE_SERVER_UPDATE":
          super.emit(GatewayEvents.VoiceServerUpdate, {
            token: d.token,
            guildId: d.guildId,
            endpoint: d.endpoint,
          });
          break;
        case "WEBHOOKS_UPDATE":
          super.emit(GatewayEvents.WebhooksUpdate, {
            guildId: d.guild_id,
            channelId: d.channel_id,
          });
          break;
      }
    });

    this.ws.on("error", (err) => {
      throw new Error(err.message);
    });

    this.ws.on("close", (code, reason) => {
      throw new Error(`${code}: ${reason}`);
    });
  }

  public disconnect(): void {
    clearInterval(this.heartbeatInterval!);
    this.heartbeatInterval = null;
  }
}
