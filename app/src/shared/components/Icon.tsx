import { PropsWithoutRef } from 'react';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { TbForms, TbFaceIdError } from 'react-icons/tb';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { makeMatch } from '@mv-d/toolbelt';

export const Icons = makeMatch(
  {
    close: IoClose,
    form: TbForms,
    info: HiOutlineBellAlert,
    error: TbFaceIdError,
    checkBox: MdOutlineCheckBox,
    checkBoxBlank: MdOutlineCheckBoxOutlineBlank,
  },
  () => <div />,
);

export interface IconProps {
  icon: keyof typeof Icons;
  className?: string;
}

export function Icon({ icon, className }: PropsWithoutRef<IconProps>) {
  const Icon = Icons[icon];

  return <Icon className={className} />;
}
