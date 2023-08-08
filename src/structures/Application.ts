import { User, ApplicationCommand } from ".";
import type {
  JSONInstallParams,
  JSONGuildApplicationCommandPermissions,
  RawApplication,
  RawGuildApplicationCommandPermissions,
  RawApplicationCommand,
  RawApplicationCommandPermission,
  JSONApplication,
  JSONTeam,
  JSONApplicationCommandOptionChoice,
  JSONApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
} from "../types";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import {
  applicationCommandToRaw,
  type ApplicationCommandOptionType,
  type ApplicationCommandTypes,
  type ChannelTypes,
  type Locale,
  teamToJSON,
} from "../utils";
import { Base } from ".";

export class Application extends Base {
  public name: string;
  public icon: string | null;
  public description: string;
  public rpcOrigins?: Array<string>;
  public botPublic: boolean;
  public botRequireCodeGrant: boolean;
  public termsOfServiceURL?: string;
  public privacyPolicyURL?: string;
  public owner?: User;
  public verifyKey: string;
  public team: JSONTeam | null;
  public guildId?: string;
  public primarySKUId?: string;
  public slug?: string;
  public coverImage?: string;
  public flags?: number;
  public tags?: Array<string>;
  public installParams?: JSONInstallParams;
  public customInstallURL?: string;
  public roleConnectionsVerificationURL?: string;

  constructor(data: RawApplication, client: Client) {
    super(data.id, client);

    this.name = data.name;
    this.icon = data.icon;
    this.description = data.description;
    this.botPublic = data.bot_public;
    this.botRequireCodeGrant = data.bot_require_code_grant;
    this.verifyKey = data.verify_key;
    this.team = null;

    this.patch(data);
  }

  protected override patch(data: RawApplication) {
    if (data.rpc_origins !== undefined) this.rpcOrigins = data.rpc_origins;
    if (data.terms_of_service_url !== undefined)
      this.termsOfServiceURL = data.terms_of_service_url;
    if (data.owner !== undefined)
      this.owner = new User(data.owner, this.client);
    if (data.team !== undefined)
      this.team =
        data.team !== null ? teamToJSON(data.team, this.client) : null;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.primary_sku_id !== undefined)
      this.primarySKUId = data.primary_sku_id;
    if (data.slug !== undefined) this.slug = data.slug;
    if (data.cover_image !== undefined) this.coverImage = data.cover_image;
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.tags !== undefined) this.tags = data.tags;
    if (data.install_params !== undefined)
      this.installParams = data.install_params;
    if (data.custom_install_url !== undefined)
      this.customInstallURL = data.custom_install_url;
    if (data.role_connections_verification_url !== undefined)
      this.roleConnectionsVerificationURL =
        data.role_connections_verification_url;
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  public async getGlobalApplicationCommands(options: {
    withLocalizations?: boolean;
  }): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .get<Array<RawApplicationCommand>>(
        Endpoints.applicationCommands(this.id),
        {
          query: {
            with_localizations: options.withLocalizations,
          },
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
  public async createGlobalApplicationCommand(options: {
    name: string;
    nameLocalizations?: Partial<Record<Locale, string>> | null;
    description?: string;
    descriptionLocalizations?: Partial<Record<Locale, string>> | null;
    options?: Array<{
      type: ApplicationCommandOptionType;
      name: string;
      nameLocalizations?: Partial<Record<Locale, string>>;
      description: string;
      descriptionLocalizations?: Partial<Record<Locale, string>>;
      required?: boolean;
      choices?: Array<JSONApplicationCommandOptionChoice>;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<JSONApplicationCommandOptionChoice>;
        channelTypes?: Array<ChannelTypes>;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      channelTypes?: Array<ChannelTypes>;
      minValue?: number;
      maxValue?: number;
      minLength?: number;
      maxLength?: number;
      autocomplete?: boolean;
    }>;
    defaultMemberPermissions?: string | null;
    dmPermission?: boolean;
    defaultPermission?: boolean | null;
    type?: ApplicationCommandTypes;
    nsfw?: boolean;
  }): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.post<RawApplicationCommand>(
        Endpoints.applicationCommands(this.id),
        {
          json: applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-command */
  public async getGlobalApplicationCommand(
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.get<RawApplicationCommand>(
        Endpoints.applicationCommand(this.id, commandId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  public async editGlobalApplicationCommand(
    commandId: string,
    options: {
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options?: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      dmPermission?: boolean;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.patch<RawApplicationCommand>(
        Endpoints.applicationCommand(this.id, commandId),
        {
          json: applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command */
  public deleteGlobalApplicationCommand(commandId: string): void {
    this.client.rest.delete(Endpoints.applicationCommand(this.id, commandId));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  public async bulkOverwriteGlobalApplicationCommands(): Promise<
    Array<ApplicationCommand>
  > {
    return this.client.rest
      .put<Array<RawApplicationCommand>>(Endpoints.applicationCommands(this.id))
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  public async getGuildApplicationCommands(
    guildId: string,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .get<Array<RawApplicationCommand>>(
        Endpoints.applicationGuildCommands(this.id, guildId),
        {
          query: {
            with_localizations: options?.withLocalizations,
          },
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  public async createGuildApplicationCommand(
    guildId: string,
    options: {
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options?: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      dmPermission?: boolean;
      defaultPermission?: boolean | null;
      type?: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.post<RawApplicationCommand>(
        Endpoints.applicationGuildCommands(this.id, guildId),
        {
          json: applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  public async getGuildApplicationCommand(
    guildId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.get<RawApplicationCommand>(
        Endpoints.applicationGuildCommand(this.id, guildId, commandId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  public async editGuildApplicationCommand(
    guildId: string,
    commandId: string,
    options: {
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options?: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      defaultPermission?: boolean | null;
      dmPermission?: boolean;
      nsfw?: boolean;
    }
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.patch<RawApplicationCommand>(
        Endpoints.applicationGuildCommand(this.id, guildId, commandId),
        {
          json: applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  public deleteGuildApplicationCommand(
    guildId: string,
    commandId: string
  ): void {
    this.client.rest.delete(
      Endpoints.applicationGuildCommand(this.id, guildId, commandId)
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  public async bulkOverwriteGuildApplicationCommands(
    guildId: string,
    options: {
      id?: string;
      name?: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description?: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
      options?: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<JSONApplicationCommandOptionChoice>;
        options?: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<JSONApplicationCommandOptionChoice>;
          channelTypes?: Array<ChannelTypes>;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: Array<ChannelTypes>;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      defaultMemberPermissions?: string | null;
      dmPermission?: boolean;
      defaultPermission?: boolean | null;
      type: ApplicationCommandTypes;
      nsfw?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .put<Array<RawApplicationCommand>>(
        Endpoints.applicationGuildCommands(this.id, guildId),
        {
          json: applicationCommandToRaw(options),
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  public async getGuildApplicationCommandPermissions(
    guildId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .get<Array<RawGuildApplicationCommandPermissions>>(
        Endpoints.guildApplicationCommandsPermissions(this.id, guildId)
      )
      .then((response) =>
        response.map((permissions: RawGuildApplicationCommandPermissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map((permission) => ({
            id: permission.id,
            type: permission.type,
            permission: permission.permission,
          })),
        }))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  public async getApplicationCommandPermissions(
    guildId: string,
    commandId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .get<Array<RawGuildApplicationCommandPermissions>>(
        Endpoints.applicationCommandPermissions(this.id, guildId, commandId)
      )
      .then((response) =>
        response.map((permissions: RawGuildApplicationCommandPermissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map((permission) => ({
            id: permission.id,
            type: permission.type,
            permission: permission.permission,
          })),
        }))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  public async editApplicationCommandPermissions(
    guildId: string,
    commandId: string,
    options: {
      permissions: Array<JSONGuildApplicationCommandPermissions>;
    }
  ): Promise<JSONGuildApplicationCommandPermissions> {
    return this.client.rest
      .put<RawGuildApplicationCommandPermissions>(
        Endpoints.applicationCommandPermissions(this.id, guildId, commandId),
        {
          json: {
            permissions: options.permissions.map((option) => ({
              id: option.id,
              application_id: option.applicationId,
              guild_id: option.guildId,
              permissions: option.permissions.map((permission) => ({
                id: permission.id,
                type: permission.type,
                permission: permission.permission,
              })),
            })),
          },
        }
      )
      .then((response) => ({
        id: response.id,
        applicationId: response.application_id,
        guildId: response.guild_id,
        permissions: response.permissions.map((permission) => ({
          id: permission.id,
          type: permission.type,
          permission: permission.permission,
        })),
      }));
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records */
  public async getApplicationRoleConnectionMetadataRecords(): Promise<
    Array<JSONApplicationRoleConnectionMetadata>
  > {
    return this.client.rest
      .get<Array<RawApplicationRoleConnectionMetadata>>(
        Endpoints.applicationRoleConnectionMetadata(this.id)
      )
      .then((response) =>
        response.map((data) => ({
          type: data.type,
          key: data.key,
          name: data.name,
          nameLocalizations: data.name_localizations,
          description: data.description,
          descriptionLocalizations: data.description_localizations,
        }))
      );
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records */
  public async updateApplicationRoleConnectionMetadataRecords(): Promise<
    Array<JSONApplicationRoleConnectionMetadata>
  > {
    return this.client.rest
      .put<Array<RawApplicationRoleConnectionMetadata>>(
        Endpoints.applicationRoleConnectionMetadata(this.id)
      )
      .then((response) =>
        response.map((data) => ({
          type: data.type,
          key: data.key,
          name: data.name,
          nameLocalizations: data.name_localizations,
          description: data.description,
          descriptionLocalizations: data.description_localizations,
        }))
      );
  }

  public override toJSON(): JSONApplication {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      description: this.description,
      rpcOrigins: this.rpcOrigins,
      botPublic: this.botPublic,
      botRequireCodeGrant: this.botRequireCodeGrant,
      termsOfServiceURL: this.termsOfServiceURL,
      privacyPolicyURL: this.privacyPolicyURL,
      owner: this.owner,
      verifyKey: this.verifyKey,
      team: this.team,
      guildId: this.guildId,
      primarySkuId: this.primarySKUId,
      slug: this.slug,
      coverImage: this.coverImage,
      flags: this.flags,
      tags: this.tags,
      installParams: this.installParams,
      customInstallURL: this.customInstallURL,
      roleConnectionsVerificationURL: this.roleConnectionsVerificationURL,
    };
  }
}
