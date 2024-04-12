import axios from 'axios';
import { useState } from 'react';
const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function AllCitiesWeather() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLon, setSelectedLon] = useState(null);

  const weatherData = async cityId => {
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

    // 날씨 정보에서 위도(latitude)와 경도(longitude) 추출
    const { coord } = res.data;
    const { lat, lon } = coord;

    // 위도와 경도를 함께 반환
    return { data: res.data, lat, lon };
  };

  // handleChange 함수에서 사용 예시
  const handleChange = async event => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    const { data, lat, lon } = await weatherData(cityId);
    setWeatherInfo(data);
    setSelectedLat(lat);
    setSelectedLon(lon);

    console.log('Latitude:', selectedLat);
    console.log('Longitude:', selectedLon);
  };

  const cities = [
    { id: '1835847', name: 'Seoul' },
    { id: '1841610', name: 'Busan' },
    { id: '1843125', name: 'Incheon' },
    // Add more cities here as needed
  ];

  // const handleChange = async event => {
  //   const cityId = event.target.value;
  //   setSelectedCity(cityId);
  //   const res = await weatherData(cityId);
  //   setWeatherInfo(res.data);
  // };

  return (
    <div className="relative top-5 bg-primary">
      <select value={selectedCity} onChange={handleChange}>
        <option>지역별 날씨</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      {weatherInfo && (
        <div>
          <h2>선택된 지역날씨 {weatherInfo.name}</h2>
          <p>온도: {weatherInfo.main.temp} °C</p>
          <p>날씨: {weatherInfo.weather[0].description}</p>
          <p>습도: {weatherInfo.main.humidity}%</p>
          <p>풍속: {weatherInfo.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default AllCitiesWeather;
