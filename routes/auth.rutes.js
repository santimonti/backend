import { Router } from 'express';
const router = Router();
import * as authController from '../controllers/auth.controllers';
import { verify } from '../middlewares';
router.post('/register', [verify.checkDuplicate, verify.checkRoles], authController.register);
router.post('/login', authController.login);  

export default router;
