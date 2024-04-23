// import AllCitiesWeather from './ChoiceWeather';
import CommunityPopularItem from '@pages/community/CommunityPopularItem';
import ToTheTopButton from '../../components/layout/ToTheTopButton';
// import AllCitiesWeather from './AllCitiesWeather';
import MyLocationWeather from './MyLocationWeather';

import PreviewMbti from './PreviewMbti';

import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';
import WeatherDetail from './weatherDetail';
// import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div className=" font-sans overflow-hidden sm:px-60">
      <div className="w-full">
        <div>
          <div className="w-full min-h-[800px]">
            <div className="flex flex-col sm:flex-row sm:flex-wrap">
              <div className="sm:w-[50%]">
                <TodaysComent />
                <MyLocationWeather />
              </div>
              <div className="sm:order-3 w-[100%]">
                <WeatherByTimeZone />
              </div>
              <div className="sm:w-[50%] sm:mt-40">
                <WeatherDetail />
                <RecommendationPreview />
                <PreviewMbti />
              </div>
            </div>
          </div>

        </div>
        <ToTheTopButton />
      </div>
    </div>
  );
}

export default MainWeather;
