import { TaskData } from 'react-form-builder2';

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
