import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { FormBuilderPostData, ReactFormBuilder, TaskData } from 'react-form-builder2';
import { useEffect, useState } from 'react';

import classes from './Constructor.module.scss';
import {
  Body,
  Container,
  Footer,
  FormName,
  Header,
  ModalFooterButtons,
  modalIdState,
  MODAL_FOOTER_BUTTONS,
  selectedFormState,
  useWsService,
} from '../../../shared';
import { formBuilderState, formErrorState } from './Constructor.state';

export default function Constructor() {
  const closeModal = useResetRecoilState(modalIdState);

  const selectedFormId = useRecoilValue(selectedFormState);

  const [form, setForm] = useRecoilState(formBuilderState);

  const [formError, setFormError] = useRecoilState(formErrorState);

  // non-shareable state
  const [submitEnabled, setSubmitEnabled] = useState(false);

  // non-shareable state
  const [taskData, setTaskData] = useState([] as TaskData[]);

  // auto-fill state with data
  useEffect(() => {
    // editing the form
    if (selectedFormId) setTaskData(form.data);
  }, [form, selectedFormId, setForm]);

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

  const { send } = useWsService();

  function handleFooterClick(id: string) {
    if (id === ModalFooterButtons.CANCEL) closeModal();

    if (id === ModalFooterButtons.SAVE) {
      closeModal();
      send('addForm', { ...form, data: taskData });
    }
  }

  return (
    <Container>
      <Header onClick={closeModal} title='Build Form' />
      <Body className={classes.body}>
        <FormName onChange={handleNameChange} value={form.name} error={formError} />
        <ReactFormBuilder
          saveAlways={true}
          onPost={handleChange}
          // @ts-ignore -- data is missing in types, but available
          data={selectedFormId ? form.data : []}
        />
      </Body>
      <Footer
        onClick={handleFooterClick}
        buttons={MODAL_FOOTER_BUTTONS}
        statuses={{ [ModalFooterButtons.SAVE]: submitEnabled ? '' : 'disabled' }}
      />
    </Container>
  );
}
