import type {
  GuildInviteFlags,
  InviteTargetTypes,
  InviteTypes,
} from "../constants";
import type { RawApplication, Application } from "./application";
import type { RawChannel, Channel } from "./channel";
import type { timestamp } from "./common";
import type { RawGuild, RawGuildMember, Guild, GuildMember } from "./guild";
import type {
  RawGuildScheduledEvent,
  GuildScheduledEvent,
} from "./guild-scheduled-event";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface RawInvite {
  type: InviteTypes;
  code: string;
  guild?: RawGuild;
  channel: RawChannel;
  inviter?: RawUser;
  target_type?: InviteTargetTypes;
  target_user?: RawUser;
  target_application?: RawApplication;
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at: timestamp | null;
  stage_instance?: RawInviteStageInstance;
  guild_scheduled_event?: RawGuildScheduledEvent;
  flags?: GuildInviteFlags;
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure */
export interface RawInviteMetadata {
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: timestamp;
}

/** https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure */
export interface RawInviteStageInstance {
  members: Array<RawGuildMember>;
  participant_count: number;
  speaker_count: number;
  topic: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface Invite {
  type: InviteTypes;
  code: string;
  guild?: Guild;
  channel: Channel;
  inviter?: User;
  targetType?: InviteTargetTypes;
  targetUser?: User;
  targetApplication?: Application;
  approximatePresenceCount?: number;
  approximateMemberCount?: number;
  expiresAt: timestamp | null;
  stageInstance?: InviteStageInstance;
  guildScheduledEvent?: GuildScheduledEvent;
  flags?: GuildInviteFlags;
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure */
export interface InviteMetadata {
  uses: number;
  maxUses: number;
  maxAge: number;
  temporary: boolean;
  createdAt: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure */
export interface InviteStageInstance {
  members: Array<GuildMember>;
  participantCount: number;
  speakerCount: number;
  topic: string;
}
