import rfdc from 'rfdc';
import { R } from '@mv-d/toolbelt';
import { FormGeneratorOnSubmitParams, ReactFormGenerator } from 'react-form-builder2';
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

  function handleSubmitAnswers(info: FormGeneratorOnSubmitParams[]) {
    if (!form) return;

    // eslint-disable-next-line no-console
    console.log(form, info);

    // if at least some are missing answers -> raise error
    if (info.some(el => !el.value || R.isNil(el.value))) return R.compose(setAlert, makeError)('No input');

    // Add
    // const data = info.map(el => {
    //   // @ts-ignore -- temp
    //   const item = form.data.find(f => f.field_name === el.name);

    //   if (!item) return el;

    //   // @ts-ignore -- temp
    //   return { ...el, label: item.label, element: item.element };
    // });

    const data = form.data.map(d => {
      const item = {
        ...R.pick(['bold', 'id', 'element', 'italic', 'field_name', 'text', 'label', 'custom_name'], d),
      };

      // @ts-ignore -- temp
      if (item.field_name) {
        // @ts-ignore -- temp
        const value = info.find(el => el.name === item.field_name)?.value;

        if (item.element === 'Checkboxes') {
          // @ts-ignore -- temp
          const options = d.options;

          // @ts-ignore -- temp
          // eslint-disable-next-line no-console
          console.log(options, value);

          // @ts-ignore -- temp
          const field = options.map(o => {
            // eslint-disable-next-line no-console
            console.log(o);

            // @ts-ignore -- temp
            if (value?.includes(o.key)) return { ...o, isChecked: true };

            return o;
          });
          // @ts-ignore -- temp
          // const field = value.map(v => {
          //   // @ts-ignore -- temp
          //   const f = d.options.find(o => o.key === v);

          //   return { text: f.text, value: f.value };
          // });

          // @ts-ignore -- temp
          // eslint-disable-next-line no-console
          console.log(field);
          // @ts-ignore -- temp
          item.value = field;
        }
        // @ts-ignore -- temp
        else item.value = value;
      }

      return item;
    });

    resetForm();
    send('addAnswers', { formId: form?._id, formName: form?.name, data });
    closeModal();
  }

  if (!form) return null;

  // eslint-disable-next-line no-console
  console.log(form.data);
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
