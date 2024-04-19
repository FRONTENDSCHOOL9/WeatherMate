import { useNavigate, useSearchParams } from 'react-router-dom';
import MbtiResultData from '@assets/mbti/MbtiResultData';
import { useEffect, useState } from 'react';
import KakaoShareButton from '@components/KakaoShareButton';
import DetailPageHeader from '@components/layout/DetailPageHeader';
// const { Kakao } = window;

function Result() {
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
      <DetailPageHeader title={'날씨별 성격 테스트'} />
      <div className="m-8 flex gap-4 flex-col items-center">
        <h1 className="text-3xl font-bold">결과 보기</h1>
        <section
          style={{
            backgroundImage: `url(${resultData.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '80vw',
            height: '50vh',
          }}
        >
          <div className="font-bold ">
            {/* <p>{resultData.type}</p> */}
            <p>{resultData.title}</p>
            <p>{resultData.desc}</p>
          </div>
        </section>
        <button
          onClick={() => navigate('/mbti')}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          테스트 다시하기
        </button>
        <KakaoShareButton data={resultData} />
        <button
          onClick={() => navigate('/user/login')}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          WeatherMate 둘러보기
        </button>
      </div>
    </>
  );
}

export default Result;
