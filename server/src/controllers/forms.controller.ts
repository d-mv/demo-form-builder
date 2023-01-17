import { R, success, failure, as, serializeJavascript, AnyValue } from '@mv-d/toolbelt';
import { Document, MongooseError, Types } from 'mongoose';

import { dbProvider, DB_ACTIONS_ENUM } from '../providers';
import { AnswerItem, AnswerModel, FormItem, FormModel } from '../schemas';
import { WsService } from '../services';
import { errorLogger, infoLogger, parseData, toJson } from '../tools';

// TODO: remove?
export function formsPostController(payload: FormItem) {
  return dbProvider({ type: DB_ACTIONS_ENUM.ADD_NEW_FORM, payload });
}

// TODO: remove?
export function formsGetController() {
  return dbProvider({ type: DB_ACTIONS_ENUM.GET_FORMS });
}

export async function addAnswersController(answers: AnswerItem) {
  const logger = errorLogger('addAnswersController');

  // eslint-disable-next-line no-console
  console.log(answers);

  // TODO: provide standard way of sending errors
  if (!answers) {
    logger('Incorrect argument');
    return;
  }

  try {
    const result = await AnswerModel.create({ ...answers, data: serializeJavascript(answers.data) });

    if (result._id) WsService.send('newAnswersAdded', answers);
    else logger('Answers not created');
  } catch (err) {
    logger(as<MongooseError>(err).message);
    WsService.send('error', err);
  }
}

export async function addFormController(form: FormItem) {
  const logger = errorLogger('addFormController');

  // TODO: provide standard way of sending errors
  if (!form) {
    logger('Incorrect argument');
    return;
  }

  try {
    const result = await FormModel.create({ ...form, data: serializeJavascript(form.data) });

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

  const results = await FormModel.find({ _id: formId });

  const form = results[0];

  // TODO: provide standard way of sending errors
  if (!form) {
    infoLogger('sendFormController', 'No result found');
    return;
  }

  const inJson = form.toJSON();

  WsService.send('newFormToFill', { ...inJson, data: eval(inJson.data) });
}

type ItemType<Item> = Document<unknown, AnyValue, Item> & Item & { _id: Types.ObjectId };

// ignore the first argument, as the request will come empty payload
export async function getFormsController(_: unknown, callback: (...data: unknown[]) => void) {
  try {
    const results = await FormModel.find({});

    R.compose(callback, success, R.map(parseData), R.map(toJson<ItemType<FormItem>>))(results);
  } catch (err) {
    R.compose(callback, failure)(err);
  }
}

export async function getAnswers(_: unknown, callback: (...data: unknown[]) => void) {
  try {
    const results = await AnswerModel.find({});

    R.compose(callback, success, R.map(parseData), R.map(toJson<ItemType<AnswerItem>>))(results);
  } catch (err) {
    R.compose(callback, failure)(err);
  }
}
