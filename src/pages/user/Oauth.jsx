/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { send } from 'vite';


const Oauth = () => {



  // 토큰 -> 사용자 정보 -> 백엔드



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
