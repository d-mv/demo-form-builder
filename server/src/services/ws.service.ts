import { Optional } from '@mv-d/toolbelt';
import { Server } from 'socket.io';

import { CONFIG } from '../config';
import {
  addAnswersController,
  addFormController,
  getFormsController,
  sendFormController,
  updateFormController,
} from '../controllers';
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
      socket.on('updateForm', updateFormController);
      socket.on('getForms', getFormsController);
      socket.on('addAnswers', addAnswersController);

      socket.on('filledForm', (...data: unknown[]) => {
        logger.info(data, 'filledForm');
      });
    });
  }

  send(action: string, payload: unknown): boolean;

  send(action: string): (payload: unknown) => boolean;

  send(action: string, payload?: unknown) {
    if (!payload) return (payload: unknown) => this.#connection && this.#connection.emit(action, payload);

    return this.#connection && this.#connection.emit(action, payload);
  }
}

export const WsService = new WsServiceClass();
