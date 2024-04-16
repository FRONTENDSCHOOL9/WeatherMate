import { useState, useEffect } from 'react';


// 현재위치를 경도와 위도를 반환해주는 customHooks
function useCurrentLocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      } catch (error) {
        setError(error.message);
      }
    };

    getLocation();
  }, []);

  return { latitude, longitude, error };
}

export default useCurrentLocation;
