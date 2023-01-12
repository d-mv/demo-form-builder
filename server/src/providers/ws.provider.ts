import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Server, ServerOptions } from 'socket.io';

import { FastifyServer } from '../server';
import { WsService } from '../services';

// adapted from https://github.com/alemagio/fastify-socket.io

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

export const fastifySocketIoPlugin: FastifyPluginAsync<Partial<ServerOptions>> = fastifyPlugin(
  async function (fastify, opts) {
    fastify.decorate('io', new Server(fastify.server, opts));
    fastify.addHook('onClose', (fastify, done) => {
      fastify.io.close();
      done();
    });
  },
  { fastify: '>=3.24.x', name: 'fastifySocketIoPlugin' },
);

export function wsProvider(app: undefined) {
  const { io } = app as unknown as FastifyServer;

  WsService.init(io);
}
