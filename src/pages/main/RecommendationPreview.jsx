import { useState, useEffect } from 'react';

import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { Link } from 'react-router-dom';
import { userWeatherState } from '../../recoil/atom.mjs';
import { useRecoilState } from 'recoil';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

/* eslint-disable */
function RecommendationPreview() {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [contentTypeId, setContentTypeId] = useState('28');
  const [userWeather, setUserWeather] = useRecoilState(userWeatherState);

  console.log('user', userWeather);

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
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=4&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentTypeId}&_type=json&arrange=A`,
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
        <h1 className="text-xl mx-4 mb-7 font-bold">
          지금 날씨에는 이 장소 추천해요
          <Link to="/location">➡️</Link>
        </h1>

        <div>
          {locationData && (
            <div className="flex gap-4 ">
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
