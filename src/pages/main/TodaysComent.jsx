import { useRecoilValue } from 'recoil';
import { userWeatherState } from '../../recoil/atom.mjs';
import dummyData from '../../assets/WeatherData';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/** 날씨에 따른 의상 추천 & 이미지 보여주기 */
function TodaysComent() {
  const userWeather = useRecoilValue(userWeatherState); // Recoil 상태만 가져오기
  const [recomendClothes, setRecomendClothes] = useState(null);
  const [recommendationImage, setRecommendationImage] = useState(null);

  useEffect(() => {
    const getRecommendedClothes = () => {
      const userTemperature = userWeather?.main.temp - 273.15;
      let selectedDummyData;
      // 더미 데이터를 기반으로 온도에 따른 추천 선택
      for (let i = 0; i < dummyData.length; i++) {
        if (userTemperature <= dummyData[i].temperature) {
          selectedDummyData = dummyData[i];
          break;
        }
      }
      setRecomendClothes(selectedDummyData?.recommendation);
      setRecommendationImage(selectedDummyData?.IMG_URL); // 추천 이미지 설정
    };
    getRecommendedClothes();
  }, [userWeather]); // userWeather가 변경될 때마다 실행

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

    tl.from('.comment-text2', { opacity: 0, x: 100, duration: 1 });
    tl.from('.comment-text', { opacity: 0, x: -100, duration: 1 });

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const imagePath = recommendationImage;
  const fileName = imagePath?.split('/').pop(); // 경로에서 파일 이름 추출

  return (
    <div className=" w-full text-2xl font-bold h-[300px]">
      <div className="p-5">
        <div className="ml-8 mt-[72px] mr-[103px]">
          <h1 className="comment-text text-slate-300">짱구님</h1>
          <p className="comment-text">오늘은 {recomendClothes}</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="">
          {/* {메인 이미지 추가 } */}
          <img src="/06.svg" className="w-[250px] ml-32 comment-text2" />
        </div>
      </div>
      <img src={fileName} className="" style={{ display: 'none' }} />
    </div>
  );
}

export default TodaysComent;
