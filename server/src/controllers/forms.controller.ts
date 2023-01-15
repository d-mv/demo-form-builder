import { dbProvider, DB_ACTIONS_ENUM } from '../providers';
import { FormItem } from '../schemas';

export function formsPostController(payload: FormItem) {
  return dbProvider({ type: DB_ACTIONS_ENUM.ADD_NEW_FORM, payload });
}

export function formsGetController() {
  return dbProvider({ type: DB_ACTIONS_ENUM.GET_FORMS });
}
