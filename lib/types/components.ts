import type {
  ButtonStyles,
  ChannelTypes,
  ComponentTypes,
  SeparatorSpacing,
  TextInputStyles,
  UnfurledMediaItemFlags,
} from "../constants";
import type { snowflake } from "./common";
import type { RawEmoji, Emoji } from "./emoji";
import type { RawResolvedData, ResolvedData } from "./interaction";

/** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
export interface RawActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<
    | RawButton
    | RawStringSelect
    | RawTextInput
    | RawUserSelect
    | RawRoleSelect
    | RawMentionableSelect
    | RawChannelSelect
  >;
  id?: number;
}

/** https://discord.com/developers/docs/components/reference#button-button-structure */
export interface RawButton {
  type: ComponentTypes.Button;
  id?: number;
  style: ButtonStyles;
  label?: string;
  emoji?: Pick<RawEmoji, "name" | "id" | "animated">;
  custom_id?: string;
  sku_id?: snowflake;
  url?: string;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#string-select-string-select-structure */
export interface RawStringSelect {
  type: ComponentTypes.StringSelect;
  id?: number;
  custom_id: string;
  options: Array<RawSelectOption>;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  required?: boolean;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#string-select-string-select-interaction-response-structure */
export interface RawStringSelectInteractionResponse {
  type: ComponentTypes.StringSelect;
  component_type: ComponentTypes.StringSelect;
  id: number;
  custom_id: string;
  values: Array<string>;
}

/** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
export interface RawSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<RawEmoji, "name" | "id" | "animated">;
  default?: boolean;
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
export interface RawTextInput {
  type: ComponentTypes.TextInput;
  id?: number;
  custom_id: string;
  style: TextInputStyles;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
  label: string;
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-interaction-response-structure */
export interface RawTextInputInteractionResponse {
  type: ComponentTypes.TextInput;
  id: number;
  custom_id: string;
  value: string;
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-structure */
export interface RawUserSelect {
  type: ComponentTypes.UserSelect;
  id?: number;
  custom_id: string;
  placeholder?: string;
  default_values?: Array<RawDefaultValue>;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-interaction-response-structure */
export interface RawUserSelectInteractionResponse {
  type: ComponentTypes.UserSelect;
  component_type: ComponentTypes.UserSelect;
  id: number;
  custom_id: string;
  resolved: RawResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
export interface RawDefaultValue {
  id: snowflake;
  type: "user" | "role" | "channel";
}

/** https://discord.com/developers/docs/components/reference#role-select-role-select-structure */
export interface RawRoleSelect {
  type: ComponentTypes.RoleSelect;
  id?: number;
  custom_id: string;
  placeholder?: string;
  default_values?: Array<RawDefaultValue>;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#role-select-role-select-interaction-response-structure */
export interface RawRoleSelectInteractionResponse {
  type: ComponentTypes.RoleSelect;
  component_type: ComponentTypes.RoleSelect;
  id: number;
  custom_id: string;
  resolved: RawResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-structure */
export interface RawMentionableSelect {
  type: ComponentTypes.MentionableSelect;
  id?: number;
  custom_id: string;
  placeholder?: string;
  default_values?: Array<RawDefaultValue>;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
export interface RawMentionableSelectInteractionResponse {
  type: ComponentTypes.MentionableSelect;
  component_type: ComponentTypes.MentionableSelect;
  id: number;
  custom_id: string;
  resolved: RawResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-structure */
export interface RawChannelSelect {
  type: ComponentTypes.ChannelSelect;
  id?: number;
  custom_id: string;
  channel_types?: Array<ChannelTypes>;
  placeholder?: string;
  default_values?: Array<RawDefaultValue>;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-interaction-response-structure */
export interface RawChannelSelectInteractionResponse {
  type: ComponentTypes.ChannelSelect;
  component_type: ComponentTypes.ChannelSelect;
  id: number;
  custom_id: string;
  resolved: RawResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#section-section-structure */
export interface RawSection {
  type: ComponentTypes.Section;
  id?: number;
  components: Array<RawTextDisplay>;
  accessory: RawButton | RawThumbnail;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-structure */
export interface RawTextDisplay {
  type: ComponentTypes.TextDisplay;
  id?: number;
  content: string;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-interaction-response-structure */
export interface RawTextDisplayInteractionResponse {
  type: ComponentTypes.TextDisplay;
  id: number;
}

/** https://discord.com/developers/docs/components/reference#thumbnail-thumbnail-structure */
export interface RawThumbnail {
  type: ComponentTypes.Thumbnail;
  id?: number;
  media: RawUnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-structure */
export interface RawMediaGallery {
  type: ComponentTypes.MediaGallery;
  id?: number;
  items: Array<RawMediaGalleryItem>;
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-item-structure */
export interface RawMediaGalleryItem {
  media: RawUnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#file-file-structure */
export interface RawFile {
  type: ComponentTypes.File;
  id?: number;
  file: RawUnfurledMediaItem;
  spoiler?: boolean;
  name: string;
  size: number;
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure */
export interface RawSeparator {
  type: ComponentTypes.Separator;
  id?: number;
  divider?: boolean;
  spacing?: SeparatorSpacing;
}

/** https://discord.com/developers/docs/components/reference#container-container-structure */
export interface RawContainer {
  type: ComponentTypes.Container;
  id?: number;
  components: Array<
    | RawActionRow
    | RawTextDisplay
    | RawSection
    | RawMediaGallery
    | RawSeparator
    | RawFile
  >;
  accent_color?: number | null;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#label-label-structure */
export interface RawLabel {
  type: ComponentTypes.Label;
  id?: number;
  label: string;
  description?: string;
  component:
    | RawTextInput
    | RawStringSelect
    | RawUserSelect
    | RawRoleSelect
    | RawMentionableSelect
    | RawChannelSelect
    | RawFileUpload
    | RawRadioGroup
    | RawCheckboxGroup
    | RawCheckbox;
}

/** https://discord.com/developers/docs/components/reference#label-label-interaction-response-structure */
export interface RawLabelInteractionResponse {
  type: ComponentTypes.Label;
  id: number;
  component:
    | RawTextInputInteractionResponse
    | RawStringSelectInteractionResponse
    | RawUserSelectInteractionResponse
    | RawRoleSelectInteractionResponse
    | RawMentionableSelectInteractionResponse
    | RawChannelSelectInteractionResponse
    | RawFileUploadInteractionResponse
    | RawRadioGroupInteractionResponse
    | RawCheckboxGroupInteractionResponse
    | RawCheckboxInteractionResponse;
}

/** https://discord.com/developers/docs/components/reference#file-upload-file-upload-structure */
export interface RawFileUpload {
  type: ComponentTypes.FileUpload;
  id?: number;
  custom_id: string;
  min_values?: number;
  max_values?: number;
  required?: boolean;
  file_types?: Array<"image" | "video" | "audio" | string>;
}

/** https://discord.com/developers/docs/components/reference#file-upload-file-upload-interaction-response-structure */
export interface RawFileUploadInteractionResponse {
  type: ComponentTypes.FileUpload;
  id: number;
  custom_id: string;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#unfurled-media-item-unfurled-media-item-structure */
export interface RawUnfurledMediaItem {
  url: string;
  proxy_url?: string;
  height?: number | null;
  width?: number | null;
  placeholder?: string;
  placeholder_version?: number;
  content_type?: string;
  flags?: UnfurledMediaItemFlags;
  attachment_id?: snowflake;
}

/** https://docs.discord.com/developers/components/reference#radio-group-structure */
export interface RawRadioGroup {
  type: ComponentTypes.RadioGroup;
  id?: number;
  custom_id: string;
  options: Array<RawRadioGroupOptions>;
  required?: boolean;
}

/** https://docs.discord.com/developers/components/reference#radio-group-option-structure */
export interface RawRadioGroupOptions {
  value: string;
  label: string;
  description?: string;
  default?: boolean;
}

/** https://docs.discord.com/developers/components/reference#radio-group-interaction-response-structure */
export interface RawRadioGroupInteractionResponse {
  type: ComponentTypes.RadioGroup;
  id: number;
  custom_id: string;
  value: string | null;
}

/** https://docs.discord.com/developers/components/reference#checkbox-group-structure */
export interface RawCheckboxGroup {
  type: ComponentTypes.CheckboxGroup;
  id?: number;
  custom_id: string;
  options: Array<RawCheckboxGroupOptions>;
  min_values?: number;
  max_values?: number;
  required?: boolean;
}

/** https://docs.discord.com/developers/components/reference#checkbox-group-option-structure */
export interface RawCheckboxGroupOptions {
  value: string;
  label: string;
  description?: string;
  default?: boolean;
}

/** https://docs.discord.com/developers/components/reference#checkbox-group-interaction-response-structure */
export interface RawCheckboxGroupInteractionResponse {
  type: ComponentTypes.CheckboxGroup;
  id: number;
  custom_id: string;
  values: Array<string>;
}

/** https://docs.discord.com/developers/components/reference#checkbox-structure */
export interface RawCheckbox {
  type: ComponentTypes.Checkbox;
  id?: number;
  custom_id: string;
  default?: boolean;
}

/** https://docs.discord.com/developers/components/reference#checkbox-interaction-response-structure */
export interface RawCheckboxInteractionResponse {
  type: ComponentTypes.Checkbox;
  id: number;
  custom_id: string;
  value: boolean;
}

/** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
export interface ActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<
    | Button
    | StringSelect
    | TextInput
    | UserSelect
    | RoleSelect
    | MentionableSelect
    | ChannelSelect
  >;
  id?: number;
}

/** https://discord.com/developers/docs/components/reference#button-button-structure */
export interface Button {
  type: ComponentTypes.Button;
  id?: number;
  style: ButtonStyles;
  label?: string;
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  customId?: string;
  skuId?: snowflake;
  url?: string;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#string-select-string-select-structure */
export interface StringSelect {
  type: ComponentTypes.StringSelect;
  id?: number;
  customId: string;
  options: Array<SelectOption>;
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  required?: boolean;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#string-select-string-select-interaction-response-structure */
export interface StringSelectInteractionResponse {
  type: ComponentTypes.StringSelect;
  componentType: ComponentTypes.StringSelect;
  id: number;
  customId: string;
  values: Array<string>;
}

/** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  default?: boolean;
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
export interface TextInput {
  type: ComponentTypes.TextInput;
  id?: number;
  customId: string;
  style: TextInputStyles;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
  label: string;
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-interaction-response-structure */
export interface TextInputInteractionResponse {
  type: ComponentTypes.TextInput;
  id: number;
  customId: string;
  value: string;
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-structure */
export interface UserSelect {
  type: ComponentTypes.UserSelect;
  id?: number;
  customId: string;
  placeholder?: string;
  defaultValues?: Array<DefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-interaction-response-structure */
export interface UserSelectInteractionResponse {
  type: ComponentTypes.UserSelect;
  componentType: ComponentTypes.UserSelect;
  id: number;
  customId: string;
  resolved: ResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
export interface DefaultValue {
  id: snowflake;
  type: "user" | "role" | "channel";
}

/** https://discord.com/developers/docs/components/reference#role-select-role-select-structure */
export interface RoleSelect {
  type: ComponentTypes.RoleSelect;
  id?: number;
  customId: string;
  placeholder?: string;
  defaultValues?: Array<DefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#role-select-role-select-interaction-response-structure */
export interface RoleSelectInteractionResponse {
  type: ComponentTypes.RoleSelect;
  componentType: ComponentTypes.RoleSelect;
  id: number;
  customId: string;
  resolved: ResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-structure */
export interface MentionableSelect {
  type: ComponentTypes.MentionableSelect;
  id?: number;
  customId: string;
  placeholder?: string;
  defaultValues?: Array<DefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
export interface MentionableSelectInteractionResponse {
  type: ComponentTypes.MentionableSelect;
  componentType: ComponentTypes.MentionableSelect;
  id: number;
  customId: string;
  resolved: ResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-structure */
export interface ChannelSelect {
  type: ComponentTypes.ChannelSelect;
  id?: number;
  customId: string;
  channelTypes?: Array<ChannelTypes>;
  placeholder?: string;
  defaultValues?: Array<DefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-interaction-response-structure */
export interface ChannelSelectInteractionResponse {
  type: ComponentTypes.ChannelSelect;
  componentType: ComponentTypes.ChannelSelect;
  id: number;
  customId: string;
  resolved: ResolvedData;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#section-section-structure */
export interface Section {
  type: ComponentTypes.Section;
  id?: number;
  components: Array<TextDisplay>;
  accessory: Button | Thumbnail;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-structure */
export interface TextDisplay {
  type: ComponentTypes.TextDisplay;
  id?: number;
  content: string;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-interaction-response-structure */
export interface TextDisplayInteractionResponse {
  type: ComponentTypes.TextDisplay;
  id: number;
}

/** https://discord.com/developers/docs/components/reference#thumbnail-thumbnail-structure */
export interface Thumbnail {
  type: ComponentTypes.Thumbnail;
  id?: number;
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-structure */
export interface MediaGallery {
  type: ComponentTypes.MediaGallery;
  id?: number;
  items: Array<MediaGalleryItem>;
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-item-structure */
export interface MediaGalleryItem {
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#file-file-structure */
export interface File {
  type: ComponentTypes.File;
  id?: number;
  file: UnfurledMediaItem;
  spoiler?: boolean;
  name: string;
  size: number;
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure */
export interface Separator {
  type: ComponentTypes.Separator;
  id?: number;
  divider?: boolean;
  spacing?: SeparatorSpacing;
}

/** https://discord.com/developers/docs/components/reference#container-container-structure */
export interface Container {
  type: ComponentTypes.Container;
  id?: number;
  components: Array<
    ActionRow | TextDisplay | Section | MediaGallery | Separator | File
  >;
  accentColor?: number | null;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#label-label-structure */
export interface Label {
  type: ComponentTypes.Label;
  id?: number;
  label: string;
  description?: string;
  component:
    | TextInput
    | StringSelect
    | UserSelect
    | RoleSelect
    | MentionableSelect
    | ChannelSelect
    | FileUpload
    | RadioGroup
    | CheckboxGroup
    | Checkbox;
}

/** https://discord.com/developers/docs/components/reference#label-label-interaction-response-structure */
export interface LabelInteractionResponse {
  type: ComponentTypes.Label;
  id: number;
  component:
    | TextInputInteractionResponse
    | StringSelectInteractionResponse
    | UserSelectInteractionResponse
    | RoleSelectInteractionResponse
    | MentionableSelectInteractionResponse
    | ChannelSelectInteractionResponse
    | FileUploadInteractionResponse
    | RadioGroupInteractionResponse
    | CheckboxGroupInteractionResponse
    | CheckboxInteractionResponse;
}

/** https://discord.com/developers/docs/components/reference#file-upload-file-upload-structure */
export interface FileUpload {
  type: ComponentTypes.FileUpload;
  id?: number;
  customId: string;
  minValues?: number;
  maxValues?: number;
  required?: boolean;
  fileTypes?: Array<"image" | "video" | "audio" | string>;
}

/** https://discord.com/developers/docs/components/reference#file-upload-file-upload-interaction-response-structure */
export interface FileUploadInteractionResponse {
  type: ComponentTypes.FileUpload;
  id: number;
  customId: string;
  values: Array<snowflake>;
}

/** https://discord.com/developers/docs/components/reference#unfurled-media-item-unfurled-media-item-structure */
export interface UnfurledMediaItem {
  url: string;
  proxyURL?: string;
  height?: number | null;
  width?: number | null;
  placeholder?: string;
  placeholderVersion?: number;
  contentType?: string;
  flags?: UnfurledMediaItemFlags;
  attachmentId?: snowflake;
}

/** https://docs.discord.com/developers/components/reference#radio-group-structure */
export interface RadioGroup {
  type: ComponentTypes.RadioGroup;
  id?: number;
  customId: string;
  options: Array<RadioGroupOptions>;
  required?: boolean;
}

/** https://docs.discord.com/developers/components/reference#radio-group-option-structure */
export interface RadioGroupOptions {
  value: string;
  label: string;
  description?: string;
  default?: boolean;
}

/** https://docs.discord.com/developers/components/reference#radio-group-interaction-response-structure */
export interface RadioGroupInteractionResponse {
  type: ComponentTypes.RadioGroup;
  id: number;
  customId: string;
  value: string | null;
}

/** https://docs.discord.com/developers/components/reference#checkbox-group-structure */
export interface CheckboxGroup {
  type: ComponentTypes.CheckboxGroup;
  id?: number;
  customId: string;
  options: Array<CheckboxGroupOptions>;
  minValues?: number;
  maxValues?: number;
  required?: boolean;
}

/** https://docs.discord.com/developers/components/reference#checkbox-group-option-structure */
export interface CheckboxGroupOptions {
  value: string;
  label: string;
  description?: string;
  default?: boolean;
}

/** https://docs.discord.com/developers/components/reference#checkbox-group-interaction-response-structure */
export interface CheckboxGroupInteractionResponse {
  type: ComponentTypes.CheckboxGroup;
  id: number;
  customId: string;
  values: Array<string>;
}

/** https://docs.discord.com/developers/components/reference#checkbox-structure */
export interface Checkbox {
  type: ComponentTypes.Checkbox;
  id?: number;
  customId: string;
  default?: boolean;
}

/** https://docs.discord.com/developers/components/reference#checkbox-interaction-response-structure */
export interface CheckboxInteractionResponse {
  type: ComponentTypes.Checkbox;
  id: number;
  customId: string;
  value: boolean;
}
