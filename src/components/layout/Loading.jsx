function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-white opacity-70"></div>
      <div className="text-center relative">
        <img
          src="/loading5.gif"
          alt="로딩.."
          className="mx-auto mb-2 w-16 bg-primary"
        />
        <p className="text-gray-600 font-Ainmom text-2xl">로딩...</p>
      </div>
    </div>
  );
}

export default Loading;
