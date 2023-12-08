import { Guild, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { JSONGuildTemplate, RawGuildTemplate } from "../types";

/** https://discord.com/developers/docs/resources/guild-template */
export class GuildTemplate {
  private client: Client;
  private raw: RawGuildTemplate;
  public code: string;
  public name: string;
  public description: string | null;
  public usageCount: number;
  public creatorId: string;
  public creator: User;
  public createdAt: string;
  public updatedAt: string;
  public sourceGuildId: string;
  public serializedSourceGuild: Guild;
  public isDirty: boolean | null;

  constructor(data: RawGuildTemplate, client: Client) {
    this.client = client;
    this.raw = data;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.usageCount = data.usage_count;
    this.creatorId = data.creator_id;
    this.createdAt = data.created_at;
    this.creator = new User(data.creator, client);
    this.updatedAt = data.updated_at;
    this.sourceGuildId = data.source_guild_id;
    this.serializedSourceGuild = new Guild(
      data.serialized_source_guild,
      client
    );
    this.isDirty = data.is_dirty;
  }

  /** https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  public async sync(): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.put<RawGuildTemplate>(
        Endpoints.guildTemplate(this.sourceGuildId, this.code)
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  public async edit(options: {
    name?: string;
    description?: string | null;
  }): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.patch<RawGuildTemplate>(
        Endpoints.guildTemplate(this.sourceGuildId, this.code),
        {
          json: {
            name: options.name,
            description: options.description,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  public async delete(): Promise<JSONGuildTemplate> {
    return this.client.rest
      .delete<RawGuildTemplate>(
        Endpoints.guildTemplate(this.sourceGuildId, this.code)
      )
      .then((response) => new GuildTemplate(response, this.client).toJSON());
  }

  public toString(): string {
    return `[${this.constructor.name}]`;
  }

  public toRaw(): RawGuildTemplate {
    return this.raw;
  }

  public toJSON(): JSONGuildTemplate {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
      usageCount: this.usageCount,
      creatorId: this.creatorId,
      creator: this.creator,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sourceGuildId: this.sourceGuildId,
      serializedSourceGuild: this.serializedSourceGuild.toJSON(),
      isDirty: this.isDirty,
    };
  }
}
