import type {
  RawAttachment,
  RawChannel,
  RawGuildMember,
  RawMessage,
  RawUser,
  RawRole,
  Attachment,
  User,
  GuildMember,
  Message,
  Role,
  Channel,
  Entitlement,
  RawEntitlement,
  RawEmbed,
  RawAllowedMentions,
  RawActionRow,
  RawApplicationCommandOptionChoice,
  Embed,
  AllowedMentions,
  ActionRow,
  ApplicationCommandOptionChoice,
  RawTextInput,
  TextInput,
  ExecuteWebhookParams,
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

export interface Interaction {
  id: string;
  applicationId: string;
  type: InteractionType;
  data?: ApplicationCommandData & MessageComponentData & ModalSubmitData;
  guildId?: string;
  channel?: Channel;
  channelId?: string;
  member?: GuildMember;
  user?: User;
  token: string;
  version: number;
  message?: Message;
  appPermissions?: string;
  locale?: string;
  guildLocale?: string;
  entitlements: Array<Entitlement>;
}

export interface ApplicationCommandData {
  id: string;
  name: string;
  type: ApplicationCommandTypes;
  resolved?: ResolvedData;
  options?: Array<ApplicationCommandInteractionDataOption>;
  guildId?: string;
  targetId?: string;
}

export interface MessageComponentData {
  customId: string;
  componentType: ComponentTypes;
  values?: Array<string>;
  resolved?: ResolvedData;
}

export interface ModalSubmitData {
  customId: string;
  components: Array<{
    type: ComponentTypes.ActionRow;
    components: Array<TextInput>;
  }>;
}

export interface ResolvedData {
  users?: Array<User>;
  members?: Array<GuildMember>;
  roles?: Array<Role>;
  channels?: Array<Channel>;
  messages?: Array<Message>;
  attachments?: Array<Attachment>;
}

export interface ApplicationCommandInteractionDataOption {
  name: string;
  type: ApplicationCommandOptionType;
  value?: string | number | boolean;
  options?: Array<ApplicationCommandInteractionDataOption>;
  focused?: boolean;
}

export interface MessageInteraction {
  id: string;
  type: InteractionType;
  name: string;
  user: User;
  member?: GuildMember;
}

export interface InteractionResponse {
  type: InteractionCallbackType;
  data?: InteractionCallbackData;
}

export interface InteractionCallbackData {
  tts?: boolean;
  content?: string;
  embeds?: Array<Embed>;
  allowedMentions?: AllowedMentions;
  flags?: MessageFlags;
  components?: Array<ActionRow>;
  attachments?: Array<Attachment>;
  files?: Array<File>;
  choices?: Array<ApplicationCommandOptionChoice>;
  customId?: string;
  title?: string;
}

export interface CreateInteractionFollowupMessageParams
  extends Omit<ExecuteWebhookParams, "threadId" | "avatarUrl" | "username"> {}
