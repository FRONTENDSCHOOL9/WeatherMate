
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

CommunityPopularItem.propTypes = {
  data: PropTypes.object
}

function CommunityPopularItem({data}) {
  const navigate = useNavigate();

  const itemViews = data.item.sort((a,b) => b.views-a.views).slice(0,3).map(item => 
    <div key={item._id} className={`bg-gray-300 rounded-md h-32 p-2 text-nowrap relative -z-20 w-full`} onClick={() => navigate(`/community/${item._id}`)}>
      <div className="relative">
        <img className="absolute h-28 -z-10" src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`} alt="" />
      </div>
      <div className="font-bold text-gray-500">
        <p>{item.user?.name}</p>
        <p>조회수 {item.views}</p>
      </div>
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