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

  const moveToBookMarkPage = contentId => {
    navigate(`/location/${contentId}`);
  };

  const removeBookmark = contentId => {
    const updatedBookmarks = bookmarks.filter(
      bookmark => bookmark !== contentId,
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    // 새로운 북마크 데이터 배열 생성
    const updatedBookmarkData = bookmarkData.filter(
      item => item.contentid !== contentId,
    );
    setBookmarkData(updatedBookmarkData);
  };

  return (
    <div className="h-[300px] border-t-2 py-4 overflow-y-scroll">

      {loading ? (
        <Loading />
      ) : (
        <ul>
          {bookmarkData.map((item, index) => (
            <li key={index}>
              <div className="flex justify-between mb-8">
                <div className='flex gap-4'>
                  <img
                    src={item.firstimage ? item.firstimage : '/01.svg'}
                    className="w-20 h-20 rounded-3xl"
                  />
                  <p className="text-base mt-2 font-medium hover:text-primary_deep">{item.title}</p>
                </div>

                <div className='flex gap-1'>
                  <button
                    onClick={() => moveToBookMarkPage(item.contentid)}
                    className="bg-slate-100 ml-6 px-2 py-1 rounded-md font-medium text-sm text-slate-400 hover:text-slate-800 h-9"
                  >
                    이동
                  </button>
                  <button
                    onClick={() => removeBookmark(item.contentid)}
                    className="bg-slate-100 ml-6 px-2 py-1 rounded-md font-medium text-sm text-slate-400 hover:bg-primary hover:text-slate-800 h-9"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationBookMark;
