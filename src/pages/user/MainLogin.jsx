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

      <nav>
        <div>
          {/* 로고 이미지 */}
        </div>

        <div>
          { user ? (
            <div>
              <p>
                <img className='size-20'
                src={user.profile ? `https://market-lion.koyeb.app/api/files/${user.profile}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                alt="Profile"
                />
                { user.name }님 오늘 날씨 어때요?
                <Button onClick={ handleLogout }>로그아웃</Button>
              </p>

              <ul>
                <li><Link to="/mbti">MBTI 테스트 하러가기</Link></li>
                <li><Link to="/">저장한 장소</Link></li>{/* 내가 좋아요 누른 게시물 */}
                <li><Link to="/">나의 활동</Link></li>{/* 내가 좋아요 누른 장소 */}
              </ul>


                <Button onClick={() => navigate('/user/Setting')}>설정</Button>
                <Button onClick={ Edit }>수정</Button>


            </div>

            
          ) : (
            <div>
              <h2>Weather Mate</h2>
              <p>오늘의 날씨와 우리의 이야기를 나눠봐요</p>
              <div className=''>
              <Button onClick={ () => navigate('/user/Login') }>로그인</Button>
              <Button onClick={ () => navigate('/user/SignUp') }>회원가입</Button>
              <button className="bg-kakao py-1 px-4 text-base" onClick={handleLogin}>카카오로 시작하기</button>
              <button onClick={ () => navigate('/') }>둘러보기</button>
              </div>
            </div>
            
          ) }
        </div>
      </nav>


  );
}

export default userpage;
