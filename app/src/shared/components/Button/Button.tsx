import { clsx } from 'clsx';
import { MouseEvent } from 'react';

import classes from './Button.module.scss';

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  isOpen: boolean;
  isDisabled: boolean;
}

export function Button({ onClick, label, isOpen, isDisabled }: ButtonProps) {
  return (
    <button disabled={isDisabled} className={clsx(classes.container, { [classes.open]: isOpen })} onClick={onClick}>
      {label}
    </button>
  );
}
