import { clsx } from 'clsx';
import { ChangeEvent } from 'react';

import classes from './FormName.module.scss';
interface FormNameProps {
  onChange: (arg: string) => void;
  error: string;
}

export function FormName({ onChange, error }: FormNameProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={classes.container}>
      <input
        className={clsx(classes.input, { [classes.error]: Boolean(error) })}
        placeholder='Enter form name'
        onChange={handleChange}
      />
      <span className={classes['error-message']}>{error}</span>
    </div>
  );
}
