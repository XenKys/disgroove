import type { TeamMemberRoleTypes } from "../constants";
import type { snowflake } from "./common";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface RawTeam {
  icon: string | null;
  id: snowflake;
  members: Array<RawTeamMember>;
  name: string;
  owner_user_id: snowflake;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-member-object */
export interface RawTeamMember {
  membership_state: number;
  team_id: snowflake;
  user: RawUser;
  role: TeamMemberRoleTypes;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface Team {
  icon: string | null;
  id: snowflake;
  members: Array<TeamMember>;
  name: string;
  ownerUserId: snowflake;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-member-object */
export interface TeamMember {
  membershipState: number;
  teamId: snowflake;
  user: User;
  role: TeamMemberRoleTypes;
}
