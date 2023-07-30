import type {
  RawApplication,
  RawChannel,
  RawGuild,
  RawGuildMember,
  RawGuildScheduledEvent,
  RawUser,
} from ".";
import type {
  Application,
  Channel,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  User,
} from "../structures";

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface RawInvite {
  code: string;
  guild?: RawGuild;
  channel: RawChannel;
  inviter?: RawUser;
  target_type?: number;
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

export interface JSONInvite {
  code: string;
  guild?: Guild;
  channel: Channel;
  inviter?: User;
  targetType?: number;
  targetUser?: User;
  targetApplication?: Application;
  approximatePresenceCount?: number;
  approximateMemberCount?: number;
  expiresAt?: string | null;
  stageInstance?: JSONInviteStageInstance;
  guildScheduledEvent?: GuildScheduledEvent;
}

export interface JSONInviteMetadata {
  uses: number;
  maxUses: number;
  maxAge: number;
  temporary: boolean;
  createdAt: string;
}

export interface JSONInviteStageInstance {
  members: Array<GuildMember>;
  participantCount: number;
  speakerCount: number;
  topic: string;
}
