import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LocationAddReply from './LocationAddReply';
import Loading from '@components/layout/Loading';

import DetailPageHeader from '@components/layout/DetailPageHeader';
import LocationMap from '@pages/food/LocationMap';

import LocationBookMark from './LocationBookmark';
import LocationSuperDetail from './LocationSuperDetail';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function LocationDetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [homepageUrls, setHomepageUrls] = useState([]);
  const [isMoreView, setIsMoreView] = useState(false);

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
    fetchData();
  }, [id]);

  // const getOldReply = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://market-lion.koyeb.app/api/posts/1/replies`,
  //     );
  //     setOldReply(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(
  //       '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
  //       error,
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getOldReply();
  // }, [id]);

  if (!detailData) {
    return <Loading />;
  }

  const onClickMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  return (
    <>
      <DetailPageHeader title={'상세보기'} />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">{detailData.title}</h1>
        <img
          src={detailData.firstimage}
          alt="이미지1"
          className="my-4 w-full"
        />
        {homepageUrls.map((url, index) => (
          <button
            key={index}
            onClick={() => window.open(url, '_blank')}
            className="border-2"
          >
            홈페이지로 이동하기
          </button>
        ))}
        <table className="table-auto p-4 mb-6 bg-gray-100 dark:bg-gray-600 shadow-md rounded-lg">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>설명</td>
              <td>
                {isMoreView
                  ? detailData.overview
                  : detailData.overview.substring(0, 80) + '...'}
                <button
                  onClick={onClickMoreViewButton}
                  className="text-blue-500  left-0 "
                >
                  {isMoreView ? '접기' : '더보기'}
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-600 shadow-md rounded-lg">
          <p>
            설명:{' '}
            {isMoreView
              ? detailData.overview
              : detailData.overview.substring(0, 80) + '...'}
            <button onClick={onClickMoreViewButton} className="text-blue-500 ">
              {isMoreView ? '접기' : '더보기'}
            </button>
          </p>
        </div>

        <LocationMap
          latitude={Number(detailData.mapy)}
          longitude={Number(detailData.mapx)}
          locationName={detailData.title}
        />
        <p>
          주소: {detailData.addr1} ({detailData.addr2})
        </p>
        <LocationSuperDetail id={id} />
        <LocationBookMark />
        <LocationAddReply id={id} />
      </div>
    </>
  );
}
export default LocationDetailPage;
