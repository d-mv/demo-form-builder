import { useEffect } from 'react';
import { FormBuilderPostData, ReactFormBuilder, TaskData } from 'react-form-builder2';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formBuilder, formBuilderState } from './FormBuilder.state';

interface FormBuilderProps {
  onChange: (arg1: TaskData[]) => void;
}

export function FormBuilder({ onChange }: FormBuilderProps) {
  function handleChange(data: FormBuilderPostData) {
    onChange(data.task_data);
  }

  return <ReactFormBuilder onPost={handleChange} />;
}
