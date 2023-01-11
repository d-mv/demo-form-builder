import { logger } from '@mv-d/toolbelt';

import { Administrator, Modals, Requestor, Reviewer } from '../entities';
import classes from './App.module.scss';

export function App() {
  logger.info('App is rendering');

  return (
    <main className={classes.container}>
      <Administrator />
      <Requestor />
      <Reviewer />
      <Modals />
    </main>
  );
}
