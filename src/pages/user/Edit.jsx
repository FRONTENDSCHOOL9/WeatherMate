/* eslint-disable */
import React from 'react'
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { memberState} from '@recoil/atom.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Submit from '@components/layout/Submit';



function Edit() {

  const useState = useRecoilValue(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    handleChange,
    formState: { errors },
    setError,
  } = useForm(
{  
      values: {
      name:'',
      email: '',
      password: '',
    },}
  );


  const onSubmit = async formData => {
    try {
      formData.type = 'user';
      console.log(formData);

      //프로필 이미지 등록
      if (formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.profileImage[0]);

        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });

        formData.profileImage = fileRes.data.item.name;
      } else {
        delete formData.profileImage;
      }
      const res = await axios.post(
        '/users',
        formData,
      );
      alert(res.data.item.name + '님 회원가입이 완료 되었습니다.');
      navigate('/user/login');
    } catch (err) {
      console.log(err)
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        alert(err.response?.data.message);
      }
    }
  };


  console.log(useState._id);
  console.log(useState);


  return (
    <>
    <div>소짱</div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        이름:
        <input
          type="text"
          name="name"
          value={useState.name}
          onChange={handleChange}
        />
      </label>
      <label>
        이메일:
        <input
          type="email"
          name="email"
          value={useState.email}
          onChange={handleChange}
        />
      </label>
      <label>
        비밀번호:
        <input
          type="password"
          name="password"
          value={useState.password}
          onChange={handleChange}
        />
      </label>

    </form>
    
    <Submit>수정</Submit> </>
  )
}

export default Edit