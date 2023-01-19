import { Optional } from '@mv-d/toolbelt';
import { atom } from 'recoil';

import { FormAnswers } from '../types';

export const formAnswersState = atom<Optional<FormAnswers>>({
  key: 'form/answers',
  default: undefined,
});
