import type { FormData } from "undici";
import { RequestsManager } from ".";

export interface File {
  contents: Buffer;
  name: string;
}

export enum RESTMethods {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
  Patch = "PATCH",
  Put = "PUT",
}

export class REST {
  public manager: RequestsManager;

  constructor(token: string, auth: "Bot" | "Bearer") {
    this.manager = new RequestsManager(token, auth);
  }

  public get<T>(
    endpoint: string,
    query: Partial<
      Record<string, string | number | boolean | Array<string>>
    > | null = null,
    withAuthorization: boolean = true
  ): Promise<T> {
    return this.manager.request<T>(
      RESTMethods.Get,
      endpoint,
      query,
      withAuthorization
    );
  }

  public post<T>(
    endpoint: string,
    query: Partial<
      Record<string, string | number | boolean | Array<string>>
    > | null = null,
    withAuthorization: boolean = true,
    data?: {
      json?: unknown;
      form?: FormData;
      files?: Array<File> | null;
      reason?: string;
    }
  ): Promise<T> {
    return this.manager.request<T>(
      RESTMethods.Post,
      endpoint,
      query,
      withAuthorization,
      data
    );
  }

  public delete<T>(
    endpoint: string,
    query: Partial<
      Record<string, string | number | boolean | Array<string>>
    > | null = null,
    withAuthorization: boolean = true,
    data?: {
      json?: unknown;
      form?: FormData;
      files?: Array<File> | null;
      reason?: string;
    }
  ): Promise<T> {
    return this.manager.request<T>(
      RESTMethods.Delete,
      endpoint,
      query,
      withAuthorization,
      data
    );
  }

  public patch<T>(
    endpoint: string,
    query: Partial<
      Record<string, string | number | boolean | Array<string>>
    > | null = null,
    withAuthorization: boolean = true,
    data?: {
      json?: unknown;
      form?: FormData;
      files?: Array<File> | null;
      reason?: string;
    }
  ): Promise<T> {
    return this.manager.request<T>(
      RESTMethods.Patch,
      endpoint,
      query,
      withAuthorization,
      data
    );
  }

  public put<T>(
    endpoint: string,
    query: Partial<
      Record<string, string | number | boolean | Array<string>>
    > | null = null,
    withAuthorization: boolean = true,
    data?: {
      json?: unknown;
      form?: FormData;
      files?: Array<File> | null;
      reason?: string;
    }
  ): Promise<T> {
    return this.manager.request<T>(
      RESTMethods.Put,
      endpoint,
      query,
      withAuthorization,
      data
    );
  }
}
