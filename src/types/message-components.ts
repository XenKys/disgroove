import type { JSONEmoji, RawEmoji } from ".";
import type { ChannelTypes } from "../utils";

/* https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
export interface RawButton {
  type: number;
  style: number;
  label?: string;
  emoji?: RawEmoji;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

/* https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface RawSelectMenu {
  type: number;
  custom_id: string;
  options?: Array<RawSelectOption>;
  channel_types?: Array<ChannelTypes>;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

/* https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure */
export interface RawSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: RawEmoji;
  default?: boolean;
}

/* https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface RawTextInput {
  type: number;
  custom_id: string;
  style: number;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

export interface JSONButton {
  type: number;
  style: number;
  label?: string;
  emoji?: JSONEmoji;
  customId?: string;
  url?: string;
  disabled?: boolean;
}

export interface JSONSelectMenu {
  type: number;
  customId: string;
  options?: Array<JSONSelectOption>;
  channelTypes?: Array<ChannelTypes>;
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

export interface JSONSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: JSONEmoji;
  default?: boolean;
}

export interface JSONTextInput {
  type: number;
  customId: string;
  style: number;
  label: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}
