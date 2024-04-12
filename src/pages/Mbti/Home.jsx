import MbtiImage from '@assets/mbti_example.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="m-8 flex gap-4 flex-col items-center">
      <h1 className="text-3xl font-bold">날씨별 성격 테스트</h1>
      <h2>나와 어울리는 날씨는?</h2>
      <img
        src={MbtiImage}
        alt="weather main page image"
        width={350}
        height={350}
      />
      <button
        onClick={() => navigate('question')}
        className="rounded bg-primary px-4 py-2 font-bold text-white "
      >
        테스트 시작하기
      </button>
    </div>
  );
}

export default Home;
