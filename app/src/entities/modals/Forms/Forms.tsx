import { ifTrue, logger } from '@mv-d/toolbelt';
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
  useWsService,
  formBuilderSelector,
  formBuilderState,
} from '../../../shared';
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

  const { send } = useWsService();

  function sendForm(formId: string) {
    closeModal();
    send('sendForm', formId);
  }

  function handleClick(id: string) {
    return function call() {
      // in View mode, we just send the form id, not the form itself
      if (isViewMode) return sendForm(id);

      const form = forms.items.find(f => f._id === id);

      if (!form) return logger.error(`No form found ${id}`);

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
    return <FormButton key={form._id} id={form._id} label={form.name} onClick={handleClick(form._id)} />;
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
      <Header onClick={closeModal} title='Forms' />
      <Body className={classes.container}>
        {forms.items.map(renderFormButton)}
        {ifTrue(!isViewMode, renderAddNewButton)}
      </Body>
    </Container>
  );
}
