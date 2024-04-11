import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dummyData from '../../assets/WeatherData';

function MyLocationWeather() {
  const [userWeather, setUserWeather] = useState(null);
  const [textOfWeather, setTextOfWeather] = useState('');
  const [myPlace, setMyPlace] = useState('');

  useEffect(() => {
    const getUserWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`,
            );

            const userTemperature = response.data.main.temp - 273.15;
            let selectedDummyData;

            // 더미 데이터를 기반으로 온도에 따른 추천 선택
            for (let i = 0; i < dummyData.length; i++) {
              if (userTemperature <= dummyData[i].temperature) {
                selectedDummyData = dummyData[i];
                break;
              }
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">날씨 정보</h2>
      <Link
        to="/allcities"
        className="text-blue-500 hover:underline mb-4 block"
      >
        전국 날씨 보기
      </Link>
      <h2 className="text-2xl font-bold mb-4">{myPlace}</h2>
      {textOfWeather && (
        <p className="p-4 border-2 border-green-500 text-green-500 rounded-md mb-4">
          오늘의 옷차림 추천 : {textOfWeather}
        </p>
      )}
      {userWeather && (
        <div className="bg-gray-100 p-4 rounded-md">
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
    </div>
  );
}

export default MyLocationWeather;
