import { Exception } from './exception';
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
  DELETE = 'DELETE',
}

export class Crud {
  public rest: REST;

  public constructor() {
    this.rest = new REST();
    this.rest.append('Accept', 'application/json');
    this.rest.append('Content-Type', 'application/json');
  }

  public async fetch<T>(url: RequestInfo, init: RequestInit, token?: string): Promise<T> {
    const headers = { ...this.rest.headers };
    if (token) {
      // @ts-ignore
      headers['Authorization'] = `Bearer ${token}`;
    }
    const requestInit = { ...init, headers };
    const result = await fetch(url, requestInit);
    const response = await result.json();
    if (!result.ok) {
      throw new Exception(response);
    }
    return response;
  }

  private static getParamsString(params: Params): string {
    return keys(params as string[])
      .map((k: string) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  public get<T>(input: string, params?: Params, token?: string): Promise<T> {
    let query;
    if (params) {
      query = Crud.getParamsString(params);
    }
    return this.fetch(`${input}${query ? '?' : ''}${query}`, { method: CRUD.GET }, token);
  }

  public post<T>(url: string, body: BodyInit, token?: string): Promise<T> {
    return this.fetch(url, { method: CRUD.POST, body }, token);
  }

  public delete<T>(url: string, token?: string): Promise<T> {
    return this.fetch(url, { method: CRUD.DELETE }, token);
  }
}
