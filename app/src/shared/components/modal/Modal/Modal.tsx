import { MouseEvent, PropsWithChildren } from 'react';

import classes from './Modal.module.scss';

interface ModalProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function Modal({ children, onClick }: PropsWithChildren<ModalProps>) {
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    onClick(e);
  }

  return (
    <section id='modal' className={classes.container}>
      <div id='modal-overlay' onClick={handleClick} className={classes.overlay} />
      {children}
    </section>
  );
}
