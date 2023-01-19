import { clsx } from 'clsx';

import classes from './Loader.module.scss';

export default function Loader() {
  return (
    <div>
      <p className={clsx(classes.message, 'p4')}>Loading...</p>
    </div>
  );
}
