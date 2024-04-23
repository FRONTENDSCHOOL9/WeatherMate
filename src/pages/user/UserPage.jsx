/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { memberState } from '@recoil/atom.mjs';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Button from '@components/layout/Button';
import LocationBookMark from '@pages/location/LocationBookmark';

function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(memberState);
  

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const Rest_api_key = '2fd33ea8cc22119f8666788667295bed'; //REST API KEY
  const redirect_uri = `${window.location.origin}/oauth`; //Redirect URI
  const REST_API_KEY=import.meta.env.VITE_KAKAO_REST_API_KEY;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  //인가 코드를 받고


  //우리 api 서버에 보내주기
  //api 서버가 카카오에 연결이 돼서 정보를 받아온다

  
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;


  const Edit = () => {
    navigate('/user/edit');
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-3xl drop-shadow-md p-8 max-w-md w-full">
        {user && user.name ? (
          <div>
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={
                  user.profile
                    ? `https://market-lion.koyeb.app/api/files/07-WeatherMate/${user.profile}`
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt="Profile"
              />
              <p className="text-lg font-semibold">{user.name}님 오늘 날씨 어때요?</p>
            </div>
            <div className="mb-4">
              <ul>
                <li className="mb-2">
                  <Link to="/mbti" className="text-blue-500 hover:underline">MBTI 테스트 하러가기</Link>
                </li>
                
                <li className="mb-2">
                  <Link to="/" className="text-blue-500 hover:underline">저장한 장소</Link>
                </li>
                <li>
                  <Link to="/" className="text-blue-500 hover:underline">나의 활동</Link>
                </li>
              </ul>
            </div>
            <div className="flex justify-between">
              <Button onClick={() => navigate('/user/Setting')} className="bg-primary">설정</Button>
              <Button onClick={Edit} className="bg-gray-300">수정</Button>
              <Button onClick={handleLogout} className="bg-red-500">로그아웃</Button>
            </div>
            <LocationBookMark />
          </div>

        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-black text-primary_deep mb-4 pt-6 font-Ainmom">로그인 후 이용할 수 있어요</h2>
            <p className="mb-4 text-gray-600">원활한 서비스 사용을 위해 로그인을 해주세요!</p>
          <img className='w-[50%] m-auto comment-float pt-2 pb-10' src='/mainlogin.svg' />

            <div className="mb-4 w-full flex flex-col gap-4 comment-text">
              <button
                className="bg-primary text-white py-2 px-4 rounded-lg mr-2 hover:bg-primary_deep"
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

            </div>
            <Link to="/" className="text-gray-500 hover:underline text-sm">웨더메이트 둘러보기</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
