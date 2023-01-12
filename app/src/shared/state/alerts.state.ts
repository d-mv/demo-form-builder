import { atom, selector } from 'recoil';

export const alertsState = atom({ key: 'alerts', default: '' });

export const alertsSelector = selector({
  key: 'alerts/selector',
  get: ({ get }) => get(alertsState),
  set: ({ set }, v) => set(alertsState, v),
});
