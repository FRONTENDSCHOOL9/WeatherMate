import { useNavigate, useSearchParams } from 'react-router-dom';
import MbtiResultData from '@assets/mbti/MbtiResultData';
import React from 'react';

function Result() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get('mbti');
  const [resultData, setResultData] = React.useState({});

  React.useEffect(() => {
    const result = MbtiResultData.find(s => s.type === mbti);
    setResultData(result);
  }, [mbti]);

  console.log(resultData);
  return (
    <div className="m-8 flex gap-4 flex-col items-center">
      <h1 className="text-3xl font-bold">날씨별 성격 테스트</h1>
      <h2>결과 보기</h2>
      {/* TODO:img, 내용 결과에 따라 다르게 표현되게 바꿔야 됨 */}

      <img src={resultData.image} alt="result image" className="md:w-1/2" />
      <button
        onClick={() => navigate('/mbti')}
        className="rounded bg-primary px-4 py-2 font-bold hover:bg-sub_sal text-white "
      >
        테스트 다시하기
      </button>
      {/* TODO:카카오톡 공유하기 기능만들기 */}
    </div>
  );
}

export default Result;
