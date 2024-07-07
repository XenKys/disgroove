import type {
  ApplicationCommand,
  RawApplicationCommand,
} from "../types/application-command";
import type { Attachment, RawAttachment } from "../types/channel";

export class Util {
  partialApplicationCommandToRaw(
    applicationCommand: Partial<ApplicationCommand>
  ): Partial<RawApplicationCommand> {
    return {
      id: applicationCommand.id,
      type: applicationCommand.type,
      application_id: applicationCommand.applicationID,
      guild_id: applicationCommand.guildID,
      name: applicationCommand.name,
      name_localizations: applicationCommand.nameLocalizations,
      description: applicationCommand.description,
      description_localizations: applicationCommand.descriptionLocalizations,
      options: applicationCommand.options?.map((option) => ({
        type: option.type,
        name: option.name,
        name_localizations: option.nameLocalizations,
        description: option.description,
        description_localizations: option.descriptionLocalizations,
        required: option.required,
        choices: option.choices?.map((choice) => ({
          name: choice.name,
          name_localizations: choice.nameLocalizations,
          value: choice.value,
        })),
        options: option.options?.map((o) => ({
          type: o.type,
          name: o.name,
          name_localizations: o.nameLocalizations,
          description: o.description,
          description_localizations: o.descriptionLocalizations,
          required: o.required,
          choices: o.choices?.map((choice) => ({
            name: choice.name,
            name_localizations: choice.nameLocalizations,
            value: choice.value,
          })),
          channel_types: o.channelTypes,
          min_value: o.minValue,
          max_value: o.maxValue,
          min_length: o.minLength,
          max_length: o.maxLength,
          autocomplete: o.autocomplete,
        })),
        channel_types: option.channelTypes,
        min_value: option.minValue,
        max_value: option.maxValue,
        min_length: option.minLength,
        max_length: option.maxLength,
        autocomplete: option.autocomplete,
      })),
      default_member_permissions: applicationCommand.defaultMemberPermissions,
      dm_permission: applicationCommand.dmPermission,
      default_permission: applicationCommand.defaultPermission,
      integration_types: applicationCommand.integrationTypes,
      contexts: applicationCommand.contexts,
      nsfw: applicationCommand.nsfw,
      version: applicationCommand.version,
    };
  }

  partialAttachmentToRaw(
    attachment: Partial<Attachment>
  ): Partial<RawAttachment> {
    return {
      id: attachment.id,
      filename: attachment.filename,
      title: attachment.title,
      description: attachment.description,
      content_type: attachment.contentType,
      size: attachment.size,
      url: attachment.url,
      proxy_url: attachment.proxyURL,
      height: attachment.height,
      width: attachment.width,
      ephemeral: attachment.ephemeral,
      duration_secs: attachment.durationSecs,
      waveform: attachment.waveform,
      flags: attachment.flags,
    };
  }
}
