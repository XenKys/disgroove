import type {
  RawAttachment,
  RawChannel,
  RawGuildMember,
  RawMessage,
  RawUser,
  RawSelectOption,
  RawRole,
  JSONAttachment,
  JSONSelectOption,
  JSONUser,
  JSONGuildMember,
  JSONMessage,
  JSONRole,
  JSONChannel,
} from ".";
import type {
  ApplicationCommandTypes,
  ComponentTypes,
  InteractionType,
} from "../constants";

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure */
export interface RawInteraction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: RawApplicationCommandData &
    RawMessageComponentData &
    RawModalSubmitData;
  guild_id?: string;
  channel_id?: string;
  member?: RawGuildMember;
  user?: RawUser;
  token: string;
  version: number;
  message?: RawMessage;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-data-structure */
export interface RawApplicationCommandData {
  id: string;
  name: string;
  type: ApplicationCommandTypes;
  resolved?: RawResolvedData;
  options?: Array<RawApplicationCommandInteractionDataOption>;
  guild_id?: string;
  target_id?: string;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure */
export interface RawMessageComponentData {
  custom_id: string;
  component_type: number;
  values?: Array<RawSelectOption>;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-modal-submit-data-structure */
export interface RawModalSubmitData {
  custom_id: string;
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<{
      type: ComponentTypes.TextInput;
      custom_id: string;
      style: number;
      label: string;
      min_length?: number;
      max_length?: number;
      required?: boolean;
      value?: string;
      placeholder?: string;
    }>;
  }>;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface RawResolvedData {
  users?: Map<string, RawUser>;
  members?: Map<string, RawGuildMember>;
  roles?: Map<string, RawRole>;
  channels?: Map<string, RawChannel>;
  messages?: Map<string, RawMessage>;
  attachments?: Map<string, RawAttachment>;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure */
export interface RawApplicationCommandInteractionDataOption {
  name: string;
  type: number;
  value?: string | number | boolean;
  options?: Array<RawApplicationCommandInteractionDataOption>;
  focused?: boolean;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface RawMessageInteraction {
  id: string;
  type: InteractionType;
  name: string;
  user: RawUser;
  member?: RawGuildMember;
}

export interface JSONInteraction {
  id: string;
  applicationId: string;
  type: InteractionType;
  data?: JSONApplicationCommandData &
    JSONMessageComponentData &
    JSONModalSubmitData;
  guildId?: string;
  channelId?: string;
  member?: JSONGuildMember;
  user?: JSONUser;
  token: string;
  version: number;
  message?: JSONMessage;
  appPermissions?: string;
  locale?: string;
  guildLocale?: string;
}

export interface JSONApplicationCommandData {
  id: string;
  name: string;
  type: ApplicationCommandTypes;
  resolved?: JSONResolvedData;
  options?: Array<JSONApplicationCommandInteractionDataOption>;
  guildId?: string;
  targetId?: string;
}

export interface JSONMessageComponentData {
  customId: string;
  componentType: number;
  values?: Array<JSONSelectOption>;
}

export interface JSONModalSubmitData {
  customId: string;
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<{
      type: ComponentTypes.TextInput;
      customId: string;
      style: number;
      label: string;
      minLength?: number;
      maxLength?: number;
      required?: boolean;
      value?: string;
      placeholder?: string;
    }>;
  }>;
}

export interface JSONResolvedData {
  users?: Array<JSONUser>;
  members?: Array<JSONGuildMember>;
  roles?: Array<JSONRole>;
  channels?: Array<JSONChannel>;
  messages?: Array<JSONMessage>;
  attachments?: Array<JSONAttachment>;
}

export interface JSONApplicationCommandInteractionDataOption {
  name: string;
  type: number;
  value?: string | number | boolean;
  options?: Array<JSONApplicationCommandInteractionDataOption>;
  focused?: boolean;
}

export interface JSONMessageInteraction {
  id: string;
  type: InteractionType;
  name: string;
  user: JSONUser;
  member?: JSONGuildMember;
}
