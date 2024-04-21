import { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { Link } from 'react-router-dom';
import Loading from '@components/layout/Loading';
// import { userWeatherState } from '../../recoil/atom.mjs';
// import { useRecoilState } from 'recoil';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

/* eslint-disable */
function RecommendationPreview() {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [contentTypeId, setContentTypeId] = useState('28');
  // const [userWeather, setUserWeather] = useRecoilState(userWeatherState);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const radius = '8000';

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
            `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=4&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentTypeId}&_type=json&arrange=A`,
          );

          setLocationData(response.data.response.body.items.item);
          setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
          console.log(response.data);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
          setLoading(false); // 데이터 로딩 실패 시에도 로딩 상태 변경
        }
      };

      fetchData();
    }
  }, [locationReady, latitude, longitude]);

  // 로딩 중일 때 보여줄 컴포넌트
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center w-full px-5">
      <div className="mt-10">
        <h1 className="text-xl mx-4 mb-7 font-bold">
          <strong className="text-primary">웨더메이트</strong> 의 추천장소
          <Link to="/location" className="ml-5">
            더보기
          </Link>
        </h1>

        <div>
          {locationData && (
            <div className="flex gap-4 font-sans text-sm">
              {locationData.map(item => (
                <div key={item.contentid}>
                  <Link to={`/location/${item.contentid}`}>
                    <img
                      src={item.firstimage}
                      className="w-[100px] h-[100px] rounded-xl"
                      alt="recommendation"
                    />
                  </Link>
                  <p className="text-center  font-bold mt-2">
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

export default RecommendationPreview;
