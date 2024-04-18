import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';

/*eslint-disable */
function WeatherDetail() {
  const detailWeather = useRecoilValue(userWeatherState);

  return (
    <>
      <div>
        <h2 className="pl-9">상세날씨 </h2>
        <div className="flex justify-center items-center bg-white shadow-md p-6">
          {detailWeather && (
            <div className="flex justify-center items-center gap-3">
              <p>습도: {detailWeather.main.humidity} %</p>
              <p>
                체감온도 : {(detailWeather.main.feels_like - 269.15).toFixed(1)}
                °C
              </p>
              <p>풍속: {detailWeather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherDetail;
