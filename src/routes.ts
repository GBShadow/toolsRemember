import { Router } from 'express';
import ToolController from './controller/ToolController';

const toolController = new ToolController();

const routes = Router();

routes.post('/', toolController.create);
routes.get('/', toolController.index);
routes.delete('/:id', toolController.delete);

export default routes;
