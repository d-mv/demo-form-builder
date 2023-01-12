import { ActionWithPayload, AnyValue, PromisedResult, success, failure, Action } from '@mv-d/toolbelt';

import { FormItem, FormModal } from '../schemas/forms.schema';

export const DB_ACTIONS_ENUM = {
  ADD_NEW_FORM: 'addNewForm',
} as const;

type DbActionsEnumKeys = keyof typeof DB_ACTIONS_ENUM;

export type DbActions = typeof DB_ACTIONS_ENUM[DbActionsEnumKeys];

export type DbProviderFn<Payload = AnyValue> = (action: ActionWithPayload<Payload>) => PromisedResult<AnyValue>;

const DB_PROVIDER_MAP = new Map<DbActions, DbProviderFn>();

DB_PROVIDER_MAP.set(
  DB_ACTIONS_ENUM.ADD_NEW_FORM,
  async (action: ActionWithPayload<FormItem>): PromisedResult<string> => {
    try {
      await FormModal.create(action.payload);
      return success('OK');
    } catch (err) {
      return failure(err as Error);
    }
  },
);

export async function dbProvider<Payload = void>(action: Action<DbActions, Payload>) {
  const fn = DB_PROVIDER_MAP.get(action.type);

  if (fn) return fn(action as ActionWithPayload<AnyValue>);
  else return failure(new Error(`Unable to find the function for ${action.type}`));
}
