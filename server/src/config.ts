import { buildConfig, env } from '@mv-d/toolbelt';
import { config } from 'dotenv';

config();

export const CONFIG = {
  ...buildConfig(),
  services: { db: env('MONGODB_URL').expect() },
};
