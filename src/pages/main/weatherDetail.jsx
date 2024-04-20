import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
// import { useEffect, useState } from 'react';

/*eslint-disable */
function WeatherDetail() {
  const detailWeather = useRecoilValue(userWeatherState);

  return (
    <>
      <div>
        <h2 className="pl-9">상세날씨 </h2>
        <div className="flex justify-center items-center  shadow-sm p-6">
          {detailWeather && (
            <div className="flex justify-center items-center gap-4">
              <div className="bg-white w-20 h-20 flex items-center ">
                <p> 습도 {detailWeather.main.humidity} %</p>
              </div>
              <div className="bg-white w-20 h-20 flex items-center">
                <p>
                  {(detailWeather.main.feels_like - 269.15).toFixed(1)}
                  °C
                </p>
              </div>
              <div className="bg-white w-20 h-20 flex items-center">
                <p>풍속: {detailWeather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherDetail;
