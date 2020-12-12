import { Router } from 'express';
import ToolsController from '../controllers/ToolsController';

const toolsRouter = Router();
const toolsController = new ToolsController();

toolsRouter.post('/', toolsController.create);

toolsRouter.get('/:id', toolsController.show);

toolsRouter.get('/', toolsController.list);

toolsRouter.delete('/:id', toolsController.delete);

export default toolsRouter;
