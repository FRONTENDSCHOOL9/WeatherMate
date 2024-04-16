import { useNavigate } from 'react-router-dom';

function PreviewMbti() {
  const navigate = useNavigate();

  const moveToMbitTest = () => {
    navigate('/mbti');
  };

  return (
    <div className="w-full bg-white flex justify-center items-center flex-col p-3 gap-3 mt-20">
      <h1 className="font-bold">나는 어떤 동물일까?</h1>
      <p>내가 좋아하는 날씨를 선택하 어쩌구</p>
      <p>저쩌구 저쩌구 알아보세요</p>
      <button
        className="rounded px-4 py-2 bg-primary text-white font-bold"
        onClick={moveToMbitTest}
      >
        더보기
      </button>
    </div>
  );
}

export default PreviewMbti;
