/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { memberState } from '@recoil/atom.mjs';
import { useRecoilState } from 'recoil';
import Button from '@components/layout/Button';
import LocationBookMark from '@pages/location/LocationBookmark';
import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import UserBoard from '@pages/user/UserBoard';

function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(memberState);
  const [click, setClick] = useState(false);
  const axios = useCustomAxios();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleLogin = () => {
    // handle login logic here
  };

  const Edit = () => {
    navigate('/user/edit');
  };

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

  const itemList = data?.item?.filter((item) => item.user._id === user._id)
    .map((item) => <UserBoard key={item._id} item={item} />);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-3xl drop-shadow-md p-8 max-w-md w-full">
        {user && user.name ? (
          <div>
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={user.profile ? user.profile : '/nulluser.svg'}
                alt="Profile"
              />
              <p className="text-lg font-semibold">{user.name}님 오늘 날씨 어때요?</p>
            </div>
            <div className="mb-4">
              <ul>
                <li className="mb-2 bg-slate-200">
                  <Link to="/mbti" className="text-blue-500 hover:underline">MBTI 테스트 하러가기</Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-blue-500 hover:underline">저장한 장소</Link>
                </li>
                <li>
                  <div>
                    <button type="button" onClick={() => setClick(true)} className="text-blue-500 hover:underline">나의 활동</button>
                    <div className="flex flex-col gap-2">
                      {click && itemList}
                    </div>
                  </div>
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
