import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ToolsController from '../controllers/ToolsController';
import ensureAuthenticate from '../middleware/ensureAuthenticate';

const toolsRouter = Router();
const toolsController = new ToolsController();

toolsRouter.use(ensureAuthenticate);

toolsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      title: Joi.string().required(),
      link: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
    },
  }),
  toolsController.create,
);

toolsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  toolsController.show,
);

toolsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      tag: Joi.string(),
    },
  }),
  toolsController.list,
);

toolsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  toolsController.delete,
);

export default toolsRouter;
