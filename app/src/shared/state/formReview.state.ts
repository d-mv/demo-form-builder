import { Optional } from '@mv-d/toolbelt';
import { atom, selector } from 'recoil';

import { FormItem } from '../types';

export const formReviewState = atom<Optional<FormItem>>({
  key: 'forms/review',
  default: undefined,
});

export const formReviewSelector = selector({
  key: 'forms/review/selector',
  get: ({ get }) => get(formReviewState),
  set: ({ set }, v) => set(formReviewState, v),
});
