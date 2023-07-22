import type { User } from "../structures";
import type {
  JSONDefaultReaction,
  JSONEmoji,
  JSONForumTag,
  JSONOverwrite,
  JSONRoleTags,
  JSONSelectOption,
  JSONThreadMember,
  JSONThreadMetadata,
} from "../types";
import {
  ApplicationCommandOptionType,
  ChannelTypes,
  ComponentTypes,
  Locale,
  UserFlags,
} from "./constants";

export function rawApplicationCommand(command: {
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
}) {
  return {
    name: command?.name,
    name_localizations: command?.nameLocalizations,
    description: command?.description,
    description_localizations: command?.descriptionLocalizations,
    options: command?.options?.map((option) => ({
      type: option.type,
      name: option.name,
      name_localizations: option?.nameLocalizations,
      description: option.description,
      description_localizations: option?.descriptionLocalizations,
      required: option?.required,
      choices: option?.choices,
      command: option?.options?.map((o) => ({
        type: o.type,
        name: o.name,
        name_localizations: o?.nameLocalizations,
        description: o.description,
        description_localizations: o?.descriptionLocalizations,
        required: o?.required,
        choices: o?.choices,
        channel_types: o?.channelTypes,
        min_value: o?.minValue,
        max_value: o?.maxValue,
        min_length: o?.minLength,
        max_length: o?.maxLength,
        autocomplete: o?.autocomplete,
      })),
    })),
    default_member_permissions: command?.defaultMemberPermissions,
    default_permission: command?.defaultPermission,
    nsfw: command?.nsfw,
  };
}

export function rawMessageComponent(
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<
      | {
          type: ComponentTypes.Button;
          style: number;
          label?: string;
          emoji?: JSONEmoji;
          customId?: string;
          url?: string;
          disabled?: boolean;
        }
      | {
          type:
            | ComponentTypes.SelectMenu
            | ComponentTypes.ChannelSelect
            | ComponentTypes.MentionableSelect
            | ComponentTypes.RoleSelect
            | ComponentTypes.UserSelect;
          customId: string;
          options?: Array<JSONSelectOption>;
          channelTypes?: Array<ChannelTypes>;
          placeholder?: string;
          minValues?: number;
          maxValues?: number;
          disabled?: boolean;
        }
      | {
          type: ComponentTypes.TextInput;
          customId: string;
          style: number;
          label: string;
          minLength?: number;
          maxLength?: number;
          required?: boolean;
          value?: string;
          placeholder?: string;
        }
    >;
  }>
) {
  return components.map((component) => ({
    type: component.type,
    components: component.components.map((c) => {
      if (c.type === ComponentTypes.Button) {
        return {
          type: c.type,
          style: c.style,
          label: c?.label,
          emoji:
            c?.emoji !== undefined
              ? {
                  id: c?.emoji.id,
                  name: c?.emoji.name,
                  roles: c?.emoji?.roles,
                  user: {
                    id: c?.emoji?.user?.id,
                    username: c?.emoji?.user?.username,
                    discriminator: c?.emoji?.user?.discriminator,
                    avatar: c?.emoji?.user?.avatar,
                    bot: c?.emoji?.user?.bot,
                    system: c?.emoji?.user?.system,
                    mfa_enabled: c?.emoji?.user?.mfaEnabled,
                    banner: c?.emoji?.user?.banner,
                    accent_color: c?.emoji?.user?.accentColor,
                    locale: c?.emoji?.user?.locale,
                    verified: c?.emoji?.user?.verified,
                    email: c?.emoji?.user?.email,
                    flags: c?.emoji?.user?.flags,
                    premium_type: c?.emoji?.user?.premiumType,
                    public_flags: c?.emoji?.user?.publicFlags,
                  },
                  require_colons: c?.emoji?.requireColons,
                  managed: c?.emoji?.managed,
                  animated: c?.emoji?.animated,
                  available: c?.emoji?.available,
                }
              : undefined,
          custom_id: c?.customId,
          url: c?.url,
          disabled: c?.disabled,
        };
      } else if (c.type === ComponentTypes.TextInput) {
        return {
          type: c.type,
          custom_id: c.customId,
          style: c.style,
          label: c.label,
          min_length: c.minLength,
          max_length: c.maxLength,
          required: c.required,
          value: c.value,
          placeholder: c.placeholder,
        };
      } else if (c.type === ComponentTypes.ChannelSelect) {
        return {
          type: c.type,
          custom_id: c.customId,
          channel_types: c.channelTypes,
          placeholder: c.placeholder,
          min_values: c.minValues,
          max_values: c.maxValues,
          disabled: c.disabled,
        };
      } else if (c.type === ComponentTypes.SelectMenu) {
        return {
          type: c.type,
          custom_id: c.customId,
          placeholder: c.placeholder,
          options: c.options?.map((option) => ({
            label: option.label,
            value: option.value,
            description: option?.description,
            emoji:
              option?.emoji !== undefined
                ? {
                    id: option?.emoji.id,
                    name: option?.emoji.name,
                    roles: option?.emoji?.roles,
                    user: {
                      id: option?.emoji?.user?.id,
                      username: option?.emoji?.user?.username,
                      discriminator: option?.emoji?.user?.discriminator,
                      avatar: option?.emoji?.user?.avatar,
                      bot: option?.emoji?.user?.bot,
                      system: option?.emoji?.user?.system,
                      mfa_enabled: option?.emoji?.user?.mfaEnabled,
                      banner: option?.emoji?.user?.banner,
                      accent_color: option?.emoji?.user?.accentColor,
                      locale: option?.emoji?.user?.locale,
                      verified: option?.emoji?.user?.verified,
                      email: option?.emoji?.user?.email,
                      flags: option?.emoji?.user?.flags,
                      premium_type: option?.emoji?.user?.premiumType,
                      public_flags: option?.emoji?.user?.publicFlags,
                    },
                    require_colons: option?.emoji?.requireColons,
                    managed: option?.emoji?.managed,
                    animated: option?.emoji?.animated,
                    available: option?.emoji?.available,
                  }
                : undefined,
            default: option?.default,
          })),
          min_values: c.minValues,
          max_values: c.maxValues,
          disabled: c.disabled,
        };
      } else if (
        c.type === ComponentTypes.MentionableSelect ||
        c.type === ComponentTypes.RoleSelect ||
        c.type === ComponentTypes.UserSelect
      ) {
        return {
          type: c.type,
          custom_id: c.customId,
          placeholder: c.placeholder,
          min_values: c.minValues,
          max_values: c.maxValues,
          disabled: c.disabled,
        };
      }
    }),
  }));
}

export function rawRole(role: {
  guildId?: string;
  id?: string;
  name?: string;
  color?: number;
  hoist?: boolean;
  icon?: string | null;
  unicodeEmoji?: string | null;
  position?: number;
  permissions?: string;
  managed?: boolean;
  mentionable?: boolean;
  tags?: JSONRoleTags;
}) {
  return {
    guild_id: role.guildId,
    id: role.id,
    name: role.name,
    color: role.color,
    hoist: role.hoist,
    icon: role.icon,
    unicode_emoji: role.unicodeEmoji,
    position: role.position,
    permissions: role.permissions,
    managed: role.managed,
    mentionable: role.mentionable,
    tags: {
      bot_id: role.tags?.botId,
      integration_id: role.tags?.integrationId,
      premium_subscriber: role.tags?.premiumSubscriber,
      subscription_listing_id: role.tags?.subscriptionListingId,
      available_for_purchase: role.tags?.availableForPurchase,
      guild_connections: role.tags?.guildConnections,
    },
  };
}

export function rawUser(user: {
  id?: string;
  username?: string;
  discriminator?: string;
  globalName?: string | null;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfaEnabled?: boolean;
  banner?: string;
  accentColor?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: UserFlags;
  premiumType?: number;
  publicFlags?: UserFlags;
}) {
  return {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    global_name: user.globalName,
    avatar: user.avatar,
    bot: user.bot,
    system: user.system,
    mfa_enabled: user.mfaEnabled,
    banner: user.banner,
    accent_color: user.accentColor,
    locale: user.locale,
    verified: user.verified,
    email: user.email,
    flags: user.flags,
    premium_type: user.premiumType,
    public_flags: user.publicFlags,
  };
}

export function rawChannel(channel: {
  id?: string;
  type?: ChannelTypes;
  guildId?: string;
  position?: number;
  permissionOverwrites?: Array<JSONOverwrite>;
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  lastMessageId?: string | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  recipients?: Array<User>;
  icon?: string | null;
  ownerId?: string;
  applicationId?: string;
  managed?: boolean;
  parentId?: string | null;
  lastPinTimestamp?: number | null;
  rtcRegion?: string | null;
  videoQualityMode?: number;
  messageCount?: number;
  memberCount?: number;
  threadMetadata?: JSONThreadMetadata;
  member?: JSONThreadMember;
  defaultAutoArchiveDuration?: number;
  permissions?: string;
  flags?: number;
  totalMessageSent?: number;
  availableTags?: Array<JSONForumTag>;
  appliedTags?: Array<string>;
  defaultReactionEmoji?: JSONDefaultReaction | null;
  defaultThreadRateLimitPerUser?: number;
  defaultSortOrder?: number | null;
  defaultForumLayout?: number;
}) {
  return {
    id: channel.id,
    type: channel.type,
    guild_id: channel.guildId,
    position: channel.position,
    permission_overwrites: channel.permissionOverwrites?.map((overwrite) => ({
      id: overwrite.id,
      type: overwrite.type,
      allow: overwrite.allow,
      deny: overwrite.deny,
    })),
    name: channel.name,
    topic: channel.topic,
    nsfw: channel.nsfw,
    last_message_id: channel.lastMessageId,
    bitrate: channel.bitrate,
    user_limit: channel.userLimit,
    rate_limit_per_user: channel.rateLimitPerUser,
    recipients: channel.recipients?.map((recipient) => rawUser(recipient)),
    icon: channel.icon,
    owner_id: channel.ownerId,
    application_id: channel.applicationId,
    managed: channel.managed,
    parent_id: channel.parentId,
    last_pin_timestamp: channel.lastPinTimestamp,
    rtc_region: channel.rtcRegion,
    video_quality_mode: channel.videoQualityMode,
    message_count: channel.messageCount,
    member_count: channel.memberCount,
    thread_metadata: {
      archived: channel.threadMetadata?.archived,
      auto_archive_duration: channel.threadMetadata?.autoArchiveDuration,
      archive_timestamp: channel.threadMetadata?.archiveTimestamp,
      locked: channel.threadMetadata?.locked,
      invitable: channel.threadMetadata?.invitable,
      create_timestamp: channel.threadMetadata?.createTimestamp,
    },
    member: {
      id: channel.member?.id,
      user_id: channel.member?.userId,
      join_timestamp: channel.member?.joinTimestamp,
      flags: channel.member?.flags,
      member: {
        guild_id: channel.member?.member?.guildId,
        user:
          channel.member?.member?.user !== undefined
            ? rawUser(channel.member?.member?.user)
            : undefined,
        nick: channel.member?.member?.nick,
        avatar: channel.member?.member?.avatar,
        roles: channel.member?.member?.roles,
        joined_at: channel.member?.member?.joinedAt,
        premium_since: channel.member?.member?.premiumSince,
        deaf: channel.member?.member?.deaf,
        mute: channel.member?.member?.mute,
        flags: channel.member?.member?.flags,
        pending: channel.member?.member?.pending,
        permissions: channel.member?.member?.permissions,
        communication_disabled_until:
          channel.member?.member?.communicationDisabledUntil,
      },
    },
    default_auto_archive_duration: channel.defaultAutoArchiveDuration,
    permissions: channel.permissions,
    flags: channel.flags,
    total_message_sent: channel.totalMessageSent,
    available_tags: channel.availableTags?.map((availableTag) => ({
      id: availableTag.id,
      name: availableTag.name,
      moderated: availableTag.moderated,
      emoji_id: availableTag.emojiId,
      emoji_name: availableTag.emojiName,
    })),
    applied_tags: channel.appliedTags,
    default_reaction_emoji: {
      emoji_id: channel.defaultReactionEmoji?.emojiId,
      emoji_name: channel.defaultReactionEmoji?.emojiName,
    },
    default_thread_rate_limit_per_user: channel.defaultThreadRateLimitPerUser,
    default_sort_order: channel.defaultSortOrder,
    default_forum_layout: channel.defaultForumLayout,
  };
}
