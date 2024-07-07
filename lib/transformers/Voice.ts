import type { RawVoiceState, VoiceState } from "../types/voice";
import { Guilds } from "./Guilds";

export class Voice {
  static voiceStateFromRaw(voiceState: RawVoiceState): VoiceState {
    return {
      guildID: voiceState.guild_id,
      channelID: voiceState.channel_id,
      userID: voiceState.user_id,
      member:
        voiceState.member !== undefined
          ? Guilds.guildMemberFromRaw(voiceState.member)
          : undefined,
      sessionID: voiceState.session_id,
      deaf: voiceState.deaf,
      mute: voiceState.mute,
      selfDeaf: voiceState.self_deaf,
      selfMute: voiceState.self_mute,
      selfStream: voiceState.self_stream,
      selfVideo: voiceState.self_video,
      suppress: voiceState.suppress,
      requestToSpeakTimestamp: voiceState.request_to_speak_timestamp,
    };
  }

  static voiceStateToRaw(voiceState: VoiceState): RawVoiceState {
    return {
      guild_id: voiceState.guildID,
      channel_id: voiceState.channelID,
      user_id: voiceState.userID,
      member:
        voiceState.member !== undefined
          ? Guilds.guildMemberToRaw(voiceState.member)
          : undefined,
      session_id: voiceState.sessionID,
      deaf: voiceState.deaf,
      mute: voiceState.mute,
      self_deaf: voiceState.selfDeaf,
      self_mute: voiceState.selfMute,
      self_stream: voiceState.selfStream,
      self_video: voiceState.selfVideo,
      suppress: voiceState.suppress,
      request_to_speak_timestamp: voiceState.requestToSpeakTimestamp,
    };
  }
}
