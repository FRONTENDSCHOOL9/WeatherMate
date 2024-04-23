import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from './CommunityHeader';
import { MdOutlineCameraAlt } from 'react-icons/md';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Button from '@components/layout/Button';
import Submit from '@components/layout/Submit';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

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
    formData.title = dataWeater
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
      formData.image = files.data.item[0]?.name;
      console.log(formData.image);
    } else {
      delete formData.image;
    }
    const res = await axios.post('/posts', formData);
    console.log(res);
    navigate(`/community/${res.data.item._id}`);
  };

  const iconColors = ['bg-white', 'bg-blue-300'];
  const [weatherArr, setWeatherArr] = useState([]);
  const [dataWeater, setDataWeather] = useState('')

  const handleClick = e => {
    if(weatherArr.length === 0){
      e.target.classList.remove(iconColors[0]);
      e.target.classList.add(iconColors[1]);
      setWeatherArr(weatherArr.push(e.target.alt))
      console.log(weatherArr[0]);
      setDataWeather(weatherArr[0])
    }
  };

  return (
    <div className="px-5 box-border min-h-screen min-w-96">
      <div className="flex">
        <Button onClick={() => navigate('/community')} className=""><FaArrowLeft className="text-2xl" /></Button>
        <CommunityHeader title={'새 글쓰기'} />
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-3">

        <div>
          <div className="flex gap-2">
            <label
              htmlFor="file"
              className="w-20 h-20 bg-blue-400 py-3 mb-4 rounded-lg flex flex-col justify-center items-center text-white"
            >
              <MdOutlineCameraAlt className="text-3xl" />
              사진 추가
            </label>
            <input
              className=""
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
              <div onClick={handleClick} className="grid grid-cols-6 gap-1 px-2 lg:grid-cols-3">
                <button type="button" className={`${iconColors[0]} rounded-lg`}>
                  <img
                    src="/uvi.svg"
                    alt="uvi"
                    data-weather="uvi"
                    className={`rounded-md px-3 w-20 h-full lg:h-14 place-content-center m-auto `}
                  />
                </button>
                <button type="button" className={`${iconColors[0]} rounded-lg`}>
                  <img
                    src="/manyClouds.svg"
                    alt="manyClouds"
                    data-weather="manyClouds"
                    className={`rounded-md px-3 w-20 h-full lg:h-14 place-content-center m-auto `}
                  />
                </button>
                <button type="button" className={`${iconColors[0]} rounded-lg`}>
                  <img
                    src="/rain.svg"
                    alt="rain"
                    data-weather="rain"
                    className={`rounded-md px-3 w-20 h-full lg:h-14 place-content-center m-auto `}
                  />
                </button>
                <button type="button" className={`${iconColors[0]} rounded-lg`}>
                  <img
                    src="/littleCloud.svg"
                    alt="littleCloud"
                    data-weather="littleCloud"
                    className={`rounded-md px-3 w-20 h-full lg:h-14 place-content-center m-auto `}
                  />
                </button>
                <button type="button" className={`${iconColors[0]} rounded-lg`}>
                  <img
                    src="/mainSnow.svg"
                    alt="mainSnow"
                    data-weather="mainSnow"
                    className={`rounded-md px-3 w-20 h-full lg:h-14 place-content-center m-auto `}
                  />
                </button>
                <button type="button" className={`${iconColors[0]} rounded-lg`}>
                  <img
                    src="/windspeed.svg"
                    alt="windspeed"
                    data-weather="windspeed"
                    className={`rounded-md px-3 w-20 h-full lg:h-14 place-content-center m-auto `}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
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
        </div>
      </form>
    </div>
  );
}

export default CommunityNew;
