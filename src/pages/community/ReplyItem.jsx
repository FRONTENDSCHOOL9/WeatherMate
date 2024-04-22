import PropTypes from 'prop-types';


ReplyItem.propTypes = {
  item: PropTypes.object,
  comment: PropTypes.string,
  handleDelete: PropTypes.func
};

function ReplyItem({item, handleDelete}) {

  // console.log(item);

  return (
    <div className="mt-2 p-3 bg-gray-400 border flex gap-3 rounded-lg items-center ">
      <div className="rounded-full w-12 h-12 bg-indigo-200 ">
        
      </div>
      <div className="flex justify-between items-center grow">
        <div className="grow">
          <div>{item.user.name}</div>
          <div className="border-2 rounded-lg p-1">{item.comment}</div>
        </div>
        <button onClick={() => handleDelete(item._id)} className="bg-red-500 rounded h-8 font-bold text-white px-1">삭제</button>
      </div>
    </div>
  );
}

export default ReplyItem;

