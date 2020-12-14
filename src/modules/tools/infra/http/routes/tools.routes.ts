import { Router } from 'express';
import ToolsController from '../controllers/ToolsController';
import ensureAuthenticate from '../middleware/ensureAuthenticate';

const toolsRouter = Router();
const toolsController = new ToolsController();

toolsRouter.use(ensureAuthenticate);

toolsRouter.post('/', toolsController.create);

toolsRouter.get('/:id', toolsController.show);

toolsRouter.get('/', toolsController.list);

toolsRouter.delete('/:id', toolsController.delete);

export default toolsRouter;
