import { useRecoilState } from 'recoil';
import { Button, Container, modalOpenIdState } from '../../shared';

const id = 'Reviewer';

export function Reviewer() {
  const [modalOpenId, setModalOpenId] = useRecoilState(modalOpenIdState);

  function handleClick() {
    setModalOpenId(modalOpenId === id ? '' : id);
  }

  return (
    <Container>
      <Button isOpen={modalOpenId === id} onClick={handleClick} label={id} isDisabled={false} />
    </Container>
  );
}
