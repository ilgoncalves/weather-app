export type HttpRequest = {
  url: string;
  method: HttpMethod;
  queryParams?: any;
  body?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  OKAY = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
