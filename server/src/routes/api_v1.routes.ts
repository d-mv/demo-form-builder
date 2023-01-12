import { FastifyInstance } from 'fastify';

export function apiRouter_v1(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  // get all flags
  server.get('/flags', () => '');

  // get flag by id
  server.get<{ Params: { flagId: string } }>('/flags/:flagId', (req, res) => {
    const { flagId } = req.params;

    if (!flagId) res.code(400).send('Missing param');
    else {
      // const result = getFlagByIdController(flagId);
      // if (result.isOK) res.send(result.payload);
      // else res.code(400).send(result.message);
    }
  });

  next();
}
