import { Router } from 'express';
import toolsRouter from './routes/tools.routes';

const routes = Router();

routes.use('/tools', toolsRouter);

export default routes;
