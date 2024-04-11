import { Link } from "react-router-dom";
import Search from "./image/Search";
import {useNavigate} from 'react-router-dom';

function CommunityHeader() {
  const navigate = useNavigate();

  const handleWrite = () => {
    navigate('/community/new')
  }


  return (

    <div className="p-5 box-border border-b-8">

      <div className="border-b-4 pb-2 text-center">
        <h1 className="inline-block font-bold text-xl ml-5">커뮤니티</h1>
        <button className="float-right"><Search /></button>
      </div>

      <div className="mt-5">

        <div className="flex justify-between mb-3">
          <h2 className="font-bold">인기 포스팅</h2>
          <button onClick={handleWrite} className="bg-indigo-200 boreder rounded-xl px-2 py-1 text-sm text-indigo-400 font-bold">글쓰기</button>
        </div>

        <div className="flex justify-between items-center gap-1">
          <Link to="/community/detail" className="bg-indigo-200 p-3 w-28 h-28 flex items-center justify-center rounded-md">1</Link>
          <Link to="/community/detail" className="bg-indigo-200 p-3 w-28 h-28 flex items-center justify-center rounded-md">2</Link>
          <Link to="/community/detail" className="bg-indigo-200 p-3 w-28 h-28 flex items-center justify-center rounded-md">3</Link>
        </div>

      </div>

    </div>

  )
}

export default CommunityHeader;