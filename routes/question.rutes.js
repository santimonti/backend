import Router from 'express';
const router = Router();
import { auth } from '../middlewares';
import * as productControllers from '../controllers/questions.controllers';
import { verify } from '../middlewares';
//create
router.post(
  '/create',
  [auth.verifyToken, verify.checkDuplicateQuestions, auth.isAdmin],
  productControllers.createQuestion
);

//get Questions
router.get('/:topic', productControllers.getQuestions);

//get Question
router.get('/one/:questionId', productControllers.getQuestionsById);

//update question
router.put('/:questionId', [auth.verifyToken, auth.isMod], productControllers.updateQuestionsById);

//delete question
router.delete('/delete/:questionId', [auth.verifyToken, auth.isAdmin], productControllers.deleteQuestionsById);

export default router;
