import { makeMatch } from '@mv-d/toolbelt';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Dialog, LazyLoad, Modal, modalIdState, MODALS_ENUM } from '../../shared';
import { Forms, Constructor } from '../administrator';

const MODAL_CONTENTS = makeMatch(
  {
    [MODALS_ENUM.ADD_NEW]: Constructor,
    [MODALS_ENUM.FORMS]: Forms,
    [MODALS_ENUM.FORM_EDIT]: Constructor,
  },
  () => null,
);

export function Modals() {
  const modalId = useRecoilValue(modalIdState);

  const closeModal = useResetRecoilState(modalIdState);

  const handleClose = () => {
    closeModal();
  };

  // eslint-disable-next-line no-console
  console.log(modalId);

  if (modalId === MODALS_ENUM.NONE) return null;

  function renderModalContents() {
    const Module = MODAL_CONTENTS[modalId];

    return (
      <LazyLoad>
        <Module />
      </LazyLoad>
    );
  }

  return (
    <LazyLoad>
      <Modal onClick={handleClose}>
        <Dialog>{renderModalContents()}</Dialog>
      </Modal>
    </LazyLoad>
  );
}
