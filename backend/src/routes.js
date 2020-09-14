import { Router } from 'express';

const routes = new Router();

import TodoController from './app/controllers/TodoController';

routes.post('/todo', TodoController.store);
routes.get('/todo/:id', TodoController.index);

export default routes;
