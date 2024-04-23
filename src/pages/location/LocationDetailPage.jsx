import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@components/layout/Loading';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import LocationMap from '@pages/location/LocationMap';
import LocationBookMark from './LocationBookmark';
import LocationAddReply from './LocationAddReply';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function LocationDetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [homepageUrls, setHomepageUrls] = useState([]);
  const [isMoreView, setIsMoreView] = useState(false);
  const [superDetail, setSuperDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=testweb&contentId=${id}&serviceKey=${apiKey}&_type=json&defaultYN=Y&firstImageYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`,
        );
        setDetailData(response.data.response.body.items.item[0]);

        // URL 추출 부분
        const regex = /<a href="(http[^"]+)"[^>]+>/g;
        let match;
        let urls = [];

        while (
          (match = regex.exec(
            response.data.response.body.items.item[0].homepage,
          )) !== null
        ) {
          urls.push(match[1]);
        }

        setHomepageUrls(urls);
      } catch (error) {
        console.error(
          '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
          error,
        );
      }
    };

    const fetchSuperDetail = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=testWeb&contentId=${id}&contentTypeId=12&serviceKey=${apiKey}&_type=json`,
        );
        setSuperDetail(response.data.response.body.items.item);
        setLoading(false);
      } catch (error) {
        console.error('데이터 패칭 실패', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    fetchSuperDetail();
  }, [id]);

  const onClickMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  if (!detailData || loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-50 py-20 bg-red-400">
        에러: {error.message}
      </div>
    );
  }

  return (
    <>
      <DetailPageHeader title={'상세보기'} />
      <div className="p-5  flex flex-col gap-4 sm:px-60">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold content-center ">
            {detailData.title}
          </h1>
          {homepageUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => window.open(url, '_blank')}
              className="bg-white border-2 rounded-xl p-2 text-sm text-indigo-400 font-bold  "
            >
              홈페이지로 이동하기
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="rounded-lg">
            <img
              src={detailData.firstimage}
              alt="이미지1"
              className=" w-full md:w- rounded-lg"
            />

            <table className="table-fixed rounded-lg bg-gray-100 ">
              <thead>
                <tr>
                  <th scope="col" className="w-24 px-6 py-3">
                    정보
                  </th>
                  <th scope="col" className="px-6 py-3">
                    내용
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center p-2">설명</td>
                  <td>
                    {detailData.overview
                      ? isMoreView
                        ? detailData.overview
                        : detailData.overview.substring(0, 40) + '...'
                      : '내용 없음'}
                    {detailData.overview && (
                      <button
                        onClick={onClickMoreViewButton}
                        className="text-blue-500  left-0 "
                      >
                        {isMoreView ? '접기' : '더보기'}
                      </button>
                    )}
                  </td>
                </tr>
                {superDetail?.length > 0 && (
                  <>
                    <tr>
                      <td className="text-center p-2">전화번호</td>
                      <td>
                        {superDetail[0].infocenter
                          ? superDetail[0].infocenter
                          : '내용 없음'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center p-2">주차 여부</td>
                      <td>
                        {superDetail[0].parking
                          ? superDetail[0].parking
                          : '내용 없음'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center p-2">이용 시간</td>
                      <td>
                        {' '}
                        {superDetail[0].usetime
                          ? superDetail[0].usetime
                          : '내용 없음'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center p-2">쉬는날</td>
                      <td>
                        {' '}
                        {superDetail[0].restdate
                          ? superDetail[0].restdate
                          : '내용 없음'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center p-2">카시트 이용 여부</td>
                      <td>
                        {' '}
                        {superDetail[0].chkbabycarriage
                          ? superDetail[0].chkbabycarriage
                          : '내용 없음'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center p-2">반려 동물 동반</td>
                      <td>
                        {' '}
                        {superDetail[0].chkpet
                          ? superDetail[0].chkpet
                          : '내용 없음'}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <p>
              주소: {detailData.addr1} ({detailData.addr2})
            </p>
            <LocationMap
              latitude={Number(detailData.mapy)}
              longitude={Number(detailData.mapx)}
              locationName={detailData.title}
            />
          </div>
        </div>
        <LocationBookMark />
        <LocationAddReply id={id} />
      </div>
    </>
  );
}
export default LocationDetailPage;
