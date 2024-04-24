import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io';
import { BiLogoInstagram } from 'react-icons/bi';

function Footer() {
  return (
    <>
      <div className="p-4 pt-12 flex justify-between items-end bg-gray-100 xl:px-72">
        <div>
          <p>weathermate project</p>
          <p>©️loot-at-this. All rights reserved.</p>
        </div>
        <div className="flex xl:gap-4 justify-end item-end">
          <IoLogoFacebook className="text-gray_03 text-lg xl:text-2xl" />
          <IoLogoGoogle className="text-gray_03 text-lg  xl:text-2xl " />
          <BiLogoInstagram className="text-gray_03 text-lg   xl:text-2xl" />
        </div>
      </div>
    </>
  );
}

export default Footer;
