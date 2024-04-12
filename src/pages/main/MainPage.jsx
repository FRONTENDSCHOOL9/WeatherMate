// import AllCitiesWeather from './ChoiceWeather';
import MyLocationWeather from './MyLocationWeather';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div className="bg-primary w-full h-screen">
      {/* AllCitiesWeather :  지역선택 */}
      {/* <AllCitiesWeather /> */}
      <TodaysComent />
      {/* 오늘의 한마디 */}
      <MyLocationWeather />
      {/* 현재 내위치 날씨 */}
      <WeatherByTimeZone />

      {/* 시간대 별 날씨 */}
    </div>
  );
}

export default MainWeather;
