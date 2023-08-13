import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONApplicationCommand,
  JSONApplicationCommandOption,
  JSONApplicationCommandOptionChoice,
  JSONApplicationCommandPermission,
  JSONGuildApplicationCommandPermissions,
  RawApplicationCommand,
  RawGuildApplicationCommandPermissions,
} from "../types";
import type {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
  ChannelTypes,
  Locale,
} from "../constants";
import { Base } from ".";

/** https://discord.com/developers/docs/interactions/application-commands */
export class ApplicationCommand extends Base {
  protected override raw: RawApplicationCommand;
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

  /** https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
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
      choices?: Array<JSONApplicationCommandOptionChoice>;
      options: Array<{
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

  /** https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
  public delete(): void {
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

  /** https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
  public async getGuildApplicationCommandPermissions(): Promise<JSONGuildApplicationCommandPermissions> {
    if (!this.guildId)
      throw new Error(
        "[disgroove] Can't get the permissions of a global application command"
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

  /** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
  public async editGuildApplicationPermissions(options: {
    permissions: Array<JSONApplicationCommandPermission>;
  }): Promise<JSONGuildApplicationCommandPermissions> {
    if (!this.guildId)
      throw new Error(
        "[disgroove] Can't edit the permissions of a global application command"
      );

    return this.client.rest
      .patch<RawGuildApplicationCommandPermissions>(
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

  public override toRaw(): RawApplicationCommand {
    return this.raw;
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
