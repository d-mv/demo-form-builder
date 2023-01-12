import { io, Socket } from '@mv-d/toolbelt';

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
      connection.on('newForm', (form: FormItem) => {
        // eslint-disable-next-line no-console
        console.log('newForm', form);
      });
    }

    return connection;
  }
}

export const WsService = new WsServiceClass();
