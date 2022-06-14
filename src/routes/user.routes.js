import { Router } from 'express';

import { authJwt } from '../middlewares';
import controller from '../controllers/user.controller';

const routes = Router();

routes.get('/me', [authJwt.verifyToken], controller.me);

export default routes;
