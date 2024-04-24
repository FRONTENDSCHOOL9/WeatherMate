import { useEffect } from 'react';
import PropTypes from 'prop-types';
LocationMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  locationName: PropTypes.string.isRequired,
};

function LocationMap({ latitude, longitude, locationName }) {
  useEffect(() => {
    //map
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    //마커 설정
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    //길찾기 설정
    const iwContent = `<div> ${locationName || '위치 정보 없음'}<a href="https://map.kakao.com/link/to/${locationName},${latitude},${longitude}"  target="_blank">길찾기</a></div>`;
    const iwPosition = new window.kakao.maps.LatLng(latitude, longitude);
    //연결
    const infowindow = new window.kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infowindow.open(map, marker);
  }, [latitude, longitude, locationName]);
  return (
    <div id="map" className="z-[-10] w-full h-80 xl:h-100 rounded-lg"></div>
  );
}

export default LocationMap;
// style={{ width: '100%', height: '250px' }}
