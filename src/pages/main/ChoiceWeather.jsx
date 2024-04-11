import axios from 'axios';
import { useState } from 'react';
const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

export const weatherData = async cityId => {
  const params = {
    id: cityId,
    appid: apiKey,
    lang: 'kr',
    units: 'metric',
  };
  const res = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params,
    },
  );
  return res;
};

function AllCitiesWeather() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  const cities = [
    { id: '1835847', name: 'Seoul' },
    { id: '1841610', name: 'Busan' },
    { id: '1843125', name: 'Incheon' },
    // Add more cities here as needed
  ];

  const handleChange = async event => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    const res = await weatherData(cityId);
    setWeatherInfo(res.data);
  };

  return (
    <div>
      <select value={selectedCity} onChange={handleChange}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      {weatherInfo && (
        <div>
          <h2>Current Weather in {weatherInfo.name}</h2>
          <p>Temperature: {weatherInfo.main.temp} °C</p>
          <p>Weather: {weatherInfo.weather[0].description}</p>
          <p>Humidity: {weatherInfo.main.humidity}%</p>
          <p>Wind Speed: {weatherInfo.wind.speed} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
}

export default AllCitiesWeather;
