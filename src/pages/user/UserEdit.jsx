import { useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';

function EditProfile() {
  const [user, setUser] = useRecoilState(memberState);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const customAxios = useCustomAxios(); // 커스텀 엑시오스 훅을 사용하여 인스턴스 생성

  console.log('userDAs', user);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const updatedData = {};
      let updated = false;

      if (name !== user.name) {
        updatedData.name = name;
        updated = true;
      }
      if (email !== user.email) {
        updatedData.email = email;
        updated = true;
      }
      if (password !== '') {
        updatedData.password = password;
        updated = true;
      }

      if (!updated) {
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

      setUser(prevUser => ({
        ...prevUser,
        ...updatedData,
      }));

      // 변경된 부분만 초기화
      if (updatedData.name) {
        setName(updatedData.name);
      }
      if (updatedData.email) {
        setEmail(updatedData.email);
      }
      setPassword('');

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
