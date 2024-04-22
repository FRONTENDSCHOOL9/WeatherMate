import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "./ReplyItem"
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ReplyNew from "./ReplyNew"
import { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";


function ReplyList() {
  const post = useOutletContext();
  const navigate = useNavigate();
  const { _id } = useParams();
  const axios = useCustomAxios();

  const [newReply, setNewReply] = useState([]);

  const { data,refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      axios.get(`/posts/${_id}`),
    select: (response) => response.data,
    suspense: true,
  });

  async function handleDelete(reply_id){
    if (confirm('후기를 삭제하시겠습니까?')) {
      await axios.delete(`/posts/${post._id}/replies/${reply_id}`);
      navigate(`/community/${_id}`)
      refetch()
    }
  }

  useEffect(() => {
    // console.log('댓글:', newReply)
    refetch()
  },[newReply])

  
  const replyList = data?.item?.replies
  // console.log(replyList);

  return (
    <div className="p-5 bg-gray-200 rounded-md">
      <ReplyNew newReply={newReply} setNewReply={setNewReply}/>
      <div className="flex mt-2">
        <div className="flex gap-1 items-center">
          <FaHeart className="text-orange-300 text-2xl" />
          <p className="text-orange-300">좋아요</p>
        </div>
        <div className="flex gap-1 items-center">
          <IoChatbubbleEllipsesOutline className="text-orange-300 text-2xl" />
          <p className="text-orange-300">댓글 {replyList && (replyList.length !== 0 ? replyList.length : 0)}개</p>
        </div>
      </div>
      <div className="grid gap-2 xl:grid-cols-2 2xl:grid-cols-3">
        {replyList && replyList.map((e) => <ReplyItem key={e._id} item={e} handleDelete={handleDelete}/>)} 
      </div>
    </div>
  )
}

export default ReplyList