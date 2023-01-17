import { FormGeneratorOnSubmitParams, TaskData } from 'react-form-builder2';

export type FormItem = {
  _id: string;
  name: string;
  // possibly string?
  data: TaskData[];
};

export type FormItemDb = {
  id: string;
  name: string;
  data: string;
};

export interface FormAnswersDataItem extends FormGeneratorOnSubmitParams {
  label: string;
}

export interface FormAnswers {
  formId: string;
  formName: string;
  data: FormAnswersDataItem[];
}
