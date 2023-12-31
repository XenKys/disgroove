import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { JSONStageInstance, RawStageInstance } from "../types";
import type { PrivacyLevel } from "../constants";
import { Base } from ".";

/** https://discord.com/developers/docs/resources/stage-instance */
export class StageInstance extends Base {
  protected override raw: RawStageInstance;
  guildId: string;
  channelId: string;
  topic: string;
  privacyLevel: number;
  discoverableDisabled: boolean;
  guildScheduledEventId: string | null;

  constructor(data: RawStageInstance, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.guildId = data.guild_id;
    this.channelId = data.channel_id;
    this.topic = data.topic;
    this.privacyLevel = data.privacy_level;
    this.discoverableDisabled = data.discoverable_disabled;
    this.guildScheduledEventId = data.guild_scheduled_event_id;
  }

  /** https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance */
  async edit(
    options: {
      topic?: string;
      privacyLevel?: PrivacyLevel;
    },
    reason?: string
  ): Promise<StageInstance> {
    return new StageInstance(
      await this.client.rest.patch<RawStageInstance>(
        Endpoints.stageInstance(this.channelId),
        {
          json: {
            topic: options.topic,
            privacy_level: options.privacyLevel,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance */
  delete(reason?: string): void {
    this.client.rest.delete(Endpoints.stageInstance(this.channelId), {
      reason,
    });
  }

  override toRaw(): RawStageInstance {
    return this.raw;
  }

  override toJSON(): JSONStageInstance {
    return {
      id: this.id,
      guildId: this.guildId,
      channelId: this.channelId,
      topic: this.topic,
      privacyLevel: this.privacyLevel,
      discoverableDisabled: this.discoverableDisabled,
      guildScheduledEventId: this.guildScheduledEventId,
    };
  }
}
