import { ifTrue } from '@mv-d/toolbelt';
import { MouseEvent } from 'react';
import { Icon } from '../Icon';
import classes from './FormButton.module.scss';

interface FormButtonProps {
  noIcon?: boolean;
  id: string;
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function FormButton({ label, onClick, id, noIcon }: FormButtonProps) {
  return (
    <button className={classes.container} key={id} onClick={onClick}>
      {ifTrue(!noIcon, () => (
        <span className={classes.icon}>
          <Icon icon='form' />
        </span>
      ))}
      <p className='p4'>{label}</p>
    </button>
  );
}
