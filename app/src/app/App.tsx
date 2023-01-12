import { logger } from '@mv-d/toolbelt';

import { Administrator, Alerts, Modals, Requestor, Reviewer } from '../entities';
import { useHttpService } from '../shared/services/useHttpService.hook';
import classes from './App.module.scss';

export function App() {
  logger.info('App is rendering');

  useHttpService();
  return (
    <main className={classes.container}>
      <Administrator />
      <Requestor />
      <Reviewer />
      <Modals />
      <Alerts />
    </main>
  );
}
