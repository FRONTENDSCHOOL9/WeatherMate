import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';

/*eslint-disable */
function WeatherDetail() {
  const detailWeather = useRecoilValue(userWeatherState);

  console.log();
  return (
    <>
      <div className="flex justify-center items-center">
        {detailWeather && (
          <div className="flex justify-center items-center gap-3">
            <p className=" w-20 h-20 bg-slate-400">
              습도:{detailWeather.main.humidity}
            </p>
            <p className=" w-20 h-20 bg-slate-400">
              체감온도 : {(detailWeather.main.feels_like - 269.15).toFixed(1)}°C
            </p>
            <p className=" w-20 h-20 bg-slate-400">
              풍속: {detailWeather.wind.speed}
            </p>
            <p className=" w-20 h-20 bg-slate-400">
              {detailWeather.main.humidity}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default WeatherDetail;
