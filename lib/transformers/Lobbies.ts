import type {
  Lobby,
  LobbyMember,
  LobbyMessage,
  RawLobby,
  RawLobbyMember,
  RawLobbyMessage,
} from "../types/lobby";
import { Users } from "./Users";

export class Lobbies {
  static lobbyFromRaw(lobby: RawLobby): Lobby {
    return {
      id: lobby.id,
      applicationId: lobby.application_id,
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
      additionalName: lobbyMember.additional_name,
    };
  }

  static lobbyMemberToRaw(lobbyMember: LobbyMember): RawLobbyMember {
    return {
      id: lobbyMember.id,
      metadata: lobbyMember.metadata,
      flags: lobbyMember.flags,
      additional_name: lobbyMember.additionalName,
    };
  }

  static lobbyMessageFromRaw(lobbyMessage: RawLobbyMessage): LobbyMessage {
    return {
      id: lobbyMessage.id,
      type: lobbyMessage.type,
      content: lobbyMessage.content,
      lobbyId: lobbyMessage.lobby_id,
      channelId: lobbyMessage.channel_id,
      author: Users.userFromRaw(lobbyMessage.author),
      metadata: lobbyMessage.metadata,
      moderationMetadata: lobbyMessage.moderation_metadata,
      flags: lobbyMessage.flags,
      applicationId: lobbyMessage.application_id,
    };
  }

  static lobbyMessageToRaw(lobbyMessage: LobbyMessage): RawLobbyMessage {
    return {
      id: lobbyMessage.id,
      type: lobbyMessage.type,
      content: lobbyMessage.content,
      lobby_id: lobbyMessage.lobbyId,
      channel_id: lobbyMessage.channelId,
      author: Users.userToRaw(lobbyMessage.author),
      metadata: lobbyMessage.metadata,
      moderation_metadata: lobbyMessage.moderationMetadata,
      flags: lobbyMessage.flags,
      application_id: lobbyMessage.applicationId,
    };
  }

  static lobbyToRaw(lobby: Lobby): RawLobby {
    return {
      id: lobby.id,
      application_id: lobby.applicationId,
      metadata: lobby.metadata,
      members: lobby.members,
      linked_channel: lobby.linkedChannel,
    };
  }
}
