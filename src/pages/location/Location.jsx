// Location.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

//관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID

function Location() {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);

  const radius = '100000';
  const contentID = '12';

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
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=20&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
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

  function formatDistance(distance) {
    return `${(distance / 1000).toFixed(1)} km`;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locationData.map((item, index) => (
          <Link key={index} to={`/location/${item.contentid}`}>
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="mb-2">
                카테고리: {item.cat1}, {item.cat2}, {item.cat3}
              </p>
              <p className="mb-2">거리: {formatDistance(item.dist)}</p>
              <img
                src={item.firstimage}
                alt="이미지1"
                className="w-full h-auto mb-2"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Location;
