import type { snowflake } from "./common";

/** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-identify-payload */
export interface RawVoiceIdentifyPayload {
  server_id: snowflake;
  user_id: snowflake;
  session_id: string;
  token: string;
}

/** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-ready-payload */
export interface RawVoiceReadyPayload {
  ssrc: number;
  ip: string;
  port: number;
  modes: Array<string>;
}

/** https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection-example-resume-connection-payload */
export interface RawResumeConnectionPayload {
  server_id: snowflake;
  session_id: string;
  token: string;
}

/** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload */
export interface RawSelectProtocolPayload {
  protocol: string;
  data: {
    address: string;
    port: number;
    mode: string;
  };
}

/** https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-session-description-payload */
export interface RawSessionDescriptionPayload {
  mode: string;
  secret_key: Array<number>;
}

export interface VoiceIdentifyPayload {
  serverID: snowflake;
  userID: snowflake;
  sessionID: string;
  token: string;
}

export interface VoiceReadyPayload {
  ssrc: number;
  ip: string;
  port: number;
  modes: Array<string>;
}

export interface ResumeConnectionPayload {
  serverID: snowflake;
  sessionID: string;
  token: string;
}

export interface SelectProtocolPayload {
  protocol: string;
  data: {
    address: string;
    port: number;
    mode: string;
  };
}

export interface SessionDescriptionPayload {
  mode: string;
  secretKey: Array<number>;
}
