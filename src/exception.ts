export class Exception extends Error {
  public constructor(public readonly response: Response | string) {
    super(JSON.stringify(response));
  }
}
