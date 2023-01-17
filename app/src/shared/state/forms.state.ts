import { atom, selector, DefaultValue } from 'recoil';

import { FormItem } from '../types';

export const forms = atom<{ isLoading: boolean; items: FormItem[] }>({
  key: 'forms/items',
  default: {
    isLoading: false,
    items: [],
  },
});

export const formsSelector = selector({
  key: 'forms/items/selector',
  get: ({ get }) => get(forms),
  set: ({ set, get }, v) => {
    if (v instanceof DefaultValue) {
      set(forms, v);
      return;
    }

    // ids of incoming forms
    const ids = v.items.map(f => f._id);

    // remove existing duplicates
    const current = get(forms).items.filter(f => !ids.includes(f._id));

    current.push(...v.items);
    set(forms, { ...v, items: current });
  },
});
