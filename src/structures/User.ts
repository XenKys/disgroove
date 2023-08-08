import { Base, Channel, GuildMember, Integration } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONApplicationRoleConnection,
  JSONConnection,
  JSONUser,
  RawApplicationRoleConnection,
  RawChannel,
  RawConnection,
  RawGuildMember,
  RawUser,
} from "../types";
import type {
  ApplicationRoleConnectionMetadataType,
  Locale,
  UserFlags,
} from "../utils";

export class User extends Base {
  public username: string;
  public discriminator: string;
  public avatar: string;
  public globalName: string | null;
  public bot?: boolean;
  public system?: boolean;
  public mfaEnabled?: boolean;
  public banner?: string;
  public accentColor?: number;
  public locale?: string;
  public verified?: boolean;
  public email?: string;
  public flags?: UserFlags;
  public premiumType?: number;
  public publicFlags?: UserFlags;

  constructor(data: RawUser, client: Client) {
    super(data.id, client);

    this.username = data.username;
    this.discriminator = data.discriminator;
    this.globalName = data.global_name;
    this.avatar = data.avatar;

    this.patch(data);
  }

  protected override patch(data: RawUser): void {
    if (data.bot !== undefined) this.bot = data.bot;
    if (data.system !== undefined) this.system = data.system;
    if (data.mfa_enabled !== undefined) this.mfaEnabled = data.mfa_enabled;
    if (data.banner !== undefined) this.banner = data.banner;
    if (data.accent_color !== undefined) this.accentColor = data.accent_color;
    if (data.locale !== undefined) this.locale = data.locale;
    if (data.verified !== undefined) this.verified = data.verified;
    if (data.email !== undefined) this.email = data.email;
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.premium_type !== undefined) this.premiumType = data.premium_type;
    if (data.public_flags !== undefined) this.publicFlags = data.public_flags;
  }

  /** https://discord.com/developers/docs/resources/user#modify-current-user */
  public async modifyCurrentUser(options: {
    username?: string;
    avatar?: string | null;
  }): Promise<User> {
    return new User(
      await this.client.rest.patch<RawUser>(Endpoints.user(), {
        json: {
          username: options.username,
          avatar: options.avatar,
        },
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/user#get-current-user-guild-member */
  public async getCurrentUserGuildMember(
    guildId: string
  ): Promise<GuildMember> {
    return new GuildMember(
      await this.client.rest.get<RawGuildMember>(
        Endpoints.guildMember(guildId)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/user#leave-guild */
  public leaveGuild(guildId: string): void {
    this.client.rest.delete(Endpoints.userGuild(guildId));
  }

  /** https://discord.com/developers/docs/resources/user#create-dm */
  public async createDM(options: { recipientId: string }): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(Endpoints.userChannels(), {
        json: {
          recipient_id: options.recipientId,
        },
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/user#create-group-dm */
  public async createGroupDM(options: {
    accessTokens: Array<string>;
    nicks: Array<string>;
  }): Promise<Channel> {
    return new Channel(
      await this.client.rest.post<RawChannel>(Endpoints.userChannels(), {
        json: {
          access_tokens: options.accessTokens,
          nicks: options.nicks,
        },
      }),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/user#get-user-connections */
  public async getUserConnections(): Promise<Array<JSONConnection>> {
    return this.client.rest
      .get<Array<RawConnection>>(Endpoints.userConnections())
      .then((response) =>
        response.map((data) => ({
          id: data.id,
          name: data.name,
          type: data.type,
          revoked: data.revoked,
          integrations: data.integrations?.map(
            (integration) => new Integration(integration, this.client)
          ),
          verified: data.verified,
          friendSync: data.friend_sync,
          showActivity: data.show_activity,
          twoWayLink: data.two_way_link,
          visibility: data.visibility,
        }))
      );
  }

  /** https://discord.com/developers/docs/resources/user#get-user-application-role-connection */
  public async getUserApplicationRoleConnection(): Promise<JSONApplicationRoleConnection> {
    return this.client.rest
      .get<RawApplicationRoleConnection>(
        Endpoints.userApplicationRoleConnection(
          (await this.client.getApplication()).id
        )
      )
      .then((response) => ({
        platformName: response.platform_name,
        platformUsername: response.platform_username,
        metadata: {
          type: response.metadata.type,
          key: response.metadata.key,
          name: response.metadata.name,
          nameLocalizations: response.metadata.name_localizations,
          description: response.metadata.description,
          descriptionLocalizations: response.metadata.description_localizations,
        },
      }));
  }

  /** https://discord.com/developers/docs/resources/user#update-user-application-role-connection */
  public async updateUserApplicationRoleConnection(options: {
    platformName?: string;
    platformUsername?: string;
    metadata?: {
      type: ApplicationRoleConnectionMetadataType;
      key: string;
      name: string;
      nameLocalizations?: Partial<Record<Locale, string>> | null;
      description: string;
      descriptionLocalizations?: Partial<Record<Locale, string>> | null;
    };
  }): Promise<JSONApplicationRoleConnection> {
    return this.client.rest
      .put<RawApplicationRoleConnection>(
        Endpoints.userApplicationRoleConnection(
          (await this.client.getApplication()).id
        ),
        {
          json: {
            platform_name: options.platformName,
            platform_username: options.platformUsername,
            metadata: options.metadata,
          },
        }
      )
      .then((response) => ({
        platformName: response.platform_name,
        platformUsername: response.platform_username,
        metadata: {
          type: response.metadata.type,
          key: response.metadata.key,
          name: response.metadata.name,
          nameLocalizations: response.metadata.name_localizations,
          description: response.metadata.description,
          descriptionLocalizations: response.metadata.description_localizations,
        },
      }));
  }

  public toJSON(): JSONUser {
    return {
      id: this.id,
      username: this.username,
      discriminator: this.discriminator,
      globalName: this.globalName,
      avatar: this.avatar,
      bot: this.bot,
      system: this.system,
      mfaEnabled: this.mfaEnabled,
      banner: this.banner,
      accentColor: this.accentColor,
      locale: this.locale,
      verified: this.verified,
      email: this.email,
      flags: this.flags,
      premiumType: this.premiumType,
      publicFlags: this.publicFlags,
    };
  }
}
