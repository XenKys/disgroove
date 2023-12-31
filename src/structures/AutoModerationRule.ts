import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONAutoModerationAction,
  JSONAutoModerationRule,
  JSONTriggerMetadata,
  RawAutoModerationRule,
} from "../types";
import { Base } from ".";
import type { EventTypes } from "../constants";

/** https://discord.com/developers/docs/resources/auto-moderation */
export class AutoModerationRule extends Base {
  protected override raw: RawAutoModerationRule;
  guildId: string;
  name: string;
  creatorId: string;
  eventType: EventTypes;
  triggerType: number;
  triggerMetadata: JSONTriggerMetadata;
  actions: Array<JSONAutoModerationAction>;
  enabled: boolean;
  exemptRoles: Array<string>;
  exemptChannels: Array<string>;

  constructor(data: RawAutoModerationRule, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.guildId = data.guild_id;
    this.name = data.name;
    this.creatorId = data.creator_id;
    this.eventType = data.event_type;
    this.triggerType = data.trigger_type;
    this.triggerMetadata = {
      keywordFilter: data.trigger_metadata.keyword_filter,
      regexPatterns: data.trigger_metadata.regex_patterns,
      presets: data.trigger_metadata.presets,
      allowList: data.trigger_metadata.allow_list,
      mentionTotalLimit: data.trigger_metadata.mention_total_limit,
      mentionRaidProtection: data.trigger_metadata.mention_raid_protection,
    };
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
  async edit(
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
      await this.client.rest.patch<RawAutoModerationRule>(
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
  delete(reason?: string): void {
    this.client.rest.delete(
      Endpoints.guildAutoModerationRule(this.guildId, this.id),
      {
        reason,
      }
    );
  }

  override toRaw(): RawAutoModerationRule {
    return this.raw;
  }

  override toJSON(): JSONAutoModerationRule {
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
