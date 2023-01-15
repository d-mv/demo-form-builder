import { failure, io, PromisedResult, Socket, success } from '@mv-d/toolbelt';

import { CONFIG } from '../config';
import { FormItem } from '../state';

class WsServiceClass {
  #connection: Socket;

  constructor() {
    this.#connection = this.#init();
  }

  #init() {
    const connection = io(CONFIG.services.backend);

    if (connection) {
      connection.on('connect', () => {
        // eslint-disable-next-line no-console
        console.log('Connected to backend');
      });
      connection.on('welcome', (message: string) => {
        // eslint-disable-next-line no-console
        console.log(message);
      });
      connection.on('newFormToFill', (form: FormItem) => {
        // eslint-disable-next-line no-console
        console.log('newFormToFill', form);
      });
      connection.on('newFormAdded', (form: FormItem) => {
        // eslint-disable-next-line no-console
        console.log('newFormAdded', form);
      });
      connection.on('error', (...data: unknown[]) => {
        // eslint-disable-next-line no-console
        console.log(data);
      });
    }

    return connection;
  }

  async send<T>(action: string, payload?: unknown): PromisedResult<T> {
    const promise = new Promise<T>((resolve, reject) => {
      this.#connection.emit(action, payload, (result: T) => {
        resolve(result);
      });
    });

    try {
      const resolvedPromise = await promise;

      return success(resolvedPromise);
    } catch (err) {
      return failure(err as Error);
    }
  }
}

export const WsService = new WsServiceClass();
