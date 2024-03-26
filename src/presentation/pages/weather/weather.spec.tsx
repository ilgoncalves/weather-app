import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Weather } from 'src/domain/models/Weather';
import { WeatherRepository } from 'src/domain/repositories/WeatherRepository';
import WeatherPage from 'src/presentation/pages/weather';

describe('WeatherPage', () => {
  const mockWeatherRepository = {
    getWeatherByCity: jest.fn(),
  } as jest.Mocked<WeatherRepository>;

  const mockWeatherParams = {
    city: 'Test City',
    temperature: 288.52,
    description: 'Clear',
    icon: '01d',
    sunrise: 1711340437,
    sunset: 1711384877,
    timezone: 7200,
  };

  const selectOptions = [
    { label: 'Lisbon', value: 'lisbon' },
    { label: 'New York', value: 'new york' },
    { label: 'London', value: 'london' },
  ];

  beforeEach(() => {
    mockWeatherRepository.getWeatherByCity.mockResolvedValue(
      new Weather(
        mockWeatherParams.city,
        mockWeatherParams.temperature,
        mockWeatherParams.description,
        mockWeatherParams.icon,
        mockWeatherParams.sunrise,
        mockWeatherParams.sunset,
        mockWeatherParams.timezone
      )
    );
  });

  test('renders correctly with provided select options', async () => {
    const { getByTestId } = await act(async () =>
      render(
        <WeatherPage
          weatherRepository={mockWeatherRepository as WeatherRepository}
          selectOptions={selectOptions}
        />
      )
    );

    expect(getByTestId('option-0')).toHaveTextContent(selectOptions[0].label);
    expect(getByTestId('option-1')).toHaveTextContent(selectOptions[1].label);
    expect(getByTestId('option-2')).toHaveTextContent(selectOptions[2].label);
  });

  test('fetches weather data when a city is selected', async () => {
    const { getByTestId } = await act(async () =>
      render(
        <WeatherPage
          weatherRepository={mockWeatherRepository as WeatherRepository}
          selectOptions={selectOptions}
        />
      )
    );

    fireEvent.click(getByTestId('option-1'));

    await waitFor(() => getByTestId('img-icon'));

    expect(mockWeatherRepository.getWeatherByCity).toHaveBeenCalledWith(
      selectOptions[1].value
    );

    expect(getByTestId('img-icon')).toHaveAttribute(
      'src',
      `http://openweathermap.org/img/wn/${mockWeatherParams.icon}@4x.png`
    );
  });

  test('renders correctly and fetches weather for default city', async () => {
    const { getByText } = await act(async () =>
      render(
        <WeatherPage
          selectOptions={selectOptions}
          weatherRepository={mockWeatherRepository as WeatherRepository}
        />
      )
    );

    expect(getByText('Weather App')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockWeatherRepository.getWeatherByCity).toHaveBeenCalledWith(
        selectOptions[0].value
      );
    });
  });

  test('should render correct temperature and unit on switch toggle', async () => {
    const { getByTestId } = await act(async () =>
      render(
        <WeatherPage
          selectOptions={selectOptions}
          weatherRepository={mockWeatherRepository as WeatherRepository}
        />
      )
    );

    expect(getByTestId('temperature')).toHaveTextContent('15°C');

    fireEvent.click(getByTestId('switch-input'));

    await waitFor(() => {
      expect(getByTestId('temperature')).toHaveTextContent('60°F');
    });
  });

  test('should render correct sunrise and sunset times', async () => {
    const { getByTestId } = await act(async () =>
      render(
        <WeatherPage
          selectOptions={selectOptions}
          weatherRepository={mockWeatherRepository as WeatherRepository}
        />
      )
    );

    await waitFor(() => {
      expect(getByTestId('sunrise')).toHaveTextContent(`Sunrise: 06:20`);
      expect(getByTestId('sunset')).toHaveTextContent(`Sunset: 18:41`);
    });
  });
});
