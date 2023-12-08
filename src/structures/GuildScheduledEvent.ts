import { Base, GuildMember, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONGuildScheduledEvent,
  JSONGuildScheduledEventEntityMetadata,
  JSONGuildScheduledEventUser,
  RawGuildScheduledEvent,
  RawGuildScheduledEventUser,
} from "../types";
import type {
  GuildScheduledEventEntityTypes,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
} from "../constants";

/** https://discord.com/developers/docs/resources/guild-scheduled-event */
export class GuildScheduledEvent extends Base {
  protected override raw: RawGuildScheduledEvent;
  public guildId: string;
  public channelId: string | null;
  public creatorId?: string | null;
  public name: string;
  public description?: string | null;
  public scheduledStartTime: string;
  public scheduledEndTime: string | null;
  public privacyLevel: GuildScheduledEventPrivacyLevel;
  public status: GuildScheduledEventStatus;
  public entityType: GuildScheduledEventEntityTypes;
  public entityId?: string;
  public entityMetadata: JSONGuildScheduledEventEntityMetadata | null;
  public creator?: User;
  public userCount?: number;
  public image?: string;

  constructor(data: RawGuildScheduledEvent, client: Client) {
    super(data.id, client);

    this.raw = data;
    this.guildId = data.guild_id;
    this.channelId = data.channel_id;
    this.name = data.name;
    this.scheduledStartTime = data.scheduled_start_time;
    this.scheduledEndTime = data.scheduled_end_time;
    this.privacyLevel = data.privacy_level;
    this.status = data.status;
    this.entityType = data.entity_type;
    this.entityMetadata = data.entity_metadata;

    this.patch(data);
  }

  protected override patch(data: RawGuildScheduledEvent): void {
    if (data.creator_id !== undefined) this.creatorId = data.creator_id;
    if (data.description !== undefined) this.description = data.description;
    if (data.entity_id !== undefined) this.entityId = data.entity_id;
    if (data.creator !== undefined)
      this.creator = new User(data.creator, this.client);
    if (data.user_count !== undefined) this.userCount = data.user_count;
    if (data.image !== undefined) this.image = data.image;
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
  public async edit(
    options: {
      channelId?: string | null;
      entityMetadata?: JSONGuildScheduledEventEntityMetadata | null;
      name?: string;
      privacyLevel?: GuildScheduledEventPrivacyLevel;
      scheduledStartTime?: string;
      scheduledEndTime?: string;
      description?: string | null;
      entityType?: GuildScheduledEventEntityTypes;
      status?: GuildScheduledEventStatus;
      image?: string;
    },
    reason?: string
  ): Promise<GuildScheduledEvent> {
    return new GuildScheduledEvent(
      await this.client.rest.patch<RawGuildScheduledEvent>(
        Endpoints.guildScheduledEvent(this.guildId, this.id),

        {
          json: {
            channel_id: options.channelId,
            entity_metadata: options.entityMetadata,
            name: options.name,
            privacy_level: options.privacyLevel,
            scheduled_start_time: options.scheduledStartTime,
            scheduled_end_time: options.scheduledEndTime,
            description: options.description,
            entityType: options.entityType,
            status: options.status,
            image: options.image,
          },
          reason,
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event */
  public delete(): void {
    this.client.rest.delete(
      Endpoints.guildScheduledEvent(this.guildId, this.id)
    );
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
  public async getUsers(options?: {
    limit?: number;
    withMember?: boolean;
    before?: string;
    after?: string;
  }): Promise<Array<JSONGuildScheduledEventUser>> {
    return this.client.rest
      .get<Array<RawGuildScheduledEventUser>>(
        Endpoints.guildScheduledEvent(this.guildId, this.id),
        {
          query: {
            limit: options?.limit,
            with_member: options?.withMember,
            before: options?.before,
            after: options?.after,
          },
        }
      )
      .then((response) =>
        response.map((data) => ({
          guildScheduledEventId: data.guild_scheduled_event_id,
          user: new User(data.user, this.client),
          member:
            data.member !== undefined
              ? new GuildMember(data.member, this.client)
              : undefined,
        }))
      );
  }

  public override toRaw(): RawGuildScheduledEvent {
    return this.raw;
  }

  public override toJSON(): JSONGuildScheduledEvent {
    return {
      id: this.id,
      guildId: this.guildId,
      channelId: this.channelId,
      creatorId: this.creatorId,
      name: this.name,
      description: this.description,
      scheduledStartTime: this.scheduledStartTime,
      scheduledEndTime: this.scheduledEndTime,
      privacyLevel: this.privacyLevel,
      status: this.status,
      entityType: this.entityType,
      entityId: this.entityId,
      entityMetadata: this.entityMetadata,
      creator: this.creator?.toJSON(),
      userCount: this.userCount,
      image: this.image,
    };
  }
}
