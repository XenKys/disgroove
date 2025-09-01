import type {
  Lobby,
  LobbyMember,
  RawLobby,
  RawLobbyMember,
} from "../types/lobby";

export class Lobbies {
  static lobbyFromRaw(lobby: RawLobby): Lobby {
    return {
      id: lobby.id,
      applicationID: lobby.application_id,
      metadata: lobby.metadata,
      members: lobby.members,
      linkedChannel: lobby.linked_channel,
    };
  }

  static lobbyMemberFromRaw(lobbyMember: RawLobbyMember): LobbyMember {
    return {
      id: lobbyMember.id,
      metadata: lobbyMember.metadata,
      flags: lobbyMember.flags,
    };
  }

  static lobbyMemberToRaw(lobbyMember: LobbyMember): RawLobbyMember {
    return {
      id: lobbyMember.id,
      metadata: lobbyMember.metadata,
      flags: lobbyMember.flags,
    };
  }

  static lobbyToRaw(lobby: Lobby): RawLobby {
    return {
      id: lobby.id,
      application_id: lobby.applicationID,
      metadata: lobby.metadata,
      members: lobby.members,
      linked_channel: lobby.linkedChannel,
    };
  }
}
