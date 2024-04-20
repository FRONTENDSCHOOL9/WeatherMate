import PropTypes from 'prop-types';


ReplyItem.propTypes = {
  item: PropTypes.object,
  comment: PropTypes.string,
  handleDelete: PropTypes.func
};

function ReplyItem({item, handleDelete}) {

  console.log(item);

  return (
    <div className="mt-2 p-5 bg-gray-200 border rounded flex gap-3">
      <div className="rounded-full w-10 h-10 bg-indigo-200">
        
      </div>
      <div className="flex justify-between">
        <div className="">
          <div>{item.user.name}</div>
          <div>{item.comment}</div>
        </div>
        <button onClick={() => handleDelete(item._id)} className="bg-red-500 rounded h-8 grow-0 font-bold">Delete</button>
      </div>
    </div>
  );
}

export default ReplyItem;

