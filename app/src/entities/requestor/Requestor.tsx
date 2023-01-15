import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Button, ButtonContainer, formsSelector, formViewSelector, modalIdState, MODALS_ENUM } from '../../shared';

const id = MODALS_ENUM.FORMS;

export function Requestor() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  const setViewMode = useSetRecoilState(formViewSelector);

  const forms = useRecoilValue(formsSelector);

  function handleClick() {
    setViewMode(true);
    setModalId(modalId === id ? MODALS_ENUM.NONE : id);
  }

  return (
    <ButtonContainer>
      <Button isOpen={modalId === id} onClick={handleClick} label={id} isDisabled={!forms.items.length} />
    </ButtonContainer>
  );
}
