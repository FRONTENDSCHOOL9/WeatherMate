import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';

function MyLocationWeather() {
  const [myPlace, setMyPlace] = useState(''); // 현재 내 위치를 UI에 보여줄 state
  const [userWeather, setUserWeather] = useRecoilState(userWeatherState); // Recoil 상태 및 setter 가져오기
  /** 사용자가 웹 페이지에 접속한 현재 위치를 기반으로 날씨를 불러오는 함수 */
  const getUserWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude; // 사용자 위도
        const lon = position.coords.longitude; //사용자 경도
        try {
          const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY; // 공용 KEY
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`,
            // 위도 경도를 포함하여 get 요청 전송
          );
          setUserWeather(response.data); // Recoil 상태 업데이트
          setMyPlace(response.data.name);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      });
    }
  };

  useEffect(() => {
    getUserWeather();
  }, []); // 최초의 마운트 될 시 getUserWeather 호출

  console.log('weather', userWeather);

  // 로딩화면
  if (!userWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white w-full pl-9 bg-primary h-[250px]">
      <h2 className="text-2xl font-bold mb-4">날씨 정보</h2>
      {/* <img src="/public/02.svg" alt="My Happy SVG" /> */}
      <h2 className="text-2xl font-bold mb-4">{myPlace.toLocaleUpperCase()}</h2>
      {userWeather && (
        <>
          <p className="text-lg">
            온도: {(userWeather.main.temp - 273.15).toFixed(1)}°C
          </p>
          <p className="text-lg font-bold">
            {userWeather.weather[0].description}
          </p>
        </>
      )}
    </div>
  );
}

export default MyLocationWeather;
