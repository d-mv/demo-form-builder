import { Optional } from '@mv-d/toolbelt';
import { atom, selector } from 'recoil';
import { AlertType } from '../types';

export const alertsState = atom<Optional<AlertType>>({ key: 'alerts', default: undefined });

export const alertsSelector = selector({
  key: 'alerts/selector',
  get: ({ get }) => get(alertsState),
  set: ({ set }, v) => set(alertsState, v),
});
