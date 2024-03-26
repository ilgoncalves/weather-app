import { HttpClient, HttpRequest, HttpResponse } from 'src/data/protocols/http';

import axios, { AxiosResponse, isAxiosError } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse;
    try {
      response = await axios.request({
        url: data.url,
        method: data.method,
        data: data.method === 'get' ? undefined : data.body,
        params: data.queryParams,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        response = error.response;
      }
    }
    if (!response) {
      throw new Error('Unexpected error');
    }

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
