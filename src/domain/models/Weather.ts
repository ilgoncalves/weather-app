export type TemperatureUnit = 'C' | 'F';

export class Weather {
  constructor(
    private _cityName: string,
    private _temperature: number,
    private _description: string,
    private _icon: string,
    private _sunrise: number,
    private _sunset: number,
    private _timezoneOffset: number
  ) {}

  private convertFromKelvinToCelsius(temperature: number): number {
    return temperature - 273.15;
  }

  private convertFromKelvinToFahrenheit(temperature: number): number {
    return (temperature - 273.15) * (9 / 5) + 32;
  }

  private formatInHoursAndMinutes = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  private convertFromUnixTimestampToTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);

    const localOffsetInHours = date.getTimezoneOffset() / 60;
    const cityOffsetInHours = this._timezoneOffset / 3600;
    const totalOffset = localOffsetInHours + cityOffsetInHours;

    date.setHours(date.getHours() + totalOffset);

    return this.formatInHoursAndMinutes(date);
  };

  getTemperature = (unit: TemperatureUnit): string => {
    const temperature =
      unit === 'C'
        ? this.convertFromKelvinToCelsius(this._temperature)
        : this.convertFromKelvinToFahrenheit(this._temperature);

    return `${temperature.toFixed(0)}°${unit}`;
  };

  getSunrise = (): string => {
    return this.convertFromUnixTimestampToTime(this._sunrise);
  };

  getSunset = (): string => {
    return this.convertFromUnixTimestampToTime(this._sunset);
  };

  get cityName(): string {
    return this._cityName;
  }

  get icon(): string {
    return this._icon;
  }
}
