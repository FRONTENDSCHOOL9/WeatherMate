import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
// import { useEffect, useState } from 'react';

/*eslint-disable */
function WeatherDetail() {
  const detailWeather = useRecoilValue(userWeatherState);

  console.log('weatherDetail', detailWeather);

  function getWindStatus(speed) {
    if (speed > 1 && speed < 3) {
      return '보통';
    } else if (speed >= 4) {
      return '위험';
    } else {
      return '높음'; // 이 외의 경우에는 "기타"를 반환하거나 다른 처리를 수행할 수 있습니다.
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center p-6">
          {detailWeather && (
            <div className="flex justify-center items-center gap-4 font-sans">
              <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                <img src="humidity.svg" className="w-[31px] " />
                <p className="text-[#00179C] font-medium">습도</p>
                <p>{detailWeather.main.humidity} %</p>
              </div>
              <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                <img src="feelslike.svg" className="w-[31px] " />
                <p className="text-[#00179C] font-medium">체감온도</p>
                <p>{(detailWeather.main.feels_like - 269.15).toFixed(1)}°C</p>
              </div>
              <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                <img src="windspeed.svg" className="w-[31px] " />
                <p className="text-[#00179C] font-medium">풍속</p>
                <p>{detailWeather.wind.speed} m/s</p>
              </div>
              <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                <img src="uvi.svg" className="w-[31px] " />
                <p className="text-[#00179C] font-medium">자외선</p>
                <p>{getWindStatus(detailWeather.wind.speed)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherDetail;
