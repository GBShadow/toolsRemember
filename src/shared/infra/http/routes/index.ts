import { Router } from 'express';

import toolsRouter from '@modules/tools/infra/http/routes/tools.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import docsRouter from './docs.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tools', toolsRouter);
routes.use('/docs', docsRouter);

export default routes;
