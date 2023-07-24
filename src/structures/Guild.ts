import {
  ApplicationCommand,
  AuditLogEntry,
  AutoModerationRule,
  Base,
  Channel,
  GuildMember,
  GuildScheduledEvent,
  GuildTemplate,
  Integration,
  Invite,
  Role,
  StageInstance,
  User,
  Webhook,
} from ".";
import type { Client } from "../class";
import { Endpoints, File } from "../rest";
import type {
  JSONAuditLog,
  JSONAutoModerationAction,
  JSONBan,
  JSONDefaultReaction,
  JSONEmoji,
  JSONForumTag,
  JSONGuild,
  JSONGuildApplicationCommandPermissions,
  JSONGuildOnboarding,
  JSONGuildPreview,
  JSONGuildScheduledEventEntityMetadata,
  JSONGuildTemplate,
  JSONGuildWidget,
  JSONGuildWidgetSettings,
  JSONOnboardingPrompt,
  JSONOverwrite,
  JSONPresenceUpdateEventFields,
  JSONSticker,
  JSONThreadMember,
  JSONVoiceRegion,
  JSONVoiceState,
  JSONWelcomeScreen,
  JSONWelcomeScreenChannel,
  RawApplicationCommand,
  RawApplicationCommandPermission,
  RawAuditLog,
  RawAutoModerationRule,
  RawBan,
  RawChannel,
  RawEmoji,
  RawGuild,
  RawGuildApplicationCommandPermissions,
  RawGuildMember,
  RawGuildOnboarding,
  RawGuildPreview,
  RawGuildScheduledEvent,
  RawGuildScheduledEventUser,
  RawGuildTemplate,
  RawGuildWidget,
  RawGuildWidgetSettings,
  RawIntegration,
  RawInvite,
  RawPresenceUpdateEventFields,
  RawRole,
  RawStageInstance,
  RawSticker,
  RawThreadMember,
  RawUser,
  RawVoiceRegion,
  RawVoiceState,
  RawWebhook,
  RawWelcomeScreen,
  RawWelcomeScreenChannel,
} from "../types";
import {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ChannelTypes,
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  GuildFeatures,
  GuildMemberFlags,
  GuildNSFWLevel,
  GuildScheduledEventEntityTypes,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
  ImageWidgetStyleOptions,
  Locale,
  MFALevel,
  OnboardingMode,
  PremiumTier,
  SystemChannelFlags,
  VerificationLevel,
  applicationCommandToRaw,
  emojiToJSON,
} from "../utils";

export class Guild extends Base {
  public name: string;
  public icon: string | null;
  public iconHash?: string | null;
  public splash: string | null;
  public discoverySplash: string | null;
  public owner?: boolean;
  public ownerId: string;
  public permissions?: string;
  public region?: string | null;
  public afkChannelId: string | null;
  public afkTimeout: number;
  public widgetEnabled?: boolean;
  public widgetChannelId?: string | null;
  public verificationLevel: VerificationLevel;
  public defaultMessageNotifications: DefaultMessageNotificationLevel;
  public explicitContentFilter: ExplicitContentFilterLevel;
  public roles: Array<Role>;
  public emojis: Array<JSONEmoji>;
  public features: Array<GuildFeatures>;
  public mfaLevel: MFALevel;
  public applicationId: string | null;
  public systemChannelId: string | null;
  public systemChannelFlags: number;
  public rulesChannelId: string | null;
  public maxPresences?: number | null;
  public maxMembers?: number;
  public vanityURLCode: string | null;
  public description: string | null;
  public banner: string | null;
  public premiumTier: PremiumTier;
  public premiumSubscriptionCount?: number;
  public preferredLocale: string;
  public publicUpdatesChannelId: string | null;
  public maxVideoChannelUsers?: number;
  public approximateMemberCount?: number;
  public approximatePresenceCount?: number;
  public welcomeScreen?: JSONWelcomeScreen;
  public nsfwLevel: GuildNSFWLevel;
  public stickers?: Array<JSONSticker>;
  public premiumProgressBarEnabled: boolean;
  public safetyAlertsChannelId: string | null;
  public joinedAt?: number;
  public large?: boolean;
  public unavailable?: boolean;
  public memberCount?: number;
  public voiceStates?: Array<JSONVoiceState>;
  public members?: Array<GuildMember>;
  public channels?: Array<Channel>;
  public threads?: Array<Channel>;
  public presences?: Array<JSONPresenceUpdateEventFields>;
  public stageInstances?: Array<StageInstance>;
  public guildScheduledEvents?: Array<GuildScheduledEvent>;

  constructor(
    data: RawGuild & {
      joined_at?: number;
      large?: boolean;
      unavailable?: boolean;
      member_count?: number;
      voice_states?: Array<RawVoiceState>;
      members?: Array<RawGuildMember>;
      channels?: Array<RawChannel>;
      threads?: Array<RawChannel>;
      presences?: Array<RawPresenceUpdateEventFields>;
      stage_instances?: Array<RawStageInstance>;
      guild_scheduled_events?: Array<RawGuildScheduledEvent>;
    },
    client: Client
  ) {
    super(data.id, client);

    this.name = data.name;
    this.icon = data.icon;
    this.splash = data.splash;
    this.discoverySplash = data.discovery_splash;
    this.ownerId = data.owner_id;
    this.afkChannelId = data.afk_channel_id;
    this.afkTimeout = data.afk_timeout;
    this.verificationLevel = data.verification_level;
    this.defaultMessageNotifications = data.default_message_notifications;
    this.explicitContentFilter = data.explicit_content_filter;
    this.roles = data.roles.map((role) => new Role(role, client));
    this.emojis = data.emojis.map((emoji) => emojiToJSON(emoji, client));
    this.features = data.features;
    this.mfaLevel = data.mfa_level;
    this.applicationId = data.application_id;
    this.systemChannelId = data.system_channel_id;
    this.systemChannelFlags = data.system_channel_flags;
    this.rulesChannelId = data.rules_channel_id;
    this.vanityURLCode = data.vanity_url_code;
    this.description = data.description;
    this.banner = data.banner;
    this.premiumTier = data.premium_tier;
    this.preferredLocale = data.preferred_locale;
    this.publicUpdatesChannelId = data.public_updates_channel_id;
    this.nsfwLevel = data.nsfw_level;
    this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
    this.safetyAlertsChannelId = data.safety_alerts_channel_id;

    this.update(data);
  }

  protected override update(
    data: RawGuild & {
      joined_at?: number;
      large?: boolean;
      unavailable?: boolean;
      member_count?: number;
      voice_states?: Array<RawVoiceState>;
      members?: Array<RawGuildMember>;
      channels?: Array<RawChannel>;
      threads?: Array<RawChannel>;
      presences?: Array<RawPresenceUpdateEventFields>;
      stage_instances?: Array<RawStageInstance>;
      guild_scheduled_events?: Array<RawGuildScheduledEvent>;
    }
  ): void {
    if (data.icon_hash !== undefined) this.iconHash = data.icon_hash;
    if (data.owner !== undefined) this.owner = data.owner;
    if (data.permissions !== undefined) this.permissions = data.permissions;
    if (data.region !== undefined) this.region = data.region;
    if (data.widget_enabled !== undefined)
      this.widgetEnabled = data.widget_enabled;
    if (data.widget_channel_id !== undefined)
      this.widgetChannelId = data.widget_channel_id;
    if (data.max_presences !== undefined)
      this.maxPresences = data.max_presences;
    if (data.max_members !== undefined) this.maxMembers = data.max_members;
    if (data.premium_subscription_count !== undefined)
      this.premiumSubscriptionCount = data.premium_subscription_count;
    if (data.max_video_channel_users !== undefined)
      this.maxVideoChannelUsers = data.max_video_channel_users;
    if (data.approximate_member_count !== undefined)
      this.approximateMemberCount = data.approximate_member_count;
    if (data.approximate_presence_count !== undefined)
      this.approximatePresenceCount = data.approximate_presence_count;
    if (data.welcome_screen !== undefined)
      this.welcomeScreen = {
        description: data.welcome_screen.description,
        welcomeChannels: data.welcome_screen.welcome_channels.map((data) => ({
          channelId: data.channel_id,
          description: data.description,
          emojiId: data.emoji_id,
          emojiName: data.emoji_name,
        })),
      };
    if (data.stickers !== undefined)
      this.stickers = data.stickers.map((data) => ({
        id: data.id,
        packId: data?.pack_id,
        name: data.name,
        description: data.description,
        tags: data.tags,
        asset: data?.asset,
        type: data.type,
        formatType: data.format_type,
        available: data?.available,
        guildId: data?.guild_id,
        user:
          data.user !== undefined
            ? new User(data.user, this.client)
            : undefined,
        sortValue: data?.sort_value,
      }));
    if (data.joined_at !== undefined) this.joinedAt = data.joined_at;
    if (data.large !== undefined) this.large = data.large;
    if (data.unavailable !== undefined) this.unavailable = data.unavailable;
    if (data.member_count !== undefined) this.memberCount = data.member_count;
    if (data.voice_states !== undefined)
      this.voiceStates = data.voice_states.map((voiceState) => ({
        guildId: voiceState.guild_id,
        channelId: voiceState.channel_id,
        userId: voiceState.user_id,
        member:
          voiceState.member !== undefined
            ? new GuildMember(voiceState.member, this.client)
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
      }));
    if (data.members !== undefined)
      this.members = data.members.map(
        (member) => new GuildMember(member, this.client)
      );
    if (data.channels !== undefined)
      this.channels = data.channels.map(
        (channel) => new Channel(channel, this.client)
      );
    if (data.threads !== undefined)
      this.threads = data.threads.map(
        (thread) => new Channel(thread, this.client)
      );
    if (data.presences !== undefined)
      this.presences = data.presences.map((presence) => ({
        user: new User(presence.user, this.client),
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
      }));
    if (data.stage_instances !== undefined)
      this.stageInstances = data.stage_instances.map(
        (stageIntance) => new StageInstance(stageIntance, this.client)
      );
    if (data.guild_scheduled_events !== undefined)
      this.guildScheduledEvents = data.guild_scheduled_events.map(
        (guildScheduledEvent) =>
          new GuildScheduledEvent(guildScheduledEvent, this.client)
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  public async getApplicationCommands(
    applicationId: string,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .request(
        "GET",
        Endpoints.applicationGuildCommands(applicationId, this.id),
        {
          query: {
            with_localizations: options?.withLocalizations,
          },
        }
      )
      .then((response) =>
        response.map(
          (data: RawApplicationCommand) =>
            new ApplicationCommand(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  public async createApplicationCommand(
    applicationId: string,
    options: {
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      dmPermission?: boolean;
      defaultPermission?: boolean | null;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.request(
        "POST",
        Endpoints.applicationGuildCommands(applicationId, this.id),
        {
          json: applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  public async getApplicationCommand(
    applicationId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.request(
        "GET",
        Endpoints.applicationGuildCommand(applicationId, this.id, commandId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  public async editApplicationCommand(
    applicationId: string,
    commandId: string,
    options: {
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      dmPermission?: boolean;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.request(
        "PATCH",
        Endpoints.applicationGuildCommand(applicationId, this.id, commandId),
        {
          json: applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  public async deleteApplicationCommand(
    applicationId: string,
    commandId: string
  ): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.applicationGuildCommand(applicationId, this.id, commandId)
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  public async bulkOverwriteGuildApplicationCommands(
    applicationId: string,
    options: {
      id?: string;
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      dmPermission?: boolean;
      defaultPermission?: boolean | null;
      type: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .request(
        "PUT",
        Endpoints.applicationGuildCommands(applicationId, this.id),
        {
          json: applicationCommandToRaw(options),
        }
      )
      .then((response) =>
        response.map(
          (data: RawApplicationCommand) =>
            new ApplicationCommand(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  public async getApplicationCommandPermissions(
    guildId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .request(
        "GET",
        Endpoints.guildApplicationCommandsPermissions(this.id, guildId)
      )
      .then((response) =>
        response.map((permissions: RawGuildApplicationCommandPermissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map(
            (permission: RawApplicationCommandPermission) => ({
              id: permission.id,
              type: permission.type,
              permission: permission.permission,
            })
          ),
        }))
      );
  }

  /* https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
  public async getAuditLog(options?: {
    userId?: string;
    actionType?: number;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<Array<JSONAuditLog>> {
    return this.client.rest
      .request("GET", Endpoints.guildAuditLog(this.id), {
        query: {
          user_id: options?.userId,
          action_type: options?.actionType,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
        },
      })
      .then((response) =>
        response.map((data: RawAuditLog) => ({
          applicationCommands: data.application_commands.map(
            (applicationCommand) =>
              new ApplicationCommand(applicationCommand, this.client)
          ),
          auditLogEntries: data.audit_log_entries.map(
            (auditLogEntry) => new AuditLogEntry(auditLogEntry, this.client)
          ),
          autoModerationRules: data.auto_moderation_rules.map(
            (autoModerationRule) =>
              new AutoModerationRule(autoModerationRule, this.client)
          ),
          guildScheduledEvents: data.guild_scheduled_events.map(
            (guildScheduledEvent) =>
              new GuildScheduledEvent(guildScheduledEvent, this.client)
          ),
          integrations: data.integrations.map(
            (integration) => new Integration(integration, this.client)
          ),
          threads: data.threads.map(
            (thread) => new Channel(thread, this.client)
          ),
          users: data.users.map((user) => new User(user, this.client)),
          webhooks: data.webhooks.map(
            (webhook) => new Webhook(webhook, this.client)
          ),
        }))
      );
  }

  /* https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild */
  public async listAutoModerationRules(): Promise<Array<AutoModerationRule>> {
    return this.client.rest
      .request("GET", Endpoints.guildAutoModerationRules(this.id))
      .then((response) =>
        response.map(
          (data: RawAutoModerationRule) =>
            new AutoModerationRule(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule */
  public async getAutoModerationRule(
    ruleId: string
  ): Promise<AutoModerationRule> {
    return new AutoModerationRule(
      await this.client.rest.request(
        "GET",
        Endpoints.guildAutoModerationRule(this.id, ruleId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule */
  public async createAutoModerationRule(
    options: {
      name: string;
      eventType: number;
      triggerType: number;
      triggerMetadata?: object;
      actions: Array<JSONAutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<string>;
      exemptChannels?: Array<string>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    return new AutoModerationRule(
      await this.client.rest.request(
        "POST",
        Endpoints.guildAutoModerationRules(this.id),
        {
          json: {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options?.triggerMetadata,
            actions: options.actions?.map((action) => ({
              type: action.type,
              metadata: {
                channel_id: action.metadata?.channelId,
                duration_seconds: action.metadata?.durationSeconds,
                custom_message: action.metadata?.customMessage,
              },
            })),
            enabled: options.enabled,
            exempt_roles: options?.exemptRoles,
            exempt_channels: options?.exemptChannels,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
  public async modifyAutoModerationRule(
    ruleId: string,
    options: {
      name?: string;
      eventType?: number;
      triggerType?: number;
      triggerMetadata?: object;
      actions?: Array<JSONAutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<string>;
      exemptChannels?: Array<string>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    return new AutoModerationRule(
      await this.client.rest.request(
        "PATCH",
        Endpoints.guildAutoModerationRule(this.id, ruleId),
        {
          json: {
            name: options?.name,
            event_type: options?.eventType,
            trigger_type: options?.triggerType,
            trigger_metadata: options?.triggerMetadata,
            actions: options?.actions?.map((action) => ({
              type: action.type,
              metadata: {
                channel_id: action.metadata?.channelId,
                duration_seconds: action.metadata?.durationSeconds,
                custom_message: action.metadata?.customMessage,
              },
            })),
            enabled: options?.enabled,
            exempt_roles: options?.exemptRoles,
            exempt_channels: options?.exemptChannels,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
  public async deleteAutoModerationRule(
    ruleId: string,
    reason?: string
  ): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.guildAutoModerationRule(this.id, ruleId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
  public async listGuildEmojis(): Promise<Array<JSONEmoji>> {
    return this.client.rest
      .request("GET", Endpoints.guildEmojis(this.id))
      .then((response) =>
        response.map((data: RawEmoji) => emojiToJSON(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
  public async getEmoji(emojiId: string): Promise<JSONEmoji> {
    return emojiToJSON(
      await this.client.rest.request(
        "GET",
        Endpoints.guildEmoji(this.id, emojiId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
  public async createEmoji(
    options: {
      name: string;
      image: string;
      roles: Array<string>;
    },
    reason?: string
  ): Promise<JSONEmoji> {
    return emojiToJSON(
      await this.client.rest.request("POST", Endpoints.guildEmojis(this.id), {
        json: {
          name: options.name,
          image: options.image,
          roles: options.roles,
        },
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  public async modifyEmoji(
    emojiId: string,
    options: {
      name?: string;
      roles?: Array<string> | null;
    },
    reason?: string
  ): Promise<JSONEmoji> {
    return emojiToJSON(
      await this.client.rest.request(
        "PATCH",
        Endpoints.guildEmoji(this.id, emojiId),
        {
          json: {
            name: options.name,
            roles: options.roles,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  public async deleteEmoji(emojiId: string, reason?: string): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guildEmoji(this.id, emojiId), {
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-preview */
  public async getPreview(): Promise<JSONGuildPreview> {
    const data: RawGuildPreview = await this.client.rest.request(
      "GET",
      Endpoints.guildPreview(this.id)
    );

    return {
      id: data.id,
      name: data.name,
      icon: data.icon,
      splash: data.splash,
      discoverySplash: data.discovery_splash,
      emojis: data.emojis.map((emoji) => emojiToJSON(emoji, this.client)),
      features: data.features,
      approximateMemberCount: data?.approximate_member_count,
      approximatePresenceCount: data?.approximate_presence_count,
      description: data.description,
      stickers: data?.stickers?.map((sticker) => ({
        id: sticker.id,
        packId: sticker?.pack_id,
        name: sticker.name,
        description: sticker.description,
        tags: sticker.tags,
        asset: sticker?.asset,
        type: sticker.type,
        formatType: sticker.format_type,
        available: sticker?.available,
        guildId: sticker?.guild_id,
        user:
          sticker?.user !== undefined
            ? new User(sticker.user, this.client)
            : undefined,
        sortValue: sticker?.sort_value,
      })),
    };
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild */
  public async modify(
    options: {
      name?: string;
      region?: string | null;
      verificationLevel?: VerificationLevel;
      defaultMessageNotifications?: DefaultMessageNotificationLevel;
      explicitContentFilter?: ExplicitContentFilterLevel;
      afkChannelId?: string | null;
      afkTimeout?: number;
      icon?: string | null;
      ownerId?: string;
      splash?: string | null;
      discoverySplash?: string | null;
      banner?: string | null;
      systemChannelId?: string | null;
      systemChannelFlags?: SystemChannelFlags;
      rulesChannelId?: string | null;
      publicUpdatesChannelId?: string | null;
      preferredLocale?: string;
      features?: Array<GuildFeatures>;
      description?: string | null;
      premiumProgressBarEnabled?: boolean;
      safetyAlertsChannelId?: string | null;
    },
    reason?: string
  ): Promise<Guild> {
    return new Guild(
      await this.client.rest.request("PATCH", Endpoints.guild(this.id), {
        json: {
          name: options?.name,
          region: options?.region,
          verification_level: options?.verificationLevel,
          default_message_notifications: options?.defaultMessageNotifications,
          explicit_content_filter: options?.explicitContentFilter,
          afk_channel_id: options?.afkChannelId,
          afk_timeout: options?.afkTimeout,
          icon: options?.icon,
          owner_id: options?.ownerId,
          splash: options?.splash,
          discovery_splash: options?.discoverySplash,
          banner: options?.banner,
          system_channel_id: options?.systemChannelId,
          system_channel_flags: options?.systemChannelFlags,
          rules_channel_id: options?.rulesChannelId,
          public_updates_channel_id: options?.publicUpdatesChannelId,
          preferred_locale: options?.preferredLocale,
          features: options?.features,
          description: options?.description,
          premium_progress_bar_enabled: options?.premiumProgressBarEnabled,
          safety_alerts_channel_id: options?.safetyAlertsChannelId,
        },
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild#delete-guild */
  public async delete(): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guild(this.id));
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-channels */
  public async getChannels(): Promise<Array<Channel>> {
    return this.client.rest
      .request("GET", Endpoints.guildChannels(this.id))
      .then((response) =>
        response.map((data: RawChannel) => new Channel(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/guild#create-guild-channel */
  public async createChannel(
    options: {
      name: string | null;
      type?: ChannelTypes;
      topic?: string | null;
      bitrate?: number;
      userLimit?: number;
      rateLimitPerUser?: number;
      position?: number;
      permissionOverwrites?: Array<JSONOverwrite>;
      parentId?: string | null;
      nsfw?: boolean;
      rtcRegion?: string | null;
      videoQualityMode?: number;
      defaultAutoArchiveDuration?: number;
      defaultReactionEmoji?: JSONDefaultReaction | null;
      availableTags?: Array<JSONForumTag>;
      defaultSortOrder?: number | null;
      defaultForumLayout?: number;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.request("POST", Endpoints.guildChannels(this.id), {
        json: {
          name: options?.name,
          type: options?.type,
          topic: options?.topic,
          bitrate: options?.bitrate,
          user_limit: options?.userLimit,
          rate_limit_per_user: options?.rateLimitPerUser,
          position: options?.position,
          permission_overwrites: options?.permissionOverwrites,
          parent_id: options?.parentId,
          nsfw: options?.nsfw,
          rtc_region: options?.rtcRegion,
          video_quality_mode: options?.videoQualityMode,
          default_auto_archive_duration: options?.defaultAutoArchiveDuration,
          default_reaction_emoji: {
            emojiId: options?.defaultReactionEmoji?.emojiId,
            emojiName: options?.defaultReactionEmoji?.emojiName,
          },
          available_tags: options?.availableTags,
          default_sort_order: options?.defaultSortOrder,
          default_forum_layout: options?.defaultForumLayout,
        },
        reason,
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
  public async modifyChannelPositions(
    options: Array<{
      id: string;
      position: number | null;
      lockPermissions: boolean | null;
      parentId: string | null;
    }>
  ): Promise<void> {
    this.client.rest.request("PATCH", Endpoints.guildChannels(this.id), {
      json: options.map((data) => ({
        id: data.id,
        position: data.position,
        lock_permissions: data.lockPermissions,
        parent_id: data.parentId,
      })),
    });
  }

  /* https://discord.com/developers/docs/resources/guild#list-active-guild-threads */
  public async listActiveGuildThreads(): Promise<
    Array<{
      threads: Array<Channel>;
      members: Array<JSONThreadMember>;
    }>
  > {
    return this.client.rest
      .request("GET", Endpoints.guildActiveThreads(this.id))
      .then((response) =>
        response.map(
          (data: {
            threads: Array<RawChannel>;
            members: Array<RawThreadMember>;
          }) => ({
            threads: data.threads.map((data) => new Channel(data, this.client)),
            members: data.members.map((data) => ({
              id: data?.id,
              userId: data?.user_id,
              joinTimestamp: data?.join_timestamp,
              flags: data?.flags,
              member:
                data?.member !== undefined
                  ? new GuildMember(data?.member, this.client)
                  : undefined,
            })),
          })
        )
      );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-member */
  public async getMember(userId: string): Promise<GuildMember> {
    return new GuildMember(
      await this.client.rest.request(
        "GET",
        Endpoints.guildMember(this.id, userId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild#list-guild-members */
  public async listGuildMembers(): Promise<Array<GuildMember>> {
    return this.client.rest
      .request("GET", Endpoints.guildMembers(this.id))
      .then((response) =>
        response.map(
          (data: RawGuildMember) => new GuildMember(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/resources/guild#search-guild-members */
  public async searchGuildMembers(options: {
    query: string;
    limit?: number;
  }): Promise<Array<GuildMember>> {
    return this.client.rest
      .request("GET", Endpoints.guildMembersSearch(this.id), {
        query: {
          query: options.query,
          limit: options.limit,
        },
      })
      .then((response) =>
        response.map(
          (data: RawGuildMember) => new GuildMember(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/resources/guild#add-guild-member */
  public async addGuildMember(
    userId: string,
    options: {
      accessToken: string;
      nick?: string;
      roles?: Array<string>;
      mute?: boolean;
      deaf?: boolean;
    }
  ): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guildMember(this.id, userId), {
      json: {
        access_token: options.accessToken,
        nick: options?.nick,
        roles: options?.roles,
        mute: options?.mute,
        deaf: options?.deaf,
      },
    });
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-member */
  public async modifyMember(
    userId: string,
    options: {
      nick?: string | null;
      roles?: Array<string> | null;
      mute?: boolean | null;
      deaf?: boolean | null;
      channelId?: string | null;
      communicationDisabledUntil?: number | null;
      flags?: GuildMemberFlags;
    },
    reason?: string
  ): Promise<void> {
    this.client.rest.request("PATCH", Endpoints.guildMember(this.id, userId), {
      json: {
        nick: options?.nick,
        roles: options?.roles,
        mute: options?.mute,
        deaf: options?.deaf,
        channel_id: options?.channelId,
        communication_disabled_until: options?.communicationDisabledUntil,
        flags: options?.flags,
      },
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#modify-current-member */
  public async modifyCurrentMember(
    options: {
      nick: string | null;
    },
    reason?: string
  ): Promise<void> {
    this.client.rest.request("PATCH", Endpoints.guildMember(this.id), {
      json: {
        nick: options.nick,
      },
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  public async addGuildMemberRole(
    userId: string,
    roleId: string,
    reason?: string
  ): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.guildMemberRole(this.id, userId, roleId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  public async removeMemberRole(
    userId: string,
    roleId: string,
    reason?: string
  ): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.guildMemberRole(this.id, userId, roleId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  public async removeMember(userId: string, reason?: string): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guildMember(this.id, userId), {
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-bans */
  public async getBans(options?: {
    limit?: number;
    before?: string;
    after?: string;
  }): Promise<Array<JSONBan>> {
    return this.client.rest
      .request("GET", Endpoints.guildBans(this.id), {
        query: {
          limit: options?.limit,
          before: options?.before,
          after: options?.after,
        },
      })
      .then((response) =>
        response.map((data: RawBan) => ({
          reason: data.reason,
          user: new User(data.user, this.client),
        }))
      );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-ban */
  public async getBan(userId: string): Promise<JSONBan> {
    const data = await this.client.rest.request(
      "GET",
      Endpoints.guildBan(this.id, userId)
    );

    return {
      reason: data.reason,
      user: new User(data.user, this.client),
    };
  }

  /* https://discord.com/developers/docs/resources/guild#create-guild-ban */
  public async createBan(
    userId: string,
    options?: {
      deleteMessageDays?: number;
      deleteMessageSeconds?: number;
    },
    reason?: string
  ): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guildBan(this.id, userId), {
      json: {
        delete_message_days: options?.deleteMessageDays,
        delete_message_seconds: options?.deleteMessageSeconds,
      },
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  public async removeBan(userId: string, reason?: string): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guildBan(this.id, userId), {
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-roles */
  public async getRoles(): Promise<Array<Role>> {
    return this.client.rest
      .request("GET", Endpoints.guildRoles(this.id))
      .then((response) =>
        response.map((data: RawRole) => new Role(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/guild#create-guild-role */
  public async createRole(
    options: {
      name: string;
      permissions: string;
      color: number;
      hoist: boolean;
      icon: string | null;
      unicodeEmoji: string | null;
      mentionable: boolean;
    },
    reason?: string
  ): Promise<Role> {
    return new Role(
      await this.client.rest.request("POST", Endpoints.guildRoles(this.id), {
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
      }),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
  public async modifyRolePositions(
    options: Array<{
      id: string;
      position?: number | null;
    }>
  ): Promise<Array<Role>> {
    return this.client.rest
      .request("PATCH", Endpoints.guildRoles(this.id), {
        json: options.map((data) => ({
          id: data.id,
          position: data?.position,
        })),
      })
      .then((response) =>
        response.map((data: RawRole) => new Role(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-role */
  public async modifyRole(
    roleId: string,
    options: {
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
    return new Role(
      await this.client.rest.request(
        "PATCH",
        Endpoints.guildRole(this.id, roleId),
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
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level */
  public async modifyMFALevel(
    options: {
      level: MFALevel;
    },
    reason?: string
  ): Promise<number> {
    return await this.client.rest.request("POST", Endpoints.guildMFA(this.id), {
      json: {
        level: options.level,
      },
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#delete-guild-role */
  public async deleteRole(roleId: string, reason?: string): Promise<void> {
    this.client.rest.request("PUT", Endpoints.guildRole(this.id, roleId), {
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
  public async getPruneCount(options: {
    days: number;
    includeRoles: string | Array<string>;
  }): Promise<number> {
    return await this.client.rest.request(
      "GET",
      Endpoints.guildPrune(this.id),
      {
        query: {
          days: options.days,
          include_roles: options.includeRoles,
        },
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild#begin-guild-prune */
  public async beginGuildPrune(
    options: {
      days: number;
      computePruneCount: boolean;
      includeRoles: Array<string>;
      reason?: string;
    },
    reason?: string
  ): Promise<number> {
    return await this.client.rest.request(
      "POST",
      Endpoints.guildPrune(this.id),
      {
        json: {
          days: options.days,
          compute_prune_count: options.computePruneCount,
          include_roles: options.includeRoles,
          reason: options?.reason,
        },
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
  public async getVoiceRegions(): Promise<Array<JSONVoiceRegion>> {
    const data = await this.client.rest.request(
      "GET",
      Endpoints.guildVoiceRegions(this.id)
    );

    return data.map((data: RawVoiceRegion) => ({
      id: data.id,
      name: data.name,
      optimal: data.optimal,
      deprecated: data.deprecated,
      custom: data.custom,
    }));
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-invites */
  public async getInvites(): Promise<Array<Invite>> {
    return this.client.rest
      .request("GET", Endpoints.guildInvites(this.id))
      .then((response) =>
        response.map((data: RawInvite) => new Invite(data, this.client))
      );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-integrations */
  public async getIntegrations(): Promise<Array<Integration>> {
    return this.client.rest
      .request("GET", Endpoints.guildIntegrations(this.id))
      .then((response) =>
        response.map(
          (data: RawIntegration) => new Integration(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  public async deleteIntegration(
    integrationId: string,
    reason?: string
  ): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.guildIntegration(this.id, integrationId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-widget-settings */
  public async getWidgetSettings(): Promise<JSONGuildWidgetSettings> {
    const data: RawGuildWidgetSettings = await this.client.rest.request(
      "GET",
      Endpoints.guildWidgetSettings(this.id)
    );

    return {
      enabled: data.enabled,
      channelId: data.channel_id,
    };
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-widget */
  public async modifyWidget(
    options: {
      enabled?: boolean;
      channelId?: boolean;
    },
    reason?: string
  ): Promise<JSONGuildWidgetSettings> {
    const data: RawGuildWidgetSettings = await this.client.rest.request(
      "PATCH",
      Endpoints.guildWidgetSettings(this.id),
      {
        json: {
          enabled: options?.enabled,
          channel_id: options?.channelId,
        },
        reason,
      }
    );

    return {
      enabled: data.enabled,
      channelId: data.channel_id,
    };
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-widget */
  public async getWidget(): Promise<JSONGuildWidget> {
    const data: RawGuildWidget = await this.client.rest.request(
      "GET",
      Endpoints.guildWidgetJSON(this.id)
    );

    return {
      id: data.id,
      name: data.name,
      instantInvite: data.instant_invite,
      channels: data.channels.map(
        (data: RawChannel) => new Channel(data, this.client)
      ),
      members: data.members.map((data: RawUser) => new User(data, this.client)),
      presenceCount: data.presence_count,
    };
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
  public async getVanityURL(): Promise<Invite> {
    return new Invite(
      await this.client.rest.request("GET", Endpoints.guildVanityUrl(this.id)),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-widget-image */
  public async getWidgetImage(options?: {
    style?: ImageWidgetStyleOptions;
  }): Promise<string> {
    return await this.client.rest.request(
      "GET",
      Endpoints.guildWidgetImage(this.id),
      {
        query: {
          style: options?.style,
        },
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen */
  public async getWelcomeScreen(): Promise<JSONWelcomeScreen> {
    const data: RawWelcomeScreen = await this.client.rest.request(
      "GET",
      Endpoints.guildWelcomeScreen(this.id)
    );

    return {
      description: data.description,
      welcomeChannels: data.welcome_channels.map(
        (data: RawWelcomeScreenChannel) => ({
          channelId: data.channel_id,
          description: data.description,
          emojiId: data.emoji_id,
          emojiName: data.emoji_name,
        })
      ),
    };
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
  public async modifyWelcomeScreen(
    options: {
      enabled?: boolean | null;
      welcomeChannels?: Array<JSONWelcomeScreenChannel> | null;
      description?: string | null;
    },
    reason?: string
  ): Promise<JSONWelcomeScreen> {
    const data: RawWelcomeScreen = await this.client.rest.request(
      "PATCH",
      Endpoints.guildWelcomeScreen(this.id),
      {
        json: {
          enabled: options?.enabled,
          welcome_channels: options?.welcomeChannels,
          description: options?.description,
        },
        reason,
      }
    );

    return {
      description: data.description,
      welcomeChannels: data.welcome_channels.map(
        (data: RawWelcomeScreenChannel) => ({
          channelId: data.channel_id,
          description: data.description,
          emojiId: data.emoji_id,
          emojiName: data.emoji_name,
        })
      ),
    };
  }

  /* https://discord.com/developers/docs/resources/guild#get-guild-onboarding */
  public async getOnboarding(): Promise<JSONGuildOnboarding> {
    const data: RawGuildOnboarding = await this.client.rest.request(
      "GET",
      Endpoints.guildOnboarding(this.id)
    );

    return {
      guildId: data.guild_id,
      prompts: data.prompts.map((prompt) => ({
        id: prompt.id,
        type: prompt.type,
        options: prompt.options.map((option) => ({
          id: option.id,
          channelIds: option.channel_ids,
          roleIds: option.role_ids,
          emoji: emojiToJSON(option.emoji, this.client),
          title: option.title,
          description: option.description,
        })),
        title: prompt.title,
        singleSelect: prompt.single_select,
        required: prompt.required,
        inOnboarding: prompt.in_onboarding,
      })),
      defaultChannelIds: data.default_channel_ids,
      enabled: data.enabled,
      mode: data.mode,
    };
  }

  /* https://discord.com/developers/docs/resources/guild#modify-guild-onboarding */
  public async modifyOnboarding(
    options: {
      prompts: Array<JSONOnboardingPrompt>;
      defaultChannelIds: Array<string>;
      enabled: boolean;
      mode: OnboardingMode;
    },
    reason?: string
  ): Promise<void> {
    this.client.rest.request("PATCH", Endpoints.guildOnboarding(this.id), {
      json: {
        prompts: options.prompts.map((prompt) => ({
          id: prompt.id,
          type: prompt.type,
          options: prompt.options.map((option) => ({
            id: option.id,
            channel_ids: option.channelIds,
            role_ids: option.roleIds,
            emoji: {
              id: option.emoji.id,
              name: option.emoji.name,
              roles: option.emoji?.roles,
              user: option.emoji.user,
              require_colons: option.emoji?.requireColons,
              managed: option.emoji?.managed,
              animated: option.emoji?.animated,
              available: option.emoji?.available,
            },
            title: option.title,
            description: option.description,
          })),
          title: prompt.title,
          single_select: prompt.singleSelect,
          required: prompt.required,
          in_onboarding: prompt.inOnboarding,
        })),
      },
      reason,
    });
  }

  /* https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state */
  public async modifyCurrentUserVoiceState(options: {
    channelId?: string;
    suppress?: boolean;
    requestToSpeakTimestamp?: number | null;
  }): Promise<void> {
    this.client.rest.request("PATCH", Endpoints.guildVoiceState(this.id), {
      json: {
        channel_id: options?.channelId,
        suppress: options?.suppress,
        requestToSpeakTimestamp: options?.requestToSpeakTimestamp,
      },
    });
  }

  /* https://discord.com/developers/docs/resources/guild#modify-user-voice-state */
  public async modifyUserVoiceState(
    userId: string,
    options: {
      channelId?: string;
      suppress?: boolean;
      requestToSpeakTimestamp?: number | null;
    }
  ): Promise<void> {
    this.client.rest.request(
      "PATCH",
      Endpoints.guildVoiceState(this.id, userId),
      {
        json: {
          channel_id: options?.channelId,
          suppress: options?.suppress,
          requestToSpeakTimestamp: options?.requestToSpeakTimestamp,
        },
      }
    );
  }

  /* https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild */
  public async listScheduledEvents(options?: {
    withUserCount?: boolean;
  }): Promise<Array<GuildScheduledEvent>> {
    return this.client.rest
      .request("GET", Endpoints.guildScheduledEvents(this.id), {
        query: {
          with_user_count: options?.withUserCount,
        },
      })
      .then((response) =>
        response.map(
          (data: RawGuildScheduledEvent) =>
            new GuildScheduledEvent(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event */
  public async createScheduledEvent(
    options: {
      channelId?: string | null;
      entityMetadata?: JSONGuildScheduledEventEntityMetadata | null;
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
    return new GuildScheduledEvent(
      await this.client.rest.request(
        "POST",
        Endpoints.guildScheduledEvents(this.id),
        {
          json: {
            channel_id: options?.channelId,
            entity_metadata: options?.entityMetadata,
            name: options.name,
            privacy_level: options.privacyLevel,
            scheduled_start_time: options.scheduledEndTime,
            scheduled_end_time: options?.scheduledEndTime,
            description: options?.description,
            entity_type: options.entityType,
            image: options?.image,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
  public async modifyScheduledEvent(
    scheduledEventId: string,
    options: {
      channelId?: string | null;
      entityMetadata?: JSONGuildScheduledEventEntityMetadata | null;
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
    return new GuildScheduledEvent(
      await this.client.rest.request(
        "PATCH",
        Endpoints.guildScheduledEvent(this.id, scheduledEventId),
        {
          json: {
            channel_id: options?.channelId,
            entity_metadata: options?.entityMetadata,
            name: options?.name,
            privacy_level: options?.privacyLevel,
            scheduled_start_time: options?.scheduledStartTime,
            scheduled_end_time: options?.scheduledEndTime,
            description: options?.description,
            entityType: options?.entityType,
            status: options?.status,
            image: options?.image,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event */
  public async deleteScheduledEvent(scheduledEventId: string): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.guildScheduledEvent(this.id, scheduledEventId)
    );
  }

  /* https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
  public async getScheduledEventUsers(
    scheduledEventId: string,
    options?: {
      limit?: number;
      withMember?: boolean;
      before?: string;
      after?: string;
    }
  ): Promise<Array<User>> {
    return this.client.rest
      .request(
        "GET",
        Endpoints.guildScheduledEvent(this.id, scheduledEventId),
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
        response.map((data: RawGuildScheduledEventUser) => ({
          guildScheduledEventId: data.guild_scheduled_event_id,
          user: new User(data.user, this.client),
          member:
            data.member !== undefined
              ? new GuildMember(data.member, this.client)
              : undefined,
        }))
      );
  }

  /* https://discord.com/developers/docs/resources/guild-template#get-guild-template */
  public async getTemplate(code: string): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.request(
        "GET",
        Endpoints.guildTemplate(this.id, code)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-template#get-guild-templates */
  public async getTemplates(): Promise<Array<GuildTemplate>> {
    return this.client.rest
      .request("GET", Endpoints.guildTemplates(this.id))
      .then((response) =>
        response.map(
          (data: RawGuildTemplate) => new GuildTemplate(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/resources/guild-template#create-guild-template */
  public async createTemplate(options: {
    name: string;
    description?: string | null;
  }): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.request(
        "POST",
        Endpoints.guildTemplates(this.id),
        {
          json: {
            name: options.name,
            description: options?.description,
          },
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  public async syncTemplate(code: string): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.request(
        "PUT",
        Endpoints.guildTemplate(this.id, code)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  public async modifyTemplate(
    code: string,
    options: {
      name?: string;
      description?: string | null;
    }
  ): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.request(
        "PATCH",
        Endpoints.guildTemplate(this.id, code),
        {
          json: {
            name: options?.name,
            description: options?.description,
          },
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  public async deleteTemplate(code: string): Promise<JSONGuildTemplate> {
    const data: RawGuildTemplate = await this.client.rest.request(
      "PUT",
      Endpoints.guildTemplate(this.id, code)
    );

    return {
      code: data.code,
      name: data.name,
      description: data.description,
      usageCount: data.usage_count,
      creatorId: data.creator_id,
      creator: new User(data.creator, this.client),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      sourceGuildId: data.source_guild_id,
      serializedSourceGuild: new Guild(
        data.serialized_source_guild,
        this.client
      ),
      isDirty: data.is_dirty,
    };
  }

  /* https://discord.com/developers/docs/resources/sticker#list-guild-stickers */
  public async listStickers(): Promise<Array<JSONSticker>> {
    return this.client.rest
      .request("GET", Endpoints.guildStickers(this.id))
      .then((response) =>
        response.map((data: RawSticker) => ({
          id: data.id,
          packId: data.pack_id,
          name: data.name,
          description: data.description,
          tags: data.tags,
          asset: data.asset,
          type: data.type,
          formatType: data.format_type,
          available: data.available,
          guildId: data.guild_id,
          user:
            data.user !== undefined
              ? new User(data.user, this.client)
              : undefined,
          sortValue: data.sort_value,
        }))
      );
  }

  /* https://discord.com/developers/docs/resources/sticker#get-guild-sticker */
  public async getSticker(stickerId: string): Promise<JSONSticker> {
    const data: RawSticker = await this.client.rest.request(
      "GET",
      Endpoints.guildSticker(this.id, stickerId)
    );

    return {
      id: data.id,
      packId: data.pack_id,
      name: data.name,
      description: data.description,
      tags: data.tags,
      asset: data.asset,
      type: data.type,
      formatType: data.format_type,
      available: data.available,
      guildId: data.guild_id,
      user:
        data.user !== undefined ? new User(data.user, this.client) : undefined,
      sortValue: data.sort_value,
    };
  }

  /* https://discord.com/developers/docs/resources/sticker#create-guild-sticker */
  public async createSticker(
    options: {
      name: string;
      description: string;
      tags: string;
      file: File;
    },
    reason?: string
  ): Promise<JSONSticker> {
    const data: RawSticker = await this.client.rest.request(
      "POST",
      Endpoints.guildStickers(this.id),
      {
        json: {
          name: options.name,
          description: options.description,
          tags: options.tags,
        },
        files: [options.file],
        reason,
      }
    );

    return {
      id: data.id,
      packId: data.pack_id,
      name: data.name,
      description: data.description,
      tags: data.tags,
      asset: data.asset,
      type: data.type,
      formatType: data.format_type,
      available: data.available,
      guildId: data.guild_id,
      user:
        data.user !== undefined ? new User(data.user, this.client) : undefined,
      sortValue: data.sort_value,
    };
  }

  /* https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
  public async modifySticker(
    stickerId: string,
    options: {
      name?: string;
      description?: string;
      tags?: string;
    },
    reason?: string
  ): Promise<JSONSticker> {
    const data: RawSticker = await this.client.rest.request(
      "PATCH",
      Endpoints.guildSticker(this.id, stickerId),
      {
        json: {
          name: options.name,
          description: options.description,
          tags: options.tags,
        },
        reason,
      }
    );

    return {
      id: data.id,
      packId: data.pack_id,
      name: data.name,
      description: data.description,
      tags: data.tags,
      asset: data.asset,
      type: data.type,
      formatType: data.format_type,
      available: data.available,
      guildId: data.guild_id,
      user:
        data.user !== undefined ? new User(data.user, this.client) : undefined,
      sortValue: data.sort_value,
    };
  }

  /* https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
  public async deleteSticker(
    stickerId: string,
    reason?: string
  ): Promise<void> {
    this.client.rest.request(
      "PUT",
      Endpoints.guildSticker(this.id, stickerId),
      {
        reason,
      }
    );
  }

  /* https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
  public async getWebhooks(): Promise<Array<Webhook>> {
    return this.client.rest
      .request("GET", Endpoints.guildWebhooks(this.id))
      .then((response) =>
        response.map((data: RawWebhook) => new Webhook(data, this.client))
      );
  }

  public override toJSON(): JSONGuild {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      iconHash: this.iconHash,
      splash: this.splash,
      discoverySplash: this.discoverySplash,
      owner: this.owner,
      ownerId: this.ownerId,
      permissions: this.permissions,
      region: this.region,
      afkChannelId: this.afkChannelId,
      afkTimeout: this.afkTimeout,
      widgetEnabled: this.widgetEnabled,
      widgetChannelId: this.widgetChannelId,
      verificationLevel: this.verificationLevel,
      defaultMessageNotifications: this.defaultMessageNotifications,
      explicitContentFilter: this.explicitContentFilter,
      roles: this.roles,
      emojis: this.emojis,
      features: this.features,
      mfaLevel: this.mfaLevel,
      applicationId: this.applicationId,
      systemChannelId: this.systemChannelId,
      systemChannelFlags: this.systemChannelFlags,
      rulesChannelId: this.rulesChannelId,
      maxPresences: this.maxPresences,
      maxMembers: this.maxMembers,
      vanityURLCode: this.vanityURLCode,
      description: this.description,
      banner: this.banner,
      premiumTier: this.premiumTier,
      premiumSubscriptionCount: this.premiumSubscriptionCount,
      preferredLocale: this.preferredLocale,
      publicUpdatesChannelId: this.publicUpdatesChannelId,
      maxVideoChannelUsers: this.maxVideoChannelUsers,
      approximateMemberCount: this.approximateMemberCount,
      approximatePresenceCount: this.approximatePresenceCount,
      welcomeScreen: this.welcomeScreen,
      nsfwLevel: this.nsfwLevel,
      stickers: this.stickers,
      premiumProgressBarEnabled: this.premiumProgressBarEnabled,
      safetyAlertsChannelId: this.safetyAlertsChannelId,
    };
  }
}
