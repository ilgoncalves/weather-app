import { WeatherDTO } from 'src/data/dto/WeatherDTO';

export const mockWeatherDTO: WeatherDTO = {
  coord: {
    lon: 23.7162,
    lat: 37.9795,
  },
  main: {
    temp: 288.52,
    feels_like: 287.42,
    temp_min: 285.36,
    temp_max: 289.64,
    pressure: 1011,
    humidity: 50,
  },
  weather: [
    {
      id: 801,
      main: 'Clouds',
      description: 'few clouds',
      icon: '02n',
    },
  ],
  base: 'stations',

  visibility: 10000,
  wind: {
    speed: 1.79,
    deg: 119,
  },
  sys: {
    type: 2,
    id: 2005878,
    country: 'GR',
    sunrise: 1711340437,
    sunset: 1711384877,
  },
  clouds: {
    all: 24,
  },
  dt: 1711402593,
  timezone: 7200,
  id: 264371,
  name: 'Athens',
  cod: 200,
};
