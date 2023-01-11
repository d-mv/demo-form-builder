import { atom, selector } from 'recoil';

export const formBuilderState = atom({
  key: 'form/builder',
  default: {},
});

export const formBuilder = selector({
  key: 'formBuilder',
  get: ({ get }) => get(formBuilderState),
  set: ({ set }) => set(formBuilderState, ''),
});
