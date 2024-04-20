import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "./ReplyItem"
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ReplyNew from "./ReplyNew"
import { useEffect, useState } from "react";


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
    }
  }

  useEffect(() => {
    console.log('댓글:', newReply)
    refetch()
  },[newReply])

  
  const replyList = data?.item?.replies


  return (
    <div className="px-5">
      <ReplyNew newReply={newReply} setNewReply={setNewReply}/>
      {replyList && replyList.map((e) => <ReplyItem key={e._id} item={e} handleDelete={handleDelete}/>)} 
    </div>
  )
}

export default ReplyList