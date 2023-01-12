import { axios, logger, Optional } from '@mv-d/toolbelt';
import { CONFIG } from '../config';

let timer: Optional<NodeJS.Timer> = undefined;

export class HttpServiceClass {
  #onDisconnect: () => void;

  constructor(onDisconnect: () => void) {
    this.#onDisconnect = onDisconnect;
    this.#init();
  }

  async #checkConnection() {
    try {
      const result = await axios.default.get(CONFIG.services.backend + '/heartbeat');

      if (result.data !== 'OK') {
        logger.warn('Unknown heartbeat reply');
        this.#onDisconnect();
      }
    } catch (err) {
      logger.error(err);
      this.#onDisconnect();
    }
  }

  #init() {
    timer = setInterval(this.#checkConnection, 3000);
  }
}
