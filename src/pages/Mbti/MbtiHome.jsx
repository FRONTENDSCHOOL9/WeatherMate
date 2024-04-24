import { useNavigate } from 'react-router-dom';
import mbtiStart from '@assets/mbti/mbtiimg/mbtiStart.png';

function MbtiHome() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-center 
       h-screen   py-60 xl:px-60"
      style={{ backgroundImage: `url(${mbtiStart})` }}
    >
      <div className="flex gap-10 flex-col text-center items-center font-TTLaundryGothicB text-gray_04 ">
        <h1 className="text-4xl font-bold  text-gray-4">날씨 성격 테스트</h1>
        <div className="text-2xl font-bold ">
          <p>
            날씨별 상황에 따라
            <br />내 행동을 골라보자!
          </p>
          <br />
          <p>나는 어떤 날씨와 어울릴까? </p>
        </div>
        <button
          onClick={() => navigate('question')}
          className="bg-white hover:bg-primary p-6 text-xl rounded-lg text-gray_04 "
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}

export default MbtiHome;
