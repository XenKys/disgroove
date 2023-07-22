import { User } from ".";
import type { Client } from "../class";
import { Endpoints } from "../rest";
import type {
  JSONIntegration,
  JSONIntegrationAccount,
  JSONIntegrationApplication,
  RawIntegration,
} from "../types";
import type { IntegrationExpireBehaviors, OAuth2Scopes } from "../utils";

export class Integration {
  private client!: Client;
  public id: string;
  public guildId: string;
  public name: string;
  public type: string;
  public enabled: boolean;
  public syncing?: boolean;
  public roleId?: string;
  public enableEmoticons?: boolean;
  public expireBehavior?: IntegrationExpireBehaviors;
  public expireGracePeriod?: number;
  public user?: User;
  public account: JSONIntegrationAccount;
  public syncedAt?: number;
  public subscriberCount?: number;
  public revoked?: boolean;
  public application?: JSONIntegrationApplication;
  public scopes?: Array<OAuth2Scopes>;

  constructor(data: RawIntegration, client: Client) {
    this.client = client;
    this.id = data.id;
    this.guildId = data.guild_id;
    this.name = data.name;
    this.type = data.type;
    this.enabled = data.enabled;
    this.account = data.account;

    this.update(data);
  }

  protected update(data: RawIntegration): void {
    if (data.syncing !== undefined) this.syncing = data.syncing;
    if (data.role_id !== undefined) this.roleId = data.role_id;
    if (data.enable_emoticons !== undefined)
      this.enableEmoticons = data.enable_emoticons;
    if (data.expire_behavior !== undefined)
      this.expireBehavior = data.expire_behavior;
    if (data.expire_grace_period !== undefined)
      this.expireGracePeriod = data.expire_grace_period;
    if (data.user !== undefined) this.user = new User(data.user, this.client);
    if (data.synced_at !== undefined) this.syncedAt = data.synced_at;
    if (data.subscriber_count !== undefined)
      this.subscriberCount = data.subscriber_count;
    if (data.revoked !== undefined) this.revoked = data.revoked;
    if (data.application !== undefined)
      this.application = {
        id: data.application.id,
        name: data.application.name,
        icon: data.application.icon,
        description: data.application.description,
        bot:
          data.application.bot !== undefined
            ? new User(data.application.bot, this.client)
            : undefined,
      };
    if (data.scopes !== undefined) this.scopes = data.scopes;
  }

  /* https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  public async delete(reason?: string): Promise<void> {
    this.client.rest.request(
      "DELETE",
      Endpoints.guildIntegration(this.guildId, this.id),
      {
        reason,
      }
    );
  }

  public toJSON(): JSONIntegration {
    return {
      guildId: this.guildId,
      id: this.id,
      name: this.name,
      type: this.type,
      enabled: this.enabled,
      syncing: this.syncing,
      roleId: this.roleId,
      enableEmoticons: this.enableEmoticons,
      expireBehavior: this.expireBehavior,
      expireGracePeriod: this.expireGracePeriod,
      user: this.user,
      account: this.account,
      syncedAt: this.syncedAt,
      subscriberCount: this.subscriberCount,
      revoked: this.revoked,
      application: this.application,
      scopes: this.scopes,
    };
  }
}
