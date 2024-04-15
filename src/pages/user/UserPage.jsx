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

  const [user, setUser] = useRecoilState(memberState);

  return (

      <nav>
        <div>
          <a href="/">
            {/* 로고 이미지 넣을 자리 */}
            <span>로고(홈으로)</span>
          </a>
        </div>

        <div>
          { user ? (
            <div>
              <p>
                <img src={`https://market-lion.koyeb.app/api/files/${ user.profile }`}></img>
                { user.name }님 오늘 날씨 어때요?
                <Button onClick={ handleLogout }>로그아웃</Button>
              </p>

              <ul>
                <li><Link to="/mbti">MBTI 테스트 하러가기</Link></li>
                <li><Link to="/">저장한 장소</Link></li>{/* 내가 좋아요 누른 게시물 */}
                <li><Link to="/">나의 활동</Link></li>{/* 내가 좋아요 누른 장소 */}
              </ul>
            </div>
            
          ) : (
            <div>
              <Button onClick={ () => navigate('/user/Login') }>로그인</Button>
              <Button onClick={ () => navigate('/user/SignUp') }>회원가입</Button>
            </div>
          ) }
        </div>
      </nav>

  );
}

export default userpage;
