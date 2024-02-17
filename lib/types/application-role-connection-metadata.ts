import type {
  ApplicationRoleConnectionMetadataType,
  Locale,
} from "../constants";

/** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-structure */
export interface RawApplicationRoleConnectionMetadata {
  type: ApplicationRoleConnectionMetadataType;
  key: string;
  name: string;
  name_localizations?: Partial<Record<Locale, string>> | null;
  description: string;
  description_localizations?: Partial<Record<Locale, string>> | null;
}

export interface JSONApplicationRoleConnectionMetadata {
  type: ApplicationRoleConnectionMetadataType;
  key: string;
  name: string;
  nameLocalizations?: Partial<Record<Locale, string>> | null;
  description: string;
  descriptionLocalizations?: Partial<Record<Locale, string>> | null;
}
