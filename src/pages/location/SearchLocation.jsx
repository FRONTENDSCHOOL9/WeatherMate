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
    <div className="sm:px-48">
      <div className="flex justify-center items-center mt-[2rem] w-full mb-6">
        <form onSubmit={handleSubmit} className="relative">
          <input
            className=" w-[100%] border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black h-[2.5rem] pl-10 font-bold" // 버튼의 너비만큼 왼쪽 여백 추가
            placeholder="장소 검색 ex)서울"
            type="text"
            value={keyword}
            onChange={handleChange}
          />
          <button type="submit" className="absolute left-2 top-3">
            <FaSearch className="text-slate-300 focus:outline-none" />
          </button>
        </form>
      </div>
      <Location keyword={debouncedKeyword} />
    </div>
  );
}

export default SearchLocation;
