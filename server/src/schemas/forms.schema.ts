import { model, Schema } from 'mongoose';

export interface FormItem {
  id: string;
  name: string;
  data: string;
}

const formItemSchema = new Schema<FormItem>({
  id: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  data: { type: String, required: true },
});

export const FormModal = model('form', formItemSchema);
