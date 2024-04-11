import { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function SomeCitiesWeather() {
  const [citiesWeather, setCitiesWeather] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const cities = [
        { name: 'Seoul', country: 'KR' },
        { name: 'New York', country: 'US' },
        { name: 'Gyeonggi-do', country: 'KR' },
        { name: 'Suwon', country: 'KR' },
      ];
      const promises = cities.map(city =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&lang=kr`,
        ),
      );
      try {
        const responses = await Promise.all(promises);
        const data = responses.map(response => response.data);
        setCitiesWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {citiesWeather.map((cityWeather, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{cityWeather.name}</h3>
          <p className="text-base">
            현재온도: {(cityWeather.main.temp - 273.15).toFixed(2)}°C
          </p>
          <p className="text-base">
            최저온도: {(cityWeather.main.temp_min - 273.15).toFixed(2)}°C
          </p>
          <p className="text-base">
            최고온도: {(cityWeather.main.temp_max - 273.15).toFixed(2)}°C
          </p>
          <p className="text-base">
            한줄평: {cityWeather.weather[0].description}
          </p>
          {cityWeather.weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mt-2"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SomeCitiesWeather;
