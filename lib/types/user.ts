import type {
  UserFlags,
  Services,
  VisibilityTypes,
  PremiumTypes,
  ApplicationRoleConnectionMetadataType,
} from "../constants";
import type {
  ApplicationRoleConnectionMetadata,
  Integration,
  LocaleMap,
  RawApplicationRoleConnectionMetadata,
  RawIntegration,
  snowflake,
} from ".";

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
  avatar_decoration?: string | null;
}

/** https://discord.com/developers/docs/resources/user#avatar-decoration-data-object-avatar-decoration-data-structure */
export interface RawAvatarDecorationData {
  asset: string;
  sku_id: snowflake;
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
  avatarDecoration?: string | null;
}

export interface AvatarDecorationData {
  asset: string;
  skuId: snowflake;
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

export interface EditCurrentUserParams {
  username?: string;
  avatar?: string | null;
  banner?: string | null;
}

export interface CreateDMParams {
  recipientId: snowflake;
}

export interface CreateGroupDMParams {
  accessTokens: Array<string>;
  nicks: Array<string>;
}

export interface UpdateCurrentUserApplicationRoleConnection {
  platformName?: string;
  platformUsername?: string;
  metadata?: {
    type: ApplicationRoleConnectionMetadataType;
    key: string;
    name: string;
    nameLocalizations?: LocaleMap | null;
    description: string;
    descriptionLocalizations?: LocaleMap | null;
  };
}
