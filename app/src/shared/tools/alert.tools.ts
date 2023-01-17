import { generateId } from '@mv-d/toolbelt';

import { AlertType } from '../types';

export function makeError(message: string): AlertType {
  return { id: generateId(), type: 'error', message };
}

export function makeInfo(message: string): AlertType {
  return { id: generateId(), type: 'info', message };
}
