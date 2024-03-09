import type { User, RawUser } from ".";
import type { TeamMemberRoleTypes } from "../constants";

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface RawTeam {
  icon: string | null;
  id: string;
  members: Array<RawTeamMember>;
  name: string;
  owner_user_id: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-member-object */
export interface RawTeamMember {
  membership_state: number;
  team_id: string;
  user: RawUser;
  role: TeamMemberRoleTypes;
}

export interface Team {
  icon: string | null;
  id: string;
  members: Array<TeamMember>;
  name: string;
  ownerUserId: string;
}

export interface TeamMember {
  membershipState: number;
  teamId: string;
  user: User;
  role: TeamMemberRoleTypes;
}
