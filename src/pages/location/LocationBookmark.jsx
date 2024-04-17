import Loading from '@components/layout/Loading';
import axios from 'axios';
import { useEffect, useState } from 'react';

function LocationBookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="h-[500px]">
      <h2>북마크 목록</h2>
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {bookmarkData.map((item, index) => (
            <div key={index} className="flex">
              <p className="text-3xl">{item.title}</p>
              <img src={item.firstimage} className="w-20 h-20" />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationBookMark;
