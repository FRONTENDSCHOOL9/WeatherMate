// import AllCitiesWeather from './ChoiceWeather';
import MyLocationWeather from './MyLocationWeather';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div>
      <TodaysComent />
      {/* <AllCitiesWeather /> */}
      <MyLocationWeather />
      <WeatherByTimeZone />
    </div>
  );
}

export default MainWeather;
