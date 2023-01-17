import classes from './Tag.module.scss';

interface TagProp {
  value: string;
}

export function Tag({ value }: TagProp) {
  return <div className={classes.container}>{value}</div>;
}
