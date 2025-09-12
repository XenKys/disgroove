import type { LobbyMemberFlags } from "../constants";
import type { RawChannel } from "./channel";
import type { snowflake } from "./common";

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
}

export interface Lobby {
  id: snowflake;
  applicationId: snowflake;
  metadata: Record<string, string> | null;
  members: Array<LobbyMember>;
  linkedChannel: RawChannel;
}

export interface LobbyMember {
  id: snowflake;
  metadata?: Record<string, string> | null;
  flags?: LobbyMemberFlags;
}
