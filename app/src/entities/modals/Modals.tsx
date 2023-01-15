import { ifTrue, makeMatch } from '@mv-d/toolbelt';
import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Dialog, LazyLoad, Modal, modalIdState, MODALS_ENUM } from '../../shared';
import { Constructor } from '../administrator';
import { Forms } from './Forms';
import { ModalsContext } from './modals.context';
import { UseForm } from './UseForm';

const MODAL_CONTENTS = makeMatch(
  {
    [MODALS_ENUM.ADD_NEW]: { component: Constructor, style: { width: '80rem', maxHeight: '80vh' }, isLoading: true },
    [MODALS_ENUM.FORMS]: { component: Forms },
    [MODALS_ENUM.REVIEW]: { component: UseForm },
    [MODALS_ENUM.FORM_EDIT]: { component: Constructor, style: { width: '80rem', maxHeight: '80vh' }, isLoading: true },
  },
  () => {
    null;
  },
);

export function Modals() {
  const modalId = useRecoilValue(modalIdState);

  const closeModal = useResetRecoilState(modalIdState);

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line security/detect-object-injection
  const modal = MODAL_CONTENTS[modalId];

  useEffect(() => {
    const shouldBe = modal.isLoading;

    if (shouldBe) {
      setIsLoading(true);
    }
    // we change local state ONLY in case of change of modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalId]);

  if (modalId === MODALS_ENUM.NONE) return null;

  // message to render alongside library component
  function renderLoading() {
    // TODO: move to new component
    return (
      <div>
        <p style={{ position: 'absolute', top: '50%', left: '50%' }}>Loading...</p>
      </div>
    );
  }

  function renderModalContents() {
    const Component = modal.component;

    return (
      <Dialog style={modal.style}>
        <ModalsContext.Provider value={{ onLoad: () => setIsLoading(false) }}>
          <LazyLoad>
            <Component />
          </LazyLoad>
          {ifTrue(isLoading, renderLoading)}
        </ModalsContext.Provider>
      </Dialog>
    );
  }

  return (
    <LazyLoad>
      <Modal onClick={closeModal}>{renderModalContents()}</Modal>
    </LazyLoad>
  );
}
