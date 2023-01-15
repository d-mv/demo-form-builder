import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { alertsSelector, alertsState, Icon } from '../../shared';
import classes from './Alrts.module.scss';

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
    <div className={clsx('animate__animated animate__flipInX', classes.container)}>
      <span className={classes.icon}>
        <Icon icon='alert' />
      </span>
      <p className='p2'>{alert}</p>
    </div>
  );
}
