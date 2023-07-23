import type { Client } from "../class";
import { Endpoints } from "../rest";
import type {
  JSONApplicationCommand,
  JSONApplicationCommandOption,
  JSONGuildApplicationCommandPermissions,
  RawApplicationCommand,
  RawApplicationCommandPermission,
  RawGuildApplicationCommandPermissions,
} from "../types";
import {
  type ApplicationCommandOptionType,
  type ApplicationCommandTypes,
  type ChannelTypes,
  type Locale,
  applicationCommandToRaw,
} from "../utils";
import { Base } from ".";

export class ApplicationCommand extends Base {
  public type?: ApplicationCommandTypes;
  public applicationId: string;
  public guildId?: string;
  public name: string;
  public nameLocalizations?: Partial<Record<Locale, string>> | null;
  public description: string;
  public descriptionLocalizations?: Partial<Record<Locale, string>> | null;
  public options?: Array<JSONApplicationCommandOption>;
  public defaultMemberPermissions: string | null;
  public dmPermission?: boolean;
  public defaultPermission?: boolean | null;
  public nsfw?: boolean;
  public version: string;

  constructor(data: RawApplicationCommand, client: Client) {
    super(data.id, client);

    this.applicationId = data.application_id;
    this.name = data.name;
    this.description = data.description;
    this.defaultMemberPermissions = data.default_member_permissions;
    this.version = data.version;

    this.update(data);
  }

  protected override update(data: RawApplicationCommand): void {
    if (data.type !== undefined) this.type = data.type;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
    if (data.name_localizations !== undefined)
      this.nameLocalizations = data.name_localizations;
    if (data.description_localizations !== undefined)
      this.descriptionLocalizations = data.description_localizations;
    if (data.options !== undefined) this.options = data.options;
    if (data.dm_permission !== undefined)
      this.dmPermission = data.dm_permission;
    if (data.default_permission !== undefined)
      this.defaultPermission = data.default_permission;
    if (data.nsfw !== undefined) this.nsfw = data.nsfw;
  }

  /* https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  public async edit(options: {
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
  }): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      this.guildId !== undefined
        ? await this.client.rest.request(
            "PATCH",
            Endpoints.applicationGuildCommand(this.id, this.guildId, this.id),
            {
              json: applicationCommandToRaw(options),
            }
          )
        : await this.client.rest.request(
            "PATCH",
            Endpoints.applicationCommand(this.applicationId, this.id),
            {
              json: applicationCommandToRaw(options),
            }
          ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  public async delete(): Promise<void> {
    this.guildId !== undefined
      ? await this.client.rest.request(
          "DELETE",
          Endpoints.applicationGuildCommand(
            this.applicationId,
            this.guildId,
            this.id
          )
        )
      : await this.client.rest.request(
          "DELETE",
          Endpoints.applicationCommand(this.applicationId, this.id)
        );
  }

  /* https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  public async getGuildApplicationCommandPermissions(): Promise<
    Array<JSONGuildApplicationCommandPermissions>
  > {
    if (!this.guildId)
      throw new Error(
        "[disgroove] Can't get the permissions of a global application command"
      );

    return this.client.rest
      .request(
        "GET",
        Endpoints.applicationCommandPermissions(
          this.applicationId,
          this.guildId,
          this.id
        )
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
  public async editGuildApplicationPermissions(options: {
    permissions: Array<JSONGuildApplicationCommandPermissions>;
  }): Promise<JSONGuildApplicationCommandPermissions> {
    if (!this.guildId)
      throw new Error(
        "[disgroove] Can't edit the permissions of a global application command"
      );

    return this.client.rest
      .request(
        "PATCH",
        Endpoints.applicationCommandPermissions(
          this.applicationId,
          this.guildId,
          this.id
        ),
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

  public override toJSON(): JSONApplicationCommand {
    return {
      id: this.id,
      type: this.type,
      applicationId: this.applicationId,
      guildId: this.guildId,
      name: this.name,
      nameLocalizations: this.nameLocalizations,
      description: this.description,
      descriptionLocalizations: this.descriptionLocalizations,
      options: this.options,
      defaultMemberPermissions: this.defaultMemberPermissions,
      dmPermission: this.dmPermission,
      defaultPermission: this.defaultPermission,
      nsfw: this.nsfw,
      version: this.version,
    };
  }
}
