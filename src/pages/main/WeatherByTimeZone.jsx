import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function WeatherByTimeZone() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=15`,
          )
          .then(response => {
            setWeatherData(response.data);
          })
          .catch(error => {
            setError(error.message);
          });
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!weatherData) {
    return;
  }
  const unixToHumanTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000); // Unix 시간은 밀리초 단위가 아니므로 1000을 곱해야 합니다.
    const hours = date.getHours(); // 시간을 가져옵니다.
    let minutes = date.getMinutes(); // 분을 가져옵니다.
    const ampm = hours >= 12 ? 'PM' : 'AM'; // 오전/오후 구분
    const hour = hours % 12 || 12; // 12시간 형식으로 변환
    minutes = minutes === 0 ? '' : ':' + (minutes < 10 ? '0' : '') + minutes; // 분이 0이면 없애고, 아니면 정상적으로 반환
    return `${hour}${minutes} ${ampm}`; // 시간을 반환합니다.
  };

  // WeatherByTimeZone 컴포넌트 내에서 사용할 함수로 지정
  return (
    <div className="rounded-l-[36px] bg-white bg-opacity-80 h-[130px] flex items-center justify-center gap-5 overflow-x-scroll ml-8">
      {weatherData.list.map(item => (
        <div key={item.dt} className="flex items-center justify-center">
          <div className="w-16 bg-white h-28 rounded-[32.5px] flex justify-center items-center">
            <div className="flex-col justify-center items-center">
              <div className="text-primary text-xs text-center">
                {unixToHumanTime(item.dt)}
              </div>
              <div className="">
                <img src="/public/03.svg" alt="My Happy SVG" />
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

// <p>기온: {(item.main.temp - 273.15).toFixed(1)}°C</p>;

// <h3 className="font-semibold">{item.dt_txt}</h3>;
//  <div className="text-primary text-xs">1PM</div>;
