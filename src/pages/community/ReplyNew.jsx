import { useNavigate, useParams } from "react-router-dom";
import { memberState } from '@recoil/atom.mjs';
import { useRecoilValue } from "recoil";
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import Submit from "@components/layout/Submit";
import { TbSend } from "react-icons/tb";


ReplyNew.propTypes = {
  refetch: PropTypes.func
}

function ReplyNew({refetch}) {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const {_id} = useParams();
  const user = useRecoilValue(memberState)
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  
  const handleReply = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else {
      console.log(_id);
      navigate(`/community/${_id}`);
    }
  };

  const onSubmit = async (formData) => {
      await axios.post(`/posts/${_id}/replies`,formData)
      refetch();
      reset();
      // setNewReply([...newReply, reply.data.item]) 상태값 불필요
      // navigate(`/community/${_id}`) 이동 불필요
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 border rounded-md">
        <div className="flex gap-2">
          <textarea
            {...register('comment', {required: '내용을 입력하세요',minLength: {value: 2,message: '2글자 이상 입력하세요'}})}
            autoFocus
            rows="1"
            placeholder="댓글을 입력하세요."
            className="block p-2 w-full text-sm border rounded-lg lg:min-h-12 lg:max-h-12 border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          ></textarea>
          <Submit onClick={handleReply} className="text-nowrap bg-orange-300 border rounded-lg px-4 lg:px-8 text-white"><TbSend className="text-2xl"/></Submit>
        </div>
        {errors.comment && <p className="ml-2 mt-1 text-sm text-red-500">{errors.comment.message}</p>}
      </form>
    </div>
  );
}

export default ReplyNew;
