import { R, success, failure, serializeJavascript, AnyValue } from '@mv-d/toolbelt';
import { Document, Types } from 'mongoose';
import { CONFIG } from '../config';

import { AnswerItem, AnswerModel, FormItem, FormModel } from '../schemas';
import { logger } from '../server';
import { WsService } from '../services';
import { parseData, toJson } from '../tools';

export async function formsGetController() {
  try {
    const result = await FormModel.find({});

    return success(result);
  } catch (err) {
    return failure(err as Error);
  }
}

function logArgumentIfDev(data: unknown, message?: string) {
  if (CONFIG.isDev) logger.debug(data, message || 'LOG');
}

export async function addAnswersController(answers: AnswerItem) {
  logger.info('request::answers');
  logArgumentIfDev(answers);

  // TODO: provide standard way of sending errors
  if (!answers) return logger.error('addAnswersController > incorrect argument');

  try {
    const result = await AnswerModel.create({ ...answers, data: serializeJavascript(answers.data) });

    if (result._id) WsService.send('newAnswersAdded', answers);
    else logger.error('addAnswersController > answers not created');
  } catch (err) {
    logger.error(err);
    WsService.send('error', err);
  }
}

export async function updateFormController(form: FormItem & { _id: string }) {
  logger.info('request::updateFormController');
  logArgumentIfDev(form);

  // TODO: provide standard way of sending errors
  if (!form) return logger.error('updateFormController > ncorrect argument');

  try {
    const result = await FormModel.updateOne(
      { _id: form._id },
      { name: form.name, data: serializeJavascript(form.data) },
    );

    // TODO: provide client subscription to these events
    if (result.modifiedCount) WsService.send('info', `Form ${form.name} has been updated`);
    else WsService.send('error', `Form ${form.name} was not updated`);
  } catch (err) {
    logger.error(err);
    WsService.send('error', err);
  }
}

export async function addFormController(form: FormItem) {
  logger.info('request::addFormController');
  logArgumentIfDev(form);

  // TODO: provide standard way of sending errors
  if (!form) logger.error('addFormController > incorrect argument');

  try {
    const result = await FormModel.create({ ...form, data: serializeJavascript(form.data) });

    if (result._id) WsService.send('newFormAdded', { ...form, _id: result._id });
    else logger.error('addFormController > form not created');
  } catch (err) {
    logger.error(err);
    WsService.send('error', err);
  }
}

export async function sendFormController(formId: string) {
  logger.info('request::sendFormController');
  logArgumentIfDev(formId);

  // TODO: provide standard way of sending errors
  if (!formId || typeof formId !== 'string') logger.error('sendFormController > incorrect argument');

  const results = await FormModel.find({ _id: formId });

  const form = results[0];

  // TODO: provide standard way of sending errors
  if (!form) return logger.error('sendFormController > no result found');

  const inJson = form.toJSON();

  WsService.send('newFormToFill', { ...inJson, data: eval(inJson.data) });
}

type ItemType<Item> = Document<unknown, AnyValue, Item> & Item & { _id: Types.ObjectId };

// ignore the first argument, as the request will come empty payload
export async function getFormsController(_: unknown, callback: (...data: unknown[]) => void) {
  logger.info('request::getFormsController');

  try {
    const results = await FormModel.find({});

    R.compose(callback, success, R.map(parseData), R.map(toJson<ItemType<FormItem>>))(results);
  } catch (err) {
    R.compose(callback, failure)(err);
  }
}

export async function getAnswers(_: unknown, callback: (...data: unknown[]) => void) {
  logger.info('request::getAnswers');

  try {
    const results = await AnswerModel.find({});

    R.compose(callback, success, R.map(parseData), R.map(toJson<ItemType<AnswerItem>>))(results);
  } catch (err) {
    R.compose(callback, failure)(err);
  }
}
