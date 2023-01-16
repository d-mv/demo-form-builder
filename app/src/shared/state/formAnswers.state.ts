import { Optional } from '@mv-d/toolbelt';
import { FormGeneratorOnSubmitParams } from 'react-form-builder2';
import { atom, selector } from 'recoil';

export const formAnswersState = atom<
  Optional<{ formId: string; formName: string; data: FormGeneratorOnSubmitParams[] }>
>({
  key: 'form/answers',
  default: undefined,
});

// TODO: do we need it or we can use reset/set/value hooks
// directly WITH state atom?
export const formAnswersSelector = selector({
  key: 'form/answers/selector',
  get: ({ get }) => get(formAnswersState),
  set: ({ set }, v) => set(formAnswersState, v),
});
