import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function WeatherByTimeZone() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null); // 위치 정보 상태 추가

  const fetchWeatherData = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude }); // 위치 정보 상태 업데이트

      // 위치 정보 세션에 저장
      sessionStorage.setItem('latitude', latitude);
      sessionStorage.setItem('longitude', longitude);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude + 10}&lon=${longitude}&appid=${apiKey}&cnt=10`,
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      gsap.from('.weather-container', {
        duration: 1,
        opacity: 0,
        x: '100%',
        ease: 'power3.out',
      });
    }
  }, [weatherData]);

  const memoizedWeatherData = useMemo(() => weatherData, [weatherData]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!memoizedWeatherData) {
    return null;
  }

  const unixToHumanTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;
    minutes = minutes === 0 ? '' : ':' + (minutes < 10 ? '0' : '') + minutes;
    return `${hour}${minutes} ${ampm}`;
  };

  return (
    <div className="rounded-l-[36px] bg-primary bg-opacity-80 h-[130px] flex items-center justify-center gap-5 overflow-x-scroll ml-8 scrollbar-hide mt-20 weather-container">
      {memoizedWeatherData.list.map(item => (
        <div key={item.dt} className="flex items-center justify-center">
          <div className="w-16 bg-white h-28 rounded-[32.5px] flex justify-center items-center">
            <div className="flex-col justify-center items-center">
              <div className="text-primary text-xs text-center">
                {unixToHumanTime(item.dt)}
              </div>
              <div className="">
                <img src="/03.svg" alt="My Happy SVG" />
              </div>
              <div className="text-center font-semibold">
                {(item.main.temp - 273.15).toFixed(0)}°C
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherByTimeZone;
