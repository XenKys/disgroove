import { File, RESTMethods } from ".";
import { fetch, FormData, File as UndiciFile } from "undici";
import { HTTPResponseCodes } from "../constants";
import { HTTPError, RESTError } from "../utils";

export class RequestsManager {
  public token: string;
  public auth: "Bot" | "Bearer";
  public rateLimits: Array<string>;
  public globalBlock: boolean;

  constructor(token: string, auth: "Bot" | "Bearer") {
    this.token = token;
    this.auth = auth;
    this.rateLimits = [];
    this.globalBlock = false;
  }

  public request<T = unknown>(
    method: string,
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      if (this.globalBlock) return;

      let url: URL = new URL(`https://discord.com/api/v10/${endpoint}`);

      if (data?.query) {
        for (const [key, value] of Object.entries(data?.query)) {
          if (value !== undefined) url.searchParams.set(key, value);
        }
      }

      let headers: {
        Authorization: string;
        "Content-Type"?: string;
        "X-Audit-Log-Reason"?: string;
      } = {
        Authorization: `${this.auth} ${this.token}`,
      };
      let body: string | FormData | undefined;

      if (method !== RESTMethods.Get) {
        if (data?.files && data?.files?.length !== 0) {
          const formData = new FormData();
          const files = data?.files;

          for (let i = 0; i < data?.files.length; i++) {
            const file = files[i];

            formData?.set(
              `files[${i}]`,
              new UndiciFile([file.contents], file.name)
            );
          }

          if (data?.json)
            formData?.set("payload_json", JSON.stringify(data?.json));

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

        if (
          this.rateLimits.includes(response.headers.get("X-RateLimit-Bucket")!)
        )
          return;

        if (
          response.headers.has("X-RateLimit-Bucket") &&
          response.headers.get("X-RateLimit-Remaining") === "0" &&
          response.headers.get("X-RateLimit-Limit") !== "1" &&
          !this.rateLimits.includes(response.headers.get("X-RateLimit-Bucket")!)
        ) {
          this.rateLimits.push(response.headers.get("X-RateLimit-Bucket")!);

          setTimeout(() => {
            this.rateLimits = this.rateLimits.filter(
              (bucket) => bucket !== response.headers.get("X-RateLimit-Bucket")
            );
            this.request<T>(method, endpoint, data).then(resolve).catch(reject);
          }, Number(response.headers.get("X-RateLimit-Reset-After")) * 1000);
        }

        if (response.status >= HTTPResponseCodes.NotModified) {
          if (response.status === HTTPResponseCodes.TooManyRequests) {
            if (
              !this.rateLimits.includes(
                response.headers.get("X-RateLimit-Bucket")!
              )
            )
              this.rateLimits.push(response.headers.get("X-RateLimit-Bucket")!);

            if (response.headers.has("X-RateLimit-Global")) {
              this.globalBlock = true;

              setTimeout(() => {
                this.globalBlock = false;

                this.rateLimits = this.rateLimits.filter(
                  (bucket) =>
                    bucket !== response.headers.get("X-RateLimit-Bucket")
                );
                this.request<T>(method, endpoint, data)
                  .then(resolve)
                  .catch(reject);
              }, Number(response.headers.get("Retry-After")) * 1000);
            }
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
