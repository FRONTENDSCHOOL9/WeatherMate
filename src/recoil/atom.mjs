/* eslint-disable */
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export const userWeatherState = atom({
  key: 'userWeatherState',
  default: null,
});

export const selectedLocationState = atom({
  key: 'selectedLocationState',
  default: { lat: null, lon: null },
});


const { persistAtom } = recoilPersist({
  key: 'saveUser',
  storage: sessionStorage
});

export const memberState = atom({
  key: 'useState',
  default: null,
  effects: [persistAtom],
});