import { Weather } from '../models/Weather';

export interface WeatherRepository {
  getWeatherByCity(cityName: string): Promise<Weather>;
}
