import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
// import { useEffect, useState } from 'react';

/*eslint-disable */
function WeatherDetail() {
  const detailWeather = useRecoilValue(userWeatherState);

  console.log('weatherDetail', detailWeather);

  return (
    <>
      <div>
        <div className="flex justify-center items-center  shadow-sm p-6">
          {detailWeather && (
            <div className="flex justify-center items-center gap-4 font-sans">
              {/* <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                  <img src="humidity.svg" className="w-[31px] " />
                  <p className="text-[#00179C] font-medium">최고온도</p>
                  <p>{(detailWeather.main.temp_max - 269.15).toFixed(1)}°C</p>
                </div>
                <div className="bg-white w-[77px] h-[88px] flex flex-col items-center  justify-center shadow-lg rounded-lg">
                  <img src="humidity.svg" className="w-[31px] " />
                  <p className="text-[#00179C] font-medium">최저온도</p>
                  <p>{(detailWeather.main.temp_min - 269.15).toFixed(1)}°C</p>
                </div> */}
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
                <p>{detailWeather.wind.speed}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherDetail;
