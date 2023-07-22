import type { User } from "../structures";
import type { ActivityFlags, ActivityType, StatusTypes } from "../utils";

/* https://discord.com/developers/docs/topics/gateway-events#presence-update-presence-update-event-fields */
export interface PresenceUpdateEventFields {
  user: User;
  guildId: string;
  status: StatusTypes;
  activities: Array<Activity>;
  clientStatus: ClientStatus;
}

/* https://discord.com/developers/docs/topics/gateway-events#client-status-object */
export interface ClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-structure */
export interface Activity {
  name: string;
  type: ActivityType;
  url?: string | null;
  createdAt: number;
  timestamps?: ActivityTimestamps;
  applicationId?: string;
  details?: string | null;
  state?: string | null;
  party?: ActivityParty;
  assets?: ActivityAssets;
  secrets?: ActivitySecrets;
  instance?: boolean;
  flags?: ActivityFlags;
  buttons?: Array<ActivityButton>;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-timestamps */
export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-party */
export interface ActivityParty {
  id?: string;
  size?: Array<number>;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-assets */
export interface ActivityAssets {
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-secrets */
export interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

/* https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-buttons */
export interface ActivityButton {
  label: string;
  url: string;
}
