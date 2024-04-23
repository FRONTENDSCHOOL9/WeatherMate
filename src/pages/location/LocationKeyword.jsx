/*eslint-disable */
function LocationKeywords({ id, label, selected, onClick, img_src }) {
  return (
    <div className=" flex flex-wrap flex-col h-[100px] font-sans">
      <div
        className={` flex flex-col justify-center items-center`}
        onClick={() => onClick(id)}
      >
        <div className="w-20 flex bg-white hover:bg-slate-200 p-2 rounded-xl justify-center items-center text-center transition-all duration-500 ">
          <div className="justify-center items-center">
            <img src={img_src} className="w-10 h-10" />
            <p className="mt-1">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationKeywords;

// 필요한 svg

// 관광지
// 문화시설
// 행사
// 여행지
// 레포츠
// 숙박
// 쇼핑
// 음식점
