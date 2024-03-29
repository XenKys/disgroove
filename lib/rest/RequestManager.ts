import { HTTPResponseCodes } from "../constants";
import { HTTPError, RESTError } from "../utils";
import * as pkg from "../../package.json";

export enum RESTMethods {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
  Patch = "PATCH",
  Put = "PUT",
}

export interface RequestData {
  json?: unknown;
  form?: FormData;
  files?: Array<File> | null;
  reason?: string;
  query?: Partial<Record<string, string | number | boolean | Array<string>>>;
  authorization?: boolean;
}

export interface File {
  contents: Buffer;
  name: string;
}

export class RequestManager {
  token: string;
  auth: "Bot" | "Bearer";
  globalBlock: boolean = false;

  constructor(token: string, auth: "Bot" | "Bearer") {
    this.token = token;
    this.auth = auth;
  }

  request<T = unknown>(
    method: RESTMethods,
    endpoint: string,
    data?: RequestData
  ): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      if (this.globalBlock && !endpoint.startsWith("interactions")) return;

      let url: URL = new URL(`https://discord.com/api/v10/${endpoint}`);

      if (data?.query)
        for (const [key, value] of Object.entries(data.query))
          if (value !== undefined) url.searchParams.set(key, String(value));

      let headers: Record<string, string> = {
        "User-Agent": `DiscordBot (https://github.com/XenKys/disgroove, ${pkg.version})`,
        Authorization: `${this.auth} ${this.token}`,
      };
      let body: string | FormData | undefined;

      if (data?.authorization === false) delete headers["Authorization"];

      if (method !== RESTMethods.Get) {
        if (data?.form || (data?.files && data?.files?.length !== 0)) {
          const formData = data.form ?? new FormData();

          if (data?.files && data?.files?.length !== 0) {
            for (let i = 0; i < data?.files.length; i++) {
              const file = data?.files[i];

              formData?.set(
                `files[${i}]`,
                new Blob([file.contents]),
                file.name
              );
            }

            if (data?.json)
              formData?.set("payload_json", JSON.stringify(data?.json));
          }

          body = formData;
        } else {
          body = JSON.stringify(data?.json);

          headers["Content-Type"] = "application/json";
        }

        if (data?.reason !== undefined)
          headers["X-Audit-Log-Reason"] = data?.reason;
      }

      try {
        const response = await fetch(url.href, {
          method,
          body,
          headers,
        });

        if (response.headers.has("X-RateLimit-Global")) {
          this.globalBlock = true;

          setTimeout(() => {
            this.globalBlock = false;
          }, Number(response.headers.get("Retry-After")) * 1000);
        }

        if (response.status >= HTTPResponseCodes.NotModified) {
          if (response.status === HTTPResponseCodes.TooManyRequests) {
            setTimeout(
              () =>
                this.request<T>(method, endpoint, data)
                  .then(resolve)
                  .catch(reject),
              Number(response.headers.get("Retry-After")) * 1000
            );
          } else if (response.status === HTTPResponseCodes.GatewayUnavailable) {
            setTimeout(
              () =>
                this.request<T>(method, endpoint, data)
                  .then(resolve)
                  .catch(reject),
              5 * 1000
            );
          } else {
            const responseJSON = await response.json();

            reject(
              responseJSON &&
                typeof responseJSON === "object" &&
                "code" in responseJSON &&
                "message" in responseJSON &&
                responseJSON.code !== 0
                ? new RESTError(
                    `[${responseJSON.code}] ${responseJSON.message}`
                  )
                : new HTTPError(`[${response.status}] ${response.statusText}`)
            );
          }
        } else if (response.status === HTTPResponseCodes.NoContent) {
          resolve(null as T);
        } else {
          resolve((await response.json()) as T);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
