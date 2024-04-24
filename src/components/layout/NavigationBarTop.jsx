import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

function NavigationBarTop() {
  const location = useLocation();
  const [user] = useRecoilState(memberState);
  return (
    <>
      <div className="w-full text-white min-h-24 rounded-t-3xl items-center justify-center gap-8 bg-white sticky bottom-0 shadow-inner hidden md:flex">
        <Link
          to="/main"
          className={`flex flex-col items-center text-black px-2 hover:text-primary ${
            location.pathname === '/' ? 'text-primary ' : ''
          }`}
        >
          <p className="text-nowrap">홈</p>
        </Link>

        <Link
          to="/community"
          className={`flex flex-col items-center px-2 text-black hover:text-primary ${
            location.pathname === '/community' ? 'text-primary ' : ''
          }`}
        >
          <p className="text-nowrap">커뮤니티</p>
        </Link>

        <Link
          to="/location"
          className={`flex flex-col items-center px-2 text-black hover:text-primary ${
            location.pathname === '/location' ? 'text-primary ' : ''
          }`}
        >
          <p className="text-nowrap">장소추천</p>
        </Link>

        { user ? (
          <Link
          to="/user/mypage"
          className={`flex flex-col items-center text-black px-2 hover:text-primary ${
            location.pathname === '/' ? 'text-primary ' : ''
          }`}
        >
          <p>마이페이지</p>
        </Link>
        ) : (
          <Link
          to="/"
          className={`flex flex-col items-center text-black px-2 hover:text-primary ${
            location.pathname === '/' ? 'text-primary ' : ''
          }`}
        >
          <p className='text-nowrap'>로그인</p>
          </Link>
        )
      }

        <Link
          to="/user/mypage"
          className={`flex flex-col items-center px-2 text-black hover:text-primary ${
            location.pathname === '/user/mypage' ? 'text-primary ' : ''
          }`}
        >
          <p className="text-nowrap">마이페이지</p>
        </Link>
      </div>
    </>
  );
}

export default NavigationBarTop;
