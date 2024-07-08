import type {
  ApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
} from "../types/application-role-connection-metadata";

export class ApplicationRoleConnectionMetadatas {
  static applicationRoleConnectionMetadataFromRaw(
    connectionMetadata: RawApplicationRoleConnectionMetadata
  ): ApplicationRoleConnectionMetadata {
    return {
      type: connectionMetadata.type,
      key: connectionMetadata.key,
      name: connectionMetadata.name,
      nameLocalizations: connectionMetadata.name_localizations,
      description: connectionMetadata.description,
      descriptionLocalizations: connectionMetadata.description_localizations,
    };
  }

  static applicationRoleConnectionMetadataToRaw(
    connectionMetadata: ApplicationRoleConnectionMetadata
  ): RawApplicationRoleConnectionMetadata {
    return {
      type: connectionMetadata.type,
      key: connectionMetadata.key,
      name: connectionMetadata.name,
      name_localizations: connectionMetadata.nameLocalizations,
      description: connectionMetadata.description,
      description_localizations: connectionMetadata.descriptionLocalizations,
    };
  }
}
