import {
  Application,
  Channel,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  User,
} from ".";
import type { Client } from "../Client";
import { InviteTargetTypes } from "../constants";
import { Endpoints } from "../rest";
import type { JSONInvite, JSONInviteStageInstance, RawInvite } from "../types";

/** https://discord.com/developers/docs/resources/invite */
export class Invite {
  private client: Client;
  private raw: RawInvite;

  code: string;
  guild?: Guild;
  channel: Channel;
  inviter?: User;
  targetType?: InviteTargetTypes;
  targetUser?: User;
  targetApplication?: Application;
  approximatePresenceCount?: number;
  approximateMemberCount?: number;
  expiresAt?: string | null;
  stageInstance?: JSONInviteStageInstance;
  guildScheduledEvent?: GuildScheduledEvent;

  constructor(data: RawInvite, client: Client) {
    this.client = client;
    this.raw = data;
    this.code = data.code;
    this.channel = new Channel(data.channel, client);

    this.patch(data);
  }

  private patch(data: RawInvite): void {
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
        members: data.stage_instance.members.map((member) =>
          new GuildMember(member, this.client).toJSON()
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
  async delete(reason?: string): Promise<JSONInvite> {
    return new Invite(
      await this.client.rest.delete<RawInvite>(Endpoints.invite(this.code), {
        reason,
      }),
      this.client
    ).toJSON();
  }

  toString(): string {
    return `[${this.constructor.name}]`;
  }

  toRaw(): RawInvite {
    return this.raw;
  }

  toJSON(): JSONInvite {
    return {
      code: this.code,
      guild: this.guild?.toJSON(),
      channel: this.channel.toJSON(),
      inviter: this.inviter?.toJSON(),
      targetType: this.targetType,
      targetUser: this.targetUser?.toJSON(),
      targetApplication: this.targetApplication?.toJSON(),
      approximatePresenceCount: this.approximatePresenceCount,
      approximateMemberCount: this.approximateMemberCount,
      expiresAt: this.expiresAt,
      stageInstance: this.stageInstance,
      guildScheduledEvent: this.guildScheduledEvent?.toJSON(),
    };
  }
}
