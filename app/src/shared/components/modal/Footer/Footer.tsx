import { MouseEvent } from 'react';
import { ButtonType } from '../../../types';

import { ButtonSize, PrimaryButton, SecondaryButton } from '../../Buttons';
import classes from './Footer.module.scss';

interface FooterProps {
  buttons: ButtonType[];
  message?: () => JSX.Element;
  onClick: (id: string, e: MouseEvent<HTMLButtonElement>) => void;
}

export function Footer({ buttons, message, onClick }: FooterProps) {
  function handleClick(id: string) {
    return function call(e: MouseEvent<HTMLButtonElement>) {
      onClick(id, e);
    };
  }

  function renderButton(button: ButtonType) {
    if (button.type === 'primary') {
      return (
        <PrimaryButton
          childClassName={classes.button}
          onClick={handleClick(button.id)}
          id={button.id}
          size={ButtonSize.MEDIUM}
          key={button.id}
        >
          <p className='p4'>{button.label}</p>
        </PrimaryButton>
      );
    }

    return (
      <SecondaryButton
        childClassName={classes.button}
        onClick={handleClick(button.id)}
        id={button.id}
        size={ButtonSize.MEDIUM}
        key={button.id}
      >
        <p className='p4'>{button.label}</p>
      </SecondaryButton>
    );
  }

  return (
    <footer className={classes.container}>
      {message ? message() : <span />}
      <div className={classes.buttons}>{buttons.map(renderButton)}</div>
    </footer>
  );
}
