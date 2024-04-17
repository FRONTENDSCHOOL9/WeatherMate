import { Link, useSearchParams } from "react-router-dom"
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
        },
      }),
    select: (response) => response.data,
    suspense: true,
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
  console.log(data.item);
  
  return (
    <>
      <div>
        <div className="px-5 box-border border-b-8">
          <div className="flex items-center justify-center">
            <CommunityHeader title={'커뮤니티'}/>
            <Search onClick={handleSearch}></Search>
          </div>
          <div className="mt-5">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">인기 포스팅</h2>
              <button onClick={handleWrite} className="bg-indigo-200 boreder rounded-xl px-2 py-1 text-sm text-indigo-400 font-bold">글쓰기</button>
            </div>
            <div className="flex justify-between items-center gap-1 mb-4">
              <Link to="/community/15" className="bg-indigo-200 p-3 w-28 h-28 flex items-center justify-center rounded-md">1</Link>
              <Link to="/community/17" className="bg-indigo-200 p-3 w-28 h-28 flex items-center justify-center rounded-md">2</Link>
              <Link to="/community/18" className="bg-indigo-200 p-3 w-28 h-28 flex items-center justify-center rounded-md">3</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-3 mt-4">
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