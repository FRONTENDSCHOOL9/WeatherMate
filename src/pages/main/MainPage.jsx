// import AllCitiesWeather from './ChoiceWeather';
import ToTheTopButton from '../../components/layout/ToTheTopButton';
import MyLocationWeather from './MyLocationWeather';
import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div>
      <div className="bg-primary w-full min-h-[800px] border-b border-primary rounded-bl-3xl  rounded-br-3xl">
        <TodaysComent />
        {/* 오늘의 한마디 */}
        <MyLocationWeather />
        {/* 현재 내위치 날씨 */}
        <WeatherByTimeZone />
        {/* 시간대 별 날씨 */}
        <ToTheTopButton />
      </div>
      <RecommendationPreview />
    </div>
  );
}

export default MainWeather;
