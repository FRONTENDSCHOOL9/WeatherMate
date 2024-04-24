/* eslint-disable */
import React from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Submit from '@components/layout/Submit';

function SignUp() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: '전희선',
      email: 'gmltjs6346pk@naver.com',
      password: '123123123',
      phone: '01012345678',
    },
  });

  const onSubmit = async formData => {
    try {
      formData.type = 'user';

      if (formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.profileImage[0]);

        const fileRes = await axios.post('/files', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        formData.profileImage = fileRes.data.item[0].name;
      } else {
        delete formData.profileImage;
      }

      const res = await axios.post('/users', formData);
      alert(`${res.data.item.name}님 회원가입이 완료되었습니다.`);
      navigate('/user/login');
    } catch (err) {
      console.error(err);
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
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full  p-8 bg-white dark:bg-gray-800 rounded shadow-lg">
      <h2 className="font-TTLaundryGothicB text-xl text-primary text-center">Weather Mate</h2>
        <h2 className="text-center text-lg font-semibold pt-2 text-slate-500">반가워요!</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">

            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >

              이름
            </label>
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
              className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              휴대폰번호
            </label>
            <input
              type="text"
              id="phone"
              placeholder="휴대폰 번호를 입력하세요"
              {...register('phone', { 
                required: '휴대폰 번호를 입력하세요',
                minLength: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: '전화번호 양식을 맞춰 입력 해 주세요',
                },
              })}
              className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
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
              className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password', { required: '비밀번호를 입력하세요' })}
              className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              {...register('profileImage')}
              className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
          </div>

          <Submit className="bg-primary text-white py-2 px-4 mt-6 rounded-lg hover:bg-primary_deep w-[100%]">
            회원가입
            </Submit>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
