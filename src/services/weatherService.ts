import axios from 'axios';
import type { WeatherForecast } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_URL = import.meta.env.VITE_OPENWEATHER_API_URL;


export const fetchWeather = async (lat: number, lon: number): Promise<WeatherForecast[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', 
        cnt: 9,
      },
    });

    
    const todayForecast = response.data.list[0];
    
    const tomorrowForecast = response.data.list[8];

    
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
    
    if (axios.isAxiosError(error)) {
        console.error("API Response Data:", error.response?.data);
    }
    throw error;
  }
};