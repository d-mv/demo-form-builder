import { clsx } from 'clsx';
import { useContext } from 'react';

import { PreviewContext } from '../../../preview.context';
import { Tag } from '../Tag';
import classes from './Tags.module.scss';

export default function Tags() {
  const { data } = useContext(PreviewContext);

  if (data.element !== 'Tags') return null;

  function renderTag({ key, text }: { key: string; text: string }) {
    return (
      <li key={key}>
        <Tag value={text} />
      </li>
    );
  }

  return (
    <div className={clsx(classes.container, 'list_item')}>
      <h5>{data.label}</h5>
      {/* @ts-ignore -- incorrect type in the library */}
      <ul className={classes.items}>{data.value.map(renderTag)}</ul>
    </div>
  );
}
