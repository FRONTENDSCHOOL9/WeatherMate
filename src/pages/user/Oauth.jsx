/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { redirect, useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const Oauth = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const location = useLocation();


  // 토큰 -> 사용자 정보 -> 백엔드

    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get('code');
    const redirect_uri = `${window.location.origin}/auth/kakao`

    const sendUserDataToBackend = async (userData) => {
      try {
        const res = await axios.post('/users/login/kakao', {
          code,
          redirect_uri
        });
        console.log('User data sent to backend:', res.data);

        if(res.data.item){
          setUser({
            _id: res.data.item._id,
            email: res.data.item.email,
            name: res.data.item.name,
            profile: res.data.item.profileImage,
            token: res.data.item.token,
          });
  
          alert(res.data.item.name + '님 반갑습니다');
          navigate(location.state?.from ? location.state?.from : '/main');
          console.log(res.data.item);
        }


      }catch(error){
        console.error(error);
      }finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      sendUserDataToBackend();
    })

  return (
    <div className='min-h-screen '>
      {loading ? (

    <div className="flex flex-col items-center justify-center">
      <img className='w-60 md:w-48 mx-auto mb-4 md:mb-6 lg:w-96' src="/error.svg" alt="Loading" />
      <h1 className="text-lg md:text-xl font-semibold pt-3 pb-4 font-TTLaundryGothicB m-0">Loading</h1>
    </div>
      ) : (
        <div>Successfully received user data.</div>
      )}
    </div>
  );
};

export default Oauth;
