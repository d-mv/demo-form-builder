import { atom, selector } from 'recoil';

export const selectedFormState = atom<string>({
  key: 'forms/selected',
  default: '',
});

export const selectedFormSelector = selector({
  key: 'forms/selected/selector',
  get: ({ get }) => get(selectedFormState),
  set: ({ set }, v) => set(selectedFormState, v),
});
