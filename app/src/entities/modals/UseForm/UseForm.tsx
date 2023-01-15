import { AnyValue } from '@mv-d/toolbelt';
import { useContext, useEffect, useRef } from 'react';
import { FormGeneratorOnSubmitParams, ReactFormGenerator } from 'react-form-builder2';
import { useRecoilValue } from 'recoil';
import { formReviewSelector } from '../../../shared';
import { ModalsContext } from '../modals.context';
import classes from './UseForm.module.scss';

export default function UseForm() {
  const ref = useRef<AnyValue>(null);

  const { onLoad } = useContext(ModalsContext);

  const form = useRecoilValue(formReviewSelector);

  // initial loading of the library can be slow => Modals is rendering
  // 'Loading...'; once library is rendering, call to Modals to remove it
  useEffect(() => {
    if (ref.current) onLoad();
  }, [ref, onLoad]);

  function handleSubmitAnswers(info: FormGeneratorOnSubmitParams[]) {
    // eslint-disable-next-line no-console
    console.log(info);
  }

  return (
    <div className={classes.container}>
      <ReactFormGenerator
        ref={ref}
        saveAlways={true}
        onSubmit={handleSubmitAnswers}
        // onPost={handleChange}
        // @ts-ignore -- data is missing in types, but available
        data={form?.data}
      />
    </div>
  );
}
