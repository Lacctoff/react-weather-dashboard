export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface WeatherForecast {
  date: string;
  temp: number;
  description: string;
  icon: string;
}