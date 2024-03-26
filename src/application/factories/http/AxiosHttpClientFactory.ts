import { AxiosHttpClient } from 'src/infrastructure/http/AxiosHttpClient';

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient();

export const makeApiUrl = (path: string): string =>
  `${process.env.REACT_APP_API_URL}${path}`;

export const makeApiKey = (): string => process.env.REACT_APP_API_KEY;

export const makeByPassCorsUrl = (url: string): string =>
  `${process.env.REACT_APP_BYPASS_CORS_URL}${url}`;
