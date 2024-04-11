import { GoHomeFill } from 'react-icons/go';
import { SiGooglechat } from 'react-icons/si';
import { MdLocationOn } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="w-full flex text-white min-h-28 rounded-t-lg items-center justify-center gap-14 p-3 bg-slate-50">
        <Link to="/" className="flex flex-col items-center text-my-color">
          <GoHomeFill className="text-4xl" />
          <p className="text-base">홈</p>
        </Link>
        <Link className="flex flex-col items-center text-my-color">
          <SiGooglechat className="text-4xl" />
          <p className="text-base">커뮤니티</p>
        </Link>
        <Link
          to="/allcities"
          className="flex flex-col items-center text-my-color"
        >
          <MdLocationOn className="text-4xl" />
          <p className="text-base">장소추천</p>
        </Link>
        <Link className="flex flex-col items-center text-my-color">
          <FaAddressBook className="text-4xl" />
          <p className="text-base">마이페이지</p>
        </Link>
      </footer>
    </>
  );
}

export default Footer;
