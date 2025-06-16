import type { RawApplication, Application } from "../types/application";
import { Guilds } from "./Guilds";
import { Teams } from "./Teams";
import { Users } from "./Users";

export class Applications {
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
      approximateUserInstallCount: application.approximate_user_install_count,
      approximateUserAuthorizationCount:
        application.approximate_user_authorization_count,
      redirectURIs: application.redirect_uris,
      interactionsEndpointURL: application.interactions_endpoint_url,
      roleConnectionsVerificationURL:
        application.role_connections_verification_url,
      eventWebhooksURL: application.event_webhooks_url,
      eventWebhooksStatus: application.event_webhooks_status,
      eventWebhooksTypes: application.event_webhooks_types,
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
      approximate_user_install_count: application.approximateUserInstallCount,
      approximate_user_authorization_count:
        application.approximateUserAuthorizationCount,
      redirect_uris: application.redirectURIs,
      interactions_endpoint_url: application.interactionsEndpointURL,
      role_connections_verification_url:
        application.roleConnectionsVerificationURL,
      event_webhooks_url: application.eventWebhooksURL,
      event_webhooks_status: application.eventWebhooksStatus,
      event_webhooks_types: application.eventWebhooksTypes,
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
