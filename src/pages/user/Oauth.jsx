/* eslint-disable */

import React, { useEffect } from 'react';
import axios from 'axios';

const Rest_api_key = '2fd33ea8cc22119f8666788667295bed'; // REST API KEY
const redirect_uri = `${window.location.origin}/oauth`; // Redirect URI
const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

const Oauth = () => {
  // OAuth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

  useEffect(() => {
    const handleLogin = () => {
      window.location.href = kakaoURL;
    };

    handleLogin();
  }, []);

  // 토큰 ->백엔드
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const sendTokenToBackend = async () => {
        try {
          const response = await axios.post('/users/login/kakao', { code });
          console.log('Token sent to backend:', response.data);
        } catch (error) {
          console.error('Error sending token to backend:', error);
        }
      };

      sendTokenToBackend();
    }
  }, []);

  return <div>Loading...</div>;
};

export default Oauth;
