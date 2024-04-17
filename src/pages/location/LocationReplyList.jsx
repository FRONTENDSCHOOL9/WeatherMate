/* eslint-disable */
import { useEffect, useState } from 'react';
import axios from 'axios';

function LocationReplyList({ oldReply, id }) {
  // const [oldReply, setOldReply] = useState({});
  // const getOldReply = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://market-lion.koyeb.app/api/posts/1/replies`,
  //     );
  //     setOldReply(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(
  //       '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
  //       error,
  //     );
  //   }
  // };

  // console.log(oldReply);
  // console.log(oldReply.item);

  // // useEffect(() => {
  // //   getOldReply();
  // // }, []);

  // const test = oldReply?.item;

  return (
    <div>
      {/* <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 개</h4>
        {test &&
          test.map((item, index) => {
            return (
              <div key={item._id}>
                <p>{item.content}</p>
              </div>
            );
          })}
      </section> */}
    </div>
  );
}

export default LocationReplyList;
