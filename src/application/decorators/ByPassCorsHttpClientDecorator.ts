import { HttpClient, HttpRequest, HttpResponse } from 'src/data/protocols/http';

export class ByPassCorsHttpClientDecorator implements HttpClient {
  private readonly byPassUrl: string = process.env.REACT_APP_BY_PASS_CORS_URL;
  constructor(private readonly httpClient: HttpClient) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    return this.httpClient.request({
      ...data,
      url: `${this.byPassUrl}/${data.url}`,
    });
  }
}
