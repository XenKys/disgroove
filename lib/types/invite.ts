import type {
  Application,
  Channel,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  User,
  RawApplication,
  RawChannel,
  RawGuild,
  RawGuildMember,
  RawGuildScheduledEvent,
  RawUser,
} from ".";
import type { InviteTargetTypes } from "../constants";

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface RawInvite {
  code: string;
  guild?: RawGuild;
  channel: RawChannel;
  inviter?: RawUser;
  target_type?: InviteTargetTypes;
  target_user?: RawUser;
  target_application?: RawApplication;
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at?: string | null;
  stage_instance?: RawInviteStageInstance;
  guild_scheduled_event?: RawGuildScheduledEvent;
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure */
export interface RawInviteMetadata {
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure */
export interface RawInviteStageInstance {
  members: Array<RawGuildMember>;
  participant_count: number;
  speaker_count: number;
  topic: string;
}

export interface Invite {
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
  stageInstance?: InviteStageInstance;
  guildScheduledEvent?: GuildScheduledEvent;
}

export interface InviteMetadata {
  uses: number;
  maxUses: number;
  maxAge: number;
  temporary: boolean;
  createdAt: string;
}

export interface InviteStageInstance {
  members: Array<GuildMember>;
  participantCount: number;
  speakerCount: number;
  topic: string;
}
