import { R, AnyValue, Result } from '@mv-d/toolbelt';
import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { alertsSelector, formAnswersState, formReviewSelector, formReviewState, formsSelector } from '../state';
import { makeInfo } from '../tools';
import { FormAnswers, FormItem } from '../types';
import { WsService } from './ws.service';

export function useWsService() {
  const setAlert = useSetRecoilState(alertsSelector);

  const forms = useRecoilValue(formsSelector);

  const setForms = useSetRecoilState(formsSelector);

  const setAnswers = useSetRecoilState(formAnswersState);

  const setFormToFill = useSetRecoilState(formReviewSelector);

  // a form is sent to fill
  const handleNewFormToFill = useCallback(
    (form: FormItem) => {
      setFormToFill(form);
      R.compose(setAlert, makeInfo)(`A new form to fill ${form.name}`);
    },
    [setAlert, setFormToFill],
  );

  const handleNewFormAdded = useCallback(
    (form: FormItem) => {
      // eslint-disable-next-line no-console
      console.log(form);
      setForms({ ...forms, items: [...forms.items, form] });
      R.compose(setAlert, makeInfo)(`Got a new form: ${form.name}`);
    },
    [forms, setAlert, setForms],
  );

  const handleNewAnswers = useCallback(
    (answers: FormAnswers) => {
      setAnswers(answers);
      R.compose(setAlert, makeInfo)(`New answers arrived for ${answers.formName} form`);
    },
    [setAlert, setAnswers],
  );

  useEffect(() => {
    WsService.subscribe('newFormToFill', handleNewFormToFill);
    WsService.subscribe('newFormAdded', handleNewFormAdded);
    WsService.subscribe('newAnswersAdded', handleNewAnswers);
  }, [handleNewAnswers, handleNewFormAdded, handleNewFormToFill]);

  async function send<T>(action: string, payload?: AnyValue) {
    return await WsService.send<T>(action, payload);
  }

  const getForms = useCallback(async () => {
    setForms({ isLoading: true, items: forms.items });

    const result = await WsService.send<Result<FormItem[]>>('getForms');

    // eslint-disable-next-line no-console
    // console.log(result);

    // result #1 for socket, result #2 from server
    if (result.isOK && result.payload.isOK) {
      const data = result.payload.payload;

      setForms({ isLoading: false, items: data });
      // R.compose(setAlert, makeInfo)(`Got ${data.length} form(s)`);
    } else {
      // TODO: safe logging of action through the app
      setForms({ isLoading: false, items: forms.items });
    }
  }, [forms.items, setAlert, setForms]);

  return { send, getForms };
}
