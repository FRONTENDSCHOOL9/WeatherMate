// Location.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';


/* eslint-disable */

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

//관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID


const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

//about ContentID = 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID

function Location({ keyword }) {
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);

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

  console.log('cID', contentID);
  // 현재 위치 기반으로 장소를 우선적으로 추천해주는 함수
  useEffect(() => {
    if (locationReady) {
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
  }, [searchKeyword]);

  //km로 변경함수
  function formatDistance(distance) {
    return `${(distance / 1000).toFixed(1)} km`;
  }
  // 이미지가 없는 경우 default 이미지 보여주기
  const recoDefaultImg = 'public/01.svg';

  // 페이지 초기속도를 올리기 위한 페이지네이션 기능
  const handleDropdownChange = event => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption); // 선택된 옵션 설정

    switch (selectedOption) {
      case 'option1':
        setContentID('12');
        break;
      case 'option2':
        setContentID('14');
        break;
      case 'option3':
        setContentID('15');
        break;
      case 'option4':
        setContentID('25');
        break;
      case 'option5':
        setContentID('28');
        break;
      case 'option6':
        setContentID('32');
        break;
      case 'option7':
        setContentID('38');
        break;
      case 'option8':
        setContentID('39');
        break;
      default:
        setContentID('12'); // 기본값 설정
        break;
    }
  };

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
  // 현재 페이지의 높이를 보기 위한 함수
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      locationData.length > 0
    ) {
      fetchNextPage(); // 스크롤이 끝으로 내려갔을 때 다음 페이지의 데이터를 가져옴
    }
  };

  //사용자 화면 높이 측정
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [locationData]); // locationData가 업데이트 될 때마다 이벤트 리스너를 추가/제거

  function formatDistance(distance) {
    return `${(distance / 1000).toFixed(1)} km`;
  }

  return (
    <div className="container mx-auto p-4">
      {/* 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠,
      32:숙박, 38:쇼핑, 39:음식점) ID */}
      <select
        value={selectedOption}
        onChange={handleDropdownChange}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-5"
      >
        <option value="">추천 옵션</option>
        <option value="option1">관광지</option>
        <option value="option2">문화시설</option>
        <option value="option3">축제공연행사</option>
        <option value="option4">여행코스</option>
        <option value="option5">레포츠</option>
        <option value="option6">숙박</option>
        <option value="option7">쇼핑</option>
        <option value="option8">음식점</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {locationData?.map((item, index) => (
          <Link key={index} to={`/location/${item.contentid}`}>
            <div className="bg-gray-100 p-4 rounded-md shadow-md min-h-[500px] max-h-[500px]">



              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="mb-2">
                카테고리: {item.cat1}, {item.cat2}, {item.cat3}
              </p>
              <p className="mb-2">거리: {formatDistance(item.dist)}</p>
              <img

                src={item.firstimage ? item.firstimage : recoDefaultImg}
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
