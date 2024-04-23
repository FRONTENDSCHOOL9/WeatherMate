/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Oauth = () => {
  const [loading, setLoading] = useState(true);


  // 토큰 -> 사용자 정보 -> 백엔드
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const getUserInfo = async (accessToken) => {
      try {
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        const userData = userInfoResponse.data;
        console.log('User data:', userData);

        // 사용자 정보 전송
        sendUserDataToBackend(userData);
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    };

    const sendUserDataToBackend = async (userData) => {
      try {
        const response = await axios.post('/users/login/kakao', { userData });
        console.log('User data sent to backend:', response.data);
      } catch (error) {
        console.error('Error sending user data to backend:', error);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      axios.post('https://kauth.kakao.com/oauth/token', null, {
        params: {
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: redirect_uri,
          code: code,
        },
      })
        .then(response => {
          const accessToken = response.data.access_token;
          getUserInfo(accessToken);
        })
        .catch(error => {
          console.error('Error getting access token:', error);
        });
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>Successfully received user data.</div>
      )}
    </div>
  );
};

export default Oauth;
