import { Weather } from 'src/domain/models/Weather';
import { WeatherRepository } from 'src/domain/repositories/WeatherRepository';
import { WeatherDTO } from '../dto/WeatherDTO';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class WeatherRepositoryImpl implements WeatherRepository {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<WeatherRepositoryImpl.Model>
  ) {}

  async getWeatherByCity(cityName: string): Promise<Weather> {
    const data = await this.httpClient.request({
      method: 'get',
      url: this.url,
      queryParams: {
        q: cityName,
      },
    });

    if (data.statusCode === HttpStatusCode.OKAY && data.body) {
      return this.transformResponseToWeather(data.body);
    } else if (data.statusCode === HttpStatusCode.UNAUTHORIZED) {
      throw new Error('Unauthorized');
    } else {
      throw new Error('Error');
    }
  }

  private transformResponseToWeather(data: WeatherDTO): Weather {
    if (
      !data ||
      !data.name ||
      !data.main ||
      !data.weather ||
      !data.weather[0] ||
      !data.sys
    ) {
      throw new Error('Invalid data');
    }

    return new Weather(
      data.name,
      data.main.temp,
      data.weather[0].description,
      data.weather[0].icon,
      data.sys.sunrise,
      data.sys.sunset,
      data.timezone
    );
  }
}

export namespace WeatherRepositoryImpl {
  export type Model = WeatherDTO;
}
