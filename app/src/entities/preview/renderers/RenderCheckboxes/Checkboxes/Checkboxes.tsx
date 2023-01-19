import { useContext } from 'react';

import { FormItemCheckbox } from '../../../../../shared';
import { PreviewContext } from '../../../preview.context';
import { Checkbox } from '../Checkbox';
import classes from './Checkboxes.module.scss';

export default function Checkboxes() {
  const { data } = useContext(PreviewContext);

  if (data.element !== 'Checkboxes') return null;

  function renderCheckbox(item: FormItemCheckbox) {
    return <Checkbox key={item.key} item={item} />;
  }

  return (
    <div className='list_item'>
      <h5>{data.label}</h5>
      <ul className={classes.items}>{data.value.map(renderCheckbox)}</ul>
    </div>
  );
}
