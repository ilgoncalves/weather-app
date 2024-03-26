import axios, { isAxiosError } from 'axios';
import { AxiosHttpClient } from './AxiosHttpClient';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    request: jest.fn(),
  },
  isAxiosError: jest.fn(),
}));

const makeSut = () => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  const mockIsAxiosError = isAxiosError as jest.MockedFunction<
    typeof isAxiosError
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should correctly map Axios response to HttpResponse', async () => {
    const sut = makeSut();
    const expectedResponse = { data: 'any_data', status: 200 };
    mockAxios.request.mockResolvedValue(expectedResponse);

    const httpResponse = await sut.request({
      url: 'any_url',
      method: 'get',
    });

    expect(httpResponse).toEqual({
      body: expectedResponse.data,
      statusCode: expectedResponse.status,
    });
  });

  test('should handle Axios error by returning its response', async () => {
    const sut = makeSut();
    const expectedError = {
      response: { data: 'error_data', status: 404 },
    };
    mockAxios.request.mockRejectedValue(expectedError);
    mockIsAxiosError.mockReturnValue(true);

    const httpResponse = await sut.request({
      url: 'any_url',
      method: 'get',
    });

    expect(httpResponse).toEqual({
      body: expectedError.response.data,
      statusCode: expectedError.response.status,
    });
  });

  test('should throw if an unexpected error occurs', async () => {
    const sut = makeSut();
    mockAxios.request.mockRejectedValue(new Error('Unexpected error'));
    mockIsAxiosError.mockReturnValue(false);

    await expect(
      sut.request({
        url: 'any_url',
        method: 'get',
      })
    ).rejects.toThrow('Unexpected error');
  });
});
