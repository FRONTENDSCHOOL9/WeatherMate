import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';


ReplyItem.propTypes = {
  item: PropTypes.object,
  comment: PropTypes.string,
  handleDelete: PropTypes.func
};

function ReplyItem({item, handleDelete}) {
  const user = useRecoilValue(memberState);

  // console.log(user);
  // console.log(item);

  return (
    <div className="mt-2 p-3 bg-gray-400 border flex gap-3 rounded-lg items-center ">
      <div className="rounded-full w-12 h-12 bg-indigo-200 ">
        
      </div>
      <div className="flex flex-col justify-between grow gap-1">
        <div className="grow flex">
          <div className="grow">{item.user.name}</div>
          {user._id === item.user._id ? <button onClick={() => handleDelete(item._id)} className="bg-red-500 rounded font-bold text-white px-1">삭제</button> : null}
        </div>
        <div className="border-2 rounded-lg p-1 bg-gray-300">{item.comment}</div>
      </div>
    </div>
  );
}

export default ReplyItem;

