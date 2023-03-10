import { useContext } from 'react';

import { PreviewContext } from '../../preview.context';

export default function Header() {
  const { data } = useContext(PreviewContext);

  if (data.element !== 'Header') return null;

  return <h3 className='list_item'>{data.text}</h3>;
}
