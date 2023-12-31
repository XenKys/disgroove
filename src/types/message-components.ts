import type { JSONEmoji, RawEmoji } from ".";
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
  emoji?: Partial<Pick<RawEmoji, "name" | "id" | "animated">>;
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
  emoji?: Partial<Pick<RawEmoji, "name" | "id" | "animated">>;
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

export interface JSONButton {
  type: ComponentTypes.Button;
  style: ButtonStyles;
  label?: string;
  emoji?: Partial<Pick<JSONEmoji, "name" | "id" | "animated">>;
  customId?: string;
  url?: string;
  disabled?: boolean;
}

export interface JSONSelectMenu {
  type:
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.RoleSelect
    | ComponentTypes.StringSelect
    | ComponentTypes.UserSelect;
  customId: string;
  options?: Array<JSONSelectOption>;
  channelTypes?: Array<ChannelTypes>;
  placeholder?: string;
  defaultValues?: Array<JSONDefaultValue>;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

export interface JSONSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Partial<Pick<JSONEmoji, "name" | "id" | "animated">>;
  default?: boolean;
}

export interface JSONDefaultValue {
  id: string;
  type: string;
}

export interface JSONTextInput {
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

export interface JSONActionRow {
  type: ComponentTypes.ActionRow;
  components: Array<JSONButton | JSONSelectMenu | JSONTextInput>;
}
