/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure */
export interface RawStageInstance {
  id: string;
  guild_id: string;
  channel_id: string;
  topic: string;
  privacy_level: number;
  discoverable_disabled: boolean;
  guild_scheduled_event_id: string | null;
}

export interface JSONStageInstance {
  id: string;
  guildId: string;
  channelId: string;
  topic: string;
  privacyLevel: number;
  discoverableDisabled: boolean;
  guildScheduledEventId: string | null;
}
