export class RESTError extends Error {
  public override name: string = "RESTError";

  constructor(message: string) {
    super(message);
  }
}

export class HTTPError extends Error {
  public override name: string = "RESTError";

  constructor(message: string) {
    super(message);
  }
}

export class GatewayError extends Error {
  public override name: string = "RESTError";

  constructor(message: string) {
    super(message);
  }
}
