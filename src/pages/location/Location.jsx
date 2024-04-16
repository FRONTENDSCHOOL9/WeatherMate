// Location.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { FaRegHeart } from 'react-icons/fa6';
import LocationKeywords from './LocationKeyword';

/* eslint-disable */

//관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function Location({ keyword }) {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false); // 받아오는 location 상태
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색내용
  const [selectedOption, setSelectedOption] = useState(''); // 옵션 드랍다운 선택 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [contentID, setContentID] = useState('12'); // 초기값으로 contentID 설정
  const radius = '100000'; // 거리반경(단위:m) , Max값 20000m=20Km

  const { latitude, longitude } = useCurrentLocation();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLocationReady(true);
    }
  }, [latitude, longitude]);

  // 검색창이 아닐 때 비어있을 때

  console.log('cID', contentID);
  // 현재 위치 기반으로 장소를 우선적으로 추천해주는 함수
  useEffect(() => {
    if (locationReady && !searchKeyword.trim().length) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=6&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
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
  }, [locationReady, latitude, longitude, contentID]);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  // 검색 키워드가 있을 때 호출
  useEffect(() => {
    if (searchKeyword) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=testweb&serviceKey=${apiKey}&keyword=${keyword}&_type=json&contentTypeId=${contentID}
`,
          );
          setLocationData(response.data.response.body.items.item);
          console.log('newdata', response.data);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      };

      fetchData();
    }
  }, [searchKeyword, contentID]);

  //km로 변경함수
  function formatDistance(distance) {
    return `${(distance / 1000).toFixed(1)} km`;
  }
  // 이미지가 없는 경우 default 이미지 보여주기
  const recoDefaultImg = '/loading.gif';

  //다음 페이지 호출 함수
  const fetchNextPage = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=${currentPage + 1}&numOfRows=10&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
      );
      setLocationData(prevData => [
        ...prevData,
        ...response.data.response.body.items.item,
      ]);

      console.log('preData', locationData);
      setCurrentPage(prevPage => prevPage + 1); // 다음 페이지로 현재 페이지 업데이트
    } catch (error) {
      console.error(
        '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
        error,
      );
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      locationData.length > 0
    ) {
      fetchNextPage(); // 스크롤이 끝으로 내려갔을 때 다음 페이지의 데이터를 가져옴
    }
  };

  //스크롤 이벤트
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [locationData]); // locationData가 업데이트 될 때마다 이벤트 리스너를 추가/제거

  function formatDistance(distance) {
    return `${(distance / 1000).toFixed(1)} km`;
  }

  const handleOptionClick = contentID => {
    setContentID(contentID);
  };

  const options = [
    { id: '12', label: '관광지' },
    { id: '14', label: '문화시설' },
    { id: '15', label: '축제공연행사' },
    { id: '25', label: '여행지' },
    { id: '28', label: '레포츠' },
    { id: '32', label: '숙박' },
    { id: '38', label: '비오는 날 쇼핑어때요?' },
    { id: '39', label: '음식점' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-2">키워드 별 검색</h1>
      <div className="flex flex-wrap justify-center items-center gap-5 mb-5">
        {options.map(option => (
          <LocationKeywords
            key={option.id}
            id={option.id}
            label={option.label}
            onClick={handleOptionClick}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locationData?.map((item, index) => (
          <div
            className="p-4 rounded-md shadow-md min-h-[500px] max-h-[500px]"
            key={index}
          >
            <FaRegHeart className="text-sub_sal w-[35px] h-[35px]" />
            <Link key={index} to={`/location/${item.contentid}`}>
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="mb-2 text-gray_04">{item.addr1}</p>
              <p className="mb-2 text-gray_04">
                거리: {formatDistance(item.dist)}
              </p>
              <img
                src={item.firstimage ? item.firstimage : recoDefaultImg}
                alt="이미지1"
                className=""
                me="w-full h-auto mb-2 rounded-md"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Location;
