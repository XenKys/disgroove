import type {
  RawApplicationCommand,
  ApplicationCommand,
  ApplicationCommandOption,
  RawApplicationCommandOption,
} from "../types/application-command";

export class ApplicationCommands {
  static applicationCommandFromRaw(
    command: RawApplicationCommand
  ): ApplicationCommand {
    return {
      id: command.id,
      type: command.type,
      applicationId: command.application_id,
      guildId: command.guild_id,
      name: command.name,
      nameLocalizations: command.name_localizations,
      description: command.description,
      descriptionLocalizations: command.description_localizations,
      options: command.options?.map((option) => this.optionFromRaw(option)),
      defaultMemberPermissions: command.default_member_permissions,
      dmPermission: command.dm_permission,
      defaultPermission: command.default_permission,
      integrationTypes: command.integration_types,
      contexts: command.contexts,
      nsfw: command.nsfw,
      version: command.version,
      handler: command.handler,
    };
  }

  static applicationCommandToRaw(
    command: ApplicationCommand
  ): RawApplicationCommand {
    return {
      id: command.id,
      type: command.type,
      application_id: command.applicationId,
      guild_id: command.guildId,
      name: command.name,
      name_localizations: command.nameLocalizations,
      description: command.description,
      description_localizations: command.descriptionLocalizations,
      options: command.options?.map((option) => this.optionToRaw(option)),
      default_member_permissions: command.defaultMemberPermissions,
      dm_permission: command.dmPermission,
      default_permission: command.defaultPermission,
      integration_types: command.integrationTypes,
      contexts: command.contexts,
      nsfw: command.nsfw,
      version: command.version,
      handler: command.handler,
    };
  }

  static optionToRaw(
    option: ApplicationCommandOption
  ): RawApplicationCommandOption {
    return {
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
      options: option.options?.map((o) => this.optionFromRaw(o)),
      channel_types: option.channelTypes,
      min_value: option.minValue,
      max_value: option.maxValue,
      min_length: option.minLength,
      max_length: option.maxLength,
      autocomplete: option.autocomplete,
    };
  }

  static optionFromRaw(
    option: RawApplicationCommandOption
  ): ApplicationCommandOption {
    return {
      type: option.type,
      name: option.name,
      nameLocalizations: option.name_localizations,
      description: option.description,
      descriptionLocalizations: option.description_localizations,
      required: option.required,
      choices: option.choices?.map((choice) => ({
        name: choice.name,
        nameLocalizations: choice.name_localizations,
        value: choice.value,
      })),
      options: option.options?.map((o) => this.optionFromRaw(o)),
      channelTypes: option.channel_types,
      minValue: option.min_value,
      maxValue: option.max_value,
      minLength: option.min_length,
      maxLength: option.max_length,
      autocomplete: option.autocomplete,
    };
  }
}
