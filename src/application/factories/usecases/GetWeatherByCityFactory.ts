import { WeatherRepositoryImpl } from 'src/data/repositories/WeatherRepositoryImpl';
import { WeatherRepository } from 'src/domain/repositories/WeatherRepository';
import { Option } from 'src/presentation/components/select';
import { makeByPassCorsDecorator } from '../decorators/ByPassCorsDecoratorFactory';
import { makeApiUrl } from '../http/AxiosHttpClientFactory';

export const makeGetWeatherByCity = (): WeatherRepository =>
  new WeatherRepositoryImpl(makeApiUrl('/weather'), makeByPassCorsDecorator());

export const makeCityOptions = (): Option[] => [
  { label: 'Lisbon', value: 'lisbon' },
  { label: 'New York', value: 'new york' },
  { label: 'London', value: 'london' },
];
