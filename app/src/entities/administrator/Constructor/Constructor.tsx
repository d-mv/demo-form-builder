import { useRecoilState, useSetRecoilState } from 'recoil';
import { FormBuilderPostData, ReactFormBuilder, TaskData } from 'react-form-builder2';
import { useEffect, useState } from 'react';

import classes from './Constructor.module.scss';
import {
  Body,
  Footer,
  FormName,
  getModalCloseFn,
  Header,
  ModalFooterButtons,
  MODAL_FOOTER_BUTTONS,
} from '../../../shared';
import { formBuilderState, formErrorState } from './Constructor.state';

export default function Constructor() {
  const modalCloseFn = useSetRecoilState(getModalCloseFn);

  // there is some issue with using Recoil for this data
  const [taskData, setTaskData] = useState([] as TaskData[]);

  const [form, setForm] = useRecoilState(formBuilderState);

  const [formError, setFormError] = useRecoilState(formErrorState);

  // non-shareable state
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    if (taskData.length && !form.name) setFormError("Please, don't forget the name");
  }, [taskData, form.name, setFormError]);

  useEffect(() => {
    if (taskData.length && form.name && !submitEnabled) setSubmitEnabled(true);
    else if ((!taskData.length || !form.name) && submitEnabled) setSubmitEnabled(false);
  }, [taskData, form.name, formError, submitEnabled]);

  // temporary hack to avoid double html5 backend
  // TODO: research older react version
  // @ts-ignore -- temp
  if (window.__isReactDndBackendSetUp) {
    // @ts-ignore -- temp
    window.__isReactDndBackendSetUp = false;
  }

  function handleChange(data: FormBuilderPostData) {
    setTaskData(data.task_data);
  }

  function handleNameChange(name: string) {
    if (formError && Boolean(name)) setFormError('');

    setForm({ ...form, name });
  }

  function handleClose() {
    modalCloseFn('');
  }

  function handleFooterClick(id: string) {
    if (id === ModalFooterButtons.CANCEL) modalCloseFn('');
  }

  return (
    <div className={classes.container}>
      <Header onClick={handleClose} title='Build Form' />
      <Body className={classes.body}>
        <FormName onChange={handleNameChange} error={formError} />
        <ReactFormBuilder saveAlways={true} onPost={handleChange} />
      </Body>
      <Footer
        onClick={handleFooterClick}
        buttons={MODAL_FOOTER_BUTTONS}
        statuses={{ [ModalFooterButtons.SAVE]: submitEnabled ? '' : 'disabled' }}
      />
    </div>
  );
}
