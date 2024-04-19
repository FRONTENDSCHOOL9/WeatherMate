function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-white "></div>
      <div className="text-center relative">
        <img
          src="/loading.gif"
          alt="로딩 중"
          className="mx-auto mb-2 w-16 bg-primary"
        />
        <p className="text-gray-600">로딩 중입니다</p>
      </div>
    </div>
  );
}

export default Loading;
