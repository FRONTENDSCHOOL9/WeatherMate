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
      navigate(location.state?.from ? location.state?.from : '/main');
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
      <nav className="h-screen flex items-center justify-center bg-gray-100 p-16 max-w-full min-w-80">
        <div className="bg-white text-center rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold text-primary font-TTLaundryGothicB">
            Weather Mate
          </h2>
          <p className="text-sm text-gray-700 font-medium pt-2 pb-2">
            회원 서비스 이용을 위해 로그인 해주세요
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  이메일
                </label>
                <input
                  className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
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
                {errors.email && (
                  <p className="ml-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  비밀번호
                </label>
                <input
                  className="py-2 px-4 rounded-lg bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register('password', {
                    required: '비밀번호를 입력하세요',
                  })}
                />
                {errors.password && (
                  <p className="ml-2 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Submit className="w-full bg-primary rounded-md p-2 hover:bg-primary_deep text-white font-bold">
                로그인
              </Submit>
              <Link
                className="mt-2 text-primary_deep hover:underline inline-block text-center"
                to="/user/signup"
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </nav>
      <div>충돌발생</div>
    </>
  );
}

export default Login;
