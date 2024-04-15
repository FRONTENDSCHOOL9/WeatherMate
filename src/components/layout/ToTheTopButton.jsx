import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ToTheTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 위치에 따라 버튼을 표시 또는 숨깁니다.
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤되도록 설정
    });
  };

  return (
    <button
      className={`fixed bottom-24 right-5 text-primary bg-white rounded-full w-14 h-14 z-30 shadow-md transition-opacity flex justify-center items-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClick}
    >
      <FaArrowUp className="font-bold text-2xl" />
    </button>
  );
}

export default ToTheTopButton;
