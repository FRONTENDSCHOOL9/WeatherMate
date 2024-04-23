import { useNavigate } from 'react-router-dom';

function PreviewMbti() {
  const navigate = useNavigate();

  const moveToMbitTest = () => {
    navigate('/mbti');
  };

  return (
    <div className="w-full bg-white flex justify-center items-center flex-col p-3 gap-3 mt-20">
      <h1 className="font-bold text-xl">날씨 성격 테스트</h1>
      <p>나의 성격은 어느 날씨와 어울릴까요?</p>
      <p>지금 바로 테스트를 통해 알아보세요</p>
      <button
        className="rounded px-4 py-2 bg-primary text-white font-bold"
        onClick={moveToMbitTest}
      >
        테스트 시작하기
      </button>
    </div>
  );
}

export default PreviewMbti;
