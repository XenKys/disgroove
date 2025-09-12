import type { RawTeam, Team } from "../types/team";
import { Users } from "./Users";

export class Teams {
  static teamFromRaw(team: RawTeam): Team {
    return {
      icon: team.icon,
      id: team.id,
      members: team.members.map((teamMember) => ({
        membershipState: teamMember.membership_state,
        teamId: teamMember.team_id,
        user: Users.userFromRaw(teamMember.user),
        role: teamMember.role,
      })),
      name: team.name,
      ownerUserId: team.owner_user_id,
    };
  }

  static teamToRaw(team: Team): RawTeam {
    return {
      icon: team.icon,
      id: team.id,
      members: team.members.map((teamMember) => ({
        membership_state: teamMember.membershipState,
        team_id: teamMember.teamId,
        user: Users.userToRaw(teamMember.user),
        role: teamMember.role,
      })),
      name: team.name,
      owner_user_id: team.ownerUserId,
    };
  }
}
