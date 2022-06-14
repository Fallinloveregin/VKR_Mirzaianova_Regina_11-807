import { Router } from 'express';

import { authJwt } from '../middlewares';
import controller from '../controllers/test.controller';

const routes = Router();

routes.post('/result', [authJwt.verifyToken], controller.result);

routes.get('/overview', [authJwt.verifyToken], controller.overview);

export default routes;
