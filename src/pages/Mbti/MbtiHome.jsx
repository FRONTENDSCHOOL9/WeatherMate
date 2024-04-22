import { useNavigate } from 'react-router-dom';
import mbtibg from '/mbtibg.jpg';

function MbtiHome() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-center min-h-screen 
       p-20"
      style={{ backgroundImage: `url(${mbtibg})` }}
    >
      <div className=" flex gap-10 flex-col items-center font-TTLaundryGothicB text-white">
        <h1 className="text-4xl font-bold  text-white">날씨 성격 테스트</h1>
        <div className="text-2xl font-bold">
          <p>
            날씨별 상황에 따라
            <br />내 행동을 골라보자!
          </p>
          <br />
          <p>나는 어떤 모습일까? </p>
        </div>
        <button
          onClick={() => navigate('question')}
          className="bg-primary p-6 text-xl rounded-full text-white "
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}

export default MbtiHome;
