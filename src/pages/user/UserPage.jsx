/* eslint-disable */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

function ProfilePage() {
  // Recoil을 사용하여 사용자 정보를 가져옴
  const userData = useRecoilValue(memberState);

  return (
    <div>
      <p>이름: {userData.name}</p>
      <p>이메일: {userData.email}</p>
      <img src={userData.profile} alt="프로필 이미지" style={{ width: '100px', height: '100px' }} />
    </div>
  );
}

export default ProfilePage; 