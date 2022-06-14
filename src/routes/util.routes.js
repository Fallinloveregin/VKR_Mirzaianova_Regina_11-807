import { Router } from 'express';

import { authJwt } from '../middlewares';
import controller from '../controllers/util.controller';

const routes = Router();

routes.get('/groups', [authJwt.verifyToken], controller.groups);
routes.get('/users', [authJwt.verifyToken], controller.users);

export default routes;
