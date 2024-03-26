import { ApiKeyHttpClientDecorator } from 'src/application/decorators/ApiKeyHttpClientDecorator';
import { HttpClient } from 'src/data/protocols/http';
import {
  makeApiKey,
  makeAxiosHttpClient,
} from '../http/AxiosHttpClientFactory';

export const makeApiKeyHttpClientDecorator = (): HttpClient =>
  new ApiKeyHttpClientDecorator(makeApiKey(), makeAxiosHttpClient());
