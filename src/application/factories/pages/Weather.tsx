import { Weather } from 'src/presentation/pages';
import {
  makeCityOptions,
  makeGetWeatherByCity,
} from '../usecases/GetWeatherByCityFactory';

export const makeWeatherPage = (): React.ReactNode => {
  return (
    <Weather
      selectOptions={makeCityOptions()}
      weatherRepository={makeGetWeatherByCity()}
    />
  );
};
