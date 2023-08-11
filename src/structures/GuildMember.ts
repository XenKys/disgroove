import { User } from ".";
import type { Client } from "../client/Client";
import { Endpoints } from "../rest";
import type { JSONGuildMember, RawGuildMember } from "../types";
import type { GuildMemberFlags } from "../utils";

export class GuildMember {
  private client: Client;
  private raw: RawGuildMember & { guild_id?: string };
  public user?: User;
  public nick?: string | null;
  public avatar?: string | null;
  public roles: Array<string>;
  public joinedAt: number;
  public premiumSince?: number | null;
  public deaf: boolean;
  public mute: boolean;
  public flags: GuildMemberFlags;
  public pending?: boolean;
  public permissions?: string;
  public communicationDisabledUntil?: number | null;
  public guildId?: string;

  constructor(data: RawGuildMember & { guild_id?: string }, client: Client) {
    this.client = client;
    this.raw = data;
    this.roles = data.roles;
    this.joinedAt = data.joined_at;
    this.deaf = data.deaf;
    this.mute = data.mute;
    this.flags = data.flags;

    this.patch(data);
  }

  private patch(data: RawGuildMember & { guild_id?: string }): void {
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

  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  public edit(
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
  ): void {
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.patch(Endpoints.guildMember(this.guildId, this.user?.id), {
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
    });
  }

  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  public addRole(roleId: string, reason?: string): void {
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

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  public removeRole(roleId: string, reason?: string): void {
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

  /** https://discord.com/developers/docs/resources/guild#remove-guild-member */
  public remove(reason?: string): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.delete(Endpoints.guildMember(this.guildId, this.user.id), {
      reason,
    });
  }

  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  public createBan(
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

  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  public removeBan(userId: string, reason?: string): void {
    if (!this.user?.id)
      throw new Error("[disgroove] Guild member ID not found");

    this.client.rest.delete(Endpoints.guildBan(this.user.id, userId), {
      reason,
    });
  }

  public toString(): string {
    return `[${this.constructor.name}]`;
  }

  public toRaw(): RawGuildMember & { guild_id?: string } {
    return this.raw;
  }

  public toJSON(): JSONGuildMember & { guildId?: string } {
    return {
      user: this.user,
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
