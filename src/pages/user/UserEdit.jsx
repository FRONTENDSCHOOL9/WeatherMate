/* eslint-disable */
import React, { useState, useEffect } from 'react';

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [originalData, setOriginalData] = useState({});

  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // 세션에서 데이터 가져오기
    const sessionString = sessionStorage.getItem('saveUser');
    if (sessionString) {
      const sessionObj = JSON.parse(sessionString); // JSON 문자열 파싱
      setSessionData(sessionObj);
    }
  }, []); // 컴포넌트가 마운트될 때만 실행되도록 빈 배열을 두 번째 매개변수로 전달

  console.log(sessionData && sessionData._id);


  useEffect(() => {
    // 초기 데이터 가져오기
    const fetchData = async () => {
      try {
        if (sessionData && sessionData._id) { // sessionData가 null이 아니고 _id가 존재하는 경우에만 실행
          const response = await fetch(`/users/${sessionData._id}`);
          console.log(sessionData._id);
          if (!response.ok) {
            throw new Error('서버에서 데이터를 가져오는 데 실패했습니다.');
          }
          const data = await response.json();
          setName(data.name);
          setEmail(data.email);
          setOriginalData(data); // 초기 데이터 설정
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        // 사용자에게 오류 메시지를 표시하거나 기타 조치를 취할 수 있음
      }
    };
  
    fetchData();
  }, [sessionData]); // sessionData가 변경될 때마다 useEffect가 다시 실행됨
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedData = {}; // 변경된 데이터를 저장할 객체

      // 변경된 부분 확인하여 updatedData에 추가
      if (name !== originalData.name) {
        updatedData.name = name;
      }
      if (email !== originalData.email) {
        updatedData.email = email;
      }
      if (password !== originalData.password) { 
        updatedData.password = password;
      }

      const response = await fetch(`/users/${sessionData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // 변경된 데이터만 전송
      });

      if (!response.ok) {
        throw new Error('회원가입 정보를 수정하는 데 실패했습니다.');
      }

      alert('회원가입 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error(err);
      alert('회원가입 정보 수정에 실패했습니다.');
    }
  };

  return (
    <nav>
    <form onSubmit={handleSubmit}>
      <label>
        이름:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        이메일:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        비밀번호:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">수정</button>
    </form>
    </nav>
  );
}

export default EditProfile;
