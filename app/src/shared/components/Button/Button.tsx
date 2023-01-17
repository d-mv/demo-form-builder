import { clsx } from 'clsx';
import { MouseEvent } from 'react';

import classes from './Button.module.scss';

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  isOpen: boolean;
  isDisabled: boolean;
  className?: string;
}

export function Button({ className, onClick, label, isOpen, isDisabled }: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      className={clsx(classes.container, { [classes.open]: isOpen }, className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
