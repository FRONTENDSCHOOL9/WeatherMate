import { useState, useEffect } from 'react';
import axios from 'axios';
import dummyData from '../../assets/WeatherData';

const apiKey = '0b3c41613d168b307d75914e65e44de6';

function MainWeather() {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [userWeather, setUserWeather] = useState(null);
  const [textOfWeather, setTextOfWeather] = useState('');
  const [myPlace, setMyPlace] = useState('');
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
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}`,
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
    console.log(citiesWeather);
    fetchWeatherData();
  }, []);

  useEffect(() => {
    const getUserWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            );

            const userTemperature = response.data.main.temp - 273.15;
            let selectedDummyData;
            if (userTemperature <= 5) {
              selectedDummyData = dummyData[0];
            } else if (userTemperature <= 10) {
              selectedDummyData = dummyData[1];
            } else {
              selectedDummyData = dummyData[2];
            }
            setTextOfWeather(selectedDummyData.recommendation);
            setUserWeather(response.data);
            setMyPlace(response.data.name);
          } catch (error) {
            console.error('Error fetching user weather data:', error);
          }
        });
      }
    };
    getUserWeather();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">날씨정보</h2>
      <p className="text-2xl">{myPlace}</p>
      {textOfWeather && (
        <p className="p-4 border-2 text-emerald-400	">
          오늘의 옷차림 추천 : {textOfWeather}
        </p>
      )}
      {userWeather && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">현재 내 위치 날씨</h3>
          <div className="flex flex-col">
            <p className="text-lg">
              온도: {(userWeather.main.temp - 273.15).toFixed(1)}°C
            </p>
            <p className="text-lg">
              소개: {userWeather.weather[0].description}
            </p>
          </div>
        </div>
      )}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainWeather;
