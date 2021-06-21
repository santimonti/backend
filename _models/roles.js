import { Schema, model } from 'mongoose';

export const ROLES = ['admin', 'mod', 'user'];

const roleSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);
export default model('role', roleSchema);
