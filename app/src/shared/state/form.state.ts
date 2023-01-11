import { atom } from 'recoil';

type Form = {
  id: string;
};

export const forms = atom<Form[]>({
  key: 'forms',
  default: [],
});
