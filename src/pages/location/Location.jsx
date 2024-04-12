import { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const apiKey =
  'Tni56ZINiQ1IRiydSoRdwSLjhCAXtB2FKJPCTEQPxyyr0%2FJvNjWymNpCJQzOtAmEEr1jyhFa2zejQamJnkB9Uw%3D%3D';

function Location() {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);

  const radius = '100000';

  const { latitude, longitude } = useCurrentLocation();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLocationReady(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (locationReady) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=2&numOfRows=20&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=25&_type=json&contentTypeId=15`,
          );
          setLocationData(response.data.response.body.items.item);
          console.log(response.data);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      };

      fetchData();
    }
  }, [locationReady, latitude, longitude]);

  console.log(locationData);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locationData.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="mb-2">
              카테고리: {item.cat1}, {item.cat2}, {item.cat3}
            </p>
            <p className="mb-2">콘텐츠 ID: {item.contentid}</p>
            <p className="mb-2">콘텐츠 타입 ID: {item.contenttypeid}</p>
            <p className="mb-2">저작권 구분 코드: {item.cpyrhtDivCd}</p>
            <p className="mb-2">생성 시간: {item.createdtime}</p>
            <p className="mb-2">거리: {item.dist}</p>
            <img
              src={item.firstimage}
              alt="이미지1"
              className="w-full h-auto mb-2"
            />
            <p className="mb-2">위도: {item.mapx}</p>
            <p className="mb-2">경도: {item.mapy}</p>
            <p className="mb-2">레벨: {item.mlevel}</p>
            <p className="mb-2">수정 시간: {item.modifiedtime}</p>
            <p className="mb-2">시군구 코드: {item.sigungucode}</p>
            <p className="mb-2">전화번호: {item.tel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Location;
