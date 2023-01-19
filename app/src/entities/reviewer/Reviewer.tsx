import { useRecoilState, useRecoilValue } from 'recoil';

import { Button, ButtonContainer, formReviewState, modalIdState, MODALS_ENUM } from '../../shared';

const id = MODALS_ENUM.REVIEW;

export function Reviewer() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  const formToFill = useRecoilValue(formReviewState);

  function handleClick() {
    setModalId(modalId === id ? MODALS_ENUM.NONE : id);
  }

  return (
    <ButtonContainer>
      <Button isOpen={modalId === id} onClick={handleClick} label='Reviewer' isDisabled={!formToFill} />
    </ButtonContainer>
  );
}
