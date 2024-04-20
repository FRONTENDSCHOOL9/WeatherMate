import axios from 'axios';
import { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

/* eslint-disable */
function LocationSuperDetail({ id }) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=testWeb&contentId=${id}&contentTypeId=12&serviceKey=${apiKey}&_type=json`,
        );
        setDetail(response.data.response.body.items.item);
        setLoading(false);
      } catch (error) {
        console.error('데이터 패칭 실패', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchAbout();
  }, [id]);

  console.log('슈퍼디테일', detail);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-50 py-20 bg-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-50 py-20 bg-red-400">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      {detail && (
        <div className="max-w-md mx-auto bg-gray-100 rounded-xl overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0"></div>
            <div className="p-8">
              <p className="mt-2 text-gray-500">{detail[0].description}</p>
              <div className="mt-4">
                <p className="text-gray-700">쉬는날: {detail[0].restdate}</p>
                <p className="text-gray-700">
                  전화번호: {detail[0].infocenter}
                </p>
                <p className="text-gray-700">
                  차량 주차 여부: {detail[0].parking}
                </p>
                <p className="text-gray-700">
                  아이 카시트 이용 가능 여부: {detail[0].chkbabycarriage}
                </p>
                <p className="text-gray-700">
                  신용카드 사용 가능 여부: {detail[0].chkcreditcard}
                </p>
                <p className="text-gray-700">
                  애완동물 동반 가능 여부: {detail[0].chkpet}
                </p>
                <p className="text-gray-700">
                  인포정보: {detail[0].infocenter}
                </p>
                <p className="text-gray-700">이용시간 :{detail[0].usetime}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationSuperDetail;
