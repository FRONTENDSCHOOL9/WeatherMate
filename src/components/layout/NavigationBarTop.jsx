import { Link, useLocation } from 'react-router-dom';

function NavigationBarTop() {
  const location = useLocation();

  return (
    <>
      <div className="w-full text-white text-lg min-h-20 items-center justify-between bg-[#EEF8FF] sticky bottom-0 shadow-inner hidden md:flex lg:px-72">
        <Link to="/main">
          <img
            src="/weatherMateLogo.svg"
            alt="weathermate logo"
            className="w-12 "
          />
        </Link>
        <div className="flex  gap-20">
          <Link
            to="/main"
            className={` text-gray_04 font-bold hover:text-primary ${
              location.pathname === '/' ? 'text-primary ' : ''
            }`}
          >
            <p className="text-nowrap">홈</p>
          </Link>

          <Link
            to="/community"
            className={` text-gray_04 font-bold hover:text-primary ${
              location.pathname === '/community' ? 'text-primary ' : ''
            }`}
          >
            <p className="text-nowrap">커뮤니티</p>
          </Link>

          <Link
            to="/location"
            className={` text-gray_04 font-bold hover:text-primary ${
              location.pathname === '/location' ? 'text-primary ' : ''
            }`}
          >
            <p className="text-nowrap">장소추천</p>
          </Link>

          <Link
            to="/user/mypage"
            className={`text-gray_04 font-bold hover:text-primary ${
              location.pathname === '/user/mypage' ? 'text-primary ' : ''
            }`}
          >
            <p className="text-nowrap">마이페이지</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavigationBarTop;
