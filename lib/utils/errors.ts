import type { JSONErrorCodes } from "../constants";

export class RESTError extends Error {
  override name: string = "RESTError";
  method: string;
  endpoint: string;

  constructor(
    code: JSONErrorCodes,
    message: string,
    errors: Record<string, unknown>,
    method: string,
    endpoint: string
  ) {
    super(`[${code}] ${message}\n${RESTError.flattenErrors(errors)}`);

    this.method = method;
    this.endpoint = endpoint;
  }

  static flattenErrors(
    errors: Record<string, unknown> | undefined,
    prefix = ""
  ): string {
    let result = "";

    if (errors) {
      for (const [key, value] of Object.entries(errors)) {
        if (errors.hasOwnProperty(key)) {
          if (key === "_errors" && Array.isArray(value)) {
            for (const error of value) {
              if (
                typeof error === "object" &&
                error !== null &&
                "message" in error
              ) {
                result += `${
                  prefix ? `${prefix}: [${error.code}]` : `[${error.code}]`
                } ${error.message}\n`;
              }
            }
          } else if (typeof value === "object" && value !== null) {
            result += this.flattenErrors(
              value as Record<string, unknown>,
              prefix ? `${prefix}.${key}` : key
            );
          }
        }
      }
    }

    return result;
  }
}

export class HTTPError extends Error {
  override name: string = "HTTPError";
  method: string;
  endpoint: string;

  constructor(
    status: number,
    statusText: string,
    errors: Record<string, unknown>,
    method: string,
    endpoint: string
  ) {
    super(`[${status}] ${statusText}\n${RESTError.flattenErrors(errors)}`);

    this.method = method;
    this.endpoint = endpoint;
  }
}

export class GatewayError extends Error {
  override name: string = "GatewayError";

  constructor(code: number, reason: string) {
    super(`[${code}] ${reason}`);
  }
}
