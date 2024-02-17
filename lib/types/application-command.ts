import type {
  ApplicationCommandTypes,
  ApplicationCommandOptionType,
  ChannelTypes,
  Locale,
  ApplicationCommandPermissionType,
} from "../constants";

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure */
export interface RawApplicationCommand {
  id: string;
  type?: ApplicationCommandTypes;
  application_id: string;
  guild_id?: string;
  name: string;
  name_localizations?: Partial<Record<Locale, string>> | null;
  description: string;
  description_localizations?: Partial<Record<Locale, string>> | null;
  options?: Array<RawApplicationCommandOption>;
  default_member_permissions: string | null;
  dm_permission?: boolean;
  default_permission?: boolean | null;
  nsfw?: boolean;
  version: string;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure */
export interface RawApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  name_localizations?: Partial<Record<Locale, string>> | null;
  description: string;
  description_localizations?: Partial<Record<Locale, string>> | null;
  required?: boolean;
  choices?: Array<RawApplicationCommandOptionChoice>;
  options?: Array<RawApplicationCommandOption>;
  channel_types?: Array<ChannelTypes>;
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete?: boolean;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure */
export interface RawApplicationCommandOptionChoice {
  name: string;
  name_localizations?: Partial<Record<Locale, string>> | null;
  value: string;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure */
export interface RawGuildApplicationCommandPermissions {
  id: string;
  application_id: string;
  guild_id: string;
  permissions: Array<RawApplicationCommandPermission>;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure */
export interface RawApplicationCommandPermission {
  id: string;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}

export interface JSONApplicationCommand {
  id: string;
  type?: ApplicationCommandTypes;
  applicationId: string;
  guildId?: string;
  name: string;
  nameLocalizations?: Partial<Record<Locale, string>> | null;
  description: string;
  descriptionLocalizations?: Partial<Record<Locale, string>> | null;
  options?: Array<JSONApplicationCommandOption>;
  defaultMemberPermissions: string | null;
  dmPermission?: boolean;
  defaultPermission?: boolean | null;
  nsfw?: boolean;
  version: string;
}

export interface JSONApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  nameLocalizations?: Partial<Record<Locale, string>> | null;
  description: string;
  descriptionLocalizations?: Partial<Record<Locale, string>> | null;
  required?: boolean;
  choices?: Array<JSONApplicationCommandOptionChoice>;
  options?: Array<JSONApplicationCommandOption>;
  channelTypes?: Array<ChannelTypes>;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  autocomplete?: boolean;
}

export interface JSONApplicationCommandOptionChoice {
  name: string;
  nameLocalizations?: Partial<Record<Locale, string>> | null;
  value: string;
}

export interface JSONGuildApplicationCommandPermissions {
  id: string;
  applicationId: string;
  guildId: string;
  permissions: Array<JSONApplicationCommandPermission>;
}

export interface JSONApplicationCommandPermission {
  id: string;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}
