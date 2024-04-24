/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberState } from '@recoil/atom.mjs';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Button from '@components/layout/Button';
import LocationBookMark from '@pages/location/LocationBookmark';
//여기도
import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import CommunityItem from '@pages/community/CommunityItem';
import UserBoard from '@pages/user/UserBoard';
//여기까지 바뀜

function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(memberState);
  

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };


  // const redirect_uri = `${window.location.origin}/auth/kakao`; //Redirect URI
  // const REST_API_KEY=import.meta.env.VITE_KAKAO_REST_API_KEY;
  

  //인가 코드를 받고


  //우리 api 서버에 보내주기
  //api 서버가 카카오에 연결이 돼서 정보를 받아온다

  
  // oauth 요청 URL
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    // console.log(REST_API_KEY, kakaoURL)
    // window.location.href = kakaoURL;
  };


  const Edit = () => {
    navigate('/user/edit');
  };
  


  //여기부터
  const [click, setClick] = useState(false);
  const axios = useCustomAxios();
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          type: "community"
        },
      }),
      select: (response) => response.data,
      suspense: true,
      refetchOnMount: "always"
  });
  console.log(user);
  console.log(data);
  const itemList = data?.item?.filter((item) =>{
    if(user){
      if(item.user._id === user._id){
        return item
      }
    }
  })
  .map((item) => <UserBoard key={item._id} item={item} />);
  //여기까지 바뀜

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-3xl drop-shadow-md p-8 max-w-md w-full">
        {user && user.name ? (
          <div>
            <div className="flex items-center mb-6 justify-between">
              <div className='flex'>
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={
                    user.profile?.startsWith('http') ?
                    user.profile : `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${user.profile}`
                  }
                  alt="Profile"
                />
                <div>
                  <p className="text-lg font-semibold text-primary_deep">{user.name}님</p>
                  <p className='text-sm font-medium text-slate-600'>오늘 날씨 어때요?</p>
                </div>
              </div>
                <Button onClick={Edit} className="bg-slate-300 ml-6 px-2 py-1 rounded-md font-medium text-sm text-slate-600 hover:bg-primary hover:text-white">수정</Button>

            </div>
            <div className="mb-4">
              <ul>
                <li className="mb-2 bg-white border-2 rounded-md px-2 py-1 hover:bg-primary hover:border-slate-100 mb-6">
                  <Link to="/mbti" className="text-slate-600 font-semibold text-md hover:text-white">MBTI 테스트 하러가기</Link>

                </li>


                <div className='flex justify-between text-center pt-8'>
                    <div className='flex gap-8'>
                    <li className="mb-2">
                      <Link to="/" className="text-slate-500 hover:text-primary_deep hover:font-semibold">저장한 장소</Link>
                    </li>
                    <li>
                      <div>
                        <button type="button" onClick={() => setClick(true)} className="text-slate-500 hover:text-primary_deep hover:font-semibold">나의 활동</button>
                        <div className="flex flex-col gap-2">
                          {click && itemList}
                        </div>
                      </div>
                    </li>
                  </div>
                  <Button onClick={handleLogout} className="bg-slate-300 ml-6 px-2 py-1 rounded-md font-medium text-sm text-slate-600 hover:bg-primary hover:text-white">로그아웃</Button>
                </div>

              </ul>
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
                이메일 로그인
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
