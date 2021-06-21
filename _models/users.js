import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const usersSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    roles: [{ ref: 'role', type: Schema.Types.ObjectId }],
  },
  { timestamps: true, versionKey: false }
);
usersSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
usersSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword);
};
export default model('User', usersSchema);
