import { TaskData } from 'react-form-builder2';
import { atom, DefaultValue, selector } from 'recoil';

export type FormItem = {
  id: string;
  name: string;
  // possibly string?
  data: TaskData[];
};

export type FormItemDb = {
  id: string;
  name: string;
  data: string;
};

export const formReviewState = atom<FormItem>({
  key: 'forms/review',
});

export const formReviewSelector = selector({
  key: 'forms/review/selector',
  get: ({ get }) => get(formReviewState),
  set: ({ set }, v) => set(formReviewState, v),
});

export const formViewState = atom({
  key: 'forms/view',
  default: false,
});

export const formViewSelector = selector({
  key: 'forms/view/selector',
  get: ({ get }) => get(formViewState),
  set: ({ set }, v) => set(formViewState, v),
});

export const selectedFormState = atom<string>({
  key: 'forms/selected',
  default: '',
});

export const selectedFormSelector = selector({
  key: 'forms/selected/selector',
  get: ({ get }) => get(selectedFormState),
  set: ({ set }, v) => set(selectedFormState, v),
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
  set: ({ set, get }, v) => {
    if (v instanceof DefaultValue) {
      set(forms, v);
      return;
    }

    // ids of incoming forms
    const ids = v.map(f => f.id);

    // remove existing duplicates
    const current = get(forms).filter(f => !ids.includes(f.id));

    current.push(...v);
    set(forms, current);
  },
});
