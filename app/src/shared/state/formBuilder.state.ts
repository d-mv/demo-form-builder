import { atom, selector } from 'recoil';

import { FormItem } from '../types';

export const formErrorState = atom<string>({
  key: 'form/error',
  default: '',
});

export const formBuilderState = atom<FormItem>({
  key: 'form/builder',
  default: { data: [], name: '', _id: '' },
});

export const formBuilderSelector = selector({
  key: 'form/builder/selector',
  get: ({ get }) => get(formBuilderState),
  set: ({ set }, v) => set(formBuilderState, v),
});
