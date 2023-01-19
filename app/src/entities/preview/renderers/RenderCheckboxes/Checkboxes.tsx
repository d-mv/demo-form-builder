import { clsx } from 'clsx';
import { useContext } from 'react';

import { Icon } from '../../../../shared';
import { PreviewContext } from '../../preview.context';
import classes from './Checkboxes.module.scss';

export default function Checkboxes() {
  const { data } = useContext(PreviewContext);

  if (data.element !== 'Checkboxes') return null;

  // eslint-disable-next-line no-console
  console.log(data);

  function renderCheckbox(item: string) {
    return (
      <li className={classes.item}>
        {/* @ts-ignore -- temp */}
        <Icon icon={item.isChecked ? 'checkBox' : 'checkBoxBlank'} className={classes.icon} />
        {/*  @ts-ignore -- temp */}
        <p className='p4'>{item.text}</p>
      </li>
    );
  }

  return (
    <div className='list_item'>
      <h5>{data.label}</h5>
      <ul className={classes.items}>{data.value.map(renderCheckbox)}</ul>
    </div>
  );
}
