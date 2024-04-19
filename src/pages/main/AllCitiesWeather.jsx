import axios from 'axios';
import { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

function AllCitiesWeather() {
  const [data, setData] = useState(null);

  const weatherData = async () => {
    const params = {
      id: '1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265',
      appid: apiKey,
      lang: 'kr',
      units: 'metric',
    };
    const res = await axios.get(
      'https://api.openweathermap.org/data/2.5/group',
      {
        params,
      },
    );
    return res;
  };

  const getWeather = async () => {
    const res = await weatherData();
    setData(res.data.list);
  };

  console.log('x', data);
  useEffect(() => {
    getWeather();
  }, []);

  const citiesMappingData = {
    Seoul: '서울',
    'Gyeonggi-do': '경기도',
    'Gangwon-do': '강원도',
    'North Chungcheong': '충청북도',
    'Chungcheongnam-do': '충청남도',
    'Jeollabuk-do': '전라북도',
    'Jeollanam-do': '전라남도',
    'Gyeongsangbuk-do': '경상북도',
    'Gyeongsangnam-do': '경상남도',
    'Jeju-do': '제주도',
    // 여기에 더 많은 도시를 추가할 수 있습니다.
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map(item => {
        const cityName = citiesMappingData[item.name] || item.name; // 도시 이름을 매핑하거나 원래 이름을 사용합니다.
        const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        return (
          <div key={item.id} className="bg-white p-4 rounded-md shadow-md">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">{cityName}</h2>
              <p className="text-lg">현재 온도: {item.main.temp}°C</p>
              <p className="text-lg">체감 온도: {item.main.feels_like}°C</p>
              <p className="text-lg">날씨 : {item.weather[0].description}</p>
              <img src={iconURL} alt="Weather Icon" className="mx-auto" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllCitiesWeather;
