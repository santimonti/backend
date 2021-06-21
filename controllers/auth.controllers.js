import User from '../_models/users';
import Role from '../_models/roles';
import jwt from 'jsonwebtoken';
import config from '../src/config';
export const register = async (req, res) => {
  const { firstname, lastname, email, password, roles } = req.body;

  const newUser = new User({
    firstname,
    lastname,
    email,
    password: await User.encryptPassword(password),
  });
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles;
  } else {
    const role = await Role.findOne({ name: 'user' });

    newUser.roles = [role];
  }

  const savedUser = await newUser.populate('roles').save();
  let savedRoles = savedUser.roles;
  const token = jwt.sign({ id: savedUser._id }, config.secretKey, { expiresIn: 86400 });
  res.json({ token, savedRoles });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email }).populate('roles');

  if (!userFound) return res.status(400).json({ message: 'User not found' });
  const userRoles = await Role.find({ _id: { $in: userFound.roles } });

  const match = await User.comparePassword(password, userFound.password);
 
  if (!match) return res.status(401).json({ token: null, message: 'Wrong Password' });
  const token = jwt.sign({ id: userFound._id }, config.secretKey, { expiresIn: 86400 });
  return res.status(200).json({ token, userRoles });
};
