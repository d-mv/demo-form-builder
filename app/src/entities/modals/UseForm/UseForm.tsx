import rfdc from 'rfdc';
import { FormGeneratorOnSubmitParams, ReactFormGenerator } from 'react-form-builder2';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import {
  Body,
  Container,
  formAnswersState,
  formReviewSelector,
  formViewState,
  Header,
  modalIdSelector,
  useWsService,
} from '../../../shared';
import classes from './UseForm.module.scss';

const clone = rfdc({ proto: false, circles: false });

export default function UseForm() {
  const form = useRecoilValue(formReviewSelector);

  const resetForm = useResetRecoilState(formViewState);

  const closeModal = useResetRecoilState(modalIdSelector);

  const { send } = useWsService();

  function handleSubmitAnswers(info: FormGeneratorOnSubmitParams[]) {
    if (!form) return;

    resetForm();
    send('addAnswers', { formId: form?.id, formName: form?.name, data: info });
  }

  if (!form) return null;

  return (
    <Container>
      <Header onClick={closeModal} title={form.name} />
      <Body className={classes.container}>
        <ReactFormGenerator
          // required prop
          form_action=''
          // required prop
          form_method=''
          onSubmit={handleSubmitAnswers}
          data={form.data.map(clone)}
        />
      </Body>
    </Container>
  );
}
