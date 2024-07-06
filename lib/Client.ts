import {
  GatewayIntents,
  type OAuth2Scopes,
  type ActionTypes,
  type ImageWidgetStyleOptions,
  InteractionCallbackType,
  type MFALevel,
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
} from "./constants";
import { Util } from "./utils";
import { Endpoints, RequestManager, RESTMethods, type File } from "./rest";
import EventEmitter from "node:events";
import { Shard, ShardManager } from "./gateway";
import type {
  Application,
  ApplicationIntegrationTypeConfiguration,
  InstallParams,
  RawApplication,
} from "./types/application";
import type {
  ApplicationCommand,
  RawApplicationCommand,
  GuildApplicationCommandPermissions,
  RawGuildApplicationCommandPermissions,
  ApplicationCommandOption,
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
  Message,
  RawMessage,
  FollowedChannel,
  RawFollowedChannel,
  ThreadMember,
  RawThreadMember,
  Overwrite,
  DefaultReaction,
  ForumTag,
  AllowedMentions,
  Attachment,
  Embed,
  MessageReference,
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
} from "./types/guild";
import type {
  GuildScheduledEvent,
  RawGuildScheduledEvent,
  GuildScheduledEventUser,
  RawGuildScheduledEventUser,
  GuildScheduledEventEntityMetadata,
} from "./types/guild-scheduled-event";
import type { GuildTemplate, RawGuildTemplate } from "./types/guild-template";
import type { Interaction, InteractionCallbackData } from "./types/interaction";
import type { Invite, RawInvite } from "./types/invite";
import type { ActionRow } from "./types/message-components";
import type { PollCreateParams } from "./types/poll";
import type { Role, RawRole } from "./types/role";
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
import type { VoiceRegion, RawVoiceRegion, VoiceState } from "./types/voice";
import type { Webhook, RawWebhook } from "./types/webhook";
import type { ClientOptions as WebSocketOptions } from "ws";

export interface ClientOptions {
  shardsCount?: number | "auto";
  auth?: "Bot" | "Bearer";
  gateway?: {
    intents?: number | Array<number>;
    compress?: boolean;
    largeThreshold?: number;
    presence?: Partial<
      Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
    >;
  };
  ws?: WebSocketOptions;
}

export class Client extends EventEmitter {
  token: string;
  compress?: boolean;
  largeThreshold?: number;
  presence?: Partial<
    Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
  >;
  intents: GatewayIntents | number;
  shardsCount: number | "auto";
  auth: "Bot" | "Bearer";
  shards: ShardManager;
  rest: RequestManager;
  util: Util;
  guildShardMap: Record<string, number>;
  user: User | null;
  guilds: Map<string, Guild>;
  application: Pick<Application, "id" | "flags"> | null;
  ws?: WebSocketOptions;

  constructor(token: string, options?: ClientOptions) {
    super();

    this.token = token;
    this.compress = options?.gateway?.compress;
    this.largeThreshold = options?.gateway?.largeThreshold;
    this.presence = options?.gateway?.presence;
    this.intents =
      options?.gateway?.intents !== undefined
        ? Array.isArray(options.gateway.intents)
          ? options.gateway.intents.reduce((sum, num) => sum + num, 0)
          : options.gateway.intents
        : GatewayIntents.AllNonPrivileged;
    this.shardsCount = options?.shardsCount ?? "auto";
    this.auth = options?.auth ?? "Bot";
    this.shards = new ShardManager();
    this.rest = new RequestManager(token, this.auth);
    this.util = new Util();
    this.guildShardMap = {};
    this.user = null;
    this.guilds = new Map();
    this.application = null;
    this.ws = options?.ws;
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
  addGroupRecipient(
    channelID: snowflake,
    userID: snowflake,
    options: {
      accessToken: string;
      nick: string;
    }
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelRecipient(channelID, userID),
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
    guildID: snowflake,
    userID: snowflake,
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
      Endpoints.guildMember(guildID, userID),
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

    return response !== null ? this.util.guildMemberFromRaw(response) : null;
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  addGuildMemberRole(
    guildID: snowflake,
    userID: snowflake,
    roleID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.guildMemberRole(guildID, userID, roleID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/channel#add-thread-member */
  addThreadMember(channelID: snowflake, userID: snowflake): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.threadMembers(channelID, userID)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
  beginGuildPrune(
    guildID: snowflake,
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
    }>(RESTMethods.Post, Endpoints.guildPrune(guildID), {
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
    guildID: snowflake,
    options: {
      userIDs: Array<snowflake>;
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
    }>(RESTMethods.Post, Endpoints.bulkGuildBan(guildID), {
      json: {
        user_ids: options.userIDs,
        delete_message_seconds: options.deleteMessageSeconds,
      },
      reason,
    });

    return {
      bannedUsers: response.banned_users,
      failedUsers: response.failed_users,
    };
  }

  /** https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
  bulkDeleteMessages(
    channelID: snowflake,
    options?: {
      messages: Array<snowflake>;
    },
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Post,
      Endpoints.channelBulkDelete(channelID),
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
    applicationID: snowflake,
    commands: Array<{
      id?: snowflake;
      name: string;
      nameLocalizations?: LocaleMap | null;
      description: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      integrationTypes: Array<ApplicationIntegrationTypes>;
      contexts: Array<InteractionContextTypes>;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }>
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Put,
      Endpoints.applicationCommands(applicationID),
      {
        json: commands.map((command) =>
          this.util.partialApplicationCommandToRaw(command)
        ),
      }
    );

    return response.map((c) => this.util.applicationCommandFromRaw(c));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  async bulkEditGuildApplicationCommands(
    applicationID: snowflake,
    guildID: snowflake,
    commands: Array<{
      id?: snowflake;
      name: string;
      nameLocalizations?: LocaleMap | null;
      description: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }>
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Put,
      Endpoints.applicationGuildCommands(applicationID, guildID),
      {
        json: commands.map((command) =>
          this.util.partialApplicationCommandToRaw(command)
        ),
      }
    );

    return response.map((c) => this.util.applicationCommandFromRaw(c));
  }

  /** https://discord.com/developers/docs/topics/gateway#connections */
  async connect(): Promise<void> {
    this.shardsCount =
      this.shardsCount === "auto"
        ? (await this.getGatewayBot()).shards
        : this.shardsCount;

    for (let i = 0; i < this.shardsCount; i++)
      this.shards.set(i, new Shard(i, this));

    this.shards.connect();
  }

  /** https://discord.com/developers/docs/monetization/entitlements#consume-an-entitlement */
  consumeEntitlement(applicationID: snowflake, entitlementID: snowflake): void {
    this.rest.request(
      RESTMethods.Post,
      Endpoints.applicationEntitlementConsume(applicationID, entitlementID)
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule */
  async createAutoModerationRule(
    guildID: snowflake,
    options: {
      name: string;
      eventType: EventTypes;
      triggerType: TriggerTypes;
      triggerMetadata?: TriggerMetadata;
      actions: Array<AutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<string>;
      exemptChannels?: Array<string>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    const response = await this.rest.request<RawAutoModerationRule>(
      RESTMethods.Post,
      Endpoints.guildAutoModerationRules(guildID),
      {
        json: {
          name: options.name,
          event_type: options.eventType,
          trigger_type: options.triggerType,
          trigger_metadata: options.triggerMetadata,
          actions: options.actions.map((action) => ({
            type: action.type,
            metadata: {
              channel_id: action.metadata.channelID,
              duration_seconds: action.metadata.durationSeconds,
              custom_message: action.metadata.customMessage,
            },
          })),
          enabled: options.enabled,
          exempt_roles: options.exemptRoles,
          exempt_channels: options.exemptChannels,
        },
        reason,
      }
    );

    return this.util.autoModerationRuleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-channel */
  async createChannel(
    guildID: snowflake,
    options: {
      name: string | null;
      type?: ChannelTypes;
      topic?: string | null;
      bitrate?: number;
      userLimit?: number;
      rateLimitPerUser?: number;
      position?: number;
      permissionOverwrites?: Array<Overwrite>;
      parentID?: snowflake | null;
      nsfw?: boolean;
      rtcRegion?: string | null;
      videoQualityMode?: VideoQualityModes;
      defaultAutoArchiveDuration?: number;
      defaultReactionEmoji?: DefaultReaction | null;
      availableTags?: Array<ForumTag>;
      defaultSortOrder?: SortOrderTypes | null;
      defaultForumLayout?: ForumLayoutTypes;
      defaultThreadRateLimitPerUser?: number;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.guildChannels(guildID),
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
          parent_id: options.parentID,
          nsfw: options.nsfw,
          rtc_region: options.rtcRegion,
          video_quality_mode: options.videoQualityMode,
          default_auto_archive_duration: options.defaultAutoArchiveDuration,
          default_reaction_emoji:
            options.defaultReactionEmoji !== undefined
              ? options.defaultReactionEmoji !== null
                ? {
                    emoji_id: options.defaultReactionEmoji.emojiID,
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

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#create-channel-invite */
  async createChannelInvite(
    channelID: snowflake,
    options: {
      maxAge?: number;
      maxUses?: number;
      temporary?: boolean;
      unique?: boolean;
      targetType?: InviteTargetTypes;
      targetUserID?: snowflake;
      targetApplicationID?: snowflake;
    },
    reason?: string
  ): Promise<Invite> {
    const response = await this.rest.request<RawInvite>(
      RESTMethods.Post,
      Endpoints.channelInvites(channelID),
      {
        json: {
          max_age: options.maxAge,
          max_uses: options.maxUses,
          temporary: options.temporary,
          unique: options.unique,
          target_type: options.targetType,
          target_user_id: options.targetUserID,
          target_application_id: options.targetApplicationID,
        },
        reason,
      }
    );

    return this.util.inviteFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#create-webhook */
  async createChannelWebhook(
    channelID: snowflake,
    options: {
      name: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    const response = await this.rest.request<RawWebhook>(
      RESTMethods.Post,
      Endpoints.channelWebhooks(channelID),
      {
        json: {
          name: options.name,
          avatar: options.avatar,
        },
        reason,
      }
    );

    return this.util.webhookFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#create-dm */
  async createDM(options: { recipientID: snowflake }): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.userChannels(),
      {
        json: {
          recipient_id: options.recipientID,
        },
      }
    );

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
  async createGlobalApplicationCommand(
    applicationID: snowflake,
    options: {
      name: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      integrationTypes?: Array<ApplicationIntegrationTypes>;
      contexts?: Array<InteractionContextTypes>;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Post,
      Endpoints.applicationCommands(applicationID),
      {
        json: this.util.partialApplicationCommandToRaw(options),
      }
    );

    return this.util.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#create-group-dm */
  async createGroupDM(options: {
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

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild */
  async createGuild(options: {
    name: string;
    region?: string | null;
    icon?: string;
    verificationLevel?: VerificationLevel;
    defaultMessageNotifications?: DefaultMessageNotificationLevel;
    explicitContentFilter?: ExplicitContentFilterLevel;
    roles?: Array<{
      name?: string;
      permissions?: string;
      color?: number;
      hoist?: boolean;
      icon?: string | null;
      unicodeEmoji?: string | null;
      mentionable?: boolean;
    }>;
    channels?: Array<{
      name: string;
      type: ChannelTypes;
      id?: number;
      parentID?: number;
    }>;
    afkChannelID?: snowflake;
    afkTimeout?: number;
    systemChannelID?: snowflake;
    systemChannelFlags?: SystemChannelFlags;
  }): Promise<Guild> {
    const response = await this.rest.request<RawGuild>(
      RESTMethods.Post,
      Endpoints.guilds(),
      {
        json: {
          name: options.name,
          region: options.region,
          icon: options.icon,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          roles: options.roles?.map((role) => ({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            icon: role.icon,
            unicode_emoji: role.unicodeEmoji,
            permissions: role.permissions,
            mentionable: role.mentionable,
          })),
          afk_channel_id: options.afkChannelID,
          afk_timeout: options.afkTimeout,
          system_channel_id: options.systemChannelID,
          system_channel_flags: options.systemChannelFlags,
        },
      }
    );

    return this.util.guildFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  async createGuildApplicationCommand(
    applicationID: snowflake,
    guildID: snowflake,
    options: {
      name: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Post,
      Endpoints.applicationGuildCommands(applicationID, guildID),
      {
        json: this.util.partialApplicationCommandToRaw(options),
      }
    );

    return this.util.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  createGuildBan(
    guildID: snowflake,
    userID: snowflake,
    options?: {
      deleteMessageDays?: number;
      deleteMessageSeconds?: number;
    },
    reason?: string
  ): void {
    this.rest.request(RESTMethods.Put, Endpoints.guildBan(guildID, userID), {
      json: {
        delete_message_days: options?.deleteMessageDays,
        delete_message_seconds: options?.deleteMessageSeconds,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
  async createGuildEmoji(
    guildID: snowflake,
    options: {
      name: string;
      image: string;
      roles: Array<snowflake>;
    },
    reason?: string
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Post,
      Endpoints.guildEmojis(guildID),
      {
        json: {
          name: options.name,
          image: options.image,
          roles: options.roles,
        },
        reason,
      }
    );

    return this.util.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template */
  async createGuildFromTemplate(
    code: string,
    options: {
      name: string;
      icon?: string;
    }
  ): Promise<Guild> {
    const response = await this.rest.request<RawGuild>(
      RESTMethods.Post,
      Endpoints.template(code),
      {
        json: {
          name: options.name,
          icon: options.icon,
        },
      }
    );

    return this.util.guildFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-role */
  async createGuildRole(
    guildID: snowflake,
    options: {
      name?: string;
      permissions?: string;
      color?: number;
      hoist?: boolean;
      icon?: string | null;
      unicodeEmoji?: string | null;
      mentionable?: boolean;
    },
    reason?: string
  ): Promise<Role> {
    const response = await this.rest.request<RawRole>(
      RESTMethods.Post,
      Endpoints.guildRoles(guildID),
      {
        json: {
          name: options.name,
          permissions: options.permissions,
          color: options.color,
          hoist: options.hoist,
          icon: options.icon,
          unicode_emoji: options.unicodeEmoji,
          mentionable: options.mentionable,
        },
        reason,
      }
    );

    return this.util.roleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event */
  async createGuildScheduledEvent(
    guildID: snowflake,
    options: {
      channelID?: snowflake | null;
      entityMetadata?: GuildScheduledEventEntityMetadata | null;
      name: string;
      privacyLevel: GuildScheduledEventPrivacyLevel;
      scheduledStartTime: string;
      scheduledEndTime?: string | null;
      description?: string | null;
      entityType: GuildScheduledEventEntityTypes;
      image?: string;
    },
    reason?: string
  ): Promise<GuildScheduledEvent> {
    const response = await this.rest.request<RawGuildScheduledEvent>(
      RESTMethods.Post,
      Endpoints.guildScheduledEvents(guildID),
      {
        json: {
          channel_id: options.channelID,
          entity_metadata: options.entityMetadata,
          name: options.name,
          privacy_level: options.privacyLevel,
          scheduled_start_time: options.scheduledEndTime,
          scheduled_end_time: options.scheduledEndTime,
          description: options.description,
          entity_type: options.entityType,
          image: options.image,
        },
        reason,
      }
    );

    return this.util.guildScheduledEventFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#create-guild-sticker */
  async createGuildSticker(
    guildID: snowflake,
    options: {
      name: string;
      description: string;
      tags: string;
      file: File;
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
      Endpoints.guildStickers(guildID),
      {
        form: formData,
        reason,
      }
    );

    return this.util.stickerFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-template */
  async createGuildTemplate(
    guildID: snowflake,
    options: {
      name: string;
      description?: string | null;
    }
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Post,
      Endpoints.guildTemplates(guildID),
      {
        json: {
          name: options.name,
          description: options.description,
        },
      }
    );

    return this.util.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
  async createInteractionFollowupMessage(
    applicationID: snowflake,
    interactionToken: string,
    options: {
      content?: string | null;
      tts?: boolean;
      embeds?: Array<Embed> | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<ActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<Attachment> | null;
      flags?: MessageFlags | null;
      threadName?: string;
      appliedTags?: Array<string>;
      poll?: PollCreateParams;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.webhook(applicationID, interactionToken),
      {
        json: {
          content: options.content,
          tts: options.tts,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => this.util.embedToRaw(embed))
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
                ? this.util.messageComponentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
          thread_name: options.threadName,
          poll:
            options.poll !== undefined
              ? {
                  question: options.poll.question,
                  answers: options.poll.answers.map((answer) => ({
                    answer_id: answer.answerID,
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

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
  createInteractionResponse(
    interactionID: snowflake,
    interactionToken: string,
    options: {
      type: InteractionCallbackType;
      data?: InteractionCallbackData;
    }
  ): void {
    switch (options.type) {
      case InteractionCallbackType.ChannelMessageWithSource:
      case InteractionCallbackType.UpdateMessage:
        {
          this.rest.request(
            RESTMethods.Post,
            Endpoints.interactionCallback(interactionID, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  content: options.data?.content,
                  embeds:
                    options.data?.embeds !== undefined
                      ? options.data.embeds.map((embed) =>
                          this.util.embedToRaw(embed)
                        )
                      : undefined,
                  allowed_mentions:
                    options.data?.allowedMentions !== undefined
                      ? {
                          parse: options.data.allowedMentions.parse,
                          roles: options.data.allowedMentions.roles,
                          users: options.data.allowedMentions.users,
                          replied_user:
                            options.data.allowedMentions.repliedUser,
                        }
                      : undefined,
                  flags: options.data?.flags,
                  components:
                    options.data?.components !== undefined
                      ? this.util.messageComponentsToRaw(
                          options.data.components
                        )
                      : undefined,
                  attachments: options.data?.attachments?.map((attachment) =>
                    this.util.attachmentToRaw(attachment)
                  ),
                  poll:
                    options.data?.poll !== undefined
                      ? {
                          question: options.data.poll.question,
                          answers: options.data.poll.answers.map((answer) => ({
                            answer_id: answer.answerID,
                            poll_media: answer.pollMedia,
                          })),
                          duration: options.data.poll.duration,
                          allow_multiselect: options.data.poll.allowMultiselect,
                          layout_type: options.data.poll.layoutType,
                        }
                      : undefined,
                },
              },
              files: options.data?.files,
            }
          );
        }
        break;
      case InteractionCallbackType.DeferredChannelMessageWithSource:
      case InteractionCallbackType.DeferredUpdateMessage:
        {
          this.rest.request(
            RESTMethods.Post,
            Endpoints.interactionCallback(interactionID, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  flags: options.data?.flags,
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.ApplicationCommandAutocompleteResult:
        {
          this.rest.request(
            RESTMethods.Post,
            Endpoints.interactionCallback(interactionID, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  choices: options.data?.choices?.map((choice) => ({
                    name: choice.name,
                    name_localizations: choice.nameLocalizations,
                    value: choice.value,
                  })),
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.Modal:
        {
          this.rest.request(
            RESTMethods.Post,
            Endpoints.interactionCallback(interactionID, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  custom_id: options.data?.customID,
                  components:
                    options.data?.components !== undefined
                      ? this.util.messageComponentsToRaw(
                          options.data.components
                        )
                      : undefined,
                  title: options.data?.title,
                },
              },
            }
          );
        }
        break;
      case InteractionCallbackType.PremiumRequired:
        {
          this.rest.request(
            RESTMethods.Post,
            Endpoints.interactionCallback(interactionID, interactionToken),
            {
              json: {
                type: options.type,
                data: {},
              },
            }
          );
        }
        break;
    }
  }

  /** https://discord.com/developers/docs/resources/channel#create-message */
  async createMessage(
    channelID: snowflake,
    options: {
      content?: string;
      nonce?: string | number;
      tts?: boolean;
      embeds?: Array<Embed>;
      allowedMentions?: AllowedMentions;
      messageReference?: MessageReference;
      components?: Array<ActionRow>;
      stickersIDs?: Array<snowflake>;
      files?: Array<File>;
      attachments?: Array<Attachment>;
      flags?: MessageFlags;
      enforceNonce?: boolean;
      poll?: PollCreateParams;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.channelMessages(channelID),
      {
        json: {
          content: options.content,
          nonce: options.nonce,
          tts: options.tts,
          embeds: options.embeds?.map((embed) => this.util.embedToRaw(embed)),
          allowed_mentions:
            options.allowedMentions !== undefined
              ? {
                  parse: options.allowedMentions.parse,
                  roles: options.allowedMentions.roles,
                  users: options.allowedMentions.users,
                  replied_user: options.allowedMentions.repliedUser,
                }
              : undefined,
          message_reference: options.messageReference,
          components:
            options.components !== undefined
              ? this.util.messageComponentsToRaw(options.components)
              : undefined,
          stickers_ids: options.stickersIDs,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
          enforce_nonce: options.enforceNonce,
          poll:
            options.poll !== undefined
              ? {
                  question: options.poll.question,
                  answers: options.poll.answers.map((answer) => ({
                    answer_id: answer.answerID,
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

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  createMessageReaction(
    channelID: snowflake,
    messageID: snowflake,
    emoji: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelMessageReaction(channelID, messageID, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#create-stage-instance */
  async createStageInstance(
    options: {
      channelID: snowflake;
      topic: string;
      privacyLevel?: PrivacyLevel;
      sendStartNotifications?: boolean;
      guildScheduledEventID?: snowflake;
    },
    reason?: string
  ): Promise<StageInstance> {
    const response = await this.rest.request<RawStageInstance>(
      RESTMethods.Post,
      Endpoints.stageInstances(),
      {
        json: {
          channel_id: options.channelID,
          topic: options.topic,
          privacy_level: options.privacyLevel,
          send_start_notifications: options.sendStartNotifications,
          guild_scheduled_event_id: options.guildScheduledEventID,
        },
        reason,
      }
    );

    return this.util.stageInstanceFromRaw(response);
  }

  /** https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement */
  async createTestEntitlement(
    applicationID: snowflake,
    options: {
      skuID: snowflake;
      ownerID: snowflake;
      ownerType: number;
    }
  ): Promise<Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionID">> {
    const response = await this.rest.request<
      Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id">
    >(RESTMethods.Post, Endpoints.applicationEntitlements(applicationID), {
      json: {
        sku_id: options.skuID,
        owner_id: options.ownerID,
        owner_type: options.ownerType,
      },
    });

    return this.util.testEntitlementFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel */
  async createThread(
    channelID: snowflake,
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
      message: {
        content?: string | null;
        embeds?: Array<Embed> | null;
        allowedMentions?: AllowedMentions | null;
        components?: Array<ActionRow> | null;
        attachments?: Array<Attachment> | null;
        flags?: MessageFlags | null;
      };
      appliedTags?: Array<string>;
      files?: Array<File> | null;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.threads(channelID),
      {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          message: {
            content: options.message.content,
            embeds: options.message.embeds?.map((embed) =>
              this.util.embedToRaw(embed)
            ),
            allowed_mentions:
              options.message.allowedMentions !== undefined
                ? options.message.allowedMentions !== null
                  ? {
                      parse: options.message.allowedMentions.parse,
                      roles: options.message.allowedMentions.roles,
                      users: options.message.allowedMentions.users,
                      replied_user: options.message.allowedMentions.repliedUser,
                    }
                  : null
                : undefined,
          },
          applied_tags: options.appliedTags,
        },
        files: options.files,
        reason,
      }
    );

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  async createThreadFromMessage(
    channelID: snowflake,
    messageID: snowflake,
    options: {
      name: string;
      autoArchiveDuration?: number;
      rateLimitPerUser?: number | null;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Post,
      Endpoints.threads(channelID, messageID),
      {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
        },
        reason,
      }
    );

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-without-message */
  async createThreadWithoutMessage(
    channelID: snowflake,
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
      Endpoints.threads(channelID),
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

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#crosspost-message */
  async crosspostMessage(
    channelID: snowflake,
    messageID: snowflake
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.channelMessage(channelID, messageID)
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  deleteAllMessageReactions(
    channelID: snowflake,
    messageID: snowflake,
    emoji?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessageAllReactions(channelID, messageID, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
  deleteAutoModerationRule(
    guildID: snowflake,
    autoModerationRuleID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildAutoModerationRule(guildID, autoModerationRuleID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/channel#deleteclose-channel */
  async deleteChannel(channelID: snowflake, reason?: string): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Delete,
      Endpoints.channel(channelID),
      {
        reason,
      }
    );

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#delete-channel-permission */
  deleteChannelPermission(
    channelID: snowflake,
    overwriteID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelPermission(channelID, overwriteID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command */
  deleteGlobalApplicationCommand(
    applicationID: snowflake,
    commandID: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationCommand(applicationID, commandID)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild */
  deleteGuild(guildID: snowflake): void {
    this.rest.request(RESTMethods.Delete, Endpoints.guild(guildID));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  deleteGuildApplicationCommand(
    applicationID: snowflake,
    guildID: snowflake,
    commandID: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationGuildCommand(applicationID, guildID, commandID)
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  deleteGuildEmoji(
    guildID: snowflake,
    emojiID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildEmoji(guildID, emojiID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  deleteGuildIntegration(
    guildID: snowflake,
    integrationID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildIntegration(guildID, integrationID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-role */
  deleteGuildRole(
    guildID: snowflake,
    roleID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildRole(guildID, roleID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event */
  deleteGuildScheduledEvent(
    guildID: snowflake,
    guildScheduledEventID: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildScheduledEvent(guildID, guildScheduledEventID)
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
  deleteGuildSticker(
    guildID: snowflake,
    stickerID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildSticker(guildID, stickerID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  async deleteGuildTemplate(
    guildID: snowflake,
    code: string
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Delete,
      Endpoints.guildTemplate(guildID, code)
    );

    return this.util.guildTemplateFromRaw(response);
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

    return this.util.inviteFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
  deleteInteractionFollowupMessage(
    applicationID: snowflake,
    interactionToken: string,
    messageID: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(applicationID, interactionToken, messageID)
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
  deleteInteractionResponse(
    applicationID: snowflake,
    interactionToken: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(applicationID, interactionToken)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-message */
  deleteMessage(
    channelID: snowflake,
    messageID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessage(channelID, messageID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-user-reaction */
  deleteMessageReaction(
    channelID: snowflake,
    messageID: snowflake,
    emoji: string,
    userID?: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessageReaction(channelID, messageID, emoji, userID)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance */
  deleteStageInstance(channelID: snowflake, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.stageInstance(channelID), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement */
  deleteTestEntitlement(
    applicationID: snowflake,
    entitlementID: snowflake
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationEntitlement(applicationID, entitlementID)
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook */
  deleteWebhook(webhookID: snowflake, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.webhook(webhookID), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
  deleteWebhookMessage(
    webhookID: snowflake,
    webhookToken: string,
    messageID: snowflake,
    options?: {
      threadID?: snowflake;
    }
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(webhookID, webhookToken, messageID),
      {
        query: {
          thread_id: options?.threadID,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  deleteWebhookWithToken(
    webhookID: snowflake,
    webhookToken: string,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhook(webhookID, webhookToken),
      {
        reason,
        authorization: false,
      }
    );
  }

  disconnect(): void {
    this.shards.disconnect();
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
  async editAutoModerationRule(
    guildID: snowflake,
    autoModerationRuleID: snowflake,
    options: {
      name?: string;
      eventType?: EventTypes;
      triggerType?: TriggerTypes;
      triggerMetadata?: TriggerMetadata;
      actions?: Array<AutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<string>;
      exemptChannels?: Array<string>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    const response = await this.rest.request<RawAutoModerationRule>(
      RESTMethods.Patch,
      Endpoints.guildAutoModerationRule(guildID, autoModerationRuleID),
      {
        json: {
          name: options.name,
          event_type: options.eventType,
          trigger_type: options.triggerType,
          trigger_metadata: options.triggerMetadata,
          actions: options.actions?.map((action) => ({
            type: action.type,
            metadata: {
              channel_id: action.metadata.channelID,
              duration_seconds: action.metadata.durationSeconds,
              custom_message: action.metadata.customMessage,
            },
          })),
          enabled: options.enabled,
          exempt_roles: options.exemptRoles,
          exempt_channels: options.exemptChannels,
        },
        reason,
      }
    );

    return this.util.autoModerationRuleFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  async editApplicationCommandPermissions(
    applicationID: snowflake,
    guildID: snowflake,
    commandID: snowflake,
    options: {
      permissions: Array<GuildApplicationCommandPermissions>;
    }
  ): Promise<GuildApplicationCommandPermissions> {
    const response =
      await this.rest.request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Put,
        Endpoints.applicationCommandPermissions(
          applicationID,
          guildID,
          commandID
        ),
        {
          json: {
            permissions: options.permissions.map((permission) =>
              this.util.guildApplicationCommandPermissionsToRaw(permission)
            ),
          },
        }
      );

    return this.util.guildApplicationCommandPermissionsFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#modify-channel */
  async editChannel(
    channelID: snowflake,
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
      permissionOverwrites?: Array<Overwrite> | null;
      parentID?: snowflake | null;
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
      appliedTags?: Array<string>;
    },
    reason?: string
  ): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Patch,
      Endpoints.channel(channelID),
      {
        json: {
          name: options.name,
          type: options.type,
          position: options.position,
          topic: options.topic,
          nsfw: options.nsfw,
          rate_limit_per_user: options.rateLimitPerUser,
          bitrate: options.bitrate,
          permission_overwrites: options.permissionOverwrites,
          parent_id: options.parentID,
          rtc_region: options.rtcRegion,
          video_quality_mode: options.videoQualityMode,
          default_auto_archive_duration: options.defaultAutoArchiveDuration,
          flags: options.flags,
          available_tags: options.availableTags,
          default_reaction_emoji: options.defaultReactionEmoji,
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

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
  editChannelPermissions(
    channelID: snowflake,
    overwriteID: snowflake,
    options: {
      allow?: string | null;
      deny?: string | null;
      type: number;
    },
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelPermission(channelID, overwriteID),
      {
        json: options,
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
  editChannelPositions(
    guildID: snowflake,
    options: Array<{
      id: snowflake;
      position?: number | null;
      lockPermissions?: boolean | null;
      parentID?: snowflake | null;
    }>
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildChannels(guildID), {
      json: options.map((data) => ({
        id: data.id,
        position: data.position,
        lock_permissions: data.lockPermissions,
        parent_id: data.parentID,
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

    return this.util.userFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-member */
  async editCurrentGuildMember(
    guildID: snowflake,
    options: {
      nick?: string;
    },
    reason?: string
  ): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Patch,
      Endpoints.guildMember(guildID),
      {
        json: {
          nick: options.nick,
        },
        reason,
      }
    );

    return this.util.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state */
  editCurrentUserVoiceState(
    guildID: snowflake,
    options: {
      channelID?: snowflake;
      suppress?: boolean;
      requestToSpeakTimestamp?: timestamp | null;
    }
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildVoiceState(guildID), {
      json: {
        channel_id: options.channelID,
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
      Endpoints.applicationCurrentUser(),
      {
        json: {
          custom_install_url: options.customInstallURL,
          description: options.description,
          role_connections_verification_url:
            options.roleConnectionsVerificationURL,
          install_params: options.installParams,
          flags: options.flags,
          icon: options.icon,
          cover_image: options.coverImage,
          interactions_endpoint_url: options.interactionsEndpointURL,
          tags: options.tags,
        },
      }
    );

    return this.util.applicationFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  async editGlobalApplicationCommand(
    applicationID: snowflake,
    commandID: snowflake,
    options: {
      name?: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      integrationTypes?: Array<ApplicationIntegrationTypes>;
      contexts?: Array<InteractionContextTypes>;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Patch,
      Endpoints.applicationCommand(applicationID, commandID),
      {
        json: this.util.partialApplicationCommandToRaw(options),
      }
    );

    return this.util.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild */
  async editGuild(
    guildID: snowflake,
    options: {
      name?: string;
      region?: string | null;
      verificationLevel?: VerificationLevel;
      defaultMessageNotifications?: DefaultMessageNotificationLevel;
      explicitContentFilter?: ExplicitContentFilterLevel;
      afkChannelID?: snowflake | null;
      afkTimeout?: number;
      icon?: string | null;
      ownerID?: snowflake;
      splash?: string | null;
      discoverySplash?: string | null;
      banner?: string | null;
      systemChannelID?: snowflake | null;
      systemChannelFlags?: SystemChannelFlags;
      rulesChannelID?: snowflake | null;
      publicUpdatesChannelID?: snowflake | null;
      preferredLocale?: string;
      features?: Array<GuildFeatures>;
      description?: string | null;
      premiumProgressBarEnabled?: boolean;
      safetyAlertsChannelID?: snowflake | null;
    },
    reason?: string
  ): Promise<Guild> {
    const response = await this.rest.request<RawGuild>(
      RESTMethods.Patch,
      Endpoints.guild(guildID),
      {
        json: {
          name: options.name,
          region: options.region,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          afk_channel_id: options.afkChannelID,
          afk_timeout: options.afkTimeout,
          icon: options.icon,
          owner_id: options.ownerID,
          splash: options.splash,
          discovery_splash: options.discoverySplash,
          banner: options.banner,
          system_channel_id: options.systemChannelID,
          system_channel_flags: options.systemChannelFlags,
          rules_channel_id: options.rulesChannelID,
          public_updates_channel_id: options.publicUpdatesChannelID,
          preferred_locale: options.preferredLocale,
          features: options.features,
          description: options.description,
          premium_progress_bar_enabled: options.premiumProgressBarEnabled,
          safety_alerts_channel_id: options.safetyAlertsChannelID,
        },
        reason,
      }
    );

    return this.util.guildFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  async editGuildApplicationCommand(
    applicationID: snowflake,
    guildID: snowflake,
    commandID: snowflake,
    options: {
      name?: string;
      nameLocalizations?: LocaleMap | null;
      description?: string;
      descriptionLocalizations?: LocaleMap | null;
      options?: Array<ApplicationCommandOption>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Patch,
      Endpoints.applicationGuildCommand(applicationID, guildID, commandID),
      {
        json: this.util.partialApplicationCommandToRaw(options),
      }
    );

    return this.util.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  async editGuildEmoji(
    guildID: snowflake,
    emojiID: snowflake,
    options: {
      name?: string;
      roles?: Array<snowflake> | null;
    },
    reason?: string
  ): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Patch,
      Endpoints.guildEmoji(guildID, emojiID),
      {
        json: {
          name: options.name,
          roles: options.roles,
        },
        reason,
      }
    );

    return this.util.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  async editGuildMember(
    guildID: snowflake,
    userID: snowflake,
    options: {
      nick?: string | null;
      roles?: Array<snowflake> | null;
      mute?: boolean | null;
      deaf?: boolean | null;
      channelID?: snowflake | null;
      communicationDisabledUntil?: number | null;
      flags?: GuildMemberFlags;
    },
    reason?: string
  ): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Patch,
      Endpoints.guildMember(guildID, userID),
      {
        json: {
          nick: options.nick,
          roles: options.roles,
          mute: options.mute,
          deaf: options.deaf,
          channel_id: options.channelID,
          communication_disabled_until: options.communicationDisabledUntil,
          flags: options.flags,
        },
        reason,
      }
    );

    return this.util.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level */
  editGuildMFALevel(
    guildID: snowflake,
    options: {
      level: MFALevel;
    },
    reason?: string
  ): Promise<MFALevel> {
    return this.rest.request<MFALevel>(
      RESTMethods.Post,
      Endpoints.guildMFA(guildID),
      {
        json: {
          level: options.level,
        },
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-onboarding */
  editGuildOnboarding(
    guildID: snowflake,
    options: {
      prompts: Array<OnboardingPrompt>;
      defaultChannelIDs: Array<snowflake>;
      enabled: boolean;
      mode: OnboardingMode;
    },
    reason?: string
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildOnboarding(guildID), {
      json: {
        prompts: options.prompts.map((prompt) => ({
          id: prompt.id,
          type: prompt.type,
          options: prompt.options.map((promptOption) => ({
            id: promptOption.id,
            channel_ids: promptOption.channelIDs,
            role_ids: promptOption.roleIDs,
            emoji:
              promptOption.emoji !== undefined
                ? this.util.emojiToRaw(promptOption.emoji)
                : undefined,
            emoji_id: promptOption.emojiID,
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
    guildID: snowflake,
    roleID: snowflake,
    options?: {
      name?: string | null;
      permissions?: string | null;
      color?: number | null;
      hoist?: boolean | null;
      icon?: string | null;
      unicodeEmoji?: string | null;
      mentionable?: boolean | null;
    },
    reason?: string
  ): Promise<Role> {
    const response = await this.rest.request<RawRole>(
      RESTMethods.Patch,
      Endpoints.guildRole(guildID, roleID),
      {
        json: {
          name: options?.name,
          permissions: options?.permissions,
          color: options?.color,
          hoist: options?.hoist,
          icon: options?.icon,
          unicode_emoji: options?.unicodeEmoji,
          mentionable: options?.mentionable,
        },
        reason,
      }
    );

    return this.util.roleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
  async editGuildRolePositions(
    guildID: snowflake,
    options: Array<{
      id: snowflake;
      position?: number | null;
    }>
  ): Promise<Array<Role>> {
    const response = await this.rest.request<Array<RawRole>>(
      RESTMethods.Patch,
      Endpoints.guildRoles(guildID),
      {
        json: options,
      }
    );

    return response.map((role) => this.util.roleFromRaw(role));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
  async editGuildScheduledEvent(
    guildID: snowflake,
    guildScheduledEventID: snowflake,
    options: {
      channelID?: snowflake | null;
      entityMetadata?: GuildScheduledEventEntityMetadata | null;
      name?: string;
      privacyLevel?: GuildScheduledEventPrivacyLevel;
      scheduledStartTime?: string;
      scheduledEndTime?: string;
      description?: string | null;
      entityType?: GuildScheduledEventEntityTypes;
      status?: GuildScheduledEventStatus;
      image?: string;
    },
    reason?: string
  ): Promise<GuildScheduledEvent> {
    const response = await this.rest.request<RawGuildScheduledEvent>(
      RESTMethods.Patch,
      Endpoints.guildScheduledEvent(guildID, guildScheduledEventID),
      {
        json: {
          channel_id: options.channelID,
          entity_metadata: options.entityMetadata,
          name: options.name,
          privacy_level: options.privacyLevel,
          scheduled_start_time: options.scheduledStartTime,
          scheduled_end_time: options.scheduledEndTime,
          description: options.description,
          entityType: options.entityType,
          status: options.status,
          image: options.image,
        },
        reason,
      }
    );

    return this.util.guildScheduledEventFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
  async editGuildSticker(
    guildID: snowflake,
    stickerID: snowflake,
    options: {
      name?: string;
      description?: string | null;
      tags?: string;
    },
    reason?: string
  ): Promise<Sticker> {
    const response = await this.rest.request<RawSticker>(
      RESTMethods.Patch,
      Endpoints.guildSticker(guildID, stickerID),
      {
        json: {
          name: options.name,
          description: options.description,
          tags: options.tags,
        },
        reason,
      }
    );

    return this.util.stickerFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  async editGuildTemplate(
    guildID: snowflake,
    code: string,
    options: {
      name?: string;
      description?: string | null;
    }
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Patch,
      Endpoints.guildTemplate(guildID, code),
      {
        json: {
          name: options.name,
          description: options.description,
        },
      }
    );

    return this.util.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
  async editGuildWelcomeScreen(
    guildID: snowflake,
    options: {
      enabled?: boolean | null;
      welcomeChannels?: Array<WelcomeScreenChannel> | null;
      description?: string | null;
    },
    reason?: string
  ): Promise<WelcomeScreen> {
    const response = await this.rest.request<RawWelcomeScreen>(
      RESTMethods.Patch,
      Endpoints.guildWelcomeScreen(guildID),
      {
        json: {
          enabled: options.enabled,
          welcome_channels: options.welcomeChannels,
          description: options.description,
        },
        reason,
      }
    );

    return {
      description: response.description,
      welcomeChannels: response.welcome_channels.map(
        (welcomeScreenChannel) => ({
          channelID: welcomeScreenChannel.channel_id,
          description: welcomeScreenChannel.description,
          emojiID: welcomeScreenChannel.emoji_id,
          emojiName: welcomeScreenChannel.emoji_name,
        })
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-widget */
  async editGuildWidget(
    guildID: snowflake,
    options: {
      enabled?: boolean;
      channelID?: boolean;
    },
    reason?: string
  ): Promise<GuildWidgetSettings> {
    const response = await this.rest.request<RawGuildWidgetSettings>(
      RESTMethods.Patch,
      Endpoints.guildWidgetSettings(guildID),
      {
        json: {
          enabled: options.enabled,
          channel_id: options.channelID,
        },
        reason,
      }
    );

    return {
      enabled: response.enabled,
      channelID: response.channel_id,
    };
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message */
  async editMessage(
    channelID: snowflake,
    messageID: snowflake,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<ActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<Attachment> | null;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Patch,
      Endpoints.channelMessage(channelID, messageID),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => this.util.embedToRaw(embed))
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
                ? this.util.messageComponentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
        },
        files: options.files,
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance */
  async editStageInstance(
    channelID: snowflake,
    options: {
      topic?: string;
      privacyLevel?: PrivacyLevel;
    },
    reason?: string
  ): Promise<StageInstance> {
    const response = await this.rest.request<RawStageInstance>(
      RESTMethods.Patch,
      Endpoints.stageInstance(channelID),
      {
        json: {
          topic: options.topic,
          privacy_level: options.privacyLevel,
        },
        reason,
      }
    );

    return this.util.stageInstanceFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
  async editInteractionFollowupMessage(
    applicationID: snowflake,
    interactionToken: string,
    messageID: snowflake,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<ActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<Attachment> | null;
      threadID: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.webhookMessage(applicationID, interactionToken, messageID),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => this.util.embedToRaw(embed))
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
                ? this.util.messageComponentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
        },
        files: options.files,
        query: {
          thread_id: options.threadID,
        },
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
  async editInteractionResponse(
    applicationID: snowflake,
    interactionToken: string,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<ActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<Attachment> | null;
      threadID: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Patch,
      Endpoints.webhookMessage(applicationID, interactionToken),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => this.util.embedToRaw(embed))
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
                ? this.util.messageComponentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
        },
        files: options.files,
        query: {
          thread_id: options.threadID,
        },
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#modify-user-voice-state */
  editUserVoiceState(
    guildID: snowflake,
    userID: snowflake,
    options: {
      channelID?: snowflake;
      suppress?: boolean;
      requestToSpeakTimestamp?: timestamp | null;
    }
  ): void {
    this.rest.request(
      RESTMethods.Patch,
      Endpoints.guildVoiceState(guildID, userID),
      {
        json: {
          channel_id: options.channelID,
          suppress: options.suppress,
          requestToSpeakTimestamp: options.requestToSpeakTimestamp,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook */
  async editWebhook(
    webhookID: snowflake,
    options: {
      name?: string;
      avatar?: string | null;
      channelID?: snowflake;
    },
    reason?: string
  ): Promise<Webhook> {
    const response = await this.rest.request<RawWebhook>(
      RESTMethods.Patch,
      Endpoints.webhook(webhookID),
      {
        json: {
          name: options.name,
          avatar: options.avatar,
          channel_id: options.channelID,
        },
        reason,
      }
    );

    return this.util.webhookFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
  async editWebhookMessage(
    webhookID: snowflake,
    webhookToken: string,
    messageID: snowflake,
    options: {
      content?: string | null;
      embeds?: Array<Embed> | null;
      flags?: MessageFlags | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<ActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<Attachment> | null;
      threadID: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Patch,
      Endpoints.webhookMessage(webhookID, webhookToken, messageID),
      {
        json: {
          content: options.content,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => this.util.embedToRaw(embed))
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
                ? this.util.messageComponentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
        },
        files: options.files,
        query: {
          thread_id: options.threadID,
        },
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  async editWebhookWithToken(
    webhookID: snowflake,
    webhookToken: string,
    options: {
      name?: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    const response = await this.rest.request<RawWebhook>(
      RESTMethods.Patch,
      Endpoints.webhook(webhookID, webhookToken),
      {
        json: {
          name: options.name,
          avatar: options.avatar,
        },
        reason,
        authorization: false,
      }
    );

    return this.util.webhookFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/poll#end-poll */
  async endPoll(channelID: snowflake, messageID: snowflake): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Post,
      Endpoints.pollExpire(channelID, messageID)
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-webhook */
  async executeWebhook(
    webhookID: snowflake,
    webhookToken: string,
    options: {
      content?: string | null;
      username?: string;
      avatarURL?: string;
      tts?: boolean;
      embeds?: Array<Embed> | null;
      allowedMentions?: AllowedMentions | null;
      components?: Array<ActionRow> | null;
      files?: Array<File> | null;
      attachments?: Array<Attachment> | null;
      flags?: MessageFlags | null;
      threadName?: string;
      appliedTags?: Array<string>;
      poll?: PollCreateParams;
      wait: boolean;
      threadID: snowflake;
    }
  ): Promise<Message | null> {
    const response = await this.rest.request<RawMessage | null>(
      RESTMethods.Post,
      Endpoints.webhook(webhookID, webhookToken),
      {
        json: {
          content: options.content,
          username: options.username,
          avatarURL: options.avatarURL,
          tts: options.tts,
          embeds:
            options.embeds !== null
              ? options.embeds?.map((embed) => this.util.embedToRaw(embed))
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
                ? this.util.messageComponentsToRaw(options.components)
                : null
              : undefined,
          attachments: options.attachments?.map((attachment) =>
            this.util.attachmentToRaw(attachment)
          ),
          flags: options.flags,
          thread_name: options.threadName,
          applied_tags: options.appliedTags,
          poll:
            options.poll !== undefined
              ? {
                  question: options.poll.question,
                  answers: options.poll.answers.map((answer) => ({
                    answer_id: answer.answerID,
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
          thread_id: options.threadID,
        },
      }
    );

    return response !== null ? this.util.messageFromRaw(response) : response;
  }

  /**
   * https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook
   *
   * https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook
   */
  async executeWebhookPlatform(
    webhookID: snowflake,
    webhookToken: string,
    platform: "github" | "slack",
    options: Record<string, unknown> & {
      threadID?: snowflake;
      wait?: boolean;
    }
  ): Promise<Message | null> {
    const response = await this.rest.request<RawMessage | null>(
      RESTMethods.Post,
      Endpoints.webhookPlatform(webhookID, webhookToken, platform),
      {
        query: {
          thread_id: options.threadID,
          wait: options.wait,
        },
        json: options,
      }
    );

    return response !== null ? this.util.messageFromRaw(response) : null;
  }

  /** https://discord.com/developers/docs/resources/channel#follow-announcement-channel */
  async followChannel(
    channelID: snowflake,
    options: {
      webhookChannelID: snowflake;
    },
    reason?: string
  ): Promise<FollowedChannel> {
    const response = await this.rest.request<RawFollowedChannel>(
      RESTMethods.Post,
      Endpoints.channelFollowers(channelID),
      {
        json: {
          webhook_channel_id: options.webhookChannelID,
        },
        reason,
      }
    );

    return {
      channelID: response.channel_id,
      webhookID: response.webhook_id,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#list-active-guild-threads */
  async getActiveGuildThreads(guildID: snowflake): Promise<{
    threads: Array<Channel>;
    members: Array<ThreadMember>;
  }> {
    const response = await this.rest.request<{
      threads: Array<RawChannel>;
      members: Array<RawThreadMember>;
    }>(RESTMethods.Get, Endpoints.guildActiveThreads(guildID));

    return {
      threads: response.threads.map((thread) =>
        this.util.channelFromRaw(thread)
      ),
      members: response.members.map((threadMember) =>
        this.util.threadMemberFromRaw(threadMember)
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads */
  async getArchivedThreads(
    channelID: snowflake,
    archivedStatus: "public" | "private",
    options?: {
      before?: string;
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
      Endpoints.channelThreads(channelID, archivedStatus, false),
      {
        query: {
          before: options?.before,
          limit: options?.limit,
        },
      }
    );

    return {
      threads: response.threads.map((thread) =>
        this.util.channelFromRaw(thread)
      ),
      members: response.members.map((threadMember) =>
        this.util.threadMemberFromRaw(threadMember)
      ),
      hasMore: response.has_more,
    };
  }

  /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
  async getAuditLog(
    guildID: snowflake,
    options?: {
      userID?: snowflake;
      actionType?: ActionTypes;
      before?: string;
      after?: string;
      limit?: number;
    }
  ): Promise<AuditLog> {
    const response = await this.rest.request<RawAuditLog>(
      RESTMethods.Get,
      Endpoints.guildAuditLog(guildID),
      {
        query: {
          user_id: options?.userID,
          action_type: options?.actionType,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return this.util.auditLogFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule */
  async getAutoModerationRule(
    guildID: snowflake,
    ruleID: snowflake
  ): Promise<AutoModerationRule> {
    const response = await this.rest.request<RawAutoModerationRule>(
      RESTMethods.Get,
      Endpoints.guildAutoModerationRule(guildID, ruleID)
    );

    return this.util.autoModerationRuleFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild */
  async getAutoModerationRules(
    guildID: snowflake
  ): Promise<Array<AutoModerationRule>> {
    const response = await this.rest.request<Array<RawAutoModerationRule>>(
      RESTMethods.Get,
      Endpoints.guildAutoModerationRules(guildID)
    );

    return response.map((autoModerationRule) =>
      this.util.autoModerationRuleFromRaw(autoModerationRule)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  async getApplicationCommandPermissions(
    applicationID: snowflake,
    guildID: snowflake,
    commandID: snowflake
  ): Promise<GuildApplicationCommandPermissions> {
    const response =
      await this.rest.request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Get,
        Endpoints.applicationCommandPermissions(
          applicationID,
          guildID,
          commandID
        )
      );

    return this.util.guildApplicationCommandPermissionsFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records */
  async getApplicationRoleConnectionMetadataRecords(
    applicationID: snowflake
  ): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const response = await this.rest.request<
      Array<RawApplicationRoleConnectionMetadata>
    >(
      RESTMethods.Get,
      Endpoints.applicationRoleConnectionMetadata(applicationID)
    );

    return response.map((applicationRoleConnectionMetadata) => ({
      type: applicationRoleConnectionMetadata.type,
      key: applicationRoleConnectionMetadata.key,
      name: applicationRoleConnectionMetadata.name,
      nameLocalizations: applicationRoleConnectionMetadata.name_localizations,
      description: applicationRoleConnectionMetadata.description,
      descriptionLocalizations:
        applicationRoleConnectionMetadata.description_localizations,
    }));
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel */
  async getChannel(channelID: snowflake): Promise<Channel> {
    const response = await this.rest.request<RawChannel>(
      RESTMethods.Get,
      Endpoints.channel(channelID)
    );

    return this.util.channelFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-channels */
  async getChannels(guildID: snowflake): Promise<Array<Channel>> {
    const response = await this.rest.request<Array<RawChannel>>(
      RESTMethods.Get,
      Endpoints.guildChannels(guildID)
    );

    return response.map((channel) => this.util.channelFromRaw(channel));
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-invites */
  async getChannelInvites(channelID: snowflake): Promise<Array<Invite>> {
    const response = await this.rest.request<Array<RawInvite>>(
      RESTMethods.Get,
      Endpoints.channelInvites(channelID)
    );

    return response.map((invite) => this.util.inviteFromRaw(invite));
  }

  /** https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
  async getChannelWebhooks(channelID: snowflake): Promise<Array<Webhook>> {
    const response = await this.rest.request<Array<RawWebhook>>(
      RESTMethods.Get,
      Endpoints.channelWebhooks(channelID)
    );

    return response.map((webhook) => this.util.webhookFromRaw(webhook));
  }

  /** https://discord.com/developers/docs/resources/application#get-current-application */
  async getCurrentApplication(): Promise<Application> {
    const response = await this.rest.request<RawApplication>(
      RESTMethods.Get,
      Endpoints.applicationCurrentUser()
    );

    return this.util.applicationFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-application-role-connection */
  async getCurrentApplicationRoleConnection(
    applicationID: snowflake
  ): Promise<ApplicationRoleConnection> {
    const response = await this.rest.request<RawApplicationRoleConnection>(
      RESTMethods.Get,
      Endpoints.userApplicationRoleConnection(applicationID)
    );

    return {
      platformName: response.platform_name,
      platformUsername: response.platform_username,
      metadata: {
        type: response.metadata.type,
        key: response.metadata.key,
        name: response.metadata.name,
        nameLocalizations: response.metadata.name_localizations,
        description: response.metadata.description,
        descriptionLocalizations: response.metadata.description_localizations,
      },
    };
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guild-member */
  async getCurrentGuildMember(guildID: snowflake): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Get,
      Endpoints.guildMember(guildID)
    );

    return this.util.guildMemberFromRaw(response);
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
        this.util.integrationFromRaw(integration)
      ),
      verified: connection.verified,
      friendSync: connection.friend_sync,
      showActivity: connection.show_activity,
      twoWayLink: connection.two_way_link,
      visibility: connection.visibility,
    }));
  }

  /** https://discord.com/developers/docs/monetization/entitlements#list-entitlements */
  async getEntitlements(
    applicationID: snowflake,
    options?: {
      userID?: snowflake;
      skuIDs?: Array<string>;
      before?: string;
      after?: string;
      limit?: number;
      guildID?: snowflake;
      excludeEnded?: boolean;
    }
  ): Promise<Array<Entitlement>> {
    const response = await this.rest.request<Array<RawEntitlement>>(
      RESTMethods.Get,
      Endpoints.applicationEntitlements(applicationID),
      {
        query: {
          user_id: options?.userID,
          sku_ids: options?.skuIDs,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          guild_id: options?.guildID,
          exclude_ended: options?.excludeEnded,
        },
      }
    );

    return response.map((entitlement) =>
      this.util.entitlementFromRaw(entitlement)
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
    applicationID: snowflake,
    commandID: snowflake
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Get,
      Endpoints.applicationCommand(applicationID, commandID)
    );

    return this.util.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  async getGlobalApplicationCommands(
    applicationID: snowflake,
    options: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Get,
      Endpoints.applicationCommands(applicationID),
      {
        query: {
          with_localizations: options.withLocalizations,
        },
      }
    );

    return response.map((applicationCommand) =>
      this.util.applicationCommandFromRaw(applicationCommand)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild */
  async getGuild(
    guildID: snowflake,
    options?: {
      withCounts?: boolean;
    }
  ): Promise<Guild> {
    const response = await this.rest.request<RawGuild>(
      RESTMethods.Get,
      Endpoints.guild(guildID),
      {
        query: {
          with_counts: options?.withCounts,
        },
      }
    );

    return this.util.guildFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
  async getGuilds(options?: {
    before?: string;
    after?: string;
    limit?: number;
    withCounts?: boolean;
  }): Promise<Array<Guild>> {
    const response = await this.rest.request<Array<RawGuild>>(
      RESTMethods.Get,
      Endpoints.userGuilds(),
      {
        query: {
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          with_counts: options?.withCounts,
        },
      }
    );

    return response.map((guild) => this.util.guildFromRaw(guild));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  async getGuildApplicationCommand(
    applicationID: snowflake,
    guildID: snowflake,
    commandID: snowflake
  ): Promise<ApplicationCommand> {
    const response = await this.rest.request<RawApplicationCommand>(
      RESTMethods.Get,
      Endpoints.applicationGuildCommand(applicationID, guildID, commandID)
    );

    return this.util.applicationCommandFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
  async getGuildApplicationCommands(
    applicationID: snowflake,
    guildID: snowflake,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    const response = await this.rest.request<Array<RawApplicationCommand>>(
      RESTMethods.Get,
      Endpoints.applicationGuildCommands(applicationID, guildID),
      {
        query: {
          with_localizations: options?.withLocalizations,
        },
      }
    );

    return response.map((applicationCommand) =>
      this.util.applicationCommandFromRaw(applicationCommand)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  async getGuildApplicationCommandPermissions(
    applicationID: snowflake,
    guildID: snowflake
  ): Promise<GuildApplicationCommandPermissions> {
    const response =
      await this.rest.request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Get,
        Endpoints.guildApplicationCommandsPermissions(applicationID, guildID)
      );

    return this.util.guildApplicationCommandPermissionsFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-ban */
  async getGuildBan(guildID: snowflake, userID: snowflake): Promise<Ban> {
    const response = await this.rest.request<RawBan>(
      RESTMethods.Get,
      Endpoints.guildBan(guildID, userID)
    );

    return {
      reason: response.reason,
      user: this.util.userFromRaw(response.user),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-bans */
  async getGuildBans(
    guildID: snowflake,
    options?: {
      limit?: number;
      before?: string;
      after?: string;
    }
  ): Promise<Array<Ban>> {
    const response = await this.rest.request<Array<RawBan>>(
      RESTMethods.Get,
      Endpoints.guildBans(guildID),
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
      user: this.util.userFromRaw(ban.user),
    }));
  }

  /** https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
  async getGuildEmoji(guildID: snowflake, emojiID: snowflake): Promise<Emoji> {
    const response = await this.rest.request<RawEmoji>(
      RESTMethods.Get,
      Endpoints.guildEmoji(guildID, emojiID)
    );

    return this.util.emojiFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
  async getGuildEmojis(guildID: snowflake): Promise<Array<Emoji>> {
    const response = await this.rest.request<Array<RawEmoji>>(
      RESTMethods.Get,
      Endpoints.guildEmojis(guildID)
    );

    return response.map((emoji) => this.util.emojiFromRaw(emoji));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-integrations */
  async getGuildIntegrations(guildID: snowflake): Promise<Array<Integration>> {
    const response = await this.rest.request<Array<RawIntegration>>(
      RESTMethods.Get,
      Endpoints.guildIntegrations(guildID)
    );

    return response.map((integration) =>
      this.util.integrationFromRaw(integration)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-invites */
  async getGuildInvites(guildID: snowflake): Promise<Array<Invite>> {
    const response = await this.rest.request<Array<RawInvite>>(
      RESTMethods.Get,
      Endpoints.guildInvites(guildID)
    );

    return response.map((invite) => this.util.inviteFromRaw(invite));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-member */
  async getGuildMember(
    guildID: snowflake,
    userID: snowflake
  ): Promise<GuildMember> {
    const response = await this.rest.request<RawGuildMember>(
      RESTMethods.Get,
      Endpoints.guildMember(guildID, userID)
    );

    return this.util.guildMemberFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild#list-guild-members */
  async getGuildMembers(guildID: snowflake): Promise<Array<GuildMember>> {
    const response = await this.rest.request<Array<RawGuildMember>>(
      RESTMethods.Get,
      Endpoints.guildMembers(guildID)
    );

    return response.map((guildMember) =>
      this.util.guildMemberFromRaw(guildMember)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-onboarding */
  async getGuildOnboarding(guildID: snowflake): Promise<GuildOnboarding> {
    const response = await this.rest.request<RawGuildOnboarding>(
      RESTMethods.Get,
      Endpoints.guildOnboarding(guildID)
    );

    return {
      guildID: response.guild_id,
      prompts: response.prompts.map((prompt) => ({
        id: prompt.id,
        type: prompt.type,
        options: prompt.options.map((promptOption) => ({
          id: promptOption.id,
          channelIDs: promptOption.channel_ids,
          roleIDs: promptOption.role_ids,
          emoji:
            promptOption.emoji !== undefined
              ? this.util.emojiFromRaw(promptOption.emoji)
              : undefined,
          emojiID: promptOption.emoji_id,
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
      defaultChannelIDs: response.default_channel_ids,
      enabled: response.enabled,
      mode: response.mode,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-preview */
  async getGuildPreview(guildID: snowflake): Promise<GuildPreview> {
    const response = await this.rest.request<RawGuildPreview>(
      RESTMethods.Get,
      Endpoints.guildPreview(guildID)
    );

    return {
      id: response.id,
      name: response.name,
      icon: response.icon,
      splash: response.splash,
      discoverySplash: response.discovery_splash,
      emojis: response.emojis.map((emoji) => this.util.emojiFromRaw(emoji)),
      features: response.features,
      approximateMemberCount: response.approximate_member_count,
      approximatePresenceCount: response.approximate_presence_count,
      description: response.description,
      stickers: response.stickers?.map((sticker) =>
        this.util.stickerFromRaw(sticker)
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
  getGuildPruneCount(
    guildID: snowflake,
    options: {
      days: number;
      includeRoles: string | Array<string>;
    }
  ): Promise<{ pruned: number }> {
    return this.rest.request<{ pruned: number }>(
      RESTMethods.Get,
      Endpoints.guildPrune(guildID),
      {
        query: {
          days: options.days,
          include_roles: options.includeRoles,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-roles */
  async getGuildRoles(guildID: snowflake): Promise<Array<Role>> {
    const response = await this.rest.request<Array<RawRole>>(
      RESTMethods.Get,
      Endpoints.guildRoles(guildID)
    );

    return response.map((role) => this.util.roleFromRaw(role));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild */
  async getGuildScheduledEvents(
    guildID: snowflake,
    options?: {
      withUserCount?: boolean;
    }
  ): Promise<Array<GuildScheduledEvent>> {
    const response = await this.rest.request<Array<RawGuildScheduledEvent>>(
      RESTMethods.Get,
      Endpoints.guildScheduledEvents(guildID),
      {
        query: {
          with_user_count: options?.withUserCount,
        },
      }
    );

    return response.map((guildScheduledEvent) =>
      this.util.guildScheduledEventFromRaw(guildScheduledEvent)
    );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
  async getGuildScheduledEventUsers(
    guildID: snowflake,
    guildScheduledEventID: snowflake,
    options?: {
      limit?: number;
      withMember?: boolean;
      before?: string;
      after?: string;
    }
  ): Promise<Array<GuildScheduledEventUser>> {
    const response = await this.rest.request<Array<RawGuildScheduledEventUser>>(
      RESTMethods.Get,
      Endpoints.guildScheduledEvent(guildID, guildScheduledEventID),
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
      guildScheduledEventID: guildScheduledEventUser.guild_scheduled_event_id,
      user: this.util.userFromRaw(guildScheduledEventUser.user),
      member:
        guildScheduledEventUser.member !== undefined
          ? this.util.guildMemberFromRaw(guildScheduledEventUser.member)
          : undefined,
    }));
  }

  /** https://discord.com/developers/docs/resources/sticker#get-guild-sticker */
  async getGuildSticker(
    guildID: snowflake,
    stickerID: snowflake
  ): Promise<Sticker> {
    const response = await this.rest.request<RawSticker>(
      RESTMethods.Get,
      Endpoints.guildSticker(guildID, stickerID)
    );

    return this.util.stickerFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/sticker#list-guild-stickers */
  async getGuildStickers(guildID: snowflake): Promise<Array<Sticker>> {
    const response = await this.rest.request<Array<RawSticker>>(
      RESTMethods.Get,
      Endpoints.guildStickers(guildID)
    );

    return response.map((sticker) => this.util.stickerFromRaw(sticker));
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-template */
  async getGuildTemplate(
    guildID: snowflake,
    code: string
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Get,
      Endpoints.guildTemplate(guildID, code)
    );

    return this.util.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-templates */
  async getGuildTemplates(guildID: snowflake): Promise<Array<GuildTemplate>> {
    const response = await this.rest.request<Array<RawGuildTemplate>>(
      RESTMethods.Get,
      Endpoints.guildTemplates(guildID)
    );

    return response.map((guildTemplate) =>
      this.util.guildTemplateFromRaw(guildTemplate)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
  getGuildVanityURL(guildID: snowflake): Promise<{
    code: string;
    uses: number;
  }> {
    return this.rest.request<{
      code: string;
      uses: number;
    }>(RESTMethods.Get, Endpoints.guildVanityURL(guildID));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
  async getGuildVoiceRegions(guildID: snowflake): Promise<Array<VoiceRegion>> {
    const response = await this.rest.request<Array<RawVoiceRegion>>(
      RESTMethods.Get,
      Endpoints.guildVoiceRegions(guildID)
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
  async getGuildWelcomeScreen(guildID: snowflake): Promise<WelcomeScreen> {
    const response = await this.rest.request<RawWelcomeScreen>(
      RESTMethods.Get,
      Endpoints.guildWelcomeScreen(guildID)
    );

    return {
      description: response.description,
      welcomeChannels: response.welcome_channels.map(
        (welcomeScreenChannel) => ({
          channelID: welcomeScreenChannel.channel_id,
          description: welcomeScreenChannel.description,
          emojiID: welcomeScreenChannel.emoji_id,
          emojiName: welcomeScreenChannel.emoji_name,
        })
      ),
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget */
  async getGuildWidget(guildID: snowflake): Promise<GuildWidget> {
    const response = await this.rest.request<RawGuildWidget>(
      RESTMethods.Get,
      Endpoints.guildWidgetJSON(guildID)
    );

    return {
      id: response.id,
      name: response.name,
      instantInvite: response.instant_invite,
      channels: response.channels.map((channel) =>
        this.util.channelFromRaw(channel)
      ),
      members: response.members.map((member) => this.util.userFromRaw(member)),
      presenceCount: response.presence_count,
    };
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-image */
  getGuildWidgetImage(
    guildID: snowflake,
    options?: {
      style?: ImageWidgetStyleOptions;
    }
  ): Promise<string> {
    return this.rest.request<string>(
      RESTMethods.Get,
      Endpoints.guildWidgetImage(guildID),
      {
        query: {
          style: options?.style,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-settings */
  async getGuildWidgetSettings(
    guildID: snowflake
  ): Promise<GuildWidgetSettings> {
    const response = await this.rest.request<RawGuildWidgetSettings>(
      RESTMethods.Get,
      Endpoints.guildWidgetSettings(guildID)
    );

    return {
      enabled: response.enabled,
      channelID: response.channel_id,
    };
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
  async getInteractionFollowupMessage(
    applicationID: snowflake,
    interactionToken: string,
    messageID: snowflake,
    options?: {
      threadID?: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.webhookMessage(applicationID, interactionToken, messageID),
      {
        query: {
          thread_id: options?.threadID,
        },
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
  async getInteractionResponse(
    applicationID: snowflake,
    interactionToken: string,
    options?: { threadID?: snowflake }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.webhookMessage(applicationID, interactionToken),
      {
        query: {
          thread_id: options?.threadID,
        },
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/invite#get-invite */
  async getInvite(
    code: string,
    options?: {
      withCounts?: boolean;
      withExpiration?: boolean;
      guildScheduledEventID?: snowflake;
    }
  ): Promise<Invite> {
    const response = await this.rest.request<RawInvite>(
      RESTMethods.Get,
      Endpoints.invite(code),
      {
        query: {
          with_counts: options?.withCounts,
          with_expiration: options?.withExpiration,
          guild_scheduled_event_id: options?.guildScheduledEventID,
        },
      }
    );

    return this.util.inviteFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads */
  async getJoinedPrivateArchivedThreads(
    channelID: snowflake,
    options?: {
      before?: string;
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
    }>(RESTMethods.Get, Endpoints.channelThreads(channelID, "private", true), {
      query: {
        before: options?.before,
        limit: options?.limit,
      },
    });

    return {
      threads: response.threads.map((thread) =>
        this.util.channelFromRaw(thread)
      ),
      members: response.members.map((threadMember) =>
        this.util.threadMemberFromRaw(threadMember)
      ),
      hasMore: response.has_more,
    };
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-message */
  async getMessage(
    channelID: snowflake,
    messageID: snowflake
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.channelMessage(channelID, messageID)
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#get-reactions */
  async getMessageReactions(
    channelID: snowflake,
    messageID: snowflake,
    emoji: string,
    options?: {
      type?: ReactionTypes;
      after?: string;
      limit?: number;
    }
  ): Promise<Array<User>> {
    const response = await this.rest.request<Array<RawUser>>(
      RESTMethods.Get,
      Endpoints.channelMessageAllReactions(channelID, messageID, emoji),
      {
        query: {
          type: options?.type,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return response.map((user) => this.util.userFromRaw(user));
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-messages */
  async getMessages(
    channelID: snowflake,
    options: {
      around?: string;
      before?: string;
      after?: string;
      limit?: number;
    }
  ): Promise<Array<Message>> {
    const response = await this.rest.request<Array<RawMessage>>(
      RESTMethods.Get,
      Endpoints.channelMessages(channelID),
      {
        query: {
          around: options.around,
          before: options.before,
          after: options.after,
          limit: options.limit,
        },
      }
    );

    return response.map((message) => this.util.messageFromRaw(message));
  }

  /** https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information */
  async getOAuth2Application(): Promise<Application> {
    const response = await this.rest.request<RawApplication>(
      RESTMethods.Get,
      Endpoints.oauth2CurrentApplication()
    );

    return this.util.applicationFromRaw(response);
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
      application: this.util.applicationFromRaw(response.application),
      scopes: response.scopes,
      expires: response.expires,
      user:
        response.user !== undefined
          ? this.util.userFromRaw(response.user)
          : undefined,
    };
  }

  /** https://discord.com/developers/docs/resources/channel#get-pinned-messages */
  async getPinnedMessages(channelID: snowflake): Promise<Array<Message>> {
    const response = await this.rest.request<Array<RawMessage>>(
      RESTMethods.Get,
      Endpoints.channelPins(channelID)
    );

    return response.map((message) => this.util.messageFromRaw(message));
  }

  /** https://discord.com/developers/docs/resources/poll#get-answer-voters */
  async getPollAnswerVoters(
    channelID: snowflake,
    messageID: snowflake,
    answerID: snowflake,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<{
    users: Array<User>;
  }> {
    const response = await this.rest.request<{
      users: Array<RawUser>;
    }>(
      RESTMethods.Get,
      Endpoints.pollAnswerVoters(channelID, messageID, answerID),
      {
        query: {
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return {
      users: response.users.map((user) => this.util.userFromRaw(user)),
    };
  }

  /** https://discord.com/developers/docs/monetization/skus#list-skus */
  async getSKUs(applicationID: snowflake): Promise<Array<SKU>> {
    const response = await this.rest.request<Array<RawSKU>>(
      RESTMethods.Get,
      Endpoints.applicationSKUs(applicationID)
    );

    return response.map((sku) => this.util.skuFromRaw(sku));
  }

  /** https://discord.com/developers/docs/resources/stage-instance#get-stage-instance */
  async getStageInstance(channelID: snowflake): Promise<StageInstance> {
    const response = await this.rest.request<RawStageInstance>(
      RESTMethods.Get,
      Endpoints.stageInstance(channelID)
    );

    return this.util.stageInstanceFromRaw(response);
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
          this.util.stickerFromRaw(sticker)
        ),
        name: stickerPack.name,
        skuID: stickerPack.sku_id,
        coverStickerID: stickerPack.cover_sticker_id,
        description: stickerPack.description,
        bannerAssetID: stickerPack.banner_asset_id,
      })),
    };
  }

  /** https://discord.com/developers/docs/resources/channel#get-thread-member */
  async getThreadMember(
    channelID: snowflake,
    userID: snowflake,
    options?: {
      withMember?: boolean;
    }
  ): Promise<ThreadMember> {
    const response = await this.rest.request<RawThreadMember>(
      RESTMethods.Get,
      Endpoints.threadMembers(channelID, userID),
      {
        query: {
          with_member: options?.withMember,
        },
      }
    );

    return {
      id: response.id,
      userID: response.user_id,
      joinTimestamp: response.join_timestamp,
      flags: response.flags,
      member:
        response.member !== undefined
          ? this.util.guildMemberFromRaw(response.member)
          : undefined,
    };
  }

  /** https://discord.com/developers/docs/resources/channel#list-thread-members */
  async getThreadMembers(
    channelID: snowflake,
    options?: {
      withMember?: boolean;
      after?: string;
      limit?: number;
    }
  ): Promise<Array<ThreadMember>> {
    const response = await this.rest.request<Array<RawThreadMember>>(
      RESTMethods.Get,
      Endpoints.threadMembers(channelID),
      {
        query: {
          with_member: options?.withMember,
          after: options?.after,
          limit: options?.limit,
        },
      }
    );

    return response.map((threadMember) =>
      this.util.threadMemberFromRaw(threadMember)
    );
  }

  /** https://discord.com/developers/docs/resources/user#get-user */
  async getUser(userID?: snowflake): Promise<User> {
    const response = await this.rest.request<RawUser>(
      RESTMethods.Get,
      Endpoints.user(userID)
    );

    return this.util.userFromRaw(response);
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

  /** https://discord.com/developers/docs/resources/webhook#get-webhook-message */
  async getWebhookMessage(
    webhookID: snowflake,
    webhookToken: string,
    messageID: snowflake,
    options?: {
      threadID?: snowflake;
    }
  ): Promise<Message> {
    const response = await this.rest.request<RawMessage>(
      RESTMethods.Get,
      Endpoints.webhookMessage(webhookID, webhookToken, messageID),
      {
        query: {
          thread_id: options?.threadID,
        },
      }
    );

    return this.util.messageFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
  async getWebhooks(guildID: snowflake): Promise<Array<Webhook>> {
    const response = await this.rest.request<Array<RawWebhook>>(
      RESTMethods.Get,
      Endpoints.guildWebhooks(guildID)
    );

    return response.map((webhook) => this.util.webhookFromRaw(webhook));
  }

  /** https://discord.com/developers/docs/resources/channel#join-thread */
  joinThread(channelID: snowflake): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.threadMembers(channelID, "@me")
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  joinVoiceChannel(
    guildID: snowflake,
    channelID: snowflake,
    options?: {
      selfMute?: boolean;
      selfDeaf?: boolean;
    }
  ): void {
    this.shards.get(this.guildShardMap[guildID])!.updateVoiceState({
      guildID,
      channelID,
      selfMute: !!options?.selfMute,
      selfDeaf: !!options?.selfDeaf,
    });
  }

  /** https://discord.com/developers/docs/resources/user#leave-guild */
  leaveGuild(guildID: snowflake): void {
    this.rest.request(RESTMethods.Delete, Endpoints.userGuild(guildID));
  }

  /** https://discord.com/developers/docs/resources/channel#leave-thread */
  leaveThread(channelID: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.threadMembers(channelID, "@me")
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  leaveVoiceChannel(guildID: snowflake): void {
    this.shards.get(this.guildShardMap[guildID])!.updateVoiceState({
      guildID,
      channelID: null,
      selfMute: false,
      selfDeaf: false,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#pin-message */
  pinMessage(
    channelID: snowflake,
    messageID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelPin(channelID, messageID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  removeBan(guildID: snowflake, userID: snowflake, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.guildBan(guildID, userID), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
  removeGroupRecipient(channelID: snowflake, userID: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelRecipient(channelID, userID)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member */
  removeGuildMember(
    guildID: snowflake,
    userID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildMember(guildID, userID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  removeGuildMemberRole(
    guildID: snowflake,
    userID: snowflake,
    roleID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildMemberRole(guildID, userID, roleID),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/channel#remove-thread-member */
  removeThreadMember(channelID: snowflake, userID: snowflake): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.threadMembers(channelID, userID)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#search-guild-members */
  async searchGuildMembers(
    guildID: snowflake,
    options: {
      query: string;
      limit?: number;
    }
  ): Promise<Array<GuildMember>> {
    const response = await this.rest.request<Array<RawGuildMember>>(
      RESTMethods.Get,
      Endpoints.guildMembersSearch(guildID),
      {
        query: {
          query: options.query,
          limit: options.limit,
        },
      }
    );

    return response.map((guildMember) =>
      this.util.guildMemberFromRaw(guildMember)
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  setPresence(
    options: Partial<
      Pick<GatewayPresenceUpdate, "activities" | "status" | "afk">
    >
  ): void {
    this.shards.updatePresence(options);
  }

  /** https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  async syncGuildTemplate(
    guildID: snowflake,
    code: string
  ): Promise<GuildTemplate> {
    const response = await this.rest.request<RawGuildTemplate>(
      RESTMethods.Put,
      Endpoints.guildTemplate(guildID, code)
    );

    return this.util.guildTemplateFromRaw(response);
  }

  /** https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
  triggerTypingIndicator(channelID: snowflake): void {
    this.rest.request(RESTMethods.Post, Endpoints.channelTyping(channelID));
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records */
  async updateApplicationRoleConnectionMetadataRecords(
    applicationID: snowflake
  ): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const response = await this.rest.request<
      Array<RawApplicationRoleConnectionMetadata>
    >(
      RESTMethods.Put,
      Endpoints.applicationRoleConnectionMetadata(applicationID)
    );

    return response.map((applicationRoleConnectionMetadata) => ({
      type: applicationRoleConnectionMetadata.type,
      key: applicationRoleConnectionMetadata.key,
      name: applicationRoleConnectionMetadata.name,
      nameLocalizations: applicationRoleConnectionMetadata.name_localizations,
      description: applicationRoleConnectionMetadata.description,
      descriptionLocalizations:
        applicationRoleConnectionMetadata.description_localizations,
    }));
  }

  /** https://discord.com/developers/docs/resources/user#update-current-user-application-role-connection */
  async updateCurrentApplicationRoleConnection(
    applicationID: snowflake,
    options: {
      platformName?: string;
      platformUsername?: string;
      metadata?: ApplicationRoleConnectionMetadata;
    }
  ): Promise<ApplicationRoleConnection> {
    const response = await this.rest.request<RawApplicationRoleConnection>(
      RESTMethods.Put,
      Endpoints.userApplicationRoleConnection(applicationID),
      {
        json: {
          platform_name: options.platformName,
          platform_username: options.platformUsername,
          metadata: options.metadata,
        },
      }
    );

    return {
      platformName: response.platform_name,
      platformUsername: response.platform_username,
      metadata: {
        type: response.metadata.type,
        key: response.metadata.key,
        name: response.metadata.name,
        nameLocalizations: response.metadata.name_localizations,
        description: response.metadata.description,
        descriptionLocalizations: response.metadata.description_localizations,
      },
    };
  }

  /** https://discord.com/developers/docs/resources/channel#unpin-message */
  unpinMessage(
    channelID: snowflake,
    messageID: snowflake,
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelPin(channelID, messageID),
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
  dispatch: [packet: RawPayload];
  hello: [];
  ready: [];
  resumed: [];
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
  guildEmojisUpdate: [emojis: Array<Emoji>, guildID: snowflake];
  guildStickersUpdate: [stickers: Array<Sticker>, guildID: snowflake];
  guildIntegrationsUpdate: [guildID: snowflake];
  guildMemberAdd: [guildMember: GuildMember & GuildMemberAddEventExtraFields];
  guildMemberRemove: [guildMember: GuildMemberRemoveEventFields];
  guildMemberUpdate: [guildMember: GuildMemberUpdateEventFields];
  guildMembersChunk: [request: GuildMembersChunkEventFields];
  guildRoleCreate: [role: Role, guildID: snowflake];
  guildRoleUpdate: [role: Role, guildID: snowflake];
  guildRoleDelete: [roleID: snowflake, guildID: snowflake];
  guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventUpdate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventDelete: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventUserAdd: [
    userID: snowflake,
    guildScheduledEventID: snowflake,
    guildID: snowflake
  ];
  guildScheduledEventUserRemove: [
    userID: snowflake,
    guildScheduledEventID: snowflake,
    guildID: snowflake
  ];
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
  messageUpdate: [
    message: Partial<Message> & Pick<Message, "id" | "channelID">
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
  stageInstanceDelete: [stageInstance: StageInstance];
  typingStart: [typing: TypingStartEventFields];
  userUpdate: [user: User];
  voiceStateUpdate: [voiceState: VoiceState];
  voiceServerUpdate: [voiceServer: VoiceServerUpdateEventFields];
  webhooksUpdate: [channelID: snowflake, guildID: snowflake];
  messagePollVoteAdd: [vote: MessagePollVoteAddFields];
  messagePollVoteRemove: [vote: MessagePollVoteRemoveFields];
}
