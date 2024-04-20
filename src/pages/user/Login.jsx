/* eslint-disable */
import React from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { memberState } from '@recoil/atom.mjs';
import { useSetRecoilState } from 'recoil';
import Submit from '@components/layout/Submit.jsx';

function Login() {
  const location = useLocation();

  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      email: 'gmltjs6346pk@naver.com',
      password: '123123123',
    },
  });

  const onSubmit = async formData => {
    try {
      const res = await axios.post(
        'https://market-lion.koyeb.app/api/users/login',
        formData,
      );

      setUser({
        _id: res.data.item._id,
        email: res.data.item.email,
        name: res.data.item.name,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
      });

      alert(res.data.item.name + '님 반갑습니다');
      navigate(location.state?.from ? location.state?.from : '/home');
      console.log(res.data.item);
    } catch (err) {
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
    <>
      <nav className="h-screen">
        <h2>로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Submit>로그인</Submit>
          <Link
            className="ml-8 text-blue-500 hover:underline"
            to="/user/signup"
          >
            회원가입
          </Link>
        </form>
      </nav>
    </>
  );
}

export default Login;
