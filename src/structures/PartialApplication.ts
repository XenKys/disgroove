import { Base, ApplicationCommand } from ".";
import type {
  JSONGuildApplicationCommandPermissions,
  RawApplication,
  RawGuildApplicationCommandPermissions,
  RawApplicationCommand,
  JSONApplication,
  JSONApplicationCommandOptionChoice,
  JSONApplicationRoleConnectionMetadata,
  RawApplicationRoleConnectionMetadata,
  JSONSKU,
  RawEntitlement,
  JSONEntitlement,
  RawSKU,
} from "../types";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ChannelTypes,
  Locale,
} from "../constants";

export class PartialApplication extends Base {
  protected override raw: Pick<RawApplication, "id" | "flags">;
  public flags?: number;

  constructor(data: Pick<RawApplication, "id" | "flags">, client: Client) {
    super(data.id, client);

    this.raw = data;

    this.patch(data);
  }

  protected override patch(data: Pick<RawApplication, "id" | "flags">) {
    if (data.flags !== undefined) this.flags = data.flags;
  }

  /** https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
  public async getGlobalApplicationCommands(options: {
    withLocalizations?: boolean;
  }): Promise<Array<ApplicationCommand>> {
    return this.client.rest
      .get<Array<RawApplicationCommand>>(
        Endpoints.applicationCommands(this.id),
        {
          with_localizations: options.withLocalizations,
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
        null,
        true,
        {
          json: this.client.util.applicationCommandToRaw(options),
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
        null,
        true,
        {
          json: this.client.util.applicationCommandToRaw(options),
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
  public async bulkOverwriteGlobalApplicationCommands(
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
        null,
        true,
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

  /** https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
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
          with_localizations: options?.withLocalizations,
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
        null,
        true,
        {
          json: this.client.util.applicationCommandToRaw(options),
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
        null,
        true,
        {
          json: this.client.util.applicationCommandToRaw(options),
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
        null,
        true,
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
        null,
        true,
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

  /** https://discord.com/developers/docs/monetization/skus#list-skus */
  public async getSKUs(): Promise<Array<JSONSKU>> {
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

  /** https://discord.com/developers/docs/monetization/entitlements#list-entitlements */
  public async getEntitlements(options?: {
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
        user_id: options?.userId,
        sku_ids: options?.skuIds,
        before: options?.before,
        after: options?.after,
        limit: options?.limit,
        guild_id: options?.guildId,
        exclude_ended: options?.excludeEnded,
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

  /** https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement */
  public async createTestEntitlement(options: {
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
      >(Endpoints.applicationEntitlements(this.id), null, true, {
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

  /** https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement */
  public deleteTestEntitlement(entitlementId: string): void {
    this.client.rest.delete(
      Endpoints.applicationEntitlement(this.id, entitlementId)
    );
  }

  public override toRaw(): Pick<RawApplication, "id" | "flags"> {
    return this.raw;
  }

  public override toJSON(): Pick<JSONApplication, "id" | "flags"> {
    return {
      id: this.id,
      flags: this.flags,
    };
  }
}
