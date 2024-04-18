import { useSearchParams } from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import CommunityHeader from "./CommunityHeader";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom.mjs";
import CommunityItem from "./CommunityItem";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect } from "react";
import Search from "@components/layout/Search";
import ToTheTopButton from "@components/layout/ToTheTopButton";

function CommunityMain() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const user = useRecoilValue(memberState);

  const handleWrite = () => {
    if(!user){
      const gotologin = confirm('로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?');
      gotologin && navigate('/user/login');
    }else{
      navigate('/community/new')
    }
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['posts', page],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          page,
          keyword: searchParams.get('keyword'),
          type: "community"
        },
      }),
      select: (response) => response.data,
      suspense: true,
      refetchOnMount: "always"
  });

  useEffect(() => {
    refetch();
  }, [searchParams.toString()]);

  const handleSearch = (keyword) => {
    searchParams.set('keyword', keyword);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };

  const itemList = data?.item?.map((item) => <CommunityItem key={item._id} item={item} />);
  
  const itemViews = data.item.sort((a,b) => a.views-b.views).reverse().slice(0,3).map(item => 
    <div key={item._id} className="bg-blue-400 rounded-md w-full h-32 p-2" onClick={() => navigate(`/community/${item._id}`)}>
      <p>닉네임 : {item.user.name}</p>
      <p>내용 : {item.content}</p>
      <p>조회수 : {item.views}</p>
      <p>댓글수 : {item.repliesCount}</p>
    </div>  
  );
  
  // console.log(data.item);
  // console.log(itemViews);
  

  return (
    <>
      <div>
        <div className="px-5 box-border border-b-8">

          <div className="flex items-center justify-center">
            <CommunityHeader title={'커뮤니티'}/>
            <button onClick={handleWrite} className="bg-indigo-200 boreder rounded-xl px-4 py-3 text-sm text-indigo-400 font-bold absolute right-5 top-7">새 글쓰기</button>
          </div>

          <div className="mt-5">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">인기 포스팅</h2>
            </div>
            <div className="w-full flex gap-2 mb-2">
              {itemViews}
            </div>
          </div>

        </div>
      </div>


      <Search onClick={handleSearch}></Search>
      <div className="flex flex-col px-5 gap-3 mt-3">
        {isLoading && (
          <p colSpan="5">로딩중...</p>
        )}
        {isError && (
          <p colSpan="5">{isError.message}</p>
        )}
        {itemList}
      </div>
      <ToTheTopButton />
    </>
  )
}

export default CommunityMain