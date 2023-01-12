import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { alertsSelector, alertsState } from '../../shared';
import classes from './Alrts.module.scss';

export function Alerts() {
  const alert = useRecoilValue(alertsSelector);

  const resetAlert = useResetRecoilState(alertsState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetAlert();
      clearTimeout(timeout);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert, resetAlert]);

  if (!alert) return null;

  return (
    <div className={classes.container}>
      <p className='p4'>{alert}</p>
    </div>
  );
}
