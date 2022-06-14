import { Router } from 'express';

import { verifySignUp } from '../middlewares';
import controller from '../controllers/auth.controller';

const routes = Router();

routes.post('/signup', [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted], controller.signup);

routes.post('/signin', controller.signin);

export default routes;
