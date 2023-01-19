import rfdc from 'rfdc';
import { AnyValue, Optional, R } from '@mv-d/toolbelt';
import { FormGeneratorOnSubmitParams, ReactFormGenerator, TaskData, Option } from 'react-form-builder2';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  alertsState,
  Body,
  Container,
  formReviewSelector,
  formViewState,
  Header,
  makeError,
  modalIdSelector,
  useWsService,
} from '../../../shared';
import classes from './UseForm.module.scss';

const clone = rfdc({ proto: false, circles: false });

export default function UseForm() {
  const form = useRecoilValue(formReviewSelector);

  const setAlert = useSetRecoilState(alertsState);

  const resetForm = useResetRecoilState(formViewState);

  const closeModal = useResetRecoilState(modalIdSelector);

  const { send } = useWsService();

  function handleSubmitAnswers(answers: FormGeneratorOnSubmitParams[]) {
    if (!form) return;

    // if at least some answers are missing -> raise error
    if (answers.some(answer => !answer.value || R.isNil(answer.value)))
      return R.compose(setAlert, makeError)('No input');

    function mapData(taskData: TaskData) {
      // get every value needed
      const item: Pick<TaskData, 'id' | 'element'> & { value?: Optional<AnyValue> } = R.pick(
        ['bold', 'id', 'element', 'italic', 'field_name', 'text', 'label', 'custom_name'],
        taskData,
      );

      // add values
      if (R.path(['field_name'], item)) {
        // find value in answers, that match current data item
        const value = answers.find(answer => answer.name === R.path(['field_name'], item))?.value;

        // mapper for checkbox options -> add isChecked property
        const mapOptions = (option: Option) => {
          if (value?.includes(option.key)) return { ...option, isChecked: true };

          return option;
        };

        // some element required custom processing
        if (item.element === 'Checkboxes' && 'options' in taskData) item.value = taskData.options.map(mapOptions);
        else item.value = value;
      }

      return item;
    }

    const data = form.data.map(mapData);

    resetForm();
    send('addAnswers', { formId: form?._id, formName: form?.name, data });
    closeModal();
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
