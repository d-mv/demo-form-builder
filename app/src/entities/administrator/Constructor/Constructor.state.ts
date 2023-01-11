import { TaskData } from 'react-form-builder2';
import { atom, selector } from 'recoil';

export const formErrorState = atom<string>({
  key: 'form/error',
  default: '',
});

export const formError = selector({
  key: 'formError',
  get: ({ get }) => get(formErrorState),
  set: ({ set }, value) => set(formErrorState, value),
});

export const formBuilderState = atom<{ data: TaskData[]; name: string }>({
  key: 'form/builder',
  default: { data: [], name: '' },
});

// export const formBuilder = selector({
//   key: 'formBuilder',
//   get: ({ get }) => get(formBuilderState),
//   set: ({ set }, value) => set(formBuilderState, value),
// });
