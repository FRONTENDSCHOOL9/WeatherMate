import MbtiImage from '@assets/mbti_example.jpg';
import { useNavigate } from 'react-router-dom';
import MbtiResultData from '@assets/MbtiResultData';

function Result() {
  const navigate = useNavigate();

  return (
    <div className="m-8 flex gap-4 flex-col items-center">
      <h1 className="text-3xl font-bold">날씨별 성격 테스트</h1>
      <h2>결과 보기</h2>
      {/* TODO:img, 내용 결과에 따라 다르게 표현되게 바꿔야 됨 */}

      <img
        src={MbtiImage}
        alt="weather main page image"
        width={350}
        height={350}
      />

      <div>당신은 {MbtiResultData[0].name}입니다.</div>
      <button
        onClick={() => navigate('/mbti')}
        className="rounded bg-primary px-4 py-2 font-bold text-white "
      >
        테스트 다시하기
      </button>
      {/* TODO:카카오톡 공유하기 기능만들기 */}
      <button
        onClick={() => navigate('/mbti')}
        className="rounded bg-primary px-4 py-2 font-bold text-white "
      >
        카카오톡 공유하기
      </button>
    </div>
  );
}

export default Result;
