import crypto from 'crypto';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import fastify, { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { CONFIG } from '../config';

export type FastifyServer = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyBaseLogger,
  JsonSchemaToTsProvider
>;

export const app: FastifyServer = fastify({
  genReqId: () => crypto.randomUUID(),
  logger: {
    level: CONFIG.isTest ? 'fatal' : 'trace',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: CONFIG.isTest,
      },
    },
  },
}).withTypeProvider<JsonSchemaToTsProvider>();

export const logger = app.log;
