import type { Emoji, RawEmoji } from ".";
import type {
  ButtonStyles,
  ChannelTypes,
  ComponentTypes,
  TextInputStyles,
} from "../constants";

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
export interface RawButton {
  type: ComponentTypes.Button;
  style: ButtonStyles;
  label?: string;
  emoji?: Pick<RawEmoji, "name" | "id" | "animated">;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
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
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure */
export interface RawSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<RawEmoji, "name" | "id" | "animated">;
  default?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure */
export interface RawDefaultValue {
  id: string;
  type: string;
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
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
}

/** https://discord.com/developers/docs/interactions/message-components#action-rows */
export interface RawActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<RawButton | RawSelectMenu | RawTextInput>;
}

export interface Button {
  type: ComponentTypes.Button;
  style: ButtonStyles;
  label?: string;
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  customId?: string;
  url?: string;
  disabled?: boolean;
}

export interface SelectMenu {
  type:
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.RoleSelect
    | ComponentTypes.StringSelect
    | ComponentTypes.UserSelect;
  customId: string;
  options?: Array<SelectOption>;
  channelTypes?: Array<ChannelTypes>;
  placeholder?: string;
  defaultValues?: Array<DefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  default?: boolean;
}

export interface DefaultValue {
  id: string;
  type: string;
}

export interface TextInput {
  type: ComponentTypes.TextInput;
  customId: string;
  style: TextInputStyles;
  label: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

export interface ActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<Button | SelectMenu | TextInput>;
}
