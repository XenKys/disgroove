import {
  GatewayIntents,
  type OAuth2Scopes,
  type StatusTypes,
  GatewayOPCodes,
  type ActionTypes,
  type ImageWidgetStyleOptions,
  InteractionCallbackType,
  type MFALevel,
} from "./constants";
import { Util } from "./utils";
import { Endpoints, RequestManager, RESTMethods } from "./rest";
import type {
  Activity,
  AuditLogEntry,
  AutoModerationActionExecutionEventFields,
  AutoModerationRule,
  Channel,
  ChannelPinsUpdateEventFields,
  GuildApplicationCommandPermissions,
  GuildBanAddEventFields,
  GuildBanRemoveEventFields,
  GuildMemberRemoveEventFields,
  GuildMemberUpdateEventFields,
  GuildMembersChunkEventFields,
  GuildScheduledEvent,
  IntegrationDeleteEventFields,
  InviteCreateEventFields,
  InviteDeleteEventFields,
  MessageDeleteBulkEventFields,
  MessageDeleteEventFields,
  MessageReactionAddEventFields,
  MessageReactionRemoveAllEventFields,
  MessageReactionRemoveEmojiEventFields,
  MessageReactionRemoveEventFields,
  PresenceUpdateEventFields,
  StageInstance,
  StickerPack,
  ThreadListSyncEventFields,
  ThreadMember,
  ThreadMembersUpdateEventFields,
  TypingStartEventFields,
  VoiceRegion,
  VoiceServerUpdateEventFields,
  RawApplication,
  RawChannel,
  RawGuild,
  RawInvite,
  RawStageInstance,
  RawStickerPack,
  RawUser,
  RawVoiceRegion,
  Entitlement,
  UnavailableGuild,
  CreateGlobalApplicationCommandParams,
  ApplicationCommand,
  RawApplicationCommand,
  CreateGuildApplicationCommandParams,
  CreateTestEntitlementParams,
  RawEntitlement,
  EditCurrentApplicationParams,
  Application,
  RawGuildApplicationCommandPermissions,
  EditGlobalApplicationCommandParams,
  EditGuildApplicationCommandParams,
  ApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
  RawSku,
  Sku,
  BulkEditGlobalApplicationCommandsParams,
  BulkEditGuildApplicationCommandsParams,
  CreateGuildParams,
  CreateGuildFromGuildTemplateParams,
  CreateStageInstanceParams,
  EditAutoModerationRuleParams,
  RawAutoModerationRule,
  CreateChannelInviteParams,
  Invite,
  CreateMessageParams,
  Message,
  RawMessage,
  CreateThreadFromMessageParams,
  CreateThreadParams,
  CreateThreadWithoutMessageParams,
  Webhook,
  RawWebhook,
  EditChannelParams,
  EditMessageParams,
  FollowedChannel,
  RawFollowedChannel,
  RawThreadMember,
  User,
  Emoji,
  RawEmoji,
  EditGuildEmojiParams,
  RawGuildMember,
  AddGuildMemberParams,
  BeginGuildPruneParams,
  GuildMember,
  CreateAutoModerationRuleParams,
  CreateGuildBanParams,
  CreateGuildChannelParams,
  CreateGuildEmojiParams,
  CreateGuildRoleParams,
  RawRole,
  Role,
  CreateGuildScheduledEventParams,
  RawGuildScheduledEvent,
  CreateGuildStickerParams,
  RawSticker,
  CreateGuildTemplateParams,
  GuildTemplate,
  Sticker,
  RawGuildTemplate,
  EditGuildParams,
  Guild,
  EditGuildChannelPositionsParams,
  EditGuildMemberParams,
  EditCurrentUserVoiceStateParams,
  EditCurrentGuildMemberParams,
  EditGuildMFALevelParams,
  EditGuildOnboardingParams,
  EditGuildRolePositionsParams,
  EditGuildScheduledEventParams,
  EditGuildStickerParams,
  EditGuildTemplateParams,
  EditGuildWelcomeScreenParams,
  WelcomeScreen,
  RawWelcomeScreen,
  GuildWidgetSettings,
  RawGuildWidgetSettings,
  AuditLog,
  RawAuditLog,
  Ban,
  RawBan,
  RawIntegration,
  Integration,
  GuildOnboarding,
  RawGuildOnboarding,
  GuildPreview,
  RawGuildPreview,
  GuildScheduledEventUser,
  RawGuildScheduledEventUser,
  GuildWidget,
  RawGuildWidget,
  ExecuteWebhookParams,
  CreateInteractionFollowupMessageParams,
  InteractionResponse,
  EditWebhookMessageParams,
  EditStageInstanceParams,
  CreateDMParams,
  EditCurrentUserParams,
  ApplicationRoleConnection,
  RawApplicationRoleConnection,
  Connection,
  RawConnection,
  UpdateCurrentUserApplicationRoleConnection,
  EditWebhookParams,
  Interaction,
  VoiceState,
  GuildCreateEventExtraFields,
  GuildMemberAddEventExtraFields,
  IntegrationCreateEventExtraFields,
  IntegrationUpdateEventExtraFields,
  MessageCreateEventExtraFields,
  ThreadMemberUpdateEventExtraFields,
  RawActionRow,
  RawEmbed,
  RawApplicationCommandOption,
  RawAutoModerationAction,
  RawDefaultReaction,
  RawOnboardingPrompt,
  RawAllowedMentions,
  RawApplicationCommandOptionChoice,
  RawAttachment,
  MessagePollVoteAddFields,
  MessagePollVoteRemoveFields,
} from "./types";
import EventEmitter from "node:events";
import { Shard, ShardManager } from "./gateway";

export interface ClientOptions {
  intents?: number | Array<number>;
  shardsCount?: number | "auto";
  auth?: "Bot" | "Bearer";
}

export class Client extends EventEmitter {
  token: string;
  intents: GatewayIntents | number;
  shardsCount: number | "auto";
  auth: "Bot" | "Bearer";
  shards: ShardManager;
  rest: RequestManager;
  util: Util;
  guildShardMap: Record<string, number>;
  user!: User;
  guilds!: Map<string, Guild>;
  application!: Pick<Application, "id" | "flags">;

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
    this.shards = new ShardManager();
    this.rest = new RequestManager(token, this.auth);
    this.util = new Util();
    this.guildShardMap = {};
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
  addGroupRecipient(
    channelId: string,
    userId: string,
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
  addGuildMember(
    guildId: string,
    userId: string,
    options: AddGuildMemberParams
  ): Promise<GuildMember | null> {
    return this.rest
      .request<RawGuildMember>(
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
      )
      .then((response) =>
        response !== null ? this.util.toCamelCase<GuildMember>(response) : null
      );
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  addGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
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

  /** https://discord.com/developers/docs/resources/channel#add-thread-member */
  addThreadMember(channelId: string, userId: string): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.threadMembers(channelId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
  beginGuildPrune(
    guildId: string,
    options: BeginGuildPruneParams,
    reason?: string
  ): Promise<{
    pruned: number;
  }> {
    return this.rest
      .request<{
        pruned: number;
      }>(RESTMethods.Post, Endpoints.guildPrune(guildId), {
        json: {
          days: options.days,
          compute_prune_count: options.computePruneCount,
          include_roles: options.includeRoles,
          reason: options.reason,
        },
        reason,
      })
      .then((response) =>
        this.util.toCamelCase<{
          pruned: number;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
  bulkDeleteMessages(
    channelId: string,
    options?: {
      messagesIds?: Array<string>;
    },
    reason?: string
  ): void {
    this.rest.request(
      RESTMethods.Post,
      Endpoints.channelBulkDelete(channelId),
      {
        json: {
          messages: options?.messagesIds,
        },
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  bulkEditGlobalApplicationCommands(
    applicationId: string,
    commands: BulkEditGlobalApplicationCommandsParams
  ): Promise<Array<ApplicationCommand>> {
    return this.rest
      .request<Array<RawApplicationCommand>>(
        RESTMethods.Put,
        Endpoints.applicationCommands(applicationId),
        {
          json: commands.map((command) => this.util.toSnakeCase(command)),
        }
      )
      .then((response) =>
        response.map((applicationCommand) =>
          this.util.toCamelCase<ApplicationCommand>(applicationCommand)
        )
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  bulkEditGuildApplicationCommands(
    applicationId: string,
    guildId: string,
    commands: BulkEditGuildApplicationCommandsParams
  ): Promise<Array<ApplicationCommand>> {
    return this.rest
      .request<Array<RawApplicationCommand>>(
        RESTMethods.Put,
        Endpoints.applicationGuildCommands(applicationId, guildId),
        {
          json: commands.map((command) => this.util.toSnakeCase(command)),
        }
      )
      .then((response) =>
        response.map((applicationCommand) =>
          this.util.toCamelCase<ApplicationCommand>(applicationCommand)
        )
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

    this.shards.connect();
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule */
  createAutoModerationRule(
    guildId: string,
    options: CreateAutoModerationRuleParams,
    reason?: string
  ): Promise<AutoModerationRule> {
    return this.rest
      .request<RawAutoModerationRule>(
        RESTMethods.Post,
        Endpoints.guildAutoModerationRules(guildId),
        {
          json: {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options.triggerMetadata,
            actions: options.actions.map((action) =>
              this.util.toSnakeCase<RawAutoModerationAction>(action)
            ),
            enabled: options.enabled,
            exempt_roles: options.exemptRoles,
            exempt_channels: options.exemptChannels,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<AutoModerationRule>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-channel */
  createChannel(
    guildId: string,
    options: CreateGuildChannelParams,
    reason?: string
  ): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Post, Endpoints.guildChannels(guildId), {
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
                ? this.util.toSnakeCase<RawDefaultReaction>(
                    options.defaultReactionEmoji
                  )
                : null
              : undefined,
          available_tags: options.availableTags,
          default_sort_order: options.defaultSortOrder,
          default_forum_layout: options.defaultForumLayout,
          default_thread_rate_limit_per_user:
            options.defaultThreadRateLimitPerUser,
        },
        reason,
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#create-channel-invite */
  createChannelInvite(
    channelId: string,
    options: CreateChannelInviteParams,
    reason?: string
  ): Promise<Invite> {
    return this.rest
      .request<RawInvite>(
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
      )
      .then((response) => this.util.toCamelCase<Invite>(response));
  }

  /** https://discord.com/developers/docs/resources/webhook#create-webhook */
  createChannelWebhook(
    channelId: string,
    options: {
      name: string;
      avatar?: string | null;
    },
    reason?: string
  ): Promise<Webhook> {
    return this.rest
      .request<RawWebhook>(
        RESTMethods.Post,
        Endpoints.channelWebhooks(channelId),
        {
          json: {
            name: options.name,
            avatar: options.avatar,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<Webhook>(response));
  }

  /** https://discord.com/developers/docs/resources/user#create-dm */
  createDM(options: CreateDMParams): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Post, Endpoints.userChannels(), {
        json: {
          recipient_id: options.recipientId,
        },
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
  createGlobalApplicationCommand(
    applicationId: string,
    options: CreateGlobalApplicationCommandParams
  ): Promise<ApplicationCommand> {
    return this.rest
      .request<RawApplicationCommand>(
        RESTMethods.Post,
        Endpoints.applicationCommands(applicationId),
        {
          json: {
            type: options.type,
            name: options.name,
            name_localizations: options.nameLocalizations,
            description: options.description,
            description_localizations: options.descriptionLocalizations,
            options: options.options?.map((option) =>
              this.util.toSnakeCase<RawApplicationCommandOption>(option)
            ),
            default_member_permissions: options.defaultMemberPermissions,
            dm_permission: options.dmPermission,
            default_permission: options.defaultPermission,
            nsfw: options.nsfw,
          },
        }
      )
      .then((response) => this.util.toCamelCase<ApplicationCommand>(response));
  }

  /** https://discord.com/developers/docs/resources/user#create-group-dm */
  createGroupDM(options: {
    accessTokens: Array<string>;
    nicks: Array<string>;
  }): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Post, Endpoints.userChannels(), {
        json: {
          access_tokens: options.accessTokens,
          nicks: options.nicks,
        },
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild */
  createGuild(options: CreateGuildParams): Promise<Guild> {
    return this.rest
      .request<RawGuild>(RESTMethods.Post, Endpoints.guilds(), {
        json: {
          name: options.name,
          region: options.region,
          icon: options.icon,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          roles: options.roles?.map((role) => this.util.toSnakeCase(role)),
          channels: options.channels?.map((channel) =>
            this.util.toSnakeCase(channel)
          ),
          afk_channel_id: options.afkChannelId,
          afk_timeout: options.afkTimeout,
          system_channel_id: options.systemChannelId,
          system_channel_flags: options.systemChannelFlags,
        },
      })
      .then((response) => this.util.toCamelCase<Guild>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  createGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    options: CreateGuildApplicationCommandParams
  ): Promise<ApplicationCommand> {
    return this.rest
      .request<RawApplicationCommand>(
        RESTMethods.Post,
        Endpoints.applicationGuildCommands(applicationId, guildId),
        {
          json: {
            type: options.type,
            name: options.name,
            name_localizations: options.nameLocalizations,
            description: options.description,
            description_localizations: options.descriptionLocalizations,
            options: options.options?.map((option) =>
              this.util.toSnakeCase<RawApplicationCommandOption>(option)
            ),
            default_member_permissions: options.defaultMemberPermissions,
            default_permission: options.defaultPermission,
            nsfw: options.nsfw,
          },
        }
      )
      .then((response) => this.util.toCamelCase<ApplicationCommand>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  createGuildBan(
    guildId: string,
    userId: string,
    options?: CreateGuildBanParams,
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
  createGuildEmoji(
    guildId: string,
    options: CreateGuildEmojiParams,
    reason?: string
  ): Promise<Emoji> {
    return this.rest
      .request<RawEmoji>(RESTMethods.Post, Endpoints.guildEmojis(guildId), {
        json: {
          name: options.name,
          image: options.image,
          roles: options.roles,
        },
        reason,
      })
      .then((response) => this.util.toCamelCase<Emoji>(response));
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template */
  createGuildFromTemplate(
    code: string,
    options: CreateGuildFromGuildTemplateParams
  ): Promise<Guild> {
    return this.rest
      .request<RawGuild>(RESTMethods.Post, Endpoints.template(code), {
        json: {
          name: options.name,
          icon: options.icon,
        },
      })
      .then((response) => this.util.toCamelCase<Guild>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-role */
  createGuildRole(
    guildId: string,
    options: CreateGuildRoleParams,
    reason?: string
  ): Promise<Role> {
    return this.rest
      .request<RawRole>(RESTMethods.Post, Endpoints.guildRoles(guildId), {
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
      })
      .then((response) => this.util.toCamelCase<Role>(response));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event */
  createGuildScheduledEvent(
    guildId: string,
    options: CreateGuildScheduledEventParams,
    reason?: string
  ): Promise<GuildScheduledEvent> {
    return this.rest
      .request<RawGuildScheduledEvent>(
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
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<GuildScheduledEvent>(response));
  }

  /** https://discord.com/developers/docs/resources/sticker#create-guild-sticker */
  createGuildSticker(
    guildId: string,
    options: CreateGuildStickerParams,
    reason?: string
  ): Promise<Sticker> {
    const formData = new FormData();

    formData.set("name", options.name);
    formData.set("description", options.description);
    formData.set("tags", options.tags);
    formData.set("file", new Blob([options.file.contents]), options.file.name);

    return this.rest
      .request<RawSticker>(RESTMethods.Post, Endpoints.guildStickers(guildId), {
        form: formData,
        reason,
      })
      .then((response) => this.util.toCamelCase<Sticker>(response));
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-template */
  createGuildTemplate(
    guildId: string,
    options: CreateGuildTemplateParams
  ): Promise<GuildTemplate> {
    return this.rest
      .request<RawGuildTemplate>(
        RESTMethods.Post,
        Endpoints.guildTemplates(guildId),
        {
          json: {
            name: options.name,
            description: options.description,
          },
        }
      )
      .then((response) => this.util.toCamelCase<GuildTemplate>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
  createInteractionFollowupMessage(
    applicationId: string,
    interactionToken: string,
    options: CreateInteractionFollowupMessageParams
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Post,
        Endpoints.webhook(applicationId, interactionToken),
        {
          json: {
            content: options.content,
            tts: options.tts,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? options.embeds.map((e) =>
                      this.util.toSnakeCase<RawEmbed>(e)
                    )
                  : null
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? options.allowedMentions !== null
                  ? this.util.toSnakeCase<RawAllowedMentions>(
                      options.allowedMentions
                    )
                  : null
                : undefined,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? options.components.map((c) =>
                      this.util.toSnakeCase<RawActionRow>(c)
                    )
                  : null
                : undefined,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
            thread_name: options.threadName,
          },
          files: options.files,
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
  createInteractionResponse(
    interactionId: string,
    interactionToken: string,
    options: InteractionResponse
  ): void {
    switch (options.type) {
      case InteractionCallbackType.ChannelMessageWithSource:
      case InteractionCallbackType.UpdateMessage:
        {
          this.rest.request(
            RESTMethods.Post,
            Endpoints.interactionCallback(interactionId, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  content: options.data?.content,
                  embeds:
                    options.data?.embeds !== undefined
                      ? this.util.toSnakeCase<RawEmbed>(options.data.embeds)
                      : undefined,
                  allowed_mentions:
                    options.data?.allowedMentions !== undefined
                      ? this.util.toSnakeCase<RawAllowedMentions>(
                          options.data.allowedMentions
                        )
                      : undefined,
                  flags: options.data?.flags,
                  components:
                    options.data?.components !== undefined
                      ? this.util.toSnakeCase<RawActionRow>(
                          options.data.components
                        )
                      : undefined,
                  attachments: options.data?.attachments?.map((attachment) =>
                    this.util.toSnakeCase<RawAttachment>(attachment)
                  ),
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
            Endpoints.interactionCallback(interactionId, interactionToken),
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
            Endpoints.interactionCallback(interactionId, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  choices: options.data?.choices?.map((choice) =>
                    this.util.toSnakeCase<RawApplicationCommandOptionChoice>(
                      choice
                    )
                  ),
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
            Endpoints.interactionCallback(interactionId, interactionToken),
            {
              json: {
                type: options.type,
                data: {
                  custom_id: options.data?.customId,
                  components:
                    options.data?.components !== undefined
                      ? this.util.toSnakeCase<RawActionRow>(
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
            Endpoints.interactionCallback(interactionId, interactionToken),
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
  createMessage(
    channelId: string,
    options: CreateMessageParams
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Post,
        Endpoints.channelMessages(channelId),
        {
          json: {
            content: options.content,
            nonce: options.nonce,
            tts: options.tts,
            embeds:
              options.embeds !== undefined
                ? options.embeds.map((e) => this.util.toSnakeCase<RawEmbed>(e))
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? this.util.toSnakeCase<RawAllowedMentions>(
                    options.allowedMentions
                  )
                : undefined,
            message_reference: options.messageReference,
            components:
              options.components !== undefined
                ? options.components.map((c) =>
                    this.util.toSnakeCase<RawActionRow>(c)
                  )
                : undefined,
            stickers_ids: options.stickersIds,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
            enforce_nonce: options.enforceNonce,
          },
          files: options.files,
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  createMessageReaction(
    channelId: string,
    messageId: string,
    emoji: string
  ): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelMessageReaction(channelId, messageId, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#create-stage-instance */
  createStageInstance(
    options: CreateStageInstanceParams,
    reason?: string
  ): Promise<StageInstance> {
    return this.rest
      .request<RawStageInstance>(RESTMethods.Post, Endpoints.stageInstances(), {
        json: {
          channel_id: options.channelId,
          topic: options.topic,
          privacy_level: options.privacyLevel,
          send_start_notifications: options.sendStartNotifications,
          guild_scheduled_event_id: options.guildScheduledEventId,
        },
        reason,
      })
      .then((response) => this.util.toCamelCase<StageInstance>(response));
  }

  /** https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement */
  createTestEntitlement(
    applicationId: string,
    options: CreateTestEntitlementParams
  ): Promise<Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId">> {
    return this.rest
      .request<
        Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id">
      >(RESTMethods.Post, Endpoints.applicationEntitlements(applicationId), {
        json: {
          sku_id: options.skuId,
          owner_id: options.ownerId,
          owner_type: options.ownerType,
        },
      })
      .then((response) =>
        this.util.toCamelCase<
          Omit<Entitlement, "startsAt" | "endsAt" | "subscriptionId">
        >(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel */
  createThread(
    channelId: string,
    options: CreateThreadParams,
    reason?: string
  ): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Post, Endpoints.threads(channelId), {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          message: this.util.toSnakeCase(options.message),
          applied_tags: options.appliedTags,
        },
        files: options.files,
        reason,
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-from-message */
  createThreadFromMessage(
    channelId: string,
    messageId: string,
    options: CreateThreadFromMessageParams,
    reason?: string
  ): Promise<Channel> {
    return this.rest
      .request<RawChannel>(
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
      )
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#start-thread-without-message */
  createThreadWithoutMessage(
    channelId: string,
    options: CreateThreadWithoutMessageParams,
    reason?: string
  ): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Post, Endpoints.threads(channelId), {
        json: {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          type: options.type,
          invitable: options.invitable,
          rate_limit_per_user: options.rateLimitPerUser,
        },
        reason,
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#crosspost-message */
  crosspostMessage(channelId: string, messageId: string): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Post,
        Endpoints.channelMessage(channelId, messageId)
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  deleteAllMessageReactions(
    channelId: string,
    messageId: string,
    emoji?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessageAllReactions(channelId, messageId, emoji)
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
  deleteAutoModerationRule(
    guildId: string,
    autoModerationRuleId: string,
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

  /** https://discord.com/developers/docs/resources/channel#deleteclose-channel */
  deleteChannel(channelId: string, reason?: string): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Delete, Endpoints.channel(channelId), {
        reason,
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#delete-channel-permission */
  deleteChannelPermission(
    channelId: string,
    overwriteId: string,
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
    applicationId: string,
    commandId: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationCommand(applicationId, commandId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild */
  deleteGuild(guildId: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.guild(guildId));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  deleteGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    commandId: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationGuildCommand(applicationId, guildId, commandId)
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  deleteGuildEmoji(guildId: string, emojiId: string, reason?: string): void {
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
    guildId: string,
    integrationId: string,
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
  deleteGuildRole(guildId: string, roleId: string, reason?: string): void {
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
    guildId: string,
    guildScheduledEventId: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.guildScheduledEvent(guildId, guildScheduledEventId)
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
  deleteGuildSticker(
    guildId: string,
    stickerId: string,
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

  /** https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  deleteGuildTemplate(guildId: string, code: string): Promise<GuildTemplate> {
    return this.rest
      .request<RawGuildTemplate>(
        RESTMethods.Delete,
        Endpoints.guildTemplate(guildId, code)
      )
      .then((response) => this.util.toCamelCase<GuildTemplate>(response));
  }

  /** https://discord.com/developers/docs/resources/invite#delete-invite */
  deleteInvite(code: string, reason?: string): Promise<Invite> {
    return this.rest
      .request<RawInvite>(RESTMethods.Delete, Endpoints.invite(code), {
        reason,
      })
      .then((response) => this.util.toCamelCase<Invite>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
  deleteInteractionFollowupMessage(
    applicationId: string,
    interactionToken: string,
    messageId: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(applicationId, interactionToken, messageId)
    );
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
  deleteInteractionResponse(
    applicationId: string,
    interactionToken: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.webhookMessage(applicationId, interactionToken)
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-message */
  deleteMessage(channelId: string, messageId: string, reason?: string): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessage(channelId, messageId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/channel#delete-user-reaction */
  deleteMessageReaction(
    channelId: string,
    messageId: string,
    emoji: string,
    userId?: string
  ): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelMessageReaction(channelId, messageId, emoji, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance */
  deleteStageInstance(channelId: string, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.stageInstance(channelId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement */
  deleteTestEntitlement(applicationId: string, entitlementId: string): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.applicationEntitlement(applicationId, entitlementId)
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook */
  deleteWebhook(webhookId: string, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.webhook(webhookId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
  deleteWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    options?: {
      threadId?: string;
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
    webhookId: string,
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

  disconnect(): void {
    this.shards.disconnect();
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
  editAutoModerationRule(
    guildId: string,
    autoModerationRuleId: string,
    options: EditAutoModerationRuleParams,
    reason?: string
  ): Promise<AutoModerationRule> {
    return this.rest
      .request<RawAutoModerationRule>(
        RESTMethods.Patch,
        Endpoints.guildAutoModerationRule(guildId, autoModerationRuleId),
        {
          json: {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options.triggerMetadata,
            actions: options.actions?.map((action) =>
              this.util.toSnakeCase<RawAutoModerationAction>(action)
            ),
            enabled: options.enabled,
            exempt_roles: options.exemptRoles,
            exempt_channels: options.exemptChannels,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<AutoModerationRule>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  editApplicationCommandPermissions(
    applicationId: string,
    guildId: string,
    commandId: string,
    options: {
      permissions: Array<GuildApplicationCommandPermissions>;
    }
  ): Promise<GuildApplicationCommandPermissions> {
    return this.rest
      .request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Put,
        Endpoints.applicationCommandPermissions(
          applicationId,
          guildId,
          commandId
        ),
        {
          json: {
            permissions: options.permissions.map((permission) =>
              this.util.toSnakeCase<RawGuildApplicationCommandPermissions>(
                permission
              )
            ),
          },
        }
      )
      .then((response) =>
        this.util.toCamelCase<GuildApplicationCommandPermissions>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#modify-channel */
  editChannel(
    channelId: string,
    options: EditChannelParams,
    reason?: string
  ): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Patch, Endpoints.channel(channelId), {
        json: {
          name: options.name,
          type: options.type,
          position: options.position,
          topic: options.topic,
          nsfw: options.nsfw,
          rate_limit_per_user: options.rateLimitPerUser,
          bitrate: options.bitrate,
          permission_overwrites: options.permissionOverwrites,
          parent_id: options.parentId,
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
      })
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
  editChannelPermissions(
    channelId: string,
    overwriteId: string,
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
    guildId: string,
    options: EditGuildChannelPositionsParams
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
  editCurrentUser(options: EditCurrentUserParams): Promise<User> {
    return this.rest
      .request<RawUser>(RESTMethods.Patch, Endpoints.user(), {
        json: {
          username: options.username,
          avatar: options.avatar,
        },
      })
      .then((response) => this.util.toCamelCase<User>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-member */
  editCurrentGuildMember(
    guildId: string,
    options: EditCurrentGuildMemberParams,
    reason?: string
  ): Promise<GuildMember> {
    return this.rest
      .request<RawGuildMember>(
        RESTMethods.Patch,
        Endpoints.guildMember(guildId),
        {
          json: {
            nick: options.nick,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<GuildMember>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state */
  editCurrentUserVoiceState(
    guildId: string,
    options: EditCurrentUserVoiceStateParams
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
  editCurrentApplication(
    options: EditCurrentApplicationParams
  ): Promise<Application> {
    return this.rest
      .request<RawApplication>(
        RESTMethods.Patch,
        Endpoints.applicationCurrentUser(),
        {
          json: {
            custom_install_url: options.customInstallUrl,
            description: options.description,
            role_connections_verification_url:
              options.roleConnectionsVerificationUrl,
            install_params: options.installParams,
            flags: options.flags,
            icon: options.icon,
            cover_image: options.coverImage,
            interactions_endpoint_url: options.interactionsEndpointUrl,
            tags: options.tags,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Application>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  editGlobalApplicationCommand(
    applicationId: string,
    commandId: string,
    options: EditGlobalApplicationCommandParams
  ): Promise<ApplicationCommand> {
    return this.rest
      .request<RawApplicationCommand>(
        RESTMethods.Patch,
        Endpoints.applicationCommand(applicationId, commandId),
        {
          json: {
            name: options.name,
            name_localizations: options.nameLocalizations,
            description: options.description,
            description_localizations: options.descriptionLocalizations,
            options: options.options?.map((option) =>
              this.util.toSnakeCase<RawApplicationCommandOption>(option)
            ),
            default_member_permissions: options.defaultMemberPermissions,
            dm_permission: options.dmPermission,
            default_permission: options.defaultPermission,
            nsfw: options.nsfw,
          },
        }
      )
      .then((response) => this.util.toCamelCase<ApplicationCommand>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild */
  editGuild(
    guildId: string,
    options: EditGuildParams,
    reason?: string
  ): Promise<Guild> {
    return this.rest
      .request<RawGuild>(RESTMethods.Patch, Endpoints.guild(guildId), {
        json: {
          name: options.name,
          region: options.region,
          verification_level: options.verificationLevel,
          default_message_notifications: options.defaultMessageNotifications,
          explicit_content_filter: options.explicitContentFilter,
          afk_channel_id: options.afkChannelId,
          afk_timeout: options.afkTimeout,
          icon: options.icon,
          owner_id: options.ownerId,
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
      })
      .then((response) => this.util.toCamelCase<Guild>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  editGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    commandId: string,
    options: EditGuildApplicationCommandParams
  ): Promise<ApplicationCommand> {
    return this.rest
      .request<RawApplicationCommand>(
        RESTMethods.Patch,
        Endpoints.applicationGuildCommand(applicationId, guildId, commandId),
        {
          json: {
            name: options.name,
            name_localizations: options.nameLocalizations,
            description: options.description,
            description_localizations: options.descriptionLocalizations,
            options: options.options?.map((option) =>
              this.util.toSnakeCase<RawApplicationCommandOption>(option)
            ),
            default_member_permissions: options.defaultMemberPermissions,
            default_permission: options.defaultPermission,
            nsfw: options.nsfw,
          },
        }
      )
      .then((response) => this.util.toCamelCase<ApplicationCommand>(response));
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  editGuildEmoji(
    guildId: string,
    emojiId: string,
    options: EditGuildEmojiParams,
    reason?: string
  ): Promise<Emoji> {
    return this.rest
      .request<RawEmoji>(
        RESTMethods.Patch,
        Endpoints.guildEmoji(guildId, emojiId),
        {
          json: {
            name: options.name,
            roles: options.roles,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<Emoji>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  editGuildMember(
    guildId: string,
    userId: string,
    options: EditGuildMemberParams,
    reason?: string
  ): Promise<GuildMember> {
    return this.rest
      .request<RawGuildMember>(
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
      )
      .then((response) => this.util.toCamelCase<GuildMember>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level */
  editGuildMFALevel(
    guildId: string,
    options: EditGuildMFALevelParams,
    reason?: string
  ): Promise<MFALevel> {
    return this.rest.request<MFALevel>(
      RESTMethods.Post,
      Endpoints.guildMFA(guildId),
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
    guildId: string,
    options: EditGuildOnboardingParams,
    reason?: string
  ): void {
    this.rest.request(RESTMethods.Patch, Endpoints.guildOnboarding(guildId), {
      json: {
        prompts: options.prompts.map((prompt) =>
          this.util.toSnakeCase<RawOnboardingPrompt>(prompt)
        ),
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role */
  editGuildRole(
    guildId: string,
    roleId: string,
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
    return this.rest
      .request<RawRole>(
        RESTMethods.Patch,
        Endpoints.guildRole(guildId, roleId),
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
      )
      .then((response) => this.util.toCamelCase<Role>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
  editGuildRolePositions(
    guildId: string,
    options: EditGuildRolePositionsParams
  ): Promise<Array<Role>> {
    return this.rest
      .request<Array<RawRole>>(
        RESTMethods.Patch,
        Endpoints.guildRoles(guildId),
        {
          json: options.map((role) => this.util.toSnakeCase(role)),
        }
      )
      .then((response) =>
        response.map((role) => this.util.toCamelCase<Role>(role))
      );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
  editGuildScheduledEvent(
    guildId: string,
    guildScheduledEventId: string,
    options: EditGuildScheduledEventParams,
    reason?: string
  ): Promise<GuildScheduledEvent> {
    return this.rest
      .request<RawGuildScheduledEvent>(
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
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<GuildScheduledEvent>(response));
  }

  /** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
  editGuildSticker(
    guildId: string,
    stickerId: string,
    options: EditGuildStickerParams,
    reason?: string
  ): Promise<Sticker> {
    return this.rest
      .request<RawSticker>(
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
      )
      .then((response) => this.util.toCamelCase<Sticker>(response));
  }

  /** https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  editGuildTemplate(
    guildId: string,
    code: string,
    options: EditGuildTemplateParams
  ): Promise<GuildTemplate> {
    return this.rest
      .request<RawGuildTemplate>(
        RESTMethods.Patch,
        Endpoints.guildTemplate(guildId, code),
        {
          json: {
            name: options.name,
            description: options.description,
          },
        }
      )
      .then((response) => this.util.toCamelCase<GuildTemplate>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
  editGuildWelcomeScreen(
    guildId: string,
    options: EditGuildWelcomeScreenParams,
    reason?: string
  ): Promise<WelcomeScreen> {
    return this.rest
      .request<RawWelcomeScreen>(
        RESTMethods.Patch,
        Endpoints.guildWelcomeScreen(guildId),
        {
          json: {
            enabled: options.enabled,
            welcome_channels: options.welcomeChannels,
            description: options.description,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<WelcomeScreen>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-widget */
  editGuildWidget(
    guildId: string,
    options: {
      enabled?: boolean;
      channelId?: boolean;
    },
    reason?: string
  ): Promise<GuildWidgetSettings> {
    return this.rest
      .request<RawGuildWidgetSettings>(
        RESTMethods.Patch,
        Endpoints.guildWidgetSettings(guildId),
        {
          json: {
            enabled: options.enabled,
            channel_id: options.channelId,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<GuildWidgetSettings>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message */
  editMessage(
    channelId: string,
    messageId: string,
    options: EditMessageParams
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Patch,
        Endpoints.channelMessage(channelId, messageId),
        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? options.embeds.map((e) =>
                      this.util.toSnakeCase<RawEmbed>(e)
                    )
                  : null
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? options.allowedMentions !== null
                  ? this.util.toSnakeCase<RawAllowedMentions>(
                      options.allowedMentions
                    )
                  : null
                : undefined,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? options.components.map((c) =>
                      this.util.toSnakeCase<RawActionRow>(c)
                    )
                  : null
                : undefined,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
          },
          files: options.files,
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance */
  editStageInstance(
    channelId: string,
    options: EditStageInstanceParams,
    reason?: string
  ): Promise<StageInstance> {
    return this.rest
      .request<RawStageInstance>(
        RESTMethods.Patch,
        Endpoints.stageInstance(channelId),
        {
          json: {
            topic: options.topic,
            privacy_level: options.privacyLevel,
          },
          reason,
        }
      )
      .then((response) => this.util.toCamelCase<StageInstance>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
  editInteractionFollowupMessage(
    applicationId: string,
    interactionToken: string,
    messageId: string,
    options: EditWebhookMessageParams & { threadId: string }
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Post,
        Endpoints.webhookMessage(applicationId, interactionToken, messageId),
        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? options.embeds.map((e) =>
                      this.util.toSnakeCase<RawEmbed>(e)
                    )
                  : null
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? options.allowedMentions !== null
                  ? this.util.toSnakeCase<RawAllowedMentions>(
                      options.allowedMentions
                    )
                  : null
                : undefined,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? options.components.map((c) =>
                      this.util.toSnakeCase<RawActionRow>(c)
                    )
                  : null
                : undefined,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
          },
          files: options.files,
          query: {
            thread_id: options.threadId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
  editInteractionResponse(
    applicationId: string,
    interactionToken: string,
    options: EditWebhookMessageParams & { threadId: string }
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Patch,
        Endpoints.webhookMessage(applicationId, interactionToken),
        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? options.embeds.map((e) =>
                      this.util.toSnakeCase<RawEmbed>(e)
                    )
                  : null
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? options.allowedMentions !== null
                  ? this.util.toSnakeCase<RawAllowedMentions>(
                      options.allowedMentions
                    )
                  : null
                : undefined,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? options.components.map((c) =>
                      this.util.toSnakeCase<RawActionRow>(c)
                    )
                  : null
                : undefined,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
          },
          files: options.files,
          query: {
            thread_id: options.threadId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-user-voice-state */
  editUserVoiceState(
    guildId: string,
    userId: string,
    options: {
      channelId?: string;
      suppress?: boolean;
      requestToSpeakTimestamp?: string | null;
    }
  ): void {
    this.rest.request(
      RESTMethods.Patch,
      Endpoints.guildVoiceState(guildId, userId),
      {
        json: {
          channel_id: options.channelId,
          suppress: options.suppress,
          requestToSpeakTimestamp: options.requestToSpeakTimestamp,
        },
      }
    );
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook */
  editWebhook(
    webhookId: string,
    options: EditWebhookParams,
    reason?: string
  ): Promise<Webhook> {
    return this.rest
      .request<RawWebhook>(RESTMethods.Patch, Endpoints.webhook(webhookId), {
        json: {
          name: options.name,
          avatar: options.avatar,
          channel_id: options.channelId,
        },
        reason,
      })
      .then((response) => this.util.toCamelCase<Webhook>(response));
  }

  /** https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
  editWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    options: EditWebhookMessageParams & { threadId: string }
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Patch,
        Endpoints.webhookMessage(webhookId, webhookToken, messageId),
        {
          json: {
            content: options.content,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? options.embeds.map((e) =>
                      this.util.toSnakeCase<RawEmbed>(e)
                    )
                  : null
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? options.allowedMentions !== null
                  ? this.util.toSnakeCase<RawAllowedMentions>(
                      options.allowedMentions
                    )
                  : null
                : undefined,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? options.components.map((c) =>
                      this.util.toSnakeCase<RawActionRow>(c)
                    )
                  : null
                : undefined,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
          },
          files: options.files,
          query: {
            thread_id: options.threadId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  editWebhookWithToken(
    webhookId: string,
    webhookToken: string,
    options: Omit<EditWebhookParams, "channelId">,
    reason?: string
  ): Promise<Webhook> {
    return this.rest
      .request<RawWebhook>(
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
      )
      .then((response) => this.util.toCamelCase<Webhook>(response));
  }

  /** https://discord.com/developers/docs/resources/webhook#execute-webhook */
  executeWebhook(
    webhookId: string,
    webhookToken: string,
    options: ExecuteWebhookParams & { wait: boolean; threadId: string }
  ): Promise<Message | null> {
    return this.rest
      .request<RawMessage | null>(
        RESTMethods.Post,
        Endpoints.webhook(webhookId, webhookToken),
        {
          json: {
            content: options.content,
            username: options.username,
            avatarUrl: options.avatarUrl,
            tts: options.tts,
            embeds:
              options.embeds !== undefined
                ? options.embeds !== null
                  ? options.embeds.map((e) =>
                      this.util.toSnakeCase<RawEmbed>(e)
                    )
                  : null
                : undefined,
            allowed_mentions:
              options.allowedMentions !== undefined
                ? options.allowedMentions !== null
                  ? this.util.toSnakeCase<RawAllowedMentions>(
                      options.allowedMentions
                    )
                  : null
                : undefined,
            components:
              options.components !== undefined
                ? options.components !== null
                  ? options.components.map((c) =>
                      this.util.toSnakeCase<RawActionRow>(c)
                    )
                  : null
                : undefined,
            attachments: options.attachments?.map((attachment) =>
              this.util.toSnakeCase<RawAttachment>(attachment)
            ),
            flags: options.flags,
            thread_name: options.threadName,
          },
          files: options.files,
          query: {
            wait: options.wait,
            thread_id: options.threadId,
          },
        }
      )
      .then((response) =>
        response !== null ? this.util.toCamelCase<Message>(response) : null
      );
  }

  /**
   * https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook
   *
   * https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook
   */
  executeWebhookPlatform(
    webhookId: string,
    webhookToken: string,
    platform: "github" | "slack",
    options: Record<string, unknown> & {
      threadId?: string;
      wait?: boolean;
    }
  ): Promise<Message | null> {
    return this.rest
      .request<RawMessage | null>(
        RESTMethods.Post,
        Endpoints.webhookPlatform(webhookId, webhookToken, platform),
        {
          query: {
            thread_id: options.threadId,
            wait: options.wait,
          },
          json: options,
        }
      )
      .then((response) =>
        response !== null ? this.util.toCamelCase<Message>(response) : null
      );
  }

  expirePoll(channelId: string, messageId: string): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Post,
        Endpoints.pollExpire(channelId, messageId)
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#follow-announcement-channel */
  followChannel(
    channelId: string,
    options: {
      webhookChannelId: string;
    }
  ): Promise<FollowedChannel> {
    return this.rest
      .request<RawFollowedChannel>(
        RESTMethods.Post,
        Endpoints.channelFollowers(channelId),
        {
          json: {
            webhook_channel_id: options.webhookChannelId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<FollowedChannel>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#list-active-guild-threads */
  getActiveGuildThreads(guildId: string): Promise<{
    threads: Array<Channel>;
    members: Array<ThreadMember>;
  }> {
    return this.rest
      .request<
        Array<{
          threads: Array<RawChannel>;
          members: Array<RawThreadMember>;
        }>
      >(RESTMethods.Get, Endpoints.guildActiveThreads(guildId))
      .then((response) =>
        this.util.toCamelCase<{
          threads: Array<Channel>;
          members: Array<ThreadMember>;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads */
  getArchivedThreads(
    channelId: string,
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
    return this.rest
      .request<{
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
      )
      .then((response) =>
        this.util.toCamelCase<{
          threads: Array<Channel>;
          members: Array<ThreadMember>;
          hasMore: boolean;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
  getAuditLog(
    guildId: string,
    options?: {
      userId?: string;
      actionType?: ActionTypes;
      before?: string;
      after?: string;
      limit?: number;
    }
  ): Promise<AuditLog> {
    return this.rest
      .request<RawAuditLog>(RESTMethods.Get, Endpoints.guildAuditLog(guildId), {
        query: {
          user_id: options?.userId,
          action_type: options?.actionType,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
        },
      })
      .then((response) => this.util.toCamelCase<AuditLog>(response));
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule */
  getAutoModerationRule(
    guildId: string,
    ruleId: string
  ): Promise<AutoModerationRule> {
    return this.rest
      .request<RawAutoModerationRule>(
        RESTMethods.Get,
        Endpoints.guildAutoModerationRule(guildId, ruleId)
      )
      .then((response) => this.util.toCamelCase<AutoModerationRule>(response));
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild */
  getAutoModerationRules(guildId: string): Promise<Array<AutoModerationRule>> {
    return this.rest
      .request<Array<RawAutoModerationRule>>(
        RESTMethods.Get,
        Endpoints.guildAutoModerationRules(guildId)
      )
      .then((response) =>
        response.map((autoModerationRule) =>
          this.util.toCamelCase<AutoModerationRule>(autoModerationRule)
        )
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  getApplicationCommandPermissions(
    applicationId: string,
    guildId: string,
    commandId: string
  ): Promise<GuildApplicationCommandPermissions> {
    return this.rest
      .request<Array<RawGuildApplicationCommandPermissions>>(
        RESTMethods.Get,
        Endpoints.applicationCommandPermissions(
          applicationId,
          guildId,
          commandId
        )
      )
      .then((response) =>
        this.util.toCamelCase<GuildApplicationCommandPermissions>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records */
  getApplicationRoleConnectionMetadataRecords(
    applicationId: string
  ): Promise<Array<ApplicationRoleConnectionMetadata>> {
    return this.rest
      .request<Array<RawApplicationRoleConnectionMetadata>>(
        RESTMethods.Get,
        Endpoints.applicationRoleConnectionMetadata(applicationId)
      )
      .then((response) =>
        response.map((applicationRoleConnectionMetadata) =>
          this.util.toCamelCase<ApplicationRoleConnectionMetadata>(
            applicationRoleConnectionMetadata
          )
        )
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel */
  getChannel(channelId: string): Promise<Channel> {
    return this.rest
      .request<RawChannel>(RESTMethods.Get, Endpoints.channel(channelId))
      .then((response) => this.util.toCamelCase<Channel>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-channels */
  getChannels(guildId: string): Promise<Array<Channel>> {
    return this.rest
      .request<Array<RawChannel>>(
        RESTMethods.Get,
        Endpoints.guildChannels(guildId)
      )
      .then((response) =>
        response.map((channel) => this.util.toCamelCase<Channel>(channel))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-invites */
  getChannelInvites(channelId: string): Promise<Array<Invite>> {
    return this.rest
      .request<Array<RawInvite>>(
        RESTMethods.Get,
        Endpoints.channelInvites(channelId)
      )
      .then((response) =>
        response.map((invite) => this.util.toCamelCase<Invite>(invite))
      );
  }

  /** https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
  getChannelWebhooks(channelId: string): Promise<Array<Webhook>> {
    return this.rest
      .request<Array<RawWebhook>>(
        RESTMethods.Get,
        Endpoints.channelWebhooks(channelId)
      )
      .then((response) =>
        response.map((webhook) => this.util.toCamelCase<Webhook>(webhook))
      );
  }

  /** https://discord.com/developers/docs/resources/application#get-current-application */
  getCurrentApplication(): Promise<Application> {
    return this.rest
      .request<RawApplication>(
        RESTMethods.Get,
        Endpoints.applicationCurrentUser()
      )
      .then((response) => this.util.toCamelCase<Application>(response));
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-application-role-connection */
  getCurrentApplicationRoleConnection(
    applicationId: string
  ): Promise<ApplicationRoleConnection> {
    return this.rest
      .request<RawApplicationRoleConnection>(
        RESTMethods.Get,
        Endpoints.userApplicationRoleConnection(applicationId)
      )
      .then((response) =>
        this.util.toCamelCase<ApplicationRoleConnection>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guild-member */
  getCurrentGuildMember(guildId: string): Promise<GuildMember> {
    return this.rest
      .request<RawGuildMember>(RESTMethods.Get, Endpoints.guildMember(guildId))
      .then((response) => this.util.toCamelCase<GuildMember>(response));
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-connections */
  getCurrentUserConnections(): Promise<Array<Connection>> {
    return this.rest
      .request<Array<RawConnection>>(
        RESTMethods.Get,
        Endpoints.userConnections()
      )
      .then((response) =>
        response.map((connection) =>
          this.util.toCamelCase<Connection>(connection)
        )
      );
  }

  /** https://discord.com/developers/docs/monetization/entitlements#list-entitlements */
  getEntitlements(
    applicationId: string,
    options?: {
      userId?: string;
      skuIds?: Array<string>;
      before?: string;
      after?: string;
      limit?: number;
      guildId?: string;
      excludeEnded?: boolean;
    }
  ): Promise<Array<Entitlement>> {
    return this.rest
      .request<Array<RawEntitlement>>(
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
          },
        }
      )
      .then((response) =>
        response.map((entitlement) =>
          this.util.toCamelCase<Entitlement>(entitlement)
        )
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
  getGatewayBot(): Promise<{
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
      .request<{
        url: string;
        shards: number;
        session_start_limit: {
          total: number;
          remaining: number;
          reset_after: number;
          max_concurrency: number;
        };
      }>(RESTMethods.Get, Endpoints.gatewayBot())
      .then((response) => this.util.toCamelCase(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-command */
  getGlobalApplicationCommand(
    applicationId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    return this.rest
      .request<RawApplicationCommand>(
        RESTMethods.Get,
        Endpoints.applicationCommand(applicationId, commandId)
      )
      .then((response) => this.util.toCamelCase<ApplicationCommand>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  getGlobalApplicationCommands(
    applicationId: string,
    options: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.rest
      .request<Array<RawApplicationCommand>>(
        RESTMethods.Get,
        Endpoints.applicationCommands(applicationId),
        {
          query: {
            with_localizations: options.withLocalizations,
          },
        }
      )
      .then((response) =>
        response.map((applicationCommand) =>
          this.util.toCamelCase<ApplicationCommand>(applicationCommand)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild */
  getGuild(
    guildId: string,
    options?: {
      withCounts?: boolean;
    }
  ): Promise<Guild> {
    return this.rest
      .request<RawGuild>(RESTMethods.Get, Endpoints.guild(guildId), {
        query: {
          with_counts: options?.withCounts,
        },
      })
      .then((response) => this.util.toCamelCase<Guild>(response));
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
  getGuilds(options?: {
    before?: string;
    after?: string;
    limit?: number;
    withCounts?: boolean;
  }): Promise<Array<Guild>> {
    return this.rest
      .request<Array<RawGuild>>(RESTMethods.Get, Endpoints.userGuilds(), {
        query: {
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          with_counts: options?.withCounts,
        },
      })
      .then((response) =>
        response.map((guild) => this.util.toCamelCase<Guild>(guild))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  getGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    return this.rest
      .request<RawApplicationCommand>(
        RESTMethods.Get,
        Endpoints.applicationGuildCommand(applicationId, guildId, commandId)
      )
      .then((response) => this.util.toCamelCase<ApplicationCommand>(response));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
  getGuildApplicationCommands(
    applicationId: string,
    guildId: string,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.rest
      .request<Array<RawApplicationCommand>>(
        RESTMethods.Get,
        Endpoints.applicationGuildCommands(applicationId, guildId),
        {
          query: {
            with_localizations: options?.withLocalizations,
          },
        }
      )
      .then((response) =>
        response.map((applicationCommand) =>
          this.util.toCamelCase<ApplicationCommand>(applicationCommand)
        )
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  getGuildApplicationCommandPermissions(
    applicationId: string,
    guildId: string
  ): Promise<GuildApplicationCommandPermissions> {
    return this.rest
      .request<RawGuildApplicationCommandPermissions>(
        RESTMethods.Get,
        Endpoints.guildApplicationCommandsPermissions(applicationId, guildId)
      )
      .then((response) =>
        this.util.toCamelCase<GuildApplicationCommandPermissions>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-ban */
  getGuildBan(guildId: string, userId: string): Promise<Ban> {
    return this.rest
      .request<RawBan>(RESTMethods.Get, Endpoints.guildBan(guildId, userId))
      .then((response) => this.util.toCamelCase<Ban>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-bans */
  getGuildBans(
    guildId: string,
    options?: {
      limit?: number;
      before?: string;
      after?: string;
    }
  ): Promise<Array<Ban>> {
    return this.rest
      .request<Array<RawBan>>(RESTMethods.Get, Endpoints.guildBans(guildId), {
        query: {
          limit: options?.limit,
          before: options?.before,
          after: options?.after,
        },
      })
      .then((response) =>
        response.map((ban) => this.util.toCamelCase<Ban>(ban))
      );
  }

  /** https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
  getGuildEmoji(guildId: string, emojiId: string): Promise<Emoji> {
    return this.rest
      .request<RawEmoji>(
        RESTMethods.Get,
        Endpoints.guildEmoji(guildId, emojiId)
      )
      .then((response) => this.util.toCamelCase<Emoji>(response));
  }

  /** https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
  getGuildEmojis(guildId: string): Promise<Array<Emoji>> {
    return this.rest
      .request<Array<RawEmoji>>(RESTMethods.Get, Endpoints.guildEmojis(guildId))
      .then((response) =>
        response.map((emoji) => this.util.toCamelCase<Emoji>(emoji))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-integrations */
  getGuildIntegrations(guildId: string): Promise<Array<Integration>> {
    return this.rest
      .request<Array<RawIntegration>>(
        RESTMethods.Get,
        Endpoints.guildIntegrations(guildId)
      )
      .then((response) =>
        response.map((integration) =>
          this.util.toCamelCase<Integration>(integration)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-invites */
  getGuildInvites(guildId: string): Promise<Array<Invite>> {
    return this.rest
      .request<Array<RawInvite>>(
        RESTMethods.Get,
        Endpoints.guildInvites(guildId)
      )
      .then((response) =>
        response.map((invite) => this.util.toCamelCase<Invite>(invite))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-member */
  getGuildMember(guildId: string, userId: string): Promise<GuildMember> {
    return this.rest
      .request<RawGuildMember>(
        RESTMethods.Get,
        Endpoints.guildMember(guildId, userId)
      )
      .then((response) => this.util.toCamelCase<GuildMember>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#list-guild-members */
  getGuildMembers(guildId: string): Promise<Array<GuildMember>> {
    return this.rest
      .request<Array<RawGuildMember>>(
        RESTMethods.Get,
        Endpoints.guildMembers(guildId)
      )
      .then((response) =>
        response.map((guildMember) =>
          this.util.toCamelCase<GuildMember>(guildMember)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-onboarding */
  getGuildOnboarding(guildId: string): Promise<GuildOnboarding> {
    return this.rest
      .request<RawGuildOnboarding>(
        RESTMethods.Get,
        Endpoints.guildOnboarding(guildId)
      )
      .then((response) => this.util.toCamelCase<GuildOnboarding>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-preview */
  getGuildPreview(guildId: string): Promise<GuildPreview> {
    return this.rest
      .request<RawGuildPreview>(
        RESTMethods.Get,
        Endpoints.guildPreview(guildId)
      )
      .then((response) => this.util.toCamelCase<GuildPreview>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
  getGuildPruneCount(
    guildId: string,
    options: {
      days: number;
      includeRoles: string | Array<string>;
    }
  ): Promise<{ pruned: number }> {
    return this.rest
      .request<{ pruned: number }>(
        RESTMethods.Get,
        Endpoints.guildPrune(guildId),
        {
          query: {
            days: options.days,
            include_roles: options.includeRoles,
          },
        }
      )
      .then((response) => this.util.toCamelCase<{ pruned: number }>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-roles */
  getGuildRoles(guildId: string): Promise<Array<Role>> {
    return this.rest
      .request<Array<RawRole>>(RESTMethods.Get, Endpoints.guildRoles(guildId))
      .then((response) =>
        response.map((role) => this.util.toCamelCase<Role>(role))
      );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild */
  getGuildScheduledEvents(
    guildId: string,
    options?: {
      withUserCount?: boolean;
    }
  ): Promise<Array<GuildScheduledEvent>> {
    return this.rest
      .request<Array<RawGuildScheduledEvent>>(
        RESTMethods.Get,
        Endpoints.guildScheduledEvents(guildId),
        {
          query: {
            with_user_count: options?.withUserCount,
          },
        }
      )
      .then((response) =>
        response.map((guildScheduledEvent) =>
          this.util.toCamelCase<GuildScheduledEvent>(guildScheduledEvent)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
  getGuildScheduledEventUsers(
    guildId: string,
    guildScheduledEventId: string,
    options?: {
      limit?: number;
      withMember?: boolean;
      before?: string;
      after?: string;
    }
  ): Promise<Array<GuildScheduledEventUser>> {
    return this.rest
      .request<Array<RawGuildScheduledEventUser>>(
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
      )
      .then((response) =>
        response.map((guildScheduledEventUser) =>
          this.util.toCamelCase<GuildScheduledEventUser>(
            guildScheduledEventUser
          )
        )
      );
  }

  /** https://discord.com/developers/docs/resources/sticker#get-guild-sticker */
  getGuildSticker(guildId: string, stickerId: string): Promise<Sticker> {
    return this.rest
      .request<RawSticker>(
        RESTMethods.Get,
        Endpoints.guildSticker(guildId, stickerId)
      )
      .then((response) => this.util.toCamelCase<Sticker>(response));
  }

  /** https://discord.com/developers/docs/resources/sticker#list-guild-stickers */
  getGuildStickers(guildId: string): Promise<Array<Sticker>> {
    return this.rest
      .request<Array<RawSticker>>(
        RESTMethods.Get,
        Endpoints.guildStickers(guildId)
      )
      .then((response) =>
        response.map((sticker) => this.util.toCamelCase<Sticker>(sticker))
      );
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-template */
  getGuildTemplate(guildId: string, code: string): Promise<GuildTemplate> {
    return this.rest
      .request<RawGuildTemplate>(
        RESTMethods.Get,
        Endpoints.guildTemplate(guildId, code)
      )
      .then((response) => this.util.toCamelCase<GuildTemplate>(response));
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-templates */
  getGuildTemplates(guildId: string): Promise<Array<GuildTemplate>> {
    return this.rest
      .request<Array<RawGuildTemplate>>(
        RESTMethods.Get,
        Endpoints.guildTemplates(guildId)
      )
      .then((response) =>
        response.map((guildTemplate) =>
          this.util.toCamelCase<GuildTemplate>(guildTemplate)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
  getGuildVanityUrl(guildId: string): Promise<{
    code: string;
    uses: number;
  }> {
    return this.rest.request<{
      code: string;
      uses: number;
    }>(RESTMethods.Get, Endpoints.guildVanityUrl(guildId));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
  getGuildVoiceRegions(guildId: string): Promise<Array<VoiceRegion>> {
    return this.rest
      .request<Array<RawVoiceRegion>>(
        RESTMethods.Get,
        Endpoints.guildVoiceRegions(guildId)
      )
      .then((response) =>
        response.map((VoiceRegion) =>
          this.util.toCamelCase<VoiceRegion>(VoiceRegion)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen */
  getGuildWelcomeScreen(guildId: string): Promise<WelcomeScreen> {
    return this.rest
      .request<RawWelcomeScreen>(
        RESTMethods.Get,
        Endpoints.guildWelcomeScreen(guildId)
      )
      .then((response) => this.util.toCamelCase<WelcomeScreen>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget */
  getGuildWidget(guildId: string): Promise<GuildWidget> {
    return this.rest
      .request<RawGuildWidget>(
        RESTMethods.Get,
        Endpoints.guildWidgetJSON(guildId)
      )
      .then((response) => this.util.toCamelCase<GuildWidget>(response));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-image */
  getGuildWidgetImage(
    guildId: string,
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
  getGuildWidgetSettings(guildId: string): Promise<GuildWidgetSettings> {
    return this.rest
      .request<RawGuildWidgetSettings>(
        RESTMethods.Get,
        Endpoints.guildWidgetSettings(guildId)
      )
      .then((response) => this.util.toCamelCase<GuildWidgetSettings>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
  getInteractionFollowupMessage(
    applicationId: string,
    interactionToken: string,
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Get,
        Endpoints.webhookMessage(applicationId, interactionToken, messageId),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
  getInteractionResponse(
    applicationId: string,
    interactionToken: string,
    options?: { threadId?: string }
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Get,
        Endpoints.webhookMessage(applicationId, interactionToken),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/invite#get-invite */
  getInvite(
    code: string,
    options?: {
      withCounts?: boolean;
      withExpiration?: boolean;
      guildScheduledEventId?: string;
    }
  ): Promise<Invite> {
    return this.rest
      .request<RawInvite>(RESTMethods.Get, Endpoints.invite(code), {
        query: {
          with_counts: options?.withCounts,
          with_expiration: options?.withExpiration,
          guild_scheduled_event_id: options?.guildScheduledEventId,
        },
      })
      .then((response) => this.util.toCamelCase<Invite>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads */
  getJoinedPrivateArchivedThreads(
    channelId: string,
    options?: {
      before?: string;
      limit?: number;
    }
  ): Promise<{
    threads: Array<Channel>;
    members: Array<ThreadMember>;
    hasMore: boolean;
  }> {
    return this.rest
      .request<{
        threads: Array<RawChannel>;
        members: Array<RawThreadMember>;
        has_more: boolean;
      }>(
        RESTMethods.Get,
        Endpoints.channelThreads(channelId, "private", true),
        {
          query: {
            before: options?.before,
            limit: options?.limit,
          },
        }
      )
      .then((response) =>
        this.util.toCamelCase<{
          threads: Array<Channel>;
          members: Array<ThreadMember>;
          hasMore: boolean;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-message */
  getMessage(channelId: string, messageId: string): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Get,
        Endpoints.channelMessage(channelId, messageId)
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#get-reactions */
  getMessageReactions(
    channelId: string,
    messageId: string,
    emoji: string,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<Array<User>> {
    return this.rest
      .request<Array<RawUser>>(
        RESTMethods.Get,
        Endpoints.channelMessageAllReactions(channelId, messageId, emoji),
        {
          query: {
            after: options?.after,
            limit: options?.limit,
          },
        }
      )
      .then((response) =>
        response.map((user) => this.util.toCamelCase<User>(user))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-messages */
  getMessages(
    channelId: string,
    options: {
      around?: string;
      before?: string;
      after?: string;
      limit?: number;
    }
  ): Promise<Array<Message>> {
    return this.rest
      .request<Array<RawMessage>>(
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
      )
      .then((response) =>
        response.map((message) => this.util.toCamelCase<Message>(message))
      );
  }

  /** https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information */
  getOAuth2Application(): Promise<Application> {
    return this.rest
      .request<RawApplication>(
        RESTMethods.Get,
        Endpoints.oauth2CurrentApplication()
      )
      .then((response) => this.util.toCamelCase<Application>(response));
  }

  /** https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information */
  getOAuth2Authorization(): Promise<{
    application: Application;
    scopes: Array<OAuth2Scopes>;
    expires: string;
    user?: User;
  }> {
    return this.rest
      .request<{
        application: RawApplication;
        scopes: Array<OAuth2Scopes>;
        expires: string;
        user?: RawUser;
      }>(RESTMethods.Get, Endpoints.oauth2Authorization())
      .then((response) =>
        this.util.toCamelCase<{
          application: Application;
          scopes: Array<OAuth2Scopes>;
          expires: string;
          user?: User;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-pinned-messages */
  getPinnedMessages(channelId: string): Promise<Array<Message>> {
    return this.rest
      .request<Array<RawMessage>>(
        RESTMethods.Get,
        Endpoints.channelPins(channelId)
      )
      .then((response) =>
        response.map((message) => this.util.toCamelCase<Message>(message))
      );
  }

  getPollAnswerVoters(
    channelId: string,
    messageId: string,
    answerId: string,
    options?: {
      after?: string;
      limit?: number;
    }
  ): Promise<{
    users: Array<User>;
  }> {
    return this.rest
      .request<{
        users: Array<User>;
      }>(
        RESTMethods.Get,
        Endpoints.pollAnswerVoters(channelId, messageId, answerId),
        {
          query: {
            after: options?.after,
            limit: options?.limit,
          },
        }
      )
      .then((response) =>
        this.util.toCamelCase<{
          users: Array<User>;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/monetization/skus#list-skus */
  getSkus(applicationId: string): Promise<Array<Sku>> {
    return this.rest
      .request<Array<RawSku>>(
        RESTMethods.Get,
        Endpoints.applicationSkus(applicationId)
      )
      .then((response) =>
        response.map((sku) => this.util.toCamelCase<Sku>(sku))
      );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#get-stage-instance */
  getStageInstance(channelId: string): Promise<StageInstance> {
    return this.rest
      .request<RawStageInstance>(
        RESTMethods.Get,
        Endpoints.stageInstance(channelId)
      )
      .then((response) => this.util.toCamelCase<StageInstance>(response));
  }

  /** https://discord.com/developers/docs/resources/sticker#list-sticker-packs */
  getStickerPacks(): Promise<{
    stickerPacks: Array<StickerPack>;
  }> {
    return this.rest
      .request<{
        sticker_packs: Array<RawStickerPack>;
      }>(RESTMethods.Get, Endpoints.stickerPacks())
      .then((response) =>
        this.util.toCamelCase<{
          stickerPacks: Array<StickerPack>;
        }>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#get-thread-member */
  getThreadMember(
    channelId: string,
    userId: string,
    options?: {
      withMember?: boolean;
    }
  ): Promise<ThreadMember> {
    return this.rest
      .request<RawThreadMember>(
        RESTMethods.Get,
        Endpoints.threadMembers(channelId, userId),
        {
          query: {
            with_member: options?.withMember,
          },
        }
      )
      .then((response) => this.util.toCamelCase<ThreadMember>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#list-thread-members */
  getThreadMembers(
    channelId: string,
    options?: {
      withMember?: boolean;
      after?: string;
      limit?: number;
    }
  ): Promise<Array<ThreadMember>> {
    return this.rest
      .request<Array<RawThreadMember>>(
        RESTMethods.Get,
        Endpoints.threadMembers(channelId),
        {
          query: {
            with_member: options?.withMember,
            after: options?.after,
            limit: options?.limit,
          },
        }
      )
      .then((response) =>
        response.map((threadMember) =>
          this.util.toCamelCase<ThreadMember>(threadMember)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/user#get-user */
  getUser(userId?: string): Promise<User> {
    return this.rest
      .request<RawUser>(RESTMethods.Get, Endpoints.user(userId))
      .then((response) => this.util.toCamelCase<User>(response));
  }

  /** https://discord.com/developers/docs/resources/voice#list-voice-regions */
  getVoiceRegions(): Promise<Array<VoiceRegion>> {
    return this.rest
      .request<Array<RawVoiceRegion>>(RESTMethods.Get, Endpoints.voiceRegions())
      .then((response) =>
        response.map((voiceRegion) =>
          this.util.toCamelCase<VoiceRegion>(voiceRegion)
        )
      );
  }

  /** https://discord.com/developers/docs/resources/webhook#get-webhook-message */
  getWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    options?: {
      threadId?: string;
    }
  ): Promise<Message> {
    return this.rest
      .request<RawMessage>(
        RESTMethods.Get,
        Endpoints.webhookMessage(webhookId, webhookToken, messageId),
        {
          query: {
            thread_id: options?.threadId,
          },
        }
      )
      .then((response) => this.util.toCamelCase<Message>(response));
  }

  /** https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
  getWebhooks(guildId: string): Promise<Array<Webhook>> {
    return this.rest
      .request<Array<RawWebhook>>(
        RESTMethods.Get,
        Endpoints.guildWebhooks(guildId)
      )
      .then((response) =>
        response.map((webhook) => this.util.toCamelCase<Webhook>(webhook))
      );
  }

  /** https://discord.com/developers/docs/resources/channel#join-thread */
  joinThread(channelId: string): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.threadMembers(channelId, "@me")
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  joinVoiceChannel(
    guildId: string,
    channelId: string,
    options?: {
      selfMute?: boolean;
      selfDeaf?: boolean;
    }
  ): void {
    this.shards.get(this.guildShardMap[guildId])?.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.VoiceStateUpdate,
        d: {
          guild_id: guildId,
          channel_id: channelId,
          self_mute: !!options?.selfMute,
          self_deaf: !!options?.selfDeaf,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/resources/user#leave-guild */
  leaveGuild(guildId: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.userGuild(guildId));
  }

  /** https://discord.com/developers/docs/resources/channel#leave-thread */
  leaveThread(channelId: string): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.threadMembers(channelId, "@me")
    );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-voice-state */
  leaveVoiceChannel(guildId: string): void {
    this.shards.get(this.guildShardMap[guildId])?.ws.send(
      JSON.stringify({
        op: GatewayOPCodes.VoiceStateUpdate,
        d: {
          guild_id: guildId,
          channel_id: null,
          self_mute: false,
          self_deaf: false,
        },
      })
    );
  }

  /** https://discord.com/developers/docs/resources/channel#pin-message */
  pinMessage(channelId: string, messageId: string, reason?: string): void {
    this.rest.request(
      RESTMethods.Put,
      Endpoints.channelPin(channelId, messageId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  removeBan(guildId: string, userId: string, reason?: string): void {
    this.rest.request(RESTMethods.Delete, Endpoints.guildBan(guildId, userId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
  removeGroupRecipient(channelId: string, userId: string): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.channelRecipient(channelId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member */
  removeGuildMember(guildId: string, userId: string, reason?: string): void {
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
    guildId: string,
    userId: string,
    roleId: string,
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

  /** https://discord.com/developers/docs/resources/channel#remove-thread-member */
  removeThreadMember(channelId: string, userId: string): void {
    this.rest.request(
      RESTMethods.Delete,
      Endpoints.threadMembers(channelId, userId)
    );
  }

  /** https://discord.com/developers/docs/resources/guild#search-guild-members */
  searchGuildMembers(
    guildId: string,
    options: {
      query: string;
      limit?: number;
    }
  ): Promise<Array<GuildMember>> {
    return this.rest
      .request<Array<RawGuildMember>>(
        RESTMethods.Get,
        Endpoints.guildMembersSearch(guildId),
        {
          query: {
            query: options.query,
            limit: options.limit,
          },
        }
      )
      .then((response) =>
        response.map((guildMember) =>
          this.util.toCamelCase<GuildMember>(guildMember)
        )
      );
  }

  /** https://discord.com/developers/docs/topics/gateway-events#update-presence */
  setPresence(options: {
    activity?: Pick<Activity, "name" | "type" | "url" | "state">;
    status?: StatusTypes;
    afk?: boolean;
  }): void {
    for (const [id, shard] of this.shards) shard.setPresence(options);
  }

  /** https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  syncGuildTemplate(guildId: string, code: string): Promise<GuildTemplate> {
    return this.rest
      .request<RawGuildTemplate>(
        RESTMethods.Put,
        Endpoints.guildTemplate(guildId, code)
      )
      .then((response) => this.util.toCamelCase<GuildTemplate>(response));
  }

  /** https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
  triggerTypingIndicator(channelId: string): void {
    this.rest.request(RESTMethods.Post, Endpoints.channelTyping(channelId));
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records */
  updateApplicationRoleConnectionMetadataRecords(
    applicationId: string
  ): Promise<Array<ApplicationRoleConnectionMetadata>> {
    return this.rest
      .request<Array<RawApplicationRoleConnectionMetadata>>(
        RESTMethods.Put,
        Endpoints.applicationRoleConnectionMetadata(applicationId)
      )
      .then((response) =>
        response.map((applicationRoleConnectionMetadata) =>
          this.util.toCamelCase<ApplicationRoleConnectionMetadata>(
            applicationRoleConnectionMetadata
          )
        )
      );
  }

  /** https://discord.com/developers/docs/resources/user#update-current-user-application-role-connection */
  updateCurrentApplicationRoleConnection(
    options: UpdateCurrentUserApplicationRoleConnection
  ): Promise<ApplicationRoleConnection> {
    return this.rest
      .request<RawApplicationRoleConnection>(
        RESTMethods.Put,
        Endpoints.userApplicationRoleConnection(this.application.id),
        {
          json: {
            platform_name: options.platformName,
            platform_username: options.platformUsername,
            metadata: options.metadata,
          },
        }
      )
      .then((response) =>
        this.util.toCamelCase<ApplicationRoleConnection>(response)
      );
  }

  /** https://discord.com/developers/docs/resources/channel#unpin-message */
  unpinMessage(channelId: string, messageId: string, reason?: string): void {
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
  guildAuditLogEntryCreate: [auditLogEntry: AuditLogEntry];
  guildBanAdd: [ban: GuildBanAddEventFields];
  guildBanRemove: [ban: GuildBanRemoveEventFields];
  guildEmojisUpdate: [emojis: Array<Emoji>, guildId: string];
  guildStickersUpdate: [stickers: Array<Sticker>, guildId: string];
  guildIntegrationsUpdate: [guildId: string];
  guildMemberAdd: [guildMember: GuildMember & GuildMemberAddEventExtraFields];
  guildMemberRemove: [guildMember: GuildMemberRemoveEventFields];
  guildMemberUpdate: [guildMember: GuildMemberUpdateEventFields];
  guildMembersChunk: [request: GuildMembersChunkEventFields];
  guildRoleCreate: [role: Role, guildId: string];
  guildRoleUpdate: [role: Role, guildId: string];
  guildRoleDelete: [roleId: string, guildId: string];
  guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventUpdate: [guildScheduledEvent: GuildScheduledEvent];
  guildScheduledEventDelete: [guildScheduledEvent: GuildScheduledEvent];
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
    message:
      | Message
      | {
          id: string;
          channelId: string;
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
  stageInstanceDelete: [stageInstance: StageInstance];
  typingStart: [typing: TypingStartEventFields];
  userUpdate: [user: User];
  voiceStateUpdate: [voiceState: VoiceState];
  voiceServerUpdate: [voiceServer: VoiceServerUpdateEventFields];
  webhooksUpdate: [channelId: string, guildId: string];
  messagePollVoteAdd: [vote: MessagePollVoteAddFields];
  messagePollVoteRemove: [vote: MessagePollVoteRemoveFields];
}
