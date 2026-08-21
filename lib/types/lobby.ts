import type {
  LobbyMemberFlags,
  MessageFlags,
  MessageTypes,
} from "../constants";
import type { RawChannel } from "./channel";
import type { snowflake } from "./common";
import { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/lobby#lobby-object */
export interface RawLobby {
  id: snowflake;
  application_id: snowflake;
  metadata: Record<string, string> | null;
  members: Array<RawLobbyMember>;
  linked_channel: RawChannel;
}

/** https://discord.com/developers/docs/resources/lobby#lobby-member-object-lobby-member-structure */
export interface RawLobbyMember {
  id: snowflake;
  metadata?: Record<string, string> | null;
  flags?: LobbyMemberFlags;
  additional_name?: string;
}

/** https://docs.discord.com/developers/resources/lobby#lobby-message-object */
export interface RawLobbyMessage {
  id: snowflake;
  type: MessageTypes;
  content: string;
  lobby_id: snowflake;
  channel_id: snowflake;
  author: RawUser;
  metadata?: Record<string, string> | null;
  moderation_metadata?: Record<string, string> | null;
  flags: MessageFlags;
  application_id: snowflake;
}

/** https://docs.discord.com/developers/resources/lobby#create-lobby-channel-invite-for-user#lobby-invite-object */
export interface RawLobbyInvite {
  code: string;
}

/** https://discord.com/developers/docs/resources/lobby#lobby-object */
export interface Lobby {
  id: snowflake;
  applicationId: snowflake;
  metadata: Record<string, string> | null;
  members: Array<LobbyMember>;
  linkedChannel: RawChannel;
}

/** https://discord.com/developers/docs/resources/lobby#lobby-member-object-lobby-member-structure */
export interface LobbyMember {
  id: snowflake;
  metadata?: Record<string, string> | null;
  flags?: LobbyMemberFlags;
  additionalName?: string;
}

/** https://docs.discord.com/developers/resources/lobby#lobby-message-object */
export interface LobbyMessage {
  id: snowflake;
  type: MessageTypes;
  content: string;
  lobbyId: snowflake;
  channelId: snowflake;
  author: User;
  metadata?: Record<string, string> | null;
  moderationMetadata?: Record<string, string> | null;
  flags: MessageFlags;
  applicationId: snowflake;
}

/** https://docs.discord.com/developers/resources/lobby#create-lobby-channel-invite-for-user#lobby-invite-object */
export interface LobbyInvite {
  code: string;
}
