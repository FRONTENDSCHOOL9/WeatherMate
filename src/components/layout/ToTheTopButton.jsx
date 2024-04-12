import { useState, useEffect } from 'react';

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
      className={`fixed bottom-24 right-5 bg-white rounded-full w-12 h-12 z-30 shadow-md transition-opacity flex justify-center items-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClick}
    >
      <img
        src="/public/01.svg"
        alt="To the top"
        className="w-6 h-6 text-primary"
      />
    </button>
  );
}

export default ToTheTopButton;
