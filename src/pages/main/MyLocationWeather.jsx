import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { IoIosRefresh } from 'react-icons/io';
import Loading from '../../components/layout/Loading';

function MyLocationWeather() {
  const [myPlace, setMyPlace] = useState('');
  const [userWeather, setUserWeather] = useRecoilState(userWeatherState);
  const [loading, setLoading] = useState(true);
  const [recommendationImage, setRecommendationImage] = useState(null);

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
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
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

  useEffect(() => {
    const getRecommendedImagePath = () => {
      const userTemperature = userWeather?.main.temp - 273.15;
      const selectedDummyData = dummyData.find(
        data => userTemperature <= data.temperature,
      );
      setRecommendationImage(selectedDummyData?.IMG_URL);
    };
    if (!loading) getRecommendedImagePath();
  }, [userWeather, loading]);

  const defaultImgPath = '/01.svg';

  const imagePath = recommendationImage
    ? recommendationImage.split('/').pop()
    : defaultImgPath;

  // 새로고침 함수
  const handleRefresh = () => {
    sessionStorage.removeItem('userWeather'); // 세션 스토리지 데이터 제거
    sessionStorage.removeItem('myPlace');
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <div className=" w-full pl-9  mb-20 mt-20 ">
      <div className="absolute top-12 right-5">
        {/* 자식 요소에 absolute 클래스 추가하여 절대 위치 지정 */}
        <IoIosRefresh className="text-4xl" onClick={handleRefresh} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <img src={imagePath} alt="weather svg " className="mb-3" />
          {userWeather && (
            <>
              <div className="text-4xl font-bold">
                {(userWeather.main.temp - 273.15).toFixed(1)}°C
              </div>
              <p className="text-lg font-bold">
                {userWeather.weather[0].description}
              </p>
              <h2 className="text-2xl font-bold mb-4">{myPlace}</h2>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyLocationWeather;
