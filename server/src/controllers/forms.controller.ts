import { getMessageFromError } from '@mv-d/toolbelt';
import { dbProvider, DB_ACTIONS_ENUM } from '../providers';
import { FormItem, FormModal } from '../schemas';
import { logger as lg } from '../server';
import { WsService } from '../services';
import { errorLogger, infoLogger } from '../tools';

export function formsPostController(payload: FormItem) {
  return dbProvider({ type: DB_ACTIONS_ENUM.ADD_NEW_FORM, payload });
}

export function formsGetController() {
  return dbProvider({ type: DB_ACTIONS_ENUM.GET_FORMS });
}

export async function addFormController(form: FormItem) {
  const log = errorLogger('addFormController');

  // TODO: provide standard way of sending errors
  if (!form) {
    log('Incorrect argument');
    return;
  }

  try {
    const result = await FormModal.create({ ...form, data: JSON.stringify(form.data) });

    if (result._id) WsService.send('newFormAdded', form);
    else log('Form not created');
  } catch (err) {
    lg.debug(err);
    log(getMessageFromError(err));
    WsService.send('error', err);
  }
}

export async function sendFormController(formId: string) {
  // TODO: provide standard way of sending errors
  if (!formId || typeof formId !== 'string') {
    errorLogger('sendFormController', 'Incorrect argument');
    return;
  }

  const results = await FormModal.find({ id: formId });

  // TODO: provide standard way of sending errors
  if (!results.length) {
    infoLogger('sendFormController', 'No result found');
    return;
  }

  WsService.send('newFormToFill', results[0]);
}
