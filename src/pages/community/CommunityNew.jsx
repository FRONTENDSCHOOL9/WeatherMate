import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CommunityHeader from "./CommunityHeader";
import { MdOutlineCameraAlt } from "react-icons/md";
import useCustomAxios from "@hooks/useCustomAxios.mjs";

function CommunityNew() {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState(null);
  const [weatherClick, setWeatherClick] = useState(false);
  const [cityClick, setCityClick] = useState(false);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    function getPosition(position){
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f24b931da8034c73b91bde1c8d244cad&lang=kr&units=metric`;
      fetch(API)
        .then(res => res.json())
        .then(data => {
          setCity(data.name);
          setWeather(data.weather[0].description);
        })
    }
    navigator.geolocation.getCurrentPosition(getPosition)
  },[city,weather])

  const handleWeatherClick = () => {
    setWeatherClick(true)
  }
  const handleCityClick = () => {
    setCityClick(true)
  }
  const handleFile = (e) => {
    setFileName(e.target.files?.[0].name);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    }
  }
  const onSubmit = async (formData) => {
    const res = await axios.post('/posts',formData)
    navigate(`/community/${res.data.item._id}`);
  }
  
  return (
    <div className="px-5 box-border">
      <CommunityHeader title={'글 작성하기'}/>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex">
          <label htmlFor="file" accept="image/*" className=" w-20 h-20 bg-indigo-200 py-3 mb-4 rounded-lg flex flex-col justify-center items-center text-white">
          <MdOutlineCameraAlt className="text-3xl"/>
            사진 추가
            <input onChange={handleFile} type="file" id="file" className="hidden"/>
          </label>
            {image && 
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <img src={image} className=" ml-5 text-md font-bold px-2 w-30 h-16"/>
                <p>{fileName}</p>
              </div>
              <button onClick={() => setImage()} className="border rounded px-1 ml-2 bg-gray-200 text-white h-8 w-8">X</button>
            </div>  
            }
        </div>

        <div className="flex justify-start gap-2 mb-2">
          {cityClick && <p onClick={() => setCityClick(false)} className="my-1 px-2 text-sm border rounded-lg bg-gray-400 text-white">{city}</p>}
          {weatherClick && <p onClick={() => setWeatherClick(false)} className="my-1 px-2 text-sm border rounded-lg bg-gray-400 text-white text-balance">{weather}</p>}
          <div className="ml-auto">
            <button onClick={() => {setCityClick(false),setWeatherClick(false)}} className="border rounded my-1 px-1 bg-gray-200 text-white">지우기</button>
          </div>
        </div>

        <textarea id="content" className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
        autoFocus cols="50" rows="15" placeholder="웨더메이트에게 공유하고 싶은 날씨 이야기를 해주세요!" {...register('content',{required: '내용을 입력하세요.'})}/>
        {errors.content && <p className="ml-1 mb-2 text-bold text-red-500">{errors.content.message}</p>}

        <div className="flex gap-2">
          <button className="border rounded-lg px-4 py-2 bg-indigo-200 text-indigo-600" onClick={handleWeatherClick}>날씨 추가하기</button>
          <button className="border rounded-lg px-4 py-2 bg-indigo-200 text-indigo-600" onClick={handleCityClick}>위치 추가하기</button>
        </div>

        <div className="flex gap-2 float-right">
          <button onClick={() => navigate('/community')} className="p-1 box-border bg-indigo-200 text-indigo-600 rounded-lg">취소</button>
          <button type="submit" className="p-1 box-border bg-indigo-200 text-indigo-600 rounded-lg">완료</button>
        </div>

      </form>


    </div>
  )
}

export default CommunityNew