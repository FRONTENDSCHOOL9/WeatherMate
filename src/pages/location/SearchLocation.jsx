import { useState } from 'react';
import Location from './Location';
import { useDebounce } from '../../hooks/useDebounce';
import { FaSearch } from 'react-icons/fa';

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
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <form onSubmit={handleSubmit}>
          <input
            className="border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            w-80 h-10"
            type="text"
            value={keyword}
            onChange={handleChange}
          />
          <button type="submit" className="px-3 relative right-10">
            <FaSearch />
          </button>
        </form>
      </div>
      <Location keyword={debouncedKeyword} />{' '}
    </>
  );
}

export default SearchLocation;
