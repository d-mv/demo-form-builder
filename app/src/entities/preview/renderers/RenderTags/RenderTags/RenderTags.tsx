import { useContext } from 'react';

import { PreviewContext } from '../../../preview.context';
import { Tag } from '../Tag';
import classes from './RenderTags.module.scss';

export default function RenderTags() {
  const { data } = useContext(PreviewContext);

  function renderTag({ key, text }: { key: string; text: string }) {
    return (
      <li>
        <Tag key={key} value={text} />
      </li>
    );
  }

  return (
    <div className={classes.container}>
      <h6>{data.label}</h6>
      {/* @ts-ignore -- incorrect type in the library */}
      <ul className={classes.items}>{data.value.map(renderTag)}</ul>
    </div>
  );
}
