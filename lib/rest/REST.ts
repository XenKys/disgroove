import { RequestData, RequestsManager } from ".";

export enum RESTMethods {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
  Patch = "PATCH",
  Put = "PUT",
}

export class REST {
  manager: RequestsManager;

  constructor(token: string, auth: "Bot" | "Bearer") {
    this.manager = new RequestsManager(token, auth);
  }

  get<T>(
    endpoint: string,
    data?: Pick<RequestData, "query" | "authorization">
  ): Promise<T> {
    return this.manager.request<T>(RESTMethods.Get, endpoint, data);
  }

  post<T>(endpoint: string, data?: RequestData): Promise<T> {
    return this.manager.request<T>(RESTMethods.Post, endpoint, data);
  }

  delete<T>(endpoint: string, data?: RequestData): Promise<T> {
    return this.manager.request<T>(RESTMethods.Delete, endpoint, data);
  }

  patch<T>(endpoint: string, data?: RequestData): Promise<T> {
    return this.manager.request<T>(RESTMethods.Patch, endpoint, data);
  }

  put<T>(endpoint: string, data?: RequestData): Promise<T> {
    return this.manager.request<T>(RESTMethods.Put, endpoint, data);
  }
}
