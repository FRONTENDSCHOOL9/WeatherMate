/* eslint-disable */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { memberState } from "@recoil/atom.mjs";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from '@components/layout/Button';

function userpage(){
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };


  const Rest_api_key='2fd33ea8cc22119f8666788667295bed' //REST API KEY
    const redirect_uri = 'http://localhost:5173/oauth' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    
    const handleLogin = ()=>{
        window.location.href = kakaoURL}



  const Edit = () => {
    console.log({user})
  };

  const [user, setUser] = useRecoilState(memberState);

  return (

<nav className="flex items-center justify-center h-screen">
  <div>
    <h2>Weather Mate</h2>
    <p>오늘의 날씨와 우리의 이야기를 나눠봐요</p>
    <div className="grid grid-cols-1 gap-4 place-content-center">
      <button className='bg-primary py-1  text-base' onClick={ () => navigate('/user/Login') }>로그인</button>
      <button className="bg-white border-2 border-primary hover:primary py-1 text-base" onClick={ () => navigate('/user/SignUp') }>회원가입</button>
      <button className="bg-kakao py-1 text-base" onClick={handleLogin}>카카오로 시작하기</button>
      <button className='bg-white border-2' onClick={ () => navigate('/') }>둘러보기</button>
    </div>
  </div>
</nav>



  );
}

export default userpage;
