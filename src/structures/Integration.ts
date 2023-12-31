import { Base, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type {
  JSONIntegration,
  JSONIntegrationAccount,
  JSONIntegrationApplication,
  JSONIntegrationCreateEventExtraFields,
  JSONIntegrationUpdateEventExtraFields,
  RawIntegration,
  RawIntegrationCreateEventExtraFields,
  RawIntegrationUpdateEventExtraFields,
} from "../types";
import type { IntegrationExpireBehaviors, OAuth2Scopes } from "../constants";

/** https://discord.com/developers/docs/resources/guild */
export class Integration extends Base {
  protected override raw: RawIntegration &
    Partial<
      | RawIntegrationCreateEventExtraFields
      | RawIntegrationUpdateEventExtraFields
    >;
  name: string;
  type: string;
  enabled: boolean;
  syncing?: boolean;
  roleId?: string;
  enableEmoticons?: boolean;
  expireBehavior?: IntegrationExpireBehaviors;
  expireGracePeriod?: number;
  user?: User;
  account: JSONIntegrationAccount;
  syncedAt?: number;
  subscriberCount?: number;
  revoked?: boolean;
  application?: JSONIntegrationApplication;
  scopes?: Array<OAuth2Scopes>;
  guildId?: string;

  constructor(
    data: RawIntegration &
      Partial<
        | RawIntegrationCreateEventExtraFields
        | RawIntegrationUpdateEventExtraFields
      >,
    client: Client
  ) {
    super(data.id, client);

    this.raw = data;
    this.name = data.name;
    this.type = data.type;
    this.enabled = data.enabled;
    this.account = data.account;

    this.patch(data);
  }

  protected override patch(
    data: RawIntegration &
      Partial<
        | RawIntegrationCreateEventExtraFields
        | RawIntegrationUpdateEventExtraFields
      >
  ): void {
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
    if (data.guild_id !== undefined) this.guildId = data.guild_id;
  }

  /** https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  delete(reason?: string): void {
    if (!this.guildId) throw new Error("[disgroove] Guild ID not found");

    this.client.rest.delete(
      Endpoints.guildIntegration(this.guildId, this.id),

      {
        reason,
      }
    );
  }

  override toRaw(): RawIntegration &
    Partial<
      | RawIntegrationCreateEventExtraFields
      | RawIntegrationUpdateEventExtraFields
    > {
    return this.raw;
  }

  override toJSON(): JSONIntegration &
    Partial<
      | JSONIntegrationCreateEventExtraFields
      | JSONIntegrationUpdateEventExtraFields
    > {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      enabled: this.enabled,
      syncing: this.syncing,
      roleId: this.roleId,
      enableEmoticons: this.enableEmoticons,
      expireBehavior: this.expireBehavior,
      expireGracePeriod: this.expireGracePeriod,
      user: this.user?.toJSON(),
      account: this.account,
      syncedAt: this.syncedAt,
      subscriberCount: this.subscriberCount,
      revoked: this.revoked,
      application: this.application,
      scopes: this.scopes,
      guildId: this.guildId,
    };
  }
}
