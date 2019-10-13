const { keys } = Object;

class REST {
  public headers = {};
  public append(name: string, value: string) {
    // @ts-ignore
    this.headers[name] = value;
  }
}

interface Params {
  [key: string]: any;
}

enum CRUD {
  GET = 'GET',
  POST = 'POST',
}

export class Crud {
  public rest: REST;

  public constructor() {
    this.rest = new REST();
    this.rest.append('Accept', 'application/json');
    this.rest.append('Content-Type', 'application/json');
  }

  public async fetch<T>(url: RequestInfo, init: RequestInit): Promise<T> {
    const result = await fetch(url, { ...init, headers: this.rest.headers });
    return result.json();
  }

  private static getParamsString(params: Params): string {
    return keys(params as string[])
      .map((k: string) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  public get<T>(input: string, params?: Params): Promise<T> {
    let query;
    if (params) {
      query = Crud.getParamsString(params);
    }
    return this.fetch(`${input}${query}`, { method: CRUD.GET });
  }

  public post<T>(url: string, body: BodyInit): Promise<T> {
    return this.fetch(url, { method: CRUD.POST, body });
  }
}
