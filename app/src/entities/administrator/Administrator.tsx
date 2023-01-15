import { useRecoilState, useSetRecoilState } from 'recoil';

import { Button, ButtonContainer, formViewSelector, modalIdState, ModalsEnum, MODALS_ENUM } from '../../shared';

const IDS: ModalsEnum[] = [MODALS_ENUM.FORMS, MODALS_ENUM.ADD_NEW];

export function Administrator() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  const setViewMode = useSetRecoilState(formViewSelector);

  function handleClick() {
    // use forms in 'write' mode
    setViewMode(false);
    setModalId(IDS.includes(modalId) ? MODALS_ENUM.NONE : IDS[0]);
  }

  return (
    <ButtonContainer>
      <Button isOpen={IDS.includes(modalId)} onClick={handleClick} label='Administrator' isDisabled={false} />
    </ButtonContainer>
  );
}
