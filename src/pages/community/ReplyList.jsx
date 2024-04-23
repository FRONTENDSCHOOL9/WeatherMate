import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "./ReplyItem"
import { useOutletContext, useParams } from "react-router-dom";
import ReplyNew from "./ReplyNew"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";


function ReplyList() {
  const post = useOutletContext();
  const { _id } = useParams();
  const axios = useCustomAxios();

  
  const { data,refetch } = useQuery({
    queryKey: ['posts', _id, 'replies'],
    queryFn: () =>
    axios.get(`/posts/${_id}/replies`),
    select: (response) => response.data,
    suspense: true,
  });
  
  async function handleDelete(reply_id){
    if (confirm('후기를 삭제하시겠습니까?')) {
      await axios.delete(`/posts/${post._id}/replies/${reply_id}`);
      // navigate(`/community/${_id}`) -> 페이지 이동 불필요(불필요 렌더링 제거)
      refetch()
    }
  }
  // 상태값 추가 불필요
  // const [newReply, setNewReply] = useState([]);
  
  // 화면 재렌더링 불필요
  // useEffect(() => {
  //   // console.log('댓글:', newReply)
  //   refetch()
  // },[newReply])

  const replyList = data?.item
  // console.log(data);
  // console.log(replyList);

  return (
    <div className="p-5 bg-gray-200 rounded-md">
      {/* <ReplyNew newReply={newReply} setNewReply={setNewReply}/> -> 불필요 props 전달*/}
      <ReplyNew refetch={refetch}/>
      <div className="flex mt-2 gap-2">
        <div className="flex gap-1 items-center">
          <FaHeart className="text-orange-300 text-2xl" />
          <p className="text-orange-300">좋아요</p>
        </div>
        <div className="flex gap-1 items-center">
          <IoChatbubbleEllipsesOutline className="text-orange-300 text-2xl" />
          <p className="text-orange-300">댓글 {replyList && (replyList !== 0 ? replyList.length : 0)}개</p>
        </div>
      </div>
      <div className="grid gap-2 ">
        {replyList && replyList.map((item) => <ReplyItem key={item._id} item={item} handleDelete={handleDelete}/>)} 
      </div>
    </div>
  )
}

export default ReplyList