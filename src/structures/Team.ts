import { Base, User } from ".";
import type { Client } from "../client/Client";
import type { JSONTeam, JSONTeamMember, RawTeam } from "../types";

export class Team extends Base {
  protected override raw: RawTeam;
  public icon: string | null;
  public members: Array<JSONTeamMember>;
  public name: string;
  public ownerUserId: string;

  constructor(data: RawTeam, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.icon = data.icon;
    this.members = data.members.map((teamMember) => ({
      membershipState: teamMember.membership_state,
      permissions: teamMember.permissions,
      teamId: teamMember.team_id,
      user: new User(teamMember.user, client),
    }));
    this.name = data.name;
    this.ownerUserId = data.owner_user_id;
  }

  public override toRaw(): RawTeam {
    return this.raw;
  }

  public override toJSON(): JSONTeam {
    return {
      icon: this.icon,
      id: this.id,
      members: this.members,
      name: this.name,
      ownerUserId: this.ownerUserId,
    };
  }
}
