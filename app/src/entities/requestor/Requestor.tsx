import { useRecoilState, useSetRecoilState } from 'recoil';

import { Button, ButtonContainer, formViewSelector, modalIdState, MODALS_ENUM } from '../../shared';

const id = MODALS_ENUM.FORMS;

export function Requestor() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  const setViewMode = useSetRecoilState(formViewSelector);

  function handleClick() {
    setViewMode(true);
    setModalId(modalId === id ? MODALS_ENUM.NONE : id);
  }

  return (
    <ButtonContainer>
      <Button isOpen={modalId === id} onClick={handleClick} label={id} isDisabled={false} />
    </ButtonContainer>
  );
}
