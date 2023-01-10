import { PropsWithChildren } from 'react';

import classes from './Dialog.module.scss';

export default function Dialog({ children }: PropsWithChildren) {
  return (
    <article id='dialog' className={classes.container}>
      {children}
    </article>
  );
}
