import { useEffect } from 'react';

import { Administrator, Alerts, Modals, Requestor, Reviewer } from '../entities';
import { useWsService } from '../shared';
import classes from './App.module.scss';

export function App() {
  const { getForms } = useWsService();

  useEffect(() => {
    getForms();
    // need this to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
