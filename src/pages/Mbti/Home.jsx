import { useNavigate } from 'react-router-dom';
import mbtibg from '/mbtibg.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-center h-screen "
      style={{ backgroundImage: `url(${mbtibg})` }}
    >
      <div className=" my-20 mx-10 flex gap-8 flex-col items-center  text-white">
        <h1 className="text-3xl font-bold  text-white">날씨 성격 테스트</h1>
        <p className="text-xl font-bold">
          날씨별 상황에 따라 내 행동을 골라보자!
        </p>
        <p className="text-xl font-bold">나는 어떤 모습일까? </p>

        <button
          onClick={() => navigate('question')}
          className="rounded bg-primary px-4 py-4 font-bold text-white "
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}

export default Home;
