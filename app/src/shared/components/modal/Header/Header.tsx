import { MouseEvent } from 'react';

import { Icon } from '../..';
import classes from './Header.module.scss';

interface HeaderProps {
  title: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Header({ onClick, title }: HeaderProps) {
  return (
    <header className={classes.container}>
      <h2>{title}</h2>
      <button className={classes['close-button']} onClick={onClick}>
        <Icon icon='close' />
      </button>
    </header>
  );
}
