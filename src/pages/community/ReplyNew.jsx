import { useNavigate } from "react-router-dom";
import { memberState } from '@recoil/atom.mjs';
import { useRecoilValue } from "recoil";


function ReplyNew() {
  const navigate = useNavigate();
  const user = useRecoilValue(memberState)
  
  const handleReply = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else {
      navigate('/community/detail');
    }
  };
  return (
    <div>
      <form className="flex gap-1 border bg-gray-200 p-3 rounded-md">
        <textarea
          autoFocus
          rows="1"
          placeholder="댓글을 입력하세요."
          className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        ></textarea>
        <button
          onClick={handleReply}
          type="submit"
          className="text-nowrap bg-orange-300 border rounded-lg p-1 text-white"
        >
          입력
        </button>
      </form>
    </div>
  );
}

export default ReplyNew;
