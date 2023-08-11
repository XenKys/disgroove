import { File } from ".";
import { fetch, FormData, Headers, File as UndiciFile } from "undici";
import { HTTPResponseCodes } from "../utils";

export interface Request {
  method: string;
  endpoint: string;
  data?: {
    json?: Record<string, any> | Array<Record<string, any>>;
    files?: Array<File> | null;
    reason?: string;
    query?: Record<string, any>;
  };
}

export class RequestsManager {
  public token: string;
  public auth: "Bot" | "Bearer";
  public queue: Array<Request>;
  public globalBlock: boolean;

  constructor(token: string, auth: "Bot" | "Bearer") {
    this.token = token;
    this.auth = auth;
    this.queue = [];
    this.globalBlock = false;
  }

  private process<T = unknown>(): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      if (this.queue.length === 0 || this.globalBlock) return;

      const { method, endpoint, data } = this.queue.shift()!;

      let url: URL = new URL(`https://discord.com/api/v10/${endpoint}`);

      if (data?.query) {
        for (const value of Object.values(data.query)) {
          if (value === undefined) return;

          for (const [key, value] of Object.entries(data?.query)) {
            url.searchParams.set(key, value);
          }
        }
      }

      let headers:
        | {
            Authorization: string;
            "Content-Type"?: string;
            "X-Audit-Log-Reason"?: string;
          }
        | undefined = {
        Authorization: `${this.auth} ${this.token}`,
      };
      let body: string | FormData | undefined;

      if (method !== "GET") {
        if (data?.files && data?.files?.length !== 0) {
          const formData = new FormData(),
            files = data?.files;

          for (let i = 0; i < data?.files.length; i++) {
            const file = files[i];

            formData?.set(
              `file[${i}]`,
              new UndiciFile([file.contents], file.name)
            );
          }

          if (data?.json) formData?.set("payload_json", data?.json);

          body = formData;

          headers["Content-Type"] = "multipart/form-data";
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
          }),
          responseJSON = await response.json();

        this.checkRateLimits<T>(response.headers);

        if (
          response.status >= HTTPResponseCodes.NotModified &&
          response.status !== HTTPResponseCodes.TooManyRequests
        ) {
          reject(
            new Error(
              responseJSON &&
              typeof responseJSON === "object" &&
              "code" in responseJSON &&
              "message" in responseJSON
                ? `[${responseJSON.code}] ${responseJSON.message}`
                : `[${response.status}] ${response.statusText}`
            )
          );
        } else if (response.status === HTTPResponseCodes.NoContent) {
          resolve(null as T);
        } else {
          resolve(responseJSON as T);
        }
      } catch (err) {
        reject(err);
      } finally {
        this.process<T>();
      }
    });
  }

  private checkRateLimits<T>(headers: Headers): void {
    if (!headers.has("X-RateLimit-Reset")) return;
    if (headers.get("X-RateLimit-Remaining") !== "0") return;

    this.globalBlock = true;

    setTimeout(() => {
      this.globalBlock = false;
      this.process<T>();
    }, new Date(Number(headers.get("X-RateLimit-Reset"))).getMilliseconds());
  }

  public request<T>(
    method: string,
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return new Promise<T>(async (resolve) => {
      this.queue.push({ method, endpoint, data });

      resolve(this.process<T>());
    });
  }
}
