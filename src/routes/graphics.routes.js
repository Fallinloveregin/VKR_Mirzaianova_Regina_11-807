import { Router } from 'express';

import { authJwt } from '../middlewares';
import controller from '../controllers/graphics.controller';

const routes = Router();

routes.get('/average', [authJwt.verifyToken], controller.average);

routes.get('/analytics', [authJwt.verifyToken], controller.analytics);

export default routes;
