/*eslint-disable */
function LocationKeywords({ id, label, selected, onClick, img_src }) {
  return (
    <div className=" flex flex-wrap flex-col h-[100px] font-sans">
      <div
        className={`bg-white hover:bg-primary flex flex-col justify-center items-center gap-5 `}
        onClick={() => onClick(id)}
      >
        <img src={img_src} className="w-10 h-10" />
        {label}
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
