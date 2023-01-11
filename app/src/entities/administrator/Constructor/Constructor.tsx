import classes from './Constructor.module.scss';
import {
  Body,
  Footer,
  getModalCloseFn,
  Header,
  LazyLoad,
  ModalFooterButtons,
  MODAL_FOOTER_BUTTONS,
} from '../../../shared';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { FormBuilder } from '../../formBuilder';
import { FormBuilderPostData, ReactFormBuilder, TaskData } from 'react-form-builder2';
import { formBuilderState } from '../../formBuilder/FormBuilder.state';
import { useEffect, useState } from 'react';

export default function Constructor() {
  const modalCloseFn = useSetRecoilState(getModalCloseFn);

  function handleClose() {
    modalCloseFn('');
  }

  function handleFooterClick(id: string) {
    if (id === ModalFooterButtons.CANCEL) modalCloseFn('');
  }

  const [s, setS] = useState([] as TaskData[]);

  function handleChange(data: TaskData[]) {
    setS(data);
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(s);
  }, [s]);

  return (
    <div className={classes.container}>
      <Header onClick={handleClose} title='Build Form' />
      <Body className={classes.body}>
        {/* <FormBuilder onChange={handleChange} /> */}
        <ReactFormBuilder onPost={d => handleChange(d.task_data)} />
      </Body>
      <Footer onClick={handleFooterClick} buttons={MODAL_FOOTER_BUTTONS} />
    </div>
  );
}
