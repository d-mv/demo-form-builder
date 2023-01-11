import { atom, selector } from 'recoil';

export const modalOpenIdState = atom({ key: 'modal/openId', default: '' });

export const getModalCloseFn = selector({
  key: 'modalOpenId',
  get: ({ get }) => get(modalOpenIdState),
  set: ({ set }) => set(modalOpenIdState, ''),
});
