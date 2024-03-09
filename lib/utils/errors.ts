export class RestError extends Error {
  override name: string = "RestError";

  constructor(message: string) {
    super(message);
  }
}

export class HTTPError extends Error {
  override name: string = "HTTPError";

  constructor(message: string) {
    super(message);
  }
}

export class GatewayError extends Error {
  override name: string = "GatewayError";

  constructor(message: string) {
    super(message);
  }
}
