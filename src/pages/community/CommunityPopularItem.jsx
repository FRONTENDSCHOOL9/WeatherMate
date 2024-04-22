
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

CommunityPopularItem.propTypes = {
  data: PropTypes.object
}

function CommunityPopularItem({data}) {
  const navigate = useNavigate();

  const itemViews = data.item.sort((a,b) => b.views-a.views).slice(0,3).map(item => 
    <div key={item._id} className="bg-gray-300 rounded-md h-32 p-2 text-nowrap" onClick={() => navigate(`/community/${item._id}`)}>
      <p>닉네임 : {item.user?.name}</p>


      <p>내용 : {item.content}</p>
      <p>조회수 : {item.views}</p>
      <p>댓글수 : {item.repliesCount}</p>
    </div>  
  );

  
  // console.log(data.item)

  return (
    <div className="my-2 pb-3 px-5 border-b-8 flex flex-col ">
      <div className="flex justify-between mb-2 md:justify-center">
        <h2 className="font-bold text-lg text-gray-700 md:text-xl xl:text-2xl">인기 포스팅</h2>
      </div>
      <div className="w-full flex gap-2 overflow-x-scroll md:justify-center">

        {itemViews}
      </div>
    </div>
  )
}

export default CommunityPopularItem