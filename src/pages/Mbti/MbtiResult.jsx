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
      <DetailPageHeader title={'결과 보기'} />

      <div className="p-10">
        <div className="relative top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-[15px] w-[180px] h-[180px]  rounded-full bg-white">
          <img
            src={resultData.image}
            className=" w-[150px] h-[150px] rounded-full"
          />
        </div>

        <div className="relative z-0 top-[-90px] border-4 rounded-3xl pt-20 pb-5 px-5  font-TTLaundryGothicB">
          <p className="">{resultData.title}</p>
          <p>{resultData.desc}</p>
        </div>
      </div>

      <div className="m-6 flex gap-6 flex-col items-center font-TTLaundryGothicB">
        <button
          onClick={() => navigate('/mbti')}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-7 border border-gray-400 rounded-full shadow"
        >
          테스트 다시하기
        </button>
        <KakaoShareButton data={resultData} />
        <button
          onClick={() => navigate('/')}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-7 border border-gray-400 rounded-full shadow w-full"
        >
          WeatherMate 둘러보기
        </button>
      </div>
    </>
  );
}

export default MbtiResult;
