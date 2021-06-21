import { ROLES } from '../_models/roles';
import User from '../_models/users';
import Question from '../_models/question';

export const checkDuplicate = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) return res.status(401).json({ message: 'User already exists' });
  next();
};

export const checkRoles = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};

export const checkDuplicateQuestions = async (req, res, next) => {
  const question = await Question.findOne({ question: req.body.question });

  if (question) return res.status(401).json({ message: 'Question already exist' });
  next();
};
