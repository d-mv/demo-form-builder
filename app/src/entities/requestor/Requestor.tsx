import { useRecoilState } from 'recoil';

import { Button, ButtonContainer, modalIdState, MODALS_ENUM } from '../../shared';

const id = MODALS_ENUM.REQUESTOR;

export function Requestor() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  function handleClick() {
    setModalId(modalId === id ? MODALS_ENUM.NONE : id);
  }

  return (
    <ButtonContainer>
      <Button isOpen={modalId === id} onClick={handleClick} label={id} isDisabled={false} />
    </ButtonContainer>
  );
}
