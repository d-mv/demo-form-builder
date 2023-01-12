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
} from '../../../shared';
import { formBuilderSelector, formBuilderState } from '../Constructor';
import classes from './Forms.module.scss';

export default function Forms() {
  const closeModal = useResetRecoilState(modalIdSelector);

  const setForm = useSetRecoilState(selectedFormSelector);

  const resetSelectedForm = useResetRecoilState(selectedFormSelector);

  const resetFormBuilder = useResetRecoilState(formBuilderState);

  const setModal = useSetRecoilState(modalIdSelector);

  const forms = useRecoilValue(formsSelector);

  const setBuilderForm = useSetRecoilState(formBuilderSelector);

  function handleClose() {
    closeModal();
  }

  function handleClick(id: string) {
    return function call() {
      const form = forms.find(f => f.id === id);

      if (form) {
        setForm(id);
        setBuilderForm(form);
        setModal(MODALS_ENUM.FORM_EDIT);
      } else {
        // eslint-disable-next-line no-console
        console.log(`no form found ${id}`);
      }
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

  return (
    <Container>
      <Header onClick={handleClose} title='Forms' />
      <Body className={classes.container}>
        {forms.map(renderFormButton)}
        <button key='add-new' className={classes['add-button']} id='add-new' onClick={handleAddNew}>
          <p className='p4'>Add new...</p>
        </button>
      </Body>
    </Container>
  );
}
