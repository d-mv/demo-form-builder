import { FastifyInstance } from 'fastify';

import { formsGetController, formsPostController } from '../controllers';
import { FormItem } from '../schemas/forms.schema';

export function apiRouter_v1(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.get('/forms', async (_, res) => {
    const result = await formsGetController();

    if (result.isOK) return res.send(result.payload);
    else return res.code(400).send(result.error.message);
  });

  server.post<{ Body: FormItem }>('/forms', async (req, res) => {
    const form = req.body;

    const result = await formsPostController(form);

    if (result.isOK) return res.send(result.payload);
    else return res.code(400).send(result.error.message);
  });

  next();
}
