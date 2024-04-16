import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import LocationAddReply from './LocationAddReply';
// import LocationReplyList from './LocationReplyList';
import Loading from '../../components/layout/Loading';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;
/* eslint-disable */
function LocationDetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [oldReply, setOldReply] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=testweb&contentId=${id}&serviceKey=${apiKey}&_type=json&defaultYN=Y&firstImageYN=Y`,
        );
        setDetailData(response.data.response.body.items.item[0]);
        console.log(response.data);
      } catch (error) {
        console.error(
          '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
          error,
        );
      }
    };
    fetchData();
  }, [id]);

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

  // useEffect(() => {
  //   getOldReply();
  // }, [id]);

  if (!detailData) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">{detailData.title}</h1>
      <p>콘텐츠 ID: {detailData.contentid}</p>
      {/* <p>콘텐츠 타입 ID: {detailData.contenttypeid}</p>
      <p>생성 시간: {detailData.createdtime}</p> */}
      <p>거리: {detailData.dist}</p>
      <img src={detailData.firstimage} alt="이미지1" className="my-4 w-full" />
      <p>위도: {detailData.mapx}</p>
      <p>경도: {detailData.mapy}</p>
      <p>레벨: {detailData.mlevel}</p>
      <p>수정 시간: {detailData.modifiedtime}</p>
      <p>시군구 코드: {detailData.sigungucode}</p>
      <p>전화번호: {detailData.tel}</p>
      {/* <LocationReplyList id={id} oldReply={oldReply} /> */}
      {/* <LocationAddReply id={id} /> */}
    </div>
  );
}

export default LocationDetailPage;
