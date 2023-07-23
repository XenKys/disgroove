import { User, ApplicationCommand } from ".";
import type {
  JSONInstallParams,
  JSONGuildApplicationCommandPermissions,
  RawApplication,
  RawGuildApplicationCommandPermissions,
  RawApplicationCommand,
  RawApplicationCommandPermission,
  JSONTeam,
  JSONApplication,
} from "../types";
import type { Client } from "../class";
import { Endpoints } from "../rest";
import {
  rawApplicationCommand,
  type ApplicationCommandOptionType,
  type ApplicationCommandTypes,
  type ChannelTypes,
  type Locale,
} from "../utils";
import { Base } from "./Base";

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

    this.update(data);
  }

  protected override update(data: RawApplication) {
    if (data.rpc_origins !== undefined) this.rpcOrigins = data.rpc_origins;
    if (data.terms_of_service_url !== undefined)
      this.termsOfServiceURL = data.terms_of_service_url;
    if (data.owner !== undefined)
      this.owner = new User(data.owner, this.client);
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

  /* https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  public async getGlobalApplicationCommands(options: {
    withLocalizations?: boolean;
  }): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .request("GET", Endpoints.applicationCommands(this.id), {
        query: {
          with_localizations: options.withLocalizations,
        },
      })
      .then((response) =>
        response.map(
          (data: RawApplicationCommand) =>
            new ApplicationCommand(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
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
      choices?: Array<string>;
      options: Array<{
        type: ApplicationCommandOptionType;
        name: string;
        nameLocalizations?: Partial<Record<Locale, string>>;
        description: string;
        descriptionLocalizations?: Partial<Record<Locale, string>>;
        required?: boolean;
        choices?: Array<string>;
        channelTypes?: ChannelTypes;
        minValue?: number;
        maxValue?: number;
        minLength?: number;
        maxLength?: number;
        autocomplete?: boolean;
      }>;
      channelTypes?: ChannelTypes;
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
      await this.client.rest.request(
        "POST",
        Endpoints.applicationCommands(this.id),
        {
          json: rawApplicationCommand(options),
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-global-application-command */
  public async getGlobalApplicationCommand(
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.request(
        "GET",
        Endpoints.applicationCommand(this.id, commandId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
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
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
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
      await this.client.rest.request(
        "PATCH",
        Endpoints.applicationCommand(this.id, commandId),
        {
          json: rawApplicationCommand(options),
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command */
  public async deleteGlobalApplicationCommand(
    commandId: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.applicationCommand(this.id, commandId)
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  public async bulkOverwriteGlobalApplicationCommands(): Promise<
    Array<ApplicationCommand>
  > {
    return this.client.rest
      .request("PUT", Endpoints.applicationCommands(this.id))
      .then((response) =>
        response.map(
          (data: RawApplicationCommand) =>
            new ApplicationCommand(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  public async getGuildApplicationCommands(
    guildId: string,
    options?: {
      withLocalizations?: boolean;
    }
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .request("GET", Endpoints.applicationGuildCommands(this.id, guildId), {
        query: {
          with_localizations: options?.withLocalizations,
        },
      })
      .then((response) =>
        response.map(
          (data: RawApplicationCommand) =>
            new ApplicationCommand(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
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
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
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
      await this.client.rest.request(
        "POST",
        Endpoints.applicationGuildCommands(this.id, guildId),
        {
          json: rawApplicationCommand(options),
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  public async getGuildApplicationCommand(
    guildId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.request(
        "GET",
        Endpoints.applicationGuildCommand(this.id, guildId, commandId)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
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
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
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
      await this.client.rest.request(
        "PATCH",
        Endpoints.applicationGuildCommand(this.id, guildId, commandId),
        {
          json: rawApplicationCommand(options),
        }
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  public async deleteGuildApplicationCommand(
    guildId: string,
    commandId: string
  ): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.applicationGuildCommand(this.id, guildId, commandId)
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
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
        choices?: Array<string>;
        options: Array<{
          type: ApplicationCommandOptionType;
          name: string;
          nameLocalizations?: Partial<Record<Locale, string>>;
          description: string;
          descriptionLocalizations?: Partial<Record<Locale, string>>;
          required?: boolean;
          choices?: Array<string>;
          channelTypes?: ChannelTypes;
          minValue?: number;
          maxValue?: number;
          minLength?: number;
          maxLength?: number;
          autocomplete?: boolean;
        }>;
        channelTypes?: ChannelTypes;
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
      .request("PUT", Endpoints.applicationGuildCommands(this.id, guildId), {
        json: {
          name: options?.name,
          name_localizations: options?.nameLocalizations,
          description: options?.description,
          description_localizations: options?.descriptionLocalizations,
          options: options?.options?.map((option) => ({
            type: option.type,
            name: option.name,
            name_localizations: option?.nameLocalizations,
            description: option.description,
            description_localizations: option?.descriptionLocalizations,
            required: option?.required,
            choices: option?.choices,
            options: option?.options?.map((o) => ({
              type: o.type,
              name: o.name,
              name_localizations: o?.nameLocalizations,
              description: o.description,
              description_localizations: o?.descriptionLocalizations,
              required: o?.required,
              choices: o?.choices,
              channel_types: o?.channelTypes,
              min_value: o?.minValue,
              max_value: o?.maxValue,
              min_length: o?.minLength,
              max_length: o?.maxLength,
              autocomplete: o?.autocomplete,
            })),
          })),
          default_member_permissions: options?.defaultMemberPermissions,
          default_permission: options?.defaultPermission,
          type: options?.type,
          nsfw: options?.nsfw,
        },
      })
      .then((response) =>
        response.map(
          (data: RawApplicationCommand) =>
            new ApplicationCommand(data, this.client)
        )
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  public async getGuildApplicationCommandPermissions(
    guildId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .request(
        "GET",
        Endpoints.guildApplicationCommandsPermissions(this.id, guildId)
      )
      .then((response) =>
        response.map((permissions: RawGuildApplicationCommandPermissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map(
            (permission: RawApplicationCommandPermission) => ({
              id: permission.id,
              type: permission.type,
              permission: permission.permission,
            })
          ),
        }))
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  public async getApplicationCommandPermissions(
    guildId: string,
    commandId: string
  ): Promise<Array<JSONGuildApplicationCommandPermissions>> {
    return this.client.rest
      .request(
        "GET",
        Endpoints.applicationCommandPermissions(this.id, guildId, commandId)
      )
      .then((response) =>
        response.map((permissions: RawGuildApplicationCommandPermissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map(
            (permission: RawApplicationCommandPermission) => ({
              id: permission.id,
              type: permission.type,
              permission: permission.permission,
            })
          ),
        }))
      );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  public async editApplicationCommandPermissions(
    guildId: string,
    commandId: string,
    options: {
      permissions: Array<JSONGuildApplicationCommandPermissions>;
    }
  ): Promise<RawGuildApplicationCommandPermissions> {
    return this.client.rest
      .request(
        "PUT",
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
      .then((response) =>
        response.map((permissions: RawGuildApplicationCommandPermissions) => ({
          id: permissions.id,
          applicationId: permissions.application_id,
          guildId: permissions.guild_id,
          permissions: permissions.permissions.map(
            (permission: RawApplicationCommandPermission) => ({
              id: permission.id,
              type: permission.type,
              permission: permission.permission,
            })
          ),
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
