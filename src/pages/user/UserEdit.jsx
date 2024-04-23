import { useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useRecoilState(memberState);
  const customAxios = useCustomAxios(); // 커스텀 엑시오스 훅을 사용하여 인스턴스 생성

  console.log(user);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const updatedData = {};

      if (name !== user.name) {
        updatedData.name = name;
      }
      if (email !== user.email) {
        updatedData.email = email;
      }
      if (password !== user.password) {
        updatedData.password = password;
      }

      if (Object.keys(updatedData).length === 0) {
        alert('변경된 정보가 없습니다.');
        return;
      }

      const response = await customAxios.patch(
        `/users/${user._id}`, // user 상태의 _id 사용
        updatedData,
      );
      if (response.status !== 200) {
        throw new Error('회원가입 정보를 수정하는 데 실패했습니다.');
      }

      // Recoil 상태 업데이트
      setUser(prevUser => ({
        ...prevUser,
        ...updatedData, // 변경된 데이터 업데이트
      }));

      // 입력 필드 초기화
      setName('');
      setEmail('');
      setPassword('');

      console.log('final');

      alert('회원가입 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error(error);
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
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">수정</button>
      </form>
    </nav>
  );
}

export default EditProfile;
