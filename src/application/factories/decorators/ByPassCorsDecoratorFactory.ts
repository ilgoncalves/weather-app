import { ByPassCorsHttpClientDecorator } from 'src/application/decorators/ByPassCorsHttpClientDecorator';
import { HttpClient } from 'src/data/protocols/http';
import { makeApiKeyHttpClientDecorator } from './ApiKeyHttpClientDecoratorFactory';

export const makeByPassCorsDecorator = (): HttpClient =>
  new ByPassCorsHttpClientDecorator(makeApiKeyHttpClientDecorator());
