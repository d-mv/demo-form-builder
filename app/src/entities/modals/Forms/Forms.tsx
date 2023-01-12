import { ifTrue } from '@mv-d/toolbelt';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  Body,
  formsSelector,
  Header,
  FormItem,
  FormButton,
  Container,
  selectedFormSelector,
  modalIdSelector,
  MODALS_ENUM,
  formViewState,
} from '../../../shared';
import { formBuilderSelector, formBuilderState } from '../../administrator/Constructor';
import classes from './Forms.module.scss';

export default function Forms() {
  const closeModal = useResetRecoilState(modalIdSelector);

  const setForm = useSetRecoilState(selectedFormSelector);

  const resetSelectedForm = useResetRecoilState(selectedFormSelector);

  const resetFormBuilder = useResetRecoilState(formBuilderState);

  const setModal = useSetRecoilState(modalIdSelector);

  const forms = useRecoilValue(formsSelector);

  const isViewMode = useRecoilValue(formViewState);

  const setBuilderForm = useSetRecoilState(formBuilderSelector);

  function handleClose() {
    closeModal();
  }

  function sendForm(formId: string) {
    closeModal();
    // eslint-disable-next-line no-console
    console.log(`sending... ${formId}`);
  }

  function handleClick(id: string) {
    return function call() {
      if (isViewMode) return sendForm(id);

      const form = forms.find(f => f.id === id);

      if (!form) {
        // eslint-disable-next-line no-console
        console.log(`no form found ${id}`);
        return;
      }

      setForm(id);
      setBuilderForm(form);
      setModal(MODALS_ENUM.FORM_EDIT);
    };
  }

  function handleAddNew() {
    resetSelectedForm();
    resetFormBuilder();
    setModal(MODALS_ENUM.ADD_NEW);
  }

  function renderFormButton(form: FormItem) {
    return <FormButton key={form.id} id={form.id} label={form.name} onClick={handleClick(form.id)} />;
  }

  function renderAddNewButton() {
    return (
      <button key='add-new' className={classes['add-button']} id='add-new' onClick={handleAddNew}>
        <p className='p4'>Add new...</p>
      </button>
    );
  }

  return (
    <Container>
      <Header onClick={handleClose} title='Forms' />
      <Body className={classes.container}>
        {forms.map(renderFormButton)}
        {ifTrue(!isViewMode, renderAddNewButton)}
      </Body>
    </Container>
  );
}