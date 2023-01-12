import { buildConfig, env } from '@mv-d/toolbelt';

export const CONFIG = {
  ...buildConfig({ noVersion: true }),
  services: { backend: env('REACT_APP_BACKEND_URL').expect() },
};
