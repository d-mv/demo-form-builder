import { ifTrue } from '@mv-d/toolbelt';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  Button,
  ButtonContainer,
  formAnswersState,
  formsSelector,
  formViewSelector,
  modalIdState,
  MODALS_ENUM,
} from '../../shared';
import classes from './Requestor.module.scss';

const id = MODALS_ENUM.FORMS;

export function Requestor() {
  const [modalId, setModalId] = useRecoilState(modalIdState);

  const setViewMode = useSetRecoilState(formViewSelector);

  const forms = useRecoilValue(formsSelector);

  const answers = useRecoilValue(formAnswersState);

  function handleFormsClick() {
    setViewMode(true);
    setModalId(modalId === id ? MODALS_ENUM.NONE : id);
  }

  function handleAnswersClick() {
    setViewMode(true);
    setModalId(modalId === MODALS_ENUM.ANSWERS ? MODALS_ENUM.NONE : MODALS_ENUM.ANSWERS);
  }

  function renderAnswerButton() {
    return (
      <Button
        className={classes.answers}
        isOpen={modalId === id}
        onClick={handleAnswersClick}
        label={'Answers'}
        isDisabled={!forms.items.length}
      />
    );
  }

  return (
    <ButtonContainer>
      <Button isOpen={modalId === id} onClick={handleFormsClick} label='Requestor' isDisabled={!forms.items.length} />
      {ifTrue(answers, renderAnswerButton)}
    </ButtonContainer>
  );
}
