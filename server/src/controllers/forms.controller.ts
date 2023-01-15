import { R, success, failure, as } from '@mv-d/toolbelt';
import { MongooseError } from 'mongoose';

import { dbProvider, DB_ACTIONS_ENUM } from '../providers';
import { FormItem, FormModal } from '../schemas';
import { WsService } from '../services';
import { errorLogger, infoLogger } from '../tools';

// TODO: remove?
export function formsPostController(payload: FormItem) {
  return dbProvider({ type: DB_ACTIONS_ENUM.ADD_NEW_FORM, payload });
}

// TODO: remove?
export function formsGetController() {
  return dbProvider({ type: DB_ACTIONS_ENUM.GET_FORMS });
}

export async function addFormController(form: FormItem) {
  const logger = errorLogger('addFormController');

  // TODO: provide standard way of sending errors
  if (!form) {
    logger('Incorrect argument');
    return;
  }

  try {
    const result = await FormModal.create({ ...form, data: JSON.stringify(form.data) });

    if (result._id) WsService.send('newFormAdded', form);
    else logger('Form not created');
  } catch (err) {
    logger(as<MongooseError>(err).message);
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

  const form = results[0];

  // TODO: provide standard way of sending errors
  if (!form) {
    infoLogger('sendFormController', 'No result found');
    return;
  }

  const inJson = form.toJSON();

  WsService.send('newFormToFill', { ...inJson, data: JSON.parse(inJson.data) });
}

// ignore the first argument, as the request will come empty payload
export async function getFormsController(_: unknown, callback: (...data: unknown[]) => void) {
  try {
    const results = await FormModal.find({});

    R.pipe(
      success,
      callback,
    )(results.map(item => item.toJSON()).map(item => ({ ...item, data: JSON.parse(item.data) })));
  } catch (err) {
    R.compose(callback, failure)(err);
  }
}
