import type { Client } from "..";
import { Endpoints } from "../rest";
import type {
  JSONAutoModerationAction,
  JSONAutoModerationRule,
  RawAutoModerationRule,
} from "../types";
import { Base } from ".";

export class AutoModerationRule extends Base {
  public guildId: string;
  public name: string;
  public creatorId: string;
  public eventType: number;
  public triggerType: number;
  public triggerMetadata: object;
  public actions: Array<JSONAutoModerationAction>;
  public enabled: boolean;
  public exemptRoles: Array<string>;
  public exemptChannels: Array<string>;

  constructor(data: RawAutoModerationRule, client: Client) {
    super(data.id, client);

    this.guildId = data.guild_id;
    this.name = data.name;
    this.creatorId = data.creator_id;
    this.eventType = data.event_type;
    this.triggerType = data.trigger_type;
    this.triggerMetadata = data.trigger_metadata;
    this.actions = data.actions.map((action) => ({
      type: action.type,
      metadata: {
        channelId: action.metadata.channel_id,
        durationSeconds: action.metadata.duration_seconds,
        customMessage: action.metadata.custom_message,
      },
    }));
    this.enabled = data.enabled;
    this.exemptRoles = data.exempt_roles;
    this.exemptChannels = data.exempt_channels;
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
  public async modify(
    options: {
      name?: string;
      eventType?: number;
      triggerType?: number;
      triggerMetadata?: object;
      actions?: Array<JSONAutoModerationAction>;
      enabled?: boolean;
      exemptRoles?: Array<string>;
      exemptChannels?: Array<string>;
    },
    reason?: string
  ): Promise<AutoModerationRule> {
    return new AutoModerationRule(
      await this.client.rest.patch(
        Endpoints.guildAutoModerationRule(this.guildId, this.id),
        {
          json: {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options.triggerMetadata,
            actions: options.actions?.map((action) => ({
              type: action.type,
              metadata: {
                channelId: action.metadata.channelId,
                durationSeconds: action.metadata.durationSeconds,
                customMessage: action.metadata.customMessage,
              },
            })),
            enabled: options.enabled,
            exempt_roles: options.exemptRoles,
            exempt_channels: options.exemptChannels,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
  public async delete(reason?: string): Promise<void> {
    await this.client.rest.delete(
      Endpoints.guildAutoModerationRule(this.guildId, this.id),
      {
        reason,
      }
    );
  }

  public override toJSON(): JSONAutoModerationRule {
    return {
      id: this.id,
      guildId: this.guildId,
      name: this.name,
      creatorId: this.creatorId,
      eventType: this.eventType,
      triggerType: this.triggerType,
      triggerMetadata: this.triggerMetadata,
      actions: this.actions,
      enabled: this.enabled,
      exemptRoles: this.exemptRoles,
      exemptChannels: this.exemptChannels,
    };
  }
}
