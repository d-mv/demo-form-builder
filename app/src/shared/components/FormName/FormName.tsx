import { clsx } from 'clsx';
import { ChangeEvent } from 'react';

import classes from './FormName.module.scss';
interface FormNameProps {
  onChange: (arg: string) => void;
  error: string;
  value: string;
}

export function FormName({ onChange, error, value }: FormNameProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={classes.container}>
      <input
        autoFocus
        className={clsx(classes.input, { [classes.error]: Boolean(error) })}
        placeholder='Enter form name'
        onChange={handleChange}
        value={value}
      />
      <span className={classes['error-message']}>{error}</span>
    </div>
  );
}
