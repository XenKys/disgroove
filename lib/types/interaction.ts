import type {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ApplicationIntegrationTypes,
  ComponentTypes,
  InteractionCallbackType,
  InteractionContextTypes,
  InteractionType,
  Locales,
  MessageFlags,
} from "../constants";
import type { FileData } from "../rest";
import type {
  RawApplicationCommandOptionChoice,
  ApplicationCommandOptionChoice,
} from "./application-command";
import type { RawChannel, Channel } from "./channel";
import type { snowflake } from "./common";
import type { RawEntitlement, Entitlement } from "./entitlements";
import type { RawGuildMember, GuildMember, Guild, RawGuild } from "./guild";
import type {
  RawMessage,
  RawAttachment,
  RawEmbed,
  RawAllowedMentions,
  Message,
  Attachment,
  Embed,
  AllowedMentions,
} from "./message";
import type {
  ActionRow,
  ChannelSelectInteractionResponse,
  Container,
  File,
  Label,
  LabelInteractionResponse,
  MediaGallery,
  MentionableSelectInteractionResponse,
  RawActionRow,
  RawChannelSelectInteractionResponse,
  RawContainer,
  RawFile,
  RawLabel,
  RawLabelInteractionResponse,
  RawMediaGallery,
  RawMentionableSelectInteractionResponse,
  RawRoleSelectInteractionResponse,
  RawSection,
  RawSeparator,
  RawStringSelectInteractionResponse,
  RawTextDisplay,
  RawTextDisplayInteractionResponse,
  RawTextInputInteractionResponse,
  RawUserSelectInteractionResponse,
  RoleSelectInteractionResponse,
  Section,
  Separator,
  StringSelectInteractionResponse,
  TextDisplay,
  TextDisplayInteractionResponse,
  TextInputInteractionResponse,
  UserSelectInteractionResponse,
} from "./components";
import type { RawPollCreateParams, PollCreateParams } from "./poll";
import type { RawRole, Role } from "./role";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure */
export interface RawInteraction {
  id: snowflake;
  application_id: snowflake;
  type: InteractionType;
  data?: RawApplicationCommandData &
    RawMessageComponentData &
    RawModalSubmitData;
  guild?: { locale: Locales } & Pick<RawGuild, "id" | "features">;
  guild_id?: snowflake;
  channel?: RawChannel;
  channel_id?: snowflake;
  member?: RawGuildMember;
  user?: RawUser;
  token: string;
  version: number;
  message?: RawMessage;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
  entitlements: Array<RawEntitlement>;
  authorizing_integration_owners: Record<ApplicationIntegrationTypes, string>;
  context?: InteractionContextTypes;
  attachment_size_limit: number;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-data-structure */
export interface RawApplicationCommandData {
  id: snowflake;
  name: string;
  type: ApplicationCommandTypes;
  resolved?: RawResolvedData;
  options?: Array<RawApplicationCommandInteractionDataOption>;
  guild_id?: snowflake;
  target_id?: snowflake;
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
  components: Array<
    | {
        type: ComponentTypes.ActionRow;
        components: Array<
          | RawTextInputInteractionResponse
          | RawStringSelectInteractionResponse
          | RawUserSelectInteractionResponse
          | RawRoleSelectInteractionResponse
          | RawMentionableSelectInteractionResponse
          | RawChannelSelectInteractionResponse
        >;
      }
    | RawTextDisplayInteractionResponse
    | RawLabelInteractionResponse
  >;
  resolved?: RawResolvedData;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface RawResolvedData {
  users?: Record<snowflake, RawUser>;
  members?: Record<snowflake, RawGuildMember>;
  roles?: Record<snowflake, RawRole>;
  channels?: Record<snowflake, RawChannel>;
  messages?: Record<snowflake, RawMessage>;
  attachments?: Record<snowflake, RawAttachment>;
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
  id: snowflake;
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
  components?: Array<
    | RawActionRow
    | RawSection
    | RawTextDisplay
    | RawMediaGallery
    | RawFile
    | RawSeparator
    | RawContainer
    | RawLabel
  >;
  attachments?: Array<Pick<RawAttachment, "filename" | "description">>;
  poll?: RawPollCreateParams;
  files?: Array<FileData>;
  choices?: Array<RawApplicationCommandOptionChoice>;
  custom_id?: string;
  title?: string;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-response-object */
export interface RawInteractionCallbackResponse {
  interaction: RawInteractionCallback;
  resource?: RawInteractionResource;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-object */
export interface RawInteractionCallback {
  id: snowflake;
  type: InteractionType;
  activity_instance_id?: string;
  response_message_id?: snowflake;
  response_message_loading?: boolean;
  response_message_ephemeral?: boolean;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-resource-object */
export interface RawInteractionResource {
  type: InteractionCallbackType;
  activity_instance?: RawActivityInstanceResource;
  message?: RawMessage;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-activity-instance-resource */
export interface RawActivityInstanceResource {
  id: string;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure */
export interface Interaction {
  id: snowflake;
  applicationId: snowflake;
  type: InteractionType;
  data?: ApplicationCommandData & MessageComponentData & ModalSubmitData;
  guild?: { locale: Locales } & Pick<Guild, "id" | "features">;
  guildId?: snowflake;
  channel?: Channel;
  channelId?: snowflake;
  member?: GuildMember;
  user?: User;
  token: string;
  version: number;
  message?: Message;
  appPermissions?: string;
  locale?: string;
  guildLocale?: string;
  entitlements: Array<Entitlement>;
  authorizingIntegrationOwners: Record<ApplicationIntegrationTypes, string>;
  context?: InteractionContextTypes;
  attachmentSizeLimit: number;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-data-structure */
export interface ApplicationCommandData {
  id: snowflake;
  name: string;
  type: ApplicationCommandTypes;
  resolved?: ResolvedData;
  options?: Array<ApplicationCommandInteractionDataOption>;
  guildId?: snowflake;
  targetId?: snowflake;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure */
export interface MessageComponentData {
  customId: string;
  componentType: ComponentTypes;
  values?: Array<string>;
  resolved?: ResolvedData;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-modal-submit-data-structure */
export interface ModalSubmitData {
  customId: string;
  components: Array<
    | {
        type: ComponentTypes.ActionRow;
        components: Array<
          | TextInputInteractionResponse
          | StringSelectInteractionResponse
          | UserSelectInteractionResponse
          | RoleSelectInteractionResponse
          | MentionableSelectInteractionResponse
          | ChannelSelectInteractionResponse
        >;
      }
    | TextDisplayInteractionResponse
    | LabelInteractionResponse
  >;
  resolved?: ResolvedData;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface ResolvedData {
  users?: Record<snowflake, User>;
  members?: Record<snowflake, GuildMember>;
  roles?: Record<snowflake, Role>;
  channels?: Record<snowflake, Channel>;
  messages?: Record<snowflake, Message>;
  attachments?: Record<snowflake, Attachment>;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure */
export interface ApplicationCommandInteractionDataOption {
  name: string;
  type: ApplicationCommandOptionType;
  value?: string | number | boolean;
  options?: Array<ApplicationCommandInteractionDataOption>;
  focused?: boolean;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface MessageInteraction {
  id: snowflake;
  type: InteractionType;
  name: string;
  user: User;
  member?: GuildMember;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure */
export interface InteractionResponse {
  type: InteractionCallbackType;
  data?: InteractionCallbackData;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure */
export interface InteractionCallbackData {
  tts?: boolean;
  content?: string;
  embeds?: Array<Embed>;
  allowedMentions?: AllowedMentions;
  flags?: MessageFlags;
  components?: Array<
    | ActionRow
    | Section
    | TextDisplay
    | MediaGallery
    | File
    | Separator
    | Container
    | Label
  >;
  attachments?: Array<Pick<Attachment, "filename" | "description">>;
  poll?: PollCreateParams;
  files?: Array<FileData>;
  choices?: Array<ApplicationCommandOptionChoice>;
  customId?: string;
  title?: string;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-response-object */
export interface InteractionCallbackResponse {
  interaction: InteractionCallback;
  resource?: InteractionResource;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-object */
export interface InteractionCallback {
  id: snowflake;
  type: InteractionType;
  activityInstanceId?: string;
  responseMessageId?: snowflake;
  responseMessageLoading?: boolean;
  responseMessageEphemeral?: boolean;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-resource-object */
export interface InteractionResource {
  type: InteractionCallbackType;
  activityInstance?: ActivityInstanceResource;
  message?: Message;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-activity-instance-resource */
export interface ActivityInstanceResource {
  id: string;
}
