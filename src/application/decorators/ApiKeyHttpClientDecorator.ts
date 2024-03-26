import { HttpClient, HttpRequest, HttpResponse } from 'src/data/protocols/http';

export class ApiKeyHttpClientDecorator implements HttpClient {
  constructor(
    private readonly apiKey: string,
    private readonly httpClient: HttpClient
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    return this.httpClient.request({
      ...data,
      queryParams: {
        ...data.queryParams,
        appid: this.apiKey,
      },
      body: {
        ...data.body,
      },
    });
  }
}
