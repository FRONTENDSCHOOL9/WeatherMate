import Loading from '@components/layout/Loading';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LocationBookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async contentId => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=test&_type=json&contentId=${contentId}&serviceKey=Tni56ZINiQ1IRiydSoRdwSLjhCAXtB2FKJPCTEQPxyyr0%2FJvNjWymNpCJQzOtAmEEr1jyhFa2zejQamJnkB9Uw%3D%3D&defaultYN=Y&firstImageYN=Y`,
      );
      return response.data.response.body.items.item; // item 배열 반환
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    const fetchDataForBookmarks = async () => {
      const bookmarkDataArray = await Promise.all(
        bookmarks.map(bookmark => fetchData(bookmark)),
      );
      setBookmarkData(bookmarkDataArray.flat()); // 중첩 배열 평탄화
      setLoading(false);
    };
    fetchDataForBookmarks();
  }, [bookmarks]);

  const moveToBookMarkPage = () => {
    navigate(`/location/${bookmarkData[0].contentid}`);
  };

  return (
    <div className="h-[300px] bg-red-200 overflow-y-scroll">
      <h1>북마크 목록</h1>
      {loading ? (
        <Loading />
      ) : (
        <ul onClick={moveToBookMarkPage}>
          {bookmarkData.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-wrap"
            >
              <img
                src={item.firstimage ? item.firstimage : '/01.svg'}
                className="w-20 h-20 rounded-3xl"
              />
              <p className="text-base">{item.title}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationBookMark;
