import { RequestsManager } from ".";

export interface File {
  contents: Buffer;
  index?: number;
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
  private manager: RequestsManager;

  constructor(token: string, auth: "Bot" | "Bearer") {
    this.manager = new RequestsManager(token, auth);
  }

  public get<T>(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return this.manager.request<T>(RESTMethods.Get, endpoint, data);
  }

  public post<T>(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return this.manager.request<T>(RESTMethods.Post, endpoint, data);
  }

  public delete<T>(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return this.manager.request<T>(RESTMethods.Delete, endpoint, data);
  }

  public patch<T>(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return this.manager.request<T>(RESTMethods.Patch, endpoint, data);
  }

  public put<T>(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<T> {
    return this.manager.request<T>(RESTMethods.Put, endpoint, data);
  }
}
