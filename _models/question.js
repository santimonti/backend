import { Schema, model } from 'mongoose';

const questionSchema = new Schema(
  {
    topic: { type: String, required: true },
    question: { type: String, unique: true, required: true },
    options: {
      type: [String],
      required: true,
    },
    answer: { type: String, required: true },
  },
  {
    Timestamps: true,
    versionKey: false,
  }
);

export default model('question', questionSchema);
