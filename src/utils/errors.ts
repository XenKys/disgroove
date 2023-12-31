export class RESTError extends Error {
  override name: string = "RESTError";

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
