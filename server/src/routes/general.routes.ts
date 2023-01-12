import { CONFIG } from '../config';
import { FastifyServer } from '../server';

export function generalRouter(
  server: FastifyServer,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.get('/heartbeat', () => 'OK');
  server.get('/version', () => CONFIG.version);

  next();
}
