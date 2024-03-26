import { Weather } from 'src/domain/models/Weather';
import { HttpClientSpy } from 'src/tests/mocks/http';
import { mockWeatherDTO } from 'src/tests/mocks/weatherDTO';
import { HttpStatusCode } from '../protocols/http';
import { WeatherRepositoryImpl } from './WeatherRepositoryImpl';

const makeSut = () => {
  const url = 'http://example.com/weather';
  const httpClientSpy = new HttpClientSpy<WeatherRepositoryImpl.Model>();
  const sut = new WeatherRepositoryImpl(url, httpClientSpy);

  return { sut, httpClientSpy };
};

describe('WeatherRepositoryImpl', () => {
  test('should return Weather on 200 status code', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.OKAY,
      body: mockWeatherDTO,
    };

    const weather = await sut.getWeatherByCity(mockWeatherDTO.name);

    expect(weather).toBeInstanceOf(Weather);
    expect(weather.cityName).toBe(mockWeatherDTO.name);
    expect(httpClientSpy.url).toBe('http://example.com/weather');
    expect(httpClientSpy.method).toBe('get');
    expect(httpClientSpy.queryParams).toEqual({ q: weather.cityName });
  });

  test('should throw an error on 401 status code', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };

    await expect(sut.getWeatherByCity('Test City')).rejects.toThrow(
      'Unauthorized'
    );
  });

  test('should throw a generic error on other status codes', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };

    await expect(sut.getWeatherByCity('Test City')).rejects.toThrow('Error');
  });

  test('should handle empty response body gracefully', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.OKAY,
      body: null,
    };

    await expect(sut.getWeatherByCity('Test City')).rejects.toThrow('Error');
  });

  test('should handle malformed response data gracefully', async () => {
    const { sut, httpClientSpy } = makeSut();
    const malformedData = {};
    httpClientSpy.response = {
      statusCode: HttpStatusCode.OKAY,
      body: malformedData as any,
    };

    await expect(sut.getWeatherByCity('Test City')).rejects.toThrow(
      'Invalid data'
    );
  });

  test('should verify all required query parameters are included', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.OKAY,
      body: mockWeatherDTO,
    };

    await sut.getWeatherByCity('Another Test City');
    expect(httpClientSpy.queryParams).toEqual({ q: 'Another Test City' });
  });

  test('should handle network errors gracefully', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.request = jest
      .fn()
      .mockRejectedValue(new Error('Network Error'));

    await expect(sut.getWeatherByCity('Test City')).rejects.toThrow(
      'Network Error'
    );
  });
});
