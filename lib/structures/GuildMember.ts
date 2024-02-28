import { Base, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONGuildMember,
  JSONGuildMemberAddEventExtraFields,
  RawGuildMember,
  RawGuildMemberAddEventExtraFields,
} from "../types";
import type { GuildMemberFlags } from "../constants";

/** https://discord.com/developers/docs/resources/guild */
export class GuildMember extends Base {
  protected override raw: RawGuildMember &
    Partial<RawGuildMemberAddEventExtraFields>;

  user?: User;
  nick?: string | null;
  avatar?: string | null;
  roles: Array<string>;
  joinedAt: string;
  premiumSince?: number | null;
  deaf: boolean;
  mute: boolean;
  flags: GuildMemberFlags;
  pending?: boolean;
  permissions?: string;
  communicationDisabledUntil?: number | null;

  /** Only for GUILD_MEMBER_ADD and GUILD_MEMBER_UPDATE gateway event */
  guildId?: string;

  constructor(
    data: RawGuildMember & Partial<RawGuildMemberAddEventExtraFields>,
    client: Client
  ) {
    super(client);

    this.raw = data;
    this.roles = data.roles;
    this.joinedAt = data.joined_at;
    this.deaf = data.deaf;
    this.mute = data.mute;
    this.flags = data.flags;

    this.patch(data);
  }

  protected override patch(
    data: RawGuildMember & Partial<RawGuildMemberAddEventExtraFields>
  ): void {
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.nick !== undefined) this.nick = data.nick;
    if (data.avatar !== undefined) this.avatar = data.avatar;
    if (data.premium_since !== undefined)
      this.premiumSince = data.premium_since;
    if (data.pending !== undefined) this.pending = data.pending;
    if (data.permissions !== undefined) this.permissions = data.permissions;
    if (data.communication_disabled_until !== undefined)
      this.communicationDisabledUntil = data.communication_disabled_until;
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  addRole(roleId: string, reason?: string): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.put(
      Endpoints.guildMemberRole(this.guildId, this.user.id, roleId),
      {
        reason,
      }
    );
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  createBan(
    options?: {
      deleteMessageDays?: number;
      deleteMessageSeconds?: number;
    },
    reason?: string
  ): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.put(Endpoints.guildBan(this.guildId, this.user.id), {
      json: {
        delete_message_days: options?.deleteMessageDays,
        delete_message_seconds: options?.deleteMessageSeconds,
      },
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  async edit(
    options: {
      nick?: string | null;
      roles?: Array<string> | null;
      mute?: boolean | null;
      deaf?: boolean | null;
      channelId?: string | null;
      communicationDisabledUntil?: number | null;
      flags?: GuildMemberFlags;
    },
    reason?: string
  ): Promise<GuildMember> {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    return new GuildMember(
      await this.client.rest.patch(
        Endpoints.guildMember(this.guildId, this.user.id),
        {
          json: {
            nick: options.nick,
            roles: options.roles,
            mute: options.mute,
            deaf: options.deaf,
            channel_id: options.channelId,
            communication_disabled_until: options.communicationDisabledUntil,
            flags: options.flags,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member */
  remove(reason?: string): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.delete(Endpoints.guildMember(this.guildId, this.user.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  removeBan(reason?: string): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.delete(Endpoints.guildBan(this.guildId, this.user.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  removeRole(roleId: string, reason?: string): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.delete(
      Endpoints.guildMemberRole(this.guildId, this.user.id, roleId),
      {
        reason,
      }
    );
  }

  override toRaw(): RawGuildMember &
    Partial<RawGuildMemberAddEventExtraFields> {
    return this.raw;
  }

  override toJSON(): JSONGuildMember &
    Partial<JSONGuildMemberAddEventExtraFields> {
    return {
      user: this.user?.toJSON(),
      nick: this.nick,
      avatar: this.avatar,
      roles: this.roles,
      joinedAt: this.joinedAt,
      premiumSince: this.premiumSince,
      deaf: this.deaf,
      mute: this.mute,
      flags: this.flags,
      pending: this.pending,
      permissions: this.permissions,
      communicationDisabledUntil: this.communicationDisabledUntil,
      guildId: this.guildId,
    };
  }
}
