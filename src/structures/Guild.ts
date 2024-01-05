import {
  ApplicationCommand,
  AutoModerationRule,
  Base,
  Channel,
  Emoji,
  GuildMember,
  GuildScheduledEvent,
  GuildTemplate,
  Integration,
  Invite,
  Role,
  StageInstance,
  Sticker,
  User,
  VoiceState,
  Webhook,
} from ".";
import type { Client } from "../Client";
import { Endpoints, type File } from "../rest";
import type {
  JSONApplicationCommandOptionChoice,
  JSONAuditLog,
  JSONAutoModerationAction,
  JSONBan,
  JSONDefaultReaction,
  JSONForumTag,
  JSONGuild,
  JSONGuildApplicationCommandPermissions,
  JSONGuildOnboarding,
  JSONGuildPreview,
  JSONGuildScheduledEventEntityMetadata,
  JSONGuildScheduledEventUser,
  JSONGuildTemplate,
  JSONGuildWidget,
  JSONGuildWidgetSettings,
  JSONOnboardingPrompt,
  JSONOverwrite,
  PresenceUpdateEventFields,
  JSONThreadMember,
  JSONVoiceRegion,
  JSONWelcomeScreen,
  JSONWelcomeScreenChannel,
  RawApplicationCommand,
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
  RawRole,
  RawSticker,
  RawThreadMember,
  RawVoiceRegion,
  RawWebhook,
  RawWelcomeScreen,
  RawGuildCreateEventExtraFields,
  JSONGuildCreateEventExtraFields,
} from "../types";
import type {
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
} from "../constants";
import { File as UndiciFile, FormData } from "undici";

/** https://discord.com/developers/docs/resources/guild */
export class Guild extends Base {
  protected override raw: RawGuild & Partial<RawGuildCreateEventExtraFields>;
  name: string;
  icon: string | null;
  iconHash?: string | null;
  splash: string | null;
  discoverySplash: string | null;
  owner?: boolean;
  ownerId: string;
  permissions?: string;
  region?: string | null;
  afkChannelId: string | null;
  afkTimeout: number;
  widgetEnabled?: boolean;
  widgetChannelId?: string | null;
  verificationLevel: VerificationLevel;
  defaultMessageNotifications: DefaultMessageNotificationLevel;
  explicitContentFilter: ExplicitContentFilterLevel;
  roles: Array<Role>;
  emojis: Array<Emoji>;
  features: Array<GuildFeatures>;
  mfaLevel: MFALevel;
  applicationId: string | null;
  systemChannelId: string | null;
  systemChannelFlags: number;
  rulesChannelId: string | null;
  maxPresences?: number | null;
  maxMembers?: number;
  vanityURLCode: string | null;
  description: string | null;
  banner: string | null;
  premiumTier: PremiumTier;
  premiumSubscriptionCount?: number;
  preferredLocale: string;
  publicUpdatesChannelId: string | null;
  maxVideoChannelUsers?: number;
  maxStageVideoChannelUsers?: number;
  approximateMemberCount?: number;
  approximatePresenceCount?: number;
  welcomeScreen?: JSONWelcomeScreen;
  nsfwLevel: GuildNSFWLevel;
  stickers?: Array<Sticker>;
  premiumProgressBarEnabled: boolean;
  safetyAlertsChannelId: string | null;
  joinedAt?: number;
  large?: boolean;
  unavailable?: boolean;
  memberCount?: number;
  voiceStates?: Array<VoiceState>;
  members?: Array<GuildMember>;
  channels?: Array<Channel>;
  threads?: Array<Channel>;
  presences?: Array<PresenceUpdateEventFields>;
  stageInstances?: Array<StageInstance>;
  guildScheduledEvents?: Array<GuildScheduledEvent>;

  constructor(
    data: RawGuild & Partial<RawGuildCreateEventExtraFields>,
    client: Client
  ) {
    super(data.id, client);

    this.raw = data;
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
    this.roles = data.roles?.map((role) => new Role(role, client));
    this.emojis = data.emojis?.map((emoji) => new Emoji(emoji, client));
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

    this.patch(data);
  }

  protected override patch(
    data: RawGuild & Partial<RawGuildCreateEventExtraFields>
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
    if (data.max_stage_video_channel_users !== undefined)
      this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;
    if (data.approximate_member_count !== undefined)
      this.approximateMemberCount = data.approximate_member_count;
    if (data.approximate_presence_count !== undefined)
      this.approximatePresenceCount = data.approximate_presence_count;
    if (data.welcome_screen !== undefined)
      this.welcomeScreen = {
        description: data.welcome_screen.description,
        welcomeChannels: data.welcome_screen.welcome_channels.map(
          (welcomeChannel) => ({
            channelId: welcomeChannel.channel_id,
            description: welcomeChannel.description,
            emojiId: welcomeChannel.emoji_id,
            emojiName: welcomeChannel.emoji_name,
          })
        ),
      };
    if (data.stickers !== undefined)
      this.stickers = data.stickers.map(
        (data) => new Sticker(data, this.client)
      );
    if (data.joined_at !== undefined) this.joinedAt = data.joined_at;
    if (data.large !== undefined) this.large = data.large;
    if (data.unavailable !== undefined) this.unavailable = data.unavailable;
    if (data.member_count !== undefined) this.memberCount = data.member_count;
    if (data.voice_states !== undefined)
      this.voiceStates = data.voice_states.map(
        (voiceState) => new VoiceState(voiceState, this.client)
      );
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
        activities: presence.activities.map((activity) => ({
          name: activity.name,
          type: activity.type,
          url: activity.url,
          createdAt: activity.created_at,
          timestamps: activity.timestamps,
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
        clientStatus: presence.client_status,
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

  /** https://discord.com/developers/docs/resources/guild#add-guild-member */
  async addMember(
    userId: string,
    options: {
      accessToken: string;
      nick?: string;
      roles?: Array<string>;
      mute?: boolean;
      deaf?: boolean;
    }
  ): Promise<GuildMember | null> {
    return this.client.rest
      .put<RawGuildMember>(Endpoints.guildMember(this.id, userId), {
        json: {
          access_token: options.accessToken,
          nick: options.nick,
          roles: options.roles,
          mute: options.mute,
          deaf: options.deaf,
        },
      })
      .then((response) => {
        if (response !== null) {
          return new GuildMember(response, this.client);
        } else return null;
      });
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  addMemberRole(userId: string, roleId: string, reason?: string): void {
    this.client.rest.put(Endpoints.guildMemberRole(this.id, userId, roleId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  async bulkEditApplicationCommands(
    applicationId: string,
    commands: Array<{
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
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
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
    }>
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .put<Array<RawApplicationCommand>>(
        Endpoints.applicationGuildCommands(applicationId, this.id),
        {
          json: commands.map((command) =>
            this.client.util.applicationCommandToRaw(command)
          ),
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
  async beginGuildPrune(
    options: {
      days: number;
      computePruneCount: boolean;
      includeRoles: Array<string>;
      reason?: string;
    },
    reason?: string
  ): Promise<number> {
    return this.client.rest.post<number>(Endpoints.guildPrune(this.id), {
      json: {
        days: options.days,
        compute_prune_count: options.computePruneCount,
        include_roles: options.includeRoles,
        reason: options.reason,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  async createApplicationCommand(
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
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
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
      await this.client.rest.post<RawApplicationCommand>(
        Endpoints.applicationGuildCommands(applicationId, this.id),
        {
          json: this.client.util.applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule */
  async createAutoModerationRule(
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
      await this.client.rest.post<RawAutoModerationRule>(
        Endpoints.guildAutoModerationRules(this.id),
        {
          json: {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options.triggerMetadata,
            actions: options.actions.map((action) => ({
              type: action.type,
              metadata: {
                channel_id: action.metadata.channelId,
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
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  createBan(
    userId: string,
    options?: {
      deleteMessageDays?: number;
      deleteMessageSeconds?: number;
    },
    reason?: string
  ): void {
    this.client.rest.put(Endpoints.guildBan(this.id, userId), {
      json: {
        delete_message_days: options?.deleteMessageDays,
        delete_message_seconds: options?.deleteMessageSeconds,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-channel */
  async createChannel(
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
      defaultThreadRateLimitPerUser?: number;
    },
    reason?: string
  ): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(
        Endpoints.guildChannels(this.id),
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
            default_reaction_emoji: {
              emojiId: options.defaultReactionEmoji?.emojiId,
              emojiName: options.defaultReactionEmoji?.emojiName,
            },
            available_tags: options.availableTags,
            default_sort_order: options.defaultSortOrder,
            default_forum_layout: options.defaultForumLayout,
            default_thread_rate_limit_per_user:
              options.defaultThreadRateLimitPerUser,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
  async createEmoji(
    options: {
      name: string;
      image: string;
      roles: Array<string>;
    },
    reason?: string
  ): Promise<Emoji> {
    return new Emoji(
      await this.client.rest.post<RawEmoji>(Endpoints.guildEmojis(this.id), {
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

  /** https://discord.com/developers/docs/resources/guild#create-guild-role */
  async createRole(
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
      await this.client.rest.post<RawRole>(Endpoints.guildRoles(this.id), {
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

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event */
  async createScheduledEvent(
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
      await this.client.rest.post<RawGuildScheduledEvent>(
        Endpoints.guildScheduledEvents(this.id),
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
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#create-guild-sticker */
  async createSticker(
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
    formData.set(
      "file",
      new UndiciFile([options.file.contents], options.file.name)
    );

    return this.client.rest
      .post<RawSticker>(Endpoints.guildStickers(this.id), {
        form: formData,
        reason,
      })
      .then((response) => new Sticker(response, this.client));
  }

  /** https://discord.com/developers/docs/resources/guild-template#create-guild-template */
  async createTemplate(options: {
    name: string;
    description?: string | null;
  }): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.post<RawGuildTemplate>(
        Endpoints.guildTemplates(this.id),
        {
          json: {
            name: options.name,
            description: options.description,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild */
  delete(): void {
    this.client.rest.delete(Endpoints.guild(this.id));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  deleteApplicationCommand(applicationId: string, commandId: string): void {
    this.client.rest.delete(
      Endpoints.applicationGuildCommand(applicationId, this.id, commandId)
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
  deleteAutoModerationRule(ruleId: string, reason?: string): void {
    this.client.rest.delete(
      Endpoints.guildAutoModerationRule(this.id, ruleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  deleteEmoji(emojiId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.guildEmoji(this.id, emojiId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  deleteIntegration(integrationId: string, reason?: string): void {
    this.client.rest.delete(
      Endpoints.guildIntegration(this.id, integrationId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-role */
  deleteRole(roleId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.guildRole(this.id, roleId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event */
  deleteScheduledEvent(scheduledEventId: string): void {
    this.client.rest.delete(
      Endpoints.guildScheduledEvent(this.id, scheduledEventId)
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
  deleteSticker(stickerId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.guildSticker(this.id, stickerId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  async deleteTemplate(code: string): Promise<JSONGuildTemplate> {
    return this.client.rest
      .delete<RawGuildTemplate>(Endpoints.guildTemplate(this.id, code))
      .then((response) => new GuildTemplate(response, this.client).toJSON());
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild */
  async edit(
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
      await this.client.rest.patch<RawGuild>(Endpoints.guild(this.id), {
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
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  async editApplicationCommand(
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
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
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
      await this.client.rest.patch<RawApplicationCommand>(
        Endpoints.applicationGuildCommand(applicationId, this.id, commandId),
        {
          json: this.client.util.applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
  async editAutoModerationRule(
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
      await this.client.rest.patch<RawAutoModerationRule>(
        Endpoints.guildAutoModerationRule(this.id, ruleId),
        {
          json: {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options.triggerMetadata,
            actions: options.actions?.map((action) => ({
              type: action.type,
              metadata: {
                channel_id: action.metadata.channelId,
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
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
  editChannelPositions(
    options: Array<{
      id: string;
      position?: number | null;
      lockPermissions?: boolean | null;
      parentId?: string | null;
    }>
  ): void {
    this.client.rest.patch(Endpoints.guildChannels(this.id), {
      json: options.map((data) => ({
        id: data.id,
        position: data.position,
        lock_permissions: data.lockPermissions,
        parent_id: data.parentId,
      })),
    });
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-member */
  async editCurrentMember(
    options: {
      nick: string | null;
    },
    reason?: string
  ): Promise<GuildMember> {
    return new GuildMember(
      await this.client.rest.patch(Endpoints.guildMember(this.id), {
        json: {
          nick: options.nick,
        },
        reason,
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state */
  editCurrentUserVoiceState(options: {
    channelId?: string;
    suppress?: boolean;
    requestToSpeakTimestamp?: string | null;
  }): void {
    this.client.rest.patch(Endpoints.guildVoiceState(this.id), {
      json: {
        channel_id: options.channelId,
        suppress: options.suppress,
        requestToSpeakTimestamp: options.requestToSpeakTimestamp,
      },
    });
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  async editEmoji(
    emojiId: string,
    options: {
      name?: string;
      roles?: Array<string> | null;
    },
    reason?: string
  ): Promise<Emoji> {
    return new Emoji(
      await this.client.rest.patch<RawEmoji>(
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

  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  async editMember(
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
  ): Promise<GuildMember> {
    return new GuildMember(
      await this.client.rest.patch(Endpoints.guildMember(this.id, userId), {
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
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level */
  async editMFALevel(
    options: {
      level: MFALevel;
    },
    reason?: string
  ): Promise<number> {
    return this.client.rest.post<number>(Endpoints.guildMFA(this.id), {
      json: {
        level: options.level,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-onboarding */
  editOnboarding(
    options: {
      prompts: Array<JSONOnboardingPrompt>;
      defaultChannelIds: Array<string>;
      enabled: boolean;
      mode: OnboardingMode;
    },
    reason?: string
  ): void {
    this.client.rest.patch(Endpoints.guildOnboarding(this.id), {
      json: {
        prompts: options.prompts.map((prompt) => ({
          id: prompt.id,
          type: prompt.type,
          options: prompt.options.map((option) => ({
            id: option.id,
            channel_ids: option.channelIds,
            role_ids: option.roleIds,
            emoji:
              option.emoji !== undefined
                ? {
                    id: option.emoji.id,
                    name: option.emoji.name,
                    roles: option.emoji.roles,
                    user: option.emoji.user,
                    require_colons: option.emoji.requireColons,
                    managed: option.emoji.managed,
                    animated: option.emoji.animated,
                    available: option.emoji.available,
                  }
                : undefined,
            emoji_id: option.emojiId,
            emoji_name: option.emojiName,
            emoji_animated: option.emojiAnimated,
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

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role */
  async editRole(
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
    return new Role(
      await this.client.rest.patch<RawRole>(
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

  /** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
  async editRolePositions(
    options: Array<{
      id: string;
      position?: number | null;
    }>
  ): Promise<Array<Role>> {
    return this.client.rest
      .patch<Array<RawRole>>(Endpoints.guildRoles(this.id), {
        json: options.map((data) => ({
          id: data.id,
          position: data.position,
        })),
      })
      .then((response) => response.map((data) => new Role(data, this.client)));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
  async editScheduledEvent(
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
      await this.client.rest.patch<RawGuildScheduledEvent>(
        Endpoints.guildScheduledEvent(this.id, scheduledEventId),
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
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
  async editSticker(
    stickerId: string,
    options: {
      name?: string;
      description?: string;
      tags?: string;
    },
    reason?: string
  ): Promise<Sticker> {
    return this.client.rest
      .patch<RawSticker>(Endpoints.guildSticker(this.id, stickerId), {
        json: {
          name: options.name,
          description: options.description,
          tags: options.tags,
        },
        reason,
      })
      .then((response) => new Sticker(response, this.client));
  }

  /** https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  async editTemplate(
    code: string,
    options: {
      name?: string;
      description?: string | null;
    }
  ): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.patch<RawGuildTemplate>(
        Endpoints.guildTemplate(this.id, code),
        {
          json: {
            name: options.name,
            description: options.description,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#modify-user-voice-state */
  editUserVoiceState(
    userId: string,
    options: {
      channelId?: string;
      suppress?: boolean;
      requestToSpeakTimestamp?: string | null;
    }
  ): void {
    this.client.rest.patch(Endpoints.guildVoiceState(this.id, userId), {
      json: {
        channel_id: options.channelId,
        suppress: options.suppress,
        requestToSpeakTimestamp: options.requestToSpeakTimestamp,
      },
    });
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
  async editWelcomeScreen(
    options: {
      enabled?: boolean | null;
      welcomeChannels?: Array<JSONWelcomeScreenChannel> | null;
      description?: string | null;
    },
    reason?: string
  ): Promise<JSONWelcomeScreen> {
    return this.client.rest
      .patch<RawWelcomeScreen>(Endpoints.guildWelcomeScreen(this.id), {
        json: {
          enabled: options.enabled,
          welcome_channels: options.welcomeChannels,
          description: options.description,
        },
        reason,
      })
      .then((response) => ({
        description: response.description,
        welcomeChannels: response.welcome_channels.map((data) => ({
          channelId: data.channel_id,
          description: data.description,
          emojiId: data.emoji_id,
          emojiName: data.emoji_name,
        })),
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-widget */
  async editWidget(
    options: {
      enabled?: boolean;
      channelId?: boolean;
    },
    reason?: string
  ): Promise<JSONGuildWidgetSettings> {
    return this.client.rest
      .patch<RawGuildWidgetSettings>(Endpoints.guildWidgetSettings(this.id), {
        json: {
          enabled: options.enabled,
          channel_id: options.channelId,
        },
        reason,
      })
      .then((response) => ({
        enabled: response.enabled,
        channelId: response.channel_id,
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#list-active-guild-threads */
  async getActiveThreads(): Promise<
    Array<{
      threads: Array<Channel>;
      members: Array<JSONThreadMember>;
    }>
  > {
    return this.client.rest
      .get<
        Array<{
          threads: Array<RawChannel>;
          members: Array<RawThreadMember>;
        }>
      >(Endpoints.guildActiveThreads(this.id))
      .then((response) =>
        response.map((data) => ({
          threads: data.threads.map((data) => new Channel(data, this.client)),
          members: data.members.map((data) => ({
            id: data.id,
            userId: data.user_id,
            joinTimestamp: data.join_timestamp,
            flags: data.flags,
            member:
              data.member !== undefined
                ? new GuildMember(data.member, this.client)
                : undefined,
          })),
        }))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  async getApplicationCommand(
    applicationId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.get<RawApplicationCommand>(
        Endpoints.applicationGuildCommand(applicationId, this.id, commandId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
  async getApplicationCommands(
    applicationId: string,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .get<Array<RawApplicationCommand>>(
        Endpoints.applicationGuildCommands(applicationId, this.id),
        {
          query: {
            with_localizations: options?.withLocalizations,
          },
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  async getApplicationCommandPermissions(
    applicationId: string,
    commandId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .get<Array<RawGuildApplicationCommandPermissions>>(
        Endpoints.applicationCommandPermissions(
          applicationId,
          this.id,
          commandId
        )
      )
      .then((response) =>
        response.map((permissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map((permission) => ({
            id: permission.id,
            type: permission.type,
            permission: permission.permission,
          })),
        }))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  async getApplicationCommandsPermissions(
    applicationId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .get<Array<RawGuildApplicationCommandPermissions>>(
        Endpoints.guildApplicationCommandsPermissions(applicationId, this.id)
      )
      .then((response) =>
        response.map((permissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map((permission) => ({
            id: permission.id,
            type: permission.type,
            permission: permission.permission,
          })),
        }))
      );
  }

  /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
  async getAuditLog(options?: {
    userId?: string;
    actionType?: number;
    before?: string;
    after?: string;
    limit?: number;
  }): Promise<JSONAuditLog> {
    return this.client.rest
      .get<RawAuditLog>(Endpoints.guildAuditLog(this.id), {
        query: {
          user_id: options?.userId,
          action_type: options?.actionType,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
        },
      })
      .then((response) => ({
        applicationCommands: response.application_commands.map(
          (applicationCommand) =>
            new ApplicationCommand(applicationCommand, this.client)
        ),
        auditLogEntries: response.audit_log_entries.map((auditLogEntry) => ({
          targetId: auditLogEntry.target_id,
          changes: auditLogEntry.changes?.map((change) => ({
            newValue: change.new_value,
            oldValue: change.old_value,
            key: change.key,
          })),
          userId: auditLogEntry.user_id,
          id: auditLogEntry.id,
          actionType: auditLogEntry.action_type,
          options:
            auditLogEntry.options !== undefined
              ? {
                  applicationId: auditLogEntry.options.application_id,
                  autoModerationRuleName:
                    auditLogEntry.options.auto_moderation_rule_name,
                  autoModerationRuleTriggerType:
                    auditLogEntry.options.auto_moderation_rule_trigger_type,
                  channelId: auditLogEntry.options.channel_id,
                  count: auditLogEntry.options.count,
                  deleteMemberDays: auditLogEntry.options.delete_member_days,
                  id: auditLogEntry.options.id,
                  membersRemoved: auditLogEntry.options.members_removed,
                  messageId: auditLogEntry.options.message_id,
                  roleName: auditLogEntry.options.role_name,
                  type: auditLogEntry.options.type,
                  integrationType: auditLogEntry.options.integration_type,
                }
              : undefined,
          reason: auditLogEntry.reason,
        })),
        autoModerationRules: response.auto_moderation_rules.map(
          (autoModerationRule) =>
            new AutoModerationRule(autoModerationRule, this.client)
        ),
        guildScheduledEvents: response.guild_scheduled_events.map(
          (guildScheduledEvent) =>
            new GuildScheduledEvent(guildScheduledEvent, this.client)
        ),
        integrations: response.integrations.map(
          (integration) => new Integration(integration, this.client)
        ),
        threads: response.threads.map(
          (thread) => new Channel(thread, this.client)
        ),
        users: response.users.map((user) => new User(user, this.client)),
        webhooks: response.webhooks.map(
          (webhook) => new Webhook(webhook, this.client)
        ),
      }));
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule */
  async getAutoModerationRule(ruleId: string): Promise<AutoModerationRule> {
    return new AutoModerationRule(
      await this.client.rest.get<RawAutoModerationRule>(
        Endpoints.guildAutoModerationRule(this.id, ruleId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild */
  async getAutoModerationRules(): Promise<Array<AutoModerationRule>> {
    return this.client.rest
      .get<Array<RawAutoModerationRule>>(
        Endpoints.guildAutoModerationRules(this.id)
      )
      .then((response) =>
        response.map((data) => new AutoModerationRule(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-ban */
  async getBan(userId: string): Promise<JSONBan> {
    return this.client.rest
      .get<RawBan>(Endpoints.guildBan(this.id, userId))
      .then((response) => ({
        reason: response.reason,
        user: new User(response.user, this.client),
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-bans */
  async getBans(options?: {
    limit?: number;
    before?: string;
    after?: string;
  }): Promise<Array<JSONBan>> {
    return this.client.rest
      .get<Array<RawBan>>(Endpoints.guildBans(this.id), {
        query: {
          limit: options?.limit,
          before: options?.before,
          after: options?.after,
        },
      })
      .then((response) =>
        response.map((data) => ({
          reason: data.reason,
          user: new User(data.user, this.client),
        }))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-channels */
  async getChannels(): Promise<Array<Channel>> {
    return this.client.rest
      .get<Array<RawChannel>>(Endpoints.guildChannels(this.id))
      .then((response) =>
        response.map((data) => new Channel(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
  async getEmoji(emojiId: string): Promise<Emoji> {
    return new Emoji(
      await this.client.rest.get<RawEmoji>(
        Endpoints.guildEmoji(this.id, emojiId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
  async getEmojis(): Promise<Array<Emoji>> {
    return this.client.rest
      .get<Array<RawEmoji>>(Endpoints.guildEmojis(this.id))
      .then((response) => response.map((data) => new Emoji(data, this.client)));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-integrations */
  async getIntegrations(): Promise<Array<Integration>> {
    return this.client.rest
      .get<Array<RawIntegration>>(Endpoints.guildIntegrations(this.id))
      .then((response) =>
        response.map((data) => new Integration(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-invites */
  async getInvites(): Promise<Array<Invite>> {
    return this.client.rest
      .get<Array<RawInvite>>(Endpoints.guildInvites(this.id))
      .then((response) =>
        response.map((data) => new Invite(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-member */
  async getMember(userId: string): Promise<GuildMember> {
    return new GuildMember(
      await this.client.rest.get<RawGuildMember>(
        Endpoints.guildMember(this.id, userId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#list-guild-members */
  async getMembers(): Promise<Array<GuildMember>> {
    return this.client.rest
      .get<Array<RawGuildMember>>(Endpoints.guildMembers(this.id))
      .then((response) =>
        response.map((data) => new GuildMember(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-onboarding */
  async getOnboarding(): Promise<JSONGuildOnboarding> {
    return this.client.rest
      .get<RawGuildOnboarding>(Endpoints.guildOnboarding(this.id))
      .then((response) => ({
        guildId: response.guild_id,
        prompts: response.prompts.map((prompt) => ({
          id: prompt.id,
          type: prompt.type,
          options: prompt.options.map((option) => ({
            id: option.id,
            channelIds: option.channel_ids,
            roleIds: option.role_ids,
            emoji:
              option.emoji !== undefined
                ? new Emoji(option.emoji, this.client)
                : undefined,
            emojiId: option.emoji_id,
            emojiName: option.emoji_name,
            emojiAnimated: option.emoji_animated,
            title: option.title,
            description: option.description,
          })),
          title: prompt.title,
          singleSelect: prompt.single_select,
          required: prompt.required,
          inOnboarding: prompt.in_onboarding,
        })),
        defaultChannelIds: response.default_channel_ids,
        enabled: response.enabled,
        mode: response.mode,
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-preview */
  async getPreview(): Promise<JSONGuildPreview> {
    return this.client.rest
      .get<RawGuildPreview>(Endpoints.guildPreview(this.id))
      .then((response) => ({
        id: response.id,
        name: response.name,
        icon: response.icon,
        splash: response.splash,
        discoverySplash: response.discovery_splash,
        emojis: response.emojis.map((emoji) => new Emoji(emoji, this.client)),
        features: response.features,
        approximateMemberCount: response.approximate_member_count,
        approximatePresenceCount: response.approximate_presence_count,
        description: response.description,
        stickers: response.stickers?.map((sticker) => ({
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
              ? new User(sticker.user, this.client)
              : undefined,
          sortValue: sticker.sort_value,
        })),
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
  async getPruneCount(options: {
    days: number;
    includeRoles: string | Array<string>;
  }): Promise<number> {
    return this.client.rest.get<number>(Endpoints.guildPrune(this.id), {
      query: {
        days: options.days,
        include_roles: options.includeRoles,
      },
    });
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-roles */
  async getRoles(): Promise<Array<Role>> {
    return this.client.rest
      .get<Array<RawRole>>(Endpoints.guildRoles(this.id))
      .then((response) => response.map((data) => new Role(data, this.client)));
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild */
  async getScheduledEvents(options?: {
    withUserCount?: boolean;
  }): Promise<Array<GuildScheduledEvent>> {
    return this.client.rest
      .get<Array<RawGuildScheduledEvent>>(
        Endpoints.guildScheduledEvents(this.id),
        {
          query: {
            with_user_count: options?.withUserCount,
          },
        }
      )
      .then((response) =>
        response.map((data) => new GuildScheduledEvent(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
  async getScheduledEventUsers(
    scheduledEventId: string,
    options?: {
      limit?: number;
      withMember?: boolean;
      before?: string;
      after?: string;
    }
  ): Promise<Array<JSONGuildScheduledEventUser>> {
    return this.client.rest
      .get<Array<RawGuildScheduledEventUser>>(
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
        response.map((data) => ({
          guildScheduledEventId: data.guild_scheduled_event_id,
          user: new User(data.user, this.client),
          member:
            data.member !== undefined
              ? new GuildMember(data.member, this.client)
              : undefined,
        }))
      );
  }

  /** https://discord.com/developers/docs/resources/sticker#get-guild-sticker */
  async getSticker(stickerId: string): Promise<Sticker> {
    return this.client.rest
      .get<RawSticker>(Endpoints.guildSticker(this.id, stickerId))
      .then((response) => new Sticker(response, this.client));
  }

  /** https://discord.com/developers/docs/resources/sticker#list-guild-stickers */
  async getStickers(): Promise<Array<Sticker>> {
    return this.client.rest
      .get<Array<RawSticker>>(Endpoints.guildStickers(this.id))
      .then((response) =>
        response.map((data) => new Sticker(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-template */
  async getTemplate(code: string): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.get<RawGuildTemplate>(
        Endpoints.guildTemplate(this.id, code)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#get-guild-templates */
  async getTemplates(): Promise<Array<GuildTemplate>> {
    return this.client.rest
      .get<Array<RawGuildTemplate>>(Endpoints.guildTemplates(this.id))
      .then((response) =>
        response.map((data) => new GuildTemplate(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
  getVanityURL(): Promise<{
    code: string;
    uses: number;
  }> {
    return this.client.rest.get<{
      code: string;
      uses: number;
    }>(Endpoints.guildVanityUrl(this.id));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
  async getVoiceRegions(): Promise<Array<JSONVoiceRegion>> {
    return this.client.rest
      .get<Array<RawVoiceRegion>>(Endpoints.guildVoiceRegions(this.id))
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

  /** https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
  async getWebhooks(): Promise<Array<Webhook>> {
    return this.client.rest
      .get<Array<RawWebhook>>(Endpoints.guildWebhooks(this.id))
      .then((response) =>
        response.map((data) => new Webhook(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen */
  async getWelcomeScreen(): Promise<JSONWelcomeScreen> {
    return this.client.rest
      .get<RawWelcomeScreen>(Endpoints.guildWelcomeScreen(this.id))
      .then((response) => ({
        description: response.description,
        welcomeChannels: response.welcome_channels.map((data) => ({
          channelId: data.channel_id,
          description: data.description,
          emojiId: data.emoji_id,
          emojiName: data.emoji_name,
        })),
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget */
  async getWidget(): Promise<JSONGuildWidget> {
    return this.client.rest
      .get<RawGuildWidget>(Endpoints.guildWidgetJSON(this.id))
      .then((response) => ({
        id: response.id,
        name: response.name,
        instantInvite: response.instant_invite,
        channels: response.channels.map(
          (data) => new Channel(data, this.client)
        ),
        members: response.members.map((data) => new User(data, this.client)),
        presenceCount: response.presence_count,
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-image */
  async getWidgetImage(options?: {
    style?: ImageWidgetStyleOptions;
  }): Promise<string> {
    return this.client.rest.get<string>(Endpoints.guildWidgetImage(this.id), {
      query: {
        style: options?.style,
      },
    });
  }

  /** https://discord.com/developers/docs/resources/guild#get-guild-widget-settings */
  async getWidgetSettings(): Promise<JSONGuildWidgetSettings> {
    return this.client.rest
      .get<RawGuildWidgetSettings>(Endpoints.guildWidgetSettings(this.id))
      .then((response) => ({
        enabled: response.enabled,
        channelId: response.channel_id,
      }));
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  removeBan(userId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.guildBan(this.id, userId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  removeMember(userId: string, reason?: string): void {
    this.client.rest.delete(Endpoints.guildMember(this.id, userId), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  removeMemberRole(userId: string, roleId: string, reason?: string): void {
    this.client.rest.delete(
      Endpoints.guildMemberRole(this.id, userId, roleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#search-guild-members */
  async searchMembers(options: {
    query: string;
    limit?: number;
  }): Promise<Array<GuildMember>> {
    return this.client.rest
      .get<Array<RawGuildMember>>(Endpoints.guildMembersSearch(this.id), {
        query: {
          query: options.query,
          limit: options.limit,
        },
      })
      .then((response) =>
        response.map((data) => new GuildMember(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  async syncTemplate(code: string): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.put<RawGuildTemplate>(
        Endpoints.guildTemplate(this.id, code)
      ),
      this.client
    );
  }

  override toRaw(): RawGuild & Partial<RawGuildCreateEventExtraFields> {
    return this.raw;
  }

  override toJSON(): JSONGuild & Partial<JSONGuildCreateEventExtraFields> {
    return {
      ...super.toJSON(),
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
      maxStageVideoChannelUsers: this.maxStageVideoChannelUsers,
      approximateMemberCount: this.approximateMemberCount,
      approximatePresenceCount: this.approximatePresenceCount,
      welcomeScreen: this.welcomeScreen,
      nsfwLevel: this.nsfwLevel,
      stickers: this.stickers,
      premiumProgressBarEnabled: this.premiumProgressBarEnabled,
      safetyAlertsChannelId: this.safetyAlertsChannelId,
      joinedAt: this.joinedAt,
      large: this.large,
      unavailable: this.unavailable,
      memberCount: this.memberCount,
      voiceStates: this.voiceStates?.map((voiceState) => voiceState.toJSON()),
      members: this.members?.map((member) => member.toJSON()),
      channels: this.channels?.map((channel) => channel.toJSON()),
      threads: this.threads?.map((thread) => thread.toJSON()),
      presences: this.presences,
      stageInstances: this.stageInstances?.map((stageInstance) =>
        stageInstance.toJSON()
      ),
      guildScheduledEvents: this.guildScheduledEvents?.map(
        (guildScheduledEvent) => guildScheduledEvent.toJSON()
      ),
    };
  }
}
