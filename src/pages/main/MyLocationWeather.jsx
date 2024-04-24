import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
// import dummyData from '../../assets/WeatherData';
import { IoIosRefresh } from 'react-icons/io';
import Loading from '../../components/layout/Loading';
// import WeatherByTimeZone from './WeatherByTimeZone';

const MyLocationWeather = () => {
  const [myPlace, setMyPlace] = useState('');
  const [userWeather, setUserWeather] = useRecoilState(userWeatherState);
  const [loading, setLoading] = useState(true);

  // const [recommendationImage, setRecommendationImage] = useState(null);

  useEffect(() => {
    // 세션 스토리지에서 데이터 가져오기
    const sessionData = sessionStorage.getItem('userWeather');
    if (sessionData) {
      setUserWeather(JSON.parse(sessionData));
      setMyPlace(sessionStorage.getItem('myPlace')); // 세션 스토리지에서 myPlace 가져오기
      setLoading(false);
    } else {
      getUserWeather(); // 세션에 데이터가 없으면 API 호출
    }
  }, []);

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
          setUserWeather(response.data);
          setMyPlace(response.data.name);
          setLoading(false);
          // 세션 스토리지에 데이터 저장
          sessionStorage.setItem('userWeather', JSON.stringify(response.data));
          sessionStorage.setItem('myPlace', response.data.name); // myPlace 저장
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
          setLoading(false);
        }
      });
    }
  };

  console.log('mylocationWeather:', userWeather);
  const defaultImgPath = '/01.svg'; // 디폴트 이미지 경로

  const weatherImageMapping = {
    Clear: '/uvi.svg',
    Clouds: '/manyClouds.svg',
    Rain: '/rain.svg',
    Drizzle: '/rain.svg',
    Thunderstorm: '/thunderStorm.svg',
    Snow: '/mainSnow.svg',
    Mist: '/Mist.svg',
    'overcast clouds': '/sun.svg',
    // 추가적인 날씨 종류에 따른 매핑 추가 가능
  };

  // userWeather가 존재하고, userWeather.weather 배열의 첫 번째 요소의 description이 있는 경우에만 이미지 경로를 설정
  const getImagePathForWeather = () => {
    if (
      !userWeather ||
      !userWeather.weather ||
      userWeather.weather.length === 0
    )
      return defaultImgPath; // userWeather나 userWeather.weather가 없으면 기본 이미지 반환

    const englishDescription = userWeather.weather[0].main; // 영어로된 날씨 설명 가져오기

    // 영어로 된 날씨 설명에 해당하는 이미지 경로 반환
    return weatherImageMapping[englishDescription] || defaultImgPath;
  };
  const imagePath = getImagePathForWeather(); // getImagePathForWeather 함수 호출하여 imagePath 설정

  // 새로고침 함수
  const handleRefresh = () => {
    sessionStorage.removeItem('userWeather'); // 세션 스토리지 데이터 제거
    sessionStorage.removeItem('myPlace');
    window.location.reload(); // 페이지 새로고침
  };

  const unixToHumanTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM'; // 오전과 오후를 판별합니다.
    const hour = hours % 12 || 12; // 12시간 형식으로 변경합니다.
    minutes = minutes === 0 ? '' : ':' + (minutes < 10 ? '0' : '') + minutes;
    return `${hour}${minutes} ${ampm}`;
  };

  return (
    <div className=" w-full pl-9  mb-20 mt-20 ">
      <div className="absolute top-12 right-12 xl:top-24 xl:right-72">
        {/* 자식 요소에 absolute 클래스 추가하여 절대 위치 지정 */}
        <IoIosRefresh
          className="text-2xl xl:text-3xl"
          onClick={handleRefresh}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <img
            src={imagePath}
            alt="weather svg "
            className="mb-3 w-[100px] h-[100px] bg-cover"
          />
          {userWeather && (
            <>
              <div className="text-4xl font-bold  ">
                {(userWeather.main.temp - 273.15).toFixed(1)}°C
              </div>
              <p className="text-lg font-bold ">
                {userWeather.weather[0].description}
              </p>
              <p className="mb-7">기준 : {unixToHumanTime(userWeather.dt)}</p>
              <h2 className="text-2xl font-bold mb-4">{myPlace}</h2>

              <div className="flex gap-5 mb-20">
                <div className="flex flex-col justify-center items-center">
                  <img src="sunset.svg" className="w-5 h-5 mb-1" />
                  <p> {unixToHumanTime(userWeather.sys.sunrise)}</p>
                  <p>{unixToHumanTime(userWeather.sys.sunset)}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img src="sunset.svg" className="w-5 h-5 mb-1" />
                  <p> {(userWeather.main.temp_max - 273.15).toFixed(1)}°C</p>
                  <p> {(userWeather.main.temp_min - 274.15).toFixed(1)}°C</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default React.memo(MyLocationWeather);

{
  /* <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                  <img src="humidity.svg" className="w-[31px] " />
                  <p className="text-[#00179C] font-medium">최고온도</p>
                  <p>{(detailWeather.main.temp_max - 269.15).toFixed(1)}°C</p>
                </div>
                <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                  <img src="humidity.svg" className="w-[31px] " />
                  <p className="text-[#00179C] font-medium">최저온도</p>
                  <p>{(detailWeather.main.temp_min - 269.15).toFixed(1)}°C</p>
                </div> */
}
