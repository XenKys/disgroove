import type { RawVoiceState, VoiceState } from "../types/voice";
import { Guilds } from "./Guilds";

export class Voice {
  static voiceStateFromRaw(voiceState: RawVoiceState): VoiceState {
    return {
      guildId: voiceState.guild_id,
      channelId: voiceState.channel_id,
      userId: voiceState.user_id,
      member:
        voiceState.member !== undefined
          ? Guilds.guildMemberFromRaw(voiceState.member)
          : undefined,
      sessionId: voiceState.session_id,
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
      guild_id: voiceState.guildId,
      channel_id: voiceState.channelId,
      user_id: voiceState.userId,
      member:
        voiceState.member !== undefined
          ? Guilds.guildMemberToRaw(voiceState.member)
          : undefined,
      session_id: voiceState.sessionId,
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
