import { R, axios, getMessageFromError } from '@mv-d/toolbelt';
import { useSetRecoilState } from 'recoil';
import { CONFIG } from '../config';
import { alertsSelector, FormItem, FormItemDb, formsSelector } from '../state';

function stringifyFormData(form: FormItem) {
  return { ...form, data: JSON.stringify(form.data) };
}

export function useHttpService() {
  const setAlert = useSetRecoilState(alertsSelector);

  const addForm = useSetRecoilState(formsSelector);

  async function sendForm(form: FormItem) {
    try {
      await axios.default.post(CONFIG.services.backend + '/api/v1/forms', stringifyFormData(form));

      addForm([form]);
    } catch (err) {
      R.compose(setAlert, getMessageFromError)(err);
    }
  }

  async function getForms() {
    // eslint-disable-next-line no-console
    console.log('hello');

    try {
      const result = await axios.default.get<FormItemDb[]>(CONFIG.services.backend + '/api/v1/forms');

      addForm(result.data.map(d => ({ ...d, data: JSON.parse(d.data) })));
    } catch (err) {
      R.compose(setAlert, getMessageFromError)(err);
    }
  }

  return { sendForm, getForms };
}
