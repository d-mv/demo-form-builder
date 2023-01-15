import { AnyValue } from '@mv-d/toolbelt';

import { WsService } from './ws.service';

export function useWsService() {
  async function send<T>(action: string, payload?: AnyValue) {
    return await WsService.send<T>(action, payload);
  }

  return { send };
}
