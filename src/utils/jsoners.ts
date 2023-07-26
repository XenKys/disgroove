import type { Client } from "../class";
import { User } from "../structures";
import type { RawEmbed, RawEmoji, RawSelectOption, RawTeam } from "../types";
import {
  type ApplicationCommandOptionType,
  type ChannelTypes,
  ComponentTypes,
  type Locale,
} from "./constants";

export function applicationCommandToJSON(command: {
  name?: string;
  name_localizations?: Partial<Record<Locale, string>> | null;
  description?: string;
  description_localizations?: Partial<Record<Locale, string>> | null;
  options?: Array<{
    type: ApplicationCommandOptionType;
    name: string;
    name_localizations?: Partial<Record<Locale, string>>;
    description: string;
    description_localizations?: Partial<Record<Locale, string>>;
    required?: boolean;
    choices?: Array<string>;
    options: Array<{
      type: ApplicationCommandOptionType;
      name: string;
      name_localizations?: Partial<Record<Locale, string>>;
      description: string;
      description_localizations?: Partial<Record<Locale, string>>;
      required?: boolean;
      choices?: Array<string>;
      channel_types?: ChannelTypes;
      min_value?: number;
      max_value?: number;
      min_length?: number;
      max_length?: number;
      autocomplete?: boolean;
    }>;
    channel_types?: ChannelTypes;
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
    autocomplete?: boolean;
  }>;
  default_member_permissions?: string | null;
  default_permission?: boolean | null;
  dm_permission?: boolean;
  nsfw?: boolean;
}) {
  return {
    name: command.name,
    nameLocalizations: command.name_localizations,
    description: command.description,
    descriptionLocalizations: command.description_localizations,
    options: command.options?.map((option) => ({
      type: option.type,
      name: option.name,
      nameLocalizations: option?.name_localizations,
      description: option.description,
      descriptionLocalizations: option?.description_localizations,
      required: option.required,
      choices: option.choices,
      command: option.options?.map((o) => ({
        type: o.type,
        name: o.name,
        nameLocalizations: o.name_localizations,
        description: o.description,
        descriptionLocalizations: o.description_localizations,
        required: o.required,
        choices: o.choices,
        channelTypes: o.channel_types,
        minValue: o.min_value,
        maxValue: o.max_value,
        minLength: o.min_length,
        maxLength: o.max_length,
        autocomplete: o.autocomplete,
      })),
    })),
    defaultMemberPermissions: command.default_member_permissions,
    defaultPermission: command.default_permission,
    nsfw: command.nsfw,
  };
}

export function messageComponentToJSON(
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<
      | {
          type: ComponentTypes.Button;
          style: number;
          label?: string;
          emoji?: RawEmoji;
          custom_id?: string;
          url?: string;
          disabled?: boolean;
        }
      | {
          type:
            | ComponentTypes.StringSelect
            | ComponentTypes.ChannelSelect
            | ComponentTypes.MentionableSelect
            | ComponentTypes.RoleSelect
            | ComponentTypes.UserSelect;
          custom_id: string;
          options?: Array<RawSelectOption>;
          channel_types?: Array<ChannelTypes>;
          placeholder?: string;
          min_values?: number;
          max_values?: number;
          disabled?: boolean;
        }
      | {
          type: ComponentTypes.TextInput;
          custom_id: string;
          style: number;
          label: string;
          min_length?: number;
          max_length?: number;
          required?: boolean;
          value?: string;
          placeholder?: string;
        }
    >;
  }>,
  client: Client
) {
  return components.map((component) => ({
    type: component.type,
    components: component.components.map((c) => {
      switch (c.type) {
        case ComponentTypes.Button: {
          return {
            type: c.type,
            style: c.style,
            label: c.label,
            emoji:
              c.emoji !== undefined ? emojiToJSON(c.emoji, client) : undefined,
            customId: c.custom_id,
            url: c.url,
            disabled: c.disabled,
          };
        }
        case ComponentTypes.TextInput: {
          return {
            type: c.type,
            customId: c.custom_id,
            style: c.style,
            label: c.label,
            minLength: c.min_length,
            maxLength: c.max_length,
            required: c.required,
            value: c.value,
            placeholder: c.placeholder,
          };
        }
        case ComponentTypes.ChannelSelect: {
          return {
            type: c.type,
            customId: c.custom_id,
            channelTypes: c.channel_types,
            placeholder: c.placeholder,
            minValues: c.min_values,
            maxValues: c.max_values,
            disabled: c.disabled,
          };
        }
        case ComponentTypes.StringSelect: {
          return {
            type: c.type,
            customId: c.custom_id,
            placeholder: c.placeholder,
            options: c.options?.map((option) => ({
              label: option.label,
              value: option.value,
              description: option.description,
              emoji:
                option.emoji !== undefined
                  ? emojiToJSON(option.emoji, client)
                  : undefined,
              default: option?.default,
            })),
            minValues: c.min_values,
            maxValues: c.max_values,
            disabled: c.disabled,
          };
        }
        case ComponentTypes.MentionableSelect:
        case ComponentTypes.RoleSelect:
        case ComponentTypes.UserSelect: {
          return {
            type: c.type,
            customId: c.custom_id,
            placeholder: c.placeholder,
            minValues: c.min_values,
            maxValues: c.max_values,
            disabled: c.disabled,
          };
        }
      }
    }),
  }));
}

export function embedToJSON(embeds: Array<RawEmbed>) {
  return embeds.map((embed) => ({
    title: embed.title,
    type: embed.type,
    description: embed.description,
    url: embed.url,
    timestamp: embed.timestamp,
    color: embed.color,
    footer: embed.footer
      ? {
          text: embed.footer.text,
          iconUrl: embed.footer.icon_url,
          proxyIconUrl: embed.footer.proxy_icon_url,
        }
      : undefined,
    image: embed.image
      ? {
          url: embed.image.url,
          proxyUrl: embed.image.proxy_url,
          height: embed.image.height,
          width: embed.image.width,
        }
      : undefined,
    thumbnail: embed.thumbnail
      ? {
          url: embed.thumbnail.url,
          proxyUrl: embed.thumbnail.proxy_url,
          height: embed.thumbnail.height,
          width: embed.thumbnail.width,
        }
      : undefined,
    video: {
      url: embed.video?.url,
      proxyUrl: embed.video?.proxy_url,
      height: embed.video?.height,
      width: embed.video?.width,
    },
    provider: {
      name: embed.provider?.name,
      url: embed.provider?.url,
    },
    author: embed.author
      ? {
          name: embed.author.name,
          url: embed.author.url,
          iconUrl: embed.author.icon_url,
          proxyIconUrl: embed.author.proxy_icon_url,
        }
      : undefined,
    fields: embed.fields?.map((field) => ({
      name: field.name,
      value: field.value,
      inline: field?.inline,
    })),
  }));
}

export function emojiToJSON(emoji: RawEmoji, client: Client) {
  return {
    id: emoji.id,
    name: emoji.name,
    roles: emoji.roles,
    user: emoji.user !== undefined ? new User(emoji.user, client) : undefined,
    requireColons: emoji.require_colons,
    managed: emoji.managed,
    animated: emoji.animated,
    available: emoji.available,
  };
}

export function teamToJSON(team: RawTeam, client: Client) {
  return {
    icon: team.icon,
    id: team.id,
    members: team.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamId: member.team_id,
      user: new User(member.user, client),
    })),
    name: team.name,
    ownerUserId: team.owner_user_id,
  };
}
