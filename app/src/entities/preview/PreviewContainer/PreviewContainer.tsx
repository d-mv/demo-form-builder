import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Header, Body, modalIdSelector, formAnswersState, Container } from '../../../shared';
import { RenderAnswers } from '../RenderAnswers';
import classes from './PreviewContainer.module.scss';

export default function PreviewContainer() {
  const closeModal = useResetRecoilState(modalIdSelector);

  const answers = useRecoilValue(formAnswersState);

  if (!answers) return null;

  return (
    <Container>
      <Header onClick={closeModal} title={answers?.formName} />
      <Body className={classes.container}>
        <RenderAnswers />
      </Body>
    </Container>
  );
}
