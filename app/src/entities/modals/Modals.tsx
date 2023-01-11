import { makeMatch } from '@mv-d/toolbelt';
import { useRecoilState } from 'recoil';

import { Dialog, LazyLoad, Modal, modalOpenIdState } from '../../shared';
import { Constructor } from '../administrator';

const MODAL_CONTENTS = makeMatch({ Administrator: Constructor }, () => null);

export function Modals() {
  const [modalOpenId, setModalOpenId] = useRecoilState(modalOpenIdState);

  const handleClose = () => {
    setModalOpenId('');
  };

  if (!modalOpenId) return null;

  function renderModalContents() {
    const Module = MODAL_CONTENTS[modalOpenId];

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
