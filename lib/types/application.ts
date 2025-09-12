import type {
  ActivityLocationKind,
  ApplicationEventWebhookStatus,
  ApplicationFlags,
  ApplicationIntegrationTypes,
  OAuth2Scopes,
} from "../constants";
import type { snowflake } from "./common";
import type { RawGuild, Guild } from "./guild";
import type { RawTeam, Team } from "./team";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/application#application-object-application-structure */
export interface RawApplication {
  id: snowflake;
  name: string;
  icon: string | null;
  description: string;
  rpc_origins?: Array<string>;
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: RawUser;
  verify_key: string;
  team: RawTeam | null;
  guild_id?: snowflake;
  guild?: RawGuild;
  primary_sku_id?: snowflake;
  slug?: string;
  cover_image?: string;
  flags?: ApplicationFlags;
  approximate_guild_count?: number;
  approximate_user_install_count?: number;
  approximate_user_authorization_count?: number;
  redirect_uris?: Array<string>;
  interactions_endpoint_url?: string;
  role_connections_verification_url?: string;
  event_webhooks_url?: string | null;
  event_webhooks_status: ApplicationEventWebhookStatus;
  event_webhooks_types?: Array<string>;
  tags?: Array<string>;
  install_params?: RawInstallParams;
  integration_types_config?: Record<
    ApplicationIntegrationTypes,
    RawApplicationIntegrationTypeConfiguration
  >;
  custom_install_url?: string;
}

/** https://discord.com/developers/docs/resources/application#application-object-application-integration-type-configuration-object */
export interface RawApplicationIntegrationTypeConfiguration {
  oauth2_install_params: RawInstallParams;
}

/** https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure */
export interface RawInstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: string;
}

/** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-instance-object */
export interface RawActivityInstance {
  application_id: snowflake;
  instance_id: string;
  launch_id: snowflake;
  location: RawActivityLocation;
  users: Array<snowflake>;
}

/** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-location-object */
export interface RawActivityLocation {
  id: string;
  kind: ActivityLocationKind;
  channel_id: snowflake;
  guild_id?: snowflake | null;
}

export interface Application {
  id: snowflake;
  name: string;
  icon: string | null;
  description: string;
  rpcOrigins?: Array<string>;
  botPublic: boolean;
  botRequireCodeGrant: boolean;
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  owner?: User;
  verifyKey: string;
  team: Team | null;
  guildId?: snowflake;
  guild?: Guild;
  primarySKUId?: snowflake;
  slug?: string;
  coverImage?: string;
  flags?: ApplicationFlags;
  approximateGuildCount?: number;
  approximateUserInstallCount?: number;
  approximateUserAuthorizationCount?: number;
  redirectURIs?: Array<string>;
  interactionsEndpointURL?: string;
  roleConnectionsVerificationURL?: string;
  eventWebhooksURL?: string | null;
  eventWebhooksStatus: ApplicationEventWebhookStatus;
  eventWebhooksTypes?: Array<string>;
  tags?: Array<string>;
  installParams?: InstallParams;
  integrationTypesConfig?: Record<
    ApplicationIntegrationTypes,
    ApplicationIntegrationTypeConfiguration
  >;
  customInstallURL?: string;
}

export interface ApplicationIntegrationTypeConfiguration {
  oauth2InstallParams: InstallParams;
}

export interface InstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: string;
}

export interface ActivityInstance {
  applicationId: snowflake;
  instanceId: string;
  launchId: snowflake;
  location: ActivityLocation;
  users: Array<snowflake>;
}

export interface ActivityLocation {
  id: string;
  kind: ActivityLocationKind;
  channelId: snowflake;
  guildId?: snowflake | null;
}
