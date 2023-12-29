import {
  type DefaultMessageNotificationLevel,
  type ExplicitContentFilterLevel,
  GatewayIntents,
  type OAuth2Scopes,
  type PrivacyLevel,
  StatusTypes,
  type SystemChannelFlags,
  type VerificationLevel,
  MessageFlags,
} from "./constants";
import { Util } from "./utils";
import { Endpoints, REST } from "./rest";
import {
  Application,
  AutoModerationRule,
  Channel,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  Integration,
  Interaction,
  Invite,
  Message,
  StageInstance,
  User,
  VoiceState,
  PartialApplication,
  Emoji,
  Sticker,
  Role,
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
  GuildMemberRemoveEventFields,
  GuildMemberUpdateEventFields,
  GuildMembersChunkEventFields,
  JSONGuildScheduledEvent,
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
  RawApplication,
  RawChannel,
  RawGuild,
  RawInvite,
  RawStageInstance,
  RawStickerPack,
  RawUser,
  RawVoiceRegion,
  JSONEntitlement,
} from "./types";
import EventEmitter from "node:events";
import { Shard, ShardsManager } from "./gateway";

export interface ClientEvents {
  hello: [];
  ready: [];
  resumed: [];
  reconnect: [];
  invalidSession: [];
  applicationCommandPermissionsUpdate: [
    applicationCommandPermissions: JSONGuildApplicationCommandPermissions
  ];
  autoModerationRuleCreate: [autoModerationRule: AutoModerationRule];
  autoModerationRuleUpdate: [autoModerationRule: AutoModerationRule];
  autoModerationRuleDelete: [autoModerationRule: JSONAutoModerationRule];
  autoModerationActionExecution: [
    autoModerationExecution: AutoModerationActionExecutionEventFields
  ];
  channelCreate: [channel: Channel];
  channelUpdate: [channel: Channel];
  channelDelete: [channel: JSONChannel];
  channelPinsUpdate: [pins: ChannelPinsUpdateEventFields];
  threadCreate: [thread: Channel];
  threadUpdate: [thread: Channel];
  threadDelete: [thread: JSONChannel];
  threadListSync: [sync: ThreadListSyncEventFields];
  threadMemberUpdate: [
    threadMember: JSONThreadMember & {
      guildId: string;
    }
  ];
  threadMembersUpdate: [thread: ThreadMembersUpdateEventFields];
  entitlementCreate: [entitlement: JSONEntitlement];
  entitlementUpdate: [entitlement: JSONEntitlement];
  entitlementDelete: [entitlement: JSONEntitlement];
  guildCreate: [guild: Guild];
  guildUpdate: [guild: Guild];
  guildDelete: [guild: GuildDeleteEventFields];
  guildAuditLogEntryCreate: [auditLogEntry: JSONAuditLogEntry];
  guildBanAdd: [ban: GuildBanAddEventFields];
  guildBanRemove: [ban: GuildBanRemoveEventFields];
  guildEmojisUpdate: [emojis: Array<Emoji>, guildId: string];
  guildStickersUpdate: [stickers: Array<Sticker>, guildId: string];
  guildIntegrationsUpdate: [guildId: string];
  guildMemberAdd: [guildMember: GuildMember];
  guildMemberRemove: [guildMember: GuildMemberRemoveEventFields];
  guildMemberUpdate: [guildMember: GuildMemberUpdateEventFields];
  guildMembersChunk: [request: GuildMembersChunkEventFields];
  guildRoleCreate: [role: Role, guildId: string];
  guildRoleUpdate: [role: Role, guildId: string];
  guildRoleDelete: [roleId: string, guildId: string];
  guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventUpdate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventDelete: [guildScheduledEvent: JSONGuildScheduledEvent];
  guildScheduledEventUserAdd: [
    userId: string,
    guildScheduledEventId: string,
    guildId: string
  ];
  guildScheduledEventUserRemove: [
    userId: string,
    guildScheduledEventId: string,
    guildId: string
  ];
  integrationCreate: [integration: Integration];
  integrationUpdate: [integration: Integration];
  integrationDelete: [integration: IntegrationDeleteEventFields];
  interactionCreate: [interaction: Interaction];
  inviteCreate: [invite: InviteCreateEventFields];
  inviteDelete: [invite: InviteDeleteEventFields];
  messageCreate: [message: Message];
  messageUpdate: [
    message:
      | Message
      | {
          id: string;
          flags: MessageFlags;
          channelId: string;
          guildId: string;
        }
  ];
  messageDelete: [message: MessageDeleteEventFields];
  messageDeleteBulk: [bulk: MessageDeleteBulkEventFields];
  messageReactionAdd: [reaction: MessageReactionAddEventFields];
  messageReactionRemove: [reaction: MessageReactionRemoveEventFields];
  messageReactionRemoveAll: [reaction: MessageReactionRemoveAllEventFields];
  messageReactionRemoveEmoji: [reaction: MessageReactionRemoveEmojiEventFields];
  presenceUpdate: [presence: PresenceUpdateEventFields];
  stageInstanceCreate: [stageInstance: StageInstance];
  stageInstanceUpdate: [stageInstance: StageInstance];
  stageInstanceDelete: [stageInstance: JSONStageInstance];
  typingStart: [typing: TypingStartEventFields];
  userUpdate: [user: User];
  voiceStateUpdate: [voiceState: VoiceState];
  voiceServerUpdate: [voiceServer: VoiceServerUpdateEventFields];
  webhooksUpdate: [channelId: string, guildId: string];
}

export interface ClientOptions {
  intents?: number | Array<number>;
  shardsCount?: number | "auto";
  auth?: "Bot" | "Bearer";
}

export class Client extends EventEmitter {
  public token: string;
  public intents: GatewayIntents | number;
  public shardsCount: number | "auto";
  public auth: "Bot" | "Bearer";
  public shards: ShardsManager;
  public rest: REST;
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
    this.shardsCount = options?.shardsCount ?? "auto";
    this.auth = options?.auth ?? "Bot";
    this.shards = new ShardsManager();
    this.rest = new REST(token, this.auth);
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
      guildScheduledEventId?: string;
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
          guild_scheduled_event_id: options.guildScheduledEventId,
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
    for (const [id, shard] of this.shards) shard.updatePresence(options);
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
  public async connect(): Promise<void> {
    this.shardsCount =
      this.shardsCount === "auto"
        ? (await this.getGatewayBot()).shards
        : this.shardsCount;

    for (let i = 0; i < this.shardsCount; i++)
      this.shards.set(i, new Shard(i, this));

    this.shards.connect();
  }

  public disconnect(): void {
    this.shards.disconnect();
  }
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
