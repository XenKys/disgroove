import { Base, User, ApplicationCommand, Team, Guild } from ".";
import type {
  JSONInstallParams,
  JSONGuildApplicationCommandPermissions,
  RawApplication,
  RawGuildApplicationCommandPermissions,
  RawApplicationCommand,
  JSONApplication,
  JSONApplicationCommandOptionChoice,
  JSONApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
  JSONSKU,
  RawSKU,
  JSONEntitlement,
  RawEntitlement,
} from "../types";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ChannelTypes,
  Locale,
} from "../constants";

/** https://discord.com/developers/docs/resources/application */
export class Application extends Base {
  protected override raw: RawApplication;
  name: string;
  icon: string | null;
  description: string;
  rpcOrigins?: Array<string>;
  botPublic: boolean;
  botRequireCodeGrant: boolean;
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  owner?: User;
  verifyKey: string;
  team: Team | null;
  guildId?: string;
  guild?: Guild;
  primarySKUId?: string;
  slug?: string;
  coverImage?: string;
  flags?: number;
  approximateGuildCount?: number;
  redirectURIs?: Array<string>;
  interactionsEndpointURL?: string;
  roleConnectionsVerificationURL?: string;
  tags?: Array<string>;
  installParams?: JSONInstallParams;
  customInstallURL?: string;

  constructor(data: RawApplication, client: Client) {
    super(data.id, client);

    this.raw = data;
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
      this.team = data.team !== null ? new Team(data.team, this.client) : null;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.guild !== undefined)
      this.guild = new Guild(data.guild, this.client);
    if (data.primary_sku_id !== undefined)
      this.primarySKUId = data.primary_sku_id;
    if (data.slug !== undefined) this.slug = data.slug;
    if (data.cover_image !== undefined) this.coverImage = data.cover_image;
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.approximate_guild_count !== undefined)
      this.approximateGuildCount = data.approximate_guild_count;
    if (data.redirect_uris !== undefined)
      this.redirectURIs = data.redirect_uris;
    if (data.interactions_endpoint_url !== undefined)
      this.interactionsEndpointURL = data.interactions_endpoint_url;
    if (data.role_connections_verification_url !== undefined)
      this.roleConnectionsVerificationURL =
        data.role_connections_verification_url;
    if (data.tags !== undefined) this.tags = data.tags;
    if (data.install_params !== undefined)
      this.installParams = data.install_params;
    if (data.custom_install_url !== undefined)
      this.customInstallURL = data.custom_install_url;
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
  }): Promise<
    Pick<
      JSONEntitlement,
      | "id"
      | "applicationId"
      | "deleted"
      | "guildId"
      | "skuId"
      | "type"
      | "userId"
    >
  > {
    return this.client.rest
      .post<
        Pick<
          RawEntitlement,
          | "id"
          | "application_id"
          | "deleted"
          | "guild_id"
          | "sku_id"
          | "type"
          | "user_id"
        >
      >(Endpoints.applicationEntitlements(this.id), {
        json: {
          sku_id: options.skuId,
          owner_id: options.ownerId,
          owner_type: options.ownerType,
        },
      })
      .then((response) => ({
        id: response.id,
        applicationId: response.application_id,
        deleted: response.deleted,
        guildId: response.guild_id,
        skuId: response.sku_id,
        type: response.type,
        userId: response.user_id,
      }));
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
    flags?: number;
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
  }): Promise<Array<JSONEntitlement>> {
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
        response.map((data) => ({
          id: data.id,
          applicationId: data.application_id,
          deleted: data.deleted,
          guildId: data.guild_id,
          skuId: data.sku_id,
          type: data.type,
          userId: data.user_id,
          startsAt: data.starts_at,
          endsAt: data.ends_at,
        }))
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
  async getSKUs(): Promise<Array<JSONSKU>> {
    return this.client.rest
      .get<Array<RawSKU>>(Endpoints.applicationSKUs(this.id))
      .then((response) =>
        response.map((data) => ({
          id: data.id,
          type: data.type,
          applicationId: data.application_id,
          name: data.name,
          slug: data.slug,
          flags: data.flags,
        }))
      );
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

  override toRaw(): RawApplication {
    return this.raw;
  }

  override toJSON(): JSONApplication {
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
      owner: this.owner?.toJSON(),
      verifyKey: this.verifyKey,
      team: this.team?.toJSON() ?? null,
      guildId: this.guildId,
      guild: this.guild?.toJSON(),
      primarySKUId: this.primarySKUId,
      slug: this.slug,
      coverImage: this.coverImage,
      flags: this.flags,
      approximateGuildCount: this.approximateGuildCount,
      redirectURIs: this.redirectURIs,
      interactionsEndpointURL: this.interactionsEndpointURL,
      roleConnectionsVerificationURL: this.roleConnectionsVerificationURL,
      tags: this.tags,
      installParams: this.installParams,
      customInstallURL: this.customInstallURL,
    };
  }
}
