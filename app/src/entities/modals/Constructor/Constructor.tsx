import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import rfdc from 'rfdc';
import { AnyValue, R } from '@mv-d/toolbelt';
import { FormBuilderPostData, ReactFormBuilder, TaskData } from 'react-form-builder2';
import { useContext, useEffect, useRef, useState } from 'react';

import classes from './Constructor.module.scss';
import {
  Body,
  CONFIG,
  Container,
  Footer,
  formBuilderState,
  formErrorState,
  FormName,
  Header,
  ModalFooterButtons,
  modalIdState,
  MODAL_FOOTER_BUTTONS,
  selectedFormState,
  useWsService,
} from '../../../shared';
import { ModalsContext } from '..';

const clone = rfdc({ proto: false, circles: false });

export default function Constructor() {
  const ref = useRef<AnyValue>(null);

  const { send } = useWsService();

  const closeModal = useResetRecoilState(modalIdState);

  // in edit mode
  const selectedFormId = useRecoilValue(selectedFormState);

  const [form, setForm] = useRecoilState(formBuilderState);

  const [formError, setFormError] = useRecoilState(formErrorState);

  // non-shareable state
  const [submitEnabled, setSubmitEnabled] = useState(false);

  // non-shareable state
  const [taskData, setTaskData] = useState([] as TaskData[]);

  const { onLoad } = useContext(ModalsContext);

  // initial loading of the library can be slow => Modals is rendering
  // 'Loading...'; once library is rendering, call to Modals to remove it
  useEffect(() => {
    if (ref.current) onLoad();
  }, [ref, onLoad]);

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

  // when using Strict mode, React renders everything twice, generating problems for the library
  if (CONFIG.isDev && R.path(['__isReactDndBackendSetUp'], window)) {
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

  function handleFooterClick(id: string) {
    if (id === ModalFooterButtons.CANCEL) closeModal();

    if (id === ModalFooterButtons.SAVE) {
      closeModal();

      // TODO: move below into WsService hook?
      // drop the _id for compatibility with the backend
      if (selectedFormId) send('updateForm', { ...form, data: taskData });
      else send('addForm', R.omit(['_id'], { ...form, data: taskData }));
    }
  }

  return (
    <Container>
      <Header onClick={closeModal} title='Build Form' />
      <Body className={classes.body}>
        <FormName onChange={handleNameChange} value={form.name} error={formError} />
        <ReactFormBuilder
          ref={ref}
          saveAlways={true}
          onPost={handleChange}
          // @ts-ignore -- data is missing in types, but available
          data={selectedFormId ? form.data.map(clone) : []}
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
