import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { alertsSelector, alertsState, Icon } from '../../shared';
import classes from './Alerts.module.scss';

export function Alerts() {
  const alert = useRecoilValue(alertsSelector);

  const resetAlert = useResetRecoilState(alertsState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetAlert();
      clearTimeout(timeout);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert, resetAlert]);

  if (!alert) return null;

  return (
    <div className={clsx('animate__animated animate__flipInX', classes.container, classes[alert.type])}>
      <span className={classes.icon}>
        <Icon icon={alert.type === 'error' ? 'error' : 'alert'} />
      </span>
      <p className='p2'>{alert.message}</p>
    </div>
  );
}
