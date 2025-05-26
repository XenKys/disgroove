import type {
  ButtonStyles,
  ChannelTypes,
  ComponentTypes,
  SeparatorSpacing,
  TextInputStyles,
} from "../constants";
import type { snowflake } from "./common";
import type { RawEmoji, Emoji } from "./emoji";

/** https://discord.com/developers/docs/components/reference#button-button-structure */
export interface RawButton {
  type: ComponentTypes.Button;
  style: ButtonStyles;
  label?: string;
  emoji?: Pick<RawEmoji, "name" | "id" | "animated">;
  custom_id?: string;
  sku_id?: snowflake;
  url?: string;
  disabled?: boolean;
  id?: number;
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

/** https://discord.com/developers/docs/components/reference#file-file-structure */
export interface RawFile {
  type: ComponentTypes.File;
  id?: number;
  file: RawUnfurledMediaItem;
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

/** https://discord.com/developers/docs/components/reference#section-section-structure */
export interface RawSection {
  type: ComponentTypes.Section;
  id?: number;
  components: Array<RawTextDisplay>;
  accessory: RawThumbnail | RawButton;
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface RawSelectMenu {
  type:
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.RoleSelect
    | ComponentTypes.StringSelect
    | ComponentTypes.UserSelect;
  custom_id: string;
  options?: Array<RawSelectOption>;
  channel_types?: Array<ChannelTypes>;
  placeholder?: string;
  default_values?: Array<RawDefaultValue>;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  id?: number;
}

/** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
export interface RawSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<RawEmoji, "name" | "id" | "animated">;
  default?: boolean;
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure */
export interface RawSeparator {
  type: ComponentTypes.Separator;
  id?: number;
  divider?: boolean;
  spacing?: SeparatorSpacing;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-structure */
export interface RawTextDisplay {
  type: ComponentTypes.TextDisplay;
  id?: number;
  content: string;
}

/** https://discord.com/developers/docs/components/reference#thumbnail-thumbnail-structure */
export interface RawThumbnail {
  type: ComponentTypes.Thumbnail;
  id?: number;
  media: RawUnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
export interface RawDefaultValue {
  id: snowflake;
  type: string;
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
export interface RawTextInput {
  type: ComponentTypes.TextInput;
  custom_id: string;
  style: TextInputStyles;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
  id?: number;
}

/** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
export interface RawActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<RawButton | RawSelectMenu | RawTextInput>;
  id?: number;
}

/** https://discord.com/developers/docs/components/reference#unfurled-media-item-structure */
export interface RawUnfurledMediaItem {
  url: string;
  proxy_url?: string;
  height?: number | null;
  width?: number | null;
  content_type?: string;
}

export interface Button {
  type: ComponentTypes.Button;
  style: ButtonStyles;
  label?: string;
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  customID?: string;
  skuID?: snowflake;
  url?: string;
  disabled?: boolean;
  id?: number;
}

export interface Container {
  type: ComponentTypes.Container;
  id?: number;
  components: Array<
    ActionRow | TextDisplay | Section | MediaGallery | Separator | File
  >;
  accentColor?: number | null;
  spoiler?: boolean;
}

export interface File {
  type: ComponentTypes.File;
  id?: number;
  file: UnfurledMediaItem;
  spoiler?: boolean;
}

export interface MediaGallery {
  type: ComponentTypes.MediaGallery;
  id?: number;
  items: Array<MediaGalleryItem>;
}

export interface MediaGalleryItem {
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

export interface Section {
  type: ComponentTypes.Section;
  id?: number;
  components: Array<TextDisplay>;
  accessory: Thumbnail | Button;
}

export interface SelectMenu {
  type:
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.RoleSelect
    | ComponentTypes.StringSelect
    | ComponentTypes.UserSelect;
  customID: string;
  options?: Array<SelectOption>;
  channelTypes?: Array<ChannelTypes>;
  placeholder?: string;
  defaultValues?: Array<DefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
  id?: number;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  default?: boolean;
}

export interface Separator {
  type: ComponentTypes.Separator;
  id?: number;
  divider?: boolean;
  spacing?: SeparatorSpacing;
}

export interface TextDisplay {
  type: ComponentTypes.TextDisplay;
  id?: number;
  content: string;
}

export interface Thumbnail {
  type: ComponentTypes.Thumbnail;
  id?: number;
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

export interface DefaultValue {
  id: snowflake;
  type: string;
}

export interface TextInput {
  type: ComponentTypes.TextInput;
  customID: string;
  style: TextInputStyles;
  label: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
  id?: number;
}

export interface ActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<Button | SelectMenu | TextInput>;
  id?: number;
}

export interface UnfurledMediaItem {
  url: string;
  proxyURL?: string;
  height?: number | null;
  width?: number | null;
  contentType?: string;
}
