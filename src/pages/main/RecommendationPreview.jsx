import { useState, useEffect } from 'react';

import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function RecommendationPreview() {
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
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=2&numOfRows=4&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=12&_type=json`,
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

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mt-10">
        <h1 className="text-xl mx-7">
          지금 날씨에는 이 장소 추천해요
          <Link to="/location">➡️</Link>
        </h1>
  console.log('x', locationData);

        <div>
          {locationData && (
            <div className="flex gap-4 p-4 overflow-x-scroll">
              {locationData.map(item => (
                <img
                  key={item.contentid}
                  src={item.firstimage}
                  className="w-[150px] h-[150px]"
                  alt="recommendation"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendationPreview;
