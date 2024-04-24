import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '@hooks/useCurrentLocation';
import { Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;
/* eslint-disable */
import Loading from '@components/layout/Loading';
import Loading2 from '@components/layout/Loading2';

function RecommendationPreview() {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [contentTypeId, setContentTypeId] = useState('14');
  const [loading, setLoading] = useState(true);

  const radius = '100000';
  const { latitude, longitude } = useCurrentLocation();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLocationReady(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const fetchData = async () => {
      if (locationReady) {
        try {
          const response = await axios.get(
            `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=3&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentTypeId}&_type=json&arrange=R`,
          );
          setLocationData(response.data.response.body.items.item);
          setLoading(false);
          console.log(response.data);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [locationReady, latitude, longitude, contentTypeId]); // contentTypeId 추가

  useEffect(() => {
    const getRandomContentTypeId = () => {
      const options = ['12', '14', '15', '25']; // 사용 가능한 contentTypeId 옵션
      const randomIndex = Math.floor(Math.random() * options.length); // 랜덤한 인덱스 선택
      return options[randomIndex]; // 선택된 contentTypeId 반환
    };
    setContentTypeId(getRandomContentTypeId());
  }, []); // 초기 렌더링 시 한 번 실행됩니다.

  return (
    <div className="flex items-center justify-center w-full px-8">
      <div className="mt-10">
        <div className=" mb-7">
          <strong className="text-primary">웨더메이트</strong> 의 추천장소
          <Link to="/location" className="ml-5 text-gray-400 hover:text-black">
            더보기
          </Link>
        </div>
        <div>
          {loading ? (
            <Loading2 />
          ) : (
            <div className="flex gap-8 font-sans text-sm">
              {locationData.map(item => (
                <div key={item.contentid}>
                  <Link to={`/location/${item.contentid}`}>
                    <img
                      src={item.firstimage}
                      className="w-[100px] h-[100px] rounded-xl"
                      alt="recommendation"
                    />
                  </Link>
                  <p className="text-center text-sm mt-2">
                    {item.title.length > 5
                      ? `${item.title.slice(0, 5)}...`
                      : item.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(RecommendationPreview);
