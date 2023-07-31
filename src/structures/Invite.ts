import {
  Application,
  Channel,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  User,
} from ".";
import type { Client } from "..";
import { Endpoints } from "../rest";
import type { JSONInvite, JSONInviteStageInstance, RawInvite } from "../types";

export class Invite {
  private client!: Client;
  public code: string;
  public guild?: Guild;
  public channel: Channel;
  public inviter?: User;
  public targetType?: number;
  public targetUser?: User;
  public targetApplication?: Application;
  public approximatePresenceCount?: number;
  public approximateMemberCount?: number;
  public expiresAt?: string | null;
  public stageInstance?: JSONInviteStageInstance;
  public guildScheduledEvent?: GuildScheduledEvent;

  constructor(data: RawInvite, client: Client) {
    this.client = client;
    this.code = data.code;
    this.channel = new Channel(data.channel, client);

    this.update(data);
  }

  protected update(data: RawInvite): void {
    if (data.guild !== undefined)
      this.guild = new Guild(data.guild, this.client);
    if (data.inviter !== undefined)
      this.inviter = new User(data.inviter, this.client);
    if (data.target_type !== undefined) this.targetType = data.target_type;
    if (data.target_user !== undefined)
      this.targetUser = new User(data.target_user, this.client);
    if (data.target_application !== undefined)
      this.targetApplication = new Application(
        data.target_application,
        this.client
      );
    if (data.approximate_presence_count !== undefined)
      this.approximatePresenceCount = data.approximate_presence_count;
    if (data.approximate_member_count !== undefined)
      this.approximateMemberCount = data.approximate_member_count;
    if (data.expires_at !== undefined) this.expiresAt = data.expires_at;
    if (data.stage_instance !== undefined)
      this.stageInstance = {
        members: data.stage_instance.members.map(
          (member) => new GuildMember(member, this.client)
        ),
        participantCount: data.stage_instance.participant_count,
        speakerCount: data.stage_instance.speaker_count,
        topic: data.stage_instance.topic,
      };
    if (data.guild_scheduled_event !== undefined)
      this.guildScheduledEvent = new GuildScheduledEvent(
        data.guild_scheduled_event,
        this.client
      );
  }

  /** https://discord.com/developers/docs/resources/invite#delete-invite */
  public async delete(reason?: string): Promise<JSONInvite> {
    const data: RawInvite = await this.client.rest.delete(
      Endpoints.invite(this.code),
      {
        reason,
      }
    );

    return {
      code: data.code,
      guild:
        data.guild !== undefined
          ? new Guild(data.guild, this.client)
          : undefined,
      channel: new Channel(data.channel, this.client),
      inviter:
        data.inviter !== undefined
          ? new User(data.inviter, this.client)
          : undefined,
      targetType: data.target_type,
      targetUser:
        data.target_user !== undefined
          ? new User(data.target_user, this.client)
          : undefined,
      targetApplication:
        data.target_application !== undefined
          ? new Application(data.target_application, this.client)
          : undefined,
      approximatePresenceCount: data.approximate_presence_count,
      approximateMemberCount: data.approximate_member_count,
      expiresAt: data.expires_at,
      stageInstance:
        data.stage_instance !== undefined
          ? {
              members: data.stage_instance.members.map(
                (member) => new GuildMember(member, this.client)
              ),
              participantCount: data.stage_instance.participant_count,
              speakerCount: data.stage_instance.speaker_count,
              topic: data.stage_instance.topic,
            }
          : undefined,
      guildScheduledEvent:
        data.guild_scheduled_event !== undefined
          ? new GuildScheduledEvent(data.guild_scheduled_event, this.client)
          : undefined,
    };
  }

  public toJSON(): JSONInvite {
    return {
      code: this.code,
      guild: this.guild,
      channel: this.channel,
      inviter: this.inviter,
      targetType: this.targetType,
      targetUser: this.targetUser,
      targetApplication: this.targetApplication,
      approximatePresenceCount: this.approximatePresenceCount,
      approximateMemberCount: this.approximateMemberCount,
      expiresAt: this.expiresAt,
      stageInstance: this.stageInstance,
      guildScheduledEvent: this.guildScheduledEvent,
    };
  }
}
