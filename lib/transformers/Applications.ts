import type { RawApplication, Application } from "../types/application";
import type {
  RawApplicationCommand,
  ApplicationCommand,
} from "../types/application-command";
import { Guilds } from "./Guilds";
import { Teams } from "./Teams";
import { Users } from "./Users";

export class Applications {
  static applicationCommandFromRaw(
    applicationCommand: RawApplicationCommand
  ): ApplicationCommand {
    return {
      id: applicationCommand.id,
      type: applicationCommand.type,
      applicationID: applicationCommand.application_id,
      guildID: applicationCommand.guild_id,
      name: applicationCommand.name,
      nameLocalizations: applicationCommand.name_localizations,
      description: applicationCommand.description,
      descriptionLocalizations: applicationCommand.description_localizations,
      options: applicationCommand.options?.map((option) => ({
        type: option.type,
        name: option.name,
        name_localizations: option.name_localizations,
        description: option.description,
        description_localizations: option.description_localizations,
        required: option.required,
        choices: option.choices?.map((choice) => ({
          name: choice.name,
          name_localizations: choice.name_localizations,
          value: choice.value,
        })),
        options: option.options?.map((o) => ({
          type: o.type,
          name: o.name,
          name_localizations: o.name_localizations,
          description: o.description,
          description_localizations: o.description_localizations,
          required: o.required,
          choices: o.choices?.map((choice) => ({
            name: choice.name,
            name_localizations: choice.name_localizations,
            value: choice.value,
          })),
          channel_types: o.channel_types,
          min_value: o.min_value,
          max_value: o.max_value,
          min_length: o.min_length,
          max_length: o.max_length,
          autocomplete: o.autocomplete,
        })),
        channel_types: option.channel_types,
        min_value: option.min_value,
        max_value: option.max_value,
        min_length: option.min_length,
        max_length: option.max_length,
        autocomplete: option.autocomplete,
      })),
      defaultMemberPermissions: applicationCommand.default_member_permissions,
      dmPermission: applicationCommand.dm_permission,
      defaultPermission: applicationCommand.default_permission,
      integrationTypes: applicationCommand.integration_types,
      contexts: applicationCommand.contexts,
      nsfw: applicationCommand.nsfw,
      version: applicationCommand.version,
    };
  }

  static applicationCommandToRaw(
    applicationCommand: ApplicationCommand
  ): RawApplicationCommand {
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

  static applicationFromRaw(application: RawApplication): Application {
    return {
      id: application.id,
      name: application.name,
      icon: application.icon,
      description: application.description,
      rpcOrigins: application.rpc_origins,
      botPublic: application.bot_public,
      botRequireCodeGrant: application.bot_require_code_grant,
      termsOfServiceURL: application.terms_of_service_url,
      privacyPolicyURL: application.privacy_policy_url,
      owner:
        application.owner !== undefined
          ? Users.userFromRaw(application.owner)
          : undefined,
      verifyKey: application.verify_key,
      team:
        application.team !== null ? Teams.teamFromRaw(application.team) : null,
      guildID: application.guild_id,
      guild:
        application.guild !== undefined
          ? Guilds.guildFromRaw(application.guild)
          : undefined,
      primarySKUID: application.primary_sku_id,
      slug: application.slug,
      coverImage: application.cover_image,
      flags: application.flags,
      approximateGuildCount: application.approximate_guild_count,
      redirectURIs: application.redirect_uris,
      interactionsEndpointURL: application.interactions_endpoint_url,
      roleConnectionsVerificationURL:
        application.role_connections_verification_url,
      tags: application.tags,
      installParams: application.install_params,
      integrationTypesConfig:
        application.integration_types_config !== undefined
          ? {
              "0": {
                oauth2InstallParams:
                  application.integration_types_config?.[0]
                    .oauth2_install_params,
              },
              "1": {
                oauth2InstallParams:
                  application.integration_types_config?.[1]
                    .oauth2_install_params,
              },
            }
          : undefined,
      customInstallURL: application.custom_install_url,
    };
  }

  static applicationToRaw(application: Application): RawApplication {
    return {
      id: application.id,
      name: application.name,
      icon: application.icon,
      description: application.description,
      rpc_origins: application.rpcOrigins,
      bot_public: application.botPublic,
      bot_require_code_grant: application.botRequireCodeGrant,
      terms_of_service_url: application.termsOfServiceURL,
      privacy_policy_url: application.privacyPolicyURL,
      owner:
        application.owner !== undefined
          ? Users.userToRaw(application.owner)
          : undefined,
      verify_key: application.verifyKey,
      team:
        application.team !== null ? Teams.teamToRaw(application.team) : null,
      guild_id: application.guildID,
      guild:
        application.guild !== undefined
          ? Guilds.guildToRaw(application.guild)
          : undefined,
      primary_sku_id: application.primarySKUID,
      slug: application.slug,
      cover_image: application.coverImage,
      flags: application.flags,
      approximate_guild_count: application.approximateGuildCount,
      redirect_uris: application.redirectURIs,
      interactions_endpoint_url: application.interactionsEndpointURL,
      role_connections_verification_url:
        application.roleConnectionsVerificationURL,
      tags: application.tags,
      install_params: application.installParams,
      integration_types_config:
        application.integrationTypesConfig !== undefined
          ? {
              "0": {
                oauth2_install_params:
                  application.integrationTypesConfig?.[0].oauth2InstallParams,
              },
              "1": {
                oauth2_install_params:
                  application.integrationTypesConfig?.[1].oauth2InstallParams,
              },
            }
          : undefined,
      custom_install_url: application.customInstallURL,
    };
  }
}
