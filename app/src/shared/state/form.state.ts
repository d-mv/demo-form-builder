import { TaskData } from 'react-form-builder2';
import { atom, selector } from 'recoil';

export type FormItem = {
  id: string;
  name: string;
  // possibly string?
  data: TaskData[];
};

export const selectedForm = atom<string>({
  key: 'forms/selected',
  default: '',
});

export const selectedFormSelector = selector({
  key: 'forms/selected/selector',
  get: ({ get }) => get(selectedForm),
  set: ({ set }, v) => set(selectedForm, v),
});

export const forms = atom<FormItem[]>({
  key: 'forms/items',
  default: [
    {
      id: 'some_id',
      name: 'Some form #1',
      data: [
        {
          canHaveAlternateForm: true,
          canHaveAnswer: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canHavePageBreakBefore: true,
          canPopulateFromApi: true,
          // @ts-ignore --- temp
          element: 'EmailInput',
          field_name: 'email_input_9183EBAD-7D49-4D23-AD39-CE92B1758BEE',
          group_name: undefined,
          id: 'FB236C9B-F3B2-4240-9DC8-F45CC80A34B5',
          inline: undefined,
          label: 'E-Mail',
          required: false,
          showDescription: undefined,
          static: undefined,
          text: 'Email',
        },
      ],
    },
    {
      id: 'some_id2',
      name: 'Some form #2',
      data: [
        {
          canHaveAlternateForm: true,
          canHaveAnswer: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canHavePageBreakBefore: true,
          canPopulateFromApi: true,
          // @ts-ignore --- temp
          element: 'EmailInput',
          field_name: 'email_input_9183EBAD-7D49-4D23-AD39-CE92B1758BEE',
          group_name: undefined,
          id: 'FB236C9B-F3B2-4240-9DC8-F45CC80A34B5',
          inline: undefined,
          label: 'E-Mail',
          required: false,
          showDescription: undefined,
          static: undefined,
          text: 'Email',
        },
      ],
    },
    {
      id: 'some_id3',
      name: 'Some form #3',
      data: [
        {
          canHaveAlternateForm: true,
          canHaveAnswer: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canHavePageBreakBefore: true,
          canPopulateFromApi: true,
          // @ts-ignore --- temp
          element: 'EmailInput',
          field_name: 'email_input_9183EBAD-7D49-4D23-AD39-CE92B1758BEE',
          group_name: undefined,
          id: 'FB236C9B-F3B2-4240-9DC8-F45CC80A34B5',
          inline: undefined,
          label: 'E-Mail',
          required: false,
          showDescription: undefined,
          static: undefined,
          text: 'Email',
        },
      ],
    },
  ],
});

export const formsSelector = selector({
  key: 'forms/items/selector',
  get: ({ get }) => get(forms),
});
