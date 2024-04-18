// import { useState } from "react"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from './CommunityHeader';
import { MdOutlineCameraAlt } from 'react-icons/md';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Button from '@components/layout/Button';
import Submit from '@components/layout/Submit';
import { FaArrowLeft } from 'react-icons/fa';

function CommunityNew() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const onSubmit = async formData => {
    console.log(formData.image);
    formData.type = 'community';
    if (formData.image.length > 0) {
      console.log('formData : ', formData);
      const imageFormData = new FormData();
      imageFormData.append('attach', formData.image[0]);

      const files = await axios('/files', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: imageFormData,
      });
      console.log('files : ', files);
      formData.image = files.data.item[0].name;
      console.log(formData.image);
    } else {
      delete formData.image;
    }
    const res = await axios.post('/posts', formData);
    console.log(res);
    navigate(`/community/${res.data.item._id}`);
  };

  const iconColors = ['bg-gray-300', 'bg-blue-300'];
  const handleClick = e => {
    e.target.classList.remove(iconColors[0]);
    e.target.classList.add(iconColors[1]);
    console.log(e.target);
  };
  return (
    <div className="px-5 box-border min-h-screen">
      <Button
        onClick={() => navigate('/community')}
        className="absolute left-6 top-10"
      >
        <FaArrowLeft className="text-2xl" />
      </Button>
      <CommunityHeader title={'글 작성하기'} />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <label
            htmlFor="file"
            className="w-20 h-20 bg-blue-400 py-3 mb-4 rounded-lg flex flex-col justify-center items-center text-white"
          >
            <MdOutlineCameraAlt className="text-3xl" />
            사진 추가
          </label>

          <input
            type="file"
            name="contentImg"
            accept="image/*"
            id="file"
            {...register('image')}
          />
        </div>

        <div className="my-4 flex flex-col">
          <p className="text-lg font-bold">오늘의 날씨 선택</p>
          <div className="border mt-2 py-2 rounded-xl">
            <div className="flex justify-between px-5">
              <button type="button" onClick={handleClick}>
                <img
                  src="/Sun.svg"
                  value="sun"
                  className={`border rounded-full w-10 h-10 p-1 ${iconColors[0]}`}
                />
              </button>
              <button type="button" onClick={handleClick}>
                <img
                  src="/Cloudy.svg"
                  value="cloudy"
                  className={`border rounded-full w-10 h-10 ${iconColors[0]}`}
                />
              </button>
              <button type="button" onClick={handleClick}>
                <img
                  src="/Rainy.svg"
                  value="rainy"
                  className={`border rounded-full w-10 h-10 p-1 ${iconColors[0]}`}
                />
              </button>
              <button type="button" onClick={handleClick}>
                <img
                  src="/Foggy.svg"
                  value="foggy"
                  className={`border rounded-full w-10 h-10 ${iconColors[0]}`}
                />
              </button>
              <button type="button" onClick={handleClick}>
                <img
                  src="/Snow.svg"
                  value="snow"
                  className={`border rounded-full w-10 h-10 p-1 ${iconColors[0]}`}
                />
              </button>
              <button type="button" onClick={handleClick}>
                <img
                  src="/Wind.svg"
                  value="wind"
                  className={`border rounded-full w-10 h-10 ${iconColors[0]}`}
                />
              </button>
            </div>
          </div>
        </div>

        <textarea
          id="content"
          className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          autoFocus
          cols="50"
          rows="15"
          placeholder="웨더메이트에게 공유하고 싶은 날씨 이야기를 해주세요!"
          {...register('content', { required: '내용을 입력하세요.' })}
        />
        {errors.content && (
          <p className="ml-1 mb-2 text-bold text-red-500">
            {errors.content.message}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => navigate('/community')}
            className="grow p-1 box-border bg-gray-300 text-white rounded-lg"
          >
            취소
          </Button>
          <Submit className="grow p-1 box-border bg-blue-400 text-white rounded-lg">
            완료
          </Submit>
        </div>
      </form>
    </div>
  );
}

export default CommunityNew;
