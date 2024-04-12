import { Link } from "react-router-dom"
import CommunityHeader from "./CommunityHeader"
import Vector from "./image/Vector";
import { useState } from "react";


function CommunityDetail() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  }
  return (
    <div>
      <div>
        <Link to="/community" className="absolute left-6 top-10"><Vector /></Link>
        <div className="px-5 box-border flex flex-col">
          <CommunityHeader title={'상세보기'}/>
        </div>
      </div>

      <div className="p-5">
        <div className="border-b-8 pb-5">
          <p className="w-full text-center bg-indigo-200 h-48">detail</p>
          <div className="mt-3 flex gap-2">
            <button className="bg-orange-300 border rounded-lg p-1 text-white">좋아요</button>
            <button onClick={handleClick} className="bg-orange-300 border rounded-lg p-1 text-white">댓글</button>
          </div>
          {clicked && <div className="mt-2">
            <form className="flex gap-1 border bg-gray-200 p-3 rounded-md">
              <textarea autoFocus rows="1" placeholder="댓글을 입력하세요." className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"></textarea>
              <button type="submit" className="text-nowrap bg-orange-300 border rounded-lg p-1 text-white">입력</button>
            </form>
          </div>
          }
        </div>
        <div className="mt-3">
          <h2 className="">댓글</h2>
        </div>
      </div>

    </div>
  )
}

export default CommunityDetail;