import { Base, User } from ".";
import type { Client } from "../Client";
import type { JSONTeam, JSONTeamMember, RawTeam } from "../types";

/** https://discord.com/developers/docs/topics/teams */
export class Team extends Base {
  protected override raw: RawTeam;
  icon: string | null;
  members: Array<JSONTeamMember>;
  name: string;
  ownerUserId: string;

  constructor(data: RawTeam, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.icon = data.icon;
    this.members = data.members.map((teamMember) => ({
      membershipState: teamMember.membership_state,
      teamId: teamMember.team_id,
      user: new User(teamMember.user, client),
      role: teamMember.role,
    }));
    this.name = data.name;
    this.ownerUserId = data.owner_user_id;
  }

  override toRaw(): RawTeam {
    return this.raw;
  }

  override toJSON(): JSONTeam {
    return {
      icon: this.icon,
      id: this.id,
      members: this.members,
      name: this.name,
      ownerUserId: this.ownerUserId,
    };
  }
}
