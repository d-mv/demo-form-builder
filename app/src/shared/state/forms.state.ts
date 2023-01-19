import { atom, selector, DefaultValue } from 'recoil';

import { FormItem } from '../types';

export const formsState = atom<{ isLoading: boolean; items: FormItem[] }>({
  key: 'forms/items',
  default: {
    isLoading: false,
    items: [],
  },
});

export const formsSelector = selector({
  key: 'forms/items/selector',
  get: ({ get }) => get(formsState),
  set: ({ set, get }, v) => {
    if (v instanceof DefaultValue) {
      set(formsState, v);
      return;
    }

    // ids of incoming forms
    const ids = v.items.map(f => f._id);

    // remove existing duplicates
    const current = get(formsState).items.filter(f => !ids.includes(f._id));

    current.push(...v.items);
    set(formsState, { ...v, items: current });
  },
});
