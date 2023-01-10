import { logger } from '@mv-d/toolbelt';
import { useState } from 'react';
import { Administrator, Requestor, Reviewer } from '../entities';
import { Dialog, LazyLoad, Modal } from '../shared';

export function App() {
  logger.info('App is rendering');

  const [showModal, setShowModal] = useState(false);

  function toggleShowModal() {
    setShowModal(state => !state);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function renderModal() {
    if (!showModal) return null;

    return (
      <Modal onClick={handleCloseModal}>
        <Dialog>i am the dialog</Dialog>
      </Modal>
    );
  }

  return (
    <main>
      <Administrator />
      <Requestor />
      <Reviewer />
      <button onClick={toggleShowModal}>open modal</button>
      <LazyLoad>{renderModal()}</LazyLoad>
    </main>
  );
}
