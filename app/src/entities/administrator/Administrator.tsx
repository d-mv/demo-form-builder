import { useRecoilState } from 'recoil';

import { Button, ButtonContainer, modalIdState, ModalsEnum, MODALS_ENUM } from '../../shared';

const IDS: ModalsEnum[] = [MODALS_ENUM.FORMS, MODALS_ENUM.ADD_NEW];

export function Administrator() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  function handleClick() {
    setModalId(IDS.includes(modalId) ? MODALS_ENUM.NONE : IDS[0]);
  }

  return (
    <ButtonContainer>
      <Button isOpen={IDS.includes(modalId)} onClick={handleClick} label='Administrator' isDisabled={false} />
    </ButtonContainer>
  );
}
