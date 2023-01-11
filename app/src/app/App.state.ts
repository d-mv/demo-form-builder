import { atom, selector } from 'recoil';

export const appState = atom({
  key: 'app/isLoading',
  default: true,
});

export const appIsLoading = selector({
  key: 'app/isLoading',
  get: ({ get }) => get(appState),
});
