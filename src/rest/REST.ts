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

  public get(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<any> {
    return this.manager.request(RESTMethods.Get, endpoint, data);
  }

  public post(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<any> {
    return this.manager.request(RESTMethods.Post, endpoint, data);
  }

  public delete(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<any> {
    return this.manager.request(RESTMethods.Delete, endpoint, data);
  }

  public patch(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<any> {
    return this.manager.request(RESTMethods.Patch, endpoint, data);
  }

  public put(
    endpoint: string,
    data?: {
      json?: Record<string, any> | Array<Record<string, any>>;
      files?: Array<File> | null;
      reason?: string;
      query?: Record<string, any>;
    }
  ): Promise<any> {
    return this.manager.request(RESTMethods.Put, endpoint, data);
  }
}
