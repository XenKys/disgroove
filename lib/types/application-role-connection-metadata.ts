import type { LocaleMap } from ".";
import type { ApplicationRoleConnectionMetadataType } from "../constants";

/** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-structure */
export interface RawApplicationRoleConnectionMetadata {
  type: ApplicationRoleConnectionMetadataType;
  key: string;
  name: string;
  name_localizations?: LocaleMap | null;
  description: string;
  description_localizations?: LocaleMap | null;
}

export interface JSONApplicationRoleConnectionMetadata {
  type: ApplicationRoleConnectionMetadataType;
  key: string;
  name: string;
  nameLocalizations?: LocaleMap | null;
  description: string;
  descriptionLocalizations?: LocaleMap | null;
}
