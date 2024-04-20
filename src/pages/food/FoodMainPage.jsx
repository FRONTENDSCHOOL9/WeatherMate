import LocationMap from '@pages/food/LocationMap';
// import KakaoMap from './KakaoMap';

function FoodMainPage() {
  return (
    <>
      <section className="relative border-b-2 border-gray_04 p-8">
        <button className="absolute top-15 left-15"> 뒤로가기 </button>
        <div className="flex justify-center">음식점 추천</div>
      </section>
      <section className="flex flex-col  items-center m-10">
        <div>
          현재 날씨 : 기온, 맑음 <p>오늘은 OO한 음식 어때요?</p>
        </div>
        <div>
          <p>현재 내 위치로 살펴보기</p>
          <LocationMap />
          <table className="table-auto">
            <thead>
              <tr>
                <th>상호명</th>
                <th>분류</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default FoodMainPage;
