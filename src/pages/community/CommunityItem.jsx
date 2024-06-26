import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom.mjs";
import {useNavigate} from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import PropTypes from 'prop-types'
import useCustomAxios from "@hooks/useCustomAxios.mjs";

CommunityItem.propTypes = {
  item: PropTypes.object.isRequired
}

function CommunityItem({item}) {
  const [like, setLike] = useState(0);
  const [clicked, setClicked] = useState(false);

  const user = useRecoilValue(memberState);
  const navigate = useNavigate();
  const axios = useCustomAxios();

  localStorage.setItem("likeState",like)

  const handleLikeBTN = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else {
      clicked ? (setClicked(false), setLike(like !== 0 && like-1)) : (setClicked(true),setLike(like+1));
      localStorage.setItem("likeState",like)
    }
  };

  const [image, setImage] = useState(null);
  useEffect(() => {
    async function getFiles() {
      try{
        if(item.image){
          const res = await axios.get(`/files/07-WeatherMate/${item.image}`,{
            responseType: 'blob'
          })
          const url = URL.createObjectURL(res.data)
          setImage(url)
        }else{
          setImage(null)
        }
      }catch(error){
        console.error(error)
      }
    }
    getFiles();
  },[])

  // console.log(item);

  return (
    <div className="flex flex-col gap-3 bg-gray-200 p-3 box-border rounded-lg " >
      <div className="flex flex-col gap-3 grow" onClick={() => navigate(`/community/${item._id}`)}>
        <div className="flex gap-3">
          {item.user.profile ? <img src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.user.profile}`} className="rounded-full border-gray-400 border-2 w-12 h-12" /> : <p className="w-12 h-12 border-2 border-gray-400 rounded-full"></p>}
          <div className="grow flex items-center">
            <div className="grow">
              <h1 className="text-lg font-bold">{item.user?.name}</h1>
              <p className="text-blue-500">조회수 {item.views}</p>
            </div>
            {item.title && <img className="w-10 h-10 border rounded-full bg-blue-200 p-1 xl:w-14 xl:h-14" src={`/${item.title}.svg`} alt="weatherIcon" />}
          </div>
        </div>
        <div>
          <div className="bg-gray-500 text-white rounded-md p-2 box-border">{item.content}</div>
          {image && <img className="w-full" src={image} alt="image" />}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleLikeBTN} className="flex items-center">{like === 1 ? <FaHeart className="text-orange-300 text-2xl"/> : <FaRegHeart className="text-orange-300 text-2xl"/>}</button>
        <p className="text-orange-300 md:text-xl">좋아요 {like}</p>
        <p className="flex items-center md:text-xl"><IoChatbubbleEllipsesOutline className="text-orange-300 text-2xl"/></p>
        <p className="text-orange-300 md:text-xl">댓글 {item.repliesCount}개</p>
      </div>
    </div>
  )
}

export default CommunityItem