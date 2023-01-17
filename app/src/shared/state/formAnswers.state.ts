import { Optional } from '@mv-d/toolbelt';
import { atom, selector } from 'recoil';
import { FormAnswers } from '../types';

const a: FormAnswers = {
  formId: 'c9812698-44f1-456f-9cb5-2a731040fa63',
  formName: 'some_forms',
  data: [
    {
      custom_name: 'tags_106F0C41-66F7-48C3-9BB0-8955A0521A51',
      name: 'tags_106F0C41-66F7-48C3-9BB0-8955A0521A51',
      label: 'These are tags',
      value: [
        // @ts-ignore -- temp
        {
          key: 'tags_option_26F88CFE-40D3-4458-8613-BC4745B545CE',
          label: 'Place holder option 3',
          text: 'Place holder option 3',
          value: 'place_holder_tag_3',
        },
        // @ts-ignore -- temp
        {
          key: 'tags_option_26F88CFE40D3-4458-8613-BC4745B545CE',
          label: 'Place holder option 3',
          text: 'Place holder option 3',
          value: 'place_holder_tag_3',
        },
      ],
    },
  ],
};

export const formAnswersState = atom<Optional<FormAnswers>>({
  key: 'form/answers',
  // default: undefined,
  default: a,
});

// TODO: do we need it or we can use reset/set/value hooks
// directly WITH state atom?
export const formAnswersSelector = selector({
  key: 'form/answers/selector',
  get: ({ get }) => get(formAnswersState),
  set: ({ set }, v) => set(formAnswersState, v),
});
