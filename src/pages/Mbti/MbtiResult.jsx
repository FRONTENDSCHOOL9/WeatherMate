import { useNavigate, useSearchParams } from 'react-router-dom';
import MbtiResultData from '@assets/mbti/MbtiResultData';
import { useEffect, useState } from 'react';
import KakaoShareButton from '@components/KakaoShareButton';
import DetailPageHeader from '@components/layout/DetailPageHeader';
// const { Kakao } = window;

function MbtiResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get('mbti');
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    const result = MbtiResultData.find(s => s.type === mbti);
    console.log(result);
    setResultData(result);
  }, [mbti]);

  // useEffect(() => {
  //   if (!Kakao.isInitialized()) {
  //     Kakao.init('44ca17bb4cb74c64db42d774cc78f8af');
  //   }
  // }, []);

  return (
    <>
      <DetailPageHeader title={'날씨 성격 테스트 결과'} />

      <div className="py-4 px-8 xl:py-16 xl:px-60 min-w-[360px] min-h-[400px] font-TTLaundryGothicB">
        <div className="relative top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-[15px] w-[180px] h-[180px]  xl:p-[25px] xl:w-[250px] xl:h-[250px] rounded-full bg-white">
          <img
            src={resultData.image}
            className=" w-[150px] h-[150px]  xl:w-[200px] xl:h-[200px]  rounded-full"
          />
        </div>

        <div className="relative z-0 top-[-90px] xl:top-[-150px] border-4 rounded-lg pt-20 p-8 xl:pt-36 xl:p-12 mb-6">
          <p className="text-xl xl:text-3xl">{resultData.title}</p>
          <br />
          <p className="text-lg xl:text-2xl">{resultData.desc}</p>
        </div>

        <div className="relative z-0 top-[-90px] flex xl:flex-row gap-6 xl:gap-12 flex-col items-center ">
          <div className="flex gap-12 xl:grow">
            <button
              onClick={() => navigate('/mbti')}
              className="bg-white hover:bg-primary text-gray-800 font-semibold py-3 px-7 border border-gray-400 rounded-lg shadow  xl:text-xl xl:grow"
            >
              테스트 다시하기
            </button>
            <KakaoShareButton data={resultData} />
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-white hover:bg-primary text-gray-800 font-semibold py-3 px-7 border border-gray-400 rounded-lg shadow w-full xl:w-fit xl:text-xl xl:grow"
          >
            WeatherMate 둘러보기
          </button>
        </div>
      </div>
    </>
  );
}

export default MbtiResult;
