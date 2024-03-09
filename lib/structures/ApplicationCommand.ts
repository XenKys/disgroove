import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONApplicationCommand,
  JSONApplicationCommandOption,
  JSONApplicationCommandPermission,
  JSONGuildApplicationCommandPermissions,
  LocaleMap,
  RawApplicationCommand,
  RawGuildApplicationCommandPermissions,
} from "../types";
import type { ApplicationCommandTypes } from "../constants";
import { IdentifiableBase } from ".";

/** https://discord.com/developers/docs/interactions/application-commands */
export class ApplicationCommand extends IdentifiableBase {
  protected override raw: RawApplicationCommand;

  type?: ApplicationCommandTypes;
  applicationId: string;
  guildId?: string;
  name: string;
  nameLocalizations?: LocaleMap | null;
  description: string;
  descriptionLocalizations?: LocaleMap | null;
  options?: Array<JSONApplicationCommandOption>;
  defaultMemberPermissions: string | null;
  dmPermission?: boolean;
  defaultPermission?: boolean | null;
  nsfw?: boolean;
  version: string;

  constructor(data: RawApplicationCommand, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.applicationId = data.application_id;
    this.name = data.name;
    this.description = data.description;
    this.defaultMemberPermissions = data.default_member_permissions;
    this.version = data.version;

    this.patch(data);
  }

  protected override patch(data: RawApplicationCommand): void {
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

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  delete(): void {
    this.guildId !== undefined
      ? this.client.rest.delete(
          Endpoints.applicationGuildCommand(
            this.applicationId,
            this.guildId,
            this.id
          )
        )
      : this.client.rest.delete(
          Endpoints.applicationCommand(this.applicationId, this.id)
        );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
  async edit(options: {
    name?: string;
    nameLocalizations?: LocaleMap | null;
    description?: string;
    descriptionLocalizations?: LocaleMap | null;
    options?: Array<JSONApplicationCommandOption>;
    defaultMemberPermissions?: string | null;
    defaultPermission?: boolean | null;
    dmPermission?: boolean;
    nsfw?: boolean;
  }): Promise<ApplicationCommand> {
    return new ApplicationCommand(
      this.guildId !== undefined
        ? await this.client.rest.patch<RawApplicationCommand>(
            Endpoints.applicationGuildCommand(this.id, this.guildId, this.id),
            {
              json: this.client.util.applicationCommandToRaw(options),
            }
          )
        : await this.client.rest.patch<RawApplicationCommand>(
            Endpoints.applicationCommand(this.applicationId, this.id),
            {
              json: this.client.util.applicationCommandToRaw(options),
            }
          ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  async editPermissions(options: {
    permissions: Array<JSONApplicationCommandPermission>;
  }): Promise<JSONGuildApplicationCommandPermissions> {
    if (!this.guildId)
      throw new Error(
        "[disgroove] Cannot edit the permissions of a global application command"
      );

    return this.client.rest
      .put<RawGuildApplicationCommandPermissions>(
        Endpoints.applicationCommandPermissions(
          this.applicationId,
          this.guildId,
          this.id
        ),
        {
          json: {
            permissions: options.permissions,
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

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  async getPermissions(): Promise<JSONGuildApplicationCommandPermissions> {
    if (!this.guildId)
      throw new Error(
        "[disgroove] Cannot get the permissions of a global application command"
      );

    return this.client.rest
      .get<RawGuildApplicationCommandPermissions>(
        Endpoints.applicationCommandPermissions(
          this.applicationId,
          this.guildId,
          this.id
        )
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

  override toRaw(): RawApplicationCommand {
    return this.raw;
  }

  override toJSON(): JSONApplicationCommand {
    return {
      ...super.toJSON(),
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
