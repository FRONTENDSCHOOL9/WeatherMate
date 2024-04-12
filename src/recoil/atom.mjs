import { atom } from 'recoil';

export const userWeatherState = atom({
  key: 'userWeatherState',
  default: null,
});


export const selectedLocationState = atom({
  key: 'selectedLocationState',
  default: { lat: null, lon: null },
});