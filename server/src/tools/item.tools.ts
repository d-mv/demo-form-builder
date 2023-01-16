import { AnyValue, R } from '@mv-d/toolbelt';
import { FlattenMaps, Document, LeanDocument, Types } from 'mongoose';

export function toJson<T>(
  item: Document<unknown, AnyValue, T> & T & { _id: Types.ObjectId },
): FlattenMaps<LeanDocument<T>> {
  return item.toJSON();
}

export function parseData<T, K = unknown>(
  item: FlattenMaps<LeanDocument<T>>,
): FlattenMaps<LeanDocument<T>> & { data: K } {
  return { ...item, data: eval(R.path(['data'], item) || '') };
}
