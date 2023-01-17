import { atom, selector } from 'recoil';

export const MODALS_ENUM = {
  FORMS: 'Forms',
  ADMINISTRATOR: 'Administrator',
  FORM_EDIT: 'formEdit',
  USE: 'Use',
  REVIEW: 'Review',
  ADD_NEW: 'addNew',
  NONE: 'none',
  ANSWERS: 'answers',
} as const;

type ModalsEnumKeys = keyof typeof MODALS_ENUM;

export type ModalsEnum = typeof MODALS_ENUM[ModalsEnumKeys];

export const modalIdState = atom<ModalsEnum>({ key: 'modal/id', default: MODALS_ENUM.NONE });

export const modalIdSelector = selector({
  key: 'modal/id/selector',
  get: ({ get }) => get(modalIdState),
  set: ({ set }, v) => set(modalIdState, v),
});
