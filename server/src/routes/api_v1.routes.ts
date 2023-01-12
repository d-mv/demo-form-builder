import { FastifyInstance } from 'fastify';
import { formsPostController } from '../controllers';
import { FormItem } from '../schemas/forms.schema';

export function apiRouter_v1(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  // get all flags
  /* server.get('/flags', () => ''); */

  // get flag by id
  server.post<{ Body: FormItem }>('/forms', async (req, res) => {
    const form = req.body;

    const result = await formsPostController(form);

    if (result.isOK) res.send(result.payload);
    else res.code(400).send(result.error.message);
  });

  next();
}
