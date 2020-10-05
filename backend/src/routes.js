import { Router } from 'express';

const routes = new Router();

import TodoController from './app/controllers/TodoController';

routes.post('/todo', TodoController.store);
routes.get('/todos', TodoController.index)
routes.get('/todo/:id', TodoController.show);
routes.put('/todo/:id', TodoController.update);
routes.delete('/todo/:id', TodoController.delete);

export default routes;
