import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';

function MyLocationWeather() {
  const [myPlace, setMyPlace] = useState(''); // 현재 내 위치를 UI에 보여줄 state
  const [userWeather, setUserWeather] = useRecoilState(userWeatherState); // Recoil 상태 및 setter 가져오기
  const [recommendationImage, setRecommendationImage] = useState(null); // 날씨에 따른 이미지 경로를 사용하기 위함

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
    // 날씨에 따른 이미지 경로를 설정하기 위함
    const getRecommendedImagePath = () => {
      const userTemperature = userWeather?.main.temp - 273.15;

      let selectedDummyData;
      // 더미 데이터를 기반으로 온도에 따른 추천 선택
      for (let i = 0; i < dummyData.length; i++) {
        if (userTemperature <= dummyData[i].temperature) {
          selectedDummyData = dummyData[i];
          break;
        }
      }
      setRecommendationImage(selectedDummyData?.IMG_URL); // 추천 이미지 설정
    };
    getRecommendedImagePath();
  }, [userWeather]); // userWeather가 변경될 때마다 실행

  useEffect(() => {
    getUserWeather();
  }, []); // 최초의 마운트 될 시 getUserWeather 호출

  // 로딩화면
  if (!userWeather) {
    return <div>Loading...</div>;
  }

  const imagePath = recommendationImage;
  const fileName = imagePath?.split('/').pop(); // 경로에서 파일 이름 추출

  return (
    <div className="text-white w-full pl-9 bg-primary mb-20 mt-20">
      <img src={fileName} alt="weather svg " className="mb-3" />
      {userWeather && (
        <>
          <div className="text-4xl font-bold">
            {(userWeather.main.temp - 273.15).toFixed(1)}°C
          </div>
          <p className="text-lg font-bold">
            {userWeather.weather[0].description}
          </p>
        </>
      )}
      <h2 className="text-2xl font-bold mb-4">{myPlace.toLocaleUpperCase()}</h2>
    </div>
  );
}

export default MyLocationWeather;
