import { Optional } from '@mv-d/toolbelt';
import { Server } from 'socket.io';

import { CONFIG } from '../config';

import { logger } from '../server';

class WsServiceClass {
  #connection: Optional<Server>;

  init(connection: unknown) {
    this.#connection = connection as Server;

    this.#connection.on('connect', socket => {
      logger.info({ socketId: socket.id }, 'WS:Connected');
      // send config
      socket.emit('welcome', `Demo Form Builder Server, v${CONFIG.version}`);
      // subscribe on store changes
      socket.on('addForms', (...data: unknown[]) => {
        logger.info(data, 'addForms');
      });

      socket.on('filledForm', (...data: unknown[]) => {
        logger.info(data, 'filledForm');
      });
    });
  }
}

export const WsService = new WsServiceClass();
