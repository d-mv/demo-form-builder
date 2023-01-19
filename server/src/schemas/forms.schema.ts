import { model, Schema } from 'mongoose';

export interface FormItem {
  name: string;
  data: string;
}

const formItemSchema = new Schema<FormItem>(
  {
    name: { type: String, unique: true, required: true },
    data: { type: String, required: true },
  },
  { timestamps: true },
);

export const FormModel = model('form', formItemSchema);
