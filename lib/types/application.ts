import type { RawUser, RawTeam, Team, User, RawGuild, Guild } from ".";
import type { ApplicationFlags, OAuth2Scopes } from "../constants";

/** https://discord.com/developers/docs/resources/application#application-object-application-structure */
export interface RawApplication {
  id: string;
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
  guild_id?: string;
  guild?: RawGuild;
  primary_sku_id?: string;
  slug?: string;
  cover_image?: string;
  flags?: ApplicationFlags;
  approximate_guild_count?: number;
  redirect_uris?: Array<string>;
  interactions_endpoint_url?: string;
  role_connections_verification_url?: string;
  tags?: Array<string>;
  install_params?: RawInstallParams;
  custom_install_url?: string;
}

/** https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure */
export interface RawInstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: string;
}

export interface Application {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  rpcOrigins?: Array<string>;
  botPublic: boolean;
  botRequireCodeGrant: boolean;
  termsOfServiceUrl?: string;
  privacyPolicyUrl?: string;
  owner?: User;
  verifyKey: string;
  team: Team | null;
  guildId?: string;
  guild?: Guild;
  primarySkuId?: string;
  slug?: string;
  coverImage?: string;
  flags?: ApplicationFlags;
  approximateGuildCount?: number;
  redirectURIs?: Array<string>;
  interactionsEndpointUrl?: string;
  roleConnectionsVerificationUrl?: string;
  tags?: Array<string>;
  installParams?: InstallParams;
  customInstallUrl?: string;
}

export interface InstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: string;
}

export interface EditCurrentApplicationParams {
  customInstallUrl?: string;
  description?: string;
  roleConnectionsVerificationUrl?: string;
  installParams?: InstallParams;
  flags?: ApplicationFlags;
  icon?: string;
  coverImage?: string;
  interactionsEndpointUrl?: string;
  tags?: Array<string>;
}
