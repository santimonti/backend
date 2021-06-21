import role from '../_models/roles';
import user from '../_models/users';
import question from '../_models/question';
import json from '../libs/initialQuestions.json';
export const createRoles = async () => {
  try {
    const count = await role.estimatedDocumentCount();
    if (count > 0) return;
    const value = await Promise.all([
      new role({ name: 'user' }).save(),
      new role({ name: 'mod' }).save(),
      new role({ name: 'admin' }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};
export const createUsers = async () => {
  try {
    const adminRole = await role.findOne({ name: 'admin' });
    const userRole = await role.findOne({ name: 'user' });
    const count = await user.estimatedDocumentCount();
    if (count > 0) return;
    const value = await Promise.all([
      new user({
        firstname: 'admin',
        lastname: 'admin',
        email: 'admin',
        password: await user.encryptPassword('admin'),
        roles: adminRole,
      }).save(),
      new user({
        firstname: 'user',
        lastname: 'user',
        email: 'user',
        password: await user.encryptPassword('user'),
        roles: userRole,
      }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const questions = async () => {
  try {
    const questions = json.questions;

    const count = await question.estimatedDocumentCount();
    if (count > 0) return;
    for (let i = 0; i < questions.length; i++) {
      await new question({
        topic: questions[i].topic,
        question: questions[i].question,
        options: questions[i].options,
        answer: questions[i].answer,
      }).save();
    }
  } catch (error) {
    console.error(error);
  }
};
