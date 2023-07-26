import type { Integration } from "../structures";
import type { UserFlags, Services, VisibilityTypes } from "../utils";
import type {
  JSONApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
  RawIntegration,
} from "./index";

/* https://discord.com/developers/docs/resources/user#user-object-user-structure */
export interface RawUser {
  id: string;
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
  premium_type?: number;
  public_flags?: UserFlags;
}

/* https://discord.com/developers/docs/resources/user#connection-object-connection-structure */
export interface RawConnection {
  id: string;
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

/* https://discord.com/developers/docs/resources/user#application-role-connection-object-application-role-connection-structure */
export interface RawApplicationRoleConnection {
  platform_name: string | null;
  platform_username: string | null;
  metadata: RawApplicationRoleConnectionMetadata;
}

export interface JSONUser {
  id: string;
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
  premiumType?: number;
  publicFlags?: UserFlags;
}

export interface JSONConnection {
  id: string;
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

export interface JSONApplicationRoleConnection {
  platformName: string | null;
  platformUsername: string | null;
  metadata: JSONApplicationRoleConnectionMetadata;
}
