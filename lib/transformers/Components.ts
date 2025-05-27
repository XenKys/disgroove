import { ComponentTypes } from "../constants.js";
import {
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
  SelectMenu,
  RawSelectMenu,
  MediaGallery,
  RawMediaGallery,
} from "../types/message-components.js";

export class Components {
  static actionRowFromRaw(actionRow: RawActionRow): ActionRow {
    return {
      type: actionRow.type,
      components: actionRow.components.map((c) => {
        switch (c.type) {
          case ComponentTypes.Button: {
            return Components.buttonFromRaw(c);
          }
          case ComponentTypes.TextInput: {
            return Components.textInputFromRaw(c);
          }
          case ComponentTypes.ChannelSelect:
          case ComponentTypes.MentionableSelect:
          case ComponentTypes.RoleSelect:
          case ComponentTypes.UserSelect:
          case ComponentTypes.StringSelect: {
            return Components.selectMenuFromRaw(c);
          }
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
          case ComponentTypes.Button: {
            return Components.buttonToRaw(c);
          }
          case ComponentTypes.TextInput: {
            return Components.textInputToRaw(c);
          }
          case ComponentTypes.ChannelSelect:
          case ComponentTypes.MentionableSelect:
          case ComponentTypes.RoleSelect:
          case ComponentTypes.UserSelect:
          case ComponentTypes.StringSelect: {
            return Components.selectMenuToRaw(c);
          }
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
      customID: button.custom_id,
      skuID: button.sku_id,
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
      custom_id: button.customID,
      sku_id: button.skuID,
      url: button.url,
      disabled: button.disabled,
      id: button.id,
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
    };
  }

  static fileToRaw(file: File): RawFile {
    return {
      type: file.type,
      id: file.id,
      file: Components.unfurledMediaItemToRaw(file.file),
      spoiler: file.spoiler,
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

  static sectionFromRaw(section: RawSection): Section {
    return {
      type: section.type,
      id: section.id,
      components: [],
      accessory:
        section.accessory.type === ComponentTypes.Button
          ? Components.buttonFromRaw(section.accessory)
          : Components.thumbnailFromRaw(section.accessory),
    };
  }

  static sectionToRaw(section: Section): RawSection {
    return {
      type: section.type,
      id: section.id,
      components: [],
      accessory:
        section.accessory.type === ComponentTypes.Button
          ? Components.buttonToRaw(section.accessory)
          : Components.thumbnailToRaw(section.accessory),
    };
  }

  static selectMenuFromRaw(selectMenu: RawSelectMenu): SelectMenu {
    switch (selectMenu.type) {
      case ComponentTypes.ChannelSelect: {
        return {
          type: selectMenu.type,
          customID: selectMenu.custom_id,
          channelTypes: selectMenu.channel_types,
          placeholder: selectMenu.placeholder,
          defaultValues: selectMenu.default_values,
          minValues: selectMenu.min_values,
          maxValues: selectMenu.max_values,
          disabled: selectMenu.disabled,
        };
      }
      case ComponentTypes.StringSelect: {
        return {
          type: selectMenu.type,
          customID: selectMenu.custom_id,
          placeholder: selectMenu.placeholder,
          options: selectMenu.options?.map((option) => ({
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
          minValues: selectMenu.min_values,
          maxValues: selectMenu.max_values,
          disabled: selectMenu.disabled,
        };
      }
      case ComponentTypes.MentionableSelect:
      case ComponentTypes.RoleSelect:
      case ComponentTypes.UserSelect: {
        return {
          type: selectMenu.type,
          customID: selectMenu.custom_id,
          placeholder: selectMenu.placeholder,
          defaultValues: selectMenu.default_values,
          minValues: selectMenu.min_values,
          maxValues: selectMenu.max_values,
          disabled: selectMenu.disabled,
        };
      }
    }
  }

  static selectMenuToRaw(selectMenu: SelectMenu): RawSelectMenu {
    switch (selectMenu.type) {
      case ComponentTypes.ChannelSelect: {
        return {
          type: selectMenu.type,
          custom_id: selectMenu.customID,
          channel_types: selectMenu.channelTypes,
          placeholder: selectMenu.placeholder,
          default_values: selectMenu.defaultValues,
          min_values: selectMenu.minValues,
          max_values: selectMenu.maxValues,
          disabled: selectMenu.disabled,
        };
      }
      case ComponentTypes.StringSelect: {
        return {
          type: selectMenu.type,
          custom_id: selectMenu.customID,
          placeholder: selectMenu.placeholder,
          options: selectMenu.options?.map((option) => ({
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
          min_values: selectMenu.minValues,
          max_values: selectMenu.maxValues,
          disabled: selectMenu.disabled,
        };
      }
      case ComponentTypes.MentionableSelect:
      case ComponentTypes.RoleSelect:
      case ComponentTypes.UserSelect: {
        return {
          type: selectMenu.type,
          custom_id: selectMenu.customID,
          placeholder: selectMenu.placeholder,
          default_values: selectMenu.defaultValues,
          min_values: selectMenu.minValues,
          max_values: selectMenu.maxValues,
          disabled: selectMenu.disabled,
        };
      }
    }
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
      customID: textInput.custom_id,
      style: textInput.style,
      label: textInput.label,
      minLength: textInput.min_length,
      maxLength: textInput.max_length,
      required: textInput.required,
      value: textInput.value,
      placeholder: textInput.placeholder,
      id: textInput.id,
    };
  }

  static textInputToRaw(textInput: TextInput): RawTextInput {
    return {
      type: textInput.type,
      custom_id: textInput.customID,
      style: textInput.style,
      label: textInput.label,
      min_length: textInput.minLength,
      max_length: textInput.maxLength,
      required: textInput.required,
      value: textInput.value,
      placeholder: textInput.placeholder,
      id: textInput.id,
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
      contentType: unfurledMediaItem.content_type,
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
      content_type: unfurledMediaItem.contentType,
    };
  }
}
