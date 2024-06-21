import type { LocaleMap, snowflake } from ".";
import type {
  ApplicationCommandTypes,
  ApplicationCommandOptionType,
  ChannelTypes,
  ApplicationCommandPermissionType,
  ApplicationIntegrationTypes,
  InteractionContextTypes,
} from "../constants";

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure */
export interface RawApplicationCommand {
  id: snowflake;
  type?: ApplicationCommandTypes;
  application_id: snowflake;
  guild_id?: snowflake;
  name: string;
  name_localizations?: LocaleMap | null;
  description: string;
  description_localizations?: LocaleMap | null;
  options?: Array<RawApplicationCommandOption>;
  default_member_permissions: string | null;
  dm_permission?: boolean;
  default_permission?: boolean | null;
  integration_types?: Array<ApplicationIntegrationTypes>;
  contexts?: Array<InteractionContextTypes>;
  nsfw?: boolean;
  version: snowflake;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure */
export interface RawApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  name_localizations?: LocaleMap | null;
  description: string;
  description_localizations?: LocaleMap | null;
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
  name_localizations?: LocaleMap | null;
  value: string;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure */
export interface RawGuildApplicationCommandPermissions {
  id: snowflake;
  application_id: snowflake;
  guild_id: snowflake;
  permissions: Array<RawApplicationCommandPermission>;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure */
export interface RawApplicationCommandPermission {
  id: snowflake;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}

export interface ApplicationCommand {
  id: snowflake;
  type?: ApplicationCommandTypes;
  applicationId: snowflake;
  guildId?: snowflake;
  name: string;
  nameLocalizations?: LocaleMap | null;
  description: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<ApplicationCommandOption>;
  defaultMemberPermissions: string | null;
  dmPermission?: boolean;
  defaultPermission?: boolean | null;
  integrationTypes?: Array<ApplicationIntegrationTypes>;
  contexts?: Array<InteractionContextTypes>;
  nsfw?: boolean;
  version: string;
}

export interface ApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  nameLocalizations?: LocaleMap | null;
  description: string;
  descriptionLocalizations?: LocaleMap | null;
  required?: boolean;
  choices?: Array<ApplicationCommandOptionChoice>;
  options?: Array<ApplicationCommandOption>;
  channelTypes?: Array<ChannelTypes>;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  autocomplete?: boolean;
}

export interface ApplicationCommandOptionChoice {
  name: string;
  nameLocalizations?: LocaleMap | null;
  value: string;
}

export interface GuildApplicationCommandPermissions {
  id: snowflake;
  applicationId: snowflake;
  guildId: snowflake;
  permissions: Array<ApplicationCommandPermission>;
}

export interface ApplicationCommandPermission {
  id: snowflake;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}

export interface CreateGlobalApplicationCommandParams {
  name: string;
  nameLocalizations?: LocaleMap | null;
  description?: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<ApplicationCommandOption>;
  defaultMemberPermissions?: string | null;
  dmPermission?: boolean;
  defaultPermission?: boolean | null;
  type?: ApplicationCommandTypes;
  nsfw?: boolean;
}

export interface EditGlobalApplicationCommandParams {
  name?: string;
  nameLocalizations?: LocaleMap | null;
  description?: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<ApplicationCommandOption>;
  defaultMemberPermissions?: string | null;
  defaultPermission?: boolean | null;
  dmPermission?: boolean;
  nsfw?: boolean;
}

export type BulkEditGlobalApplicationCommandsParams = Array<{
  id?: snowflake;
  name: string;
  nameLocalizations?: LocaleMap | null;
  description?: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<ApplicationCommandOption>;
  defaultMemberPermissions?: string | null;
  dmPermission?: boolean;
  defaultPermission?: boolean | null;
  type?: ApplicationCommandTypes;
  nsfw?: boolean;
}>;

export interface CreateGuildApplicationCommandParams {
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

export interface EditGuildApplicationCommandParams {
  name?: string;
  nameLocalizations?: LocaleMap | null;
  description?: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<ApplicationCommandOption>;
  defaultMemberPermissions?: string | null;
  defaultPermission?: boolean | null;
  nsfw?: boolean;
}

export type BulkEditGuildApplicationCommandsParams = Array<{
  id?: snowflake;
  name: string;
  nameLocalizations?: LocaleMap | null;
  description?: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<ApplicationCommandOption>;
  defaultMemberPermissions?: string | null;
  dmPermission?: boolean;
  defaultPermission?: boolean | null;
  type: ApplicationCommandTypes;
  nsfw?: boolean;
}>;

export interface EditApplicationCommandPermissionsParams {
  permissions: Array<GuildApplicationCommandPermissions>;
}
