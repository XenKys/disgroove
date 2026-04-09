import { ComponentTypes } from "../constants";
import type {
  ActionRow,
  Button,
  Container,
  RawActionRow,
  RawButton,
  RawContainer,
  RawFile,
  File,
  RawUnfurledMediaItem,
  UnfurledMediaItem,
  RawTextDisplay,
  TextDisplay,
  RawSeparator,
  Separator,
  RawSection,
  Section,
  Thumbnail,
  RawThumbnail,
  TextInput,
  RawTextInput,
  MediaGallery,
  RawMediaGallery,
  RawStringSelect,
  StringSelect,
  RawUserSelect,
  UserSelect,
  RawRoleSelect,
  RoleSelect,
  RawMentionableSelect,
  MentionableSelect,
  RawChannelSelect,
  ChannelSelect,
  RawLabel,
  Label,
  RawFileUpload,
  FileUpload,
  RawRadioGroup,
  RadioGroup,
  RawCheckbox,
  Checkbox,
  RawCheckboxGroup,
  CheckboxGroup,
} from "../types/components";

export class Components {
  static actionRowFromRaw(actionRow: RawActionRow): ActionRow {
    return {
      type: actionRow.type,
      components: actionRow.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.Button:
            return Components.buttonFromRaw(c);
          case ComponentTypes.StringSelect:
            return Components.stringSelectFromRaw(c);
          case ComponentTypes.TextInput:
            return Components.textInputFromRaw(c);
          case ComponentTypes.UserSelect:
            return Components.userSelectFromRaw(c);
          case ComponentTypes.RoleSelect:
            return Components.roleSelectFromRaw(c);
          case ComponentTypes.MentionableSelect:
            return Components.mentionableSelectFromRaw(c);
          case ComponentTypes.ChannelSelect:
            return Components.channelSelectFromRaw(c);
        }
      }),
      id: actionRow.id,
    };
  }

  static actionRowToRaw(actionRow: ActionRow): RawActionRow {
    return {
      type: actionRow.type,
      components: actionRow.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.Button:
            return Components.buttonToRaw(c);
          case ComponentTypes.StringSelect:
            return Components.stringSelectToRaw(c);
          case ComponentTypes.TextInput:
            return Components.textInputToRaw(c);
          case ComponentTypes.UserSelect:
            return Components.userSelectToRaw(c);
          case ComponentTypes.RoleSelect:
            return Components.roleSelectToRaw(c);
          case ComponentTypes.MentionableSelect:
            return Components.mentionableSelectToRaw(c);
          case ComponentTypes.ChannelSelect:
            return Components.channelSelectToRaw(c);
        }
      }),
      id: actionRow.id,
    };
  }

  static buttonFromRaw(button: RawButton): Button {
    return {
      type: button.type,
      style: button.style,
      label: button.label,
      emoji: button.emoji,
      customId: button.custom_id,
      skuId: button.sku_id,
      url: button.url,
      disabled: button.disabled,
      id: button.id,
    };
  }

  static buttonToRaw(button: Button): RawButton {
    return {
      type: button.type,
      style: button.style,
      label: button.label,
      emoji: button.emoji,
      custom_id: button.customId,
      sku_id: button.skuId,
      url: button.url,
      disabled: button.disabled,
      id: button.id,
    };
  }

  static channelSelectFromRaw(channelSelect: RawChannelSelect): ChannelSelect {
    return {
      type: channelSelect.type,
      id: channelSelect.id,
      customId: channelSelect.custom_id,
      channelTypes: channelSelect.channel_types,
      placeholder: channelSelect.placeholder,
      defaultValues: channelSelect.default_values,
      minValues: channelSelect.min_values,
      maxValues: channelSelect.max_values,
      disabled: channelSelect.disabled,
    };
  }

  static channelSelectToRaw(channelSelect: ChannelSelect): RawChannelSelect {
    return {
      type: channelSelect.type,
      id: channelSelect.id,
      custom_id: channelSelect.customId,
      channel_types: channelSelect.channelTypes,
      placeholder: channelSelect.placeholder,
      default_values: channelSelect.defaultValues,
      min_values: channelSelect.minValues,
      max_values: channelSelect.maxValues,
      disabled: channelSelect.disabled,
    };
  }

  static checkboxFromRaw(checkbox: RawCheckbox): Checkbox {
    return {
      type: checkbox.type,
      id: checkbox.id,
      customId: checkbox.custom_id,
      default: checkbox.default,
    };
  }

  static checkboxToRaw(checkbox: Checkbox): RawCheckbox {
    return {
      type: checkbox.type,
      id: checkbox.id,
      custom_id: checkbox.customId,
      default: checkbox.default,
    };
  }

  static checkboxGroupFromRaw(checkboxGroup: RawCheckboxGroup): CheckboxGroup {
    return {
      type: checkboxGroup.type,
      id: checkboxGroup.id,
      customId: checkboxGroup.custom_id,
      options: checkboxGroup.options,
      minValues: checkboxGroup.min_values,
      maxValues: checkboxGroup.max_values,
      required: checkboxGroup.required,
    };
  }

  static checkboxGroupToRaw(checkboxGroup: CheckboxGroup): RawCheckboxGroup {
    return {
      type: checkboxGroup.type,
      id: checkboxGroup.id,
      custom_id: checkboxGroup.customId,
      options: checkboxGroup.options,
      min_values: checkboxGroup.minValues,
      max_values: checkboxGroup.maxValues,
      required: checkboxGroup.required,
    };
  }

  static containerFromRaw(container: RawContainer): Container {
    return {
      type: container.type,
      id: container.id,
      components: container.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.ActionRow: {
            return Components.actionRowFromRaw(c);
          }
          case ComponentTypes.TextDisplay: {
            return Components.textDisplayFromRaw(c);
          }
          case ComponentTypes.Section: {
            return Components.sectionFromRaw(c);
          }
          case ComponentTypes.MediaGallery: {
            return Components.mediaGalleryFromRaw(c);
          }
          case ComponentTypes.File: {
            return Components.fileFromRaw(c);
          }
          case ComponentTypes.Separator: {
            return Components.separatorFromRaw(c);
          }
        }
      }),
      accentColor: container.accent_color,
      spoiler: container.spoiler,
    };
  }

  static containerToRaw(container: Container): RawContainer {
    return {
      type: container.type,
      id: container.id,
      components: container.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.ActionRow: {
            return Components.actionRowToRaw(c);
          }
          case ComponentTypes.TextDisplay: {
            return Components.textDisplayToRaw(c);
          }
          case ComponentTypes.Section: {
            return Components.sectionToRaw(c);
          }
          case ComponentTypes.MediaGallery: {
            return Components.mediaGalleryToRaw(c);
          }
          case ComponentTypes.File: {
            return Components.fileToRaw(c);
          }
          case ComponentTypes.Separator: {
            return Components.separatorToRaw(c);
          }
        }
      }),
      accent_color: container.accentColor,
      spoiler: container.spoiler,
    };
  }

  static fileFromRaw(file: RawFile): File {
    return {
      type: file.type,
      id: file.id,
      file: Components.unfurledMediaItemFromRaw(file.file),
      spoiler: file.spoiler,
      name: file.name,
      size: file.size,
    };
  }

  static fileToRaw(file: File): RawFile {
    return {
      type: file.type,
      id: file.id,
      file: Components.unfurledMediaItemToRaw(file.file),
      spoiler: file.spoiler,
      name: file.name,
      size: file.size,
    };
  }

  static fileUploadFromRaw(fileUpload: RawFileUpload): FileUpload {
    return {
      type: fileUpload.type,
      id: fileUpload.id,
      customId: fileUpload.custom_id,
      minValues: fileUpload.min_values,
      maxValues: fileUpload.max_values,
      required: fileUpload.required,
    };
  }

  static fileUploadToRaw(fileUpload: FileUpload): RawFileUpload {
    return {
      type: fileUpload.type,
      id: fileUpload.id,
      custom_id: fileUpload.customId,
      min_values: fileUpload.minValues,
      max_values: fileUpload.maxValues,
      required: fileUpload.required,
    };
  }

  static labelFromRaw(label: RawLabel): Label {
    let component;

    switch (label.component.type) {
      case ComponentTypes.TextInput:
        component = Components.textInputFromRaw(label.component);
        break;
      case ComponentTypes.StringSelect:
        component = Components.stringSelectFromRaw(label.component);
        break;
      case ComponentTypes.UserSelect:
        component = Components.userSelectFromRaw(label.component);
        break;
      case ComponentTypes.RoleSelect:
        component = Components.roleSelectFromRaw(label.component);
        break;
      case ComponentTypes.MentionableSelect:
        component = Components.mentionableSelectFromRaw(label.component);
        break;
      case ComponentTypes.ChannelSelect:
        component = Components.channelSelectFromRaw(label.component);
        break;
      case ComponentTypes.FileUpload:
        component = Components.fileUploadFromRaw(label.component);
        break;
      case ComponentTypes.RadioGroup:
        component = Components.radioGroupFromRaw(label.component);
        break;
      case ComponentTypes.CheckboxGroup:
        component = Components.checkboxGroupFromRaw(label.component);
        break;
      case ComponentTypes.Checkbox:
        component = Components.checkboxFromRaw(label.component);
    }

    return {
      type: label.type,
      id: label.id,
      label: label.label,
      description: label.description,
      component,
    };
  }

  static labelToRaw(label: Label): RawLabel {
    let component;

    switch (label.component.type) {
      case ComponentTypes.TextInput:
        component = Components.textInputToRaw(label.component);
        break;
      case ComponentTypes.StringSelect:
        component = Components.stringSelectToRaw(label.component);
        break;
      case ComponentTypes.UserSelect:
        component = Components.userSelectToRaw(label.component);
        break;
      case ComponentTypes.RoleSelect:
        component = Components.roleSelectToRaw(label.component);
        break;
      case ComponentTypes.MentionableSelect:
        component = Components.mentionableSelectToRaw(label.component);
        break;
      case ComponentTypes.ChannelSelect:
        component = Components.channelSelectToRaw(label.component);
        break;
      case ComponentTypes.FileUpload:
        component = Components.fileUploadToRaw(label.component);
        break;
      case ComponentTypes.RadioGroup:
        component = Components.radioGroupToRaw(label.component);
        break;
      case ComponentTypes.CheckboxGroup:
        component = Components.checkboxGroupToRaw(label.component);
        break;
      case ComponentTypes.Checkbox:
        component = Components.checkboxToRaw(label.component);
    }

    return {
      type: label.type,
      id: label.id,
      label: label.label,
      description: label.description,
      component,
    };
  }

  static mediaGalleryFromRaw(mediaGallery: RawMediaGallery): MediaGallery {
    return {
      type: mediaGallery.type,
      id: mediaGallery.id,
      items: mediaGallery.items.map((item) => ({
        media: Components.unfurledMediaItemFromRaw(item.media),
        description: item.description,
        spoiler: item.spoiler,
      })),
    };
  }

  static mediaGalleryToRaw(mediaGallery: MediaGallery): RawMediaGallery {
    return {
      type: mediaGallery.type,
      id: mediaGallery.id,
      items: mediaGallery.items.map((item) => ({
        media: Components.unfurledMediaItemToRaw(item.media),
        description: item.description,
        spoiler: item.spoiler,
      })),
    };
  }

  static mentionableSelectFromRaw(
    mentionableSelect: RawMentionableSelect
  ): MentionableSelect {
    return {
      type: mentionableSelect.type,
      id: mentionableSelect.id,
      customId: mentionableSelect.custom_id,
      placeholder: mentionableSelect.placeholder,
      defaultValues: mentionableSelect.default_values,
      minValues: mentionableSelect.min_values,
      maxValues: mentionableSelect.max_values,
      disabled: mentionableSelect.disabled,
    };
  }

  static mentionableSelectToRaw(
    mentionableSelect: MentionableSelect
  ): RawMentionableSelect {
    return {
      type: mentionableSelect.type,
      id: mentionableSelect.id,
      custom_id: mentionableSelect.customId,
      placeholder: mentionableSelect.placeholder,
      default_values: mentionableSelect.defaultValues,
      min_values: mentionableSelect.minValues,
      max_values: mentionableSelect.maxValues,
      disabled: mentionableSelect.disabled,
    };
  }

  static radioGroupFromRaw(radioGroup: RawRadioGroup): RadioGroup {
    return {
      type: radioGroup.type,
      id: radioGroup.id,
      customId: radioGroup.custom_id,
      options: radioGroup.options,
      required: radioGroup.required,
    };
  }

  static radioGroupToRaw(radioGroup: RadioGroup): RawRadioGroup {
    return {
      type: radioGroup.type,
      id: radioGroup.id,
      custom_id: radioGroup.customId,
      options: radioGroup.options,
      required: radioGroup.required,
    };
  }

  static roleSelectFromRaw(roleSelect: RawRoleSelect): RoleSelect {
    return {
      type: roleSelect.type,
      id: roleSelect.id,
      customId: roleSelect.custom_id,
      placeholder: roleSelect.placeholder,
      defaultValues: roleSelect.default_values,
      minValues: roleSelect.min_values,
      maxValues: roleSelect.max_values,
      disabled: roleSelect.disabled,
    };
  }

  static roleSelectToRaw(roleSelect: RoleSelect): RawRoleSelect {
    return {
      type: roleSelect.type,
      id: roleSelect.id,
      custom_id: roleSelect.customId,
      placeholder: roleSelect.placeholder,
      default_values: roleSelect.defaultValues,
      min_values: roleSelect.minValues,
      max_values: roleSelect.maxValues,
      disabled: roleSelect.disabled,
    };
  }

  static sectionFromRaw(section: RawSection): Section {
    let accessory;

    switch (section.accessory.type) {
      case ComponentTypes.Button:
        accessory = Components.buttonFromRaw(section.accessory);
        break;
      case ComponentTypes.Thumbnail:
        accessory = Components.thumbnailFromRaw(section.accessory);
        break;
    }

    return {
      type: section.type,
      id: section.id,
      components: section.components.map((component) => {
        switch (component.type) {
          case ComponentTypes.TextDisplay:
            return Components.textDisplayFromRaw(component);
        }
      }),
      accessory,
    };
  }

  static sectionToRaw(section: Section): RawSection {
    let accessory;

    switch (section.accessory.type) {
      case ComponentTypes.Button:
        accessory = Components.buttonToRaw(section.accessory);
        break;
      case ComponentTypes.Thumbnail:
        accessory = Components.thumbnailToRaw(section.accessory);
        break;
    }

    return {
      type: section.type,
      id: section.id,
      components: section.components.map((component) => {
        switch (component.type) {
          case ComponentTypes.TextDisplay:
            return Components.textDisplayToRaw(component);
        }
      }),
      accessory,
    };
  }

  static separatorFromRaw(separator: RawSeparator): Separator {
    return {
      type: separator.type,
      id: separator.id,
      divider: separator.divider,
      spacing: separator.spacing,
    };
  }

  static separatorToRaw(separator: Separator): RawSeparator {
    return {
      type: separator.type,
      id: separator.id,
      divider: separator.divider,
      spacing: separator.spacing,
    };
  }

  static stringSelectFromRaw(stringSelect: RawStringSelect): StringSelect {
    return {
      type: stringSelect.type,
      id: stringSelect.id,
      customId: stringSelect.custom_id,
      placeholder: stringSelect.placeholder,
      options: stringSelect.options?.map((option) => ({
        label: option.label,
        value: option.value,
        description: option.description,
        emoji:
          option.emoji !== undefined
            ? {
                name: option.emoji.name,
                id: option.emoji.id,
                animated: option.emoji.animated,
              }
            : undefined,
        default: option.default,
      })),
      minValues: stringSelect.min_values,
      maxValues: stringSelect.max_values,
      disabled: stringSelect.disabled,
    };
  }

  static stringSelectToRaw(stringSelect: StringSelect): RawStringSelect {
    return {
      type: stringSelect.type,
      custom_id: stringSelect.customId,
      placeholder: stringSelect.placeholder,
      options: stringSelect.options?.map((option) => ({
        label: option.label,
        value: option.value,
        description: option.description,
        emoji:
          option.emoji !== undefined
            ? {
                name: option.emoji.name,
                id: option.emoji.id,
                animated: option.emoji.animated,
              }
            : undefined,
        default: option.default,
      })),
      min_values: stringSelect.minValues,
      max_values: stringSelect.maxValues,
      disabled: stringSelect.disabled,
    };
  }

  static textDisplayFromRaw(textDisplay: RawTextDisplay): TextDisplay {
    return {
      type: textDisplay.type,
      id: textDisplay.id,
      content: textDisplay.content,
    };
  }

  static textDisplayToRaw(textDisplay: TextDisplay): RawTextDisplay {
    return {
      type: textDisplay.type,
      id: textDisplay.id,
      content: textDisplay.content,
    };
  }

  static textInputFromRaw(textInput: RawTextInput): TextInput {
    return {
      type: textInput.type,
      customId: textInput.custom_id,
      style: textInput.style,
      minLength: textInput.min_length,
      maxLength: textInput.max_length,
      required: textInput.required,
      value: textInput.value,
      placeholder: textInput.placeholder,
      id: textInput.id,
      label: textInput.label,
    };
  }

  static textInputToRaw(textInput: TextInput): RawTextInput {
    return {
      type: textInput.type,
      custom_id: textInput.customId,
      style: textInput.style,
      min_length: textInput.minLength,
      max_length: textInput.maxLength,
      required: textInput.required,
      value: textInput.value,
      placeholder: textInput.placeholder,
      id: textInput.id,
      label: textInput.label,
    };
  }

  static thumbnailFromRaw(thumbnail: RawThumbnail): Thumbnail {
    return {
      type: thumbnail.type,
      id: thumbnail.id,
      media: Components.unfurledMediaItemFromRaw(thumbnail.media),
      description: thumbnail.description,
      spoiler: thumbnail.spoiler,
    };
  }

  static thumbnailToRaw(thumbnail: Thumbnail): RawThumbnail {
    return {
      type: thumbnail.type,
      id: thumbnail.id,
      media: Components.unfurledMediaItemToRaw(thumbnail.media),
      description: thumbnail.description,
      spoiler: thumbnail.spoiler,
    };
  }

  static unfurledMediaItemFromRaw(
    unfurledMediaItem: RawUnfurledMediaItem
  ): UnfurledMediaItem {
    return {
      url: unfurledMediaItem.url,
      proxyURL: unfurledMediaItem.proxy_url,
      height: unfurledMediaItem.height,
      width: unfurledMediaItem.width,
      placeholder: unfurledMediaItem.placeholder,
      placeholderVersion: unfurledMediaItem.placeholder_version,
      contentType: unfurledMediaItem.content_type,
      flags: unfurledMediaItem.flags,
      attachmentId: unfurledMediaItem.attachment_id,
    };
  }

  static unfurledMediaItemToRaw(
    unfurledMediaItem: UnfurledMediaItem
  ): RawUnfurledMediaItem {
    return {
      url: unfurledMediaItem.url,
      proxy_url: unfurledMediaItem.proxyURL,
      height: unfurledMediaItem.height,
      width: unfurledMediaItem.width,
      placeholder: unfurledMediaItem.placeholder,
      placeholder_version: unfurledMediaItem.placeholderVersion,
      content_type: unfurledMediaItem.contentType,
      flags: unfurledMediaItem.flags,
      attachment_id: unfurledMediaItem.attachmentId,
    };
  }

  static userSelectFromRaw(userSelect: RawUserSelect): UserSelect {
    return {
      type: userSelect.type,
      id: userSelect.id,
      customId: userSelect.custom_id,
      placeholder: userSelect.placeholder,
      defaultValues: userSelect.default_values,
      minValues: userSelect.min_values,
      maxValues: userSelect.max_values,
      disabled: userSelect.disabled,
    };
  }

  static userSelectToRaw(userSelect: UserSelect): RawUserSelect {
    return {
      type: userSelect.type,
      id: userSelect.id,
      custom_id: userSelect.customId,
      placeholder: userSelect.placeholder,
      default_values: userSelect.defaultValues,
      min_values: userSelect.minValues,
      max_values: userSelect.maxValues,
      disabled: userSelect.disabled,
    };
  }
}
