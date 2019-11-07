export class Exception extends Error {
  public constructor(public readonly message: string, public readonly code: number) {
    super(message);
  }
}
