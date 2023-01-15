import { AnyValue, Result } from '@mv-d/toolbelt';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { alertsSelector, formReviewSelector, formsSelector } from '../state';
import { FormItem } from '../types';
import { WsService } from './ws.service';

export function useWsService() {
  const setAlert = useSetRecoilState(alertsSelector);

  const forms = useRecoilValue(formsSelector);

  const setForms = useSetRecoilState(formsSelector);

  const setFormToFill = useSetRecoilState(formReviewSelector);

  // a form is sent to fill
  const handleNewForm = useCallback(
    (form: FormItem) => {
      setFormToFill(form);
      setAlert(`A new form to fill ${form.name}`);
    },
    [setAlert, setFormToFill],
  );

  useEffect(() => {
    WsService.subscribe('newFormToFill', handleNewForm);
  }, [handleNewForm]);

  async function send<T>(action: string, payload?: AnyValue) {
    return await WsService.send<T>(action, payload);
  }

  const getForms = useCallback(async () => {
    setForms({ isLoading: true, items: forms.items });

    const result = await WsService.send<Result<FormItem[]>>('getForms');

    // result #1 for socket, result #2 from server
    if (result.isOK && result.payload.isOK) {
      const data = result.payload.payload;

      setForms({ isLoading: false, items: data });
      setAlert(`Got ${data.length} new form(s)`);
    } else {
      // TODO: safe logging of action through the app
      setForms({ isLoading: false, items: forms.items });
    }
  }, [forms.items, setAlert, setForms]);

  return { send, getForms };
}
