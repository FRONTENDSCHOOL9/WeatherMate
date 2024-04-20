/* eslint-disable */
import React from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Submit from '../../components/layout/Submit';

function SignUp() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      name: '전희선',
      email: 'gmltjs6346pk@naver.com',
      password: '123123123',
    },
  });

  const onSubmit = async formData => {
    try {
      formData.type = 'user';
      console.log(formData);

      //프로필 이미지 등록
      if (formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.profileImage[0]);

        const fileRes = await axios('https://market-lion.koyeb.app/api/users', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });

        formData.profileImage = fileRes.data.file.name;
      } else {
        delete formData.profileImage;
      }
      const res = await axios.post('/users', formData);
      alert(res.data.item.name + '님 회원가입이 완료 되었습니다.');
      navigate('/user/login');
    } catch (err) {
      console.log(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };

  return (
    <nav className="h-screen">
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력하세요"
          {...register('name', {
            required: '이름을 입력하세요',
            minLength: {
              value: 2,
              message: '이름을 두글자 이상 입력하세요',
            },
          })}
        />
        {errors.name && (
          <p className="ml-2 mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}

        <label>이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          {...register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식이 아닙니다',
            },
          })}
        />
        {errors.name && (
          <p className="ml-2 mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}

        <label>비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          {...register('password', { required: '비밀번호를 입력하세요' })}
        />
        {errors.name && (
          <p className="ml-2 mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}

        <label
          className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
          htmlFor="profileImage"
        >
          프로필 이미지
        </label>
        <label
          className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
          htmlFor="profileImage"
        >
          프로필 이미지
        </label>
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          placeholder="이미지를 선택하세요"
          {...register('profileImage')}
        />

        <Submit>회원가입</Submit>
      </form>
      <div>충돌발생</div>
    </nav>
  );
}

export default SignUp;
// 이게 수정
