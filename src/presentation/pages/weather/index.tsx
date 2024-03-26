import { FC, useState } from 'react';
import Styles from './styles.module.scss';

import { Weather } from 'src/domain/models/Weather';
import { WeatherRepository } from 'src/domain/repositories/WeatherRepository';
import { Header, Icon, Select, Switch } from 'src/presentation/components';
import { Option } from 'src/presentation/components/select';

interface WeatherProps {
  weatherRepository: WeatherRepository;
  selectOptions: Option[];
}

const WeatherPage: FC<WeatherProps> = ({
  weatherRepository,
  selectOptions,
}) => {
  const [cityWeather, setCityWeather] = useState<Weather>();

  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const handleTemperatureUnitChange = (isChecked: boolean) => {
    setTemperatureUnit(isChecked ? 'F' : 'C');
  };

  const fetchCityWeather = async (city: string) => {
    const cityWeather = await weatherRepository.getWeatherByCity(city);

    setCityWeather(cityWeather);
  };

  return (
    <div className={Styles.app}>
      <Header title="Weather App" />

      <div className={Styles.container}>
        <div className={Styles.row}>
          <Select options={selectOptions} onChange={fetchCityWeather} />
          <Switch
            onChange={handleTemperatureUnitChange}
            leftLabel="°C"
            rightLabel="°F"
          />
        </div>

        <div className={Styles.centerInfo}>
          <h1 data-testid="temperature" className={Styles.temperature}>
            {cityWeather?.getTemperature(temperatureUnit)}
          </h1>

          <Icon iconId={cityWeather?.icon} />
        </div>

        <div className={Styles.row}>
          <h3 data-testid="sunrise">Sunrise: {cityWeather?.getSunrise()}</h3>
          <h3 data-testid="sunset">Sunset: {cityWeather?.getSunset()}</h3>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
