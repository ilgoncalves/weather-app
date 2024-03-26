import { Weather } from './Weather';

describe('Weather', () => {
  const mockData = {
    cityName: 'Test City',
    temperature: 298.15,
    description: 'Clear sky',
    icon: '01d',
    sunrise: 1711363815,
    sunset: 1711408395,
    timezoneOffset: -14400,
  };

  let sut: Weather;

  beforeEach(() => {
    sut = new Weather(
      mockData.cityName,
      mockData.temperature,
      mockData.description,
      mockData.icon,
      mockData.sunrise,
      mockData.sunset,
      mockData.timezoneOffset
    );
  });

  describe('Temperature conversion and retrieval', () => {
    test('should convert temperature to Celsius correctly', () => {
      expect(sut.getTemperature('C')).toBe('25°C');
    });

    test('should convert temperature to Fahrenheit correctly', () => {
      expect(sut.getTemperature('F')).toBe('77°F');
    });

    test('Temperature conversion handles extreme values', () => {
      const hotWeather = new Weather(
        'Death Valley',
        330,
        'Very Hot',
        '01d',
        mockData.sunrise,
        mockData.sunset,
        mockData.timezoneOffset
      );
      const coldWeather = new Weather(
        'Antarctica',
        190,
        'Very Cold',
        '01n',
        mockData.sunrise,
        mockData.sunset,
        mockData.timezoneOffset
      );

      expect(hotWeather.getTemperature('C')).toBe('57°C');
      expect(coldWeather.getTemperature('C')).toBe('-83°C');
      expect(hotWeather.getTemperature('F')).toBe('134°F');
      expect(coldWeather.getTemperature('F')).toBe('-118°F');
    });

    test('Temperature conversion handles edge case of extremely high Kelvin value', () => {
      const extremelyHotWeather = new Weather(
        'Solar Surface',
        5778,
        'Very Hot',
        '01d',
        mockData.sunrise,
        mockData.sunset,
        mockData.timezoneOffset
      );
      expect(extremelyHotWeather.getTemperature('C')).toBe('5505°C');
      expect(extremelyHotWeather.getTemperature('F')).toBe('9941°F');
    });
  });

  describe('Timezone Conversions and retrieval', () => {
    test('getSunrise returns correct sunrise time in local timezone', () => {
      expect(sut.getSunrise()).toBe('06:50');
    });

    test('getSunset returns correct sunset time in local timezone', () => {
      expect(sut.getSunset()).toBe('19:13');
    });

    test('Time conversion accounts for timezone differences', () => {
      const timezone = 7200;
      const sunrise = 1711340437;
      const sunset = 1711384877;
      const cityName = 'Athens';

      const weatherWithTimezone = new Weather(
        cityName,
        mockData.temperature,
        mockData.description,
        mockData.icon,
        sunrise,
        sunset,
        timezone
      );

      expect(weatherWithTimezone.getSunrise()).toBe('06:20');
      expect(weatherWithTimezone.getSunset()).toBe('18:41');
    });
  });

  test('City name should be accessible', () => {
    expect(sut.cityName).toBe('Test City');
  });
  test('Icon should be accessible', () => {
    expect(sut.icon).toBe('01d');
  });
});
