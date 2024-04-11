import { useState, useEffect } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">시간대별 기상예보</h2>
      <p className="mb-2">Location: {weatherData.city.name}</p>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {weatherData.list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="mb-2 flex">
              <h3 className="font-semibold">{item.dt_txt}</h3>
              <p>{item.weather[0].description}</p>
              <p>기온: {(item.main.temp - 273.15).toFixed(1)}°C</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WeatherByTimeZone;
