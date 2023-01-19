import { useContext } from 'react';

import { PreviewContext } from '../../preview.context';

export default function Paragraph() {
  const { data } = useContext(PreviewContext);

  if (data.element !== 'Paragraph') return null;

  return <p className='p4 list_item'>{data.text}</p>;
}
