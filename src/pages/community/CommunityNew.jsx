import { useState } from "react"
// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CommunityHeader from "./CommunityHeader";
import { MdOutlineCameraAlt } from "react-icons/md";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import Button from "@components/layout/Button";
import Submit from "@components/layout/Submit";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { WiCloudy } from "react-icons/wi";
import { WiCloudyGusts } from "react-icons/wi";
import { BsCloudSnow } from "react-icons/bs";
import { WiCloudyWindy } from "react-icons/wi";

function CommunityNew() {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const [image, setImage] = useState(null)
  // const [click, setClicked] = useState(false);

  const [fileName, setFileName] = useState(null);
  // const [weatherClick, setWeatherClick] = useState(false);
  // const [cityClick, setCityClick] = useState(false);
  // const [weather, setWeather] = useState(null);
  // const [city, setCity] = useState(null);

  // useEffect(() => {
  //   function getPosition(position){
  //     const lat = position.coords.latitude;
  //     const lon = position.coords.longitude;
  //     const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f24b931da8034c73b91bde1c8d244cad&lang=kr&units=metric`;
  //     fetch(API)
  //       .then(res => res.json())
  //       .then(data => {
  //         setCity(data.name);
  //         setWeather(data.weather[0].description);
  //       })
  //   }
  //   navigator.geolocation.getCurrentPosition(getPosition)
  // },[city,weather])

  // const handleWeatherClick = () => {
  //   setWeatherClick(true)
  // }
  // const handleCityClick = () => {
  //   setCityClick(true)
  // }

  const handleFile = (e) => {
    setFileName(e.target.files?.[0].name);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    }
    console.log(file);
  }

  // const handleFile = async () => {
  //   const fileRes = await axios.post('/files')
  // }

  const onSubmit = async (formData) => {
    const res = await axios.post('/posts',formData)
    console.log(res);
    navigate(`/community/${res.data.item._id}`);
  }
  
  return (
    <div className="px-5 box-border">
      <CommunityHeader title={'글 작성하기'}/>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex">
          <label htmlFor="file" accept="image/*" className=" w-20 h-20 bg-blue-400 py-3 mb-4 rounded-lg flex flex-col justify-center items-center text-white">
          <MdOutlineCameraAlt className="text-3xl"/>
            사진 추가
            <input onChange={handleFile} type="file" id="file" className="hidden"/>
          </label>
            {image && 
            <div className="flex items-center">
              <div className="flex items-center">
                <p className="ml-5">{fileName}</p>
                <img src={image} className="text-md font-bold px-2 h-8"/>
              </div>
              <Button type="button" onClick={() => setImage()} className="border rounded px-1 ml-2 bg-gray-200 text-white h-8 w-8">X</Button>
            </div>  
            }
        </div>

        {/* <div className="flex justify-start gap-2 mb-2">
          {cityClick && <p onClick={() => setCityClick(false)} className="my-1 px-2 text-sm border rounded-lg bg-gray-400 text-white">{city}</p>}
          {weatherClick && <p onClick={() => setWeatherClick(false)} className="my-1 px-2 text-sm border rounded-lg bg-gray-400 text-white text-balance">{weather}</p>}
          <div className="ml-auto">
            <Button type="button" onClick={() => {setCityClick(false),setWeatherClick(false)}} className="border rounded my-1 px-1 bg-gray-200 text-white">지우기</Button>
          </div>
        </div> */}

        <textarea id="content" className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
        autoFocus cols="50" rows="15" placeholder="웨더메이트에게 공유하고 싶은 날씨 이야기를 해주세요!" {...register('content',{required: '내용을 입력하세요.'})}/>
        {errors.content && <p className="ml-1 mb-2 text-bold text-red-500">{errors.content.message}</p>}

        {/* <div className="flex gap-2">
          <Button type="button" className="border rounded-lg px-4 py-2 bg-indigo-200 text-indigo-600" onClick={handleWeatherClick}>날씨 추가하기</Button>
          <Button type="button" className="border rounded-lg px-4 py-2 bg-indigo-200 text-indigo-600" onClick={handleCityClick}>위치 추가하기</Button>
        </div> */}

        <div className="my-4 flex flex-col">
          <p className="text-lg font-bold">오늘의 날씨 선택</p>
          <div className="border mt-2 py-2 rounded-xl">
            <ul className="flex justify-between px-5">
              <li><TiWeatherSunny className="border rounded-full w-10 h-10 bg-gray-300"/></li>
              <li><TiWeatherDownpour className="border rounded-full w-10 h-10 p-1 bg-gray-300"/></li>
              <li><WiCloudy className="border rounded-full w-10 h-10 bg-gray-300"/></li>
              <li><WiCloudyGusts className="border rounded-full w-10 h-10 bg-gray-300"/></li>
              <li><BsCloudSnow className="border rounded-full w-10 h-10 p-1 bg-gray-300"/></li>
              <li><WiCloudyWindy className="border rounded-full w-10 h-10 bg-gray-300"/></li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="button" onClick={() => navigate('/community')} className="grow p-1 box-border bg-gray-300 text-white rounded-lg">취소</Button>
          <Submit className="grow p-1 box-border bg-blue-400 text-white rounded-lg">완료</Submit>
        </div>

      </form>


    </div>
  )
}

export default CommunityNew