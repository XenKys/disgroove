import type { JSONUser, RawUser } from ".";

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
  permissions: Array<string>;
  team_id: string;
  user: RawUser;
}

export interface JSONTeam {
  icon: string | null;
  id: string;
  members: Array<JSONTeamMember>;
  name: string;
  ownerUserId: string;
}

export interface JSONTeamMember {
  membershipState: number;
  permissions: Array<string>;
  teamId: string;
  user: JSONUser;
}
