import { useEffect } from 'react';

import { Administrator, Alerts, Modals, Requestor, Reviewer } from '../../entities';
import { Intro } from '../Intro';
import { useWsService } from '../../shared';
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
      <Intro />
      <div className={classes.row}>
        <Administrator />
        <Requestor />
        <Reviewer />
      </div>
      <Modals />
      <Alerts />
    </main>
  );
}
