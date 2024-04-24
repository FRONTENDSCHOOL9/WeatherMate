function Loading2() {
  return (
    <div className=" flex items-center justify-center z-50">
      <div className="text-center mt-3">
        <img
          src="/loading.gif"
          alt="장소추천 중.."
          className="mx-auto mb-2 w-16"
        />
        <p className="text-gray-600  text-sm">
          웨더메이트가 고심해서 장소를 추천 중이에요!
        </p>
      </div>
    </div>
  );
}

export default Loading2;
