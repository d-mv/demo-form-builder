import { atom, selector } from 'recoil';

export const formViewState = atom({
  key: 'forms/view',
  default: false,
});

export const formViewSelector = selector({
  key: 'forms/view/selector',
  get: ({ get }) => get(formViewState),
  set: ({ set }, v) => set(formViewState, v),
});
