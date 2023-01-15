import { Optional } from '@mv-d/toolbelt';
import { Server } from 'socket.io';

import { CONFIG } from '../config';
import { addFormController, getFormsController, sendFormController } from '../controllers';
import { logger } from '../server';

class WsServiceClass {
  #connection: Optional<Server>;

  init(connection: unknown) {
    this.#connection = connection as Server;

    this.#connection.on('connect', socket => {
      logger.info({ socketId: socket.id }, 'WS:Connected');
      // send config
      socket.emit('welcome', `Demo Form Builder Server, v${CONFIG.version}`);

      socket.on('sendForm', sendFormController);
      socket.on('addForm', addFormController);
      socket.on('getForms', getFormsController);

      socket.on('filledForm', (...data: unknown[]) => {
        logger.info(data, 'filledForm');
      });
    });
  }

  send(action: string, payload?: unknown) {
    this.#connection && this.#connection.emit(action, payload);
  }
}

export const WsService = new WsServiceClass();
