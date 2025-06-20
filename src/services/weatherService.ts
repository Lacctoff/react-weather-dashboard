import axios from 'axios';
import type { WeatherForecast } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
// This is the new, correct URL for the free forecast API
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherForecast[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // For Celsius
        cnt: 9, // We need about 9 * 3-hour intervals to get today and tomorrow
      },
    });

    // The data structure is different. The forecasts are in a 'list' array.
    const todayForecast = response.data.list[0];
    // The forecast for ~24 hours from now will be the 8th item in the 3-hour list
    const tomorrowForecast = response.data.list[8];

    // Helper function to transform the API data into our WeatherForecast format
    const transformForecast = (apiData: any): WeatherForecast => ({
      date: new Date(apiData.dt * 1000).toLocaleDateString(),
      temp: apiData.main.temp,
      description: apiData.weather[0].description,
      icon: apiData.weather[0].icon,
    });

    return [
      transformForecast(todayForecast),
      transformForecast(tomorrowForecast)
    ];

  } catch (error) {
    console.error("Error fetching weather data:", error);
    // It's helpful to check the actual error response from the API
    if (axios.isAxiosError(error)) {
        console.error("API Response Data:", error.response?.data);
    }
    throw error;
  }
};