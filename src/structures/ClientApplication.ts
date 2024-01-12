import {
  Base,
  ApplicationCommand,
  Application,
  SKU,
  Entitlement,
  TestEntitlement,
} from ".";
import type {
  JSONGuildApplicationCommandPermissions,
  RawApplication,
  RawGuildApplicationCommandPermissions,
  RawApplicationCommand,
  JSONApplication,
  JSONApplicationCommandOptionChoice,
  JSONApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
  RawEntitlement,
  RawSKU,
  JSONInstallParams,
} from "../types";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ApplicationFlags,
  ChannelTypes,
  Locale,
} from "../constants";

export class ClientApplication extends Base {
  protected override raw: Pick<RawApplication, "id" | "flags">;
  flags?: ApplicationFlags;

  constructor(data: Pick<RawApplication, "id" | "flags">, client: Client) {
    super(data.id, client);

    this.raw = data;

    this.patch(data);
  }

  protected override patch(data: Pick<RawApplication, "id" | "flags">) {
    if (data.flags !== undefined) this.flags = data.flags;
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
  async bulkEditGlobalApplicationCommands(
    commands: Array<{
      id?: string;
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
    }>
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .put<Array<RawApplicationCommand>>(
        Endpoints.applicationCommands(this.id),
        {
          json: commands.map((command) =>
            this.client.util.applicationCommandToRaw(command)
          ),
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
  async bulkEditGuildApplicationCommands(
    guildId: string,
    commands: Array<{
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
    }>
  ): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .put<Array<RawApplicationCommand>>(
        Endpoints.applicationGuildCommands(this.id, guildId),
        {
          json: commands.map((command) =>
            this.client.util.applicationCommandToRaw(command)
          ),
        }
      )
      .then((response) =>
        response.map((data) => new ApplicationCommand(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
  async createGlobalApplicationCommand(options: {
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
          json: this.client.util.applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
  async createGuildApplicationCommand(
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
          json: this.client.util.applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement */
  async createTestEntitlement(options: {
    skuId: string;
    ownerId: string;
    ownerType: number;
  }): Promise<TestEntitlement> {
    return new TestEntitlement(
      await this.client.rest.post<
        Omit<RawEntitlement, "starts_at" | "ends_at" | "subscription_id">
      >(Endpoints.applicationEntitlements(this.id), {
        json: {
          sku_id: options.skuId,
          owner_id: options.ownerId,
          owner_type: options.ownerType,
        },
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command */
  deleteGlobalApplicationCommand(commandId: string): void {
    this.client.rest.delete(Endpoints.applicationCommand(this.id, commandId));
  }

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  deleteGuildApplicationCommand(guildId: string, commandId: string): void {
    this.client.rest.delete(
      Endpoints.applicationGuildCommand(this.id, guildId, commandId)
    );
  }

  /** https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement */
  deleteTestEntitlement(entitlementId: string): void {
    this.client.rest.delete(
      Endpoints.applicationEntitlement(this.id, entitlementId)
    );
  }

  /** https://discord.com/developers/docs/resources/application#edit-current-application */
  async edit(options: {
    customInstallURL?: string;
    description?: string;
    roleConnectionsVerificationURL?: string;
    installParams?: JSONInstallParams;
    flags?: ApplicationFlags;
    icon?: string;
    coverImage?: string;
    interactionsEndpointURL?: string;
    tags?: Array<string>;
  }): Promise<Application> {
    return new Application(
      await this.client.rest.patch<RawApplication>(
        Endpoints.applicationCurrentUser(),
        {
          json: {
            custom_install_url: options.customInstallURL,
            description: options.description,
            role_connections_verification_url:
              options.roleConnectionsVerificationURL,
            install_params: options.installParams,
            flags: options.flags,
            icon: options.icon,
            cover_image: options.coverImage,
            interactions_endpoint_url: options.interactionsEndpointURL,
            tags: options.tags,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  async editApplicationCommandPermissions(
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

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  async editGlobalApplicationCommand(
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
          json: this.client.util.applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
  async editGuildApplicationCommand(
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
          json: this.client.util.applicationCommandToRaw(options),
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  async getApplicationCommandPermissions(
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

  /** https://discord.com/developers/docs/monetization/entitlements#list-entitlements */
  async getEntitlements(options?: {
    userId?: string;
    skuIds?: Array<string>;
    before?: string;
    after?: string;
    limit?: number;
    guildId?: string;
    excludeEnded?: boolean;
  }): Promise<Array<Entitlement>> {
    return this.client.rest
      .get<Array<RawEntitlement>>(Endpoints.applicationEntitlements(this.id), {
        query: {
          user_id: options?.userId,
          sku_ids: options?.skuIds,
          before: options?.before,
          after: options?.after,
          limit: options?.limit,
          guild_id: options?.guildId,
          exclude_ended: options?.excludeEnded,
        },
      })
      .then((response) =>
        response.map((data) => new Entitlement(data, this.client))
      );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-command */
  async getGlobalApplicationCommand(
    commandId: string
  ): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      await this.client.rest.get<RawApplicationCommand>(
        Endpoints.applicationCommand(this.id, commandId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  async getGlobalApplicationCommands(options: {
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

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command */
  async getGuildApplicationCommand(
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

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
  async getGuildApplicationCommands(
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

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
  async getGuildApplicationCommandPermissions(
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

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records */
  async getApplicationRoleConnectionMetadataRecords(): Promise<
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

  /** https://discord.com/developers/docs/monetization/skus#list-skus */
  async getSKUs(): Promise<Array<SKU>> {
    return this.client.rest
      .get<Array<RawSKU>>(Endpoints.applicationSKUs(this.id))
      .then((response) => response.map((data) => new SKU(data, this.client)));
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records */
  async updateApplicationRoleConnectionMetadataRecords(): Promise<
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

  override toRaw(): Pick<RawApplication, "id" | "flags"> {
    return this.raw;
  }

  override toJSON(): Pick<JSONApplication, "id" | "flags"> {
    return {
      ...super.toJSON(),
      flags: this.flags,
    };
  }
}
