import { Router } from 'express';
const router = Router();
import * as userController from '../controllers/user.controller';
import { auth, verify } from '../middlewares';

router.get('/', [auth.verifyToken, auth.isAdmin, verify.checkRoles], userController.usersList);
router.delete('/delete/:userId', [auth.verifyToken, auth.isAdmin, verify.checkRoles], userController.deleteUser);
export default router;
