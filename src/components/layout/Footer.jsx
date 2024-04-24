import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io';
import { BiLogoInstagram } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="p-4 pt-12 flex justify-between items-end border-t-2 border-gray_01 lg:px-56 xl:px-60 text-gray_03">
        <div>
          <div className="flex gap-2 pb-4">
            <Link to="https://github.com/FRONTENDSCHOOL9/WeatherMate">
              프로젝트 소개
            </Link>{' '}
            |
            <Link to="/" className="font-bold text-gray_04">
              개인정보처리방침
            </Link>
            |
            <Link to="/" className="">
              이용약관
            </Link>
          </div>
          <div className="flex gap-1">
            <p>(주)웨더메이트</p>|{' '}
            <Link
              to="https://github.com/FRONTENDSCHOOL9/WeatherMate"
              className="mr-2"
            >
              연락하기
            </Link>
          </div>
          <p>
            ©<span className="mr-2">2024</span>
            <Link
              to="https://github.com/FRONTENDSCHOOL9/WeatherMate"
              className="mr-2"
            >
              loot-at-this.
            </Link>{' '}
            All rights reserved.
          </p>
        </div>
        <div className="text-2xl flex md:gap-4 justify-end item-end">
          <IoLogoFacebook />
          <IoLogoGoogle />
          <BiLogoInstagram />
        </div>
      </div>
    </>
  );
}

export default Footer;
