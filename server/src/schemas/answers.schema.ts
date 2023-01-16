import { model, Schema } from 'mongoose';

export interface AnswerItem {
  formId: string;
  formName: string;
  data: string;
}

const answerItemSchema = new Schema<AnswerItem>({
  formId: { type: String, required: true },
  formName: { type: String, required: true },
  data: { type: String, required: true },
});

export const AnswerModel = model('answer', answerItemSchema);
