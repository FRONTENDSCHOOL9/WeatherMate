/* eslint-disable */
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist(
  {
    key: 'saveUser',
    storage: sessionStorage,
  },
  {
    key: 'saveLike',
    storage: localStorage
  }
);

export const userWeatherState = atom({
  key: 'userWeatherState',
  default: null,
});

export const selectedLocationState = atom({
  key: 'selectedLocationState',
  default: { lat: null, lon: null },
});

export const likeState = atom({
  key: 'likeState',
  default: 0,
  effects: [persistAtom],
})


export const memberState = atom({
  key: 'useState',
  default: {
    id: '',
    name: '',
    email: '',
    password: ''
  },
  effects: [persistAtom],
});

