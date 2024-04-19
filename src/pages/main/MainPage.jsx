// import AllCitiesWeather from './ChoiceWeather';
import CommunityPopularItem from '@pages/community/CommunityPopularItem';
import ToTheTopButton from '../../components/layout/ToTheTopButton';
// import AllCitiesWeather from './AllCitiesWeather';
import MyLocationWeather from './MyLocationWeather';

import PreviewMbti from './PreviewMbti';

import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherDetail from './weatherDetail';
// import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div className="min-h-[1700px] font-sans overflow-hidden">
      <div className="w-full">
        <div>
          <div className="w-full min-h-[800px]">
            <TodaysComent />
            {/* 오늘의 한마디 */}
            <MyLocationWeather />
            <ToTheTopButton />
            <WeatherDetail />
          </div>
          <RecommendationPreview />
          {/* 장소추천 프리뷰  */}
          <PreviewMbti />
          {/* mbti test 프리뷰 */}

          {/* <AllCitiesWeather /> */}

          <CommunityPopularItem />

        </div>
      </div>
    </div>
  );
}

export default MainWeather;
