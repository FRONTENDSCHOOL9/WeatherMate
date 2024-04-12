// LocationDetailPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function LocationDetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);

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

  if (!detailData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail Page</h1>
      <h2>{detailData.title}</h2>
      <p>
        카테고리: {detailData.cat1}, {detailData.cat2}, {detailData.cat3}
      </p>
      <p>콘텐츠 ID: {detailData.contentid}</p>
      <p>콘텐츠 타입 ID: {detailData.contenttypeid}</p>
      <p>저작권 구분 코드: {detailData.cpyrhtDivCd}</p>
      <p>생성 시간: {detailData.createdtime}</p>
      <p>거리: {detailData.dist}</p>
      <img src={detailData.firstimage} alt="이미지1" />
      <p>위도: {detailData.mapx}</p>
      <p>경도: {detailData.mapy}</p>
      <p>레벨: {detailData.mlevel}</p>
      <p>수정 시간: {detailData.modifiedtime}</p>
      <p>시군구 코드: {detailData.sigungucode}</p>
      <p>전화번호: {detailData.tel}</p>
    </div>
  );
}

export default LocationDetailPage;