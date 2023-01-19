import { FormItemCheckbox, Icon } from '../../../../../shared';
import classes from './Checkbox.module.scss';

interface CheckboxProps {
  item: FormItemCheckbox;
}

// what to do with key "value"?
export function Checkbox({ item: { isChecked, text } }: CheckboxProps) {
  return (
    <li className={classes.container}>
      <Icon icon={isChecked ? 'checkBox' : 'checkBoxBlank'} className={classes.icon} />
      <p className='p4'>{text}</p>
    </li>
  );
}
