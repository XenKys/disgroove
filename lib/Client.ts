import {
  GatewayIntents,
  type OAuth2Scopes,
  type ActionTypes,
  type ImageWidgetStyleOptions,
  InteractionCallbackType,
  type ReactionTypes,
  type ApplicationCommandTypes,
  type EventTypes,
  type TriggerTypes,
  type ChannelTypes,
  type VideoQualityModes,
  type SortOrderTypes,
  type ForumLayoutTypes,
  type InviteTargetTypes,
  type VerificationLevel,
  type DefaultMessageNotificationLevel,
  type ExplicitContentFilterLevel,
  type SystemChannelFlags,
  type ApplicationFlags,
  type ApplicationIntegrationTypes,
  type ChannelFlags,
  type GuildFeatures,
  type GuildScheduledEventEntityTypes,
  type GuildScheduledEventPrivacyLevel,
  type GuildScheduledEventStatus,
  type MessageFlags,
  type OnboardingMode,
  type PrivacyLevel,
  type GuildMemberFlags,
  type InteractionContextTypes,
  ComponentTypes,
  type LobbyMemberFlags,
} from "./constants";
import { Endpoints, RequestManager, RESTMethods, type FileData } from "./rest";
import EventEmitter from "node:events";
import { Shard } from "./gateway";
import type {
  ActivityInstance,
  Application,
  ApplicationIntegrationTypeConfiguration,
  InstallParams,
  RawActivityInstance,
  RawApplication,
} from "./types/application";
import type {
  ApplicationCommand,
  RawApplicationCommand,
  GuildApplicationCommandPermissions,
  RawGuildApplicationCommandPermissions,
  ApplicationCommandOption,
  ApplicationCommandPermission,
} from "./types/application-command";
import type {
  ApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
} from "./types/application-role-connection-metadata";
import type { AuditLog, RawAuditLog, AuditLogEntry } from "./types/audit-log";
import type {
  AutoModerationRule,
  RawAutoModerationRule,
  TriggerMetadata,
  AutoModerationAction,
} from "./types/auto-moderation";
import type {
  Channel,
  RawChannel,
  FollowedChannel,
  RawFollowedChannel,
  ThreadMember,
  RawThreadMember,
  Overwrite,
  DefaultReaction,
  ForumTag,
} from "./types/channel";
import type { LocaleMap, snowflake, timestamp } from "./types/common";
import type { Emoji, RawEmoji } from "./types/emoji";
import type { Entitlement, RawEntitlement } from "./types/entitlements";
import type {
  AutoModerationActionExecutionEventFields,
  ChannelPinsUpdateEventFields,
  ThreadListSyncEventFields,
  ThreadMemberUpdateEventExtraFields,
  ThreadMembersUpdateEventFields,
  GuildCreateEventExtraFields,
  GuildAuditLogEntryCreateExtraFields,
  GuildBanAddEventFields,
  GuildBanRemoveEventFields,
  GuildMemberAddEventExtraFields,
  GuildMemberRemoveEventFields,
  GuildMemberUpdateEventFields,
  GuildMembersChunkEventFields,
  IntegrationCreateEventExtraFields,
  IntegrationUpdateEventExtraFields,
  IntegrationDeleteEventFields,
  InviteCreateEventFields,
  InviteDeleteEventFields,
  MessageCreateEventExtraFields,
  MessageDeleteEventFields,
  MessageDeleteBulkEventFields,
  MessageReactionAddEventFields,
  MessageReactionRemoveEventFields,
  MessageReactionRemoveAllEventFields,
  MessageReactionRemoveEmojiEventFields,
  PresenceUpdateEventFields,
  TypingStartEventFields,
  VoiceServerUpdateEventFields,
  MessagePollVoteAddFields,
  MessagePollVoteRemoveFields,
  GatewayPresenceUpdate,
  RawPayload,
  IdentifyConnectionProperties,
  VoiceChannelEffectSendEventFields,
  GuildSoundboardSoundDeleteEventFields,
  RateLimitedFields,
} from "./types/gateway-events";
import type {
  Guild,
  GuildMember,
  RawGuildMember,
  RawGuild,
  WelcomeScreen,
  RawWelcomeScreen,
  GuildWidgetSettings,
  RawGuildWidgetSettings,
  Ban,
  RawBan,
  Integration,
  RawIntegration,
  GuildOnboarding,
  RawGuildOnboarding,
  GuildPreview,
  RawGuildPreview,
  GuildWidget,
  RawGuildWidget,
  UnavailableGuild,
  OnboardingPrompt,
  WelcomeScreenChannel,
  IncidentsData,
  RawIncidentsData,
} from "./types/guild";
import type {
  GuildScheduledEvent,
  RawGuildScheduledEvent,
  GuildScheduledEventUser,
  RawGuildScheduledEventUser,
  GuildScheduledEventEntityMetadata,
  GuildScheduledEventRecurrenceRule,
} from "./types/guild-scheduled-event";
import type { GuildTemplate, RawGuildTemplate } from "./types/guild-template";
import type {
  Interaction,
  InteractionCallbackResponse,
  InteractionResponse,
  RawInteractionCallbackResponse,
} from "./types/interaction";
import type { Invite, RawInvite } from "./types/invite";
import type { PollCreateParams } from "./types/poll";
import type { Role, RawRole, RoleColors } from "./types/role";
import type { SKU, RawSKU } from "./types/sku";
import type { StageInstance, RawStageInstance } from "./types/stage-instance";
import type {
  Sticker,
  RawSticker,
  StickerPack,
  RawStickerPack,
} from "./types/sticker";
import type {
  User,
  RawUser,
  ApplicationRoleConnection,
  RawApplicationRoleConnection,
  Connection,
  RawConnection,
} from "./types/user";
import type {
  VoiceRegion,
  RawVoiceRegion,
  VoiceState,
  RawVoiceState,
} from "./types/voice";
import type { Webhook, RawWebhook } from "./types/webhook";
import type { ClientOptions as WebSocketOptions } from "ws";
import {
  Guilds,
  Applications,
  AutoModeration,
  Channels,
  Users,
  Emojis,
  Invites,
  Roles,
  Webhooks,
  GuildScheduledEvents,
  Stickers,
  GuildTemplates,
  StageInstances,
  Entitlements,
  AuditLogs,
  SKUs,
  ApplicationCommands,
  ApplicationRoleConnectionMetadatas,
  Messages,
  Voice,
  Subscriptions,
  Soundboards,
  Interactions,
  Components,
  Lobbies,
} from "./transformers";
import type {
  Embed,
  AllowedMentions,
  Attachment,
  Message,
  RawMessage,
  MessageReference,
  MessagePin,
  RawMessagePin,
} from "./types/message";
import type { RawSubscription, Subscription } from "./types/subscription";
import type { RawSoundboardSound, SoundboardSound } from "./types/soundboard";
import type {
  ActionRow,
  Button,
  ChannelSelect,
  Container,
  File,
  MediaGallery,
  MentionableSelect,
  RoleSelect,
  Section,
  Separator,
  StringSelect,
  TextDisplay,
  Thumbnail,
  UserSelect,
} from "./types/components";
import type {
  Lobby,
  LobbyMember,
  RawLobby,
  RawLobbyMember,
} from "./types/lobby";

export interface GatewayOptions {
  properties?: IdentifyConnectionProperties;
  compress?: boolean;
  largeThreshold?: number;
  presence?: Partial<
    Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
  >;
  intents?: number | Array<number>;
}

export interface ClientOptions {
  shardsCount?: number | "auto";
  auth?: "Bot" | "Bearer";
  gateway?: GatewayOptions;
  ws?: WebSocketOptions;
}

export class Client extends EventEmitter {
  token: string;
  properties?: IdentifyConnectionProperties;
  compress?: boolean;
  largeThreshold?: number;
  presence?: Partial<
    Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
  >;
  intents: GatewayIntents | number;
  shardsCount: number | "auto";
  auth: "Bot" | "Bearer";
  shards: Map<number, Shard>;
  rest: RequestManager;
  guildShardMap: Map<string, number>;
  user: User | null;
  guilds: Map<string, Guild>;
  application: Pick<Application, "id" | "flags"> | null;
  ws?: WebSocketOptions;

  constructor(token: string, options?: ClientOptions) {
    super();

    this.token = token;
    this.properties = options?.gateway?.properties;
    this.compress = options?.gateway?.compress;
    this.largeThreshold = options?.gateway?.largeThreshold;
    this.presence = options?.gateway?.presence;
    this.intents =
      options?.gateway?.intents !== undefined
        ? Array.isArray(options.gateway.intents)
          ? options.gateway.intents.reduce((sum, num) => sum + num, 0)
          : options.gateway.intents
        : 0;
    this.shardsCount = options?.shardsCount ?? "auto";
    this.auth = options?.auth ?? "Bot";
    this.shards = new Map();
    this.rest = new RequestManager(token, this.auth);
    this.guildShardMap = new Map();
    this.user = null;
    this.guilds = new Map();
    this.application = null;
    this.ws = options?.ws;
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
  addGroupRecipient(
    channelId: snowflake,
    userId: snowflake,
    options: {
      accessToken: string;
      nick: string;
    }
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelRecipient(channelId, userId),
      {
        json: {
          access_token: options.accessToken,
          nick: options.nick,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member */
  async addGuildMember(
    guildId: snowflake,
    userId: snowflake,
    options: {
      accessToken: string;
      nick?: string;
      roles?: Array<snowflake>;
      mute?: boolean;
      deaf?: boolean;
    }
  ): Promise<GuildMember | null> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Put,
      Endpoints.guildMember(guildId, userId),
      {
        json: {
          access_token: options.accessToken,
          nick: options.nick,
          roles: options.roles,
          mute: options.mute,
          deaf: options.deaf,
        },
      }
    );

    return response !== null ? Guilds.guildMemberFromRaw(response) : null;
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  addGuildMemberRole(
    guildId: snowflake,
    userId: snowflake,
    roleId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.guildMemberRole(guildId, userId, roleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/lobby#add-a-member-to-a-lobby */
  async addLobbyMember(
    lobbyId: snowflake,
    userId: snowflake,
    options: {
      metadata?: Record<string, string> | null;
      flags?: LobbyMemberFlags;
    }
  ): Promise<LobbyMember> {
    const response = await this.rest.request<RawLobbyMember>(
      RESTMethods.Put,
      Endpoints.lobbyMember(lobbyId, userId),
      {
        json: options,
      }
    );

    return Lobbies.lobbyMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#add-thread-member */
  addThreadMember(channelId: snowflake, userId: snowflake): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.threadMembers(channelId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
  beginGuildPrune(
    guildId: snowflake,
    options: {
      days: number;
      computePruneCount: boolean;
      includeRoles: Array<snowflake>;
    },
    reason?: string
  ): Promise<{
    pruned: number;
  }> {
    return this.rest.request<{
      pruned: number;
    }>(RESTMethods.Post, Endpoints.guildPrune(guildId), {
      json: {
        days: options.days,
        compute_prune_count: options.computePruneCount,
        include_roles: options.includeRoles,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#bulk-guild-ban */
  async bulkGuildBan(
    guildId: snowflake,
    options: {
      userIds: Array<snowflake>;
      deleteMessageSeconds?: number;
    },
    reason?: string
  ): Promise<{
    bannedUsers: Array<string>;
    failedUsers: Array<string>;
  }> {
    const response = await this.rest.request<{
      banned_users: Array<string>;
      failed_users: Array<string>;
    }>(RESTMethods.Post, Endpoints.guildBulkBan(guildId), {
      json: {
        user_ids: options.userIds,
        delete_message_seconds: options.deleteMessageSeconds,
      },
      reason,
    });

    return {
      bannedUsers: response.banned_users,
      failedUsers: response.failed_users,
    };
  }

  /** https://discord.com/developers/docs/resources/message#bulk-delete-messages */
  bulkDeleteMessages(
    channelId: snowflake,
    options?: {
      messages: Array<snowflake>;
    },
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Post,
      Endpoints.channelBulkDelete(channelId),
      {
        json: {
          messages: options?.messages,
        },
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  async bulkEditGlobalApplicationCommands(
    applicationId: snowflake,
    commands: Array<{
      id?: snowflake;
      name: string;
      nameLocalizations?: LocaleMap | null;
      description: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      integrationTypes: Array<ApplicationIntegrationTypes>;
      contexts: Array<InteractionContextTypes>;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }>
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Put,
      Endpoints.applicationCommands(applicationId),
      {
        json: commands.map((command) => ({
          id: command.id,
          name: command.name,
          name_localizations: command.nameLocalizations,
          description: command.description,
          description_localizations: command.descriptionLocalizations,
          options: command.options?.map((option) =>
            ApplicationCommands.optionToRaw(option)
          ),
          default_member_permissions: command.defaultMemberPermissions,
          integration_types: command.integrationTypes,
          contexts: command.contexts,
          type: command.type,
          nsfw: command.nsfw,
        })),
      }
    );

    return response.map((c) =>
      ApplicationCommands.applicationCommandFromRaw(c)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  async bulkEditGuildApplicationCommands(
    applicationId: snowflake,
    guildId: snowflake,
    commands: Array<{
      id?: snowflake;
      name: string;
      nameLocalizations?: LocaleMap | null;
      description: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }>
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Put,
      Endpoints.applicationGuildCommands(applicationId, guildId),
      {
        json: commands.map((command) => ({
          id: command.id,
          name: command.name,
          name_localizations: command.nameLocalizations,
          description: command.description,
          description_localizations: command.descriptionLocalizations,
          options: command.options?.map((option) =>
            ApplicationCommands.optionToRaw(option)
          ),
          default_member_permissions: command.defaultMemberPermissions,
          type: command.type,
          nsfw: command.nsfw,
        })),
      }
    );

    return response.map((c) =>
      ApplicationCommands.applicationCommandFromRaw(c)
    );
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  async connect(): Promise<void> {
    this.shardsCount =
      this.shardsCount === "auto"
        ? (await this.getGatewayBot()).shards
        : this.shardsCount;

    for (let i = 0; i < this.shardsCount; i++)
      this.shards.set(i, new Shard(i, this));

    this.shards.forEach((shard) => shard.connect(false));
  }

  /** https://discord.com/developers/docs/resources/entitlement#consume-an-entitlement */
  consumeEntitlement(applicationId: snowflake, entitlementId: snowflake): void {
    this.rest.request(
      RESTMethods.Post,
      Endpoints.applicationEntitlementConsume(applicationId, entitlementId)
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule */
  async createAutoModerationRule(
    guildId: snowflake,
    options: {
      name: string;
      eventType: EventTypes;
      triggerType: TriggerTypes;
      triggerMetadata?: TriggerMetadata;
      actions: Array<AutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<snowflake>;
      exemptChannels?: Array<snowflake>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    const response = await this.rest.request<RawAutoModerationRule>(
      RESTMethods.Post,
      Endpoints.guildAutoModerationRules(guildId),
      {
        json: {
          name: options.name,
          event_type: options.eventType,
          trigger_type: options.triggerType,
          trigger_metadata:
            options.triggerMetadata !== undefined
              ? AutoModeration.triggerMetadataToRaw(options.triggerMetadata)
              : undefined,
          actions: options.actions.map((action) =>
            AutoModeration.actionToRaw(action)
          ),
          enabled: options.enabled,
          exempt_roles: options.exemptRoles,
          exempt_channels: options.exemptChannels,
        },
        reason,
      }
    );

    return AutoModeration.autoModerationRuleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#create-application-emoji */
  async createApplicationEmoji(
    applicationId: snowflake,
    options: {
      name: string;
      image: string;
    }
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Post,
      Endpoints.applicationEmojis(applicationId),
      {
        json: options,
      }
    );

    return Emojis.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-channel */
  async createChannel(
    guildId: snowflake,
    options: {
      name: string;
      type?: ChannelTypes | null;
      topic?: string | null;
      bitrate?: number | null;
      userLimit?: number | null;
      rateLimitPerUser?: number | null;
      position?: number | null;
      permissionOverwrites?: Array<
        Pick<Overwrite, "id" | "type"> & Partial<Overwrite>
      > | null;
      parentId?: snowflake | null;
      nsfw?: boolean | null;
      rtcRegion?: string | null;
      videoQualityMode?: VideoQualityModes | null;
      defaultAutoArchiveDuration?: number | null;
      defaultReactionEmoji?: DefaultReaction | null;
      availableTags?: Array<ForumTag> | null;
      defaultSortOrder?: SortOrderTypes | null;
      defaultForumLayout?: ForumLayoutTypes | null;
      defaultThreadRateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.guildChannels(guildId),
      {
        json: {
          name: options.name,
          type: options.type,
          topic: options.topic,
          bitrate: options.bitrate,
          user_limit: options.userLimit,
          rate_limit_per_user: options.rateLimitPerUser,
          position: options.position,
          permission_overwrites: options.permissionOverwrites,
          parent_id: options.parentId,
          nsfw: options.nsfw,
          rtc_region: options.rtcRegion,
          video_quality_mode: options.videoQualityMode,
          default_auto_archive_duration: options.defaultAutoArchiveDuration,
          default_reaction_emoji:
            options.defaultReactionEmoji !== undefined
              ? options.defaultReactionEmoji !== null
                ? {
                    emoji_id: options.defaultReactionEmoji.emojiId,
                    emoji_name: options.defaultReactionEmoji.emojiName,
                  }
                : null
              : undefined,
          available_tags: options.availableTags,
          default_sort_order: options.defaultSortOrder,
          default_forum_layout: options.defaultForumLayout,
          default_thread_rate_limit_per_user:
            options.defaultThreadRateLimitPerUser,
        },
        reason,
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#create-channel-invite */
  async createChannelInvite(
    channelId: snowflake,
    options: {
      maxAge?: number;
      maxUses?: number;
      temporary?: boolean;
      unique?: boolean;
      targetType?: InviteTargetTypes;
      targetUserId?: snowflake;
      targetApplicationId?: snowflake;
    },
    reason?: string
  ): Promise<Invite> {
    const response = await this.rest.request<RawInvite>(
      RESTMethods.Post,
      Endpoints.channelInvites(channelId),
      {
        json: {
          max_age: options.maxAge,
          max_uses: options.maxUses,
          temporary: options.temporary,
          unique: options.unique,
          target_type: options.targetType,
          target_user_id: options.targetUserId,
          target_application_id: options.targetApplicationId,
        },
        reason,
      }
    );

    return Invites.inviteFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#create-webhook */
  async createChannelWebhook(
    channelId: snowflake,
    options: {
      name: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    const response = await this.rest.request<RawWebhook>(
      RESTMethods.Post,
      Endpoints.channelWebhooks(channelId),
      {
        json: {
          name: options.name,
          avatar: options.avatar,
        },
        reason,
      }
    );

    return Webhooks.webhookFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#create-dm */
  async createDM(options: { recipientId: snowflake }): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.userChannels(),
      {
        json: {
          recipient_id: options.recipientId,
        },
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
  async createGlobalApplicationCommand(
    applicationId: snowflake,
    options: {
      name: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      integrationTypes?: Array<ApplicationIntegrationTypes>;
      contexts?: Array<InteractionContextTypes>;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Post,
      Endpoints.applicationCommands(applicationId),
      {
        json: {
          name: options.name,
          name_localizations: options.nameLocalizations,
          description: options.description,
          description_localizations: options.descriptionLocalizations,
          options: options.options?.map((option) =>
            ApplicationCommands.optionToRaw(option)
          ),
          default_member_permissions: options.defaultMemberPermissions,
          integration_types: options.integrationTypes,
          contexts: options.contexts,
          type: options.type,
          nsfw: options.nsfw,
        },
      }
    );

    return ApplicationCommands.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#create-group-dm */
  async createGroup(options: {
    accessTokens: Array<string>;
    nicks: Array<string>;
  }): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.userChannels(),
      {
        json: {
          access_tokens: options.accessTokens,
          nicks: options.nicks,
        },
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  async createGuildApplicationCommand(
    applicationId: snowflake,
    guildId: snowflake,
    options: {
      name: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Post,
      Endpoints.applicationGuildCommands(applicationId, guildId),
      {
        json: {
          name: options.name,
          name_localizations: options.nameLocalizations,
          description: options.description,
          description_localizations: options.descriptionLocalizations,
          options: options.options?.map((option) =>
            ApplicationCommands.optionToRaw(option)
          ),
          default_member_permissions: options.defaultMemberPermissions,
          type: options.type,
          nsfw: options.nsfw,
        },
      }
    );

    return ApplicationCommands.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  createGuildBan(
    guildId: snowflake,
    userId: snowflake,
    options?: {
      deleteMessageDays?: number;
      deleteMessageSeconds?: number;
    },
    reason?: string
  ): void {
    this.rest.request(RESTMethods.Put, Endpoints.guildBan(guildId, userId), {
      json: {
        delete_message_days: options?.deleteMessageDays,
        delete_message_seconds: options?.deleteMessageSeconds,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
  async createGuildEmoji(
    guildId: snowflake,
    options: {
      name: string;
      image: string;
      roles: Array<snowflake>;
    },
    reason?: string
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Post,
      Endpoints.guildEmojis(guildId),
      {
        json: {
          name: options.name,
          image: options.image,
          roles: options.roles,
        },
        reason,
      }
    );

    return Emojis.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-role */
  async createGuildRole(
    guildId: snowflake,
    options: {
      name?: string;
      permissions?: string;
      color?: number;
      colors?: RoleColors | null;
      hoist?: boolean;
      icon?: string | null;
      unicodeEmoji?: string | null;
      mentionable?: boolean;
    },
    reason?: string
  ): Promise<Role> {
    const response = await this.rest.request<RawRole>(
      RESTMethods.Post,
      Endpoints.guildRoles(guildId),
      {
        json: {
          name: options.name,
          permissions: options.permissions,
          color: options.color,
          colors: {
            primary_color: options.colors?.primaryColor,
            secondary_color: options.colors?.secondaryColor,
            tertiary_color: options.colors?.tertiaryColor,
          },
          hoist: options.hoist,
          icon: options.icon,
          unicode_emoji: options.unicodeEmoji,
          mentionable: options.mentionable,
        },
        reason,
      }
    );

    return Roles.roleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event */
  async createGuildScheduledEvent(
    guildId: snowflake,
    options: {
      channelId?: snowflake;
      entityMetadata?: GuildScheduledEventEntityMetadata;
      name: string;
      privacyLevel: GuildScheduledEventPrivacyLevel;
      scheduledStartTime: string;
      scheduledEndTime?: string;
      description?: string;
      entityType: GuildScheduledEventEntityTypes;
      image?: string;
      recurrenceRule?: GuildScheduledEventRecurrenceRule;
    },
    reason?: string
  ): Promise<GuildScheduledEvent> {
    const response = await this.rest.request<RawGuildScheduledEvent>(
      RESTMethods.Post,
      Endpoints.guildScheduledEvents(guildId),
      {
        json: {
          channel_id: options.channelId,
          entity_metadata: options.entityMetadata,
          name: options.name,
          privacy_level: options.privacyLevel,
          scheduled_start_time: options.scheduledEndTime,
          scheduled_end_time: options.scheduledEndTime,
          description: options.description,
          entity_type: options.entityType,
          image: options.image,
          recurrence_rule:
            options.recurrenceRule !== undefined
              ? GuildScheduledEvents.guildScheduledEventRecurrenceRuleToRaw(
                  options.recurrenceRule
                )
              : undefined,
        },
        reason,
      }
    );

    return GuildScheduledEvents.guildScheduledEventFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#create-guild-sticker */
  async createGuildSticker(
    guildId: snowflake,
    options: {
      name: string;
      description: string;
      tags: string;
      file: FileData;
    },
    reason?: string
  ): Promise<Sticker> {
    const formData = new FormData();

    formData.set("name", options.name);
    formData.set("description", options.description);
    formData.set("tags", options.tags);
    formData.set("file", new Blob([options.file.contents]), options.file.name);

    const response = await this.rest.request<RawSticker>(
      RESTMethods.Post,
      Endpoints.guildStickers(guildId),
      {
        form: formData,
        reason,
      }
    );

    return Stickers.stickerFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/soundboard#create-guild-soundboard-sound */
  async createGuildSoundboardSound(
    guildId: snowflake,
    options: {
      name: string;
      sound: Buffer;
      volume?: number | null;
      emojiId?: snowflake | null;
      emojiName?: snowflake | null;
    },
    reason?: string
  ): Promise<SoundboardSound> {
    const response = await this.rest.request<RawSoundboardSound>(
      RESTMethods.Get,
      Endpoints.guildSoundboardSounds(guildId),
      {
        json: {
          name: options.name,
          sound: options.sound,
          volume: options.volume,
          emoji_id: options.emojiId,
          emoji_name: options.emojiName,
        },
        reason,
      }
    );

    return Soundboards.soundboardSoundFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-template */
  async createGuildTemplate(
    guildId: snowflake,
    options: {
      name: string;
      description?: string | null;
    }
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Post,
      Endpoints.guildTemplates(guildId),
      {
        json: {
          name: options.name,
          description: options.description,
        },
      }
    );

    return GuildTemplates.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
  async createInteractionFollowupMessage(
    applicationId: snowflake,
    interactionToken: string,
    options: {
      content?: string;
      tts?: boolean;
      embeds?: Array<Embed>;
      allowedMentions?: AllowedMentions;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      >;
      files?: Array<FileData> | null;
      attachments?: Array<Pick<Attachment, "filename" | "description">>;
      flags?: MessageFlags;
      threadName?: string;
      appliedTags?: Array<string>;
      poll?: PollCreateParams;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.webhook(applicationId, interactionToken),
      {
        json: {
          content: options.content,
          tts: options.tts,
          embeds: options.embeds?.map((embed) => Messages.embedToRaw(embed)),
          allowed_mentions:
            options.allowedMentions !== undefined
              ? options.allowedMentions !== null
                ? {
                    parse: options.allowedMentions.parse,
                    roles: options.allowedMentions.roles,
                    users: options.allowedMentions.users,
                    replied_user: options.allowedMentions.repliedUser,
                  }
                : null
              : undefined,
          components:
            options.components !== undefined
              ? Messages.componentsToRaw(options.components)
              : undefined,
          attachments: options.attachments,
          flags: options.flags,
          thread_name: options.threadName,
          poll:
            options.poll !== undefined
              ? {
                  question: options.poll.question,
                  answers: options.poll.answers.map((answer) => ({
                    answer_id: answer.answerId,
                    poll_media: answer.pollMedia,
                  })),
                  duration: options.poll.duration,
                  allow_multiselect: options.poll.allowMultiselect,
                  layout_type: options.poll.layoutType,
                }
              : undefined,
        },
        files: options.files,
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
  async createInteractionResponse(
    interactionId: snowflake,
    interactionToken: string,
    options: InteractionResponse & {
      withResponse?: boolean;
    }
  ): Promise<void | InteractionCallbackResponse> {
    let json;
    let files;

    switch (options.type) {
      case InteractionCallbackType.ChannelMessageWithSource:
      case InteractionCallbackType.UpdateMessage:
        {
          json = {
            type: options.type,
            data: {
              content: options.data?.content,
              embeds:
                options.data?.embeds !== undefined
                  ? options.data.embeds.map((embed) =>
                      Messages.embedToRaw(embed)
                    )
                  : undefined,
              allowed_mentions:
                options.data?.allowedMentions !== undefined
                  ? {
                      parse: options.data.allowedMentions.parse,
                      roles: options.data.allowedMentions.roles,
                      users: options.data.allowedMentions.users,
                      replied_user: options.data.allowedMentions.repliedUser,
                    }
                  : undefined,
              flags: options.data?.flags,
              components:
                options.data?.components !== undefined
                  ? options.data?.components.map((component) => {
                      switch (component.type) {
                        case ComponentTypes.ActionRow:
                          return Components.actionRowToRaw(component);
                        case ComponentTypes.Section:
                          return Components.sectionToRaw(component);
                        case ComponentTypes.TextDisplay:
                          return Components.textDisplayToRaw(component);
                        case ComponentTypes.MediaGallery:
                          return Components.mediaGalleryToRaw(component);
                        case ComponentTypes.File:
                          return Components.fileToRaw(component);
                        case ComponentTypes.Separator:
                          return Components.separatorToRaw(component);
                        case ComponentTypes.Container:
                          return Components.containerToRaw(component);
                      }
                    })
                  : undefined,
              attachments: options.data?.attachments,
              poll:
                options.data?.poll !== undefined
                  ? {
                      question: options.data.poll.question,
                      answers: options.data.poll.answers.map((answer) => ({
                        answer_id: answer.answerId,
                        poll_media: answer.pollMedia,
                      })),
                      duration: options.data.poll.duration,
                      allow_multiselect: options.data.poll.allowMultiselect,
                      layout_type: options.data.poll.layoutType,
                    }
                  : undefined,
            },
          };
          files = options.data?.files;
        }
        break;
      case InteractionCallbackType.DeferredChannelMessageWithSource:
      case InteractionCallbackType.DeferredUpdateMessage:
        {
          json = {
            type: options.type,
            data: {
              flags: options.data?.flags,
            },
          };
        }
        break;
      case InteractionCallbackType.ApplicationCommandAutocompleteResult:
        {
          json = {
            type: options.type,
            data: {
              choices: options.data?.choices?.map((choice) => ({
                name: choice.name,
                name_localizations: choice.nameLocalizations,
                value: choice.value,
              })),
            },
          };
        }
        break;
      case InteractionCallbackType.Modal:
        {
          json = {
            type: options.type,
            data: {
              custom_id: options.data?.customId,
              components:
                options.data?.components !== undefined
                  ? options.data?.components.map((component) => {
                      switch (component.type) {
                        case ComponentTypes.ActionRow:
                          return Components.actionRowToRaw(component);
                        case ComponentTypes.TextDisplay:
                          return Components.textDisplayToRaw(component);
                        case ComponentTypes.Label:
                          return Components.labelToRaw(component);
                      }
                    })
                  : undefined,
              title: options.data?.title,
            },
          };
        }
        break;
      case InteractionCallbackType.PremiumRequired:
      case InteractionCallbackType.LaunchActivity:
        {
          json = {
            type: options.type,
            data: {},
          };
        }
        break;
    }

    if (options.withResponse) {
      const response = await this.rest.request<RawInteractionCallbackResponse>(
        RESTMethods.Post,
        Endpoints.interactionCallback(interactionId, interactionToken),
        {
          json,
          query: {
            with_response: options.withResponse,
          },
          files,
        }
      );

      return Interactions.interactionCallbackResponseFromRaw(response);
    } else {
      this.rest.request(
        RESTMethods.Post,
        Endpoints.interactionCallback(interactionId, interactionToken),
        {
          json,
          query: {
            with_response: options.withResponse,
          },
          files,
        }
      );
    }
  }

  /** https://discord.com/developers/docs/resources/lobby#create-lobby */
  async createLobby(options: {
    metadata?: Record<string, string> | null;
    members?: Array<Pick<LobbyMember, "id" | "metadata" | "flags">>;
    idleTimeoutSeconds?: number;
  }): Promise<Lobby> {
    const response = await this.rest.request<RawLobby>(
      RESTMethods.Post,
      Endpoints.lobbies(),
      {
        json: {
          metadata: options.metadata,
          members: options.members,
          idle_timeout_seconds: options.idleTimeoutSeconds,
        },
      }
    );

    return Lobbies.lobbyFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#create-message */
  async createMessage(
    channelId: snowflake,
    options: {
      content?: string;
      nonce?: string | number;
      tts?: boolean;
      embeds?: Array<Embed>;
      allowedMentions?: AllowedMentions;
      messageReference?: MessageReference;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      >;
      stickersIds?: Array<snowflake>;
      files?: Array<FileData>;
      attachments?: Array<Pick<Attachment, "filename" | "description">>;
      flags?: MessageFlags;
      enforceNonce?: boolean;
      poll?: PollCreateParams;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.channelMessages(channelId),
      {
        json: {
          content: options.content,
          nonce: options.nonce,
          tts: options.tts,
          embeds: options.embeds?.map((embed) => Messages.embedToRaw(embed)),
          allowed_mentions:
            options.allowedMentions !== undefined
              ? {
                  parse: options.allowedMentions.parse,
                  roles: options.allowedMentions.roles,
                  users: options.allowedMentions.users,
                  replied_user: options.allowedMentions.repliedUser,
                }
              : undefined,
          message_reference:
            options.messageReference !== undefined
              ? {
                  message_id: options.messageReference.messageId,
                  channel_id: options.messageReference.channelId,
                  guild_id: options.messageReference.guildId,
                  fail_if_not_exists: options.messageReference.failIfNotExists,
                }
              : undefined,
          components:
            options.components !== undefined
              ? Messages.componentsToRaw(options.components)
              : undefined,
          stickers_ids: options.stickersIds,
          attachments: options.attachments,
          flags: options.flags,
          enforce_nonce: options.enforceNonce,
          poll:
            options.poll !== undefined
              ? {
                  question: options.poll.question,
                  answers: options.poll.answers.map((answer) => ({
                    answer_id: answer.answerId,
                    poll_media: answer.pollMedia,
                  })),
                  duration: options.poll.duration,
                  allow_multiselect: options.poll.allowMultiselect,
                  layout_type: options.poll.layoutType,
                }
              : undefined,
        },
        files: options.files,
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#create-reaction */
  createMessageReaction(
    channelId: snowflake,
    messageId: snowflake,
    emoji: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelMessageReaction(channelId, messageId, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#create-stage-instance */
  async createStageInstance(
    options: {
      channelId: snowflake;
      topic: string;
      privacyLevel?: PrivacyLevel;
      sendStartNotifications?: boolean;
      guildScheduledEventId?: snowflake;
    },
    reason?: string
  ): Promise<StageInstance> {
    const response = await this.rest.request<RawStageInstance>(
      RESTMethods.Post,
      Endpoints.stageInstances(),
      {
        json: {
          channel_id: options.channelId,
          topic: options.topic,
          privacy_level: options.privacyLevel,
          send_start_notifications: options.sendStartNotifications,
          guild_scheduled_event_id: options.guildScheduledEventId,
        },
        reason,
      }
    );

    return StageInstances.stageInstanceFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/entitlement#create-test-entitlement */
  async createTestEntitlement(
    applicationId: snowflake,
    options: {
      skuId: snowflake;
      ownerId: snowflake;
      ownerType: number;
    }
  ): Promise<Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId">> {
    const response = await this.rest.request<
      Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id">
    >(RESTMethods.Post, Endpoints.applicationEntitlements(applicationId), {
      json: {
        sku_id: options.skuId,
        owner_id: options.ownerId,
        owner_type: options.ownerType,
      },
    });

    return Entitlements.testEntitlementFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel */
  async createThread(
    channelId: snowflake,
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
      message: {
        content?: string;
        embeds?: Array<Embed>;
        allowedMentions?: AllowedMentions;
        components?: Array<
          | ActionRow
          | Button
          | StringSelect
          | UserSelect
          | RoleSelect
          | MentionableSelect
          | ChannelSelect
          | Section
          | TextDisplay
          | Thumbnail
          | MediaGallery
          | File
          | Separator
          | Container
        >;
        stickerIds?: Array<snowflake>;
        attachments?: Array<Pick<Attachment, "filename" | "description">>;
        flags?: MessageFlags;
        files?: Array<FileData>;
      };
      appliedTags?: Array<snowflake>;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.threads(channelId),
      {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          message: {
            content: options.message.content,
            embeds: options.message.embeds?.map((embed) =>
              Messages.embedToRaw(embed)
            ),
            allowed_mentions:
              options.message.allowedMentions !== undefined
                ? {
                    parse: options.message.allowedMentions.parse,
                    roles: options.message.allowedMentions.roles,
                    users: options.message.allowedMentions.users,
                    replied_user: options.message.allowedMentions.repliedUser,
                  }
                : undefined,
            sticker_ids: options.message.stickerIds,
            attachments: options.message.attachments,
            flags: options.message.flags,
          },
          applied_tags: options.appliedTags,
        },
        files: options.message.files,
        reason,
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  async createThreadFromMessage(
    channelId: snowflake,
    messageId: snowflake,
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.threads(channelId, messageId),
      {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
        },
        reason,
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-without-message */
  async createThreadWithoutMessage(
    channelId: snowflake,
    options: {
      name: string;
      autoArchiveDuration?: number;
      type?: ChannelTypes;
      invitable?: boolean;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.threads(channelId),
      {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          type: options.type,
          invitable: options.invitable,
          rate_limit_per_user: options.rateLimitPerUser,
        },
        reason,
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#crosspost-message */
  async crosspostMessage(
    channelId: snowflake,
    messageId: snowflake
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.channelMessage(channelId, messageId)
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#delete-all-reactions */
  deleteAllMessageReactions(
    channelId: snowflake,
    messageId: snowflake,
    emoji?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessageAllReactions(channelId, messageId, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
  deleteAutoModerationRule(
    guildId: snowflake,
    autoModerationRuleId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildAutoModerationRule(guildId, autoModerationRuleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#delete-application-emoji */
  deleteApplicationEmoji(applicationId: snowflake, emojiId: snowflake): void {
    this.rest.request<RawEmoji>(
      RESTMethods.Delete,
      Endpoints.applicationEmoji(applicationId, emojiId)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#deleteclose-channel */
  async deleteChannel(channelId: snowflake, reason?: string): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Delete,
      Endpoints.channel(channelId),
      {
        reason,
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#delete-channel-permission */
  deleteChannelPermission(
    channelId: snowflake,
    overwriteId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelPermission(channelId, overwriteId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command */
  deleteGlobalApplicationCommand(
    applicationId: snowflake,
    commandId: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationCommand(applicationId, commandId)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  deleteGuildApplicationCommand(
    applicationId: snowflake,
    guildId: snowflake,
    commandId: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationGuildCommand(applicationId, guildId, commandId)
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  deleteGuildEmoji(
    guildId: snowflake,
    emojiId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildEmoji(guildId, emojiId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  deleteGuildIntegration(
    guildId: snowflake,
    integrationId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildIntegration(guildId, integrationId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-role */
  deleteGuildRole(
    guildId: snowflake,
    roleId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildRole(guildId, roleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event */
  deleteGuildScheduledEvent(
    guildId: snowflake,
    guildScheduledEventId: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildScheduledEvent(guildId, guildScheduledEventId)
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
  deleteGuildSticker(
    guildId: snowflake,
    stickerId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildSticker(guildId, stickerId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/soundboard#delete-guild-soundboard-sound */
  deleteGuildSoundboardSound(
    guildId: snowflake,
    soundId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Get,
      Endpoints.guildSoundboardSound(guildId, soundId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  async deleteGuildTemplate(
    guildId: snowflake,
    code: string
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Delete,
      Endpoints.guildTemplate(guildId, code)
    );

    return GuildTemplates.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/invite#delete-invite */
  async deleteInvite(code: string, reason?: string): Promise<Invite> {
    const response = await this.rest.request<RawInvite>(
      RESTMethods.Delete,
      Endpoints.invite(code),
      {
        reason,
      }
    );

    return Invites.inviteFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
  deleteInteractionFollowupMessage(
    applicationId: snowflake,
    interactionToken: string,
    messageId: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(applicationId, interactionToken, messageId)
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
  deleteInteractionResponse(
    applicationId: snowflake,
    interactionToken: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(applicationId, interactionToken)
    );
  }

  /** https://discord.com/developers/docs/resources/lobby#delete-lobby */
  deleteLobby(lobbyId: snowflake): void {
    this.rest.request(RESTMethods.Delete, Endpoints.lobby(lobbyId));
  }

  /** https://discord.com/developers/docs/resources/message#delete-message */
  deleteMessage(
    channelId: snowflake,
    messageId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessage(channelId, messageId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/message#delete-user-reaction */
  deleteMessageReaction(
    channelId: snowflake,
    messageId: snowflake,
    emoji: string,
    userId?: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessageReaction(channelId, messageId, emoji, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance */
  deleteStageInstance(channelId: snowflake, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.stageInstance(channelId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement */
  deleteTestEntitlement(
    applicationId: snowflake,
    entitlementId: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationEntitlement(applicationId, entitlementId)
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook */
  deleteWebhook(webhookId: snowflake, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.webhook(webhookId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
  deleteWebhookMessage(
    webhookId: snowflake,
    webhookToken: string,
    messageId: snowflake,
    options?: {
      threadId?: snowflake;
    }
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(webhookId, webhookToken, messageId),
      {
        query: {
          thread_id: options?.threadId,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  deleteWebhookWithToken(
    webhookId: snowflake,
    webhookToken: string,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhook(webhookId, webhookToken),
      {
        reason,
        authorization: false,
      }
    );
  }

  /** https://discord.com/developers/docs/events/gateway#initiating-a-disconnect */
  disconnect(): void {
    this.shards.forEach((shard) => shard.disconnect());
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
  async editAutoModerationRule(
    guildId: snowflake,
    autoModerationRuleId: snowflake,
    options: {
      name?: string;
      eventType?: EventTypes;
      triggerType?: TriggerTypes;
      triggerMetadata?: TriggerMetadata;
      actions?: Array<AutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<snowflake>;
      exemptChannels?: Array<snowflake>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    const response = await this.rest.request<RawAutoModerationRule>(
      RESTMethods.Patch,
      Endpoints.guildAutoModerationRule(guildId, autoModerationRuleId),
      {
        json: {
          name: options.name,
          event_type: options.eventType,
          trigger_type: options.triggerType,
          trigger_metadata:
            options.triggerMetadata !== undefined
              ? AutoModeration.triggerMetadataToRaw(options.triggerMetadata)
              : undefined,
          actions: options.actions?.map((action) =>
            AutoModeration.actionToRaw(action)
          ),
          enabled: options.enabled,
          exempt_roles: options.exemptRoles,
          exempt_channels: options.exemptChannels,
        },
        reason,
      }
    );

    return AutoModeration.autoModerationRuleFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  async editApplicationCommandPermissions(
    applicationId: snowflake,
    guildId: snowflake,
    commandId: snowflake,
    options: {
      permissions: Array<ApplicationCommandPermission>;
    }
  ): Promise<GuildApplicationCommandPermissions> {
    const response =
      await this.rest.request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Put,
        Endpoints.applicationCommandPermissions(
          applicationId,
          guildId,
          commandId
        ),
        {
          json: {
            permissions: options.permissions.map((permission) => ({
              id: permission.type,
              type: permission.type,
              permission: permission.permission,
            })),
          },
        }
      );

    return Guilds.guildApplicationCommandPermissionsFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-application-emoji */
  async editApplicationEmoji(
    applicationId: snowflake,
    emojiId: snowflake,
    options: {
      name: string;
    }
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Patch,
      Endpoints.applicationEmoji(applicationId, emojiId),
      {
        json: options,
      }
    );

    return Emojis.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#modify-channel */
  async editChannel(
    channelId: snowflake,
    options: {
      name?: string;
      icon?: string;
      type?: ChannelTypes;
      position?: number | null;
      topic?: string | null;
      nsfw?: boolean | null;
      rateLimitPerUser?: number | null;
      bitrate?: number | null;
      userLimit?: number | null;
      permissionOverwrites?: Array<
        Pick<Overwrite, "id" | "type"> & Partial<Overwrite>
      > | null;
      parentId?: snowflake | null;
      rtcRegion?: string | null;
      videoQualityMode?: VideoQualityModes | null;
      defaultAutoArchiveDuration?: number | null;
      flags?: ChannelFlags;
      availableTags?: Array<ForumTag>;
      defaultReactionEmoji?: DefaultReaction | null;
      defaultThreadRateLimitPerUser?: number;
      defaultSortOrder?: SortOrderTypes | null;
      defaultForumLayout?: ForumLayoutTypes;
      archived?: boolean;
      autoArchiveDuration?: number;
      locked?: boolean;
      invitable?: boolean;
      appliedTags?: Array<snowflake>;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Patch,
      Endpoints.channel(channelId),
      {
        json: {
          name: options.name,
          icon: options.icon,
          type: options.type,
          position: options.position,
          topic: options.topic,
          nsfw: options.nsfw,
          rate_limit_per_user: options.rateLimitPerUser,
          bitrate: options.bitrate,
          user_limit: options.userLimit,
          permission_overwrites: options.permissionOverwrites,
          parent_id: options.parentId,
          rtc_region: options.rtcRegion,
          video_quality_mode: options.videoQualityMode,
          default_auto_archive_duration: options.defaultAutoArchiveDuration,
          flags: options.flags,
          available_tags: options.availableTags,
          default_reaction_emoji:
            options.defaultReactionEmoji !== undefined
              ? options.defaultReactionEmoji !== null
                ? {
                    emoji_id: options.defaultReactionEmoji.emojiId,
                    emoji_name: options.defaultReactionEmoji.emojiName,
                  }
                : null
              : undefined,
          default_thread_rate_limit_per_user:
            options.defaultThreadRateLimitPerUser,
          default_sort_order: options.defaultSortOrder,
          default_forum_layout: options.defaultForumLayout,
          archived: options.archived,
          auto_archive_duration: options.autoArchiveDuration,
          locked: options.locked,
          invitable: options.invitable,
          applied_tags: options.appliedTags,
        },
        reason,
      }
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
  editChannelPermissions(
    channelId: snowflake,
    overwriteId: snowflake,
    options: {
      allow?: string | null;
      deny?: string | null;
      type: number;
    },
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelPermission(channelId, overwriteId),
      {
        json: options,
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
  editChannelPositions(
    guildId: snowflake,
    options: Array<{
      id: snowflake;
      position?: number | null;
      lockPermissions?: boolean | null;
      parentId?: snowflake | null;
    }>
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildChannels(guildId), {
      json: options.map((data) => ({
        id: data.id,
        position: data.position,
        lock_permissions: data.lockPermissions,
        parent_id: data.parentId,
      })),
    });
  }

  /** https://discord.com/developers/docs/resources/user#modify-current-user */
  async editCurrentUser(options: {
    username?: string;
    avatar?: string | null;
    banner?: string | null;
  }): Promise<User> {
    const response = await this.rest.request<RawUser>(
      RESTMethods.Patch,
      Endpoints.user(),
      {
        json: {
          username: options.username,
          avatar: options.avatar,
          banner: options.banner,
        },
      }
    );

    return Users.userFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-member */
  async editCurrentGuildMember(
    guildId: snowflake,
    options: {
      nick?: string | null;
      banner?: string | null;
      avatar?: string | null;
      bio?: string | null;
    },
    reason?: string
  ): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Patch,
      Endpoints.guildMember(guildId),
      {
        json: options,
        reason,
      }
    );

    return Guilds.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state */
  editCurrentUserVoiceState(
    guildId: snowflake,
    options: {
      channelId?: snowflake;
      suppress?: boolean;
      requestToSpeakTimestamp?: timestamp | null;
    }
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildVoiceState(guildId), {
      json: {
        channel_id: options.channelId,
        suppress: options.suppress,
        requestToSpeakTimestamp: options.requestToSpeakTimestamp,
      },
    });
  }

  /** https://discord.com/developers/docs/resources/application#edit-current-application */
  async editCurrentApplication(options: {
    customInstallURL?: string;
    description?: string;
    roleConnectionsVerificationURL?: string;
    installParams?: InstallParams;
    integrationTypesConfig?: Record<
      ApplicationIntegrationTypes,
      ApplicationIntegrationTypeConfiguration
    >;
    flags?: ApplicationFlags;
    icon?: string | null;
    coverImage?: string | null;
    interactionsEndpointURL?: string;
    tags?: Array<string>;
  }): Promise<Application> {
    const response = await this.rest.request<RawApplication>(
      RESTMethods.Patch,
      Endpoints.applicationUser(),
      {
        json: {
          custom_install_url: options.customInstallURL,
          description: options.description,
          role_connections_verification_url:
            options.roleConnectionsVerificationURL,
          install_params: options.installParams,
          integration_types_config:
            options.integrationTypesConfig !== undefined
              ? {
                  "0": {
                    oauth2_install_params:
                      options.integrationTypesConfig?.[0].oauth2InstallParams,
                  },
                  "1": {
                    oauth2_install_params:
                      options.integrationTypesConfig?.[1].oauth2InstallParams,
                  },
                }
              : undefined,
          flags: options.flags,
          icon: options.icon,
          cover_image: options.coverImage,
          interactions_endpoint_url: options.interactionsEndpointURL,
          tags: options.tags,
        },
      }
    );

    return Applications.applicationFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  async editGlobalApplicationCommand(
    applicationId: snowflake,
    commandId: snowflake,
    options: {
      name?: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      integrationTypes?: Array<ApplicationIntegrationTypes>;
      contexts?: Array<InteractionContextTypes>;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Patch,
      Endpoints.applicationCommand(applicationId, commandId),
      {
        json: {
          name: options.name,
          name_localizations: options.nameLocalizations,
          description: options.description,
          description_localizations: options.descriptionLocalizations,
          options: options.options?.map((option) =>
            ApplicationCommands.optionToRaw(option)
          ),
          default_member_permissions: options.defaultMemberPermissions,
          integration_types: options.integrationTypes,
          contexts: options.contexts,
          nsfw: options.nsfw,
        },
      }
    );

    return ApplicationCommands.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild */
  async editGuild(
    guildId: snowflake,
    options: {
      name?: string;
      verificationLevel?: VerificationLevel | null;
      defaultMessageNotifications?: DefaultMessageNotificationLevel | null;
      explicitContentFilter?: ExplicitContentFilterLevel | null;
      afkChannelId?: snowflake | null;
      afkTimeout?: number;
      icon?: string | null;
      splash?: string | null;
      discoverySplash?: string | null;
      banner?: string | null;
      systemChannelId?: snowflake | null;
      systemChannelFlags?: SystemChannelFlags;
      rulesChannelId?: snowflake | null;
      publicUpdatesChannelId?: snowflake | null;
      preferredLocale?: string | null;
      features?: Array<GuildFeatures>;
      description?: string | null;
      premiumProgressBarEnabled?: boolean;
      safetyAlertsChannelId?: snowflake | null;
    },
    reason?: string
  ): Promise<Guild> {
    const response = await this.rest.request<RawGuild>(
      RESTMethods.Patch,
      Endpoints.guild(guildId),
      {
        json: {
          name: options.name,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          afk_channel_id: options.afkChannelId,
          afk_timeout: options.afkTimeout,
          icon: options.icon,
          splash: options.splash,
          discovery_splash: options.discoverySplash,
          banner: options.banner,
          system_channel_id: options.systemChannelId,
          system_channel_flags: options.systemChannelFlags,
          rules_channel_id: options.rulesChannelId,
          public_updates_channel_id: options.publicUpdatesChannelId,
          preferred_locale: options.preferredLocale,
          features: options.features,
          description: options.description,
          premium_progress_bar_enabled: options.premiumProgressBarEnabled,
          safety_alerts_channel_id: options.safetyAlertsChannelId,
        },
        reason,
      }
    );

    return Guilds.guildFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  async editGuildApplicationCommand(
    applicationId: snowflake,
    guildId: snowflake,
    commandId: snowflake,
    options: {
      name?: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Patch,
      Endpoints.applicationGuildCommand(applicationId, guildId, commandId),
      {
        json: {
          name: options.name,
          name_localizations: options.nameLocalizations,
          description: options.description,
          description_localizations: options.descriptionLocalizations,
          options: options.options?.map((option) =>
            ApplicationCommands.optionToRaw(option)
          ),
          default_member_permissions: options.defaultMemberPermissions,
          nsfw: options.nsfw,
        },
      }
    );

    return ApplicationCommands.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  async editGuildEmoji(
    guildId: snowflake,
    emojiId: snowflake,
    options: {
      name?: string;
      roles?: Array<snowflake> | null;
    },
    reason?: string
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Patch,
      Endpoints.guildEmoji(guildId, emojiId),
      {
        json: {
          name: options.name,
          roles: options.roles,
        },
        reason,
      }
    );

    return Emojis.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-incidents-actions */
  async editGuildIncidentsActions(
    guildId: snowflake,
    options?: {
      invitesDisabledUntil?: timestamp | null;
      dmsDisabledUntil?: timestamp | null;
    },
    reason?: string
  ): Promise<IncidentsData> {
    const response = await this.rest.request<RawIncidentsData>(
      RESTMethods.Put,
      Endpoints.guildIncidentsActions(guildId),
      {
        json: {
          invites_disabled_until: options?.invitesDisabledUntil,
          dms_disabled_until: options?.dmsDisabledUntil,
        },
        reason,
      }
    );

    return {
      invitesDisabledUntil: response.invites_disabled_until,
      dmsDisabledUntil: response.dms_disabled_until,
      dmSpamDetectedAt: response.dm_spam_detected_at,
      raidDetectedAt: response.raid_detected_at,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  async editGuildMember(
    guildId: snowflake,
    userId: snowflake,
    options: {
      nick?: string | null;
      roles?: Array<snowflake> | null;
      mute?: boolean | null;
      deaf?: boolean | null;
      channelId?: snowflake | null;
      communicationDisabledUntil?: timestamp | null;
      flags?: GuildMemberFlags | null;
    },
    reason?: string
  ): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Patch,
      Endpoints.guildMember(guildId, userId),
      {
        json: {
          nick: options.nick,
          roles: options.roles,
          mute: options.mute,
          deaf: options.deaf,
          channel_id: options.channelId,
          communication_disabled_until: options.communicationDisabledUntil,
          flags: options.flags,
        },
        reason,
      }
    );

    return Guilds.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-onboarding */
  editGuildOnboarding(
    guildId: snowflake,
    options: {
      prompts?: Array<OnboardingPrompt>;
      defaultChannelIds?: Array<snowflake>;
      enabled?: boolean;
      mode?: OnboardingMode;
    },
    reason?: string
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildOnboarding(guildId), {
      json: {
        prompts: options.prompts?.map((prompt) => ({
          id: prompt.id,
          type: prompt.type,
          options: prompt.options.map((promptOption) => ({
            id: promptOption.id,
            channel_ids: promptOption.channelIds,
            role_ids: promptOption.roleIds,
            emoji:
              promptOption.emoji !== undefined
                ? Emojis.emojiToRaw(promptOption.emoji)
                : undefined,
            emoji_id: promptOption.emojiId,
            emoji_name: promptOption.emojiName,
            emoji_animated: promptOption.emojiAnimated,
            title: promptOption.title,
            description: promptOption.description,
          })),
          title: prompt.id,
          single_select: prompt.id,
          required: prompt.id,
          in_onboarding: prompt.id,
        })),
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role */
  async editGuildRole(
    guildId: snowflake,
    roleId: snowflake,
    options?: {
      name?: string | null;
      permissions?: string | null;
      color?: number | null;
      colors?: RoleColors | null;
      hoist?: boolean | null;
      icon?: string | null;
      unicodeEmoji?: string | null;
      mentionable?: boolean | null;
    },
    reason?: string
  ): Promise<Role> {
    const response = await this.rest.request<RawRole>(
      RESTMethods.Patch,
      Endpoints.guildRole(guildId, roleId),
      {
        json: {
          name: options?.name,
          permissions: options?.permissions,
          color: options?.color,
          colors: {
            primary_color: options?.colors?.primaryColor,
            secondary_color: options?.colors?.secondaryColor,
            tertiary_color: options?.colors?.tertiaryColor,
          },
          hoist: options?.hoist,
          icon: options?.icon,
          unicode_emoji: options?.unicodeEmoji,
          mentionable: options?.mentionable,
        },
        reason,
      }
    );

    return Roles.roleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
  async editGuildRolePositions(
    guildId: snowflake,
    options: Array<{
      id: snowflake;
      position?: number | null;
    }>,
    reason?: string
  ): Promise<Array<Role>> {
    const response = await this.rest.request<Array<RawRole>>(
      RESTMethods.Patch,
      Endpoints.guildRoles(guildId),
      {
        json: options,
        reason,
      }
    );

    return response.map((role) => Roles.roleFromRaw(role));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
  async editGuildScheduledEvent(
    guildId: snowflake,
    guildScheduledEventId: snowflake,
    options: {
      channelId?: snowflake | null;
      entityMetadata?: GuildScheduledEventEntityMetadata | null;
      name?: string;
      privacyLevel?: GuildScheduledEventPrivacyLevel;
      scheduledStartTime?: timestamp;
      scheduledEndTime?: timestamp;
      description?: string | null;
      entityType?: GuildScheduledEventEntityTypes;
      status?: GuildScheduledEventStatus;
      image?: string;
      recurrenceRule?: GuildScheduledEventRecurrenceRule | null;
    },
    reason?: string
  ): Promise<GuildScheduledEvent> {
    const response = await this.rest.request<RawGuildScheduledEvent>(
      RESTMethods.Patch,
      Endpoints.guildScheduledEvent(guildId, guildScheduledEventId),
      {
        json: {
          channel_id: options.channelId,
          entity_metadata: options.entityMetadata,
          name: options.name,
          privacy_level: options.privacyLevel,
          scheduled_start_time: options.scheduledStartTime,
          scheduled_end_time: options.scheduledEndTime,
          description: options.description,
          entityType: options.entityType,
          status: options.status,
          image: options.image,

          recurrence_rule:
            options.recurrenceRule !== undefined
              ? options.recurrenceRule !== null
                ? GuildScheduledEvents.guildScheduledEventRecurrenceRuleToRaw(
                    options.recurrenceRule
                  )
                : null
              : undefined,
        },
        reason,
      }
    );

    return GuildScheduledEvents.guildScheduledEventFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
  async editGuildSticker(
    guildId: snowflake,
    stickerId: snowflake,
    options: {
      name?: string;
      description?: string | null;
      tags?: string;
    },
    reason?: string
  ): Promise<Sticker> {
    const response = await this.rest.request<RawSticker>(
      RESTMethods.Patch,
      Endpoints.guildSticker(guildId, stickerId),
      {
        json: {
          name: options.name,
          description: options.description,
          tags: options.tags,
        },
        reason,
      }
    );

    return Stickers.stickerFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/soundboard#edit-guild-soundboard-sound */
  async editGuildSoundboardSound(
    guildId: snowflake,
    soundId: snowflake,
    options: {
      name?: string;
      volume?: number | null;
      emojiId?: snowflake | null;
      emojiName?: snowflake | null;
    },
    reason?: string
  ): Promise<SoundboardSound> {
    const response = await this.rest.request<RawSoundboardSound>(
      RESTMethods.Get,
      Endpoints.guildSoundboardSound(guildId, soundId),
      {
        json: {
          name: options.name,
          volume: options.volume,
          emoji_id: options.emojiId,
          emoji_name: options.emojiName,
        },
        reason,
      }
    );

    return Soundboards.soundboardSoundFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  async editGuildTemplate(
    guildId: snowflake,
    code: string,
    options: {
      name?: string;
      description?: string | null;
    }
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Patch,
      Endpoints.guildTemplate(guildId, code),
      {
        json: {
          name: options.name,
          description: options.description,
        },
      }
    );

    return GuildTemplates.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
  async editGuildWelcomeScreen(
    guildId: snowflake,
    options: {
      enabled?: boolean | null;
      welcomeChannels?: Array<WelcomeScreenChannel> | null;
      description?: string | null;
    },
    reason?: string
  ): Promise<WelcomeScreen> {
    const response = await this.rest.request<RawWelcomeScreen>(
      RESTMethods.Patch,
      Endpoints.guildWelcomeScreen(guildId),
      {
        json: {
          enabled: options.enabled,
          welcome_channels: options.welcomeChannels?.map((welcomeChannel) => ({
            channel_id: welcomeChannel.channelId,
            description: welcomeChannel.description,
            emoji_id: welcomeChannel.emojiId,
            emoji_name: welcomeChannel.emojiName,
          })),
          description: options.description,
        },
        reason,
      }
    );

    return {
      description: response.description,
      welcomeChannels: response.welcome_channels.map(
        (welcomeScreenChannel) => ({
          channelId: welcomeScreenChannel.channel_id,
          description: welcomeScreenChannel.description,
          emojiId: welcomeScreenChannel.emoji_id,
          emojiName: welcomeScreenChannel.emoji_name,
        })
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-widget */
  async editGuildWidget(
    guildId: snowflake,
    options: {
      enabled?: boolean;
      channelId?: boolean;
    },
    reason?: string
  ): Promise<GuildWidgetSettings> {
    const response = await this.rest.request<RawGuildWidgetSettings>(
      RESTMethods.Patch,
      Endpoints.guildWidgetSettings(guildId),
      {
        json: {
          enabled: options.enabled,
          channel_id: options.channelId,
        },
        reason,
      }
    );

    return {
      enabled: response.enabled,
      channelId: response.channel_id,
    };
  }

  /** https://discord.com/developers/docs/resources/lobby#modify-lobby */
  async editLobby(
    lobbyId: snowflake,
    options: {
      metadata?: Record<string, string> | null;
      members?: Array<Pick<LobbyMember, "id" | "metadata" | "flags">>;
      idleTimeoutSeconds?: number;
    }
  ): Promise<Lobby> {
    const response = await this.rest.request<RawLobby>(
      RESTMethods.Patch,
      Endpoints.lobby(lobbyId),
      {
        json: {
          metadata: options.metadata,
          members: options.members,
          idle_timeout_seconds: options.idleTimeoutSeconds,
        },
      }
    );

    return Lobbies.lobbyFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#edit-message */
  async editMessage(
    channelId: snowflake,
    messageId: snowflake,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      > | null;
      files?: Array<FileData> | null;
      attachments?: Array<Attachment> | null;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Patch,
      Endpoints.channelMessage(channelId, messageId),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => Messages.embedToRaw(embed))
              : null,
          allowed_mentions:
            options.allowedMentions !== undefined
              ? options.allowedMentions !== null
                ? {
                    parse: options.allowedMentions.parse,
                    roles: options.allowedMentions.roles,
                    users: options.allowedMentions.users,
                    replied_user: options.allowedMentions.repliedUser,
                  }
                : null
              : undefined,
          components:
            options.components !== undefined
              ? options.components !== null
                ? Messages.componentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            Messages.attachmentToRaw(attachment)
          ),
          flags: options.flags,
        },
        files: options.files,
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance */
  async editStageInstance(
    channelId: snowflake,
    options: {
      topic?: string;
      privacyLevel?: PrivacyLevel;
    },
    reason?: string
  ): Promise<StageInstance> {
    const response = await this.rest.request<RawStageInstance>(
      RESTMethods.Patch,
      Endpoints.stageInstance(channelId),
      {
        json: {
          topic: options.topic,
          privacy_level: options.privacyLevel,
        },
        reason,
      }
    );

    return StageInstances.stageInstanceFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
  async editInteractionFollowupMessage(
    applicationId: snowflake,
    interactionToken: string,
    messageId: snowflake,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      > | null;
      files?: Array<FileData> | null;
      attachments?: Array<Partial<Attachment>> | null;
      poll?: PollCreateParams | null;
      threadId?: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.webhookMessage(applicationId, interactionToken, messageId),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => Messages.embedToRaw(embed))
              : null,
          allowed_mentions:
            options.allowedMentions !== undefined
              ? options.allowedMentions !== null
                ? {
                    parse: options.allowedMentions.parse,
                    roles: options.allowedMentions.roles,
                    users: options.allowedMentions.users,
                    replied_user: options.allowedMentions.repliedUser,
                  }
                : null
              : undefined,
          components:
            options.components !== undefined
              ? options.components !== null
                ? Messages.componentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            title: attachment.title,
            description: attachment.description,
            content_type: attachment.contentType,
            size: attachment.size,
            url: attachment.url,
            proxy_url: attachment.proxyURL,
            height: attachment.height,
            width: attachment.width,
            ephemeral: attachment.ephemeral,
            duration_secs: attachment.durationSecs,
            waveform: attachment.waveform,
            flags: attachment.flags,
          })),
          poll:
            options.poll !== undefined
              ? options.poll !== null
                ? {
                    question: options.poll.question,
                    answers: options.poll.answers.map((answer) => ({
                      answer_id: answer.answerId,
                      poll_media: answer.pollMedia,
                    })),
                    duration: options.poll.duration,
                    allow_multiselect: options.poll.allowMultiselect,
                    layout_type: options.poll.layoutType,
                  }
                : null
              : undefined,
        },
        files: options.files,
        query: {
          thread_id: options.threadId,
        },
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
  async editInteractionResponse(
    applicationId: snowflake,
    interactionToken: string,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      > | null;
      files?: Array<FileData> | null;
      attachments?: Array<Partial<Attachment>> | null;
      poll?: PollCreateParams | null;
      threadId?: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Patch,
      Endpoints.webhookMessage(applicationId, interactionToken),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => Messages.embedToRaw(embed))
              : null,
          allowed_mentions:
            options.allowedMentions !== undefined
              ? options.allowedMentions !== null
                ? {
                    parse: options.allowedMentions.parse,
                    roles: options.allowedMentions.roles,
                    users: options.allowedMentions.users,
                    replied_user: options.allowedMentions.repliedUser,
                  }
                : null
              : undefined,
          components:
            options.components !== undefined
              ? options.components !== null
                ? Messages.componentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            title: attachment.title,
            description: attachment.description,
            content_type: attachment.contentType,
            size: attachment.size,
            url: attachment.url,
            proxy_url: attachment.proxyURL,
            height: attachment.height,
            width: attachment.width,
            ephemeral: attachment.ephemeral,
            duration_secs: attachment.durationSecs,
            waveform: attachment.waveform,
            flags: attachment.flags,
          })),
          poll:
            options.poll !== undefined
              ? options.poll !== null
                ? {
                    question: options.poll.question,
                    answers: options.poll.answers.map((answer) => ({
                      answer_id: answer.answerId,
                      poll_media: answer.pollMedia,
                    })),
                    duration: options.poll.duration,
                    allow_multiselect: options.poll.allowMultiselect,
                    layout_type: options.poll.layoutType,
                  }
                : null
              : undefined,
        },
        files: options.files,
        query: {
          thread_id: options.threadId,
        },
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-user-voice-state */
  editUserVoiceState(
    guildId: snowflake,
    userId: snowflake,
    options: {
      channelId?: snowflake;
      suppress?: boolean;
    }
  ): void {
    this.rest.request(
      RESTMethods.Patch,
      Endpoints.guildVoiceState(guildId, userId),
      {
        json: {
          channel_id: options.channelId,
          suppress: options.suppress,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook */
  async editWebhook(
    webhookId: snowflake,
    options: {
      name?: string;
      avatar?: string | null;
      channelId?: snowflake;
    },
    reason?: string
  ): Promise<Webhook> {
    const response = await this.rest.request<RawWebhook>(
      RESTMethods.Patch,
      Endpoints.webhook(webhookId),
      {
        json: {
          name: options.name,
          avatar: options.avatar,
          channel_id: options.channelId,
        },
        reason,
      }
    );

    return Webhooks.webhookFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
  async editWebhookMessage(
    webhookId: snowflake,
    webhookToken: string,
    messageId: snowflake,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      > | null;
      files?: Array<FileData> | null;
      attachments?: Array<Partial<Attachment>> | null;
      poll?: PollCreateParams | null;
      threadId?: snowflake;
      withComponents?: boolean;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Patch,
      Endpoints.webhookMessage(webhookId, webhookToken, messageId),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => Messages.embedToRaw(embed))
              : null,
          allowed_mentions:
            options.allowedMentions !== undefined
              ? options.allowedMentions !== null
                ? {
                    parse: options.allowedMentions.parse,
                    roles: options.allowedMentions.roles,
                    users: options.allowedMentions.users,
                    replied_user: options.allowedMentions.repliedUser,
                  }
                : null
              : undefined,
          components:
            options.components !== undefined
              ? options.components !== null
                ? Messages.componentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            title: attachment.title,
            description: attachment.description,
            content_type: attachment.contentType,
            size: attachment.size,
            url: attachment.url,
            proxy_url: attachment.proxyURL,
            height: attachment.height,
            width: attachment.width,
            ephemeral: attachment.ephemeral,
            duration_secs: attachment.durationSecs,
            waveform: attachment.waveform,
            flags: attachment.flags,
          })),
          poll:
            options.poll !== undefined
              ? options.poll !== null
                ? {
                    question: options.poll.question,
                    answers: options.poll.answers.map((answer) => ({
                      answer_id: answer.answerId,
                      poll_media: answer.pollMedia,
                    })),
                    duration: options.poll.duration,
                    allow_multiselect: options.poll.allowMultiselect,
                    layout_type: options.poll.layoutType,
                  }
                : null
              : undefined,
        },
        files: options.files,
        query: {
          thread_id: options.threadId,
          with_components: options.withComponents,
        },
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  async editWebhookWithToken(
    webhookId: snowflake,
    webhookToken: string,
    options: {
      name?: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    const response = await this.rest.request<RawWebhook>(
      RESTMethods.Patch,
      Endpoints.webhook(webhookId, webhookToken),
      {
        json: {
          name: options.name,
          avatar: options.avatar,
        },
        reason,
        authorization: false,
      }
    );

    return Webhooks.webhookFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/poll#end-poll */
  async endPoll(channelId: snowflake, messageId: snowflake): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.pollExpire(channelId, messageId)
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-webhook */
  async executeWebhook(
    webhookId: snowflake,
    webhookToken: string,
    options: {
      content?: string;
      username?: string;
      avatarURL?: string;
      tts?: boolean;
      embeds?: Array<Embed>;
      allowedMentions?: AllowedMentions;
      components?: Array<
        | ActionRow
        | Section
        | TextDisplay
        | MediaGallery
        | File
        | Separator
        | Container
      >;
      files?: Array<FileData>;
      attachments?: Array<Pick<Attachment, "filename" | "description">>;
      flags?: MessageFlags;
      threadName?: string;
      appliedTags?: Array<snowflake>;
      poll?: PollCreateParams;
      wait?: boolean;
      threadId?: snowflake;
      withComponents?: boolean;
    }
  ): Promise<Message | null> {
    const response = await this.rest.request<RawMessage | null>(
      RESTMethods.Post,
      Endpoints.webhook(webhookId, webhookToken),
      {
        json: {
          content: options.content,
          username: options.username,
          avatar_url: options.avatarURL,
          tts: options.tts,
          embeds: options.embeds?.map((embed) => Messages.embedToRaw(embed)),
          allowed_mentions:
            options.allowedMentions !== undefined
              ? {
                  parse: options.allowedMentions.parse,
                  roles: options.allowedMentions.roles,
                  users: options.allowedMentions.users,
                  replied_user: options.allowedMentions.repliedUser,
                }
              : undefined,
          components:
            options.components !== undefined
              ? Messages.componentsToRaw(options.components)
              : undefined,
          attachments: options.attachments,
          flags: options.flags,
          thread_name: options.threadName,
          applied_tags: options.appliedTags,
          poll:
            options.poll !== undefined
              ? {
                  question: options.poll.question,
                  answers: options.poll.answers.map((answer) => ({
                    answer_id: answer.answerId,
                    poll_media: answer.pollMedia,
                  })),
                  duration: options.poll.duration,
                  allow_multiselect: options.poll.allowMultiselect,
                  layout_type: options.poll.layoutType,
                }
              : undefined,
        },
        files: options.files,
        query: {
          wait: options.wait,
          thread_id: options.threadId,
          with_components: options.withComponents,
        },
      }
    );

    return response !== null ? Messages.messageFromRaw(response) : response;
  }

  /**
   * https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook
   *
   * https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook
   */
  async executeWebhookPlatform(
    webhookId: snowflake,
    webhookToken: string,
    platform: "github" | "slack",
    options: Record<string, unknown> & {
      threadId?: snowflake;
      wait?: boolean;
    }
  ): Promise<Message | null> {
    const response = await this.rest.request<RawMessage | null>(
      RESTMethods.Post,
      Endpoints.webhookPlatform(webhookId, webhookToken, platform),
      {
        query: {
          thread_id: options.threadId,
          wait: options.wait,
        },
        json: options,
      }
    );

    return response !== null ? Messages.messageFromRaw(response) : null;
  }

  /** https://discord.com/developers/docs/resources/channel#follow-announcement-channel */
  async followChannel(
    channelId: snowflake,
    options: {
      webhookChannelId: snowflake;
    },
    reason?: string
  ): Promise<FollowedChannel> {
    const response = await this.rest.request<RawFollowedChannel>(
      RESTMethods.Post,
      Endpoints.channelFollowers(channelId),
      {
        json: {
          webhook_channel_id: options.webhookChannelId,
        },
        reason,
      }
    );

    return {
      channelId: response.channel_id,
      webhookId: response.webhook_id,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#list-active-guild-threads */
  async getActiveGuildThreads(guildId: snowflake): Promise<{
    threads: Array<Channel>;
    members: Array<ThreadMember>;
  }> {
    const response = await this.rest.request<{
      threads: Array<RawChannel>;
      members: Array<RawThreadMember>;
    }>(RESTMethods.Get, Endpoints.guildActiveThreads(guildId));

    return {
      threads: response.threads.map((thread) =>
        Channels.channelFromRaw(thread)
      ),
      members: response.members.map((threadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads */
  async getArchivedThreads(
    channelId: snowflake,
    archivedStatus: "public" | "private",
    options?: {
      before?: timestamp;
      limit?: number;
    }
  ): Promise<{
    threads: Array<Channel>;
    members: Array<ThreadMember>;
    hasMore: boolean;
  }> {
    const response = await this.rest.request<{
      threads: Array<RawChannel>;
      members: Array<RawThreadMember>;
      has_more: boolean;
    }>(
      RESTMethods.Get,
      Endpoints.channelThreads(channelId, archivedStatus, false),
      {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      }
    );

    return {
      threads: response.threads.map((thread) =>
        Channels.channelFromRaw(thread)
      ),
      members: response.members.map((threadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
      hasMore: response.has_more,
    };
  }

  /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
  async getAuditLog(
    guildId: snowflake,
    options?: {
      userId?: snowflake;
      actionType?: ActionTypes;
      before?: snowflake;
      after?: snowflake;
      limit?: number;
    }
  ): Promise<AuditLog> {
    const response = await this.rest.request<RawAuditLog>(
      RESTMethods.Get,
      Endpoints.guildAuditLog(guildId),
      {
        query: {
          user_id: options?.userId,
          action_type: options?.actionType,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return AuditLogs.auditLogFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule */
  async getAutoModerationRule(
    guildId: snowflake,
    ruleId: snowflake
  ): Promise<AutoModerationRule> {
    const response = await this.rest.request<RawAutoModerationRule>(
      RESTMethods.Get,
      Endpoints.guildAutoModerationRule(guildId, ruleId)
    );

    return AutoModeration.autoModerationRuleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild */
  async getAutoModerationRules(
    guildId: snowflake
  ): Promise<Array<AutoModerationRule>> {
    const response = await this.rest.request<Array<RawAutoModerationRule>>(
      RESTMethods.Get,
      Endpoints.guildAutoModerationRules(guildId)
    );

    return response.map((autoModerationRule) =>
      AutoModeration.autoModerationRuleFromRaw(autoModerationRule)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-activity-instance */
  async getApplicationActivityInstance(
    applicationId: snowflake,
    instanceId: string
  ): Promise<ActivityInstance> {
    const response = await this.rest.request<RawActivityInstance>(
      RESTMethods.Get,
      Endpoints.applicationActivityInstance(applicationId, instanceId)
    );

    return {
      applicationId: response.application_id,
      instanceId: response.instance_id,
      launchId: response.launch_id,
      location: {
        id: response.location.id,
        kind: response.location.kind,
        channelId: response.location.channel_id,
        guildId: response.location.guild_id,
      },
      users: response.users,
    };
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  async getApplicationCommandPermissions(
    applicationId: snowflake,
    guildId: snowflake,
    commandId: snowflake
  ): Promise<GuildApplicationCommandPermissions> {
    const response =
      await this.rest.request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Get,
        Endpoints.applicationCommandPermissions(
          applicationId,
          guildId,
          commandId
        )
      );

    return Guilds.guildApplicationCommandPermissionsFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#get-application-emoji */
  async getApplicationEmoji(
    applicationId: snowflake,
    emojiId: snowflake
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Get,
      Endpoints.applicationEmoji(applicationId, emojiId)
    );

    return Emojis.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#list-application-emojis */
  async getApplicationEmojis(applicationId: snowflake): Promise<{
    items: Array<Emoji>;
  }> {
    const response = await this.rest.request<{
      items: Array<RawEmoji>;
    }>(RESTMethods.Get, Endpoints.applicationEmojis(applicationId));

    return {
      items: response.items.map((emoji) => Emojis.emojiFromRaw(emoji)),
    };
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records */
  async getApplicationRoleConnectionMetadataRecords(
    applicationId: snowflake
  ): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const response = await this.rest.request<
      Array<RawApplicationRoleConnectionMetadata>
    >(
      RESTMethods.Get,
      Endpoints.applicationRoleConnectionMetadata(applicationId)
    );

    return response.map((applicationRoleConnectionMetadata) =>
      ApplicationRoleConnectionMetadatas.applicationRoleConnectionMetadataFromRaw(
        applicationRoleConnectionMetadata
      )
    );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel */
  async getChannel(channelId: snowflake): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Get,
      Endpoints.channel(channelId)
    );

    return Channels.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-channels */
  async getChannels(guildId: snowflake): Promise<Array<Channel>> {
    const response = await this.rest.request<Array<RawChannel>>(
      RESTMethods.Get,
      Endpoints.guildChannels(guildId)
    );

    return response.map((channel) => Channels.channelFromRaw(channel));
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-invites */
  async getChannelInvites(channelId: snowflake): Promise<Array<Invite>> {
    const response = await this.rest.request<Array<RawInvite>>(
      RESTMethods.Get,
      Endpoints.channelInvites(channelId)
    );

    return response.map((invite) => Invites.inviteFromRaw(invite));
  }

  /** https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
  async getChannelWebhooks(channelId: snowflake): Promise<Array<Webhook>> {
    const response = await this.rest.request<Array<RawWebhook>>(
      RESTMethods.Get,
      Endpoints.channelWebhooks(channelId)
    );

    return response.map((webhook) => Webhooks.webhookFromRaw(webhook));
  }

  /** https://discord.com/developers/docs/resources/application#get-current-application */
  async getCurrentApplication(): Promise<Application> {
    const response = await this.rest.request<RawApplication>(
      RESTMethods.Get,
      Endpoints.applicationUser()
    );

    return Applications.applicationFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-application-role-connection */
  async getCurrentApplicationRoleConnection(
    applicationId: snowflake
  ): Promise<ApplicationRoleConnection> {
    const response = await this.rest.request<RawApplicationRoleConnection>(
      RESTMethods.Get,
      Endpoints.userApplicationRoleConnection(applicationId)
    );

    return {
      platformName: response.platform_name,
      platformUsername: response.platform_username,
      metadata:
        ApplicationRoleConnectionMetadatas.applicationRoleConnectionMetadataFromRaw(
          response.metadata
        ),
    };
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guild-member */
  async getCurrentGuildMember(guildId: snowflake): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Get,
      Endpoints.guildMember(guildId)
    );

    return Guilds.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-connections */
  async getCurrentUserConnections(): Promise<Array<Connection>> {
    const response = await this.rest.request<Array<RawConnection>>(
      RESTMethods.Get,
      Endpoints.userConnections()
    );

    return response.map((connection) => ({
      id: connection.id,
      name: connection.name,
      type: connection.type,
      revoked: connection.revoked,
      integrations: connection.integrations?.map((integration) =>
        Guilds.integrationFromRaw(integration)
      ),
      verified: connection.verified,
      friendSync: connection.friend_sync,
      showActivity: connection.show_activity,
      twoWayLink: connection.two_way_link,
      visibility: connection.visibility,
    }));
  }

  /** https://discord.com/developers/docs/resources/voice#get-current-user-voice-state */
  async getCurrentUserVoiceState(guildId: snowflake): Promise<VoiceState> {
    const response = await this.rest.request<RawVoiceState>(
      RESTMethods.Get,
      Endpoints.guildVoiceState(guildId)
    );

    return Voice.voiceStateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/soundboard#list-default-soundboard-sounds */
  async getDefaultSoundboardSounds(): Promise<Array<SoundboardSound>> {
    const response = await this.rest.request<Array<RawSoundboardSound>>(
      RESTMethods.Get,
      Endpoints.soundboardDefaultSounds()
    );

    return response.map((sound) => Soundboards.soundboardSoundFromRaw(sound));
  }

  /** https://discord.com/developers/docs/resources/entitlement#get-entitlement */
  async getEntitlement(
    applicationId: snowflake,
    entitlementId: snowflake
  ): Promise<Entitlement> {
    const response = await this.rest.request<RawEntitlement>(
      RESTMethods.Get,
      Endpoints.applicationEntitlement(applicationId, entitlementId)
    );

    return Entitlements.entitlementFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/entitlement#list-entitlements */
  async getEntitlements(
    applicationId: snowflake,
    options?: {
      userId?: snowflake;
      skuIds?: Array<snowflake>;
      before?: snowflake;
      after?: snowflake;
      limit?: number;
      guildId?: snowflake;
      excludeEnded?: boolean;
      excludeDeleted?: boolean;
    }
  ): Promise<Array<Entitlement>> {
    const response = await this.rest.request<Array<RawEntitlement>>(
      RESTMethods.Get,
      Endpoints.applicationEntitlements(applicationId),
      {
        query: {
          user_id: options?.userId,
          sku_ids: options?.skuIds,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          guild_id: options?.guildId,
          exclude_ended: options?.excludeEnded,
          exclude_deleted: options?.excludeDeleted,
        },
      }
    );

    return response.map((entitlement) =>
      Entitlements.entitlementFromRaw(entitlement)
    );
  }

  /** https://discord.com/developers/docs/topics/gateway#get-gateway */
  getGateway(): Promise<{ url: string }> {
    return this.rest.request<{ url: string }>(
      RESTMethods.Get,
      Endpoints.gateway()
    );
  }

  /** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
  async getGatewayBot(): Promise<{
    url: string;
    shards: number;
    sessionStartLimit: {
      total: number;
      remaining: number;
      resetAfter: number;
      maxConcurrency: number;
    };
  }> {
    const response = await this.rest.request<{
      url: string;
      shards: number;
      session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
        max_concurrency: number;
      };
    }>(RESTMethods.Get, Endpoints.gatewayBot());

    return {
      url: response.url,
      shards: response.shards,
      sessionStartLimit: {
        total: response.session_start_limit.total,
        remaining: response.session_start_limit.remaining,
        resetAfter: response.session_start_limit.reset_after,
        maxConcurrency: response.session_start_limit.max_concurrency,
      },
    };
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-command */
  async getGlobalApplicationCommand(
    applicationId: snowflake,
    commandId: snowflake
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Get,
      Endpoints.applicationCommand(applicationId, commandId)
    );

    return ApplicationCommands.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  async getGlobalApplicationCommands(
    applicationId: snowflake,
    options: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Get,
      Endpoints.applicationCommands(applicationId),
      {
        query: {
          with_localizations: options.withLocalizations,
        },
      }
    );

    return response.map((applicationCommand) =>
      ApplicationCommands.applicationCommandFromRaw(applicationCommand)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild */
  async getGuild(
    guildId: snowflake,
    options?: {
      withCounts?: boolean;
    }
  ): Promise<Guild> {
    const response = await this.rest.request<RawGuild>(
      RESTMethods.Get,
      Endpoints.guild(guildId),
      {
        query: {
          with_counts: options?.withCounts,
        },
      }
    );

    return Guilds.guildFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
  async getGuilds(options?: {
    before?: snowflake;
    after?: snowflake;
    limit?: number;
    withCounts?: boolean;
  }): Promise<
    Array<
      Pick<
        Guild,
        | "id"
        | "name"
        | "icon"
        | "banner"
        | "owner"
        | "permissions"
        | "features"
        | "approximateMemberCount"
        | "approximatePresenceCount"
      >
    >
  > {
    const response = await this.rest.request<
      Array<
        Pick<
          RawGuild,
          | "id"
          | "name"
          | "banner"
          | "icon"
          | "owner"
          | "permissions"
          | "features"
          | "approximate_member_count"
          | "approximate_presence_count"
        >
      >
    >(RESTMethods.Get, Endpoints.userGuilds(), {
      query: {
        before: options?.before,
        after: options?.after,
        limit: options?.limit,
        with_counts: options?.withCounts,
      },
    });

    return response.map((guild) => ({
      id: guild.id,
      name: guild.name,
      banner: guild.banner,
      icon: guild.icon,
      owner: guild.owner,
      permissions: guild.permissions,
      features: guild.features,
      approximate_member_count: guild.approximate_member_count,
      approximate_presence_count: guild.approximate_presence_count,
    }));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  async getGuildApplicationCommand(
    applicationId: snowflake,
    guildId: snowflake,
    commandId: snowflake
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Get,
      Endpoints.applicationGuildCommand(applicationId, guildId, commandId)
    );

    return ApplicationCommands.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
  async getGuildApplicationCommands(
    applicationId: snowflake,
    guildId: snowflake,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Get,
      Endpoints.applicationGuildCommands(applicationId, guildId),
      {
        query: {
          with_localizations: options?.withLocalizations,
        },
      }
    );

    return response.map((applicationCommand) =>
      ApplicationCommands.applicationCommandFromRaw(applicationCommand)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  async getGuildApplicationCommandPermissions(
    applicationId: snowflake,
    guildId: snowflake
  ): Promise<GuildApplicationCommandPermissions> {
    const response =
      await this.rest.request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Get,
        Endpoints.guildApplicationCommandsPermissions(applicationId, guildId)
      );

    return Guilds.guildApplicationCommandPermissionsFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-ban */
  async getGuildBan(guildId: snowflake, userId: snowflake): Promise<Ban> {
    const response = await this.rest.request<RawBan>(
      RESTMethods.Get,
      Endpoints.guildBan(guildId, userId)
    );

    return {
      reason: response.reason,
      user: Users.userFromRaw(response.user),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-bans */
  async getGuildBans(
    guildId: snowflake,
    options?: {
      limit?: number;
      before?: snowflake;
      after?: snowflake;
    }
  ): Promise<Array<Ban>> {
    const response = await this.rest.request<Array<RawBan>>(
      RESTMethods.Get,
      Endpoints.guildBans(guildId),
      {
        query: {
          limit: options?.limit,
          before: options?.before,
          after: options?.after,
        },
      }
    );

    return response.map((ban) => ({
      reason: ban.reason,
      user: Users.userFromRaw(ban.user),
    }));
  }

  /** https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
  async getGuildEmoji(guildId: snowflake, emojiId: snowflake): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Get,
      Endpoints.guildEmoji(guildId, emojiId)
    );

    return Emojis.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
  async getGuildEmojis(guildId: snowflake): Promise<Array<Emoji>> {
    const response = await this.rest.request<Array<RawEmoji>>(
      RESTMethods.Get,
      Endpoints.guildEmojis(guildId)
    );

    return response.map((emoji) => Emojis.emojiFromRaw(emoji));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-integrations */
  async getGuildIntegrations(guildId: snowflake): Promise<Array<Integration>> {
    const response = await this.rest.request<Array<RawIntegration>>(
      RESTMethods.Get,
      Endpoints.guildIntegrations(guildId)
    );

    return response.map((integration) =>
      Guilds.integrationFromRaw(integration)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-invites */
  async getGuildInvites(guildId: snowflake): Promise<Array<Invite>> {
    const response = await this.rest.request<Array<RawInvite>>(
      RESTMethods.Get,
      Endpoints.guildInvites(guildId)
    );

    return response.map((invite) => Invites.inviteFromRaw(invite));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-member */
  async getGuildMember(
    guildId: snowflake,
    userId: snowflake
  ): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Get,
      Endpoints.guildMember(guildId, userId)
    );

    return Guilds.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#list-guild-members */
  async getGuildMembers(
    guildId: snowflake,
    options: {
      limit?: number;
      after?: snowflake;
    }
  ): Promise<Array<GuildMember>> {
    const response = await this.rest.request<Array<RawGuildMember>>(
      RESTMethods.Get,
      Endpoints.guildMembers(guildId),
      {
        query: {
          limit: options.limit,
          after: options.after,
        },
      }
    );

    return response.map((guildMember) =>
      Guilds.guildMemberFromRaw(guildMember)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-onboarding */
  async getGuildOnboarding(guildId: snowflake): Promise<GuildOnboarding> {
    const response = await this.rest.request<RawGuildOnboarding>(
      RESTMethods.Get,
      Endpoints.guildOnboarding(guildId)
    );

    return {
      guildId: response.guild_id,
      prompts: response.prompts.map((prompt) => ({
        id: prompt.id,
        type: prompt.type,
        options: prompt.options.map((promptOption) => ({
          id: promptOption.id,
          channelIds: promptOption.channel_ids,
          roleIds: promptOption.role_ids,
          emoji:
            promptOption.emoji !== undefined
              ? Emojis.emojiFromRaw(promptOption.emoji)
              : undefined,
          emojiId: promptOption.emoji_id,
          emojiName: promptOption.emoji_name,
          emojiAnimated: promptOption.emoji_animated,
          title: promptOption.title,
          description: promptOption.description,
        })),
        title: prompt.title,
        singleSelect: prompt.single_select,
        required: prompt.required,
        inOnboarding: prompt.in_onboarding,
      })),
      defaultChannelIds: response.default_channel_ids,
      enabled: response.enabled,
      mode: response.mode,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-preview */
  async getGuildPreview(guildId: snowflake): Promise<GuildPreview> {
    const response = await this.rest.request<RawGuildPreview>(
      RESTMethods.Get,
      Endpoints.guildPreview(guildId)
    );

    return {
      id: response.id,
      name: response.name,
      icon: response.icon,
      splash: response.splash,
      discoverySplash: response.discovery_splash,
      emojis: response.emojis.map((emoji) => Emojis.emojiFromRaw(emoji)),
      features: response.features,
      approximateMemberCount: response.approximate_member_count,
      approximatePresenceCount: response.approximate_presence_count,
      description: response.description,
      stickers: response.stickers?.map((sticker) =>
        Stickers.stickerFromRaw(sticker)
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
  getGuildPruneCount(
    guildId: snowflake,
    options: {
      days: number;
      includeRoles: string | Array<snowflake>;
    }
  ): Promise<{ pruned: number }> {
    return this.rest.request<{ pruned: number }>(
      RESTMethods.Get,
      Endpoints.guildPrune(guildId),
      {
        query: {
          days: options.days,
          include_roles: options.includeRoles,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-role */
  async getGuildRole(guildId: snowflake, roleId: snowflake): Promise<Role> {
    const response = await this.rest.request<RawRole>(
      RESTMethods.Get,
      Endpoints.guildRole(guildId, roleId)
    );

    return Roles.roleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-roles */
  async getGuildRoles(guildId: snowflake): Promise<Array<Role>> {
    const response = await this.rest.request<Array<RawRole>>(
      RESTMethods.Get,
      Endpoints.guildRoles(guildId)
    );

    return response.map((role) => Roles.roleFromRaw(role));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild */
  async getGuildScheduledEvents(
    guildId: snowflake,
    options?: {
      withUserCount?: boolean;
    }
  ): Promise<Array<GuildScheduledEvent>> {
    const response = await this.rest.request<Array<RawGuildScheduledEvent>>(
      RESTMethods.Get,
      Endpoints.guildScheduledEvents(guildId),
      {
        query: {
          with_user_count: options?.withUserCount,
        },
      }
    );

    return response.map((guildScheduledEvent) =>
      GuildScheduledEvents.guildScheduledEventFromRaw(guildScheduledEvent)
    );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
  async getGuildScheduledEventUsers(
    guildId: snowflake,
    guildScheduledEventId: snowflake,
    options?: {
      limit?: number;
      withMember?: boolean;
      before?: snowflake;
      after?: snowflake;
    }
  ): Promise<Array<GuildScheduledEventUser>> {
    const response = await this.rest.request<Array<RawGuildScheduledEventUser>>(
      RESTMethods.Get,
      Endpoints.guildScheduledEvent(guildId, guildScheduledEventId),
      {
        query: {
          limit: options?.limit,
          with_member: options?.withMember,
          before: options?.before,
          after: options?.after,
        },
      }
    );

    return response.map((guildScheduledEventUser) => ({
      guildScheduledEventId: guildScheduledEventUser.guild_scheduled_event_id,
      user: Users.userFromRaw(guildScheduledEventUser.user),
      member:
        guildScheduledEventUser.member !== undefined
          ? Guilds.guildMemberFromRaw(guildScheduledEventUser.member)
          : undefined,
    }));
  }

  /** https://discord.com/developers/docs/resources/sticker#get-guild-sticker */
  async getGuildSticker(
    guildId: snowflake,
    stickerId: snowflake
  ): Promise<Sticker> {
    const response = await this.rest.request<RawSticker>(
      RESTMethods.Get,
      Endpoints.guildSticker(guildId, stickerId)
    );

    return Stickers.stickerFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#list-guild-stickers */
  async getGuildStickers(guildId: snowflake): Promise<Array<Sticker>> {
    const response = await this.rest.request<Array<RawSticker>>(
      RESTMethods.Get,
      Endpoints.guildStickers(guildId)
    );

    return response.map((sticker) => Stickers.stickerFromRaw(sticker));
  }

  /** https://discord.com/developers/docs/resources/soundboard#get-guild-soundboard-sound */
  async getGuildSoundboardSound(
    guildId: snowflake,
    soundId: snowflake
  ): Promise<SoundboardSound> {
    const response = await this.rest.request<RawSoundboardSound>(
      RESTMethods.Get,
      Endpoints.guildSoundboardSound(guildId, soundId)
    );

    return Soundboards.soundboardSoundFromRaw(response);
  }

  async getGuildSoundboardSounds(
    guildId: snowflake
  ): Promise<{ items: Array<SoundboardSound> }> {
    const response = await this.rest.request<{
      items: Array<RawSoundboardSound>;
    }>(RESTMethods.Get, Endpoints.guildSoundboardSounds(guildId));

    return {
      items: response.items.map((sound) =>
        Soundboards.soundboardSoundFromRaw(sound)
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-template */
  async getGuildTemplate(
    guildId: snowflake,
    code: string
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Get,
      Endpoints.guildTemplate(guildId, code)
    );

    return GuildTemplates.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-templates */
  async getGuildTemplates(guildId: snowflake): Promise<Array<GuildTemplate>> {
    const response = await this.rest.request<Array<RawGuildTemplate>>(
      RESTMethods.Get,
      Endpoints.guildTemplates(guildId)
    );

    return response.map((guildTemplate) =>
      GuildTemplates.guildTemplateFromRaw(guildTemplate)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
  getGuildVanityURL(guildId: snowflake): Promise<{
    code: string;
    uses: number;
  }> {
    return this.rest.request<{
      code: string;
      uses: number;
    }>(RESTMethods.Get, Endpoints.guildVanityURL(guildId));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
  async getGuildVoiceRegions(guildId: snowflake): Promise<Array<VoiceRegion>> {
    const response = await this.rest.request<Array<RawVoiceRegion>>(
      RESTMethods.Get,
      Endpoints.guildVoiceRegions(guildId)
    );

    return response.map((voiceRegion) => ({
      id: voiceRegion.id,
      name: voiceRegion.name,
      optimal: voiceRegion.optimal,
      deprecated: voiceRegion.deprecated,
      custom: voiceRegion.custom,
    }));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen */
  async getGuildWelcomeScreen(guildId: snowflake): Promise<WelcomeScreen> {
    const response = await this.rest.request<RawWelcomeScreen>(
      RESTMethods.Get,
      Endpoints.guildWelcomeScreen(guildId)
    );

    return {
      description: response.description,
      welcomeChannels: response.welcome_channels.map(
        (welcomeScreenChannel) => ({
          channelId: welcomeScreenChannel.channel_id,
          description: welcomeScreenChannel.description,
          emojiId: welcomeScreenChannel.emoji_id,
          emojiName: welcomeScreenChannel.emoji_name,
        })
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget */
  async getGuildWidget(guildId: snowflake): Promise<GuildWidget> {
    const response = await this.rest.request<RawGuildWidget>(
      RESTMethods.Get,
      Endpoints.guildWidgetJSON(guildId)
    );

    return {
      id: response.id,
      name: response.name,
      instantInvite: response.instant_invite,
      channels: response.channels.map((channel) =>
        Channels.channelFromRaw(channel)
      ),
      members: response.members.map((member) => Users.userFromRaw(member)),
      presenceCount: response.presence_count,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-image */
  getGuildWidgetImage(
    guildId: snowflake,
    options?: {
      style?: ImageWidgetStyleOptions;
    }
  ): Promise<string> {
    return this.rest.request<string>(
      RESTMethods.Get,
      Endpoints.guildWidgetImage(guildId),
      {
        query: {
          style: options?.style,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-settings */
  async getGuildWidgetSettings(
    guildId: snowflake
  ): Promise<GuildWidgetSettings> {
    const response = await this.rest.request<RawGuildWidgetSettings>(
      RESTMethods.Get,
      Endpoints.guildWidgetSettings(guildId)
    );

    return {
      enabled: response.enabled,
      channelId: response.channel_id,
    };
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
  async getInteractionFollowupMessage(
    applicationId: snowflake,
    interactionToken: string,
    messageId: snowflake,
    options?: {
      threadId?: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.webhookMessage(applicationId, interactionToken, messageId),
      {
        query: {
          thread_id: options?.threadId,
        },
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
  async getInteractionResponse(
    applicationId: snowflake,
    interactionToken: string,
    options?: { threadId?: snowflake }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.webhookMessage(applicationId, interactionToken),
      {
        query: {
          thread_id: options?.threadId,
        },
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/invite#get-invite */
  async getInvite(
    code: string,
    options?: {
      withCounts?: boolean;
      guildScheduledEventId?: snowflake;
    }
  ): Promise<Invite> {
    const response = await this.rest.request<RawInvite>(
      RESTMethods.Get,
      Endpoints.invite(code),
      {
        query: {
          with_counts: options?.withCounts,
          guild_scheduled_event_id: options?.guildScheduledEventId,
        },
      }
    );

    return Invites.inviteFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads */
  async getJoinedPrivateArchivedThreads(
    channelId: snowflake,
    options?: {
      before?: snowflake;
      limit?: number;
    }
  ): Promise<{
    threads: Array<Channel>;
    members: Array<ThreadMember>;
    hasMore: boolean;
  }> {
    const response = await this.rest.request<{
      threads: Array<RawChannel>;
      members: Array<RawThreadMember>;
      has_more: boolean;
    }>(RESTMethods.Get, Endpoints.channelThreads(channelId, "private", true), {
      query: {
        before: options?.before,
        limit: options?.limit,
      },
    });

    return {
      threads: response.threads.map((thread) =>
        Channels.channelFromRaw(thread)
      ),
      members: response.members.map((threadMember) =>
        Channels.threadMemberFromRaw(threadMember)
      ),
      hasMore: response.has_more,
    };
  }

  /** https://discord.com/developers/docs/resources/lobby#get-lobby */
  async getLobby(lobbyId: snowflake): Promise<Lobby> {
    const response = await this.rest.request<RawLobby>(
      RESTMethods.Get,
      Endpoints.lobby(lobbyId)
    );

    return Lobbies.lobbyFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#get-channel-message */
  async getMessage(
    channelId: snowflake,
    messageId: snowflake
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.channelMessage(channelId, messageId)
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/message#get-reactions */
  async getMessageReactions(
    channelId: snowflake,
    messageId: snowflake,
    emoji: string,
    options?: {
      type?: ReactionTypes;
      after?: snowflake;
      limit?: number;
    }
  ): Promise<Array<User>> {
    const response = await this.rest.request<Array<RawUser>>(
      RESTMethods.Get,
      Endpoints.channelMessageAllReactions(channelId, messageId, emoji),
      {
        query: {
          type: options?.type,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return response.map((user) => Users.userFromRaw(user));
  }

  /** https://discord.com/developers/docs/resources/message#get-channel-messages */
  async getMessages(
    channelId: snowflake,
    options: {
      around?: snowflake;
      before?: snowflake;
      after?: snowflake;
      limit?: number;
    }
  ): Promise<Array<Message>> {
    const response = await this.rest.request<Array<RawMessage>>(
      RESTMethods.Get,
      Endpoints.channelMessages(channelId),
      {
        query: {
          around: options.around,
          before: options.before,
          after: options.after,
          limit: options.limit,
        },
      }
    );

    return response.map((message) => Messages.messageFromRaw(message));
  }

  /** https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information */
  async getOAuth2Application(): Promise<Application> {
    const response = await this.rest.request<RawApplication>(
      RESTMethods.Get,
      Endpoints.oauth2Application()
    );

    return Applications.applicationFromRaw(response);
  }

  /** https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information */
  async getOAuth2Authorization(): Promise<{
    application: Application;
    scopes: Array<OAuth2Scopes>;
    expires: string;
    user?: User;
  }> {
    const response = await this.rest.request<{
      application: RawApplication;
      scopes: Array<OAuth2Scopes>;
      expires: string;
      user?: RawUser;
    }>(RESTMethods.Get, Endpoints.oauth2Authorization());

    return {
      application: Applications.applicationFromRaw(response.application),
      scopes: response.scopes,
      expires: response.expires,
      user:
        response.user !== undefined
          ? Users.userFromRaw(response.user)
          : undefined,
    };
  }

  /** https://discord.com/developers/docs/resources/channel#get-pinned-messages */
  async getPinnedMessages(
    channelId: snowflake,
    options: {
      before?: timestamp;
      limit?: number;
    }
  ): Promise<{
    items: Array<MessagePin>;
    hasMore: boolean;
  }> {
    const response = await this.rest.request<{
      items: Array<RawMessagePin>;
      has_more: boolean;
    }>(RESTMethods.Get, Endpoints.channelPins(channelId), {
      query: options,
    });

    return {
      items: response.items.map((item) => ({
        pinnetAt: item.pinnet_at,
        message: Messages.messageFromRaw(item.message),
      })),
      hasMore: response.has_more,
    };
  }

  /** https://discord.com/developers/docs/resources/poll#get-answer-voters */
  async getPollAnswerVoters(
    channelId: snowflake,
    messageId: snowflake,
    answerId: snowflake,
    options?: {
      after?: snowflake;
      limit?: number;
    }
  ): Promise<{
    users: Array<User>;
  }> {
    const response = await this.rest.request<{
      users: Array<RawUser>;
    }>(
      RESTMethods.Get,
      Endpoints.pollAnswerVoters(channelId, messageId, answerId),
      {
        query: {
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return {
      users: response.users.map((user) => Users.userFromRaw(user)),
    };
  }

  /** https://discord.com/developers/docs/resources/sku#list-skus */
  async getSKUs(applicationId: snowflake): Promise<Array<SKU>> {
    const response = await this.rest.request<Array<RawSKU>>(
      RESTMethods.Get,
      Endpoints.applicationSKUs(applicationId)
    );

    return response.map((sku) => SKUs.skuFromRaw(sku));
  }

  /** https://discord.com/developers/docs/resources/subscription#get-sku-subscription */
  async getSKUSubscription(
    skuId: snowflake,
    subscriptionId: snowflake
  ): Promise<Subscription> {
    const response = await this.rest.request<RawSubscription>(
      RESTMethods.Get,
      Endpoints.skuSubscription(skuId, subscriptionId)
    );

    return Subscriptions.subscriptionFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/subscription#list-sku-subscriptions */
  async getSKUSubscriptions(
    skuId: snowflake,
    options: {
      before?: snowflake;
      after?: snowflake;
      limit?: number;
      userId?: snowflake;
    }
  ): Promise<Array<Subscription>> {
    const response = await this.rest.request<Array<RawSubscription>>(
      RESTMethods.Get,
      Endpoints.skuSubscriptions(skuId),
      {
        query: {
          before: options.before,
          after: options.after,
          limit: options.limit,
          user_id: options.userId,
        },
      }
    );

    return response.map((subscription) =>
      Subscriptions.subscriptionFromRaw(subscription)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#get-stage-instance */
  async getStageInstance(channelId: snowflake): Promise<StageInstance> {
    const response = await this.rest.request<RawStageInstance>(
      RESTMethods.Get,
      Endpoints.stageInstance(channelId)
    );

    return StageInstances.stageInstanceFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#get-sticker-pack */
  async getStickerPack(packId: snowflake): Promise<StickerPack> {
    const response = await this.rest.request<RawStickerPack>(
      RESTMethods.Get,
      Endpoints.stickerPack(packId)
    );

    return {
      id: response.id,
      stickers: response.stickers.map((sticker) =>
        Stickers.stickerFromRaw(sticker)
      ),
      name: response.name,
      skuId: response.sku_id,
      coverStickerId: response.cover_sticker_id,
      description: response.description,
      bannerAssetId: response.banner_asset_id,
    };
  }

  /** https://discord.com/developers/docs/resources/sticker#list-sticker-packs */
  async getStickerPacks(): Promise<{
    stickerPacks: Array<StickerPack>;
  }> {
    const response = await this.rest.request<{
      sticker_packs: Array<RawStickerPack>;
    }>(RESTMethods.Get, Endpoints.stickerPacks());

    return {
      stickerPacks: response.sticker_packs.map((stickerPack) => ({
        id: stickerPack.id,
        stickers: stickerPack.stickers.map((sticker) =>
          Stickers.stickerFromRaw(sticker)
        ),
        name: stickerPack.name,
        skuId: stickerPack.sku_id,
        coverStickerId: stickerPack.cover_sticker_id,
        description: stickerPack.description,
        bannerAssetId: stickerPack.banner_asset_id,
      })),
    };
  }

  /** https://discord.com/developers/docs/resources/channel#get-thread-member */
  async getThreadMember(
    channelId: snowflake,
    userId: snowflake,
    options?: {
      withMember?: boolean;
    }
  ): Promise<ThreadMember> {
    const response = await this.rest.request<RawThreadMember>(
      RESTMethods.Get,
      Endpoints.threadMembers(channelId, userId),
      {
        query: {
          with_member: options?.withMember,
        },
      }
    );

    return Channels.threadMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#list-thread-members */
  async getThreadMembers(
    channelId: snowflake,
    options?: {
      withMember?: boolean;
      after?: snowflake;
      limit?: number;
    }
  ): Promise<Array<ThreadMember>> {
    const response = await this.rest.request<Array<RawThreadMember>>(
      RESTMethods.Get,
      Endpoints.threadMembers(channelId),
      {
        query: {
          with_member: options?.withMember,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return response.map((threadMember) =>
      Channels.threadMemberFromRaw(threadMember)
    );
  }

  /** https://discord.com/developers/docs/resources/user#get-user */
  async getUser(userId?: snowflake): Promise<User> {
    const response = await this.rest.request<RawUser>(
      RESTMethods.Get,
      Endpoints.user(userId)
    );

    return Users.userFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/voice#list-voice-regions */
  async getVoiceRegions(): Promise<Array<VoiceRegion>> {
    const response = await this.rest.request<Array<RawVoiceRegion>>(
      RESTMethods.Get,
      Endpoints.voiceRegions()
    );

    return response.map((voiceRegion) => ({
      id: voiceRegion.id,
      name: voiceRegion.name,
      optimal: voiceRegion.optimal,
      deprecated: voiceRegion.deprecated,
      custom: voiceRegion.custom,
    }));
  }

  /** https://discord.com/developers/docs/resources/voice#get-user-voice-state */
  async getUserVoiceState(
    guildId: snowflake,
    userId: snowflake
  ): Promise<VoiceState> {
    const response = await this.rest.request<RawVoiceState>(
      RESTMethods.Get,
      Endpoints.guildVoiceState(guildId, userId)
    );

    return Voice.voiceStateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#get-webhook-message */
  async getWebhookMessage(
    webhookId: snowflake,
    webhookToken: string,
    messageId: snowflake,
    options?: {
      threadId?: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.webhookMessage(webhookId, webhookToken, messageId),
      {
        query: {
          thread_id: options?.threadId,
        },
      }
    );

    return Messages.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
  async getWebhooks(guildId: snowflake): Promise<Array<Webhook>> {
    const response = await this.rest.request<Array<RawWebhook>>(
      RESTMethods.Get,
      Endpoints.guildWebhooks(guildId)
    );

    return response.map((webhook) => Webhooks.webhookFromRaw(webhook));
  }

  /** https://discord.com/developers/docs/resources/channel#join-thread */
  joinThread(channelId: snowflake): void {
    this.rest.request(RESTMethods.Put, Endpoints.threadMembers(channelId));
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  joinVoiceChannel(
    guildId: snowflake,
    channelId: snowflake,
    options?: {
      selfMute?: boolean;
      selfDeaf?: boolean;
    }
  ): void {
    this.shards.get(this.guildShardMap.get(guildId)!)!.updateVoiceState({
      guildId,
      channelId,
      selfMute: !!options?.selfMute,
      selfDeaf: !!options?.selfDeaf,
    });
  }

  /** https://discord.com/developers/docs/resources/user#leave-guild */
  leaveGuild(guildId: snowflake): void {
    this.rest.request(RESTMethods.Delete, Endpoints.userGuild(guildId));
  }

  /** https://discord.com/developers/docs/resources/lobby#leave-lobby */
  leaveLobby(lobbyId: snowflake): void {
    this.rest.request(RESTMethods.Delete, Endpoints.lobbyMember(lobbyId));
  }

  /** https://discord.com/developers/docs/resources/channel#leave-thread */
  leaveThread(channelId: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.threadMembers(channelId, "@me")
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  leaveVoiceChannel(guildId: snowflake): void {
    this.shards.get(this.guildShardMap.get(guildId)!)!.updateVoiceState({
      guildId,
      channelId: null,
      selfMute: false,
      selfDeaf: false,
    });
  }

  /** discord.com/developers/docs/resources/lobby#link-channel-to-lobby */
  async linkChannel(
    lobbyId: snowflake,
    options: {
      channelId: snowflake;
    }
  ): Promise<Lobby> {
    const response = await this.rest.request<RawLobby>(
      RESTMethods.Patch,
      Endpoints.lobbyChannelLinking(lobbyId),
      {
        json: {
          channel_id: options.channelId,
        },
      }
    );

    return Lobbies.lobbyFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#pin-message */
  pinMessage(
    channelId: snowflake,
    messageId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelPin(channelId, messageId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  removeBan(guildId: snowflake, userId: snowflake, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.guildBan(guildId, userId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
  removeGroupRecipient(channelId: snowflake, userId: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelRecipient(channelId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member */
  removeGuildMember(
    guildId: snowflake,
    userId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildMember(guildId, userId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  removeGuildMemberRole(
    guildId: snowflake,
    userId: snowflake,
    roleId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildMemberRole(guildId, userId, roleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/lobby#remove-a-member-from-a-lobby */
  removeLobbyMember(lobbyId: snowflake, userId: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.lobbyMember(lobbyId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#remove-thread-member */
  removeThreadMember(channelId: snowflake, userId: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.threadMembers(channelId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#search-guild-members */
  async searchGuildMembers(
    guildId: snowflake,
    options: {
      query: string;
      limit?: number;
    }
  ): Promise<Array<GuildMember>> {
    const response = await this.rest.request<Array<RawGuildMember>>(
      RESTMethods.Get,
      Endpoints.guildMembersSearch(guildId),
      {
        query: {
          query: options.query,
          limit: options.limit,
        },
      }
    );

    return response.map((guildMember) =>
      Guilds.guildMemberFromRaw(guildMember)
    );
  }

  /** https://discord.com/developers/docs/resources/soundboard#send-soundboard-sound */
  sendSoundboardSound(
    channelId: snowflake,
    options: {
      soundId: snowflake;
      sourceGuildId?: snowflake;
    }
  ): void {
    this.rest.request(
      RESTMethods.Post,
      Endpoints.sendSoundboardSound(channelId),
      {
        json: {
          sound_id: options.soundId,
          source_guild_id: options.sourceGuildId,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  setPresence(
    options: Partial<
      Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
    >
  ): void {
    this.shards.forEach((shard) => shard.updatePresence(options));
  }

  /** https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  async syncGuildTemplate(
    guildId: snowflake,
    code: string
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Put,
      Endpoints.guildTemplate(guildId, code)
    );

    return GuildTemplates.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
  triggerTypingIndicator(channelId: snowflake): void {
    this.rest.request(RESTMethods.Post, Endpoints.channelTyping(channelId));
  }

  /** https://discord.com/developers/docs/resources/lobby#unlink-channel-from-lobby */
  async unlinkChannel(lobbyId: snowflake): Promise<Lobby> {
    const response = await this.rest.request<RawLobby>(
      RESTMethods.Patch,
      Endpoints.lobbyChannelLinking(lobbyId)
    );

    return Lobbies.lobbyFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records */
  async updateApplicationRoleConnectionMetadataRecords(
    applicationId: snowflake
  ): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const response = await this.rest.request<
      Array<RawApplicationRoleConnectionMetadata>
    >(
      RESTMethods.Put,
      Endpoints.applicationRoleConnectionMetadata(applicationId)
    );

    return response.map((applicationRoleConnectionMetadata) =>
      ApplicationRoleConnectionMetadatas.applicationRoleConnectionMetadataFromRaw(
        applicationRoleConnectionMetadata
      )
    );
  }

  /** https://discord.com/developers/docs/resources/user#update-current-user-application-role-connection */
  async updateCurrentApplicationRoleConnection(
    applicationId: snowflake,
    options: {
      platformName?: string;
      platformUsername?: string;
      metadata?: ApplicationRoleConnectionMetadata;
    }
  ): Promise<ApplicationRoleConnection> {
    const response = await this.rest.request<RawApplicationRoleConnection>(
      RESTMethods.Put,
      Endpoints.userApplicationRoleConnection(applicationId),
      {
        json: {
          platform_name: options.platformName,
          platform_username: options.platformUsername,
          metadata:
            options.metadata !== undefined
              ? ApplicationRoleConnectionMetadatas.applicationRoleConnectionMetadataToRaw(
                  options.metadata
                )
              : undefined,
        },
      }
    );

    return {
      platformName: response.platform_name,
      platformUsername: response.platform_username,
      metadata:
        ApplicationRoleConnectionMetadatas.applicationRoleConnectionMetadataFromRaw(
          response.metadata
        ),
    };
  }

  /** https://discord.com/developers/docs/resources/channel#unpin-message */
  unpinMessage(
    channelId: snowflake,
    messageId: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelPin(channelId, messageId),
      {
        reason,
      }
    );
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

export interface ClientEvents {
  dispatch: [packet: RawPayload, shard: number];
  heartbeatACK: [shard: number];
  hello: [interval: number, shard: number];
  ready: [];
  resumed: [];
  rateLimited: [rateLimit: RateLimitedFields];
  reconnect: [];
  invalidSession: [];
  applicationCommandPermissionsUpdate: [
    applicationCommandPermissions: GuildApplicationCommandPermissions
  ];
  autoModerationRuleCreate: [autoModerationRule: AutoModerationRule];
  autoModerationRuleUpdate: [autoModerationRule: AutoModerationRule];
  autoModerationRuleDelete: [autoModerationRule: AutoModerationRule];
  autoModerationActionExecution: [
    autoModerationExecution: AutoModerationActionExecutionEventFields
  ];
  channelCreate: [channel: Channel];
  channelUpdate: [channel: Channel];
  channelDelete: [channel: Channel];
  channelPinsUpdate: [pins: ChannelPinsUpdateEventFields];
  threadCreate: [thread: Channel];
  threadUpdate: [thread: Channel];
  threadDelete: [thread: Channel];
  threadListSync: [sync: ThreadListSyncEventFields];
  threadMemberUpdate: [
    threadMember: ThreadMember & ThreadMemberUpdateEventExtraFields
  ];
  threadMembersUpdate: [thread: ThreadMembersUpdateEventFields];
  entitlementCreate: [entitlement: Entitlement];
  entitlementUpdate: [entitlement: Entitlement];
  entitlementDelete: [entitlement: Entitlement];
  guildCreate: [
    guild: (Guild & GuildCreateEventExtraFields) | UnavailableGuild
  ];
  guildUpdate: [guild: Guild];
  guildDelete: [guild: UnavailableGuild];
  guildAuditLogEntryCreate: [
    auditLogEntry: AuditLogEntry & GuildAuditLogEntryCreateExtraFields
  ];
  guildBanAdd: [ban: GuildBanAddEventFields];
  guildBanRemove: [ban: GuildBanRemoveEventFields];
  guildEmojisUpdate: [emojis: Array<Emoji>, guildId: snowflake];
  guildStickersUpdate: [stickers: Array<Sticker>, guildId: snowflake];
  guildIntegrationsUpdate: [guildId: snowflake];
  guildMemberAdd: [guildMember: GuildMember & GuildMemberAddEventExtraFields];
  guildMemberRemove: [guildMember: GuildMemberRemoveEventFields];
  guildMemberUpdate: [guildMember: GuildMemberUpdateEventFields];
  guildMembersChunk: [request: GuildMembersChunkEventFields];
  guildRoleCreate: [role: Role, guildId: snowflake];
  guildRoleUpdate: [role: Role, guildId: snowflake];
  guildRoleDelete: [roleId: snowflake, guildId: snowflake];
  guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventUpdate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventDelete: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventUserAdd: [
    userId: snowflake,
    guildScheduledEventId: snowflake,
    guildId: snowflake
  ];
  guildScheduledEventUserRemove: [
    userId: snowflake,
    guildScheduledEventId: snowflake,
    guildId: snowflake
  ];
  guildSoundboardSoundCreate: [sound: SoundboardSound];
  guildSoundboardSoundUpdate: [sound: SoundboardSound];
  guildSoundboardSoundDelete: [sound: GuildSoundboardSoundDeleteEventFields];
  guildSoundboardSoundsUpdate: [
    sounds: Array<SoundboardSound>,
    guildId: snowflake
  ];
  soundboardSounds: [sounds: Array<SoundboardSound>, guildId: snowflake];
  integrationCreate: [
    integration: Integration & IntegrationCreateEventExtraFields
  ];
  integrationUpdate: [
    integration: Integration & IntegrationUpdateEventExtraFields
  ];
  integrationDelete: [integration: IntegrationDeleteEventFields];
  interactionCreate: [interaction: Interaction];
  inviteCreate: [invite: InviteCreateEventFields];
  inviteDelete: [invite: InviteDeleteEventFields];
  messageCreate: [message: Message & MessageCreateEventExtraFields];
  messageUpdate: [message: Message];
  messageDelete: [message: MessageDeleteEventFields];
  messageDeleteBulk: [bulk: MessageDeleteBulkEventFields];
  messageReactionAdd: [reaction: MessageReactionAddEventFields];
  messageReactionRemove: [reaction: MessageReactionRemoveEventFields];
  messageReactionRemoveAll: [reaction: MessageReactionRemoveAllEventFields];
  messageReactionRemoveEmoji: [reaction: MessageReactionRemoveEmojiEventFields];
  presenceUpdate: [presence: PresenceUpdateEventFields];
  stageInstanceCreate: [stageInstance: StageInstance];
  stageInstanceUpdate: [stageInstance: StageInstance];
  stageInstanceDelete: [stageInstance: StageInstance];
  subscriptionCreate: [subscription: Subscription];
  subscriptionUpdate: [subscription: Subscription];
  subscriptionDelete: [subscription: Subscription];
  typingStart: [typing: TypingStartEventFields];
  userUpdate: [user: User];
  voiceChannelEffectSend: [voiceEffect: VoiceChannelEffectSendEventFields];
  voiceStateUpdate: [voiceState: VoiceState];
  voiceServerUpdate: [voiceServer: VoiceServerUpdateEventFields];
  webhooksUpdate: [channelId: snowflake, guildId: snowflake];
  messagePollVoteAdd: [vote: MessagePollVoteAddFields];
  messagePollVoteRemove: [vote: MessagePollVoteRemoveFields];
}
