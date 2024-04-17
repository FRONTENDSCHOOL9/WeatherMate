import { useNavigate, useParams } from "react-router-dom";
import { memberState } from '@recoil/atom.mjs';
import { useRecoilValue } from "recoil";
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomAxios from "@hooks/useCustomAxios.mjs";

ReplyNew.propTypes = {
  item: PropTypes.object
}


function ReplyNew({item}) {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const {_id} = useParams();
  const user = useRecoilValue(memberState)
  const {register, handleSubmit, formState: {errors}, } = useForm();
  
  const handleReply = () => {
    if (!user) {
      const gotologin = confirm(
        '로그인 후 이용 가능합니다. \n 로그인 하시겠습니까?',
      );
      gotologin && navigate('/user/login');
    } else {
      console.log(_id);
      navigate(`/community/${item._id}`);
    }
  };

  // const queryClient = useQueryClient();
  // const addReply = useMutation({
  //   mutationFn: (formData) => axios.post(`/posts/${_id}/replies`, formData),
  //   onSuccess() {
  //     queryClient.invalidateQueries(['posts', _id, 'replies']);
  //     reset();
  //   },
  // });

  // const onSubmit = (formData) => {
  //   addReply.mutate(formData);
  //   const reply = formData.comment
  //   console.log(reply);
  // };

  const onSubmit = async (formData) => {
    const reply = await axios.post(`/posts/${_id}/replies`,formData)
    console.log(reply);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}className="flex gap-1 border bg-gray-200 p-3 rounded-md">
        <div className="flex flex-col grow">
          <textarea
            {...register('comment', {required: '내용을 입력하세요',minLength: {value: 2,message: '2글자 이상 입력하세요'}})}
            autoFocus
            rows="1"
            placeholder="댓글을 입력하세요."
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          ></textarea>
          {errors.comment && <p className="ml-2 mt-1 text-sm text-red-500">{errors.comment.message}</p>}
        </div>
        <button
          onClick={handleReply}
          type="submit"
          className="text-nowrap bg-orange-300 border rounded-lg p-1 text-white grow-0"
        >
          입력
        </button>
      </form>
    </div>
  );
}

export default ReplyNew;
