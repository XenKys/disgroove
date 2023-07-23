import { fetch, FormData, File as UndiciFile } from "undici";

export interface File {
  contents: Buffer;
  index?: number;
  name: string;
}

export class REST {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async request(
    method: string,
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<any> {
    let url: URL = new URL(`https://discord.com/api/v10/${endpoint}`);

    if (data?.query) {
      let urlSearchParams = new URLSearchParams(url.searchParams);

      for (const [key, value] of Object.entries(data?.query)) {
        if (value === undefined) return;

        urlSearchParams.append(key, value);
        url = new URL(
          `https://discord.com/api/v10/${endpoint}?${urlSearchParams.toString()}`
        );
      }
    }

    let headers:
      | {
          Authorization: string;
          "Content-Type"?: string;
          "X-Audit-Log-Reason"?: string;
        }
      | FormData
      | undefined = {
      Authorization: `Bot ${this.token}`,
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

    const response = await fetch(url.href, {
      method,
      body,
      headers,
    });

    if (response.status === 204) return null;

    if (!response.ok)
      throw new Error(`[${response.status}] ${response.statusText}`);

    return response.json();
  }
}
