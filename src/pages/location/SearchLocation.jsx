import { useState } from 'react';
import Location from './Location';
import { useDebounce } from '../../hooks/useDebounce';

// 장소추천 자식 컴포넌트 (검색 | 보여주기)
function SearchLocation() {
  const [keyword, setKeyword] = useState('');

  // useDebounce 훅을 사용하여 입력값에 대한 디바운스 처리
  const debouncedKeyword = useDebounce(keyword, 2000);

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 여기에서 실제 검색을 수행할 수도 있습니다.
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            w-64 h-8"
          type="text"
          value={keyword}
          onChange={handleChange}
        />
        <button type="submit" className="bg-primary px-3">
          검색
        </button>
      </form>
      <Location keyword={debouncedKeyword} /> {/* 디바운스된 키워드를 전달 */}
    </>
  );
}

export default SearchLocation;
