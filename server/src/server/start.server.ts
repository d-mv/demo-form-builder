import compress from '@fastify/compress';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import caching from '@fastify/caching';

import { fastifySocketIoPlugin, wsProvider } from '../providers';
import { app, logger } from './config.server';
import { apiRouter_v1, generalRouter } from '../routes';

export async function startServer(port: number) {
  // plugins
  app.register(compress, { global: true });
  app.register(caching, { privacy: caching.privacy.NOCACHE });
  app.register(cors);
  app.register(helmet);
  app.register(fastifySocketIoPlugin, { cors: { origin: '*' } });

  // routes
  app.register(apiRouter_v1, { prefix: 'api/v1' });
  app.register(generalRouter, { prefix: '/' });

  app.ready().then(wsProvider);

  // start
  try {
    // host is 0.0.0.0 for compatibility with Docker
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    logger.debug(err);
  }

  return app;
}
