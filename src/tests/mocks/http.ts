import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from 'src/data/protocols/http';

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  queryParams?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OKAY,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.queryParams = data.queryParams;
    return this.response;
  }
}
