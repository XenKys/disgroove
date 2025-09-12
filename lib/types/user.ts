import type {
  UserFlags,
  Services,
  VisibilityTypes,
  PremiumTypes,
} from "../constants";
import type {
  RawApplicationRoleConnectionMetadata,
  ApplicationRoleConnectionMetadata,
} from "./application-role-connection-metadata";
import type { snowflake } from "./common";
import type { RawIntegration, Integration } from "./guild";

/** https://discord.com/developers/docs/resources/user#user-object-user-structure */
export interface RawUser {
  id: snowflake;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: UserFlags;
  premium_type?: PremiumTypes;
  public_flags?: UserFlags;
  avatar_decoration_data?: RawAvatarDecorationData | null;
  collectibles?: RawCollectibles | null;
  primary_guild?: RawUserPrimaryGuild | null;
}

/** https://discord.com/developers/docs/resources/user#user-object-user-primary-guild */
export interface RawUserPrimaryGuild {
  identity_guild_id: snowflake | null;
  identity_enabled: boolean | null;
  tag: string | null;
  badge: string | null;
}

/** https://discord.com/developers/docs/resources/user#avatar-decoration-data-object-avatar-decoration-data-structure */
export interface RawAvatarDecorationData {
  asset: string;
  sku_id: snowflake;
}

/** https://discord.com/developers/docs/resources/user#collectibles-object-collectibles-structure */
export interface RawCollectibles {
  nameplate?: RawNameplate;
}

/** https://discord.com/developers/docs/resources/user#nameplate-object-nameplate-structure */
export interface RawNameplate {
  sku_id: snowflake;
  asset: string;
  label: string;
  palette: string;
}

/** https://discord.com/developers/docs/resources/user#connection-object-connection-structure */
export interface RawConnection {
  id: snowflake;
  name: string;
  type: Services;
  revoked?: boolean;
  integrations?: Array<RawIntegration>;
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  two_way_link: boolean;
  visibility: VisibilityTypes;
}

/** https://discord.com/developers/docs/resources/user#application-role-connection-object-application-role-connection-structure */
export interface RawApplicationRoleConnection {
  platform_name: string | null;
  platform_username: string | null;
  metadata: RawApplicationRoleConnectionMetadata;
}

export interface User {
  id: snowflake;
  username: string;
  discriminator: string;
  globalName: string | null;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfaEnabled?: boolean;
  banner?: string;
  accentColor?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: UserFlags;
  premiumType?: PremiumTypes;
  publicFlags?: UserFlags;
  avatarDecorationData?: AvatarDecorationData | null;
  collectibles?: Collectibles | null;
  primaryGuild?: UserPrimaryGuild | null;
}

export interface UserPrimaryGuild {
  identityGuildId: snowflake | null;
  identityEnabled: boolean | null;
  tag: string | null;
  badge: string | null;
}

export interface AvatarDecorationData {
  asset: string;
  skuId: snowflake;
}

export interface Collectibles {
  nameplate?: Nameplate;
}

export interface Nameplate {
  skuId: snowflake;
  asset: string;
  label: string;
  palette: string;
}

export interface Connection {
  id: snowflake;
  name: string;
  type: Services;
  revoked?: boolean;
  integrations?: Array<Integration>;
  verified: boolean;
  friendSync: boolean;
  showActivity: boolean;
  twoWayLink: boolean;
  visibility: VisibilityTypes;
}

export interface ApplicationRoleConnection {
  platformName: string | null;
  platformUsername: string | null;
  metadata: ApplicationRoleConnectionMetadata;
}
