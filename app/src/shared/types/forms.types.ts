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

// export interface FormAnswersDataItem extends FormGeneratorOnSubmitParams {
//   // label is missing on non-input elements
//   label?: string;
//   element: string;
//   text?: string;
// }

export interface FormItemBase {
  id: string;
}

export interface FormItemHeader extends FormItemBase {
  bold: boolean;
  element: 'Header';
  italic: boolean;
  text: string;
}

export interface FormItemParagraph extends FormItemBase {
  bold: boolean;
  element: 'Paragraph';
  italic: boolean;
  text: string;
}

export interface FormItemCheckboxes extends FormItemBase {
  element: 'Checkboxes';
  field_name: string;
  label: string;
  text: string;
  value: string[];
}

export interface FormItemTag {
  key: string;
  label: string;
  text: string;
  value: string;
}

export interface FormItemTags extends FormItemBase {
  element: 'Tags';
  field_name: 'tags_B1BFB49D-E12A-44E8-9F64-8BA23EE03DC3';
  label: 'Placeholder label';
  text: 'Tags';
  value: FormItemTag[];
}

export type FormAnswersDataItem = FormItemTags | FormItemCheckboxes | FormItemParagraph | FormItemHeader;

export interface FormAnswers {
  formId: string;
  formName: string;
  data: FormAnswersDataItem[];
}
