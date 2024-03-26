import { HttpClientSpy } from 'src/tests/mocks/http';
import { ApiKeyHttpClientDecorator } from './ApiKeyHttpClientDecorator';

describe('ApiKeyHttpClientDecorator', () => {
  it('should call HttpClient with correct api key', async () => {
    const apiKey = 'any_api';
    const httpClientSpy = new HttpClientSpy();
    const sut = new ApiKeyHttpClientDecorator(apiKey, httpClientSpy);
    await sut.request({
      url: 'any_url',
      method: 'get',
    });

    expect(Object.values(httpClientSpy.queryParams)).toContain(apiKey);
  });
});
