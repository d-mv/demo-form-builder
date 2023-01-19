import { Optional } from '@mv-d/toolbelt';
import { atom, selector } from 'recoil';
import { FormAnswers } from '../types';

const a: FormAnswers = {
  formId: 'c9812698-44f1-456f-9cb5-2a731040fa63',
  formName: 'some_forms',
  data: [
    {
      id: '111',
      bold: false,
      element: 'Header',
      italic: false,
      text: 'Header Text',
    },
    {
      id: '111',
      bold: false,
      element: 'Paragraph',
      italic: false,
      text: 'Paragraph',
    },
    {
      id: '111',
      element: 'Checkboxes',
      field_name: 'tags_B1BFB49D-E12A-44E8-9F64-8BA23EE03DC3',
      label: 'Placeholder label',
      text: 'Tags',
      value: ['checkboxes_option_9971931E-CECE-47FE-AF8B-7C2A64A5A937'],
    },
    {
      id: '111',
      element: 'Tags',
      field_name: 'tags_B1BFB49D-E12A-44E8-9F64-8BA23EE03DC3',
      label: 'Placeholder label',
      text: 'Tags',
      value: [
        {
          key: 'tags_option_DB8A18ED-F678-456C-A51C-8D4B8C469589',
          label: 'Place holder option 3',
          text: 'Place holder option 3',
          value: 'place_holder_tag_3',
        },
        {
          key: 'tags_option_DB8A18ED-F678-456C-A51C-8D4B8469589',
          label: 'Place holder option 2',
          text: 'Place holder option 2',
          value: 'place_holder_tag_2',
        },
      ],
    },
  ],
};

export const formAnswersState = atom<Optional<FormAnswers>>({
  key: 'form/answers',
  default: undefined,
  // default: a,
});

// TODO: do we need it or we can use reset/set/value hooks
// directly WITH state atom?
export const formAnswersSelector = selector({
  key: 'form/answers/selector',
  get: ({ get }) => get(formAnswersState),
  set: ({ set }, v) => set(formAnswersState, v),
});
