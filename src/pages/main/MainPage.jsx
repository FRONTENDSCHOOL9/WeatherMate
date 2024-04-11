import MyLocationWeather from './MyLocationWeather';
import SomeCitiesWeather from './SomeCitiesWeather';

function MainWeather() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MyLocationWeather />
      <SomeCitiesWeather />
    </div>
  );
}

export default MainWeather;
