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

  const handleSubmit = async (event) => {
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
        updatedData
      );
      if (response.status !== 200) {
        throw new Error('회원가입 정보를 수정하는 데 실패했습니다.');
      }

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData
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
    <nav className="h-screen flex items-center justify-center bg-slate-100 p-16 max-w-full min-w-80">

      <div className='bg-white text-center rounded-2xl p-8 w-full max-w-md gap-4'>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            이름:
          </label>
          <input
            id="name"
            type="text"
            placeholder="수정할 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            이메일:
          </label>
          <input
            id="email"
            type="email"
            placeholder="새로운 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="sr-only">
            비밀번호:
          </label>
          <input
            id="password"
            type="password"
            placeholder="새로운 비밀번호 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary_deep focus:outline-none "
        >
          수정
        </button>
      </form>
      </div>
    </nav>
  );
}

export default EditProfile;
