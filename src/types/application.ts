import type {
  RawUser,
  RawTeam,
  JSONTeam,
  JSONUser,
  RawGuild,
  JSONGuild,
} from ".";
import type { OAuth2Scopes } from "../constants";

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
  flags?: number;
  approximate_guild_count?: number;
  tags?: Array<string>;
  install_params?: RawInstallParams;
  custom_install_url?: string;
  role_connections_verification_url?: string;
}

/** https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure */
export interface RawInstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: string;
}

export interface JSONApplication {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  rpcOrigins?: Array<string>;
  botPublic: boolean;
  botRequireCodeGrant: boolean;
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  owner?: JSONUser;
  verifyKey: string;
  team: JSONTeam | null;
  guildId?: string;
  guild?: JSONGuild;
  primarySKUId?: string;
  slug?: string;
  coverImage?: string;
  flags?: number;
  approximateGuildCount?: number;
  tags?: Array<string>;
  installParams?: JSONInstallParams;
  customInstallURL?: string;
  roleConnectionsVerificationURL?: string;
}

export interface JSONInstallParams {
  scopes: Array<OAuth2Scopes>;
  permissions: string;
}
