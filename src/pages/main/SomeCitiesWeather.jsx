import { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

/** 일부 도시의 날씨를 받아오는 Component */
function SomeCitiesWeather() {
  const [citiesWeather, setCitiesWeather] = useState([]); // 도시들을 저장할 배열 state

  const fetchWeatherData = async () => {
    const cities = [
      // 요청을 보낼 도시들을 객체로 저장
      { name: 'Seoul', country: 'KR' },
      { name: 'New York', country: 'US' },
      { name: 'Gyeonggi-do', country: 'KR' },
      { name: 'Suwon', country: 'KR' },
    ];
    /** cities 객체 갯수 만큼 get 요청  */
    const promises = cities.map(city =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&lang=kr`,
      ),
    );
    try {
      const responses = await Promise.all(promises); // promise 를 대기했다 전부 받아온 후 저장
      const data = responses.map(response => response.data);
      setCitiesWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  console.log('about cities weather', citiesWeather);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const formatUnixTime = unixTime => {
    const date = new Date(unixTime * 1000); // Unix 시간을 밀리초 단위로 변환하여 Date 객체 생성
    return date.toLocaleTimeString(); // 현재 로케일에 맞춰 시간을 문자열로 변환
  };

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
            일출: {formatUnixTime(cityWeather.sys.sunrise)}
          </p>

          <p className="text-base">
            일몰: {formatUnixTime(cityWeather.sys.sunset)}
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
