import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function CommunityPopularItem() {
  const axios = useCustomAxios();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          type: "community"
        },
      }),
      select: (response) => response.data,
      suspense: true,
      refetchOnMount: "always"
  });

  const itemViews = data.item.sort((a,b) => b.views-a.views).slice(0,3).map(item => 
    <div key={item._id} className="bg-blue-400 rounded-md w-full h-32 p-2" onClick={() => navigate(`/community/${item._id}`)}>
      <p>닉네임 : {item.user.name}</p>
      <p>내용 : {item.content}</p>
      <p>조회수 : {item.views}</p>
      <p>댓글수 : {item.repliesCount}</p>
    </div>  
  );

  return (
    <div className="my-2">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold text-lg text-gray-700">인기 포스팅</h2>
      </div>
      <div className="w-full flex gap-2">
        {itemViews}
      </div>
    </div>
  )
}

export default CommunityPopularItem