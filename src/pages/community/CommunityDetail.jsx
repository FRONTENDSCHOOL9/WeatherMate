import { Outlet, useParams } from 'react-router-dom';
import CommunityHeader from './CommunityHeader';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { FaArrowLeft } from 'react-icons/fa';
import useCustomAxios from '../../hooks/useCustomAxios.mjs';
import { useQuery } from '@tanstack/react-query';

CommunityDetail.propTypes = {
  like: PropTypes.string,
};

function CommunityDetail() {
  const [like, setLike] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);
  const { _id } = useParams();
  const axios = useCustomAxios();

  const handleReply = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else {
      navigate('/community/detail');
    }
  };
  const handleLike = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else if (like === 0) {
      setLike(1);
    } else if (like === 1) {
      setLike(0);
    }
  };
  const handleClick = () => {
    setClicked(true);
  };

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

  return (
    <div>
      <div>
        <button onClick={() => navigate("/community")} className="absolute left-6 top-10">
          <FaArrowLeft className="text-2xl" />
        </button>
        <div className="px-5 box-border flex flex-col">
          <CommunityHeader title={'상세보기'} />
        </div>
      </div>

      <div className="p-5">
        <div className="border-b-8 pb-5">
          {item && (
            <section className=" p-4">

              <div className="flex flex-col gap-3" onClick={() => navigate(`/community/${item._id}`)}>

                <div className="flex gap-3">
                  <p className="rounded-full bg-indigo-200 border w-12 h-12"></p>
                  <div className="grow">
                    <h1 className="text-lg font-bold">{item.user.name}</h1>
                    <p className="text-blue-300">place</p>
                  </div>
                  <p>조회수 {item.views}</p>
                </div>

                <div>
                  <div className="bg-gray-800 text-white rounded-md p-2 box-border">
                    {item.content}
                  </div>
                  <div><p className="bg-indigo-300">{item.image}</p></div>
                </div>

              </div>

              <div className="flex justify-end mt-3 gap-1">
                <button className="bg-indigo-400 p-1 rounded-md" onClick={() => navigate('/community')}>목록</button>
                {user?._id === item.user._id && (<button className="bg-red-500 p-1 rounded-md" onClick={handleDelete}>삭제</button>)}
              </div>

            </section>
          )}

          <div className="mt-3 flex gap-2">
            <button onClick={handleLike} className="flex gap-2 items-center">
              {like === 1 ? (
                <FaHeart className="text-orange-300 text-2xl" />
              ) : (
                <FaRegHeart className="text-orange-300 text-2xl" />
              )}
            </button>
            <p className="text-orange-300">좋아요 {like}</p>
            <button onClick={handleClick} className="flex gap-2 items-center">
              {clicked ? (
                <IoChatbubbleEllipsesSharp className="text-orange-300 text-2xl" />
              ) : (
                <IoChatbubbleEllipsesOutline className="text-orange-300 text-2xl" />
              )}
            </button>
            <p className="text-orange-300">댓글</p>
          </div>

          {clicked && (
            <div className="mt-2">
              <form className="flex gap-1 border bg-gray-200 p-3 rounded-md">
                <textarea
                  autoFocus
                  rows="1"
                  placeholder="댓글을 입력하세요."
                  className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                ></textarea>
                <button
                  onClick={handleReply}
                  type="submit"
                  className="text-nowrap bg-orange-300 border rounded-lg p-1 text-white"
                >
                  입력
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="mt-3">
          <h2 className="">댓글</h2>
        </div>
      </div>
      <Outlet context={item} />
    </div>
  );
}

export default CommunityDetail;
