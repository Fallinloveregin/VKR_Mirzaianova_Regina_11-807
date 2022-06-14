import { Router } from 'express';

import { authJwt } from '../middlewares';
import controller from '../controllers/recommendations.controller';

const routes = Router();

routes.get('/list', [authJwt.verifyToken], controller.list);

routes.get('/user', [authJwt.verifyToken], controller.user);

routes.post('/add', [authJwt.verifyToken], controller.add);

routes.post('/edit', [authJwt.verifyToken], controller.edit);

routes.post('/remove', [authJwt.verifyToken], controller.remove);

export default routes;
