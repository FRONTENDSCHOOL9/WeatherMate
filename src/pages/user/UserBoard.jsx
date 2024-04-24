import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

UserBoard.propTypes = {
  item: PropTypes.object
}

function UserBoard({item}) {
  const navigate = useNavigate();
  
  
  return (
    <div className="flex flex-col gap-3 bg-white p-3 box-border rounded-lg mb-6" >
      <div className="flex flex-col gap-3 grow" onClick={() => navigate(`/community/${item._id}`)}>
        <div className="flex gap-3">
          <img src={item.user.profile} className="rounded-full border-gray-400 border-2 w-12 h-12" />
          <div className="grow flex items-center">
            <div className="grow">
              <h1 className="text-lg font-bold">{item.user?.name}</h1>
              <p className="text-primary_deep text-sm">조회수 {item.views}</p>
            </div>
            {item.title && <img className="w-10 h-10 border rounded-full bg-blue-200 p-1 xl:w-14 xl:h-14" src={`/${item.title}.svg`} alt="weatherIcon" />}
          </div>
        </div>
        <div>
          <div className="bg-gray-100 text-slate-800 rounded-md p-2 box-border">{item.content}</div>
          {item.image && <img className="h-28" src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`} alt="image" /> }

        </div>
      </div>
    </div>
  )
}

export default UserBoard