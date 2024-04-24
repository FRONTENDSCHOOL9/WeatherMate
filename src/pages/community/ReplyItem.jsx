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
    <div className="mt-2 p-3 flex gap-3 rounded-lg items-center ">
      <div className="rounded-full w-12 h-12 bg-blue-400 border-white border-2">
        
      </div>
      <div className="flex flex-col justify-between grow gap-1">
        <div className="flex">
          <div className="flex grow gap-2">
            <div className="">{item.user.name}</div>
            <p className="text-stone-500">{item.createdAt.substring(5,16)}</p>
          </div>
          {user._id === item.user._id ? <button onClick={() => handleDelete(item._id)} className="bg-gray-500 rounded font-bold text-white px-1 border-white border-2">삭제</button> : null}
        </div>
        <div className="border-2 rounded-lg p-2 bg-white border-gray-200">{item.comment}</div>
      </div>
    </div>
  );
}

export default ReplyItem;

