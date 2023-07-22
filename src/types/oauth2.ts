import type { RawApplication, RawUser } from ".";
import type { Application, User } from "../structures";

/* https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-response-structure */
export interface RawResponse {
  application: RawApplication;
  scopes: Array<string>;
  expires: number;
  user?: RawUser;
}

export interface JSONResponse {
  application: Application;
  scopes: Array<string>;
  expires: number;
  user?: User;
}
