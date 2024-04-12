import { GoHomeFill } from 'react-icons/go';
import { SiGooglechat } from 'react-icons/si';
import { MdLocationOn } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="w-full flex text-white min-h-28 rounded-t-3xl items-center justify-center gap-8 bg-white fixed bottom-0 shadow-inner lg:bottom-auto lg:top-0 lg:mt-10 lg:px-8 lg:py-4">
        <Link to="/" className="flex flex-col items-center text-primary px-2">
          <GoHomeFill className="text-4xl mb-3" />
          <p className="text-nowrap">홈</p>
        </Link>

        <Link
          to="/community"
          className="flex flex-col items-center px-2 text-primary"
        >
          <SiGooglechat className="text-4xl mb-3" />
          <p className="text-nowrap">커뮤니티</p>
        </Link>

        <Link
          to="/location"
          className="flex flex-col items-center px-2 text-primary"
        >
          <MdLocationOn className="text-4xl mb-3" />
          <p className="text-nowrap">장소추천</p>
        </Link>

        <Link
          to="/user/login"
          className="flex flex-col items-center px-2 text-primary"
        >
          <FaAddressBook className="text-4xl mb-3" />
          <p className="text-nowrap">마이페이지</p>
        </Link>
      </footer>
    </>
  );
}

export default Footer;
