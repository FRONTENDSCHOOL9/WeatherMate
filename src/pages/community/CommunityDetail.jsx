import { Outlet, useParams } from 'react-router-dom';
import CommunityHeader from './CommunityHeader';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';
import Button from '@components/layout/Button';


function CommunityDetail() {
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);
  // const [like, setLike] = useRecoilState(likeState);
  const { _id } = useParams();
  const axios = useCustomAxios();
  
  // const [clicked, setClicked] = useState(false);

  // localStorage.setItem("likeState",like)

  // const handleLikeBTN = () => {
  //   if (!user) {
  //     const gotologin = confirm(
  //       '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
  //     );
  //     gotologin && navigate('/user/login');
  //   } else {
  //     clicked ? (setClicked(false), setLike(like !== 0 && like-1)) : (setClicked(true),setLike(like+1));
  //     localStorage.setItem("likeState",like)
  //   }
  // };

  let firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const { data } = useQuery({
    queryKey: ['posts', _id],
    queryFn: () =>
      axios.get(`/posts/${_id}`, {
        params: { incrementView: firstRender.current },
      }),
    select: response => response.data,
    suspense: true,
  });
  

  const handleDelete = async () => {
    await axios.delete(`/posts/${_id}`);
    alert('삭제되었습니다.');
    navigate('/community');
  };

  const item = data?.item;
  
  
  const [image, setImage] = useState(null);
  useEffect(() => {
    async function getFiles() {
      try{
        if(item.image){
          const res = await axios.get(`/files/07-WeatherMate/${data.item.image}`,{
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
  
  // console.log(data);
  // console.log(item);

  return (
    <div className="min-h-screen">
    <div>
      <div className="flex items-center justify-center">
        <Button onClick={() => navigate('/community')} className="absolute left-6 top-10">
          <FaArrowLeft className="text-2xl" />
        </Button>
        <div className="px-5 box-border flex flex-col">
          <CommunityHeader title={'상세보기'} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2">
      <div className="px-5">
        <div>
          {item && (
            <section className="py-4">
              <div
                className="flex flex-col gap-3"
                onClick={() => navigate(`/community/${item._id}`)}
              >
                <div className="flex gap-3">
                  <p className="rounded-full border w-12 h-12">{item.user.profile}</p>
                  <div className="grow">
                    <h1 className="text-lg font-bold">{item.user.name}</h1>
                    <p className="grow text-gray-400">{item.createdAt.substring(5,16)}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {item.title && <img className="w-12 h-12 border rounded-full bg-blue-200 p-1" src={`/${item.title}.svg`} alt="weather" />}
                    {/* <p className="text-blue-300">{item.title}</p> */}
                  </div>
                </div>

                <div className='grid'>
                  <div>
                    {image && <img src={image} alt="" className="w-full h-60 max-w-fit"/>}
                  </div>
                  <div className="bg-gray-400 text-white rounded-md p-2 box-border">
                    {item.content}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-end mt-3 gap-1">
                <p className="grow text-md font-bold text-orange-400">조회수 {item.views}</p>
                <div className="flex grow-0 gap-1">
                  <Button
                    className="bg-indigo-400 px-2 py-1 rounded-md"
                    onClick={() => navigate('/community')}
                  >
                    목록
                  </Button>
                  {user?._id === item.user._id && (
                    <div className='flex gap-1'>
                      {/* <Button className="bg-gray-500 p-1 rounded-md" onClick={handleDelete}>수정</Button> */}
                      <Button className="bg-red-500 px-2 py-1 rounded-md" onClick={handleDelete}>삭제</Button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

            {/* <button onClick={handleLikeBTN} className="flex gap-2 items-center">
              {clicked ? (
                <FaHeart className="text-orange-300 text-2xl" />
              ) : (
                <FaRegHeart className="text-orange-300 text-2xl" />
              )}
            </button>
            <p className="text-orange-300">좋아요 {like}</p> */}

        </div>

      </div>
      <Outlet context={item} />
      </div>
    </div>
    </div>
  );
}

export default CommunityDetail;
