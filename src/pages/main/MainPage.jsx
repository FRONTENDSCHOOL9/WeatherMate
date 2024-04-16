// import AllCitiesWeather from './ChoiceWeather';
import ToTheTopButton from '../../components/layout/ToTheTopButton';
import MyLocationWeather from './MyLocationWeather';

import PreviewMbti from './PreviewMbti';

import RecommendationPreview from './RecommendationPreview';
import TodaysComent from './TodaysComent';
import WeatherByTimeZone from './WeatherByTimeZone';

function MainWeather() {
  return (
    <div className="min-h-[1500px]">
      <div className="w-full border-b border-primary rounded-bl-3xl  rounded-br-3xl">
        <div>
          <div className="w-full min-h-[800px] border-b border-primary rounded-bl-3xl  rounded-br-3xl">
            <TodaysComent />
            {/* 오늘의 한마디 */}
            <MyLocationWeather />
            {/* 현재 내위치 날씨 */}
            <WeatherByTimeZone />
            {/* 시간대 별 날씨 */}
            <ToTheTopButton />

            {/* 최상단으로 이동 버튼  */}
          </div>
          <RecommendationPreview />
          {/* 장소추천 프리뷰  */}
          <PreviewMbti />
          {/* mbti test 프리뷰 */}
        </div>
      </div>
    </div>
  );
}

export default MainWeather;
