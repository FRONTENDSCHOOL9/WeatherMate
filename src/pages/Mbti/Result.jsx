import MbtiImage from '@assets/mbti_example.jpg';
import { useNavigate } from 'react-router-dom';
import MbtiResultData from '@assets/MbtiResultData';

function Result() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-3xl font-bold underline">날씨별 성격 테스트</h1>
      <h2>결과 보기</h2>
      <img
        src={MbtiImage}
        alt="weather main page image"
        width={350}
        height={350}
      />

      <div>당신은 {MbtiResultData[0].name}입니다.</div>
      <button
        onClick={() => navigate('/mbti')}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        테스트 다시하기
      </button>
    </>
  );
}

export default Result;
