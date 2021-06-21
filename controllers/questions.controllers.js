import Question from '../_models/question';

export const createQuestion = async (req, res) => {
  const { topic, question, options, answer } = req.body;
  const newQuestion = new Question({ topic, question, options, answer });
  await newQuestion.save();
  res.status(201).json({ message: 'Question created' });
};

export const getQuestions = async (req, res) => {
  const questions = await Question.aggregate([[{ $match: { topic: req.params.topic } }, { $sample: { size: 12 } }]]);

  res.json(questions);
};

export const getQuestionsById = async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  res.json(question);
};

export const updateQuestionsById = async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.questionId, req.body, { new: true });

  res.status(200).json(question);
};

export const deleteQuestionsById = async (req, res) => {
  const delQuestion = await Question.findByIdAndDelete(req.params.questionId);
  res.status(204).json(delQuestion);
};
