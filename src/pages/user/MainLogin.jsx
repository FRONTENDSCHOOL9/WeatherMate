/* eslint-disable */
import React, { useEffect } from 'react';
import { memberState } from '@recoil/atom.mjs';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { gsap } from 'gsap';

function MainLogin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; //REST API KEY
  const redirect_uri = 'http://localhost:5173/auth/kakao'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const Edit = () => {
    console.log({ user });
  };

  const [user, setUser] = useRecoilState(memberState);
  useEffect(() => {
    const floatTl = gsap.to('.comment-float', {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    return () => {
      // Clean up animations
      tl.kill();
      floatTl.kill();
    };
  }, []);

  return (
    <nav className=" flex items-center justify-center h-screen">
      <div className="text-center w-[40%] flex flex-col gap-y-8">
        <div>
          <h2 className="font-TTLaundryGothicB text-xl text-primary">
            Weather Mate
          </h2>
          <p className="text-base text-gray-800">
            오늘의 날씨와 우리의 이야기를 나눠봐요
          </p>
          <img className="w-[50%] m-auto comment-float" src="/mainlogin.svg" />
        </div>
        <div className="w-full flex flex-col gap-4 comment-text">
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg  hover:bg-primary_deep"
            onClick={() => navigate('/user/Login')}
          >
            로그인
          </button>
          <button
            className="bg-white border-primary border-2 text-primary py-2 px-4 rounded-lg mr-2 hover:bg-gray-200"
            onClick={() => navigate('/user/SignUp')}
          >
            회원가입
          </button>
          <button
            className="bg-[#FEE500] text-[#55461a] py-2 px-4 rounded-lg mr-2 hover:bg-[#fed400]"
            onClick={handleLogin}
          >
            카카오로 시작하기
          </button>
          <button
            className="text-gray-700 text-sm hover:underline"
            onClick={() => navigate('/main')}
          >
            웨더메이트 둘러보기
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainLogin;
// 이게 수정
