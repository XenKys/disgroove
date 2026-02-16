import type { RawInvite, Invite } from "../types/invite";
import { RawRole, Role } from "../types/role";
import { Applications } from "./Applications";
import { Channels } from "./Channels";
import { Guilds } from "./Guilds";
import { GuildScheduledEvents } from "./GuildScheduledEvents";
import { Users } from "./Users";

export class Invites {
  static inviteFromRaw(invite: RawInvite): Invite {
    return {
      type: invite.type,
      code: invite.code,
      guild:
        invite.guild !== undefined
          ? Guilds.partialGuildFromRaw(invite.guild)
          : undefined,
      channel: Channels.channelFromRaw(invite.channel),
      inviter:
        invite.inviter !== undefined
          ? Users.userFromRaw(invite.inviter)
          : undefined,
      targetType: invite.target_type,
      targetUser:
        invite.target_user !== undefined
          ? Users.userFromRaw(invite.target_user)
          : undefined,
      targetApplication:
        invite.target_application !== undefined
          ? Applications.applicationFromRaw(invite.target_application)
          : undefined,
      approximatePresenceCount: invite.approximate_presence_count,
      approximateMemberCount: invite.approximate_member_count,
      expiresAt: invite.expires_at,
      stageInstance:
        invite.stage_instance !== undefined
          ? {
              members: invite.stage_instance.members.map((guildMember) =>
                Guilds.guildMemberFromRaw(guildMember)
              ),
              participantCount: invite.stage_instance.participant_count,
              speakerCount: invite.stage_instance.speaker_count,
              topic: invite.stage_instance.topic,
            }
          : undefined,
      guildScheduledEvent:
        invite.guild_scheduled_event !== undefined
          ? GuildScheduledEvents.guildScheduledEventFromRaw(
              invite.guild_scheduled_event
            )
          : undefined,
      flags: invite.flags,
      roles: invite.roles?.map((role) => Invites.partialRoleFromRaw(role))
    };
  }

  static inviteToRaw(invite: Invite): RawInvite {
    return {
      type: invite.type,
      code: invite.code,
      guild:
        invite.guild !== undefined
          ? Guilds.partialGuildToRaw(invite.guild)
          : undefined,
      channel: Channels.channelToRaw(invite.channel),
      inviter:
        invite.inviter !== undefined
          ? Users.userToRaw(invite.inviter)
          : undefined,
      target_type: invite.targetType,
      target_user:
        invite.targetUser !== undefined
          ? Users.userToRaw(invite.targetUser)
          : undefined,
      target_application:
        invite.targetApplication !== undefined
          ? Applications.applicationToRaw(invite.targetApplication)
          : undefined,
      approximate_presence_count: invite.approximatePresenceCount,
      approximate_member_count: invite.approximateMemberCount,
      expires_at: invite.expiresAt,
      stage_instance:
        invite.stageInstance !== undefined
          ? {
              members: invite.stageInstance.members.map((guildMember) =>
                Guilds.guildMemberToRaw(guildMember)
              ),
              participant_count: invite.stageInstance.participantCount,
              speaker_count: invite.stageInstance.speakerCount,
              topic: invite.stageInstance.topic,
            }
          : undefined,
      guild_scheduled_event:
        invite.guildScheduledEvent !== undefined
          ? GuildScheduledEvents.guildScheduledEventToRaw(
              invite.guildScheduledEvent
            )
          : undefined,
      flags: invite.flags,
      roles: invite.roles?.map((role) => Invites.partialRoleToRaw(role))
    };
  }

  static partialRoleFromRaw(role: Pick<RawRole, "id" | "name" | "position" | "color" | "colors" | "icon" | "unicode_emoji">): Pick<Role, "id" | "name" | "position" | "color" | "colors" | "icon" | "unicodeEmoji"> {
    return {
        id: role.id,
        name: role.name,
        position: role.position,
        color: role.color,
        colors: {
          primaryColor: role.colors.primary_color,
          secondaryColor: role.colors.secondary_color,
          tertiaryColor: role.colors.tertiary_color
        },
        icon: role.icon,
        unicodeEmoji: role.unicode_emoji
      }
  }

  static partialRoleToRaw(role: Pick<Role, "id" | "name" | "position" | "color" | "colors" | "icon" | "unicodeEmoji">): Pick<RawRole, "id" | "name" | "position" | "color" | "colors" | "icon" | "unicode_emoji"> {
    return {
        id: role.id,
        name: role.name,
        position: role.position,
        color: role.color,
        colors: {
          primary_color: role.colors.primaryColor,
          secondary_color: role.colors.secondaryColor,
          tertiary_color: role.colors.tertiaryColor
        },
        icon: role.icon,
        unicode_emoji: role.unicodeEmoji
      }
  }
}
