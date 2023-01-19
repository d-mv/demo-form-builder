import { failure, io, logger, PromisedResult, Socket, success } from '@mv-d/toolbelt';

import { CONFIG } from '../config';

class WsServiceClass {
  #connection: Socket;

  constructor() {
    this.#connection = this.#init();
  }

  #init() {
    const connection = io(CONFIG.services.backend);

    if (connection) {
      connection.on('connect', () => {
        logger.info('Connected');
      });

      connection.on('welcome', (message: string) => {
        logger.info(message);
      });

      // TODO: do we need this?
      connection.on('error', (...data: unknown[]) => {
        logger.error(`error: ${JSON.stringify(data)}`);
      });
      connection.on('info', (...data: unknown[]) => {
        logger.info(`info: ${JSON.stringify(data)}`);
      });
    }

    return connection;
  }

  async send<T>(action: string, payload?: unknown): PromisedResult<T> {
    // TODO: other way to do this?
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

  // to avoid double subscriptions
  #subscriptionEvents: string[] = [];

  subscribe<T>(event: string, callback: (arg0: T) => void) {
    if (this.#subscriptionEvents.includes(event)) return;

    this.#subscriptionEvents.push(event);
    this.#connection.on(event, callback);
  }
}

export const WsService = new WsServiceClass();
