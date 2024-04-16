import { useNavigate, useSearchParams } from 'react-router-dom';
import MbtiResultData from '@assets/mbti/MbtiResultData';
import { useEffect, useState } from 'react';
import KakaoShareButton from '@components/KakaoShareButton';
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
    <div className="m-8 flex gap-4 flex-col items-center">
      <h1 className="text-3xl font-bold">날씨별 성격 테스트</h1>
      <h2>결과 보기</h2>

      <img src={resultData.image} alt="result image" className="md:w-1/2" />
      <button
        onClick={() => navigate('/mbti')}
        className="rounded bg-primary px-4 py-2 font-bold hover:bg-sub_sal text-white "
      >
        테스트 다시하기
      </button>
      <KakaoShareButton data={resultData} />
    </div>
  );
}

export default Result;
