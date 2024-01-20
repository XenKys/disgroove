import type {
  RawAttachment,
  RawChannel,
  RawGuildMember,
  RawMessage,
  RawUser,
  RawRole,
  JSONAttachment,
  JSONUser,
  JSONGuildMember,
  JSONMessage,
  JSONRole,
  JSONChannel,
  JSONEntitlement,
  RawEntitlement,
  RawEmbed,
  RawAllowedMentions,
  RawActionRow,
  RawApplicationCommandOptionChoice,
  JSONEmbed,
  JSONAllowedMentions,
  JSONActionRow,
  JSONApplicationCommandOptionChoice,
  RawTextInput,
  JSONTextInput,
} from ".";
import type {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ComponentTypes,
  InteractionCallbackType,
  InteractionType,
  MessageFlags,
} from "../constants";
import type { File } from "../rest";
import { Collection } from "../utils";

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure */
export interface RawInteraction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: RawApplicationCommandData &
    RawMessageComponentData &
    RawModalSubmitData;
  guild_id?: string;
  channel?: RawChannel;
  channel_id?: string;
  member?: RawGuildMember;
  user?: RawUser;
  token: string;
  version: number;
  message?: RawMessage;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
  entitlements: Array<RawEntitlement>;
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
  component_type: ComponentTypes;
  values?: Array<string>;
  resolved?: RawResolvedData;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-modal-submit-data-structure */
export interface RawModalSubmitData {
  custom_id: string;
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<RawTextInput>;
  }>;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface RawResolvedData {
  users?: Record<string, RawUser>;
  members?: Record<string, RawGuildMember>;
  roles?: Record<string, RawRole>;
  channels?: Record<string, RawChannel>;
  messages?: Record<string, RawMessage>;
  attachments?: Record<string, RawAttachment>;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure */
export interface RawApplicationCommandInteractionDataOption {
  name: string;
  type: ApplicationCommandOptionType;
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

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure */
export interface RawInteractionResponse {
  type: InteractionCallbackType;
  data?: RawInteractionCallbackData;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure */
export interface RawInteractionCallbackData {
  tts?: boolean;
  content?: string;
  embeds?: Array<RawEmbed>;
  allowed_mentions?: RawAllowedMentions;
  flags?: MessageFlags;
  components?: Array<RawActionRow>;
  attachments?: Array<RawAttachment>;
  files?: Array<File>;
  choices?: Array<RawApplicationCommandOptionChoice>;
  custom_id?: string;
  title?: string;
}

export interface JSONInteraction {
  id: string;
  applicationId: string;
  type: InteractionType;
  data?: JSONApplicationCommandData &
    JSONMessageComponentData &
    JSONModalSubmitData;
  guildId?: string;
  channel?: JSONChannel;
  channelId?: string;
  member?: JSONGuildMember;
  user?: JSONUser;
  token: string;
  version: number;
  message?: JSONMessage;
  appPermissions?: string;
  locale?: string;
  guildLocale?: string;
  entitlements: Array<JSONEntitlement>;
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
  componentType: ComponentTypes;
  values?: Array<string>;
  resolved?: JSONResolvedData;
}

export interface JSONModalSubmitData {
  customId: string;
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<JSONTextInput>;
  }>;
}

export interface JSONResolvedData {
  users?: Collection<string, JSONUser>;
  members?: Collection<string, JSONGuildMember>;
  roles?: Collection<string, JSONRole>;
  channels?: Collection<string, JSONChannel>;
  messages?: Collection<string, JSONMessage>;
  attachments?: Collection<string, JSONAttachment>;
}

export interface JSONApplicationCommandInteractionDataOption {
  name: string;
  type: ApplicationCommandOptionType;
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

export interface JSONInteractionResponse {
  type: InteractionCallbackType;
  data?: JSONInteractionCallbackData;
}

export interface JSONInteractionCallbackData {
  tts?: boolean;
  content?: string;
  embeds?: Array<JSONEmbed>;
  allowedMentions?: JSONAllowedMentions;
  flags?: MessageFlags;
  components?: Array<JSONActionRow>;
  attachments?: Array<JSONAttachment>;
  files?: Array<File>;
  choices?: Array<JSONApplicationCommandOptionChoice>;
  customId?: string;
  title?: string;
}
