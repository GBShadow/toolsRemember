import { Router } from 'express';
import toolsRouter from '../../../../modules/tools/infra/http/routes/tools.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/tools', toolsRouter);
routes.use('/users', usersRouter);

export default routes;
