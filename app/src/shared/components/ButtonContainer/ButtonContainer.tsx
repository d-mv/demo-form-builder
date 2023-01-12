import { PropsWithChildren } from 'react';

import classes from './ButtonContainer.module.scss';

export function ButtonContainer({ children }: PropsWithChildren) {
  return <div className={classes.container}>{children}</div>;
}
