import React, { useState, useEffect } from 'react';
import type { City } from '../types/index'
import type { WeatherForecast } from '../types/index'
import { fetchWeather } from '../services/weatherService';

interface WeatherInfoProps {
  city: City;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherForecast[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        setError('');
        const weatherData = await fetchWeather(city.latitude, city.longitude);
        setWeather(weatherData);
      } catch (err) {
        setError('Could not fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) return <div className="p-2">Loading weather...</div>;
  if (error) return <div className="p-2 text-red-500">{error}</div>;

  return (
    <div className="p-1 text-sm text-gray-800">
      <h3 className="font-bold text-base mb-2 text-center">{city.name}</h3>
      {weather?.map((day, index) => (
        <div key={index} className="text-center border-t border-gray-200 pt-2 mt-2 first:mt-0 first:border-t-0 first:pt-0">
          <p className="font-semibold">{index === 0 ? 'Today' : 'Tomorrow'}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}.png`}
            alt={day.description}
            className="w-12 h-12 mx-auto"
          />
          <p className="text-lg font-bold">{day.temp.toFixed(1)}°C</p>
          <p className="capitalize">{day.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherInfo;