import { model, Schema } from 'mongoose';

export interface AnswerItem {
  id: string;
  formId: string;
  formName: string;
  data: string;
}

const answerItemSchema = new Schema<AnswerItem>({
  id: { type: String, unique: true, required: true },
  formId: { type: String, required: true },
  formName: { type: String, required: true },
  data: { type: String, required: true },
});

export const AnswerModal = model('answer', answerItemSchema);
