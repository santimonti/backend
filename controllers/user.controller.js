import { register } from '../controllers/auth.controllers';
import User from '../_models/users';
export const usersList = async (req, res) => {
  const users = await User.find().populate('roles');
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const userDeleted = await User.findByIdAndDelete({ _id: req.params.userId });

  res.status(204).json({ message: 'Question deleted', userDeleted });
};
